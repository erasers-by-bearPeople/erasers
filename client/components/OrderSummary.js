import React from 'react'
import {Table} from 'react-bootstrap'


const OrderSummary = (props) => {

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })
  const lineitems = props.lineitems

  return (
    <div>
        <h4>Order Summary</h4>
        <div>
          <Table bordered hover responsive striped >
            <thead>
              <tr>
                <th></th>
                <th>Descritption</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>

              </tr>
            </thead>
            <tbody>
              {lineitems && lineitems.map(item => {
                //adding up total (have another function for this)

                return (<tr key={item.id}>
                  <td><img src={item.product.image} height='50px' /></td>
                  <td>{item.product.title}</td>
                  <td>{item.product.category}</td>
                  <td>${item.price / 100}</td>
                  <td>{item.quantity}</td>
                  <td>{formatter.format((item.price * item.quantity)/100)}</td>
                </tr>
                )})}
            </tbody>
          </Table>
        </div>
      </div>
  )
}



export default OrderSummary
