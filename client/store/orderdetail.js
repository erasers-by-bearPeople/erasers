import axios from 'axios'

/**
 * ACTION TYPES
 */
const ORDER_DETAIL = 'ORDER_DETAIL'

/**
 * ACTION CREATORS
 */
const getOrder = order => ({type: ORDER_DETAIL, order})

/**
 * THUNK CREATORS
 */

export const fetchOrder = () =>
  dispatch =>
    axios.get(`/api/orders/`)
      .then(res =>
        dispatch(getOrder(res.data)))
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
  case ORDER_DETAIL:
    return action.order
  default:
    return state
  }
}
