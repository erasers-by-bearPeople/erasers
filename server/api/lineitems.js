const router = require('express').Router()
const {LineItem} = require('../db/models')
module.exports = router

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
