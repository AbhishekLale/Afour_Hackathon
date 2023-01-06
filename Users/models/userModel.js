const bcrypt = require("bcryptjs");

module.exports = (sequelize , DataTypes) => {
    const User = sequelize.define('user', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [2,50],
            trim: true,
        },
        last_name:{
            type: DataTypes.STRING,
            allowNull: false,
            len: [2,50],
            trim: true,
        },
		email: {
		    type: DataTypes.STRING,
            trim: true
		},
		password: {
			type: DataTypes.STRING
		}
	});
    User.beforeCreate((user, options) => {

		return bcrypt.hash(user.password, 10)
			.then(hash => {
				user.password = hash;
			})
			.catch(err => { 
				throw new Error(); 
			});
	})
    return User;
} 