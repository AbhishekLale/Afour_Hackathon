module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: '9527230546',
    DB: 'hackathon_skills',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 40000,
        idle: 10000
    }
}