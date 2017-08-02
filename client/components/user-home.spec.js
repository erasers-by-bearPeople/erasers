import {expect} from 'chai'
import React from 'react'
import {mapState, UserHome} from './user-home'
import {shallow} from 'enzyme'

describe('the user home file', () => {
  describe('mapState', () => {

    const email = 'noor@email.com'
    const fakeState = {user: {email}}

    it('returns the email from the user on state', () => {
      expect(mapState(fakeState).user.email).to.be.equal(email)
    })
  })

  describe('UserHome component', () => {
    let userHomeComponent

    const email = 'noor@email.com'
    const fakeState = {user: {email}}

    beforeEach(() => {
      userHomeComponent = shallow(<UserHome {...fakeState} />)
    })

    it('renders an email appropriately in an h3', () => {
      expect(userHomeComponent.find('h3').text()).to.be.equal('Welcome, noor@email.com')
    })

  })
})
