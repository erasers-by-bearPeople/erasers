const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  message: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      len: [10, 255]
    }
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 5
    }
  }
})

module.exports = Review
