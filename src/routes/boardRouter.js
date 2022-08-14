import { Router } from "express";

import { isLogined } from "../middlewares/isLogined.js";
import { loginRequired } from "../middlewares/loginRequired.js";
import { boardValidator } from "../middlewares/express-validator/index.js";
import { boardController } from "../controllers/boardController.js";
import imageUpload from "../utils/s3.js";

const boardRouter = Router();

/********** 게시글 **********/

/**
 *  @swagger
 *  tags:
 *    name: Board
 *    description: Board MVP
 */
/** 게시글 작성
 * @swagger
 * /boards:
 *   post:
 *    summary: 게시글 생성 API
 *    description: 게시글을 생성할 때 사용하는 API 입니다.
 *    tags: [Board]
 *    requestBody:
 *      x-name: body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            required:
 *            - content
 *            properties:
 *              title:
 *                type: string
 *                example: 제목
 *              content:
 *                type: string
 *                example: 내용
 *              images:
 *                type: array
 *                example: ["https://", "https://"]
 *    responses:
 *      201:
 *        description: 게시글 생성
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                code:
 *                  type: number
 *                  example: 201
 *                message:
 *                  type: string
 *                  example: 글 작성에 성공하였습니다.
 *                data:
 *                  type: object
 *                  properties:
 *                    postId:
 *                      type: number
 *                      description: 1, 2, 3, 4, 5...
 *                      example: 1
 *                    userId:
 *                      type: number
 *                      description: 1, 2, 3, 4, 5...
 *                      example: 1
 *                    nickname:
 *                      type: string
 *                      description: 닉네임
 *                      example: 닉네임
 *                    images:
 *                      type: array
 *                      description: 이미지
 *                      example: ["https://", "https://"]
 *                    createdate:
 *                      type: number
 *                      description: 2022-07-20
 *                      example: 2022-07-20
 *                    count:
 *                      type: number
 *                      description: 좋아요 개수
 *                      example: 0
 *                    likeSelection:
 *                      type: number
 *                      description: 회원이 좋아요 선택했는지
 *                      example: true / false
 *      400:
 *        description: 게시글 생성 오류
 *        content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: string
 *                  example: false
 *                error:
 *                  type: object
 *                  properties:
 *                    code:
 *                      type: integer
 *                      description: http status
 *                      example: 400
 *                    message:
 *                      type: string
 *                      description: 오류 내용
 *                      example: 글을 입력해주세요.
 *
 */
boardRouter.post(
  "/boards",
  loginRequired,
  imageUpload.array("images"),
  boardController.createPost
);

// 게시글 이미지 첨부
boardRouter.post(
  "/boards/:id/images",
  isLogined,
  imageUpload.array("images"),
  boardController.createPostImages
);

/** 꿀조합 게시판 조회
 * @swagger
 * /boards:
 *   get:
 *    summary: 꿀조합 게시판 조회 API
 *    description: 꿀조합 게시판을 조회할 때 사용하는 API 입니다.
 *    tags: [Board]
 *    parameters:
 *       - in: query
 *         name: option
 *         description: 게시글 정렬 option
 *         example: like / latest
 *         schema:
 *          type: string
 *    responses:
 *      200:
 *        description: 게시판 조회 성공
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                code:
 *                  type: number
 *                  example: 200
 *                message:
 *                  type: string
 *                  example: 게시판 조회에 성공하였습니다.
 *                data:
 *                  type: object
 *                  properties:
 *                    postId:
 *                      type: number
 *                      description: 1, 2, 3, 4, 5...
 *                      example: 1
 *                    userId:
 *                      type: number
 *                      description: 1, 2, 3, 4, 5...
 *                      example: 1
 *                    nickname:
 *                      type: string
 *                      description: 닉네임
 *                      example: 닉네임
 *                    images:
 *                      type: array
 *                      description: 이미지
 *                      example: ["https://", "https://"]
 *                    createdate:
 *                      type: number
 *                      description: 2022-07-20
 *                      example: 2022-07-20
 *                    count:
 *                      type: number
 *                      description: 좋아요 개수
 *                      example: 0
 *                    likeSelection:
 *                      type: number
 *                      description: 회원이 좋아요 선택했는지
 *                      example: true / false
 *
 */
boardRouter.get(
  "/boards",
  isLogined,
  boardController.getPostList
);

