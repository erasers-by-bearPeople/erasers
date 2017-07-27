const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')

/* global describe it beforeEach */

describe('Order model', () => {
  //
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Order Create', () => {

    let orderCreated

    beforeEach(() => {
      return Order.create({
      })
        .then((order) => {
          orderCreated = order.dataValues
        })
    })

    it('orderid should be 1 I guess', () => {

      expect(orderCreated).to.be.an('object')
      expect(orderCreated.complete).to.be.equal(false)
      expect(orderCreated.id).to.be.equal(1)

    })

  })

})
