import {expect} from 'chai'
import React from 'react'
import {mapState, AddProduct} from './AddProduct'
import {shallow} from 'enzyme'
import {spy} from 'sinon'

describe('Add Product file', () => {
  describe('handle submit on add product file works', () => {

    let addProductComponent

    const fakeProps = {
      title: 'test review',
      price: 1000,
      category: 'Novelty',
      description: 'testing testing testing',
      inventory: 10000,
      handleSubmit: spy()
    }

    beforeEach(() => {
      addProductComponent = shallow(<AddProduct {...fakeProps} />)
    })

    it('invokes handleSubmit on submit', () => {

      addProductComponent.find('form').simulate('submit')
      expect(fakeProps.handleSubmit.calledOnce).to.be.equal(true)

    })

    it('returns title of the submit entry', () => {

      addProductComponent.find('form').simulate('submit')
      expect(fakeProps.title).to.be.equal('test review')

    })
  })

})