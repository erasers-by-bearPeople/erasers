import axios from 'axios'

/**
 * ACTION TYPES
 */


const ADMIN_GET_LINEITEM = 'ADMIN_GET_LINEITEM'

/**
* ACTION CREATORS
*/

const adminGetLineitem = adminLineitem => ({type: ADMIN_GET_LINEITEM, adminLineitem})

/**
 * THUNK CREATORS
 */
export const adminFetchOrderLineitems = (orderId) =>
  dispatch =>
    axios.get(`/api/lineitems/${orderId}`)
      .then(res =>
        dispatch(adminGetLineitem(res.data)))
      .catch(err => console.log(err))
/**
* REDUCER
*/

export default function (state = [], action) {
  switch (action.type) {
    case ADMIN_GET_LINEITEM:
      return action.adminLineitem
    default:
      return state
  }
}
