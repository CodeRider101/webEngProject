import userSchema from "../models/userSchema.js";
import bcrypt from "bcryptjs";

export const getAllUser = async (req, res, next) =>{
    let users;
    try{
        users = await userSchema.find();
    } catch(err){
        console.log(err);
    }
    if(!userSchema){
        return res.status(404).json({message: "No Users Found!"});
    }
    return res.status(200).json({users})
}

export const signup = async(req, res, next) =>{
    const { name, email, password } = req.body;
    let existingUser;
    try{
        existingUser = await userSchema.findOne({email});
    }catch(err){
        console.log(err);
    }
    if(!existingUser){
        const hashedPassword = bcrypt.hashSync(password);
        const newUser = new userSchema({
            //yeet
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
        console.log("Moin")
        console.log(req.body);
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