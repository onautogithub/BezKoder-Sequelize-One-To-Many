const dbConfig = require('../config/dbConfig.js')
const Sequelize = require('sequelize')
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.max,
    min: dbConfig.min,
    acquire: dbConfig.acquire,
    idle: dbConfig.idle
  }
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.tutorials = require('./tutorial.model.js')(sequelize, Sequelize)
db.comments = require('./comment.model.js')(sequelize, Sequelize)
db.tutorials.hasMany(db.comments, {as: 'comments'})
db.comments.belongsTo(db.tutorials, {
  foreighkey: 'tutorialId', as: 'tutorial'
})

module.exports = db
