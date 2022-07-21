import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired.js";
import { isLogined } from "../middlewares/isLogined.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { 
    showSuggestions, 
    showSuggestionsForAdmin, 
    showSuggestionBoard, 
    showSuggestionBoardForAdmin, 
    addSuggestionBoard,
    editSuggestionBoard, 
} from "../controllers/suggestionController.js";
import { suggestionValidator } from "../middlewares/express-validator/index.js";

const suggestionRouter = Router();

/**
 *  @swagger
 *  tags:
 *    name: Suggestion
 *    description: Suggestion MVP
 */
/**
 * @swagger
 * /suggestions:
 *   get:
 *    summary: 건의 게시판 전체 조회 API
 *    description: 건의 게시판 목록을 조회할 수 있는 API 입니다.
 *    tags: [Suggestion]
 *    parameters:
 *    - name: option
 *      in: query
 *      description: 쿼리에 option을 입력하세요
 *      required: true
 *      schema:
 *        type: stringify
 *      examples:
 *        Sample:
 *          value: example value
 *          summary: option
 *      style: simple
 *    responses:
 *      200:
 *        description: 건의 게시판 목록 조회
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
 *                  example: 건의 게시판 접근에 성공하였습니다.
 *                data:
 *                  type: object
 *                  properties:
 *                    suggestionId:
 *                      type: number
 *                      description: 건의 게시글 아이디
 *                      example: 1 
 *                    nickname:
 *                      type: string
 *                      description: 사용자 아이디
 *                      example: 하하하
 *                    title:
 *                      type: string
 *                      description: 건의 게시글 제목
 *                      example: 000 칵테일 레시피 추가해주세요!
 *                    createdate:
 *                      type: string
 *                      description: 게시글 작성일자
 *                      example: 2022-03-15 18:05:35
 *                    count:
 *                      type: number
 *                      description: 좋아요 갯수
 *                      example: 5
 *                    likeSelection:
 *                      type: string
 *                      description: 사용자의 좋아요 선택 여부(*로그인한 사용자일 때만 표시)
 *                      example: true(or false)
 */
suggestionRouter.get("/suggestions", isLogined, showSuggestions);

/**
 * @swagger
 * /admin/suggestions:
 *   get:
 *    summary: 건의 게시판 전체 조회 API
 *    description: 건의 게시판 목록을 조회할 수 있는 API 입니다.
 *    tags: [Suggestion]
 *    parameters:
 *    - name: option
 *      in: query
 *      description: 쿼리에 option을 입력하세요
 *      required: true
 *      schema:
 *        type: stringify
 *      examples:
 *        Sample:
 *          value: example value
 *          summary: option
 *      style: simple
 *    responses:
 *      200:
 *        description: 건의 게시판 목록 조회
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
 *                  example: 건의 게시판 접근에 성공하였습니다.
 *                data:
 *                  type: object
 *                  properties:
 *                    suggestionId:
 *                      type: number
 *                      description: 건의 게시글 아이디
 *                      example: 1 
 *                    nickname:
 *                      type: string
 *                      description: 사용자 아이디
 *                      example: 하하하
 *                    title:
 *                      type: string
 *                      description: 건의 게시글 제목
 *                      example: 000 칵테일 레시피 추가해주세요!
 *                    createdate:
 *                      type: string
 *                      description: 게시글 작성일자
 *                      example: 2022-03-15 18:05:35
 *                    count:
 *                      type: number
 *                      description: 좋아요 갯수
 *                      example: 5
 *                    likeSelection:
 *                      type: string
 *                      description: 사용자의 좋아요 선택 여부(*로그인한 사용자일 때만 표시)
 *                      example: true(or false)
 */
suggestionRouter.get("/admin/suggestions", loginRequired, isAdmin, showSuggestionsForAdmin);

/**
 * @swagger
 * /suggestion:
 *   post:
 *    summary: 건의 게시글 작성 API
 *    description: 건의 게시글 작성을 위한 API 입니다.
 *    tags: [Suggestion]
 *    parameters:
 *    - name: title
 *      in: body
 *      description: 바디에 title을 입력하세요
 *      required: true
 *      schema:
 *        type: stringify
 *      examples:
 *        Sample:
 *          value: example value
 *          summary: title
 *      style: simple
 *    - name: content
 *      in: body
 *      description: 바디에 content을 입력하세요
 *      required: true
 *      schema:
 *        type: stringify
 *      examples:
 *        Sample:
 *          value: example value
 *          summary: content
 *      style: simple
 *    responses:
 *      200:
 *        description: 건의 게시글 작성
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
 *                  example: 건의 게시글 작성에 성공하였습니다.
 *                data:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: number
 *                      description: 건의 게시글 아이디
 *                      example: 1 
 *                    nickname:
 *                      type: string
 *                      description: 작성자 아이디
 *                      example: 하하하
 *                    title:
 *                      type: string
 *                      description: 건의 게시글 제목
 *                      example: 000 칵테일 레시피 추가해주세요!
 *                    createdate:
 *                      type: string
 *                      description: 게시글 작성일자
 *                      example: 2022-03-15 18:05:35
 */
