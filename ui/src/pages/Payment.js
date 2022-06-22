import React, { useState } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const Payment = () => {
    const navigate = useNavigate();

    const { shippingAddress } = useSelector((state) => state.cart);
    

    if (!shippingAddress) {
        navigate("/shipping");
    }


    const [paymentMethod, setPaymentMethod] = useState('Paypal');

    const dispatch = useDispatch();

    const paymentHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate("/placeorder");
    };

    return (
        <div>
            <FormContainer>
                <CheckoutSteps step1 step2 step3 />
                <h1>Payment Method</h1>

                <Form onSubmit={paymentHandler}>
                    <Form.Group>
                        <Form.Label as="legend">Select Method</Form.Label>

                        <Col>
                            <Form.Check
                                type="radio"
                                label="PayPal or Credit Card"
                                id="Paypal"
                                name="paymentMethod"
                                value="PayPal"
                                checked
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                }
                            ></Form.Check>

                            <Form.Check
                                type="radio"
                                label="Stripe"
                                id="Stripe"
                                name="paymentMethod"
                                value="Stripe"
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                }
                            ></Form.Check>
                        </Col>

                        <Button
                            type="submit"
                            variant="primary"
                            className="mt-2"
                        >
                            Continue
                        </Button>
                    </Form.Group>
                </Form>
            </FormContainer>
        </div>
    );
};

export default Payment;
