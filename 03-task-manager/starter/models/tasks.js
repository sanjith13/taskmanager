const mongoose = require('mongoose');

const TaskSchema  = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'this field is required'],
        trim: true,
        maxlength : [20,'max length only up 2 20']
    },
    completed:{
        type:Boolean,
        default:false
    },
});
 
module.exports = mongoose.model('Task',TaskSchema);