import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {addReviewById, singleProduct} from "../store"

export class Review extends Component {
  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.productId)
  }

  render() {
    const product = this.props.product
    const user = this.props.user

    // review form
    return (
      <div id='review'>
        <h4>Submit Review</h4>
        <form onSubmit={(event) => this.props.handleSubmit(product, user, event)}>
          <h4>title:</h4>
          <input
            type="text"
            placeholder="Review Title"
            name="title"
          />
          <h4>comment:</h4>
          <input
            type="text"
            placeholder="Review Comment"
            name="message"
          />
          <h4>rating(1-5):</h4>
          <input
            type="text"
            placeholder="Review Rating"
            name="rating"
          />
          <button
          onSubmit={this.props.handleSubmit}
          type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

export const mapState = (state) => {
  return ({
    product: state.product,
    user: state.user
  })
}

export const mapDispatch = (dispatch, ownProps) => {
  return ({
    fetchProduct(id) {
      dispatch(singleProduct(id))
    },
    handleSubmit(product, user, event) {
      event.preventDefault()
      if (event.target.message.value.length < 20) return
      const newReview = {
        title: event.target.title.value,
        message: event.target.message.value,
        rating: +event.target.rating.value,
        productId: +product.id,
        userId: +user.id
      }
      dispatch(addReviewById(newReview))
        .then(() => {
          return ownProps.history.push(`/products/${product.id}`)
        })
    }
  })
}

export default connect(mapState, mapDispatch)(Review)
