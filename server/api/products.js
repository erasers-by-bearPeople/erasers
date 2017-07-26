const router = require('express').Router()
const {Product, Review} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Product.findAll()
    .then((products) => res.status(202).json(products))
    .catch(next)
})

// find a product and its associated reviews
router.get('/:productId', (req, res, next) => {
  const id = req.params.productId
  Product.findOne({ where: {id}, include: [Review]})
    .then(product => res.status(200).json(product))
    .catch(next)
})

//create new product
router.post('/', (req, res, next) => {
  Product.create(req.body)
    .then(product => res.status(201).json(product))
    .catch(next)
})

//create review of product
router.post('/:productId/review', (req, res, next) => {
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

router.delete('/:productId', (req, res, next) => {
  const id = req.params.productId
  Product.destroy({ where: {id} })
    .then(() => res.sendStatus(204))
    .catch(next)
})

router.put('/:productId', (req, res, next) => {
  const id = req.params.productId
  Product.update(req.body, { where: {id}, returning: true })
    .then((updatedProduct) => res.status(202).json(updatedProduct))
    .catch(next)
})


