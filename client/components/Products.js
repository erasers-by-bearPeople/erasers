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
      <h1 className="productsTitle">Erasers!Erasers!Erasers!</h1>
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
                          </h3>
                        </div>
                      </div>

                      <Link to={`/products/${product.id}`}>
                        <img src={product.image} className="products_image img-circle img-responsive img-center"
                             />
                      </Link>

                      <label>Cost: ${product.price/100}</label>
                      { product.inventory > 0 ?
                         <p>In stock</p> :
                         <p>Out of stock</p>
                      }

                      <p>
                        Reviews:
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
