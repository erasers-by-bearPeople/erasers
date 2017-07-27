
const router = require('express').Router()
const {Review} = require('../db/models')
module.exports = router



//create review of product
router.post('/:productId', (req, res, next) => {
  const productId = req.params.productId
  const { title, message, userId } = req.body
  Review.create({
    title,
    message,
    userId,
    productId
  })
    .then(review => res.status(201).json(review))
    .catch(next)
})
