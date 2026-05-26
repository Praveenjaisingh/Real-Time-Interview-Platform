const userService = require("../Services/userService");

exports.createUser = async (req,res,next)=>{

    try{

        const user = await userService.createUser(req.body);

        return res.status(201).json({
            status:true,
            message:"User Sign-in successfully",
        });

    }catch(error){
        next(error);
    }

};

exports.userLogin = async (req,res,next)=>{

    try{

        const data = await userService.userLogin(req.body);

        return res.status(200).json({
            status:true,
            message:"Login successful",
            token:data.token,
            user:data.user
        });

    }catch(error){
        next(error);
    }

};

exports.logOut = async (req,res,next)=>{

    try{

        const token = req.headers.authorization?.split(" ")[1];

        const data = await userService.logOut(token);

        return res.status(200).json({
            status:true,
            message:"Logout successful"
        });

    }catch(error){
        next(error);
    }

};