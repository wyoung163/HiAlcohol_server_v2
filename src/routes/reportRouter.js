import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import {     
    addCommentReport, 
    addBoardReport, 
    showBoardReport, 
    showCommentReport,  
    editCommentBlind,
    editBoardBlind  
} from "../controllers/reportController.js";

const reportRouter = Router();

/**
 *  @swagger
 *  tags:
 *    name: Report
 *    description: Report MVP
 */
/**
 * @swagger
 * /admin/reports/board:
 *   get:
 *    summary: 관리자의 신고된 게시글 목록 조회 API
 *    description: 관리자가 신고된 게시글 목록을 조회할 수 있는 API입니다.
 *    tags: [Report]
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
 *        description: 신고된 게시글 목록 
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                code:
 *                  type: number
 *                message:
 *                  type: string
 *                data:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: number
 *                        description: 신고된 게시글 아이디
 *                      nickname:
 *                        type: string
 *                        description: 게시글 작성자 닉네임
 *                      title:
 *                        type: string
 *                        description: 게시글 제목
 *                      content:
 *                        type: string
 *                        description: 게시글 내용
 *                      createdate:
 *                        type: string
 *                        description: 작성일자
 *                      count:
 *                        type: number
 *                        description: 신고 횟수
 *            example: {
 *                      code: 200,
 *                      message: 신고된 게시글 목록 조회에 성공하였습니다,
 *                      data: [
 *                           {
 *                              id: 1,
 *                              nickname: 이하늘,
 *                              title: 내일 숙취가 없는 꿀조합,
 *                              content: 재료는 파워에이드, 레드불, 소주만 있으면 되는데 얼음도 있으면 좋고!...,
 *                              createdate: 2022-03-15 18:05:35,
 *                              count: 5
 *                           },
 *                            .....
 *                      ]    
 *                     }     
 */
reportRouter.get("/admin/reports/board", loginRequired, isAdmin, showBoardReport);

/**
 * @swagger
 * /admin/reports/comment:
 *   get:
 *    summary: 관리자의 신고된 댓글 및 해당 게시글 목록 조회 API
 *    description: 관리자가 신고된 댓글 목록을 그 댓글이 작성된 게시글과 함께 조회할 수 있는 API입니다.
 *    tags: [Report]
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
 *        description: 신고된 댓글 및 해당 게시글 목록 
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                code:
 *                  type: number
 *                message:
 *                  type: string
 *                data:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      post: 
 *                        type: object
 *                        properties:
 *                          id:
 *                            type: number
 *                            description: 신고된 게시글 아이디
 *                          nickname:
 *                            type: string
 *                            description: 게시글 작성자 닉네임
 *                          title:
 *                            type: string
 *                            description: 게시글 제목
 *                          content:
 *                            type: string
 *                            description: 게시글 내용
 *                          createdate:
 *                            type: string
 *                            description: 작성일자
 *                      comment: 
 *                        type: object
 *                        properties:
 *                          id:
 *                            type: number
 *                            description: 신고된 댓글 아이디
 *                          nickname:
 *                            type: string
 *                            description: 댓글 작성자 닉네임
 *                          content:
 *                            type: string
 *                            description: 댓글 내용
 *                          createdate:
 *                            type: string
 *                            description: 작성일자
 *                      count:
 *                        type: number
 *                        description: 신고 횟수
 *            example: {
 *                      code: 200,
 *                      message: 신고된 댓글 목록 조회에 성공하였습니다,                      
 *                      data: [
 *                         {
 *                             post: {
 *                                 id: 3,
 *                                 nickname: 하하하,
 *                                 title: 숙취없는 레시피,
 *                                 content: 재료는 파워에이드, 레드불, 소주만 있으면 되는데 얼음도 있으면 좋고!...,
 *                                 createdate: 2022-03-15 18:05:35
 *                              },
 *                              comment: {
 *                                 id: 14,
 *                                 nickname: 나나나,
 *                                 content: 유익해요,
 *                                 createdate: 2022-03-16 18:05:35
 *                              },
 *                              count: 5
 *                          },
 *                          .....
 *                      ]    
 *                     }     
 */
reportRouter.get("/admin/reports/comment", loginRequired, isAdmin, showCommentReport);

