import React from 'react'
import { connect } from 'react-redux'

const OrderConfirmation = (props) => {

  return (
    <h1>Thank you for your order!</h1>
  )
}

const mapStateToProps = (state) => {
  return {
    userCheckout: state.orders.userCheckout
  }
}

export default connect(mapStateToProps)(OrderConfirmation)




