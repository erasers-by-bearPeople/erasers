const {expect} = require('chai')
const request = require('supertest')
const db = require('../../db')
const app = require('../../index')
const Product = db.model('product')
const Review = db.model('review')

/* global describe it beforeEach */

describe('Product routes', () => {



  beforeEach(() => {
    return db.sync({force: true})

  })

  describe('/api/products/', () => {

    const oceanEraser = {
      title: 'Sea Slug',
      description: 'Dive into some undersea fun with this lively aquarium friend!',
      price: 575,
      category: 'Novelty',
      inventory: 5000,
      image: '/images/slug.jpg'
    }

    beforeEach(() => {
      const {title, description, price, category, inventory, image} = oceanEraser
      return Product.create({
        title,
        description,
        price,
        category,
        inventory,
        image
      })
    })

    it('GET /api/products', () => {
      return request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].title).to.be.equal('Sea Slug')
        })
    })

    it('GET /api/products/:productId', () => {
      return request(app)
        .get('/api/products/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.price).to.be.equal(575)
        })
    })

    it('POST /api/products/', () => {
      return request(app)
        .post('/api/products')
        .send( { title: 'Shark',
        description: 'Careful! This one might erase more than just your pencil marks',
        price: 240,
        category: 'Novelty',
        inventory: 30,
        } )
        .expect(201)
        .then(res => {
            return Product.findById(2)
        })
        .then(product => {
            expect(product.title).to.be.equal('Shark')
        })
    })


    it('PUT /api/products/:productId', () => {
      return request(app)
        .put(`/api/products/1`)
        .send( {price: 350} )
        .expect(200)
        .then(res => {
            return Product.findById(1)
        })
        .then(product => {
            expect(product.price).to.be.equal(350)
        })
    })

    it('DELETE /api/products/:productId', () => {
      return request(app)
        .delete(`/api/products/1`)
        .expect(204)
        .then(res => {
            return Product.findOne({where: {title: 'Sea Slug'}} )
        })
        .then(product => {
            expect(product).to.be.equal(null)
        })
    })



  }) // end describe('/api/users')

}) // end describe('User routes')
