const jwt = require("jsonwebtoken");

const authMidlleware = (req,res,next) =>{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(403).json({message:"No Token Provided"});
    }
    jwt.verify(token,"NEM-1",(err,user)=>{
        if (err){
            return res.status(403).json({message:"invalid token"})
        }
        req.user = user
        next()

    })
}
module.exports=authMidlleware;