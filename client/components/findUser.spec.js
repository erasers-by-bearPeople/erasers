import {expect} from 'chai'
import React from 'react'
import {mapState} from './FindUser'
import {shallow} from 'enzyme'

describe('Find User file', () => {

  describe('mapState', () => {

    const fakeAccount = {
      id: 10,
      name: 'Noor',
      email: 'noor@email.com'
    }

    const fakeState = {
      account: fakeAccount
    }

    it('returns user info from account on state', () => {
      expect(mapState(fakeState).account).to.be.equal(fakeAccount)
    })

    it('returns user name from account on state', () => {
      expect(mapState(fakeState).account.name).to.be.equal('Noor')
    })

    it('account id is a number', () => {
      expect(mapState(fakeState).account.id).to.be.equal(10)
    })

  })

})