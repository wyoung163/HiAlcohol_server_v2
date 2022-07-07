import { Router } from "express";
import { addCommentReport, addBoardReport, showBoardReport, showCommentReport } from "../controllers/reportController.js";

const reportRouter = Router();

reportRouter.get("/reports/board", showBoardReport);
reportRouter.get("/reports/comment", showCommentReport);
reportRouter.post("/reports/board/:boardId/comment/:commentId", addCommentReport);
reportRouter.post("/reports/board/:id", addBoardReport);


export { reportRouter };
