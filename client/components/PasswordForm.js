import React from 'react'
import { connect } from 'react-redux'
import { editUser} from '../store'

class PasswordForm extends React.Component {
  render () {

    const {user, handleSubmit} = this.props

    return (
      <div className="container">
        <form onSubmit={(event) => handleSubmit(user, event)}>
            <div>
              <h4>Enter New Password: </h4>
              <input
                type="text"
                placeholder="Enter new password"
                name="passwordOne"
              />
            </div>
            <div>
              <h4>Re-enter New Password: </h4>
              <input
                type="text"
                placeholder="Enter new password"
                name="passwordTwo"
              />
            </div>
          <button className="btn btn-primary" type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return ({
    user: state.user
  })
}

const mapDispatch = (dispatch, ownProps) => {
  return ({
    handleSubmit (user, event) {
      event.preventDefault()
      const passwordOne = event.target.passwordOne.value
      const passwordTwo = event.target.passwordTwo.value

      if (passwordOne !== passwordTwo) return 'Passwords do not match. Please Re-enter'

      const userInfo = {
        id: +user.id,
        password: passwordOne,
        changePassword: false
      }

      dispatch(editUser(userInfo))
      ownProps.history.push('/account')
    }
  })
}

export default connect(mapState, mapDispatch)(PasswordForm)
