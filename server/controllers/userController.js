import userSchema from "../models/userSchema.js";
import bcrypt from "bcryptjs";

export const resetPassword = async (req, res) => {
    try {
        //gets the user from the database
        const result = await userSchema.findOne({
            username: req.body.username,
            securityAnswer: req.body.securityAnswer,
        });
        //checks if the user exists
        if (result) {
            //checks if the new password is the same as the old password
            if (bcrypt.compareSync(req.body.password, result.password)) {
                return res
                    .status(400)
                    .json({
                        error: "Your New Password Can't Be The Old Password!",
                    });
            } else {
                const hashedPassword = bcrypt.hashSync(req.body.password);
                await userSchema.updateOne(result, {
                    password: hashedPassword,
                });
            }
        } else {
            throw new Error(response.statusText);
        }
        return res.status(200).json(result);
    } catch (e) {
        return res.status(400).json(e);
    }
};

export const getSecurityQuestion = async (req, res) => {
    try {
        const result = await userSchema.findOne({
            username: req.body.username,
        });
        if (result) {
            return res.status(200).json(result.securityQuestion);
        } else {
            return res.status(400).json({ error: "The User Is Not Given!" });
        }
    } catch (e) {
        console.log(e);
    }
};

export const changePassword = async (req, res) => {
    try {
        //gets the user from the database
        const result = await userSchema.findOne({
            username: req.body.username,
            securityQuestion: req.body.securityQuestion,
        });
        //checks if the user exists
        if (result) {
            //checks if the current password that the user entered is the same as the current password in the database and if the entered security answer is the same as the security answer in the database
            if (
                bcrypt.compareSync(req.body.currentPassword, result.password) &&
                req.body.securityAnswer === result.securityAnswer
            ) {
                //checks if the new password is the same as the old password
                if (bcrypt.compareSync(req.body.newPassword, result.password)) {
                    return res
                        .status(400)
                        .json({
                            error: "Your New Password Can't Be The Old Password!",
                        });
                } else {
                    const hashedPassword = bcrypt.hashSync(
                        req.body.newPassword
                    );
                    await userSchema.updateOne(result, {
                        password: hashedPassword,
                    });
                }
            }
        } else {
            throw new Error(response.statusText);
        }
        return res.status(200).json(result);
    } catch (e) {
        return res.status(400).json(e);
    }
};

export const changeUsername = async (req, res) => {
    try {
        //gets the user from the database
        const result = await userSchema.findOne({
            username: req.body.currentUsername,
        });
        //checks if the user exists
        if (result) {
            await userSchema.updateOne(result, {
                username: req.body.newUsername,
            });
        } else {
            throw new Error(response.statusText);
        }
        return res.status(200).json(result);
    } catch (e) {
        return res.status(400).json(e);
    }
};

export const signup = async (req, res) => {
    const { username, password, securityQuestion, securityAnswer } = req.body;
    let existingUser;
    try {
        //checks if the user already exists
        existingUser = await userSchema.findOne({ username });
    } catch (err) {
        console.log(err);
    }
    //if the user doesn't exist, create a new user
    if (!existingUser) {
        const hashedPassword = bcrypt.hashSync(password);
        const newUser = new userSchema({
            username,
            password: hashedPassword,
            securityQuestion,
            securityAnswer,
        });
        try {
            newUser.save();
        } catch (err) {
            console.log(err);
        }
        return res.status(201).json({ newUser });
    }
    return res.status(400).json({ message: "User Already Exists!" });
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await userSchema.findOne({
            username,
        });
        //found an user?
        if (result) {
            //correct password?
            const isPasswordCorrect = bcrypt.compareSync(
                password,
                result.password
            );
            if (isPasswordCorrect) {
                return res.status(200).json(result);
            } else {
                //error : wrong password
                return res
                    .status(400)
                    .json({
                        error: "You entered a wrong password..\nPlease try again or press 'forgot password'.",
                    });
            }
            //error : wrong username
        } else {
            return res
                .status(400)
                .json({ error: "The user you entered is not given." });
        }
    } catch (e) {
        res.status(400).json(e);
    }
};
