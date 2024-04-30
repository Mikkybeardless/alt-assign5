import dotenv from "dotenv";
import express from "express";
import authRoute from "./routes/auth.route.js";
import blogRoute from "./routes/blog.route.js";
import userRoute from "./routes/user.route.js"
import { authMiddleware } from "./middlewares/auth.middleware.js";

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/auth", authRoute);
app.use("/blogs", blogRoute);
app.use(authMiddleware);
app.use("/users", userRoute)

// catch all route
app.all("*", (req, res) => {
  res.status(404);
  res.json({
    message: "Not found",
  });
});


export default app;