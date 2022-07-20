import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { addRecipes, editRecipes } from "../controllers/recipeController.js";
import { recipeValidator } from "../middlewares/express-validator/index.js";
import  imageUpload  from "../utils/s3.js";

const recipeRouter = Router();

/**
 *  @swagger
 *  tags:
 *    name: Recipe
 *    description: Recipe MVP
 */
/**
 * @swagger
 * /admin/recipe:
 *   post:
 *    summary: 레시피 추가 API
 *    description: 술 레시피 추가에 대한 API입니다.
 *    tags: [Recipe]
 *    parameters:
 *    - name: cocktailInfo
 *      in: body
 *      description: 칵테일 정보
 *      schema:
 *        type: object
 *        required: true
 *        properties:
 *           cocktail:
 *             type: string
 *             description: 칵테일 이름
 *             example: 보드카
 *           materials:
 *             type: array
 *             items:
 *               type: string
 *               description: 칵테일 재료
 *               example: 재료1, 재료2, ....
 *           rate:
 *             type: string
 *             description: 칵테일 비율
 *             example: 보드카 3 아마레또1
 *           content:
 *             type: string
 *             description: 칵테일 제조방법
 *             example: 보드카, 파인애플주스, 코코코넛밀크를 넣고 흔든 후 잘게 부순 얼음으로 채운 잔에 따른다
 *      examples:
 *        Sample:
 *          value: example value
 *          summary: cocktailInfo
 *      style: simple
 *    - name: image
 *      in: file
 *      description: 칵테일 이미지
 *      schema:
 *        type: object
 *        required: true
 *        properties:
 *           image:
 *             type: string
 *             description: 칵테일 이미지 url
 *             example: https://rabbitpull.kr.objectstorage.ncloud.com/users/1658031520811
 *      examples:
 *        Sample:
 *          value: example value
 *          summary: image
 *      style: simple
 *    responses:
 *      200:
 *        description: 술 레시피 추가
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
 *                  example: 레시피 추가에 성공하였습니다.
 *                data:
 *                  type: object
 *                  properties:
 *                    recipeId:
 *                      type: number
 *                      description: 추가된 레시피 아이디
 *                      example: 50
 */
recipeRouter.post("/admin/recipe", loginRequired, isAdmin, recipeValidator.checkRecipe, imageUpload.single("image"), addRecipes);

/**
 * @swagger
 * /admin/recipe:
 *   patch:
 *    summary: 레시피 수정 API
 *    description: 술 레시피 수정에 대한 API입니다.
 *    tags: [Recipe]
 *    parameters:
 *    - name: cocktailInfo
 *      in: body
 *      description: 칵테일 정보
 *      schema:
 *        type: object
 *        required: true
 *        properties:
 *           cocktail:
 *             type: string
 *             description: 칵테일 이름
 *             example: 보드카
 *           materials:
 *             type: array
 *             items:
 *               type: string
 *               description: 칵테일 재료
 *               example: 재료1, 재료2
 *           rate:
 *             type: string
 *             description: 칵테일 비율
 *             example: 보드카 3 아마레또1
 *           content:
 *             type: string
 *             description: 칵테일 제조방법
 *             example: 보드카, 파인애플주스, 코코코넛밀크를 넣고 흔든 후 잘게 부순 얼음으로 채운 잔에 따른다
 *      examples:
 *        Sample:
 *          value: example value
 *          summary: cocktailInfo
 *      style: simple
 *    - name: image
 *      in: file
 *      description: 칵테일 이미지
 *      schema:
 *        type: object
 *        required: true
 *        properties:
 *           image:
 *             type: string
 *             description: 칵테일 이미지 url
 *             example: https://rabbitpull.kr.objectstorage.ncloud.com/users/1658031520811
 *      examples:
 *        Sample:
 *          value: example value
 *          summary: image
 *      style: simple
 *    responses:
 *      200:
 *        description: 술 레시피 수정
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
 *                  example: 레시피 수정에 성공하였습니다.
 *                data:
 *                  type: object
 *                  properties:
 *                    recipeId:
 *                      type: number
 *                      description: 수정된 레시피 아이디
 *                      example: 50
 */
recipeRouter.patch("/admin/recipe", loginRequired, isAdmin, recipeValidator.checkRecipe, imageUpload.single("image"), editRecipes);

export { recipeRouter };