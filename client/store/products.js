/* -----------------    IMPORTS     ------------------ */

import axios from 'axios'
import history from '../history'


/* -----------------    ACTION TYPES     ------------------ */

const GET_PRODUCTS = 'GET_PRODUCTS'

/* ------------   ACTION CREATORS     ------------------ */

const getProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    products
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

/* ------------       REDUCERS     ------------------ */

export default function (products = [], action) {
  switch (action.type) {
  case GET_PRODUCTS:
    return action.products
  default:
    return products
  }
}
