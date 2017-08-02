import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {singleProduct, makeUserOrder, addToOrder, getAllReviewsById} from '../store'
import  {numAry}  from '../../public/states'


class SingleProduct extends Component {

  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.productId)
    this.props.fetchAllReviews(this.props.match.params.productId)
  }

  render() {

    const product = this.props.product
    const reviews = this.props.reviews

    return (
      <div className='single-product container col-md-12'>
        <div>
          <h4>{product.title}</h4>
          {product.inventory > 0 ?
            <button
              className='btn btn-info'
              value={product.id}
              data-name={product.title}
              data-id={product.id}
              onClick={()=>{return this.props.handleOnClick(product)}}
              style={{float: 'right'}}>
              Add To Cart
            </button>
            : null
          }
        </div>
        <div>
          <img className='single_product_image img-circle' src={`${product.image}`}/>
        </div>
        <div>
          {product.inventory > 0 ?
          <p>
            {product.description}
          </p>
          : <h2>Currently Unavailable</h2>
          }
        </div>
        <div>
          <label>Cost: ${product.price / 100}</label>
        </div>
        <div>
          <label>Qty</label>
          <select id={product.id}>
            {
              numAry.map(num => {
                return <option key={num}>{num}</option>
              })
            }
          </select>
        </div>
        <div>
          <label>Reviews: </label>
          {
            reviews && reviews.map((review, index) => {
              return (
                <div key={index}>
                  <p>
                    {review.message}
                  </p>
                </div>
              )
            })
          }
        </div>
        {this.props.isAdmin ?
          <div>
            <Link to={`/management/products/${product.id}`}><h3>Edit Product</h3></Link>
          </div>
          : null
        }
        <div>
          <Link to={`/reviews/${product.id}`}>Add Review</Link>
        </div>
      </div>

    )

  }
}

const mapStateToProps = (state) => {
  return {
    product: state.product,
    reviews: state.review,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchSingleProduct(id) {
      dispatch(singleProduct(id))
    },
    handleOnClick(product) {
      const productR = {
        price: product.price,
        productId: product.id
      }
      if (confirm(`Please confirm addition of ${product.title}`)) {
        dispatch(makeUserOrder())
          .then(() => {
            dispatch(addToOrder(productR))
            ownProps.history.push('/orderdetail')
          })
      }
    },
    fetchAllReviews(id) {
      dispatch(getAllReviewsById(id))
    }
  }
}


const SingleProductContainer = connect(mapStateToProps, mapDispatchToProps)(SingleProduct)

export default SingleProductContainer
