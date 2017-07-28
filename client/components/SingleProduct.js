import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { singleProduct } from '../store'
// const props = {
//   product: {
//     id: 1,
//     title: 'Crayon, Crayoff',
//     description: 'No worries about drawings on the wall with this colorful set, watch as your confused child tries to color to no avail',
//     price: 350,
//     category: 'Novelty',
//     inventory: 100,
//     image: '/images/crayons.jpg'
//   }
// }

class SingleProduct extends React.Component() {

  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.productId)
  }

  render() {

    const product = this.props.product

    return (
      <div id='single-product'>
        <img className='single-product-image' src={`${product.image}`} />
        <h1>
          {product.title}
        </h1>
        <h4>
          {product.description}
        </h4>
        <table className='text-center'>
          <tr>
            <td>
              <h3>${product.price / 100}</h3>
            </td>
            <td>
              <button className='btn btn-info' value={product.id}>
                Add To Cart
          </button>
            </td>
            <td className='quantity'>
              <label>Qty</label>
              <select id={product.id}>
                {
                  [1, 2, 3, 4, 5, 6, 7, 8].map(num => {
                    return <option key={num}>{num}</option>
                  })
                }
              </select>
            </td>
          </tr>
          <tr className='prod-reviews'>REVIEWS HERE</tr>
        </table>

      </div>

    )
  }

}

const mapStateToProps = (state) => {
  return {
    product: state.product,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSingleProduct(id) {
      dispatch(singleProduct(id))
    }
  }
}


const SingleProductContainer = connect(mapStateToProps, mapDispatchToProps)(SingleProduct)

export default SingleProductContainer
