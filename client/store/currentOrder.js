/* -----------------    IMPORTS     ------------------ */

import axios from 'axios'

/**
 * ACTION TYPES
*/
const CREATE_ORDER = 'CREATE_ORDER'
//const GET_ORDER = 'GET_ORDER'
const CHANGE_ORDER = 'CHANGE_ORDER'


const createUserOrder = order => ({type: CREATE_ORDER, order})
const updateUserOrder = order => ({type: CHANGE_ORDER, order})

/**
 * THUNK CREATORS
 */


export const makeUserOrder = () =>
  dispatch =>
    axios.post('/api/orders/')
      .then(res =>
        dispatch(createUserOrder(res.data)))
      .catch(err => console.log(err))


export function changeUserOrder(order) {
  return function thunk (dispatch) {
    return axios.put('/api/orders', order)
      .then(res => {
        dispatch(updateUserOrder(res.data))
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export default function (state = {}, action) {
  switch (action.type) {
  case CREATE_ORDER:
    return action.order
  case CHANGE_ORDER:
    return action.order
  default:
    return state
  }
}
