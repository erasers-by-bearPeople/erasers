const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type:   Sequelize.ENUM,
    values: ['active', 'pending', 'complete'],
    allowNull: false,
    defaultValue: 'active'
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true
  },
  city: {
    type: Sequelize.STRING,
    allowNull: true
  },
  street: {
    type: Sequelize.STRING,
    allowNull: true
  },
  state: {
    type: Sequelize.STRING,
    allowNull: true
  },
  zip: {
    type: Sequelize.STRING,
    allowNull: true
  }
})


// Orders must belong to a user OR guest session (authenticated vs unauthenticated)
// this is set in belongs to.... what is a session or guest session ? where will that be kept
// Orders must contain line items that capture the price, current product ID and quantity
// product ID will be in hasMany of product ... as product
// If a user completes an order, that order should keep the price of the item at the time when they checked out even if the price of the product later changes


module.exports = Order
