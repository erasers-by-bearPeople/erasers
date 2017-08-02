import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'

class UserAccount extends React.Component {
  render () {

    const {id, name, email, isAdmin} = this.props

    return (
			<div className="container">
				<div>
          <h1>Your Account, {name}</h1>
          <h4>User Name: {name}</h4>
          <h4>Email: {email}</h4>
					<h4>Order History: <Link to={`/orders/${id}`}>Order History</Link></h4>
				</div>
        <div>
          {
            isAdmin ?
            <div>
              <h3>Administrative Privileges</h3>
              <p><Link to="/management/products">Manage Eraser Products</Link></p>
              <p><Link to="/management/orders">Manage Orders</Link></p>
              <p><Link to="/management/user">Manage User Accounts</Link></p>

            </div>
            : null
          }
        </div>
			</div>
    )
  }
}

const mapState = state => {
  return ({
    id: state.user.id,
    name: state.user.name,
    email: state.user.email,
    isAdmin: state.user.isAdmin,
    account: state.account
  })
}

const mapDispatch = dispatch => {
  return ({
  })
}

export default connect(mapState, mapDispatch)(UserAccount)
