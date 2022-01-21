require('dotenv').config();
const CustomAPIError = require("../errors/custom-error");
const jwt = require('jsonwebtoken');


const login = async (req,res) =>{
    const {username,password} = req.body;
    console.log(username,password);

    const id =new Date().getDate();
    if(!username || !password){
        throw new CustomAPIError('please provide proper username and password',400)
    }
    const token = jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'});
    res.status(200).json({msg:'all good to go',token:token});
}

const dashboard = async (req,res) => {
    const luckynumber = Math.floor(Math.random()*100);
    res.status(200).json({msg : `Hello! ${req.user.username}`,secret:`your secret lucky number is ${luckynumber}`});
}

module.exports = {
    login,
    dashboard,
}