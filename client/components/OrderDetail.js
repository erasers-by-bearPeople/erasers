import React, {Component}  from 'react'
import {connect} from 'react-redux'
import {Table, Button, Glyphicon, FormGroup, FormControl} from 'react-bootstrap'
import { fetchLineItems, deleteLineItem, updateQuanityLineItem , fetchActiveUserOrder} from '../store'
import { Link } from 'react-router-dom'

class LineItem extends Component {

  componentDidMount() {
    this.props.fetchLineActive()
  }
  render(){
  //  console.log('in page change',this.props.location.pathname)
    /// same page for wish list
    let head = 'Your Erasers Cart'
    if(this.props.location.pathname === '/wishlist'){
      head = 'Your Wish List'
    }

    let total = 0
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    })
    if(this.props.lineitems.length){
      return(
        <div>
          <h1>{head}</h1>
          <div>
            <Table bordered hover responsive striped >
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Descritption</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Remove</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {this.props.lineitems.map((item)=>{
                  //adding up total (have another function for this)
                  total += item.price * item.quantity
                  return (<tr key={item.id}>
                    <td><Link to={`/products/${item.product.id}`}><img src={item.product.image} height='50px'/></Link></td>
                    <td>{item.product.title}</td>
                    <td>{item.product.category}</td>
                    <td>{formatter.format(item.price/100)}</td>
                    <td>
                      <FormGroup controlId="formControlsSelect" bsSize="large">
                        <FormControl defaultValue={item.quantity} data-id={item.id} componentClass="select" placeholder="select" onChange={this.props.handleOnChange} name='quantity'>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((quantity)=>{
                            return <option
                              key={quantity}
                              value={quantity}>{quantity}
                            </option>
                          })}
                        </FormControl>
                      </FormGroup>
                    </td>
                    <td>
                      <Button
                        bsSize='large'
                        onClick={this.props.handleOnRemove}>
                        <Glyphicon
                          data-title={item.product.title}
                          data-id={item.id}
                          glyph='glyphicon glyphicon-remove'
                        />
                      </Button>
                    </td>
                    <td>{formatter.format((item.price * item.quantity)/100)}</td>
                  </tr>
                  )
                })}
                <tr>
                  <th colSpan='3'>Total:</th>
                  <th>{formatter.format(total/100)}</th>
                  <th colSpan='3'></th>
                </tr>
              </tbody>
            </Table>
            <Link to={`/checkout/${this.props.lineitems[0].orderId}`} >
              <button type="submit" className="btn   btn-primary">Checkout</button>
            </Link>
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
    lineitems: state.lineitems,
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    fetchLineActive() {
      dispatch(fetchActiveUserOrder())
        .then(()=> dispatch(fetchLineItems()))
    },
    handleOnRemove(event){
      const name = event.target.dataset.title
      if(confirm(`${event.target.dataset.id} Please confirm removal of ${name}`)){
        dispatch(deleteLineItem(event.target.dataset.id))
      }
    },
    handleOnChange(event){
      const value = +event.target.value
      const id = +event.target.dataset.id
      dispatch(updateQuanityLineItem({quantity: value, id: id}))
    }
  }
}


const LineItemContainer = connect(mapStateToProps, mapDispatchToProps)(LineItem)

export default LineItemContainer
