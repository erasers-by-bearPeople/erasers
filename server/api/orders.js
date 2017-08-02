const router = require('express').Router()
const {Order, LineItem} = require('../db/models')
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
  /// ugh but it works for now - would like to refactor
    Order.findById(req.session.order.id)
      .then((order)=>{
        req.session.order = order
        return res.json(order)
      })
      .catch(next)
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
      //possible work but not sure on kills stuff
      req.session.order = orderInfo
      transporter.sendMail(mailOptions, (error, info) => {
        return error ? next(error) : res.json(orderInfo[1][0])
      })
    })
    .catch(next)
})

//because the other form has email in it... didnt want to mess with
router.put('/validate', (req, res, next) => {
  const id = req.session.order.id
  Order.update(req.body, {where: {id}})
    .then(order => {
      return res.json(order)
    })
    .catch(next)
})


router.post('/', (req, res, next) => {


  if(!req.session.order){
    if(req.user){
      req.body.userId = req.user.id
    }
    Order.create(req.body)
      .then((order) => {
        req.session.order = order
        return res.json(order)
      })
      .catch(next)
  }else if(req.user && req.session.order.status === 'active'){
    ///update user
    Order.update({userId: req.user.id},{
      where:{
        id: req.session.order.id
      }
    }).then(order => res.json(order))
      .catch(next)
  }else if(req.session.order.status !== 'active'){
    if(req.user){
      req.body.userId = req.user.id
    }
    Order.create(req.body)
      .then((order) => {
        req.session.order = order
        return res.json(order)
      })
      .catch(next)
  }else{
    return res.json(req.session)
  }
})



router.delete('/:orderId', (req, res, next) => {
  req.order.destroy()
    .then(() => res.sendStatus(204))
    .catch(next)
})

router.put('/filter', (req, res, next) => {
  Order.findAll({where: {status: req.body.status}})
  .then(filteredOrders => res.json(filteredOrders))
  .catch(next)
})


