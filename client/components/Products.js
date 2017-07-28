import React from 'react'
import {Link} from 'react-router-dom'

const Products = () => {

//  dummy list of products just to fire up the front-end
  const Products = [
    {
      id: 1,
      title: 'Batman Erasor',
      description: 'a very powerful eraser',
      price: 1000,
      category: 'Novelty',
      inventory: 1,
      image: 'images/batmanErasor.jpg'
    },
    {
      id: 2,
      title: 'Joker Erasor',
      description: 'a criminally insane eraser',
      price: 10000,
      category: 'Novelty',
      inventory: 1,
      image: 'images/jokerErasor.jpg'
    },
    {
      id: 3,
      title: 'Penguin Erasor',
      description: 'a very interesting eraser',
      price: 100,
      category: 'Standard',
      inventory: 1,
      image: 'images/penguinErasor.jpg'
    }

  ]

  return (
    <div className="container">
      <div className="row">
        <div className="row">

          {/*Header*/}
          <div className="col-md-12">
            <h4>Products</h4>
            <h5>Products Available: {Products.length}</h5>
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
          <div className="col-md-12">
            {
              Products.map((product) => {
                return (
                  <div className="col-md-4" key={product.id}>
                    <div className="product-card col-md-12">
                      <button className="btn btn-info" value={product.id}>+</button>
                      <div className="product-card-content col-md-6">
                        <p>Name: {product.title}</p>
                        <label>Cost: </label> ${product.price}
                        <p>Left: {product.inventory}!</p>
                      </div>
                      <div className="product-card-action col-md-6">
                        <Link to={`/products/${product.id}`}>
                          See more details...
                        </Link>
                      </div>
                    </div>
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

export default Products