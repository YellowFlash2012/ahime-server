import { message } from "antd";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";

import { useDispatch, useSelector } from 'react-redux';

import {LinkContainer} from "react-router-bootstrap"

import { logout } from "../actions/userActions";
import SearchBox from "./SearchBox";

const Header = () => {
    const dispatch = useDispatch();
    
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout());
        message.info(`See you soon, ${userInfo.name}`)
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>Ahime</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <SearchBox />

                        <Nav className="ml-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <i className="fas fa-shopping-cart"></i>{" "}
                                    Cart
                                </Nav.Link>
                            </LinkContainer>

                            {/* conditional rendering of the navbar */}
                            {userInfo ? (
                                <NavDropdown
                                    title={userInfo.name}
                                    id="username"
                                >
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                    {userInfo && userInfo.isAdmin && (
                                        <>
                                            <LinkContainer to="/admin/users">
                                                <NavDropdown.Item>
                                                    Users
                                                </NavDropdown.Item>
                                            </LinkContainer>

                                            <LinkContainer to="/admin/products">
                                                <NavDropdown.Item>
                                                    Products
                                                </NavDropdown.Item>
                                            </LinkContainer>

                                            <LinkContainer to="/admin/orders">
                                                <NavDropdown.Item>
                                                    Orders
                                                </NavDropdown.Item>
                                            </LinkContainer>
                                        </>
                                    )}
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link>
                                        <i className="fas fa-user"></i> Sign in
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
