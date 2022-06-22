import React, { useState } from 'react';

import { Form, Button } from 'react-bootstrap'

import {useNavigate} from 'react-router-dom'

const SearchBox = () => {

    const navigate = useNavigate();

    const [keyword, setKeyword] = useState('');

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        
        if (keyword.trim()) {
            navigate(`/search/${keyword}`);
        } else {
            navigate('/')
        }
    }

    return (
        <div>
            <Form onSubmit={searchSubmitHandler} className='d-inline-flex'>
                
                    <Form.Control
                        type="text"
                        name="q"
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Search Products..."
                        className="mr-sm-2 ml-sm-5 col-xs-10"
                    ></Form.Control>
<span>
                    <Button
                        type="submit"
                        variant="outline-success"
                        className="p-2"
                    >
                        Search
                    </Button>
                </span>
            </Form>
        </div>
    );
};

export default SearchBox;
