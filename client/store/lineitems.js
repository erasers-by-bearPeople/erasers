import axios from 'axios'

/**
 * ACTION TYPES
 */
const LINEITEMS_GET = 'LINEITEMS_GET'
const LINEITEM_ADD = 'LINEITEM_ADD'
const LINEITEM_REMOVE = 'LINEITEM_REMOVE'
const LINEITEM_UPDATE_QUANTITY = 'LINEITEM_UPDATE_QUANTITY'
const EMPTY_LINE_ITEMS = 'EMPTY_LINE_ITEMS'
/**
 * ACTION CREATORS
 */
const getLineItems = order => ({type: LINEITEMS_GET, order})
const addLineItem = lineItem => ({type: LINEITEM_ADD, lineItem})
const removeLineItem = id => ({type: LINEITEM_REMOVE, id})
const updateLineItemQuantity = lineItem => ({type: LINEITEM_UPDATE_QUANTITY, lineItem})
const emptyActiveLineITems = emptyItems => ({type: EMPTY_LINE_ITEMS, emptyItems})

/**
 * THUNK CREATORS
 */
export const emptyActiveUserItems = () =>
  dispatch =>
    dispatch(emptyActiveLineITems())


export const fetchLineItems = () =>
  dispatch =>
    axios.get('/api/lineitems/')
      .then(res =>
        dispatch(getLineItems(res.data)))
      .catch(err => console.log(err))

export const addToOrder = (product) =>
  dispatch =>
    axios.post('/api/lineitems/', product)
      .then(res =>
        dispatch(addLineItem(res.data)))
      .catch(err => console.log(err))

export const updateQuanityLineItem = (item) =>
  dispatch =>
    axios.put('/api/lineitems/',item)
      .then(res =>
        dispatch(updateLineItemQuantity(item)))
      .catch(err => console.log(err))

export const deleteLineItem = (id) =>
  dispatch =>
    axios.delete(`/api/lineitems/${+id}`)
      .then(() =>  dispatch(removeLineItem(+id)))
/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
  case LINEITEMS_GET:
    return action.order
  case LINEITEM_ADD:
    return [...state,...action.lineItem]
  case LINEITEM_REMOVE:
    return state.filter((item)=>{
      return item.id !== action.id
    })
  case EMPTY_LINE_ITEMS:
    return []
  case LINEITEM_UPDATE_QUANTITY:
    return state.map((item)=>{
      if(action.lineItem.id === item.id){
        item.quantity = action.lineItem.quantity
        return item
      }else{
        return item
      }

    })
  default:
    return state
  }
}
