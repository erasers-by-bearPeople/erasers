const { expect } = require('chai')
const db = require('../index')
const Product = db.model('product')

/* global describe it beforeEach xit */

describe('Product model', () => {

  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('definition', () => {
    it('has expected title definition', () => {
      expect(Product.attributes.title).to.be.an('object')
    })
    it('has expected description definition', () => {
      expect(Product.attributes.description).to.be.an('object')
    })

    it('has expected price definition', () => {
      expect(Product.attributes.price).to.be.an('object')
    })

    it('has expected category definition', () => {
      expect(Product.attributes.category).to.be.an('object')
    })

    it('has expected inventory definition', () => {
      expect(Product.attributes.inventory).to.be.an('object')
    })

    it('has expected image definition', () => {
      expect(Product.attributes.image).to.be.an('object')
    })

  })

  describe('validations', () => {

    it('defaults product image to given file path', () => {
      const product = Product.build()
      expect(product.image).to.be.equal('images/defaultPic.jpg')
    })

    xit('requires everything', () => {
      const product = Product.build()
      return product.validate()
        .then(err => {

          expect(err).to.be.an('object')
          //expect(err.errors).to.contain.a.thing.with.properties({
            //type: 'notNull Violation'
          // })
        })
    })
  })

}) // end describe('validations')


 // end describe('Product model')
