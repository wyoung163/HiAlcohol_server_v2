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

reportRouter.get("/admin/reports/board", loginRequired, isAdmin, showBoardReport);
reportRouter.get("/admin/reports/comment", loginRequired, isAdmin, showCommentReport);
reportRouter.post("/reports/board/:boardId/comment/:commentId", loginRequired, addCommentReport);
reportRouter.post("/reports/board/:id", loginRequired, addBoardReport);
reportRouter.patch("/admin/reports/board/:boardId/comment/:commentId", loginRequired, isAdmin, editCommentBlind);
reportRouter.patch("/admin/reports/board/:id", loginRequired, isAdmin, editBoardBlind);

export { reportRouter };
