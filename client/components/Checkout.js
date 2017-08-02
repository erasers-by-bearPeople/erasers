import React from 'react'
import { withRouter  } from 'react-router-dom'
import { connect} from 'react-redux'
import { changeUserOrder, fetchLineItems, fetchActiveUserOrder, validateUserOrderForm } from '../store'
import {Table,FormGroup, FormControl, ControlLabel} from 'react-bootstrap'
import  {states}  from '../../public/states'
import OrderSummary from './OrderSummary'
import {theValidator, orderButton } from './ValidateOrderForm'
/* add order details to checkout*/
class Checkout extends React.Component {

  componentDidMount() {
    this.props.fetchLineItems()
  }

  render() {
    //If null from DB
    let name
    if(this.props.order.name === null){ name = '' }else{ name = this.props.order.name}
    let email
    if(this.props.order.email === null){ email = '' }else{ email = this.props.order.email}
    let street
    if(this.props.order.street === null){ street = '' }else{ street = this.props.order.street}
    let city
    if(this.props.order.city === null){ city = '' }else{ city = this.props.order.city}
    let zip
    if(this.props.order.zip === null){ zip = '' }else{ zip = this.props.order.zip}
    const props = this.props
    const {formNameValidation, formStreetValidation, formEmailValidation, formCityValidation, formZipValidation} = theValidator(props.order)
    const lineitems = this.props.lineitems

    let total = 0
    return (
      <div id='checkout'>
        <h1>Checkout</h1>
        <form onSubmit={props.handleCheckout}>
          <FormGroup validationState={formNameValidation} >
            <ControlLabel>Name</ControlLabel>
            <FormControl
              className="form-control"
              name='name'
              type='text'
              value={name}
              placeholder="Enter Full Name"
              onChange={this.props.handleOnChange}
              required
            />
          </FormGroup>
          <FormGroup bsSize="small" validationState={formEmailValidation} >
            <ControlLabel>Email Address</ControlLabel>
            <FormControl
              className="form-control"
              name='email'
              type='text'
              value={email}
              placeholder="Enter email"
              onChange={this.props.handleOnChange}
              required
            />
          </FormGroup>
          <FormGroup bsSize="small" validationState={formStreetValidation}>
            <ControlLabel>Street</ControlLabel>
            <FormControl
              className="form-control"
              name='street'
              type='text'
              value={street}
              placeholder="Enter street address"
              onChange={this.props.handleOnChange}
              required
            />
          </FormGroup>
          <FormGroup bsSize="small" validationState={formCityValidation}>
            <ControlLabel>City</ControlLabel>
            <FormControl
              className="form-control"
              name='city'
              type='text'
              value={city}
              placeholder="Enter street address"
              onChange={this.props.handleOnChange}
              required
            />
          </FormGroup>
          <div className="form-group">
            <label htmlFor="formSelectState">State</label>
            <select className="form-control" name="formSelectState">{
              states.map(st => <option key={st}>{st}</option>)
            }
            </select>
          </div>
          <FormGroup  validationState={formZipValidation}>
            <ControlLabel>Zip Code</ControlLabel>
            <FormControl
              className="form-control"
              name='zip'
              type='text'
              value={zip}
              placeholder="Zip Code"
              onChange={this.props.handleOnChange}
              required
            />
          </FormGroup>
          {orderButton(formNameValidation,formStreetValidation,formEmailValidation,formCityValidation,formZipValidation)}

        </form>
        <OrderSummary lineitems={lineitems} />
       </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    lineitems: state.lineitems,
    order: state.order
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    handleCheckout(event) {
      event.preventDefault()
      const e = event.target
      const email = e.email.value
      const name = e.name.value
      const street = e.street.value
      const city = e.city.value
      const state = e.formSelectState.value
      const zip = +e.zip.value
      const status = 'pending'
      const orderDetails = { email, name, street, city, state, zip, status}
      dispatch(changeUserOrder(orderDetails))
        .then(() => {
          return ownProps.history.push('/confirmation')
        })
    },
    handleOnChange(event){
      const target = event.target
      const value = target.type === 'checkbox' ? target.checked : target.value
      const name = target.name
      dispatch(validateUserOrderForm({[name]: value}))
    },
    fetchLineItems() {
      dispatch(fetchLineItems())
      dispatch(fetchActiveUserOrder())
    }
  }
}

const CheckoutContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout))

export default CheckoutContainer
