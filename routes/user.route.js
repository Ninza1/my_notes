const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../model/user.model")
const jwt  = require("jsonwebtoken")

const userRouter = express.Router();

userRouter.post("/register", (req,res) =>{
    const {name,email, password, gender, age} = req.body;
    try{
        bcrypt.hash(password, 5, async(err, hash) =>{
            if(err){
                return res.status(500).json({"msg":"Internal server err"})
            }
            const user = new UserModel({
                name,
                email, 
                password:hash,
                gender,
                age,
            })
            await user.save();
            res.status(201).json({"msg":"User registered successfully", user})
        })

    }catch(err){
        console.log("while registering:", err)
    }
})

userRouter.post("/login", async(req,res) =>{
    const {email, password} = req.body;
    try{
        const user = await UserModel.findOne({email})
        if(!user) {
            return res.status(404).json({message:"User not found"})
        }
        if(user){
            bcrypt.compare(password, user.password, (err , result) =>{
                if(err){
                    return res.status(500).json({"msg":"internal server error"})
                }
                if(result){
                    const token = jwt.sign({id:user.id}, process.env.SECRET_KEY)
                     res.status(201).json({"msg":"User logged sucessfully", token})

                }else {
                    res.status(401).json({message:"Invalid password"})
                }
            })
        }
    }
    catch(err){
        res.status(500).json({message:`Error while logging, ${err}`})
    }    
})


module.exports = userRouter;