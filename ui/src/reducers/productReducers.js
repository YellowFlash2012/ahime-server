import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,
    PRODUCT_DETAILS_RESET,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL
} from "../constants/productConstants";

// all products
export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }
            
        case PRODUCT_LIST_SUCCESS:
            // to account for products, pages & pages in the fetch all products route
            return { loading: false, products: action.payload.products, pages:action.payload.pages, page:action.payload.page }
        
        case PRODUCT_LIST_FAIL:
            return {loading:false,error:action.payload}
    
        default:
            return state;
    }
}

// single product
export const productDetailsReducer = (state = { product: {reviews:[]} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { ...state, loading: true }
            
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }
        
        case PRODUCT_DETAILS_FAIL:
            return { ...state, loading: false, error: action.payload }
        
        case PRODUCT_DETAILS_RESET:
            return {}
    
        default:
            return state;
    }
}

// product delete reducer - by admin only
export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return { loading: true };

        case PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true };

        case PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
}

// create product reducer - by admin only
export const createProductReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return { loading: true };

        case PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product:action.payload };

        case PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload };
        
        case PRODUCT_CREATE_RESET:
            return {}

        default:
            return state;
    }
}

// edit product reducer - by admin only
export const updateProductReducer = (state = {product:{}}, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return { loading: true };

        case PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true, product:action.payload };

        case PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        
        case PRODUCT_UPDATE_RESET:
            return {product:{}}

        default:
            return state;
    }
}

// product REVIEWS reducer
export const productReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true };

        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true };

        case PRODUCT_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload };

        case PRODUCT_CREATE_REVIEW_RESET:
            return { };

        default:
            return state;
    }
}
// product top rated reducer
export const productTopRatedReducer = (state = {products:[]}, action) => {
    switch (action.type) {
        case PRODUCT_TOP_REQUEST:
            return { loading: true, products:[] };

        case PRODUCT_TOP_SUCCESS:
            return { loading: false, products: action.payload };

        case PRODUCT_TOP_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
}