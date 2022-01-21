require('dotenv').config();
const {StatusCodes} = require('http-status-codes');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { BadRequestError,UnauthenticatedError } = require('../errors');
const login = async (req,res) =>{
    const {email,password} = req.body;
    if(!email || !password){
        throw new BadRequestError('Please provide email and password');
    }
    const user = await User.findOne({email});
    if(!user){
        throw new UnauthenticatedError('your not autherized to access this account');
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('your not autherized to access this account');
    }
    res.status(StatusCodes.OK).json({user:{name:user.name}});
}
const register = async (req,res) =>{
    const user = await User.create({...req.body});
    const token = user.createJwt();
    if(!token){
        throw new BadRequestError('something went wrong')
    }
    res.status(StatusCodes.CREATED).json({user:{name:user.name},token:token});
}

module.exports = {login, register}