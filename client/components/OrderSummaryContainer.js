import React from 'react'
import {connect} from 'react-redux'
import OrderSummary from './OrderSummary'
import { adminFetchOrderLineitems } from '../store'


class OrderSummaryContainer extends React.Component{

  componentDidMount() {
    this.props.adminLineitemThunk(this.props.match.params.orderId)
  }

  render() {

    const lineitems = this.props.adminLineitem

    return(
      <div>
        <h1>lineitems</h1>
        <OrderSummary lineitems={lineitems}/>
      </div>
    )
  }


}

const mapStateToProps = state => {
  return {
    adminLineitem: state.adminLineitem
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    adminLineitemThunk(orderId) {
      dispatch(adminFetchOrderLineitems(orderId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummaryContainer)
