import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const Products = (props) => {

  const products = props.products

  return (
    <div className="container">
      <div className="row">
        <div className="row">

          {/*Header*/}
          <div className="col-md-12">
            <h4>Products</h4>
            <h5>Products Available: {products.length}</h5>
          </div>

          {/*Refine by Search*/}
          <div className="filter col-md-12">
            <label>Refine by Search</label>
            <select>
              <option>
              </option>
            </select>
          </div>

          {/*Refine by Category*/}
          <div>
            <label>Refine by Category</label>
            <select>
              <option>
              </option>
            </select>
          </div>

          {/*product listing*/}
          <div className="row">
            {
              products && products.map((product) => {
                return (
                  <div className="col-md-4" key={product.id}>
                    <h3>{product.title}</h3>
                     <Link to={`/products/${product.id}`}>
                       <img src={product.image} className="products_image"/>
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

                    <button className="btn btn-info" value={product.id}>+</button>
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

const mapState = (state) => {
  return {
    products: state.products
  }
}

export default connect(mapState)(Products)
