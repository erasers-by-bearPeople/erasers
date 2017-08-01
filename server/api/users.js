const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['name', 'id', 'email', 'isAdmin']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:userId', (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => res.json(user))
    .catch(next)
})

router.post('/', (req, res, next) => {
  User.findOne({where: {email: req.body.email}})
  .then(user => {
    if (!user) return res.status(401).send('Email does not exist')
    res.json(user)
  })
  .catch(next)
})

router.put('/:userId', (req, res, next) => {
  const id = +req.params.userId
  User.update(req.body, {where: {id}, returning: true, individualHooks: true})
    .then(updatedUser => res.json(updatedUser[1][0]))
    .catch(next)
})

router.delete('/:userId', (req, res, next) => {
  const id = req.params.userId
  User.destroy({where: {id}})
    .then(() => res.sendStatus(204))
    .catch(next)
})
