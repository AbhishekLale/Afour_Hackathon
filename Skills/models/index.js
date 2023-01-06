const dbConfig = require("../config/config")
const {Sequelize, DataTypes} = require("sequelize")

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,{
        host : dbConfig.HOST,
        dialect: dbConfig.dialect,
        pool:{
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }

) 

sequelize.authenticate().then(() => {
    console.log("Connected to DB")
}).catch((err) => {
    console.log("Error: ", err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.skills = require("./skillModel")(sequelize, DataTypes)
db.userSkills = require("./userSkillModel")(sequelize, DataTypes)

db.sequelize.sync({force: false}).
then(() => {
    console.log("Re-sync done!")
})

module.exports = db