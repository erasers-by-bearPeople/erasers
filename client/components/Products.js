import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {filterProductsByCategory, fetchProducts, singleProduct, makeUserOrder, addToOrder } from "../store";
import {Button, Glyphicon} from 'react-bootstrap'

class Products extends Component {

  componentDidMount() {
    this.props.fetchAllProducts()
  }

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
              <select className="browser-default" onChange={(event) => this.props.handleChange(event)}>
                <option value="" disabled defaultValue>Choose your option</option>
                <option value="">All</option>
                <option value="Novelty">Novelty</option>
                <option value="Standard">Standard</option>
              </select>
            </div>

            {/*Search By Category*/}
            <div className="col-lg-12">
              <form>
                <input
                  type="text"
                  onChange={(event) => this.props.handleChange(event)}
                  placeholder="category name"
                className="form-control"/>
              </form>
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
                          Array(5).fill('filler').map((element, index) => {
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
  console.log('state', state)
  return {
    products: state.products,
    product: state.product
  }
}

const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    fetchAllProducts() {
      dispatch(fetchProducts())
    },
    handleChange(event) {
      event.preventDefault()
      dispatch(fetchProducts())
      dispatch(filterProductsByCategory(event.target.value))
    },
    addProductOnClick(product){
      const productR = {
        price: product.price,
        productId: product.id
      }
      dispatch(makeUserOrder())
        .then(() => {
          dispatch(addToOrder(productR))
          ownProps.history.push('/orderdetail')
        })
    }
  }

}

export default connect(mapState, mapDispatchToProps)(Products)
