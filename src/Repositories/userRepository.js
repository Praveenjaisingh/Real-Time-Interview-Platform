const { Users } = require("../Models");

class userRepository { 

    async createUser(payload) { 
        const data = await Users.create(payload);      
        return data;
    }

    async userLogin(email) { 
        return await Users.findOne({ where: {email} })
    }

    async logOut(token){

        if(!token){
            throw new Error("Token required");
        }
        return {
            message:"Logout successful"
        };
    }

}
module.exports = new userRepository();