import React from 'react'
import { withRouter  } from 'react-router-dom'
import { connect} from 'react-redux'
import { changeUserOrder, fetchLineItems } from '../store'

import  {states}  from '../../public/states'
import OrderSummary from './OrderSummary'

/* add order details to checkout*/
class Checkout extends React.Component {

  componentDidMount() {
    this.props.fetchLineItems()
  }

  render() {

    const props = this.props
    const lineitems = this.props.lineitems

    let total = 0
    return (
      <div id='checkout'>
        <h1>Checkout</h1>
        <form onSubmit={props.handleCheckout
          }>
          <div className="form-group">
            <label htmlFor="formName">Name</label>
            <input type="text" className="form-control" name="formName" placeholder="Enter full name" required />
          </div>
          <div className="form-group">
            <label htmlFor="formEmail">Email Address</label>
            <input type="email" className="form-control" name="formEmail" placeholder="Enter email" required />
          </div>
          <div className="form-group">
            <label htmlFor="formStreet">Street</label>
            <input type="text" className="form-control" name="formStreet" placeholder="Enter street address" required />
          </div>
          <div className="form-group">
            <label htmlFor="formCity">City</label>
            <input type="text" className="form-control" name="formCity" placeholder="Enter city" required />
          </div>
          <div className="form-group">
            <label htmlFor="formSelectState">State</label>
            <select className="form-control" name="formSelectState">{
              states.map(st => <option key={st}>{st}</option>)
            }
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="formZip">Zip Code</label>
            <input type="text" className="form-control" name="formZip" placeholder="Enter zip code" required />
          </div>

            <button onClick={props.handleClick} type="submit" className="btn btn-primary" >Submit</button>

        </form>
        <OrderSummary lineitems={lineitems} />
       </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    lineitems: state.lineitems,
    order: states.order
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    handleCheckout(event) {
      event.preventDefault()
      const e = event.target
      const email = e.formEmail.value
      const name = e.formName.value
      const street = e.formStreet.value
      const city = e.formCity.value
      const state = e.formSelectState.value
      const zip = +e.formZip.value
      const status = 'pending'
      const orderDetails = { email, name, street, city, state, zip, status}
      dispatch(changeUserOrder(orderDetails))
        .then(() => {
          return ownProps.history.push('/confirmation')
        })

    },
    fetchLineItems() {
      dispatch(fetchLineItems())
    },
  }
}

const CheckoutContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout))

export default CheckoutContainer
