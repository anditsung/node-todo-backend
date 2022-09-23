const dbConfig = require('../config/db.config')

const Sequelize = require('sequelize')
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        logging: false,
    }
)

const db  = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.activity_groups = require('../models/activity-group.model')

module.exports = db