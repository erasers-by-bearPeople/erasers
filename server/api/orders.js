const router = require('express').Router()
const {Order, LineItem} = require('../db/models')
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

router.get('/user', (req, res, next) => {
  Order.findAll({
    where: {
      userId: req.session.passport.user
    },
    include: [LineItem]
  })
    .then(orders => res.json(orders))
    .catch(next)
})

router.get('/:orderId', (req, res) => {
  return res.json(req.order)
})


router.put('/:orderId', (req, res, next) => {
  //if we take an order out of complete, we will need to change this maybe req.body
  req.order.update(req.body)
    .then(order => res.json(order))
    .catch(next)
})


router.post('/', (req, res, next) => {
  if(req.session.orderId){
    return res.json(req.session.orderId)
  }else{
    if(req.session.id){
      req.body.userId = req.session.passport.user
    }
    Order.create(req.body)
      .then((order) => {
        req.session.orderId = order.id
        return res.json(order.id)
      })
      .catch(next)
  }
})

router.delete('/:orderId', (req, res, next) => {
  req.order.destroy()
    .then(() => res.sendStatus(204))
    .catch(next)
})
