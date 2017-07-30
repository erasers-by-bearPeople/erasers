/* -----------------    IMPORTS     ------------------ */

import axios from 'axios'

/**
 * ACTION TYPES
 */
const CREATE_ORDER_ID = 'CREATE_ORDER_ID'
/**
* ACTION CREATORS
*/
const createOrderId = orderId => ({type: CREATE_ORDER_ID, orderId})

/**
 * THUNK CREATORS
 */

export const makeOrderId = () =>
  dispatch =>
    axios.post('/api/orders/')
      .then(res =>
        dispatch(createOrderId(res.data)))
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
