import React, { useEffect } from "react";
import { Col, ListGroupItem, Row, ListGroup, Image, Form, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {message} from "antd"

import { addToCart, removeFromCart } from "../actions/cartActions";
import Message from "../components/Message";

const Cart = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { id } = useParams();
    console.log({ id });

    const qty = location.search ? Number(location.search.split("=")[1]) : 1;
    // .split('=') will split ?qty=1 into an array ['?qty','1']
    console.log(qty);

    const dispatch = useDispatch();

    const { cartItems } = useSelector((state) => state.cart);
    
    console.log(cartItems);

    useEffect(() => {
        if ({ id }) {
            dispatch(addToCart(id, qty));
        }
    }, [dispatch, id, qty]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
        
    }
    
    const checkOutHandler = () => {
        navigate('/login/?redirect=/shipping')
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>

                {cartItems.length === 0 ? (
                    <Message>
                        Your cart is empty{" "}
                        <Link to="/">Pick some products</Link>
                    </Message>
                ) : (
                    <ListGroup variant="flush">
                        {cartItems.map((item) => (
                            <ListGroupItem key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fluid
                                            rounded
                                        />
                                    </Col>

                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>
                                    </Col>

                                    <Col md={2}>${item.price}</Col>

                                    <Col md={2}>
                                        <Form.Control
                                            as="select"
                                            value={item.qty}
                                            onChange={(e) =>
                                                dispatch(addToCart(item.product, Number(e.target.value)))
                                            }
                                        >
                                            {[
                                                ...Array(
                                                    item.countInStock
                                                ).keys(),
                                            ].map((x) => (
                                                <option
                                                    key={x + 1}
                                                    value={x + 1}
                                                >
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>

                                    <Col md={2}>
                                        <Button type="button" variant='light' onClick={() => {
                                            removeFromCartHandler(item.product)
                                            message.info(`${item.name} was removed!`)
                                        }}>
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                )}
            </Col>

            {/* subtottal */}
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroupItem>
                            <h2>
                                Subtotal ({cartItems.reduce((acc, item)=>acc+item.qty, 0)}) items
                            </h2>
                            $
                            {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                            
                        </ListGroupItem>

                        <ListGroupItem>
                            <Button type="button" className="btn-block" disabled={cartItems.length === 0} onClick={checkOutHandler}>
                                Proceed to checkout
                            </Button>
                        </ListGroupItem>

                        <ListGroupItem>
                            <Button
                                type="button"
                                className="btn-block"
                                onClick={()=>navigate("/")}
                            >
                                Keep Shopping
                            </Button>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>

            <Col md={2}></Col>
        </Row>
    );
};

export default Cart;
