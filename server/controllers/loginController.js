import userSchema from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import mongooseErrorHandler from '../mongooseErrorHandler.js';

export const signup = async(req, res) =>{
    const { username, password, securityQuestion, securityAnswer } = req.body;
    let existingUser;
    try{
        existingUser = await userSchema.findOne({username});
    }catch(err){
        console.log(err);
    }
    if(!existingUser){
        const hashedPassword = bcrypt.hashSync(password);
        const newUser = new userSchema({
            username,
            password: hashedPassword,
            securityQuestion,
            securityAnswer

        })
        try{
            newUser.save();
        }catch(err){
            console.log(err);
        }
        return res.status(201).json({newUser});
    }
    return res.status(400).json({message:"User Already Exists!"});
}

export const login = async(req, res) =>{
    try{
        const { username, password } = req.body;
        const result = await userSchema.findOne({
          username
        })
        //found an user?
        if(result){
          //correct password?
          const isPasswordCorrect = bcrypt.compareSync(password, result.password);
          if(isPasswordCorrect){
            return res.status(200).json(result);
          }else{
            //error : wrong password
            return res.status(400).json({error: "You entered a wrong password..\nPlease try again or press 'forgot password'."});
          }
        //error : wrong username
        }else{
          return res.status(400).json({error : "The user you entered is not given."});
        }
      }catch(e){
        res.status(400).json(e);
      }
}