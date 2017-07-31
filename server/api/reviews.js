const router = require('express').Router()
const {Review, Product} = require('../db/models')
module.exports = router


router.get('/', (req, res, next) => {
  Review.findAll()
    .then((reviews) => res.json(reviews))
    .catch(next)
})

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId
  Review.findAll({where: {productId: id}})
    .then((review) => {
      req.session.review = review
      return res.json(review)
    })
    .catch(next)
})

router.post('/:productId', (req, res, next) => {
  const id = req.params.productId
  Review.create(req.body)
    .then((newReview) => {
      res.json(newReview);
    })
    .catch(next);
});


