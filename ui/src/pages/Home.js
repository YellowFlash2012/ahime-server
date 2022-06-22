import { useEffect} from "react";
import { Col, Row } from "react-bootstrap";
import { listProducts } from "../actions/productActions";

import {useDispatch, useSelector} from 'react-redux'

import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductsCaroussel from "../components/ProductsCaroussel";
import { Link } from "react-router-dom";
import Meta from "../components/Meta";


const Home = () => {

    // searchbox functionality
    const keyword = useParams().keyword;

    // pagination functionality
    const pageNumber = useParams().pageNumber || 1;

    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const { loading, error, products, pages, page } = productList;

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber));
    }, [dispatch, keyword, pageNumber])


    return (
        <div>
            <Meta />

            {!keyword ? <ProductsCaroussel /> : <Link to='/' className="btn btn-light">Go Back</Link> }
            <h1>Latest products</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    <Row>
                        {products.map((product) => {
                            return (
                                <Col
                                    key={product._id}
                                    sm={12}
                                    md={6}
                                    lg={4}
                                    xl={3}
                                >
                                    <Product product={product} />
                                </Col>
                            );
                        })}
                            </Row>
                            
                            <Paginate pages={pages} page={page} keyword={keyword ? keyword:''} />
                </>
            )}
        </div>
    );
};

export default Home;
