import React  from 'react'
//import {connect} from 'react-redux'
import {Table,Button,Glyphicon,FormGroup,FormControl} from 'react-bootstrap'


const Orders = () => {
  //just to get the display going
  const wireArray = [
    {
      id: 1,
      descritption: 'White Bear',
      price: 500,
      quantity: 1,
      category: 'Novelty',
      image: '/images/white_bear.jpg'
    },
    {
      id: 2,
      descritption: 'Pink Perl',
      price: 600,
      quantity: 1,
      category: 'Standard',
      image: '/images/pink_perl.jpg'
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
              <th>Descritption</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {wireArray.map((order)=>{
              //adding up total (have another function for this)
              total += order.price
              return (<tr key={order.id}>
                <td><img src={order.image} height='50px'/></td>
                <td>{order.descritption}</td>
                <td>{order.category}</td>
                <td>{formatter.format(order.price/100)}</td>
                <td>
                  <form>
                    <FormGroup bsSize="small">
                      <FormControl
                        className="form-control"
                        defaultValue={order.quantity} //this will be value with onchange
                        required
                      />
                    </FormGroup>
                  </form>
                </td>
                <td><Button bsSize='xsmall'>
                  <Glyphicon glyph='glyphicon glyphicon-remove'/>
                </Button></td>
              </tr>
              )
            })}
            <tr>
              <th colSpan='3'>Total:</th>
              <th>{formatter.format(total/100)}</th>
              <th colSpan='2'></th>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default Orders
