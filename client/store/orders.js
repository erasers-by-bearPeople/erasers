/* -----------------    IMPORTS     ------------------ */

import axios from 'axios'


/**
 * ACTION TYPES
 */
const CREATE_ORDER_ID = 'CREATE_ORDER_ID'
const CHECKOUT_ORDER = 'CHECKOUT_ORDER'
const GET_ORDERS = 'GET_ORDERS'
/**
* ACTION CREATORS
*/
const createOrderId = orderId => ({type: CREATE_ORDER_ID, orderId})
const checkoutOrder = orderId => ({type: CHECKOUT_ORDER, orderId})
const getOrders = orders => ({type: GET_ORDERS, orders})

/**
 * THUNK CREATORS
 */

export const getAllUserOrders = ()=>
  dispatch =>
    axios.get('/api/orders/user')
      .then(res =>
        dispatch(getOrders(res.data)))
      .catch(err => console.log(err))

export const makeOrderId = () =>
  dispatch =>
    axios.post('/api/orders/')
      .then(res =>
        dispatch(createOrderId(res.data)))
      .catch(err => console.log(err))



export function completeCheckout(orderDetails) {
  return function thunk (dispatch) {
    return axios.put('/api/orders', orderDetails)
    .then(res => {
      dispatch(checkoutOrder(res.data))
    })
      .catch(err => {
        console.log(err)
      })
  }
}


/**
* REDUCER
*/

export default function (state = {}, action) {
  switch (action.type) {
  case GET_ORDERS:
      // tk: this seems kind of strange to me: this means you have a state.orders.orders
      // why not simply write a separate reducer for orders and one for orderId?
    return Object.assign({},state,{
      orders: action.orders
    })
  case CREATE_ORDER_ID:
    return Object.assign({},state,{
      orderId: action.orderId
    })
  default:
    return state
  }
}
