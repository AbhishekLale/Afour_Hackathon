module.exports = (sequelize , DataTypes) => {
    const Skill = sequelize.define('skill', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
        skill: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [2,50],
            trim: true,
        },
        skill_domain:{
            type: DataTypes.STRING,
            allowNull: false,
            len: [2,50],
            trim: true,
        }
	});
    return Skill;
} 