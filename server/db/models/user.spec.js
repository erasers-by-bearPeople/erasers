const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

/* global describe it beforeEach */

describe('User model', () => {
  //
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {

    describe('correctPassword', () => {

      let cody

      beforeEach(() => {
        return User.create({
          name: 'cody',
          email: 'cody@puppybook.com',
          password: 'bones'
        })
          .then(user => {
            cody = user
          })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })

      it('has the name column in users table', () => {
        expect(User.attributes.name).to.be.an('object')
      })

      it('has the email column in users table', () => {
        expect(User.attributes.email).to.be.an('object')
      })

      it('has the password column in users table', () => {
        expect(User.attributes.password).to.be.an('object')
      })

    }) // end describe('correctPassword')

  }) // end describe('instanceMethods')

}) // end describe('User model')
