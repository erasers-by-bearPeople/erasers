/* -----------------    IMPORTS     ------------------ */

import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_ORDERS = 'GET_ORDERS'
const EMPTY_ORDERS = 'EMPTY_ORDERS'

/**
* ACTION CREATORS
*/

const getUserOrders = orders => ({type: GET_ORDERS, orders})
const emptyUserOrders = () => ({type: EMPTY_ORDERS})

/**
 * THUNK CREATORS
 */

export const emptyActiveUserOrders = () =>
  dispatch =>
    dispatch(emptyUserOrders())


export const getAllUserOrders = ()=>
  dispatch =>
    axios.get('/api/orders/user')
      .then(res =>
        dispatch(getUserOrders(res.data)))
      .catch(err => console.log(err))
/**
* REDUCER
*/

export default function (state = [], action) {
  switch (action.type) {
  case GET_ORDERS:
    return action.orders
  case EMPTY_ORDERS:
    return []
  default:
    return state
  }
}
