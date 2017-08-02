import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
const UserHome = (props) => {

  const {user} = props

  return (
    <div>
      <h3>Welcome, {user.email}</h3>
      {
        user.changePassword ? 
        <div>
          <Link to={`/user/${user.id}/password`}><h2>Must Change Password! Click on Link!></h2></Link>
        </div>
        : null
      }
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
