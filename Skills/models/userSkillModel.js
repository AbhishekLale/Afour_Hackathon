module.exports = (sequelize , DataTypes) => {
    const Userskill = sequelize.define('user_skill', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
        skill_id: {
            type: DataTypes.INTEGER
        },
        user_id:{
            type: DataTypes.INTEGER
        },
		year_of_exp: {
		    type: DataTypes.STRING,
            trim: true
		},
		skill_level: {
			type: DataTypes.STRING,
            allowNull: false,
            len: [2,50],
            trim: true
		}
	});
    return Userskill;
} 