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
 * /:
 *   get:
 *    summary: 꿀조합 게시판 좋아요 선택 API
 *    description: 꿀조합 게시글에 대한 좋아요를 선택하는 API입니다.
 *    tags: [Home]
 *    parameters:
 *    - name: 
 *      in: 
 *      description: 
 *      required: 
 *      schema:
 *        type: 
 *      examples:
 *        Sample:
 *          value: 
 *          summary: 
 *      style: 
 *    responses:
 *      200:
 *        description: 메인 홈 화면(오늘의 술 추천) 조회
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
 *                  example: 좋아요 선택에 성공하였습니다..
 *                data:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: number
 *                      description: 칵테일 아이디
 *                      example: 1, 2, 3, 4, 5, ...
 *                    cocktail:
 *                      type: string
 *                      description: 칵테일 이름
 *                      example: 블랙 러시안, 화이트 러시안, ... 
 */
likeRouter.post("/board/:id/like", loginRequired, addBoardLike);
likeRouter.delete("/board/:id/like", loginRequired, cancelBoardLike);

likeRouter.post("/suggestion/:id/like", loginRequired, addSuggestionLike);
likeRouter.delete("/suggestion/:id/like", loginRequired, cancelSuggestionLike);

export { likeRouter };