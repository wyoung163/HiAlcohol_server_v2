import { Router } from "express";

import { userValidator } from "../middlewares/express-validator/index.js";
import { userController } from "../controllers/userController.js";
// import { imageUpload } from "../utils/s3.js";

const userRouter = Router();


export { userRouter };