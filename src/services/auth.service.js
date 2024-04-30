import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import {User} from "../database/schema/user.schema.js";
import { ErrorWithStatus} from "../exception/errorWithStatus.js"


export const login = async (email, password)=>{
    // check if email exist
   const user = await User.findOne({email})
    if(!user){
        throw new ErrorWithStatus("User not found", 404)
    }

    // check if password is incorrect
    if(!bcrypt.compareSync(password, user.password)){
        throw new ErrorWithStatus("Email or password Incorrect", 401)
    }

    // generate access tokren
    const JWT_SECRET = process.env.JWT_SECRET
    const token = jwt.sign(
        {
        role: user.role || "USER",
        email: user.email,
        id: user._id,
        sub: user._id
        },
        JWT_SECRET,
        {expiresIn: "1h"}
    )

    return token;
}


export const register = async (first_name,last_name, email, password, role) =>{

 const user = await User.findOne({email})

//  check if email exists
 if(user){
    throw new ErrorWithStatus("User with this email already Exist", 400)
 }

 password = await bcrypt.hash(password,10);

 const newUser = new User({
    first_name,
    last_name,
    email,
    password,
    role
 });

 await newUser.save()
 delete newUser.password
 return newUser

}