/** 게시글 하나만 조회
 * @swagger
 * /boards/{id}:
 *   get:
 *    summary: 게시글 하나만 조회 API
 *    description: 게시글을 하나만 조회할 때 사용하는 API 입니다.
 *    tags: [Board]
 *    parameters:
 *       - in: path
 *         name: id
 *         description: 조회할 게시글의 id
 *         example: 1
 *         schema:
 *          type: string
 *    responses:
 *      200:
 *        description: 게시글 조회 성공
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                code:
 *                  type: number
 *                  example: 200
 *                message:
 *                  type: string
 *                  example: 글 조회에 성공하였습니다.
 *                data:
 *                  type: object
 *                  properties:
 *                    postId:
 *                      type: number
 *                      description: 1, 2, 3, 4, 5...
 *                      example: 1
 *                    userId:
 *                      type: number
 *                      description: 1, 2, 3, 4, 5...
 *                      example: 1
 *                    nickname:
 *                      type: string
 *                      description: 닉네임
 *                      example: 닉네임
 *                    images:
 *                      type: array
 *                      description: 이미지
 *                      example: ["https://", "https://"]
 *                    createdate:
 *                      type: number
 *                      description: 2022-07-20
 *                      example: 2022-07-20
 *                    count:
 *                      type: number
 *                      description: 좋아요 개수
 *                      example: 0
 *                    likeSelection:
 *                      type: number
 *                      description: 회원이 좋아요 선택했는지
 *                      example: true / false
 *      404:
 *        description: 게시글 조회 오류
 *        content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: string
 *                  example: false
 *                error:
 *                  type: object
 *                  properties:
 *                    code:
 *                      type: integer
 *                      description: http status
 *                      example: 404
 *                    message:
 *                      type: string
 *                      description: 오류 내용
 *                      example: 존재하지 않는 게시글입니다.
 *
 */
boardRouter.get(
  "/boards/:id",
  isLogined,
  boardValidator.checkId,
  boardController.getPost
);

/** 게시글 수정
 * @swagger
 * /boards/{id}:
 *   put:
 *    summary: 게시글 수정 API
 *    description: 게시글을 수정할 때 사용하는 API 입니다.
 *    tags: [Board]
 *    parameters:
 *       - in: path
 *         name: id
 *         description: 조회할 게시글의 id
 *         example: 1
 *         schema:
 *          type: string
 *    requestBody:
 *      x-name: body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            required:
 *            - content
 *            properties:
 *              title:
 *                type: string
 *                example: 제목
 *              content:
 *                type: string
 *                example: 내용
 *              images:
 *                type: array
 *                example: ["https://", ...]
 *    responses:
 *      200:
 *        description: 게시글 수정
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                code:
 *                  type: number
 *                  example: 200
 *                message:
 *                  type: string
 *                  example: 글 수정에 성공하였습니다.
 *                data:
 *                  type: object
 *                  properties:
 *                    postId:
 *                      type: number
 *                      description: 1, 2, 3, 4, 5...
 *                      example: 1
 *                    userId:
 *                      type: number
 *                      description: 1, 2, 3, 4, 5...
 *                      example: 1
 *                    nickname:
 *                      type: string
 *                      description: 닉네임
 *                      example: 닉네임
 *                    images:
 *                      type: array
 *                      description: 이미지
 *                      example: ["https://", "https://"]
 *                    createdate:
 *                      type: number
 *                      description: 2022-07-20
 *                      example: 2022-07-20
 *                    count:
 *                      type: number
 *                      description: 좋아요 개수
 *                      example: 0
 *                    likeSelection:
 *                      type: number
 *                      description: 회원이 좋아요 선택했는지
 *                      example: true / false
 *      404:
 *        description: 게시글 수정 오류
 *        content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: string
 *                  example: false
 *                error:
 *                  type: object
 *                  properties:
 *                    code:
 *                      type: integer
 *                      description: http status
 *                      example: 404
 *                    message:
 *                      type: string
 *                      description: 오류 내용
 *                      example: 존재하지 않는 게시글입니다.
 *
 */
boardRouter.put(
  "/boards/:id",
  loginRequired,
  imageUpload.array("images"),
  boardValidator.checkId,
  boardController.editPost
);

