import { Router } from "express";
import { showSearchLists, showRecipe } from "../controllers/searchController.js";

const searchRouter = Router();

/**
 *  @swagger
 *  tags:
 *    name: Search
 *    description: Search MVP
 */
/**
 * @swagger
 * /cocktails/search:
 *   get:
 *    summary: 검색 결과 조회 API
 *    description: 술 레시피 관련 검색 결과를 조회할 수 있는 API 입니다.
 *    tags: [Search]
 *    parameters:
 *    - name: keyword
 *      in: query
 *      description: 쿼리에 keyword를 입력하세요
 *      required: true
 *      schema:
 *        type: stringify
 *      examples:
 *        Sample:
 *          value: example value
 *          summary: keyword
 *      style: simple
 *    responses:
 *      200:
 *        description: 술 레시피 검색 결과 조회
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
 *                  example: 검색 조회에 성공하였습니다.
 *                data:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: number
 *                        description: 레시피 아이디
 *                        example: 2
 *                      cocktail:
 *                        type: string
 *                        description: 칵테일 이름
 *                        example: 보드카 
 *                      materials:
 *                        type: array
 *                        items:
 *                          type: string
 *                          description: 칵테일 재료
 *                          example: 재료1, 재료2    
 */
searchRouter.get("/search", showSearchLists);

/**
 * @swagger
 * /cocktails/recipe/:id:
 *   get:
 *    summary: 레시피 조회 API
 *    description: 술 레시피 관련 검색 결과를 조회할 수 있는 API 입니다.
 *    tags: [Search]
 *    parameters:
 *    - name: id
 *      in: params
 *      description: 파라미터에 레시피 id를 입력하세요
 *      required: true
 *      schema:
 *        type: stringify
 *      examples:
 *        Sample:
 *          value: example value
 *          summary: id
 *      style: simple
 *    responses:
 *      200:
 *        description: 술 레시피 조회
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
 *                  example: 검색 조회에 성공하였습니다.
 *                data:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: number
 *                      description: 레시피 아이디
 *                      example: 2
 *                    cocktail:
 *                      type: string
 *                      description: 칵테일 이름
 *                      example: 보드카
 *                    materials:
 *                      type: array
 *                      items:
 *                        type: string
 *                        description: 칵테일 재료
 *                        example: 재료1, 재료2    
 *                    rate:
 *                      type: string
 *                      description: 칵테일 재료 비율
 *                      example: 보드카 3 아마레또1
 *                    content:
 *                      type: string
 *                      description: 칵테일 제조 방법
 *                      example: 보드카, 파인애플주스, 코코코넛밀크를 넣고 흔든 후 잘게 부순 얼음으로 채운 잔에 따른다
 */
searchRouter.get("/recipe/:id", showRecipe);

export {searchRouter};