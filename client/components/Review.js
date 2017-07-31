import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {addReviewToProduct} from "../store"

const Review = (props) => {
  const products = props.products

  // review form
  return (
    <div id='review'>
      <h4>Submit Review</h4>
      <form onSubmit={props.handleSubmit}>
        <div className="form-group">
          <label htmlFor="formName">title</label>
          <input type="text" className="form-control" name="formName" placeholder="Enter a title" required />
        </div>
        <div className="form-group">
          <label htmlFor="formEmail">message</label>
          <input type="email" className="form-control" name="formEmail" placeholder="Enter a comment" required />
        </div>
        <div className="form-group">
          <label htmlFor="formStreet">rating(1-5)</label>
          <input type="text" className="form-control" name="formStreet" placeholder="Enter a number between 1 - 5" required />
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </div>
  )
}

const mapState = (state) => {
  return {
    products: state.products,
  }
}

//const mapDispatchToProps = (dispatch, ownProps) => {
//  const productId = Number(ownProps.match.params.productId)
//  const userId = Number(ownProps.match.params.userId)
//  return {
//    handleSubmit(event) {
//      console.log(event)
//      const title = event.target.title.value
//      const message = event.target.message.value
//      const rating = event.target.rating.value
//      const reviewData = {title, message, rating, productId, userId}
//      dispatch(addReviewToProduct(reviewData))
//    }
//  }
//}

export default connect(mapState, /* mapDispatchToProps */)(Review)
