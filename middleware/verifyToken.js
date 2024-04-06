const jwt=require('jsonwebtoken')

const verifyToken = (req,res,next)=>{
    try{
        const headerToken = req.headers["authorization"];
        console.log(headerToken);
        const decode = jwt.verify(headerToken, process.env.SECRET_KEY);
        req.userId = decode.userId;
        next();
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            errorMessage: 'bad request',
        });
    }
}

module.exports=verifyToken;