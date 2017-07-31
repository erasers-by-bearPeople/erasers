const router = require('express').Router()
const {Order, LineItem} = require('../db/models')
const nodemailer = require('nodemailer')

//nodemailer
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD
  }
})

const confEmail = (orderInfo) => {
  return  {
    from: 'ERASERS!ERASERS!ERASERS! <AllAboutErasers@gmail.com>',
    to: orderInfo.email,
    subject: 'Order Confirmation ',
    text:`Thank you for your order, ${orderInfo.name}! You'll receive another e-mail when your order ships`,
    html:`<p>Thank you for your order, ${orderInfo.name}! You'll receive another e-mail when your order ships</p>`
  }
}


//

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

router.put('/', (req, res, next) => {
  const id = req.session.orderId
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


