const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Order.findAll()
    .then(orders => res.json(orders))
    .catch(next)
})

router.get('/:orderId', (req, res, next) => {
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
