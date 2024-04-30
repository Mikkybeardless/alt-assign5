import { Router } from "express";
import * as blogController from "../controllers/blog.controller.js";
import { generateMiddleware } from "../middlewares/route.middleware.js";
import { authMiddleware} from "../middlewares/auth.middleware.js"
import { blogPostSchema } from "../validation/blog.validation.js";
import {checkOwnerMiddleware} from "../middlewares/owner.middleware.js"

const blogRoute = Router();

// General routes
blogRoute.get("/",blogController.getAllBlogs);
blogRoute.get("/:id", blogController.getBlogById)
// protected routes
blogRoute.use(authMiddleware);

// create a blog post
blogRoute.post("/post", generateMiddleware(blogPostSchema), blogController.createBlog);

// uses owner id from jwt to get blogs of owner
blogRoute.get("/me", blogController.getBlogsByOwnerId)

// restricted route to only owner
blogRoute.use(checkOwnerMiddleware)
blogRoute.put("/:id/update",  blogController.updateBlog)
blogRoute.delete("/:id/delete", blogController.deleteBlog);



export default blogRoute;