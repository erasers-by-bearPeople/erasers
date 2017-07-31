import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {singleProduct, makeOrderId, addToOrder, singleReview, getAllReviews} from '../store'

class SingleProduct extends Component {

  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.productId)
    this.props.fetchSingleReview(this.props.match.params.productId)
  }

  render() {

    const product = this.props.product
    let singleReview = this.props.review

    return (
      <div id='single-product container col-md-12'>
        <div>
          <h4>{product.title}</h4>
          <button
            className='btn btn-info'
            value={product.id}
            data-name={product.title}
            data-id={product.id}
            onClick={this.props.handleOnClick}
            style={{float: 'right'}}>
            Add To Cart
          </button>
        </div>
        <div>
          <img className='single-product-image img-circle' src={`${product.image}`}/>
        </div>
        <div>
          <p>
            {product.description}
          </p>
        </div>
        <div>
          <label>Cost: ${product.price / 100}</label>
        </div>
        <div>
          <label>Qty</label>
          <select id={product.id}>
            {
              [1, 2, 3, 4, 5, 6, 7, 8].map(num => {
                return <option key={num}>{num}</option>
              })
            }
          </select>
        </div>
        <div>
          <label>Reviews</label>
          <p>{singleReview.message}</p>
        </div>
        {this.props.isAdmin ?
          <div>
            <Link to={`/management/products/${product.id}`}><h3>Edit Product</h3></Link>
          </div>
          : null
        }
      </div>

    )

  }
}

const mapStateToProps = (state) => {
  return {
    product: state.product,
    review: state.review,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchSingleProduct(id) {
      dispatch(singleProduct(id))
    },
    handleOnClick(event) {
      event.preventDefault()
      if (confirm(`Please confirm addition of ${event.target.dataset.name}`)) {
        dispatch(makeOrderId())
          .then(() => {
            dispatch(addToOrder())
            ownProps.history.push('/orderdetail')
          })
      }
    },
    fetchSingleReview(id) {
      dispatch(singleReview(id))
    }
  }
}


const SingleProductContainer = connect(mapStateToProps, mapDispatchToProps)(SingleProduct)

export default SingleProductContainer