suggestionRouter.post("/suggestion", loginRequired, suggestionValidator.checkSuggestion, addSuggestionBoard);

/**
 * @swagger
 * /suggestion/:id:
 *   get:
 *    summary: 건의 게시판 상세 조회 API
 *    description: 건의 게시글 상세 조회를 위한 API 입니다.
 *    tags: [Suggestion]
 *    parameters:
 *    - name: id
 *      in: params
 *      description: 파라미터에 건의 게시글 id를 입력하세요
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
 *        description: 건의 게시판 상세 조회
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
 *                  example: 건의 게시글 조회에 성공하였습니다.
 *                data:
 *                  type: object
 *                  properties:
 *                    suggestionId:
 *                      type: number
 *                      description: 건의 게시글 아이디
 *                      example: 1 
 *                    nickname:
 *                      type: string
 *                      description: 사용자 아이디
 *                      example: 하하하
 *                    title:
 *                      type: string
 *                      description: 건의 게시글 제목
 *                      example: 000 칵테일 레시피 추가해주세요!
 *                    content:
 *                      type: number
 *                      description: 건의 게시글 내용
 *                      example: 000 칵테일이 새로 나왔는데 ...
 *                    createdate:
 *                      type: string
 *                      description: 게시글 작성일자
 *                      example: 2022-03-15 18:05:35
 *                    count:
 *                      type: number
 *                      description: 좋아요 갯수
 *                      example: 5
 *                    likeSelection:
 *                      type: string
 *                      description: 사용자의 좋아요 선택 여부(*로그인한 사용자일 때만 표시)
 *                      example: true(or false)
 */
suggestionRouter.get("/suggestion/:id", isLogined, showSuggestionBoard);

/**
 * @swagger
 * /admin/suggestions:
 *   get:
 *    summary: 건의 게시판 전체 조회 API
 *    description: 건의 게시판 목록을 조회할 수 있는 API 입니다.
 *    tags: [Suggestion]
 *    parameters:
 *    - name: option
 *      in: query
 *      description: 쿼리에 option을 입력하세요
 *      required: true
 *      schema:
 *        type: stringify
 *      examples:
 *        Sample:
 *          value: example value
 *          summary: option
 *      style: simple
 *    responses:
 *      200:
 *        description: 건의 게시판 목록 조회
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
 *                  example: 건의 게시판 접근에 성공하였습니다.
 *                data:
 *                  type: object
 *                  properties:
 *                    suggestionId:
 *                      type: number
 *                      description: 건의 게시글 아이디
 *                      example: 1 
 *                    nickname:
 *                      type: string
 *                      description: 사용자 아이디
 *                      example: 하하하
 *                    title:
 *                      type: string
 *                      description: 건의 게시글 제목
 *                      example: 000 칵테일 레시피 추가해주세요!
 *                    createdate:
 *                      type: string
 *                      description: 게시글 작성일자
 *                      example: 2022-03-15 18:05:35
 *                    count:
 *                      type: number
 *                      description: 좋아요 갯수
 *                      example: 5
 *                    likeSelection:
 *                      type: string
 *                      description: 사용자의 좋아요 선택 여부(*로그인한 사용자일 때만 표시)
 *                      example: true(or false)
 */
suggestionRouter.get("/admin/suggestion/:id", loginRequired, isAdmin, showSuggestionBoardForAdmin);

/**
 * @swagger
 * /admin/suggestions:
 *   get:
 *    summary: 건의 게시판 전체 조회 API
 *    description: 건의 게시판 목록을 조회할 수 있는 API 입니다.
 *    tags: [Suggestion]
 *    parameters:
 *    - name: option
 *      in: query
 *      description: 쿼리에 option을 입력하세요
 *      required: true
 *      schema:
 *        type: stringify
 *      examples:
 *        Sample:
 *          value: example value
 *          summary: option
 *      style: simple
 *    responses:
 *      200:
 *        description: 건의 게시판 목록 조회
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
 *                  example: 건의 게시판 접근에 성공하였습니다.
 *                data:
 *                  type: object
 *                  properties:
 *                    suggestionId:
 *                      type: number
 *                      description: 건의 게시글 아이디
 *                      example: 1 
 *                    nickname:
 *                      type: string
 *                      description: 사용자 아이디
 *                      example: 하하하
 *                    title:
 *                      type: string
 *                      description: 건의 게시글 제목
 *                      example: 000 칵테일 레시피 추가해주세요!
 *                    createdate:
 *                      type: string
 *                      description: 게시글 작성일자
 *                      example: 2022-03-15 18:05:35
 *                    count:
 *                      type: number
 *                      description: 좋아요 갯수
 *                      example: 5
 *                    likeSelection:
 *                      type: string
 *                      description: 사용자의 좋아요 선택 여부(*로그인한 사용자일 때만 표시)
 *                      example: true(or false)
 */
suggestionRouter.patch("/suggestion/:id", loginRequired, suggestionValidator.checkSuggestion, editSuggestionBoard);

export { suggestionRouter };