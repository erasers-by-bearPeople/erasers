/* -----------------    IMPORTS     ------------------ */
import axios from 'axios'

/* -----------------    ACTION TYPES     ------------------ */
const GET_ACCOUNT = 'GET_ACCOUNT'
const REMOVE_ACCOUNT = 'REMOVE_ACCOUNT'
const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT'

/* ------------   ACTION CREATORS     ------------------ */
const getAccount = user => ({type: GET_ACCOUNT, user})
const removeAccount = () => ({type: REMOVE_ACCOUNT})
const updateAccount = user => ({type: UPDATE_ACCOUNT, user})


/* ------------       THUNK CREATORS     ------------------ */
export const fetchAccount = email =>
  dispatch =>
    axios.post('/api/users', {email})
      .then(res =>
        dispatch(getAccount(res.data)))
      .catch(err => console.log(err))

export const editAccount = user =>
  dispatch =>
    axios.put(`/api/users/${user.id}`, user)
      .then(res =>
        dispatch(updateAccount(res.data)))
      .catch(err => console.log(err))

export const releaseAccount = () =>
  dispatch =>
    dispatch(removeAccount())

export const deleteAccount = user =>
  dispatch =>
    axios.delete(`/api/users/${user.id}`)
      .then(res =>
        dispatch(removeAccount()))
      .catch(err => console.log(err))

/* ------------       REDUCERS     ------------------ */
export default function (state = {}, action) {
  switch (action.type) {
  case GET_ACCOUNT:
    return action.user
  case REMOVE_ACCOUNT:
    return {}
  case UPDATE_ACCOUNT:
    return action.user
  default:
    return state
  }
}
