const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')
const Bluebird = require('bluebird')
/* global describe it beforeEach */

describe('Order model', () => {
  //
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Order Create', () => {

    beforeEach(() => {
      return Bluebird.all([
        Order.create({}),
        Order.create({}),
        Order.create({})
      ])
    })

    xit('orderid checks', () => {
      //fillfix later Shayne
      Order.findAll()
        .then(res => res.data)
        .then((order)=>{
          expect(order).to.be.an('array')
        })
        //  console.log(orderCreated.id,'------------------------------------')
      //   //need help into get into this object

      //  expect(orderCreated.complete).to.be.equal(false)
    //  expect(ordersCreated.length).to.be.equal(3)
    //   //expect(orderCreated.complete(false)).to.be.equal(true)
    })

  }) // end describe('correctPassword')

}) // end describe('User model')
