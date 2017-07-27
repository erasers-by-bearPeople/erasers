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
          orderCreated = order
        })
    })

    it('orderid should be 1 I guess', () => {
    //  console.log(orderCreated)
      expect(orderCreated.complete).to.be.equal(false)
      expect(orderCreated.id).to.be.equal(1)
      //expect(orderCreated.complete(false)).to.be.equal(true)
    })

  }) // end describe('correctPassword')

}) // end describe('User model')
