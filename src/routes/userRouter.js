import { Router } from "express";

import { loginRequired } from "../middlewares/loginRequired.js";
import { userValidator } from "../middlewares/express-validator/index.js";
import { userController } from "../controllers/userController.js";
import imageUpload from "../utils/s3.js";
import user from "../middlewares/express-validator/user.js";

const userRouter = Router();

/**
 *  @swagger
 *  tags:
 *    name: User
 *    description: User MVP
 */
/**
 * @swagger
 * /users:
 *   post:
 *    summary: 유저 생성 API
 *    description: 유저를 생성할 때 사용하는 API 입니다.
 *    tags: [User]
 *    parameters:
 *    - name: code
 *      in: query
 *      description: 쿼리에 code을 입력하세요
 *      required: true
 *      schema:
 *        type: stringify
 *      examples:
 *        Sample:
 *          value: example value
 *          summary: code
 *      style: simple
 *    responses:
 *      201:
 *        description: 유저 생성
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                code:
 *                  type: number
 *                  example: 201
 *                data:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: number
 *                      description: 1, 2, 3, 4, 5...
 *                      example: 1
 *                    kakaoid:
 *                      type: number
 *                      description: 12341234
 *                      example: 12341234
 *                    profile_url:
 *                      type: string
 *                      description: https://~
 *                      example: https://rabbitpull.kr.objectstorage.ncloud.com/users/1658031520811
 *                    nickname:
 *                      type: string
 *                      description: 닉네임
 *                      example: 닉네임
 *                    token:
 *                      type: string
 *                      description: akfdlamdlfd
 *                      example: akfdlamdlfd
 * 
 */
// 회원가입
userRouter.get(
  "/users/login",
  userController.createUser
);


/**
 * @swagger
 * /users:
 *   get:
 *    summary: 유저 조회 API
 *    description: 유저를 조회할 때 사용하는 API 입니다.
 *    tags: [User]
 *    parameters:
 *    - name: token
 *      in: header
 *      description: 헤더에 토큰을 입력하세요
 *      required: true
 *      schema:
 *        type: stringify
 *      examples:
 *        Sample:
 *          value: example value
 *          summary: A sample token
 *      style: simple
 *    responses:
 *      200:
 *        description: 유저 조회
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
 *                  example: 회원 정보 조회에 성공하였습니다.
 *                data:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: number
 *                      description: 1, 2, 3, 4, 5...
 *                      example: 1
 *                    kakaoid:
 *                      type: number
 *                      description: 12341234
 *                      example: 12341234
 *                    profile_url:
 *                      type: string
 *                      description: https://~
 *                      example: https://rabbitpull.kr.objectstorage.ncloud.com/users/1658031520811
 *                    nickname:
 *                      type: string
 *                      description: 닉네임
 *                      example: 닉네임
 *                    role:
 *                      type: string
 *                      description: user, admin
 *                      example: admin
 * 
 *      400:
 *        description: 유저 조회 오류
 *        content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
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
 * 
 */
// 회원 정보 조회
userRouter.get(
  "/users",
  loginRequired,
  userController.findUserInfo
);

// 회원 닉네임 수정
userRouter.put(
  "/users",
  loginRequired,
  userController.updateUserNickname
);

// 회원 프로필 이미지 수정
userRouter.put(
  "/users/image",
  loginRequired,
  imageUpload.single("profile_url"),
  userController.updateUserImage
);

// 회원의 꿀조합 게시글 목록 조회
userRouter.get(
  "/users/boards",
  loginRequired,
  userController.findUserBoard
);

// 회원의 좋아요 목록 조회
userRouter.get(
  "/users/likes",
  loginRequired,
  userController.findUserLike
);


export { userRouter };