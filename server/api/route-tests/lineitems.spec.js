const {expect} = require('chai')
const request = require('supertest')
const db = require('../../db')
const app = require('../../index')
const Order = db.model('order')
const LineItem = db.model('lineitem')

/* global describe it beforeEach */

describe('---- lineitem routes ---- ', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('POST order', () => {

    beforeEach(() => {
      return Order.create({})
    })

    it('creates an order', () => {
      return request(app)
        .get('/api/orders')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].id).to.be.equal(1)
        })
    })

    describe('adds, saves and throws an error on an invalid line item update', () => {

      xit('adds a line item to an existing order', () => {
        return request(app)
          .post('/api/lineitems/1')
          .expect(200)
          .send({
            price: 100,
            quantity: 30
          })
          .then(res => {
            expect(res.body).to.be.an('object')
            expect(res.body.price).to.be.equal(100)
            expect(res.body.quantity).to.be.equal(30)
            expect(res.body.id).to.be.equal(1)
            expect(res.body.orderId).to.be.equal(1)
          })
      })

      // GET test here...

      it('saves a line item to the db', () => {
          return LineItem.findOne({
            where: {
              price: 100
            }
          })
            .then((_lineitem) => {
              expect(_lineitem.price).to.be.equal(100)
              expect(_lineitem.quantity).to.be.equal(30)
              expect(_lineitem.id).to.not.be.equal('undefined')
            }).catch((err) => {
              console.error(err.message)
            })
        })
      
    })
  })
})
