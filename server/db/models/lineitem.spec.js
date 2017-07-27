const {expect} = require('chai')
const request = require('supertest')
const app = require('../../index')
const LineItem = require('./lineitem')
const db = require('../')

describe('model test specs', () => {
  before(() => {
    db.sync({force: true})
  })


  it('requires quantity', () => {
    let lineitem = LineItem.create({
      price: 1000,
    })
      .then((savedLineItem) => {
      expect(savedLineItem.quantity).to.not.be.an(undefined)
      })
  })

  it('requires price', () => {
    let lineitem = LineItem.create({
      quantity: 1000
    })
      .then((savedLineItem) => {
        expect(savedLineItem.price).to.not.be.an(undefined)
      })
  })

  it('require price to be an integer', () => {
    let lineitem = LineItem.create({
      price: 500,
      quantity: 1000
    })
      .then((savedLineItem) => {
        expect(savedLineItem.price.type).to.equal('integer')
      })
  })

  it('throws an error if price is not an integer', () => {
    let lineitem = LineItem.create({
      price: '',
      quantity: 500
    })
      .then((savedLineItem) => {
        expect(savedLineItem.price.type).to.equal('integer')
      })
  })

  it('throws an error if quantity is not an integer', () => {
    let lineitem = LineItem.create({
      price: 500,
      quantity: ''
    })
      .then((savedLineItem) => {
        expect(savedLineItem.quantity.type).to.equal('integer')
      })
  })
})