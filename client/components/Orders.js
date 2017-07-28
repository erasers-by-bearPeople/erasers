import React  from 'react'
//import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Table,Button,Glyphicon,FormGroup,FormControl} from 'react-bootstrap'


const Orders = () => {
  //just to get the display going
  const wireArray = [
    {
      id: 32,
      complete: 'complete',
      price: 1300
    },
    {
      id: 43,
      complete: 'active',
      price: 1600
    }
  ]
  let total = 0
  //we may not use this but its fun either wy
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })
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
              <th>Total</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {wireArray.map((order)=>{
              //adding up total (have another function for this)
              total += order.price
              return (<tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.complete}</td>
                <td>{formatter.format(order.price/100)}</td>

                <td><Link to="/orderdetail"><Button bsSize='small'>
                  <Glyphicon glyph='glyphicon glyphicon-pencil'/>
                </Button></Link></td>
              </tr>
              )
            })}
            <tr>
              <th colSpan='2'>Total:</th>
              <th>{formatter.format(total/100)}</th>
              <th colSpan='1'></th>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default Orders
