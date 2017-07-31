import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {completeCheckout} from '../store'


class Checkout extends React.Component {

  render() {
    const states = [ 'AL','AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'HI', 'ID', 'IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH', 'NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY' ]

    const props = this.props

    return (
    <div id='checkout'>
      <h1>Checkout</h1>
      <form onSubmit={props.handleCheckout}>
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

          <button type="submit" className="btn btn-primary" >Submit</button>

      </form>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const id = Number(ownProps.match.params.orderId)
  return {
    handleCheckout(event) {
      const e = event.target
      const orderId = id
      const email = e.formEmail.value
      const name = e.formName.value
      const address = e.formStreet.value
      const city = e.formCity.value
      const state = e.formSelectState.value
      const zip = e.formZip.value
      const orderDetails = { orderId, email, name, address, city, state, zip}
      dispatch(completeCheckout(orderDetails))
    }
  }
}

const CheckoutContainer = connect(mapStateToProps, mapDispatchToProps)(Checkout)

export default CheckoutContainer
