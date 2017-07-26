const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Order.findAll()
    .then(orders => res.json(orders))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Order.findAll({
    where: {
      id: req.params.id
    }
  })
    .then(order => res.json(order))
    .catch(next)
})


router.put('/:id',(req, res, next) => {
  Order.update(
    {
      complete: true
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then(order => res.json(order))
    .catch(next)
})


router.post('/:id',(req, res, next) => {
  Order.update(
    req.body
    ,
    {
      where: {
        id: req.params.id
      }
    })
    .then(order => res.json(order))
    .catch(next)
})
