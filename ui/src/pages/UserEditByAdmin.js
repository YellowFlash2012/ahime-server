import React, {useState, useEffect} from 'react';
import {
    Button,
    Col,
    Form,
    FormControl,
    FormGroup,
    FormLabel,
    Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";

import FormContainer from "../components/FormContainer";
import { getUserDetails, updateUser } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Link } from 'react-router-dom';
import { USER_UPDATE_RESET } from '../constants/userConstants';

const UserEditByAdmin = () => {

    const {id} = useParams();
    
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    
    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdate = useSelector(state => state.userUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

    console.log(user);

    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET });
            navigate("/admin/users")
        } else {
            if (!user || !user.name || user._id !== id) {
                dispatch(getUserDetails(id));
            } else {
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }
        }
        
        
    }, [user, dispatch, id, navigate, successUpdate]);

    const updateSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({ _id: id, name, email, isAdmin }));
    };

    return (
        <div>
            <Link to="/admin/users" className="btn btn-light my-3">
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit user</h1>

                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <Form onSubmit={updateSubmitHandler}>
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
                            <FormLabel className="mt-2">
                                Email address
                            </FormLabel>

                            <FormControl
                                type="email"
                                placeholder="Enter email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></FormControl>
                        </Form.Group>

                        <Form.Group controlId="isadmin" className="mt-2">
                            <Form.Check
                                type="checkbox"
                                label="Is Admin"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            ></Form.Check>
                        </Form.Group>

                        <Button
                            type="submit"
                            className="mt-2"
                            variant="primary"
                        >
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </div>
    );

};

export default UserEditByAdmin;
