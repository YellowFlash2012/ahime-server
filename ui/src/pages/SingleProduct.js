import { useState, useEffect } from "react";
import {
    Card,
    Col,
    Image,
    ListGroup,
    ListGroupItem,
    Row,
    Button,
    Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {message} from "antd"

import Rating from "../components/Rating";

import { createProductReview, listProduct } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import Meta from "../components/Meta";

const SingleProduct = () => {
    const navigate = useNavigate();

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const dispatch = useDispatch();
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const productReviews = useSelector((state) => state.productReviews);
    const { error: errorProductReview, success: successProductReview } =
        productReviews;

    let { id } = useParams();

    useEffect(() => {

        if (successProductReview) {
            // alert('Review Submitted!');
            setRating(0);
            setComment('');

            dispatch({type:PRODUCT_CREATE_REVIEW_RESET})

        }
        dispatch(listProduct(id));

    }, [dispatch, id, successProductReview]);

    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`);
        message.success(`${product.name} added to cart!`);
    };

    const reviewSubmitHandler = (e) => {
        e.preventDefault();

        dispatch(createProductReview(id, {rating, comment}))
    }

    return (
        <div>
            <Link className="btn btn-light my-3" to="/">
                Go Back
            </Link>

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    <Meta title={product.name} />
                    <Row>
                        <Col md={6}>
                            <Image
                                src={product.image}
                                alt={product.name}
                                fluid
                            />
                            {/* fluid prevents the img from going beyond its container */}
                        </Col>

                        <Col md={3}>
                            <ListGroup variant="flush">
                                <ListGroupItem>
                                    <h2>{product.name}</h2>
                                </ListGroupItem>

                                <ListGroupItem>
                                    <Rating
                                        value={product.rating}
                                        text={`${product.numReviews} ${
                                            product.numReviews === 1
                                                ? "review"
                                                : "reviews"
                                        }`}
                                        
                                    />
                                </ListGroupItem>

                                <ListGroupItem>
                                    Price: ${product.price}
                                </ListGroupItem>

                                <ListGroupItem>
                                    Description: {product.description}
                                </ListGroupItem>
                            </ListGroup>
                        </Col>

                        <Col md={3}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Price:</Col>

                                            <Col>
                                                <strong>
                                                    ${product.price}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>

                                    <ListGroupItem>
                                        <Row>
                                            <Col>Status:</Col>

                                            <Col>
                                                {product.countInStock > 0
                                                    ? "In stock"
                                                    : "Out of stock"}
                                            </Col>
                                        </Row>
                                    </ListGroupItem>

                                    {/* set qty in cart */}
                                    {product.countInStock > 0 && (
                                        <ListGroupItem>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col>
                                                    <Form.Control
                                                        as="select"
                                                        value={qty}
                                                        onChange={(e) =>
                                                            setQty(
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        {[
                                                            ...Array(
                                                                product.countInStock
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
                                            </Row>
                                        </ListGroupItem>
                                    )}
                                    <ListGroupItem>
                                        <Button
                                            onClick={addToCartHandler}
                                            className="btn-block"
                                            type="button"
                                            disabled={
                                                product.countInStock === 0
                                            }
                                        >
                                            Add To Cart
                                        </Button>
                                    </ListGroupItem>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <h2>Reviews</h2>

                            {product.reviews.length === 0 && (
                                <Message>No reviews</Message>
                            )}

                            <ListGroup variant="flush">
                                {product.reviews.map((review) => (
                                    <ListGroupItem key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} />
                                        <p>
                                            {review.createdAt.substring(0, 10)}
                                        </p>
                                        <p>{review.comment}</p>
                                    </ListGroupItem>
                                ))}

                                <ListGroupItem>
                                    <h2>Write a customer review</h2>

                                    {errorProductReview && (
                                        <Message variant="danger">
                                            {errorProductReview}
                                        </Message>
                                    )}

                                    {userInfo ? (
                                        <Form onSubmit={reviewSubmitHandler}>
                                            <Form.Group controlId="rating">
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    value={rating}
                                                    onChange={(e) =>
                                                        setRating(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        Select...
                                                    </option>
                                                    <option value="1">
                                                        1 - Poor.
                                                    </option>
                                                    <option value="2">
                                                        2 - Fair.
                                                    </option>
                                                    <option value="3">
                                                        3 - Good.
                                                    </option>
                                                    <option value="4">
                                                        4 - Very Good.
                                                    </option>
                                                    <option value="5">
                                                        5 - Excellent.
                                                    </option>
                                                </Form.Control>
                                            </Form.Group>

                                            <Form.Group controlId="comment">
                                                <Form.Label className="mt-2">
                                                    Comment
                                                </Form.Label>

                                                <Form.Control
                                                    as="textarea"
                                                    row="3"
                                                    value={comment}
                                                    onChange={(e) =>
                                                        setComment(
                                                            e.target.value
                                                        )
                                                    }
                                                ></Form.Control>
                                            </Form.Group>

                                            <Button
                                                type="submit"
                                                variant="primary"
                                                className="mt-4"
                                            >
                                                Submit Comment
                                            </Button>
                                        </Form>
                                    ) : (
                                        <Message>
                                            Please{" "}
                                            <Link to="/login">sign in</Link> to
                                            write a review{" "}
                                        </Message>
                                    )}
                                </ListGroupItem>
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )}
        </div>
    );
};

export default SingleProduct;
