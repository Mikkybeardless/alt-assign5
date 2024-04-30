import _ from "lodash"
import * as blogService from "../services/blog.service.js";
import logger from "../../config/logger.js";




// create a blog post
export const createBlog = async (req, res) => {
  const blog = req.body
  const user = req.user
  const content =  blog.body
  
  try {
   const newBlog = await blogService.create(blog, content, user);
   newBlog = _.omit(newBlog, ['tags'])
 return  res.status(201).json({message: "Blog successfully created", data: newBlog})
  } catch (error) {
   logger.error(error);
   res.status(500).send(error.message)
  } 
}  



// get all blogs from api
export const getAllBlogs = async (req, res) => {
  try {
    logger.info("User", req.user);
    let page = Number(req.query.page) || 1;
    page = page < 1 ? 1 : page;
    let limit = Number(req.query.limit) || 20;
    limit = limit < 1 ? 20 : limit;
    const query = req.query.q;
    const { data, meta } = await blogService.getAllBlogs(page, limit, query);

    // data = _.pick(data, ["title", "description","author", "body"])
 return res.status(200).json({ message: "Get all blogs", data, meta });
  } catch (error) {
    logger.error(error)
    res.status(500).send(error.message)
  }
};






// get blogs by id
export const getBlogById = async (req, res) => {
  const blogId = req.params.id
 
  try {
    const blog = await blogService.getBlogById(blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
 
    const authorName = blog.author;
  
   return res.status(200).json({ message: "  blog by id", author: authorName, blog });
  } catch (error) {
    logger.error(error)
   res.status(500).send(error.message)
  }
  
}

// get blogs owned by a user
export const getBlogsByOwnerId = async (req,res) =>{
  const ownerId = req.user.id
  try {
    
    let page = Number(req.query.page) || 1;
    page = page < 1 ? 1 : page;
    let limit = Number(req.query.limit) || 20;
    limit = limit < 1 ? 20 : limit;
    const query = req.query.q;
   const {data, meta} = await blogService.getOwnerBlogs(page, limit, query, ownerId);

  //  data = _.pick(data, ["title", "description","author", "body"])
   res.status(200).json({
   message:"Get all owner blogs",
   data: data, meta
  })
  } catch (error) {
    logger.error(error);
   res.status(500).send(error.message)
  }
}



// update a blog
export const updateBlog = async (req,res) => {
  try {
    const blogId = req.params.id
    const blog = req.body
    const updatedBlog = blogService.updateBlog(blogId, blog)
    res.status(200).json({message: "Blog succesfully updated", data: updatedBlog})
  } catch (error) {
    logger.error(error)
   res.status(500).send(error.message)
  }
}


// delete a blog
export const deleteBlog = async (req, res) => {
  const blogId = req.params.id
try {
await blogService.deleteBlog(blogId);
res.status(200).json({message: "Blog successfully deleted", data:""})
} catch (error) {
  logger.error(error)
 res.status(500).send(error.message)
} 
}