/** 게시글 삭제
 * @swagger
 * /boards/{id}:
 *   delete:
 *    summary: 게시글 삭제 API
 *    description: 게시글을 삭제할 때 사용하는 API 입니다.
 *    tags: [Board]
 *    parameters:
 *       - in: path
 *         name: id
 *         description: 삭제할 게시글의 id
 *         example: 1
 *         schema:
 *          type: string
 *    responses:
 *      200:
 *        description: 게시글 삭제
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                code:
 *                  type: number
 *                  example: 200
 *                message:
 *                  type: string
 *                  example: 글 삭제에 성공하였습니다.
 *      404:
 *        description: 게시글 수정 오류
 *        content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: string
 *                  example: false
 *                error:
 *                  type: object
 *                  properties:
 *                    code:
 *                      type: integer
 *                      description: http status
 *                      example: 404
 *                    message:
 *                      type: string
 *                      description: 오류 내용
 *                      example: 존재하지 않는 게시글입니다.
 *
 */
boardRouter.delete(
  "/boards/:id",
  loginRequired,
  boardValidator.checkId,
  boardController.deletePost
);


/********** 댓글 **********/

/** 댓글 생성
 * @swagger
 * /boards/{postId}/comments:
 *   post:
 *    summary: 댓글 생성 API
 *    description: 댓글을 생성할 때 사용하는 API 입니다.
 *    tags: [Comment]
 *    parameters:
 *       - in: path
 *         name: postId
 *         description: 댓글 작성할 게시글의 id
 *         example: 1
 *         schema:
 *          type: string
 *    requestBody:
 *      x-name: body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            required:
 *            - content
 *            properties:
 *              content:
 *                type: string
 *                example: 내용
 *    responses:
 *      201: 
 *        description: 댓글 생성 성공
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                code:
 *                  type: number
 *                  example: 201
 *                message:
 *                  type: string
 *                  example: 댓글 작성에 성공하였습니다.
 *                data:
 *                  type: object
 *                  properties:
 *                    commentId:
 *                      type: number
 *                      description: 1, 2, 3, 4, 5...
 *                      example: 1
 *                    userId:
 *                      type: number
 *                      description: 1, 2, 3, 4, 5...
 *                      example: 1
 *                    nickname:
 *                      type: string
 *                      description: 닉네임
 *                      example: 닉네임
 *                    postId:
 *                      type: number
 *                      description: 1, 2, 3, 4, 5...
 *                      example: 1
 *                    content:
 *                      type: string
 *                      description: 댓글
 *                      example: 댓글
 *                    createdate:
 *                      type: number
 *                      description: 2022-07-20
 *                      example: 2022-07-20
 *      404:
 *        description: 댓글 생성 오류
 *        content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: string
 *                  example: false
 *                error:
 *                  type: object
 *                  properties:
 *                    code:
 *                      type: integer
 *                      description: http status
 *                      example: 404
 *                    message:
 *                      type: string
 *                      description: 오류 내용
 *                      example: 존재하지 않는 유저입니다.
 */
boardRouter.post(
  "/boards/:postId/comments",
  loginRequired,
  boardValidator.checkPostId,
  boardController.createComment
);

/** 게시글의 댓글 조회
 * @swagger
 * /boards/{postId}/comments:
 *   get:
 *    summary: 게시글의 댓글 조회 API
 *    description: 게시글의 댓글 조회할 때 사용하는 API 입니다.
 *    tags: [Comment]
 *    parameters:
 *       - in: path
 *         name: postId
 *         description: 댓글 조회할 게시글의 id
 *         example: 1
 *         schema:
 *          type: string
 *    responses:
 *      200: 
 *        description: 댓글 조회 성공
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                code:
 *                  type: number
 *                  example: 200
 *                message:
 *                  type: string
 *                  example: 댓글 조회에 성공하였습니다.
 *                data:
 *                  type: object
 *                  properties:
 *                    commentId:
 *                      type: number
 *                      description: 1, 2, 3, 4, 5...
 *                      example: 1
 *                    userId:
 *                      type: number
 *                      description: 1, 2, 3, 4, 5...
 *                      example: 1
 *                    nickname:
 *                      type: string
 *                      description: 닉네임
 *                      example: 닉네임
 *                    postId:
 *                      type: number
 *                      description: 1, 2, 3, 4, 5...
 *                      example: 1
 *                    content:
 *                      type: string
 *                      description: 댓글
 *                      example: 댓글
 *                    createdate:
 *                      type: number
 *                      description: 2022-07-20
 *                      example: 2022-07-20
 *      404:
 *        description: 댓글 조회 오류
 *        content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: string
 *                  example: false
 *                error:
 *                  type: object
 *                  properties:
 *                    code:
 *                      type: integer
 *                      description: http status
 *                      example: 404
 *                    message:
 *                      type: string
 *                      description: 오류 내용
 *                      example: 존재하지 않는 게시글입니다.
 */
