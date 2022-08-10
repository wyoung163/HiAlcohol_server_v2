import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired.js";
import { addBoardLike, cancelBoardLike, addSuggestionLike, cancelSuggestionLike } from "../controllers/likeController.js";

const likeRouter = Router();

/**
 *  @swagger
 *  tags:
 *    name: Like
 *    description: Like MVP
 */
/**
 * @swagger
 * /board/:id/like:
 *   post:
 *    summary: 꿀조합 게시판 좋아요 선택 API
 *    description: 꿀조합 게시글에 대한 좋아요를 선택하는 API입니다.
 *    tags: [Like]
 *    parameters:
 *    - name: id
 *      in: params
 *      description: 파라미터에 꿀조합 게시글 아이디를 입력하세요.
 *      required: true
 *      schema:
 *        type: int
 *      examples:
 *        Sample:
 *          value: 3
 *          summary: id
 *      style: simple
 *    responses:
 *      200:
 *        description: 꿀조합 게시판 좋아요 선택 
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
 *                  example: 좋아요 선택에 성공하였습니다.
 *                data:
 *                  type: object
 *                  properties:
 *                    likeId:
 *                      type: number
 *                      description: 추가된 좋아요 아이디
 *                      example: 1 
 */
likeRouter.post("/board/:id/like", loginRequired, addBoardLike);

/**
 * @swagger
 * /board/:id/like:
 *   delete:
 *    summary: 꿀조합 게시판 좋아요 취소 API
 *    description: 꿀조합 게시글에 대한 좋아요를 취소하는 API입니다.
 *    tags: [Like]
 *    parameters:
 *    - name: id
 *      in: params
 *      description: 파라미터에 꿀조합 게시글 아이디를 입력하세요.
 *      required: true
 *      schema:
 *        type: int
 *      examples:
 *        Sample:
 *          value: 3
 *          summary: id
 *      style: simple
 *    responses:
 *      200:
 *        description: 꿀조합 게시판 좋아요 취소
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
 *                  example: 좋아요 취소에 성공하였습니다.
 */
likeRouter.delete("/board/:id/like", loginRequired, cancelBoardLike);

/**
 * @swagger
 * /suggestion/:id/like:
 *   post:
 *    summary: 건의 게시판 좋아요 선택 API
 *    description: 건의 게시글에 대한 좋아요를 선택하는 API입니다.
 *    tags: [Like]
 *    parameters:
 *    - name: id
 *      in: params
 *      description: 파라미터에 건의 게시글 아이디를 입력하세요.
 *      required: true
 *      schema:
 *        type: int
 *      examples:
 *        Sample:
 *          value: 3
 *          summary: id
 *      style: simple
 *    responses:
 *      200:
 *        description: 건의 게시판 좋아요 선택 
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
 *                  example: 좋아요 선택에 성공하였습니다.
 *                data:
 *                  type: object
 *                  properties:
 *                    likeId:
 *                      type: number
 *                      description: 추가된 좋아요 아이디
 *                      example: 1
 */
likeRouter.post("/suggestion/:id/like", loginRequired, addSuggestionLike);

/**
 * @swagger
 * /suggestion/:id/like:
 *   delete:
 *    summary: 건의 게시판 좋아요 취소 API
 *    description: 건의 게시글에 대한 좋아요를 취소하는 API입니다.
 *    tags: [Like]
 *    parameters:
 *    - name: id
 *      in: params
 *      description: 파라미터에 건의 게시글 아이디를 입력하세요.
 *      required: true
 *      schema:
 *        type: int
 *      examples:
 *        Sample:
 *          value: 3
 *          summary: id
 *      style: simple
 *    responses:
 *      200:
 *        description: 건의 게시판 좋아요 취소
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
 *                  example: 좋아요 취소에 성공하였습니다.
 */
likeRouter.delete("/suggestion/:id/like", loginRequired, cancelSuggestionLike);

export { likeRouter };