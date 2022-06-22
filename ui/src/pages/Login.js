import React, { useEffect, useState } from 'react';
import { Button, Col, Form, FormControl, FormLabel, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';

import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

const Login = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const { loading, error, userInfo } = useSelector(
        (state) => state.userLogin
    );

    const redirect = location.search ? location.search.split('=')[1] : "/";

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate,userInfo,redirect])

    const loginSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
        // message.success(`Welcome back, ${userInfo.name}`)
    }

    return (
        <div>
            <FormContainer>
                <h1>Sign In</h1>
                {error && <Message variant="danger">{error}</Message>}

                {loading && <Loader />}
                <Form onSubmit={loginSubmitHandler}>
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
                        <FormLabel className="mt-2">Password</FormLabel>

                        <FormControl
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></FormControl>
                    </Form.Group>

                    <Button type="submit" className="mt-2" variant="primary">
                        Login
                    </Button>
                </Form>

                <Row className="py-3">
                    <Col>
                        New Customer? <Link to="/register">Register</Link>{" "}
                        instead!
                    </Col>
                </Row>
            </FormContainer>
        </div>
    );
};

export default Login;
