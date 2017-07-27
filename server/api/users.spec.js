const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

/* global describe it beforeEach */

describe('User routes', () => {

  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {

    const codysEmail = 'cody@puppybook.com'
    const name = 'cody'

    beforeEach(() => {
      return User.create({
        name: 'cody',
        email: codysEmail,
        password: '12345'
      })
      .then(() => {
        return User.create({
          name: 'joe',
          email: 'joedog@email.com',
          password: 'abcde'
        })
      })
    })

    it('GET /api/users', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].email).to.be.equal(codysEmail)
          expect(res.body.length).to.be.equal(2)
        })
    })

    it('PUT /api/users/1', () => {
      return request(app)
        .put('/api/users/1')
        .send({
          email: 'coolbeans@email.com',
          password: 'newpassword'
        })
        .then(() => User.findById(1))
        .then(user => {
          expect(user.email).to.be.equal('coolbeans@email.com')
          expect(user.password).to.be.equal('newpassword')
        })
    })

    it('DELETE /api/users/1', () => {
      return request(app)
        .delete('/api/users/1')
        .expect(204)
        .then(() => User.findById(1))
        .then(deletedUser => expect(deletedUser).to.be.equal(null))
    })

  }) // end describe('/api/users')

}) // end describe('User routes')
