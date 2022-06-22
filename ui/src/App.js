import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";


import Home from "./pages/Home";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
import PlaceOrders from "./pages/PlaceOrders";
import OrderDetails from "./pages/OrderDetails";
import UsersList from "./pages/UsersList";
import UserEditByAdmin from "./pages/UserEditByAdmin";
import ProductListByAdmin from "./pages/ProductListByAdmin";
import ProductEditByAdmin from "./pages/ProductEditByAdmin";
import OrdersList from "./pages/OrdersList";

import "antd/dist/antd.min.css";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Header />
    

                <main className="py-3">
                    <Container>
                        <Routes>
                            <Route path="/" element={<Home />} />

                            <Route
                                path="/product/:id"
                                element={<SingleProduct />}
                            />

                            {/* 2 routes are needed to fully render the cart */}
                            <Route
                                // path="/cart/:id?" is no longer supported under RRDV6
                                path="/cart/:id"
                                element={<Cart />}
                            />
                            <Route
                                // path="/cart/:id?" is no longer supported under RRDV6
                                path="/cart"
                                element={<Cart />}
                            />

                            <Route path="/login" element={<Login />} />

                            <Route path="/register" element={<Register />} />

                            <Route path="/profile" element={<Profile />} />

                            <Route path="/shipping" element={<Shipping />} />

                            <Route path="/payment" element={<Payment />} />

                            <Route
                                path="/placeorder"
                                element={<PlaceOrders />}
                            />

                            <Route
                                path="/order/:id"
                                element={<OrderDetails />}
                            />

                            <Route
                                path="/admin/users"
                                element={<UsersList />}
                            />

                            <Route
                                path="/admin/user/:id/edit"
                                element={<UserEditByAdmin />}
                            />

                            <Route
                                path="/admin/products"
                                element={<ProductListByAdmin />}
                            />
                            {/* pagination route for admin */}
                            <Route
                                path="/admin/products/:pageNumber"
                                element={<ProductListByAdmin />}
                            />

                            <Route
                                path="/admin/product/:id/edit"
                                element={<ProductEditByAdmin />}
                            />

                            <Route path="/admin/orders" element={<OrdersList />} />
                            
                            <Route path='/search/:keyword' element={<Home/>}/>

                            {/* pagination routes */}
                            <Route path="/page/:pageNumber" element={<Home />} />

                            <Route path="/search/:keyword/page/:pageNumber" element={<Home />} />
                            
                        </Routes>
                    </Container>
                </main>

                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
