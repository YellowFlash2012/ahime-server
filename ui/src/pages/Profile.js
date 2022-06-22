import React, { useEffect, useState } from "react";
import {
    Button,
    Col,
    Form,
    FormControl,
    FormLabel,
    Row,
    Table,
} from "react-bootstrap";

import {LinkContainer} from 'react-router-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

const Profile = () => {
    
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [msg, setMsg] = useState(null);

    const dispatch = useDispatch();

    const { loading, error, user } = useSelector((state) => state.userDetails);
    
    
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    // myorders
    const { loading:loadingOrders, error:errorOrders, orders } = useSelector((state) => state.orderListMy);
    

    useEffect(() => {
        if (!userInfo) {
            navigate("/login");
        } else {
            if (!user.name || success) {
                dispatch({type:USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails("profile"));

                dispatch(listMyOrders());
            } else {
                // to prefill these fields upon load
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [navigate, userInfo, dispatch, user.name, user.email, success]);

    const profileSubmitHandler = (e) => {
        e.preventDefault();

        if (password !== confPassword) {
            setMsg("Passwords do not match");
        } else {
            setMsg(null);
            dispatch(updateUserProfile({ id: user._id, name, email, password }));
        }
    };

    return (
        <div>
            <Row>
                <Col md={3}>
                    <h2>User Profile</h2>

                    {/* passwords don't match message */}
                    {msg && <Message variant="danger">{msg}</Message>}

                    {/* other messages related to the signup form */}
                    {error && <Message variant="danger">{error}</Message>}

                    {loading && <Loader />}

                    <Form onSubmit={profileSubmitHandler}>
                        <Form.Group controlId="name">
                            <FormLabel>Full name</FormLabel>

                            <FormControl
                                type="text"
                                placeholder="Enter full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></FormControl>
                        </Form.Group>

                        <Form.Group controlId="email">
                            <FormLabel>Email address</FormLabel>

                            <FormControl
                                type="email"
                                placeholder="Enter email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></FormControl>
                        </Form.Group>

                        <Form.Group controlId="password">
                            <FormLabel>Password</FormLabel>

                            <FormControl
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></FormControl>
                        </Form.Group>

                        <Form.Group controlId="confPassword">
                            <FormLabel>Confirm Password</FormLabel>

                            <FormControl
                                type="password"
                                placeholder="Confirm password"
                                value={confPassword}
                                onChange={(e) =>
                                    setConfPassword(e.target.value)
                                }
                            ></FormControl>
                        </Form.Group>

                        <Button
                            type="submit"
                            className="mt-2"
                            variant="primary"
                        >
                            Update
                        </Button>
                    </Form>
                </Col>

                <Col md={9}>
                    <h2>My Orders</h2>

                    {loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> : <Table striped bordered hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0,10)}</td>
                                    <td>{order.totalAmount}</td>
                                    
                                    <td>{order.isPaid ? order.paidAt.substring(0, 10) : <i className="fas fa-times" style={{ color: 'red' }}></i>}</td>
                                    
                                    <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : <i className="fas fa-times" style={{ color: 'red' }}></i>}</td>
                                    
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className="btn-sm" variant="light">Details</Button>
                                    </LinkContainer> </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table> }
                </Col>
            </Row>
        </div>
    );
};

export default Profile;
