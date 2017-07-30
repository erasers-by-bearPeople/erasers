const router = require('express').Router()
const {Product, Review} = require('../db/models')
module.exports = router


router.param('productId', (req, res, next, productId) => {
  Product.findById(productId)
    .then(product => {
      if (!product) {
        const error = new Error('Not Found :(')
        error.status = 404
        next(error)
      } else {
        req.product = product
        return next()
      }
    })
})


router.get('/', (req, res, next) => {
  Product.findAll()
    .then((products) => res.json(products))
    .catch(next)
})

// find a product and its associated reviews
router.get('/:productId', (req, res, next) => {
  const id = req.params.productId
  Product.findOne({ where: {id}, include: [Review] })
    .then((product) => {
      req.session.product = product
      return res.status(200).json(product)
    })
    .catch(next)
})

//create new product
router.post('/', (req, res, next) => {
  Product.create(req.body)
    .then((product) => {
      return res.status(201).json(product)
    })
    .catch(next)
})

router.put('/:productId', (req, res, next) => {
  req.product.update(req.body)
    .then(updatedProduct => res.json(updatedProduct))
    .catch(next)
})

router.delete('/:productId', (req, res, next) => {
  req.product.destroy()
    .then(() => res.sendStatus(204))
    .catch(next)
})
