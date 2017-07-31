/* -----------------    IMPORTS     ------------------ */

import axios from 'axios'


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


export function completeCheckout(orderDetails, history) {
  return function thunk (dispatch) {
    return axios.put('/api/orders', orderDetails)
    .then(res => {
      dispatch(checkoutOrder(res.data))
      history.push('/confirmation')
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
  case CREATE_ORDER_ID:
    return action.orderId
  default:
    return state
  }
}
