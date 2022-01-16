const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required']
    },
    price:{
        type:Number,
        required:[true,'price required']
    },
    featured:{
        type:Boolean,
        default:false
    },
    rating: {
        type: Number,
        default: 4.5,
    },
    createdAt:{
        type:Date,
        default: Date.now()
    },
    company: {
        type:String,
        enum:{
            values:['ikea','marcos','caressa','liddy'],
            message : '{VALUE} is not supported'
            //VALUE is the user given value
        },
    }
})

module.exports = mongoose.model('Products',ProductsSchema)