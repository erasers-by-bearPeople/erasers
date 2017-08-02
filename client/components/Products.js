import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getAllReviewsById} from "../store/review";
import {singleProduct, makeUserOrder, addToOrder } from '../store'
import {Button, Glyphicon} from 'react-bootstrap'

class Products extends Component {

  render() {
    const products = this.props.products
    return (
      <div className="container">
        <div className="row">
          <div className="row">

            {/*Refine by Category*/}
            <div className="col-lg-12">
              <label>Filter</label>
              <select className="browser-default">
                <option value="" disabled defaultValue>Choose your option</option>
                <option value="0">All</option>
              </select>
            </div>

            {/*product listing*/}
            <div className="row">
              {
                products && products.map((product) => {
                  let id = product.id
                  return (
                    <div className="col-md-4" key={product.id} style={{margin: 0 + 'em', paddingRight: 3 + 'em'}}>
                      <div>
                        <div style={{textAlign: 'center'}}>
                          <h3>
                            {product.title}

                            <Button
                              bsSize='large'
                              onClick={()=>{return this.props.addProductOnClick(product)}}>
                              <Glyphicon
                                data-title={product.title}
                                data-id={product.id}
                                glyph='glyphicon glyphicon-plus'
                                style={{float: 'right'}}
                              />
                            </Button>

                            {/* <button onClick={()=>{return this.props.addProductOnClick()}} className="btn btn-info" data-id={product.id} value={product.id} style={{float: 'right'}}>+</button> */}
                          </h3>
                        </div>
                      </div>

                      <Link to={`/products/${product.id}`}>
                        <img src={product.image} className="products_image img-circle img-responsive img-center"
                             style={{width: 10 + 'em', height: 10 + 'em', align: 'center'}}/>
                      </Link>

                      <label>Cost: ${product.price}</label>
                      <p>In stock: {product.inventory}</p>
                      <p>
                        Rating:
                        {
                          Array(product.rating).fill('filler').map((element, index) => {
                            return (
                              <i className="glyphicon glyphicon-star" key={index}> </i>
                            )
                          })
                        }
                      </p>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    products: state.products,
    product: state.product
  }
}

const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    fetchReviewsById(id) {
      return dispatch(getAllReviewsById(id))
    },
    addProductOnClick(product){
      event.preventDefault()
      dispatch(makeUserOrder())
        .then(() => {
          dispatch(addToOrder(product))
          ownProps.history.push('/orderdetail')
        })
      //console.log(product)


    }
  }
}

export default connect(mapState, mapDispatchToProps)(Products)
