/* -----------------    IMPORTS     ------------------ */

import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_ORDERS = 'GET_ORDERS'
const ADMIN_GET_ORDERS = 'ADMIN_GET_ORDERS'
const EMPTY_ORDERS = 'EMPTY_ORDERS'

/**
* ACTION CREATORS
*/

const getUserOrders = orders => ({type: GET_ORDERS, orders})
const emptyUserOrders = () => ({type: EMPTY_ORDERS})

export const emptyActiveUserOrders = () =>
  dispatch =>
    dispatch(emptyUserOrders())


const adminGetUserOrders = adminOrders => ({type: ADMIN_GET_ORDERS, adminOrders})

export const getAllUserOrders = ()=>
  dispatch =>
    axios.get('/api/orders/user')
      .then(res =>
        dispatch(getUserOrders(res.data)))
      .catch(err => console.log(err))

export const adminGetAllUserOrders = ()=>
  dispatch =>
    axios.get('/api/orders/')
      .then(res =>
        dispatch(adminGetUserOrders(res.data)))
      .catch(err => console.log(err))
      /**
      * REDUCER
      */

export default function (state = [], action) {
  switch (action.type) {
  case GET_ORDERS:
    return action.orders
      
  case ADMIN_GET_ORDERS:
    return Object.assign({}, state, {
      adminOrders: action.adminOrders
    })
      
  case EMPTY_ORDERS:
    return []

  default:
    return state
  }
}
