import {expect} from 'chai'
import React from 'react'
import {mapState, ManageProduct} from './ManageProduct'
import {shallow} from 'enzyme'

describe('Manage Products file', () => {

  describe('mapState', () => {

    const fakeProduct = {
      title: 'test product',
      description: 'testing testing testing',
      inventory: 10,
      price: 1000,
      category: 'Novelty',
      image: '/images/public.jpg',
      id: 1
    }

    const fakeState = {
      product: fakeProduct
    }

    it('returns product from the products on state', () => {
      expect(mapState(fakeState).product).to.be.equal(fakeProduct)
    })

    it('returns title of the product on state', () => {
      expect(mapState(fakeState).product.title).to.be.equal('test product')
    })


  })

})