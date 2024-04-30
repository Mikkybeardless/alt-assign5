import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import  {generateMiddleware}  from "../middlewares/route.middleware.js";
import { loginSchema, registerSchema } from "../validation/auth.validation.js";

const authRoute = Router();

authRoute.post("/login", generateMiddleware(loginSchema), authController.login);
authRoute.post("/register",generateMiddleware(registerSchema),authController.register);

export default authRoute;