import React, { useEffect, useState } from "react";
import {
    Button,
    Col,
    Form,
    FormControl,
    FormLabel,
    Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

const Register = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [msg, setMsg] = useState(null);

    const dispatch = useDispatch();
    const userRegister = useSelector((state) => state.userRegister);

    const { loading, error, userInfo } = userRegister;

    const redirect = location.search ? location.search.split("=")[1] : "/";

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, userInfo, redirect]);

    const registerSubmitHandler = (e) => {
        e.preventDefault();

        if (password !== confPassword) {
            setMsg('Passwords do not match');
        } else {
            setMsg(null);
            dispatch(register(name, email, password));
        }
        
    };

    return (
        <div>
            <FormContainer>
                <h1>Sign Up</h1>

                {/* passwords don't match message */}
                {msg && <Message variant="danger">{msg}</Message>}

                {/* other messages related to the signup form */}
                {error && <Message variant="danger">{error}</Message>}

                {loading && <Loader />}
                <Form onSubmit={registerSubmitHandler}>
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
                        <FormLabel className="mt-2">Email address</FormLabel>

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

                    <Form.Group controlId="confPassword">
                        <FormLabel className="mt-2">Confirm Password</FormLabel>

                        <FormControl
                            type="password"
                            placeholder="Confirm password"
                            value={confPassword}
                            onChange={(e) => setConfPassword(e.target.value)}
                        ></FormControl>
                    </Form.Group>

                    <Button type="submit" className="mt-2" variant="primary">
                        Register
                    </Button>
                </Form>

                <Row className="py-3">
                    <Col>
                        Already have an account? <Link to="/login">Login</Link>{" "}
                        instead!
                    </Col>
                </Row>
            </FormContainer>
        </div>
    );
};

export default Register;
