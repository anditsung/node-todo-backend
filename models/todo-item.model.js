const db = require('../models')

const TodoItem = db.sequelize.define("todo_items", {
    title: {
        type: db.Sequelize.STRING,
        allowNull: false,
    }, 
    activity_group_id: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
    },
    is_active: {
        type: db.Sequelize.BOOLEAN,
        defaultValue: true,
    }
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

module.exports = TodoItem