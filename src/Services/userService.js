const userRepository = require("../Repositories/userRepository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AppError = require("../Helpers/AppError");
const sendMail = require("../Helpers/sendMail");

class userService {

    async createUser(data){

        const { name,email,password } = data;

        const existingUser = await userRepository.userLogin(email);

        if(existingUser){
            throw new AppError(["Email already exists"]);
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await userRepository.createUser({
            name,
            email,
            password:hashedPassword
        });
        const loginUrl = `${process.env.APP_URL}`;
        await sendMail({
            to: email,
            subject: "Welcome! Your Account Details",
            replacements: {
                name,
                email,
                password ,
                loginUrl
            }
        });

        return user;
    }

    async userLogin(data){

        const { email,password } = data;

        const user = await userRepository.userLogin(email);

        if(!user){
            throw new AppError("User not found");
        }

        const match = await bcrypt.compare(password,user.password);

        if(!match){
            throw new AppError("Invalid password");
        }

        const token = jwt.sign(
            { id:user.id,email:user.email },
            process.env.JWT_SECRET,
            { expiresIn:process.env.JWT_EXPIRES_IN }
        );

        return {
            user,
            token
        };

    }

    async logOut(token){

        if(!token){
            throw new AppError("Token missing");
        }

        return {
            message:"Logout successful"
        };

    }

}

module.exports = new userService();