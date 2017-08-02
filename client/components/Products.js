import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {filterProductsByCategory, fetchProducts} from "../store";

class Products extends Component {

  componentDidMount() {
    this.props.fetchAllProducts()
  }

  render() {
    const products = this.props.products

    return (
      <div className="container">
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchAllProducts() {
      dispatch(fetchProducts())
    },
    handleChange(event) {
      event.preventDefault()
      dispatch(fetchProducts())
      dispatch(filterProductsByCategory(event.target.value))
    }
  })
}

export default connect(mapState, mapDispatchToProps)(Products)
