import React from 'react'
import { connect } from 'react-redux'
import { adminGetAllUserOrders, adminGetFilteredUserOrders } from '../store'
import { Link } from 'react-router-dom'
import {Table, Button, Glyphicon, FormControl, FormGroup } from 'react-bootstrap'





class ManageUserOrders extends React.Component {

  componentDidMount() {
    this.props.adminGetAllUserOrders()
  }

  render() {

    const orders = this.props.adminOrders

    return(
      <div>
        <div className="constainer">
          <h2>Customer Orders</h2>
        </div>
        <select onChange={this.props.handleChange} name="status">
          <option value="All">All Orders</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="complete">Complete</option>
        </select>
        <Table bordered hover responsive striped >
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Status</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                { orders && orders.map(order=>{
                  return (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>
                        <FormGroup controlId="formControlsSelect" bsSize="sm">
                          <FormControl defaultValue={order.status} data-id={order.id} componentClass="select" onChange={this.props.handleChange} name='status'>
                              {['active', 'pending', 'complete'].map((status)=>{
                                return <option
                                  key={status}
                                  value={status}>{status}
                                </option>
                              })}
                          </FormControl>
                        </FormGroup>
                      </td>
                      <td>{order.name}</td>
                      <td>{order.street}, {order.city}, {order.state} {order.zip}</td>
                      <Link to={`/management/orders/${order.id}`}>
                        <Button >
                            <Glyphicon
                              data-id={order.id}
                              glyph='glyphicon glyphicon-eye-open'
                            />
                          </Button>
                    </Link>
                  </tr>
                  )})}
           </tbody>
       </Table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    adminOrders: state.adminOrders
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    adminGetAllUserOrders(){
      dispatch(adminGetAllUserOrders())
    },
    handleChange(event){
      if (event.target.value === 'All') return dispatch(adminGetAllUserOrders())
      const status = {status: event.target.value}
      dispatch(adminGetFilteredUserOrders(status))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ManageUserOrders)


