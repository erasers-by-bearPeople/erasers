/* -----------------    IMPORTS     ------------------ */

import axios from 'axios'
import history from '../history'


/* -----------------    ACTION TYPES     ------------------ */

const GET_PRODUCT = 'GET_PRODUCT'

/* ------------   ACTION CREATORS     ------------------ */

const getProduct = (res) => {
  return {
    type: GET_PRODUCT,
    product: res.data
  }
}


/* ------------       THUNK CREATORS     ------------------ */
export const singleProduct = (id) => {
  return dispatch => {
    axios.get(`/api/products/${id}`)
    .then(res => dispatch(getProduct(res)))
    //history.push?
    .catch(err => console.log(err))
  }
}

/* ------------       REDUCERS     ------------------ */

export default function(state = {}, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    default:
      return state
  }
}
