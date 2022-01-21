require('dotenv').config()
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name field is required'],
        minLength: 3,
        maxLength: 50
    },
    email: {
        type : String,
        required : [true,'email field is required'],
        match : [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'please enter the valid email'],
        unique: [true,'already their is an user with this mail id']
    },
    password: {
        type : String,
        required : [true,'please enter the password'],
        minLength : 6,
    }
})

userSchema.pre('save',async function (){
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
})

userSchema.methods.createJwt = function(){
    return jwt.sign({userId : this._id,name : this.name},process.env.JwtToken,{expiresIn :'30d'});
}
userSchema.methods.comparePassword = async function (contentPassword) {
    const isMatch = await bcrypt.compare(contentPassword, this.password);
    return isMatch;
}

module.exports = new mongoose.model('User',userSchema);