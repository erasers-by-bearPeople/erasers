const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

router.param('orderId', (req, res, next, orderId) => {
  Order.findById(orderId)
    .then(order => {
      if (!order) {
        const error = new Error('Not found')
        error.status = 404
        next(error)
      } else {
        req.order = order
        return next()
      }
    })
})


router.get('/', (req, res, next) => {
  Order.findAll()
    .then(orders => res.json(orders))
    .catch(next)
})

router.get('/:orderId', (req, res) => {
  res.json(req.order)
})


router.put('/:orderId', (req, res, next) => {
  //if we take an order out of complete, we will need to change this maybe req.body
  req.order.update({complete: true})
    .then(order => res.json(order))
    .catch(next)
})


router.post('/', (req, res, next) => {
  Order.create(req.body)
    .then((order) => {
      req.session.orderId = order.id
      res.json(order)
    })
    .catch(next)
})

router.delete('/:orderId', (req, res, next) => {
  req.order.destroy()
    .then(() => res.sendStatus(204))
    .catch(next)
})
