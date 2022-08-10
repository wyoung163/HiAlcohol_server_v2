import { Router } from "express";
import { showTestResult } from "../controllers/mbtiTestController.js";
import { mbtiTestValidator } from "../middlewares/express-validator/index.js";

const mbtiTestRouter = Router();

/**
 *  @swagger
 *  tags:
 *    name: MbtiTest
 *    description: MbtiTest MVP
 */
/**
 * @swagger
 * /mbti:
 *   get:
 *    summary: 테스트 완료 API
 *    description: mbti 술 추천 테스트 결과에 대한 API입니다.
 *    tags: [MbtiTest]
 *    parameters:
 *    - name: result
 *      in: query
 *      description: 퀴리에 테스트 결과(답안)을 입력하세요.
 *      required: true
 *      schema:
 *        type: 
 *      examples:
 *        Sample:
 *          value: example value
 *          summary: result
 *      style: simple
 *    responses:
 *      200:
 *        description: mbti 술 추천 테스트 결과 
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
 *                  example: 테스트를 완료합니다.
 *                data:
 *                  type: object
 *                  properties:
 *                    mbti:
 *                      type: string
 *                      description: mbti 결과
 *                      example: infj
 *                    cockId:
 *                      type: number
 *                      description: 칵테일 아이디
 *                      example: 1
 */
mbtiTestRouter.get("/mbti", mbtiTestValidator.checkTestAnswers, showTestResult);

export { mbtiTestRouter };