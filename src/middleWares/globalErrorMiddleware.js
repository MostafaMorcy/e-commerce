export const globalErrorMiddleWare=(err,req,res,next)=>{
    const statusCode=err.statusCode ||500
    res.status(500).json({error:err.message,statusCode})
}