import React from 'react'
import { connect } from 'react-redux'
import { addProduct } from '../store'

class AddProduct extends React.Component {
  render () {
    
    return (
        <div className="container">
          <h2>Add New Product to Inventory</h2>
          <form onSubmit={this.props.handleSubmit}>
            <div>
              <h4>Title: </h4>
              <input
                type="text"
                placeholder="Product Name"
                name="title"
              />
            </div>
            <div>
              <h4>Price Per Item: </h4>
              <input
                type="text"
                defaultValue="0"
                name="price"
              />
            </div>
            <div>
              <h4>Category: </h4>
                <select name="category">
                  <option defaultValue="Standard" >Standard</option>
                  <option value="Novelty">Novelty</option>
                </select>
            </div>
            <div>
              <h4>Item Description: </h4>
              <textarea
                type="text"
                rows="3" cols="100"
                placeholder="Description"
                name="description"
              />
            </div>
            <div>
              <h4>In Stock: </h4>
              <input
                type="text"
                defaultValue="0"
                name="inventory"
              />
            </div>
            <div>
              <h4>Images: </h4>
              <input
                type="text"
                placeholder="Image url"
                name="image"
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
    )
  }
}

const mapState = state => {
  return ({

  })
}

const mapDispatch = dispatch => {
  return ({
    handleSubmit (event) {
      event.preventDefault()
      if (Number.isNaN(+event.target.price.value) || Number.isNaN(+event.target.inventory.value)) return

      const newProduct = {
        title: event.target.title.value,
        price: +event.target.price.value,
        category: event.target.category.value,
        description: event.target.description.value,
        inventory: +event.target.inventory.value,
        image: event.target.image.value
      }
      dispatch(addProduct(newProduct))
    }
  })
}

export default connect(mapState, mapDispatch)(AddProduct)
