const Sequelize = require('sequelize')
const db = require('./index')

module.exports = db.define('review', {
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