

import mongoose from "mongoose"

// schema

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true,
        unique: true,

    },
    
    body:{
        type: String,
        required: true
    },
   
    user: {
        type: Object
    },
    read_count:{
        type: Number,
        default: 0
         
    },
    reading_time:{
      type: Number,
      default: 0
    },
   
    tags:
        [{type: String}]
    
},
    {
        timestamps:true
    }
);

blogSchema.methods.read = async function () {
    if (!this.read_count) {
      this.read_count = 1; // Set initial read count to 1
    } else {
      this.read_count++;
    }
  
  };

 
// model
export const Blog = mongoose.model("blogs", blogSchema)