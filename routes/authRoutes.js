const express = require('express')
const userRouter = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('../models/User.Model')



userRouter.post("/signup", async (req, res) => {
    const { email, password, confirmedPassword } = req.body;
  
    if (password !== confirmedPassword) {
      return res.status(400).send("Passwords do not match");
    }
  
    const existUser = await userModel.findOne({ email: email });
    if (existUser) {
      return res.status(400).send("User already exists");
    }
  
    try {
      bcrypt.hash(password, 5, async (err, hash) => {
        const newUser = new userModel({
          
          email,
          password: hash,
          confirmedPassword: confirmedPassword, 
        });
        await newUser.save();
        res.status(201).send({ msg: "Registration has been done", newUser });
      });
    } catch (err) {
      res.status(400).send({ msg: err.message });
    }
  });


userRouter.post("/login",async(req,res)=>{
    const{email,password}=req.body
    try{
        const user = await userModel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    res.status(200).json({"msg":"Login sucessfull!","token":jwt.sign({"userId":user._id},"NEM-1")})
                }else{
                    res.status(400).json({"msg":"Wrong Credential"})
                }
            })
        }else{
            res.status(200).json({"message":"No such user Exist"})
        }
    }catch(err){
        res.status(400).json({"msg":err.messgae})
    }
})






module.exports = userRouter