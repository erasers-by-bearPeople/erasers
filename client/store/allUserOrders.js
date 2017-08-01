/* -----------------    IMPORTS     ------------------ */

import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_ORDERS = 'GET_ORDERS'

/**
* ACTION CREATORS
*/

const getUserOrders = orders => ({type: GET_ORDERS, orders})

export const getAllUserOrders = ()=>
  dispatch =>
    axios.get('/api/orders/user')
      .then(res =>
        dispatch(getUserOrders(res.data)))
      .catch(err => console.log(err))


      /**
      * REDUCER
      */

export default function (state = {}, action) {
  switch (action.type) {
  case GET_ORDERS:
    return Object.assign({},state,{
      orders: action.orders
    })
  default:
    return state
  }
}