/**
 * @swagger
 * /reports/board/:boardId/comment/:commentId:
 *   post:
 *    summary: 사용자 댓글 신고 API
 *    description: 로그인한 사용자가 댓글을 신고하는 일과 관련된 API입니다.
 *    tags: [Report]
 *    parameters:
 *    - name: boardId
 *      in: params
 *      description: 파라미터에 신고된 댓글의 게시글 아이디를 입력하세요.
 *      required: true
 *      schema:
 *        type: stringify
 *      examples: 
 *        Sample: 
 *          value: example value 
 *          summary: boardId
 *      style: simple
 *    - name: commentId
 *      in: params
 *      description: 파라미터에 신고된 댓글 아이디를 입력하세요.
 *      required: true
 *      schema:
 *        type: stringify
 *      examples: 
 *        Sample: 
 *          value: example value 
 *          summary: commenId
 *      style: simple
 *    responses:
 *      200:
 *        description: 사용자의 댓글 신고 
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
 *                  example: 댓글 신고에 성공하였습니다.
 *                data:
 *                  type: object
 *                  properties:
 *                    count:
 *                      type: number
 *                      description: 신고 횟수
 *                      example: 10
 *                    reportId:
 *                      type: number
 *                      description: 추가된 신고 아이디
 *                      example: 1
 *                    postId:
 *                      type: number
 *                      description: 신고된 댓글의 게시글 아이디
 *                      example:  2
 *                    commentId:
 *                      type: number
 *                      description: 신고된 댓글 아이디
 *                      example:  1
 *                    isBlind:
 *                      type: string
 *                      description: 숨김 처리(count가 10회 이상일 때에만 제공되는 정보)
 *                      example: true   
 */
reportRouter.post("/reports/board/:boardId/comment/:commentId", loginRequired, addCommentReport);

/**
 * @swagger
 * /reports/board/:id:
 *   post:
 *    summary: 사용자 게시글 신고 API
 *    description: 로그인한 사용자가 게시글을 신고하는 일과 관련된 API입니다.
 *    tags: [Report]
 *    parameters:
 *    - name: id
 *      in: params
 *      description: 파라미터에 신고된 게시글 아이디를 입력하세요.
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
 *        description: 사용자의 게시글 신고
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
 *                  example: 게시글 신고에 성공하였습니다.
 *                data:
 *                  type: object
 *                  properties:
 *                    count:
 *                      type: number
 *                      description: 신고 횟수
 *                      example: 10
 *                    reportId:
 *                      type: number
 *                      description: 추가된 신고 아이디
 *                      example: 1
 *                    postId:
 *                      type: number
 *                      description: 신고된 게시글 아이디
 *                      example: 1
 *                    isBlind:
 *                      type: string
 *                      description: 숨김 처리(count가 10회 이상일 때에만 제공되는 정보)
 *                      example: true   
 */
reportRouter.post("/reports/board/:id", loginRequired, addBoardReport);

/**
 * @swagger
 * /admin/reports/board/:boardId/comment/:commentId:
 *   patch:
 *    summary: 관리자의 댓글 숨김 API
 *    description: 관리자가 임의로 댓글을 숨기거나 숨김을 철회할 수 있는 API입니다.(숨김 처리가 되어있을 때 선택하면 숨김이 철회되고 숨김 처리가 되어있지 않을 때 선택하면 숨김 처리됩니다.)
 *    tags: [Report]
 *    parameters:
 *    - name: boardId
 *      in: params
 *      description: 파라미터에 숨기거나 숨김을 철회할 댓글의 게시글 아이디를 입력하세요.
 *      required: true
 *      schema:
 *        type: stringify
 *      examples: 
 *        Sample: 
 *          value: example value 
 *          summary: boardId
 *      style: simple
 *    - name: commentId
 *      in: params
 *      description: 파라미터에 숨기거나 숨김을 철회할 댓글 아이디를 입력하세요.
 *      required: true
 *      schema:
 *        type: stringify
 *      examples: 
 *        Sample: 
 *          value: example value 
 *          summary: commenId
 *      style: simple
 *    responses:
 *      200:
 *        description: 임의로 댓글 숨김 및 숨김 철회
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
 *                  example: 댓글 숨김 처리(or 철회)에 성공하였습니다.
 *                data:
 *                  type: object
 *                  properties:
 *                    isBlind:
 *                      type: string
 *                      description: 숨김 처리 여부
 *                      example: true(숨김 처리), false(숨김 철회)    
 */
reportRouter.patch("/admin/reports/board/:boardId/comment/:commentId", loginRequired, isAdmin, editCommentBlind);

/**
 * @swagger
 * /admin/reports/board/:id:
 *   patch:
 *    summary: 관리자의 게시글 숨김 API
 *    description: 관리자가 임의로 게시글을 숨기거나 숨김을 철회할 수 있는 API입니다.(숨김 처리가 되어있을 때 선택하면 숨김이 철회되고 숨김 처리가 되어있지 않을 때 선택하면 숨김 처리됩니다.)
 *    tags: [Report]
 *    parameters:
 *    - name: id
 *      in: params
 *      description: 파라미터에 숨기거나 숨김을 철회할 게시글의 아이디를 입력하세요.
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
 *        description: 임의로 게시글 숨김 및 숨김 철회
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
 *                  example: 게시글 숨김 처리(or 철회)에 성공하였습니다.
 *                data:
 *                  type: object
 *                  properties:
 *                    isBlind:
 *                      type: string
 *                      description: 숨김 처리 여부
 *                      example: true(숨김 처리), false(숨김 철회)    
 */
reportRouter.patch("/admin/reports/board/:id", loginRequired, isAdmin, editBoardBlind);

export { reportRouter };
