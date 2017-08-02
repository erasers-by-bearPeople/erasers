import React from 'react'
import { connect} from 'react-redux'
import { Link } from 'react-router-dom'
import { emptyActiveUserOrder } from '../store'

export class OrderConfirmation extends React.Component{

  render() {

    return (
      <div>
      <h1>Thank you for your order!</h1>
        <Link to={'/products'} >
          <button type="submit" className="btn btn-primary" >Back to Erasers!</button>
        </Link>
        </div>
    )
  }
}


export default OrderConfirmation





