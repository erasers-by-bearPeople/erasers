import React from 'react'
import { Link, withRouter  } from 'react-router-dom'
import { connect} from 'react-redux'
import { completeCheckout, fetchLineItems } from '../store'
import {Table} from 'react-bootstrap'


/* add order details to checkout*/
class Checkout extends React.Component {
  constructor() {
    super()
    this.state = {
      userCheckout: {}
    }

  }
  componentDidMount() {
    this.props.fetchLineItems()
  }

  render() {
    const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']
    const props = this.props

    let total = 0
    return (
      <div id='checkout'>
        <h1>Checkout</h1>
        <form onSubmit={props.handleCheckout}>
          <div className="form-group">
            <label htmlFor="formName">Name</label>
            <input onChange={props.handleNameChange} type="text" className="form-control" name="formName" placeholder="Enter full name" required />
          </div>
          <div className="form-group">
            <label htmlFor="formEmail">Email Address</label>
            <input onChange={props.handleEmailChange} type="email" className="form-control" name="formEmail" placeholder="Enter email" required />
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
        <div>
          <h4>Order Summary</h4>
          <div>
            <Table bordered hover responsive striped >
              <thead>
                <tr>
                  <th></th>
                  <th>Descritption</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>

                </tr>
              </thead>
              <tbody>
                {props.lineitems.map(item => {
                  //adding up total (have another function for this)
                  total += item.price * item.quantity
                  return (<tr key={item.id}>
                    <td><img src={item.product.image} height='50px' /></td>
                    <td>{item.product.title}</td>
                    <td>{item.product.category}</td>
                    <td>${item.price / 100}</td>
                    <td>{item.quantity}</td>
                  </tr>
                  )})}
              </tbody>
            </Table>
          </div>
        </div>
       </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    lineitems: state.lineitems
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
      dispatch(completeCheckout(orderDetails))
      .then(() => {
        return ownProps.history.push('/confirmation')
      })
    },
    fetchLineItems() {
      dispatch(fetchLineItems())
    }
  }
}

const CheckoutContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout))

export default CheckoutContainer
