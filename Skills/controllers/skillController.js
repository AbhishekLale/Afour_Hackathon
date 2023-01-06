const db = require("../models")
const { promisify } = require('util');


const Skill = db.skills
const UserSkill = db.userSkills

const addSkill = async(req,res,next) => {
    try{
        const newSkill = {
            skill: req.body.skill,
            skill_domain: req.body.skill_domain
        }
        const skill = await Skill.create(newSkill)
        res.status(201).json({
            status: 'success',
            data:{
                skill
            }
            })
    }
    catch(e){
        next(e)
    }
}

module.exports = {
    addSkill
}