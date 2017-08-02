/* -----------------    IMPORTS     ------------------ */

import axios from 'axios'

/**
 * ACTION TYPES
 */

const ADMIN_GET_ORDERS = 'ADMIN_GET_ORDERS'

/**
* ACTION CREATORS
*/

const adminGetUserOrders = adminOrders => ({type: ADMIN_GET_ORDERS, adminOrders})

/**
 * THUNK CREATORS
 */
export const adminGetAllUserOrders = ()=>
  dispatch =>
    axios.get('/api/orders/')
      .then(res =>
        dispatch(adminGetUserOrders(res.data)))
      .catch(err => console.log(err))

export const adminGetFilteredUserOrders = (status) =>
  dispatch =>
    axios.put('/api/orders/filter', status)
      .then(res =>
        dispatch(adminGetUserOrders(res.data)))
      .catch(err => console.log(err))

/**
* REDUCER
*/

export default function (state = [], action) {
  switch (action.type) {
    case ADMIN_GET_ORDERS:
      return action.adminOrders
    default:
      return state
  }
}
