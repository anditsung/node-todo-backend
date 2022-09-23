const db = require('../models')

const ActivityGroup = db.sequelize.define("activity_groups", {
    title: {
        type: db.Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: db.Sequelize.STRING,
        allowNull: false,
    }
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

module.exports = ActivityGroup