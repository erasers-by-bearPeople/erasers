/* -----------------    IMPORTS     ------------------ */

import axios from 'axios'
//import history from '../history'


/* -----------------    ACTION TYPES     ------------------ */

const GET_PRODUCT = 'GET_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

/* ------------   ACTION CREATORS     ------------------ */

const getProduct = (product) => {
  const action = { type: GET_PRODUCT, product }
  return action
}

const updateProduct = (product) => {
  const action = { type: UPDATE_PRODUCT, product }
  return action
}


/* ------------       THUNK CREATORS     ------------------ */

export const singleProduct = (id) => {
  return dispatch => {
    axios.get(`/api/products/${id}`)
      .then(res => dispatch(getProduct(res.data)))
      //history.push?
      .catch(err => console.log(err))
  }
}

export const editProduct = updatedProduct => {
  return dispatch => {
    axios.put(`/api/products/${updatedProduct.id}`, updatedProduct)
      .then(res => dispatch(updateProduct(res.data)))
      .catch(err => console.log(err))
  }
}

/* ------------       REDUCERS     ------------------ */

export default function (state = {}, action) {
  switch (action.type) {
  case GET_PRODUCT:
    return action.product
  case UPDATE_PRODUCT:
    return action.product
  default:
    return state
  }
}
