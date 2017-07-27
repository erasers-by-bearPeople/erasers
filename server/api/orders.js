const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

/**
 * tk: Something that will make your lives easier is to implement
 * a patten similar to what we saw in Juke where we use
 * router.param to find the resource by its id, and then
 * attach it to the request object for use downstream.
 */

router.get('/', (req, res, next) => {
  Order.findAll()
    .then(orders => res.json(orders))
    .catch(next)
})

router.get('/:orderId', (req, res, next) => {
  // tk: don't forget findById!
  Order.findAll({
    where: {
      id: req.params.orderId
    }
  })
    .then(order => res.json(order))
    .catch(next)
})


router.put('/:orderId', (req, res, next) => {
  Order.update(
    {
      complete: true
    },
    {
      where: {
        id: req.params.orderId
      }
    })
    .then(order => res.json(order))
    .catch(next)
})


router.post('/', (req, res, next) => {
  Order.create(req.body)
    .then((order) => {
      // tk: good job! This will persist an order on the session!
      req.session.orderId = order.id
      res.json(order)
    })
    .catch(next)
})

router.delete('/:orderId', (req, res, next) => {
  const id = req.params.orderId
  Order.destroy({ where: {id} })
    .then(() => res.status(204).send('order removed'))
    .catch(next)
})
