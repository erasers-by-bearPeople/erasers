/* -----------------    IMPORTS     ------------------ */

import axios from 'axios'
import { browserHistory } from 'react-router'

/**
 * ACTION TYPES
 */
const CREATE_ORDER_ID = 'CREATE_ORDER_ID'
const CHECKOUT_ORDER = 'CHECKOUT_ORDER'
/**
* ACTION CREATORS
*/
const createOrderId = orderId => ({type: CREATE_ORDER_ID, orderId})

const checkoutOrder = orderId => ({type: CHECKOUT_ORDER, orderId})

/**
 * THUNK CREATORS
 */

export const makeOrderId = () =>
  dispatch =>
    axios.post('/api/orders/')
      .then(res =>
        dispatch(createOrderId(res.data)))
      .catch(err => console.log(err))



export const completeCheckout = (orderDetails) =>         dispatch =>
    axios.put(`/api/orders/${orderDetails.orderId}`, orderDetails)
    .then(res => dispatch(checkoutOrder(res.data)))
     .then(browserHistory.replace('/confirmation'))
      .catch(console.error)
      .catch(err => console.log(err))



/**
* REDUCER
*/

export default function (state = {}, action) {
  switch (action.type) {
  case CREATE_ORDER_ID:
    return action.orderId
  default:
    return state
  }
}
