const {expect} = require('chai')
const request = require('supertest')
const db = require('../../db')
const app = require('../../index')
const Order = db.model('order')

/* global describe it beforeEach */

describe('Order routes', () => {

  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/orders/', () => {


    beforeEach(() => {
      return Order.create({
      })
    })

    it('GET /api/orders', () => {
      return request(app)
        .get('/api/orders')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].id).to.be.equal(1)
        })
    })

    it('GET /api/orders/:id', () => {
      return request(app)
        .get('/api/orders/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.id).to.be.equal(1)
        })
    })
    beforeEach(() => {
      return Order.create({
      })

    })
    it('GET /api/orders/', () => {
      return request(app)
        .get('/api/orders')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(2)
        })
    })
    it('delete /api/orders/1', () => {
      return request(app)
        .delete('/api/orders/1')
        .expect(204)
        .then(res => {
          expect(res.body).to.be.an('object')
        })
    })

  }) // end describe('/api/orders')
//
}) // end describe('Orders routes')
