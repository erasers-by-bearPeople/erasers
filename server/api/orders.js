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
      userId: req.user.id
    },
    include: [LineItem]
  })
    .then(orders => res.json(orders))
    .catch(next)
})

router.get('/:orderId', (req, res) => {
  return res.json(req.order)
})


router.put('/', (req, res, next) => {
  const id = req.session.orderId
  Order.update(req.body, {where: {id}})
    .then(order => res.json(order))
    .catch(next)
})


router.post('/', (req, res, next) => {
  // order is already live, it lives in session as Id and in DB
  //return the order, but update the DB in the case that the user was not logged
  //this might make more sense in the store, but I need the userid which
  //is not avalible in the stor
  if(req.session.orderId){
    if(req.user){
      Order.update({userId: req.user.id},{where:{
        id: req.session.orderId
      }}).then(order => res.json(order.id))
        .catch(next)
    }else{
      //non auth user gets the order ID an no post happens
      return res.json(req.session.orderId)
    }
  }else{
    //if user logged in  new order ads DB
    if(req.user){
      req.body.userId = req.user.id
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
