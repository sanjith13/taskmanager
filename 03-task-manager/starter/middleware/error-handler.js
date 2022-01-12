const {CustomAPIError} = require('../error/custom-error');
const errorHandlingMiddleware = (err,req,res,next) =>{
    if(err instanceof CustomAPIError){
        return res.status(err.statusCode).json({msg:err.message});
    }
    res.status(500).json({msg:"sorry something went wrong"});
}

module.exports = errorHandlingMiddleware;