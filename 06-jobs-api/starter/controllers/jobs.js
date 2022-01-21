const Job = require('../models/Job');
const { StatusCodes} = require('http-status-codes');
const {BadRequestError, UnauthenticatedError,NotFoundError} = require('../errors');
const getAllJobs = async (req,res) =>{
    const jobs = await Job.find({createdBy : req.user.userId}).sort('createdAt');
    res.status(StatusCodes.OK).json({jobs: jobs});
}

const createJobs = async (req,res) =>{
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({job});
}

const getJobs = async (req,res) =>{
    const { user:{userId}, params:{id: jobId} } = req;
    const job = await Job.findOne({_id:jobId,createdBy: userId});
    if(!job){
        throw new NotFoundError('sorry unable to find');
    }
    res.status(StatusCodes.OK).json({job: job});
}

const updateJobs = async (req,res) =>{
    const { body:{company,position},user:{userId},params:{id:jobsId} } =req;
    if(company == '' || position == ''){
        throw new BadRequestError('Please provide the nessary details');
    }
    const job = await Job.findByIdAndUpdate({_id: jobsId,createdBy : userId},req.body,{new: true, runValidators: true});
    res.status(StatusCodes.OK).json({job});
}

const deleteJobs = async (req,res) =>{
    const { user:{userId}, params:{id:jobsId} } = req;
    const job = await Job.findByIdAndRemove({_id: jobsId,createdBy : userId});
    res.status(StatusCodes.OK).json({job});
}

module.exports = {
    getAllJobs,
    createJobs,
    getJobs,
    updateJobs,
    deleteJobs
}