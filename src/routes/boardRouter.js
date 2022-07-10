import { Router } from "express";

import { loginRequired } from "../middlewares/loginRequired.js";
// import { boardValidator } from "../middlewares/express-validator/index.js";
import { boardController } from "../controllers/boardController.js";
import imageUpload from "../utils/s3.js";

const boardRouter = Router();

// 게시글 작성
boardRouter.post(
  "/boards",
  loginRequired,
  boardController.createPost
);

boardRouter.post(
  "/boards/:id/images",
  imageUpload.array("images"),
  boardController.createPostImages
);

// 게시글 전체 조회
boardRouter.get(
  "/boards",
  boardController.getPostList
);

// 게시글 하나만 조회
boardRouter.get(
  "/boards/:id",
  boardController.getPost
);

// // 게시글 수정
// boardRouter.put(
//   "/boards/:id",
//   loginRequired,
//   boardController.editPost
// );

// // 게시글 삭제
// boardRouter.delete(
//   "/boards/:id",
//   loginRequired,
//   boardController.deletePost
// );


export { boardRouter };