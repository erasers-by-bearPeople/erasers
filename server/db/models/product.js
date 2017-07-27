
const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  // tk: what if I want to add a new category?
  category: {
    type: Sequelize.ENUM('category1', 'category2'),
    allowNull: false
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  /**
   * tk: can you have more than one image?
   */
  image: {
    type: Sequelize.STRING,
    defaultValue: 'images/defaultPic.jpg' //will we have urls for images or file folder?
  }
})


module.exports = Product
