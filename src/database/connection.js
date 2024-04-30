import mongoose from "mongoose";

export const connect = async (MONGODB_URL) =>{

    if (MONGODB_URL){

       return await mongoose.connect(MONGODB_URL)
    }
    return null
}