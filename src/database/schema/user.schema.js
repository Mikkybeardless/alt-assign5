import mongoose from "mongoose"

// schema
const userShema = mongoose.Schema({
    name:{
        type: String,
        require: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique:true,
        lowacase: true,
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum:["USER", "ADMIN"],
        default: "USER"
    },
},
    {
        timestamps:true
    }
);

// model
export const User = mongoose.model("Users", userShema)