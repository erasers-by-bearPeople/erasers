/* -----------------    IMPORTS     ------------------ */

import axios from 'axios'


/* -----------------    ACTION TYPES     ------------------ */

const GET_REVIEWS = 'GET_REVIEWS'
const ADD_REVIEW = 'ADD_REVIEW'

/* ------------   ACTION CREATORS     ------------------ */

const getReviews = (reviews) => {
  const action = {type: GET_REVIEWS, reviews}
  return action
}

const addReview = (review) => {
  const action = {type: ADD_REVIEW, review}
  return action
}

/* ------------       THUNK CREATORS     ------------------ */

export const getAllReviewsById = (id) => {
  return dispatch => {
    axios.get(`/api/reviews/${id}`)
      .then(res => dispatch(getReviews(res.data)))
      .catch(err => console.log(err))
  }
}

export const addReviewById = (review) => {
  return dispatch => {
    axios.post(`/api/reviews/${review.productId}`, review)
      .then(res => dispatch(addReview(res.data)))
      .catch(err => console.log(err))
  }
}

/* ------------       REDUCERS     ------------------ */

export default function (reviews = [], action) {
  switch (action.type) {
    case GET_REVIEWS:
      return action.reviews
    case ADD_REVIEW:
      return [...reviews, action.review]
    default:
      return reviews
  }
}
