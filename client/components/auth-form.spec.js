import {expect} from 'chai'
import React from 'react'
import {AuthForm} from './auth-form'
import {shallow} from 'enzyme'
import {spy} from 'sinon'

describe('Auth Form file', () => {
  describe('handleSubmit on AuthForm works', () => {

    let authFormComponent

    const fakeProps = {
      name: 'login',
      displayName: 'Login',
      handleSubmit: spy()
    }

    beforeEach(() => {
      authFormComponent = shallow(<AuthForm {...fakeProps} />)
    })

    it('invokes handleSubmit on submit', () => {

      authFormComponent.find('form').simulate('submit')
      expect(fakeProps.handleSubmit.calledOnce).to.be.equal(true)

    })
    it('returns displayName from props on component', () => {
      expect(fakeProps.displayName).to.be.equal('Login')
    })
  })
})
