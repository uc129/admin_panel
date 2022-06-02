const notFoundMiddleware = (req, res, next) =>{
    res.status(404).json({msg:"Route Does Not Exist"})
}

module.exports = notFoundMiddleware