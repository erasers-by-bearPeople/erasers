import React from 'react'
import { connect } from 'react-redux'

const product1 = {
  id: 1,
  title: 'Crayon, Crayoff',
  description: 'No worries about drawings on the wall with this colorful set, watch as your confused child tries to color to no avail',
  price: 350,
  category: 'Novelty',
  inventory: 100,
  image: '/images/crayons.jpg'
}

class ManageProduct extends React.Component {
  render () {

    //const {product} = this.props
    const product = product1

    return (
        <div className="container">
          <h2>Product Management for Product: {product.title}</h2>
          <form onSubmit={this.props.handleSubmit}>
            <div>
              <input
                type="text"
                defaultValue={product.title}
                name="title"
              />
            </div>
            <div>
              <input
                type="text"
                defaultValue={product.price}
                name="price"
              />
            </div>
            <div>
              <textarea
                type="text"
                rows="3" cols="100"
                defaultValue={product.description}
                name="description"
              />
            </div>
            <div>
              <input
                type="text"
                defaultValue={product.category}
                name="category"
              />
            </div>
            <div>
              <input
                type="text"
                defaultValue={product.inventory}
                name="inventory"
              />
            </div>
            <div>
              <input
                type="text"
                defaultValue={product.image}
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
    //product: state.product
  })
}

const mapDispatch = dispatch => {
  return ({
    handleSubmit () {
      //dispatch(updateProduct(newValues))
    }
  })
}

export default connect(mapState, mapDispatch)(ManageProduct)




// <select name="campus">
//               <option key={0} value={null}>Select Campus</option>
//                 {campuses.map(campus => <option key={campus.id} value={campus.id}>{campus.name}</option>)}
//             </select>