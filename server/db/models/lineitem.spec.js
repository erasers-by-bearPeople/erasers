const {expect} = require('chai')
const request = require('supertest')
const app = require('../../index')
const LineItem = require('./lineitem')
const db = require('../')

/* global describe it before */

describe('model test specs', () => {
  before(() => {
    return db.sync({force: true})
  })

  it('has require and quantity as fields', () => {
    return LineItem.create({
      price: 1000,
      quantity: 30
    })
      .then(saved => {
        expect(saved.price).to.be.equal(1000)
        expect(saved.quantity).to.be.equal(30)
      })
  })

  it('requires price and quantity to be integers', () => {
    return LineItem.create({
      price: 40,
      quantity: 30
    })
      .then(saved => {
        expect(saved.price).to.be.equal(40)
        expect(saved.quantity).to.be.equal(30)
      })
  })

})

