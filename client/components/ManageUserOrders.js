import React from 'react'
import { connect } from 'react-redux'



class ManageUserOrders extends React.Component {

  componentDidMount() {
    this.props.fetchAllOrders()
  }

  render() {

    return(
      <div>
        <div className="constainer">
          <h2>Customer Orders</h2>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orders
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllOrders(){
      dispatch
    }
  }
}


const ManageUserOrdersContainer = connect(mapStateToProps, mapDispatchToProps)(ManageUserOrders)

export default ManageUserOrdersContainer
