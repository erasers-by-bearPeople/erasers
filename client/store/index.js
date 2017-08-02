import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import user from './user'
import product from './product'
import products from './products'
import orders from './allUserOrders'
import order from './currentOrder'
import lineitems from './lineitems'
import review from './review'
import account from './account'
import adminOrders from './manageOrders'
import adminLineitem from './manageOrderLineItems'

const reducer = combineReducers({
  user,
  product,
  products,
  orders,
  lineitems,
  review,
  account,
  order,
  adminOrders,
  adminLineitem

})


const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './product'
export * from './products'
export * from './allUserOrders'
export * from './lineitems'
export * from './review'
export * from './account'
export * from './currentOrder'
export * from './manageOrders'
export * from './manageOrderLineItems'
