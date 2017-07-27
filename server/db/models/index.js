const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const LineItem = require('./lineitem')
const Review = require('./review')

Review.belongsTo(User) //userId will be added on Review source model
Review.belongsTo(Product) //productId will be added on Review source model

Product.hasMany(Review, {onDelete: 'CASCADE'})

LineItem.belongsTo(Order) //orderId will be added on LineItem source model
LineItem.belongsTo(Product) //productId will be added on LineItem source model
Order.hasMany(LineItem, {onDelete: 'CASCADE'})
Order.belongsTo(User)

//May need to add Order belongs to User ?? sessions?




/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Review,
  LineItem,
  Order,
  Product
}
