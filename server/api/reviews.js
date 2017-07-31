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
  Review.findOne({where: {id}, include: [Product]})
    .then((review) => {
      req.session.review = review
      return res.status(200).json(review)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
  Review.create({
    title: req.body.title,
    message: req.body.message,
    rating: req.body.rating,
    productId: req.body.productId,
    userId: req.body.userId
  })
    .then((newReview) => {
      res.json(newReview);
    })
    .catch(next);
});


