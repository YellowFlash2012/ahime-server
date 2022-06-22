import React, { useEffect } from 'react';

import { useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { deleteUser, listUsers } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listAllOrders } from '../actions/orderActions';

const OrdersList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const ordersList = useSelector((state) => state.ordersListByAdmin);
    const { loading, error, orders } = ordersList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listAllOrders())
        } else {
            navigate('/login')
        }
    }, [dispatch, userInfo, navigate])

    return (
        <div>
            <h1>Orders</h1>

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>

                            <th>AMOUNT</th>
                            <th>PAYMENT STATUS</th>
                            <th>PAYMENT DATE</th>

                            <th>DELIVERY DATE</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user && order.user.name}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>

                                <td>${order.totalAmount}</td>

                                <td>
                                    {order.isPaid ? (
                                        order.paidAt.substring(0, 10)
                                    ) : (
                                        <i
                                            className="fas fa-times"
                                            style={{ color: "red" }}
                                        ></i>
                                    )}
                                </td>

                                <td>{order.paidAt}</td>

                                <td>
                                    {order.isDelivered ? (
                                        order.deliveredAt.substring(0, 10)
                                    ) : (
                                        <i
                                            className="fas fa-times"
                                            style={{ color: "red" }}
                                        ></i>
                                    )}
                                </td>

                                <td>
                                    <LinkContainer
                                        to={`/order/${order._id}/`}
                                    >
                                        <Button
                                            variant="light"
                                            className="btn-sm"
                                        >
                                            Details
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default OrdersList;
