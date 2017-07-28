import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'

class UserAccount extends React.Component {
  render () {

    const {id, name, email} = this.props

    return (
			<div className="container">
				<div>
          <h1>Your Account, {name}</h1>
          <h4>User Name: {name}</h4>
          <h4>Email: {email}</h4>
					<h4>Order History: <Link to={`/orders/${id}`}>Order History</Link></h4>
				</div>
        <div>
          <Link to="/user/update">Update Account Profile</Link>
        </div>
			</div>
    )
  }
}

const mapState = state => {
  return ({
    id: state.user.id,
    name: state.user.name,
    email: state.user.email
  })
}

const mapDispatch = dispatch => {
  return ({

  })
}

export default connect(mapState, mapDispatch)(UserAccount)
