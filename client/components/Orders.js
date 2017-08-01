import React, {Component}  from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Table,Button,Glyphicon,FormGroup,FormControl} from 'react-bootstrap'
import { getAllUserOrders } from '../store'


class Orders extends Component {
  //just to get the display going
  componentDidMount() {
    this.props.fetchAllOrders()
  }
  render(){

    let total = 0
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    })
    if(this.props.orders){
      return(

        <div>
          <h1>Your Orders
          </h1>
          <div>
            <Table bordered hover responsive striped >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Total</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {this.props.orders.map((order)=>{

                  let button = <Link to="/orderdetail"><Button bsSize='small'>
                    <Glyphicon glyph='glyphicon glyphicon-pencil'/>
                  </Button></Link>
                  if(order.status === 'pending' || order.status === 'complete'){
                    button = <Button disabled bsSize='small'>
                      <Glyphicon glyph='glyphicon glyphicon-pencil'/>
                    </Button>
                  }
                  //adding up total (have another function for this)

                  let lineTotal = order.lineitems.reduce((sum,line)=>{
                    return sum + (line.price * line.quantity)
                  },0)

                  total += lineTotal
                  return (<tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.status}</td>
                    <td>{order.createdAt.slice(0, 10)}</td>
                    <td>{formatter.format(lineTotal/100)}</td>

                    <td>
                      {button}
                    </td>
                  </tr>
                  )
                })}
                <tr>
                  <th colSpan='2'>Total:</th>
                  <th>{formatter.format(total/100)}</th>
                  <th colSpan='2'></th>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      )
    }else{
      return (<div><h3>Loading...........</h3></div>)
    }
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orders,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllOrders() {
      dispatch(getAllUserOrders())
    }
  }
}


const OrdersContainer = connect(mapStateToProps, mapDispatchToProps)(Orders)

export default OrdersContainer
