const router = require('express').Router()
const {LineItem, Product} = require('../db/models')
module.exports = router

// get all lineitems
router.get('/', (req, res, next) => {
  const orderId = +req.session.order.id
  LineItem.findAll({
    where: {
      orderId: orderId
    },
    include:[Product]
  })
    .then((lineitem) => {
      return res.status(200).json(lineitem)
    }).catch(next)
})

//get lineitems for admin
router.get('/:orderId', (req, res, next) => {
  const orderId = +req.params.orderId
  LineItem.findAll({
    where: {orderId},
    include:[Product]
  })
    .then(lineitem => {
      return res.status(200).json(lineitem)
    }).catch(next)
})

// get a line item by id
router.get('/item/:itemId', (req, res, next) => {
  LineItem.findOne({
    where: {
      id: req.params.itemId
    }
  })
    .then((lineitem) => {
      return res.json(lineitem)
    }).catch(next)
})


// add a line item (post)
router.post('/', (req, res, next) => {

  // const lineItem = {
  //   quantity: 1,
  //   orderId: +req.session.order.id,
  //
  // }
  //
  // if(req.body){
  //   lineItem.price = req.body.price
  //   lineItem.productId = req.body.id
  // }
  //
  // if(req.session.product){
  //   lineItem.price = +req.session.product.price
  //   lineItem.productId = +req.session.product.id
  // }
  req.body.quantity = 1
  req.body.orderId = +req.session.order.id

  LineItem.create(req.body)
    .then((created) => {
      return res.json(created)
    }).catch(next)
})


// update a line item (quantities)(put)
router.put('/', (req, res, next) => {

  LineItem.update({quantity: req.body.quantity}, {
    where: {
      id: req.body.id
    }
  }
  ).then(updated => {
    return res.json(updated)
  }).catch(next)
})

// delete a line item (destroy)
router.delete('/:itemId', (req, res, next) => {
  LineItem.destroy({
    where: {
      id: req.params.itemId
    }
  }).then(() => {
    return res.sendStatus(202)
  }).catch(next)
})
