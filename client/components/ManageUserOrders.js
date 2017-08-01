import React from 'react'
import { connect } from 'react-redux'

import { adminGetAllUserOrders } from '../store'
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
                              {['pending', 'complete'].map((status)=>{
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
                      <td><Button
                        bsSize='lg'
                        onClick={this.props.handleOrderView}>
                        <Glyphicon
                          data-id={order.id}
                          glyph='glyphicon glyphicon-eye-open'
                        />
                      </Button></td>
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
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ManageUserOrders)


