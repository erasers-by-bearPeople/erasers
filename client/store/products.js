/* -----------------    IMPORTS     ------------------ */

import axios from 'axios'
import history from '../history'


/* -----------------    ACTION TYPES     ------------------ */

const GET_PRODUCTS = 'GET_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'

/* ------------   ACTION CREATORS     ------------------ */

const getProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    products
  }
}

const postProduct = product => {
  return {
    type: ADD_PRODUCT,
    product
  }
}


/* ------------       THUNK CREATORS     ------------------ */
export const fetchProducts = () => {
  return dispatch => {
    axios.get(`/api/products`)
      .then(res => dispatch(getProducts(res.data)))
      .catch(err => console.log(err))
  }
}

export const addProduct = product => {
  return dispatch => {
    axios.post(`/api/products`, product)
      .then(res => dispatch(postProduct(res.data)))
      .catch(err => console.log(err))
  }
}

/* ------------       REDUCERS     ------------------ */

export default function (products = [], action) {
  switch (action.type) {
  case GET_PRODUCTS:
    return action.products
  case ADD_PRODUCT:
    return [...products, action.product]
  default:
    return products
  }
}
