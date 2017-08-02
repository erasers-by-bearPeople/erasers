import {expect} from 'chai'
import React from 'react'
import {mapState, Review} from './Review'
import {shallow} from 'enzyme'
import {spy} from 'sinon'

describe('Review form file', () => {
  describe('handleSubmit on review form works', () => {

    let ReviewFormComponent

    const fakeProps = {
      title: 'test review',
      message: 'testing testing testing',
      rating: 5,
      productId: 10,
      userId: 11,
      handleSubmit: spy()
    }

    beforeEach(() => {
      ReviewFormComponent = shallow(<Review {...fakeProps} />)
    })

    it('invokes handleSubmit on submit', () => {

      ReviewFormComponent.find('form').simulate('submit')
      expect(fakeProps.handleSubmit.calledOnce).to.be.equal(true)

    })

    it('has a user id ', () => {

      expect(fakeProps.userId).to.be.equal(11)

    })
  })

})

