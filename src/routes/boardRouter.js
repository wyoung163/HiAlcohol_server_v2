import { Router } from "express";

import { loginRequired } from "../middlewares/loginRequired.js";
import { boardValidator } from "../middlewares/express-validator/index.js";
import { boardController } from "../controllers/boardController.js";
import imageUpload from "../utils/s3.js";

const boardRouter = Router();

/********** 게시글 **********/

// 게시글 작성
boardRouter.post(
  "/boards",
  loginRequired,
  imageUpload.array("images"),
  boardController.createPost
);

// 게시글 이미지 첨부
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

// 게시글 수정
boardRouter.put(
  "/boards/:id",
  loginRequired,
  // imageUpload.array("images"),
  boardController.editPost
);

// 게시글 삭제
boardRouter.delete(
  "/boards/:id",
  loginRequired,
  boardController.deletePost
);


/********** 댓글 **********/

// 댓글 생성
boardRouter.post(
  "/boards/:postId/comments",
  loginRequired,
  boardController.createComment
);

// 게시글의 댓글 조회
boardRouter.get(
  "/boards/:postId/comments",
  boardController.getPostComments
);

// 댓글 수정
boardRouter.put(
  "/boards/:postId/comments/:id",
  // loginRequired,
  boardController.editComment
);


export { boardRouter };