import React, {Component}  from 'react'
import {connect} from 'react-redux'
import {Table, Button, Glyphicon, FormGroup, FormControl} from 'react-bootstrap'
import { fetchLineItems, deleteLineItem, updateQuanityLineItem } from '../store'

class LineItem extends Component {

  componentDidMount() {
    this.props.fetchLineItems()
  }
  render(){
    let total = 0
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    })
    if(this.props.lineitems.length){
      return(
        <div>
          <h1>Your Erasers Cart</h1>
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
                </tr>
              </thead>
              <tbody>
                {this.props.lineitems.map((item)=>{
                  //adding up total (have another function for this)
                  total += item.price * item.quantity
                  return (<tr key={item.id}>
                    <td><img src={item.product.image} height='50px'/></td>
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
                  </tr>
                  )
                })}
                {/* <tr>
                  <th colSpan='3'>Total:</th>
                  <th>{formatter.format(total/100)}</th>
                  <th colSpan='2'></th>
                </tr> */}
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
    lineitems: state.lineitems,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLineItems() {
      dispatch(fetchLineItems())
    },
    handleOnRemove(event){
      if(confirm(`${event.target.dataset.id} Please confirm adition of ...${event.target.dataset.title}`)){
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
