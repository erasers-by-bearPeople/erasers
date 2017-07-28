/* -----------------    IMPORTS     ------------------ */

import axios from 'axios'
import history from '../history'


/* -----------------    ACTION TYPES     ------------------ */

const GET_PRODUCTS = 'GET_PRODUCTS'

/* ------------   ACTION CREATORS     ------------------ */

const getProducts = (res) => {
  return {
    type: GET_PRODUCTS,
    products: res.data
  }
}


/* ------------       THUNK CREATORS     ------------------ */
export const Products = (id) => {
  return dispatch => {
    axios.get(`/api/products`)
      .then(res => dispatch(getProducts(res)))
      //history.push?
      .catch(err => console.log(err))
  }
}

/* ------------       REDUCERS     ------------------ */

export default function (state = {}, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    default:
      return state
  }
}