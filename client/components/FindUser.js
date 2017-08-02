import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchAccount} from '../store'

class FindUser extends React.Component {
  render () {

    const account = this.props.account

    return (
      <div className="container">
        <div>
          <form onSubmit={this.props.fetchSingleAccount}>
            <h3>Search User Account</h3>
            <input
            type="text"
            placeholder="Search by Email"
            name="accountEmail"
            />
            <button type="submit">Submit</button>
          </form>
        </div>
        {account.id ?
        <div>
          <h3>Found Account: </h3>
          <Link to={`/management/user/${account.id}`}><h3>{account.name && account.name}</h3></Link>
        </div> : null
        }
      </div>
    )
  }
}

const mapState = state => {
  return ({
    account: state.account
  })
}

const mapDispatch = dispatch => {
  return ({
    fetchSingleAccount(event) {
      event.preventDefault()
      const email = event.target.accountEmail.value
      dispatch(fetchAccount(email))
    }
  })
}

export default connect(mapState, mapDispatch)(FindUser)
