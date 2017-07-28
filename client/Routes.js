import React, {Component} from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import {Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Main, Login, Signup, UserHome, OrderDetail, Orders, SingleProduct, Products} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {

  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {

    const {isLoggedIn} = this.props

    return (
      <Router history={history}>
        <Main>
          <div className='container'>
            <Switch>

              {/* Routes placed here are available to all visitors */}
              <Route exact path='/products/:productId' component={SingleProduct} />
              <Route path="/products" component={Products} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              {
                isLoggedIn ?
                  <Switch>
                    {/* Routes placed here are only available after logging in */}
                    <Route path="/home" component={UserHome} />
                    <Route path="/orders" component={Orders} />
                    <Route path="/orderdetail" component={OrderDetail} />
                  </Switch> : null
              }
              {/* Displays our Login component as a fallback */}
              <Route component={Login} />

            </Switch>
          </div>
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
