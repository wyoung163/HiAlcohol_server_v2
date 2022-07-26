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
/** 회원가입 & 로그인
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
userRouter.get(
  "/users/login",
  userController.createUser
);


/** 회원 정보 조회
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
 *      404:
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
userRouter.get(
  "/users",
  loginRequired,
  userController.findUserInfo
);

/** 회원 닉네임 수정
 * @swagger
 * /users:
 *   put:
 *    summary: 유저 닉네임 수정 API
 *    description: 유저의 닉네임 수정할 때 사용하는 API 입니다.
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
 *    requestBody:
 *      x-name: body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            required:
 *            - content
 *            properties:
 *              nickname:
 *                type: string
 *                example: tester
 *    responses:
 *      200:
 *        description: 유저 닉네임 변경 성공
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
 *                  example: 회원 정보 수정에 성공하였습니다.
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
 *      404:
 *        description: 유저 닉네임 변경 오류
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
userRouter.put(
  "/users",
  loginRequired,
  userController.updateUserNickname
);

/** 회원 프로필 이미지 수정
 * @swagger
 * /users/image:
 *   post:
 *    summary: 유저 프로필 이미지 수정 API
 *    description: 유저의 프로필 이미지 수정할 때 사용하는 API 입니다.
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
 *    requestBody:
 *      x-name: body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            required:
 *            - content
 *            properties:
 *              profile_url:
 *                type: string
 *                example: tester
 *    responses:
 *      200:
 *        description: 유저 프로필 이미지 변경 성공
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
 *                  example: 회원 정보 수정에 성공하였습니다.
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
 *      404:
 *        description: 유저 닉네임 변경 오류
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
userRouter.post(
  "/users/image",
  loginRequired,
  imageUpload.single("profile_url"),
  userController.updateUserImage
);

/** 회원의 꿀조합 게시글 목록 조회
 * @swagger
 * /users/boards:
 *   get:
 *    summary: 유저 꿀조합 게시글 조회 API
 *    description: 유저가 쓴 꿀조합 게시글을 조회하는 API 입니다.
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
 *        description: 유저 꿀조합 게시글 조회
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
 *                  example: 게시글 조회에 성공하였습니다.
 *                data:
 *                  type: object
 *                  properties:
 *                    postId:
 *                      type: number
 *                      description: 1, 2, 3, 4, 5...
 *                      example: 1
 *                    userId:
 *                      type: number
 *                      description: 12341234
 *                      example: 12341234
 *                    nickname:
 *                      type: string
 *                      description: 닉네임
 *                      example: 닉네임
 *                    title:
 *                      type: string
 *                      description: 제목
 *                      example: 제목
 *                    content:
 *                      type: string
 *                      description: 내용
 *                      example: 내용
 *                    createdate:
 *                      type: date
 *                      description: 2022-07-20
 *                      example: 2022-07-20
 *                    count:
 *                      type: number
 *                      description: 1
 *                      example: 1
 *                    likeSelection:
 *                      type: number
 *                      description: true / false
 *                      example: true / false
 * 
 *      404:
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
userRouter.get(
  "/users/boards",
  loginRequired,
  userController.findUserBoard
);

/** 회원의 좋아요 목록 조회
 * @swagger
 * /users/likes:
 *   get:
 *    summary: 유저 게시글 좋아요 조회 API
 *    description: 유저가 좋아요를 누른 게시글을 조회하는 API 입니다.
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
 *        description: 유저 게시글 좋아요 조회
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
 *                  example: 게시글 조회에 성공하였습니다.
 *                data:
 *                  type: object
 *                  properties:
 *                    postId:
 *                      type: number
 *                      description: 1, 2, 3, 4, 5...
 *                      example: 1
 *                    userId:
 *                      type: number
 *                      description: 12341234
 *                      example: 12341234
 *                    nickname:
 *                      type: string
 *                      description: 닉네임
 *                      example: 닉네임
 *                    title:
 *                      type: string
 *                      description: 제목
 *                      example: 제목
 *                    content:
 *                      type: string
 *                      description: 내용
 *                      example: 내용
 *                    createdate:
 *                      type: date
 *                      description: 2022-07-20
 *                      example: 2022-07-20
 *                    count:
 *                      type: number
 *                      description: 1
 *                      example: 1
 *                    likeSelection:
 *                      type: number
 *                      description: true / false
 *                      example: true / false
 * 
 *      404:
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
userRouter.get(
  "/users/likes",
  loginRequired,
  userController.findUserLike
);


export { userRouter };