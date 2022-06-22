import React, { useState } from "react";
import { Button, Form, FormControl, FormLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const Shipping = () => {

    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    const navigate = useNavigate();

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);
  
    const dispatch = useDispatch();

    const shippingHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment')
    };

    return (
        <div>
            <FormContainer>
                <CheckoutSteps step1 step2 />
                <h1>Shipping</h1>

                <Form onSubmit={shippingHandler}>
                    <Form.Group controlId="address">
                        <FormLabel>Address</FormLabel>

                        <FormControl
                            type="text"
                            placeholder="Enter your address"
                            value={address}
                            required
                            onChange={(e) => setAddress(e.target.value)}
                        ></FormControl>
                    </Form.Group>

                    <Form.Group controlId="city">
                        <FormLabel className="mt-2">City</FormLabel>

                        <FormControl
                            type="text"
                            placeholder="Enter your city"
                            value={city}
                            required
                            onChange={(e) => setCity(e.target.value)}
                        ></FormControl>
                    </Form.Group>

                    <Form.Group controlId="postalCode">
                        <FormLabel className="mt-2">Postal Code</FormLabel>

                        <FormControl
                            type="number"
                            placeholder="Enter your postal code"
                            value={postalCode}
                            required
                            onChange={(e) => setPostalCode(e.target.value)}
                        ></FormControl>
                    </Form.Group>

                    <Form.Group controlId="country">
                        <FormLabel className="mt-2">Country</FormLabel>

                        <FormControl
                            type="text"
                            placeholder="Enter your country"
                            value={country}
                            required
                            onChange={(e) => setCountry(e.target.value)}
                        ></FormControl>
                    </Form.Group>

                    <Button type="submit" variant="primary" className="mt-2">
                        Continue
                    </Button>
                </Form>
            </FormContainer>
        </div>
    );
};

export default Shipping;
