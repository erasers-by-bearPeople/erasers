/* -----------------    IMPORTS     ------------------ */

import axios from 'axios'


/* -----------------    ACTION TYPES     ------------------ */

const GET_REVIEW = 'GET_REVIEW'
const GET_ALLREVIEWS = 'GET_ALLREVIEWS'
//const ADD_REVIEW = 'ADD_REVIEW'

/* ------------   ACTION CREATORS     ------------------ */

const getReview = (review) => {
  const action = {type: GET_REVIEW, review}
  return action
}

const getReviews = (reviews) => {
  const action = {type: GET_ALLREVIEWS, reviews}
  return action
}

//const addReview = (review) => {
//  const action = {type: ADD_REVIEW, review}
//  return action
//}

/* ------------       THUNK CREATORS     ------------------ */

export const singleReview = (id) => {
  return dispatch => {
    axios.get(`/api/reviews/${id}`)
      .then(res => dispatch(getReview(res.data)))
      .catch(err => console.log(err))
  }
}

export const getAllReviews = () => {
  return dispatch => {
    axios.get(`/api/reviews/`)
      .then(res => dispatch(getReviews(res.data)))
      .catch(err => console.log(err))
  }
}

//export const addReviewToProduct = (id) => {
//  return dispatch => {
//    axios.post(`/api/reviews/${id}`)
//      .then(res => {
//        dispatch(addReview(res.data))
//      })
//      .catch(err => console.log(err))
//  }
//}

/* ------------       REDUCERS     ------------------ */

export default function (state = {}, action) {
  // tk: this seems to suggest that reviews could be either an object representing a single review or an array of reviews
  // that could be very confusing - each reducer should operate on only one data type
  switch (action.type) {
    case GET_REVIEW:
      return action.review
    case GET_ALLREVIEWS:
      return action.reviews
//    case ADD_REVIEW:
//      return action.review
    default:
      return state
  }
}
