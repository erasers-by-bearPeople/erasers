/* -----------------    IMPORTS     ------------------ */

import axios from 'axios'

/**
 * ACTION TYPES
*/
const CREATE_ORDER = 'CREATE_ORDER'
const GET_ACTIVE_ORDER = 'GET_ACTIVE_ORDER'
const CHANGE_ORDER = 'CHANGE_ORDER'
const EMPTY_ORDER = 'EMPTY_ORDER'
const UPDATE_ORDER_VALID = 'UPDATE_ORDER_VALID'


const createUserOrder = order => ({type: CREATE_ORDER, order})
const emailUserOrder = order => ({type: CHANGE_ORDER, order})
const getActiveUserOrder = order => ({type: GET_ACTIVE_ORDER, order})
const emptyUserOrder = () => ({type: EMPTY_ORDER})
const updateValidOrder = (order) => ({type: UPDATE_ORDER_VALID, order})
/**
 * THUNK CREATORS
 */

//because the other put has email in it
export function validateUserOrderForm(order) {
  return function thunk (dispatch) {
    return axios.put('/api/orders/validate', order)
      .then(() => {
        dispatch(updateValidOrder(order))
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const emptyActiveUserOrder = () =>
  dispatch =>
    dispatch(emptyUserOrder())
  //  .catch(err => console.log(err))

export const fetchActiveUserOrder = () =>
  dispatch =>
    axios.get('/api/orders/active')
      .then(res =>
        dispatch(getActiveUserOrder(res.data)))
      .catch(err => console.log(err))

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
        dispatch(emailUserOrder(res.data))
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
  case GET_ACTIVE_ORDER:
    return action.order
  case CHANGE_ORDER:
    return action.order
  case EMPTY_ORDER:
    return {}
  case UPDATE_ORDER_VALID:
    return Object.assign({},state,action.order)
  default:
    return state
  }
}
