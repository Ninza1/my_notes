const jwt = require('jsonwebtoken');
const UserModel = require("../model/user.model")


const auth = async(req, res, next)=>{
    // if(!req.headers.authirization){
    //     return res.status(401).json({message:"Tokekn not found"});
    //  }
     
    const token = req.headers.authorization.split(" ")[1];
    if(!token){
        return res.status(401).json({message:"Token not found"})
    }
    
    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        if(!decoded){
            return res.status(401).json({message:"Invalid token please login again"})
        }
        const user = await UserModel.findById(decoded.id)
        req.user = user;
        next();
    }catch(err){
        res.status(401).json({message:"Invalid token"})
    }
    
}

module.exports = auth;
