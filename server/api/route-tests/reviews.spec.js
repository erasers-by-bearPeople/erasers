const {expect} = require('chai')
const request = require('supertest')
const db = require('../../db')
const app = require('../../index')
const Product = db.model('product')
const Review = db.model('review')

describe('Review routes', () => {

    beforeEach(() => {
      return db.sync({force: true})

    })
  describe('/api/products/', () =>{

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

    it('POST /api/reviews/:productId', () => {
        return request(app)
            .post('/api/reviews/1')
            .send( {title: 'Love it', message: 'super great'
            })
            .expect(201)
            .then(res => {
                return Product.findOne({ where: {id:1}, include: [Review] })
            })
            .then(product => {
              const title = product.reviews[0].dataValues.title
                expect(title).to.be.equal('Love it')
            })
    })

   })
})
