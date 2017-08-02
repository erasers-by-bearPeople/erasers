import React from 'react'
import { connect } from 'react-redux'
import { editProduct, singleProduct } from '../store'

class ManageProduct extends React.Component {

  componentDidMount () {
    this.props.fetchSingleProduct(this.props.match.params.productId)
  }

  render () {

    const product = this.props.product
    let isStandard = true
    if (product.category && product.category === 'Novelty') isStandard = false
    
    return (
        <div className="container">
          <h2>Product Management for Product: {product.title}</h2>
          <form onSubmit={(event) => this.props.handleSubmit(product, event)}>
            <div>
              <h4>Title: </h4>
              <input
                type="text"
                defaultValue={product.title && product.title}
                name="title"
              />
            </div>
            <div>
              <h4>Price Per Item: </h4>
              <input
                type="text"
                defaultValue={product.price && product.price}
                name="price"
              />
            </div>
            <div>
              <h4>Category: </h4>
              { isStandard ?
                <select name="category">
                  <option value="Standard">Standard</option>
                  <option value="Novelty">Novelty</option>
                </select> :
                <select name="category">
                  <option value="Novelty">Novelty</option>
                  <option value="Standard">Standard</option>
                </select>
              }
            </div>
            <div>
              <h4>Item Description: </h4>
              <textarea
                type="text"
                rows="3" cols="100"
                defaultValue={product.description && product.description}
                name="description"
              />
            </div>
            <div>
              <h4>In Stock: </h4>
              <input
                type="text"
                defaultValue={product.inventory && product.inventory}
                name="inventory"
              />
            </div>
            <div>
              <h4>Images: </h4>
              <input
                type="text"
                defaultValue={product.image && product.image}
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
    product: state.product
  })
}

const mapDispatch = (dispatch, ownProps) => {
  return ({
    fetchSingleProduct(id) {
      dispatch(singleProduct(id))
    },
    handleSubmit (product, event) {
      event.preventDefault()
      if (Number.isNaN(+event.target.price.value) || Number.isNaN(+event.target.inventory.value)) return

      const newValues = {
        id: product.id,
        title: event.target.title.value,
        price: +event.target.price.value,
        category: event.target.category.value,
        description: event.target.description.value,
        inventory: +event.target.inventory.value,
        image: event.target.image.value
      }
      dispatch(editProduct(newValues))
      ownProps.history.push(`/products/${product.id}`)
    }
  })
}

export default connect(mapState, mapDispatch)(ManageProduct)
