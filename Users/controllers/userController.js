const db = require("../models")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const { promisify } = require('util');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

const createUserToken = async(user,code,req,res) => {
    const token = signToken(user.id)
    let d = new Date()
    d.setDate(d.getDate() + 30)
    res.cookie('jwt', token, {
        expires: d, 
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https', 
        sameSite: 'none'
    })
    user.password = undefined
    res.status(code).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
}
//create user model

const User = db.users
const registerUser = async(req, res, next) => {
    //pass in request data here to create user from user schema 
    try {
            const newUser = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: req.body.password
            }
            const user = await User.create(newUser)
            createUserToken(user, 201, req, res);
    //if user can't be created, throw an error 
        } catch(err) {
            next(err);
    }
};

const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    //check if email & password exist 
    if (!email || !password) {
        return next(new AppError('Please provide a username and password!', 400));
      }

    //check if user & password are correct  
    User.findOne({
        where:{ 
            email: email 
            }
    }).then(user => {
        if(!user){
            return res.status(400).send({ message: "User not found." })
        }
        var passwordIsValid = bcrypt.compareSync(password,user.password)
        if(!passwordIsValid){
            return res.status(400).send({ message: "Invalid password" })
        }
        createUserToken(user, 200, req, res);
    })
};

const checkUser = async (req,res,next) => {
    let currentUser;
    if (req.cookies.jwt) {
        const token = req.cookies.jwt;
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        User.findOne({
            where: {
                id: decoded.id
            }
        }, ).then(user => res.status(201).json({
            status: 'success',
            data:{
                user
            }
            }))
            .catch(error => next(error));
      } else {
        currentUser =  null;
        res.status(201).json({
            status: 'success',
            data:{
                currentUser
            }
            })
        console.log("in else")
      }
}

const logoutUser = async (req,res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 1 * 1000),
        httpOnly: true
    });
    res.status(200).send('user is looged out')
}

module.exports = {
    registerUser, 
    loginUser,
    checkUser,
    logoutUser
}