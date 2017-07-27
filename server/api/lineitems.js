const router = require('express').Router()
const {LineItem} = require('../db/models')
module.exports = router

// tk: it's a bit weird from an API perspective that the base id parameter
// if the order id. If we want to get lineItems based on an orderId, that
// could just be a querystring parameter rather than a url parameter. Ex:
//
// LineItem.findAll({where: req.query})
//   and req.query wil contain a req.query.orderId

// get all lineitems
router.get('/:orderId', (req, res, next) => {
  LineItem.findAll({
    where: {
      orderId: req.params.orderId
    }
  })
    .then((lineitem) => {
      res.json(lineitem)
    }).catch(next)
})

// get a line item by id
router.get('/item/:itemId', (req, res, next) => {
  LineItem.findAll({
    where: {
      id: req.params.itemId
    }
  })
    .then((lineitem) => {
      res.json(lineitem)
    }).catch(next)
})


// tk: seems like if I can guess an order id, I can add a line item to someone's order!!!
// How can we prevent this?
// add a line item (post)
router.post('/:orderId', (req, res, next) => {
  req.body.orderId = req.params.orderId
  LineItem.create(req.body)
    .then((created) => {
      res.json(created)
    }).catch(next)
})


// update a line item (quantities)(put)
router.put('/:itemId', (req, res, next) => {
  LineItem.update(req.body, {
    where: {
      id: req.params.itemId
    }
  }
  ).then(updated => {
    res.json(updated)
  }).catch(next)
})

// delete a line item (destroy)
router.delete('/:itemId', (req, res, next) => {
  LineItem.destroy({
    where: {
      id: req.params.itemId
    }
  }).then((destroyed) => {
    res.json(destroyed)
  }).catch(next)
})
