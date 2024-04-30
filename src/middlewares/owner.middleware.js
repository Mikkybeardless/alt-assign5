import {Blog } from "../database/schema/blog.schema.js"
import logger from "../../config/logger.js";
export const checkOwnerMiddleware = async (req, res, next) => {
  logger.info("Owner Middleware")
    const blogId = req.params.id;
    const ownerId = req.user.id; // Assuming req.user.id contains the logged-in user's ID
    try {
      const blog = await Blog.findById(blogId);
      if (!blog || !blog.owner.equals(ownerId) ) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      req.blog = blog;
      next();
    } catch (err) {
      logger.error(err);
      res.status(500).json({ message: err.message });
    }
  };