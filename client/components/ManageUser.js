import React from 'react'
import { connect } from 'react-redux'
import { editAccount, deleteAccount} from '../store'


class ManageUser extends React.Component {

  render () {

    const {account, isAdmin, deleteAccount, handleSubmit} = this.props

    return (
      <div className="container">
        <h2>Account Management for User: {account.name}</h2>
        <form onSubmit={(event) => handleSubmit(account, event)}>
          <div>
            <h4>User Name: </h4>
            <input
              type="text"
              defaultValue={account.name && account.name}
              name="name"
            />
          </div>
          <div>
            <h4>User Email: </h4>
            <input
              type="text"
              defaultValue={account.email && account.email}
              name="email"
            />
          </div>
          <div>
            <h4>Password: </h4>
            <input
              type="text"
              defaultValue={account.password && account.password}
              name="password"
            />
          </div>
          {isAdmin ?
            <div>
              <h4>Administrator: </h4>
              { account.isAdmin ?
                <select name="isAdmin">
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select> :
                <select name="isAdmin">
                  <option value="false">False</option>
                  <option value="true">True</option>
                </select>
              }
            </div>
            : null
          }
          {isAdmin ?
            <div>
              <h4>Trigger Change User Password: </h4>
              <select name="changePassword">
                <option defaultValue="false">False</option>
                <option value="true">True</option>
              </select>
            </div>
            : null
          }
          <button className="btn btn-primary" type="submit">Submit</button>
        </form>
        {isAdmin ?
          <div>
            <h4>Delete Account</h4>
            <button onClick={(event) => deleteAccount(account, event)}>DELETE</button>
          </div>
          : null
        }
      </div>
    )
  }
}

const mapState = state => {
  return ({
    account: state.account,
    changePassword: state.user.changePassword,
    isAdmin: state.user.isAdmin
  })
}

const mapDispatch = (dispatch, ownProps) => {
  return ({
    handleSubmit (user, event) {
      event.preventDefault()

      const userInfo = {
        id: +user.id,
        name: event.target.name.value,
        email: event.target.email.value,
        isAdmin: event.target.isAdmin.value,
        password: event.target.password.value,
        changePassword: event.target.changePassword.value
      }
      dispatch(editAccount(userInfo))
      ownProps.history.push('/account')
    },
    deleteAccount (account, event) {
      event.preventDefault()
      dispatch(deleteAccount(account))
      ownProps.history.push('/account')
    }
  })
}

export default connect(mapState, mapDispatch)(ManageUser)
