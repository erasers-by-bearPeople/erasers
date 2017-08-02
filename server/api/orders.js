const router = require('express').Router()
const {Order, LineItem} = require('../db/models')
const nodemailer = require('nodemailer')
const {confEmail, transporter } = require('./email')


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

router.get('/active', (req, res, next) => {
  const active = {}
  //this is a cheat because in the real world this would
  if(req.user) {
    active.status = 'active'
    active.userId = req.user.id

    Order.findOne({where: active})
      .then((order) => {
        req.session.order = order
        return order
      }).then(order => res.json(order))
      .catch(next)
  }else{
    res.json(req.session.order)
  }


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
  const id = req.session.order.id
  Order.update(req.body, {where: {id}, returning: true})
    .then(orderInfo => {

      let mailOptions = confEmail(orderInfo[1][0])
      //promisify if possible
      transporter.sendMail(mailOptions, (error, info) => {
        return error ? next(error) : res.json(orderInfo[1][0])
      })
    })
    .catch(next)
})


router.post('/', (req, res, next) => {
  // order is already live, it lives in session as Id and in DB
  //return the order, but update the DB in the case that the user was not logged
  //this might make more sense in the store, but I need the userid which
  //is not avalible in the stor

  if(req.session.order){
    if(req.user){
      Order.update({userId: req.user.id},{where:{
        id: req.session.order.id
      }})
      .then(order => res.json(order))
      .catch(next)
    } else {
      //non auth user gets the order ID an no post happens
      return res.json(req.session.order)
    }
  } else {
    //if user logged in  new order ads DB
    if(req.user){
      req.body.userId = req.user.id
    }
    Order.create(req.body)
      .then((order) => {
        req.session.order = order
        return res.json(order)
      })
      .catch(next)
  }
})



router.delete('/:orderId', (req, res, next) => {
  req.order.destroy()
    .then(() => res.sendStatus(204))
    .catch(next)
})
