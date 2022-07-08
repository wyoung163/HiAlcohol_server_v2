import { Router } from "express";
import {     
    addCommentReport, 
    addBoardReport, 
    showBoardReport, 
    showCommentReport,  
    editCommentBlind,
    editBoardBlind  
} from "../controllers/reportController.js";

const reportRouter = Router();

reportRouter.get("/admin/reports/board", showBoardReport);
reportRouter.get("/admin/reports/comment", showCommentReport);
reportRouter.post("/reports/board/:boardId/comment/:commentId", addCommentReport);
reportRouter.post("/reports/board/:id", addBoardReport);
reportRouter.patch("/admin/reports/board/:boardId/comment/:commentId", editCommentBlind);
reportRouter.patch("/admin/reports/board/:id", editBoardBlind);

export { reportRouter };
