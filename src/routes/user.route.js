import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

const userRoute = Router();



userRoute.get("/", adminMiddleware, userController.getAllUsers);


export default userRoute;