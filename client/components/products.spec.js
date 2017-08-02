import {expect} from 'chai'
import React from 'react'
import {mapState, Products} from './Products'
import {shallow} from 'enzyme'

describe('Products file', () => {

  describe('mapState', () => {

    const fakeProduct = {
      title: 'test product',
      description: 'testing testing testing',
      inventory: 10,
      price: 1000,
      id: 1
    }

    const multipleProducts = [
      {
        title: 'test product',
        description: 'testing testing testing',
        inventory: 10,
        price: 1000,
        id: 1
      },
      {
        title: 'test product 2',
        description: 'testing testing testing testing',
        inventory: 100,
        price: 10000,
        id: 11
      }
    ]

    const fakeState = {
      products: fakeProduct
    }

    const fakeStateMultiple = {
      products: multipleProducts
    }

    it('returns product from the products on state', () => {
      expect(mapState(fakeState).products).to.be.equal(fakeProduct)
    })

    it('returns title of the product on state', () => {
      expect(mapState(fakeState).products.title).to.be.equal('test product')
    })

    it('can handle multiple products', () => {
      expect(mapState(fakeStateMultiple).products).to.be.equal(multipleProducts)
    })

    it('returns the # of products on state', () => {
      expect(mapState(fakeStateMultiple).products.length).to.be.equal(2)
    })
  })

})