boardRouter.get(
  "/boards/:postId/comments",
  boardValidator.checkPostId,
  boardController.getPostComments
);

/** 댓글 수정
 * @swagger
 * /boards/{postId}/comments/{id}:
 *   put:
 *    summary: 댓글 수정 API
 *    description: 댓글을 수정할 때 사용하는 API 입니다.
 *    tags: [Comment]
 *    parameters:
 *       - in: path
 *         name: postId
 *         description: 댓글 수정할 게시글의 id
 *         example: 1
 *       - in: path
 *         name: id
 *         description: 수정할 댓글의 id
 *         example: 1
 *    responses:
 *      200: 
 *        description: 댓글 수정 성공
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                code:
 *                  type: number
 *                  example: 200
 *                message:
 *                  type: string
 *                  example: 댓글 수정에 성공하였습니다.
 *                data:
 *                  type: object
 *                  properties:
 *                    commentId:
 *                      type: number
 *                      description: 1, 2, 3, 4, 5...
 *                      example: 1
 *                    userId:
 *                      type: number
 *                      description: 1, 2, 3, 4, 5...
 *                      example: 1
 *                    nickname:
 *                      type: string
 *                      description: 닉네임
 *                      example: 닉네임
 *                    postId:
 *                      type: number
 *                      description: 1, 2, 3, 4, 5...
 *                      example: 1
 *                    content:
 *                      type: string
 *                      description: 댓글
 *                      example: 댓글
 *                    createdate:
 *                      type: number
 *                      description: 2022-07-20
 *                      example: 2022-07-20
 *      404:
 *        description: 댓글 수정 오류
 *        content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: string
 *                  example: false
 *                error:
 *                  type: object
 *                  properties:
 *                    code:
 *                      type: integer
 *                      description: http status
 *                      example: 404
 *                    message:
 *                      type: string
 *                      description: 오류 내용
 *                      example: 존재하지 않는 게시글입니다.
 */
boardRouter.put(
  "/boards/:postId/comments/:id",
  loginRequired,
  boardValidator.checkPostId,
  boardController.editComment
);

/** 댓글 삭제
 * @swagger
 * /boards/{postId}/comments/{id}:
 *   delete:
 *    summary: 게시글의 댓글 삭제 API
 *    description: 게시글의 댓글을 삭제할 때 사용하는 API 입니다.
 *    tags: [Comment]
 *    parameters:
 *       - in: path
 *         name: postId
 *         description: 댓글 삭제할 게시글의 id
 *         example: 1
 *       - in: path
 *         name: id
 *         description: 삭제할 댓글의 id
 *         example: 1
 *    responses:
 *      200: 
 *        description: 댓글 삭제 성공
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                code:
 *                  type: number
 *                  example: 200
 *                message:
 *                  type: string
 *                  example: 댓글 삭제에 성공하였습니다.
 *                data:
 *                  type: object
 *                  properties:
 *                    commentId:
 *                      type: number
 *                      description: 1, 2, 3, 4, 5...
 *                      example: 1
 *                    userId:
 *                      type: number
 *                      description: 1, 2, 3, 4, 5...
 *                      example: 1
 *                    nickname:
 *                      type: string
 *                      description: 닉네임
 *                      example: 닉네임
 *                    postId:
 *                      type: number
 *                      description: 1, 2, 3, 4, 5...
 *                      example: 1
 *                    content:
 *                      type: string
 *                      description: 댓글
 *                      example: 댓글
 *                    createdate:
 *                      type: number
 *                      description: 2022-07-20
 *                      example: 2022-07-20
 *      404:
 *        description: 댓글 삭제 오류
 *        content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: string
 *                  example: false
 *                error:
 *                  type: object
 *                  properties:
 *                    code:
 *                      type: integer
 *                      description: http status
 *                      example: 404
 *                    message:
 *                      type: string
 *                      description: 오류 내용
 *                      example: 존재하지 않는 게시글입니다.
 */
boardRouter.delete(
  "/boards/:postId/comments/:id",
  loginRequired,
  boardValidator.checkPostId,
  boardController.deleteComment
);

export { boardRouter };