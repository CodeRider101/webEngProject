import userSchema from "../models/userSchema.js";
import bcrypt from "bcryptjs";

export const resetPassword = async(req, res) =>{
    try{
        const result = await userSchema.findOne({
          username: req.body.username,
          securityAnswer : req.body.securityAnswer,
        })
        if(result){
          if(bcrypt.compareSync(req.body.password, result.password)){
            return res.status(400).json({error: "Your New Password Can't Be The Old Password!"});
          }else{
            const hashedPassword =  bcrypt.hashSync(req.body.password);
            console.log(result+", pw: "+hashedPassword);
            await userSchema.updateOne(
              result,
              {
                password: hashedPassword
              }
            )
          }
        }else{
          throw new Error(response.statusText);
        }
        return res.status(200).json(result);
      }catch(e){
        return res.status(400).json(e);
      }
};

export const getSecurityQuestion = async(req, res)=>{
  try{
    const result = await userSchema.findOne({
      username: req.body.username
    });
    if(result){
      return res.status(200).json(result.securityQuestion);
    }else{
      return res.status(400).json({error: "The User Is Not Given!"});
    }
  }catch(e){
    console.log(e);
  }
}

export const changePassword = async(req, res) =>{
  try{
      const result = await userSchema.findOne({
        username: req.body.username,
      })
      if(result){
        if(bcrypt.compareSync(req.body.currentPassword, result.password && req.body.securityAnswer === result.securityAnswer)){
          if(bcrypt.compareSync(req.body.newPassword, result.password)){
            return res.status(400).json({error: "Your New Password Can't Be The Old Password!"});
          }else{
            const hashedPassword =  bcrypt.hashSync(req.body.password);
            console.log(result+", pw: "+hashedPassword);
            await userSchema.updateOne(
              result,
              {
                password: hashedPassword
              }
            )
          }
        }
      }else{
        throw new Error(response.statusText);
      }
      return res.status(200).json(result);
    }catch(e){
      return res.status(400).json(e);
    }
};

export const changeUsername = async(req, res) =>{
  try{
      const result = await userSchema.findOne({
        username: req.body.currentUsername,
      })
      if(result){
        await userSchema.updateOne(
          result,
          {
            username: req.body.newUsername
          }
        )
      }else{
        throw new Error(response.statusText);
      }
      return res.status(200).json(result);
    }catch(e){
      return res.status(400).json(e);
    }
};