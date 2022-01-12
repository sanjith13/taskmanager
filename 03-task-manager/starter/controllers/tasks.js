const Task = require('../models/tasks');
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../error/custom-error');
const getAllTasks = asyncWrapper( async (req,res) =>{
        const tasks = await Task.find({});
        res.status(201).json({tasks});
})
const createTasks = asyncWrapper( async (req,res) =>{
        const task = await Task.create(req.body)
        res.status(201).json({task});
})
const getTasks = asyncWrapper( async (req,res,next) =>{
   
        const { id :taskId } = req.params;
        const task = await Task.findOne({ _id:taskId })
        if(!task){
            return next(createCustomError("unable to find the given id",404));
        }
        res.status(200).json({task});
   
})
const updateTasks = asyncWrapper( async (req,res,next) =>{
    
        const { id:taskId } = req.params;
        const task = await Task.findOneAndUpdate({ _id: taskId }, req.body,{
            new: true,
            runValidators:true
        })
        if(!task){
            return next(createCustomError("unable to find the given id",404));
        }
        res.status(200).json({task}) 
    
})
const deleteTasks = asyncWrapper( async (req,res,next) =>{
    
        const { id:taskId } = req.params;
        const task = await Task.findOneAndDelete({ _id:taskId });
        if(!task){
            return next(createCustomError("unable to find the given id",404));
        }
        res.status(200).json({task}) 
    
})

module.exports = {
    getAllTasks,
    createTasks,
    getTasks,
    updateTasks,
    deleteTasks,
}