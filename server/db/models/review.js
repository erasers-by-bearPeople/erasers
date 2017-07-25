const Sequelize = require('sequelize')
const db = require('./index')

rows: title, message, stars


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
    }
})

module.exports = Review
