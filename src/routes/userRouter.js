import { Router } from "express";

import { loginRequired } from "../middlewares/loginRequired.js";
import { userValidator } from "../middlewares/express-validator/index.js";
import { userController } from "../controllers/userController.js";
import imageUpload from "../utils/s3.js";

const userRouter = Router();

// 회원가입
userRouter.post(
  "/users",
  userController.createUser
);

// 회원 정보 조회
userRouter.get(
  "/users",
  loginRequired,
  userController.findUserInfo
);

// 회원 정보 수정
userRouter.put(
  "/users",
  loginRequired,
  userController.updateUserNickname
);

// 회원 정보 수정
userRouter.put(
  "/users/image",
  loginRequired,
  imageUpload.single("profile_url"),
  userController.updateUserImage
);


export { userRouter };