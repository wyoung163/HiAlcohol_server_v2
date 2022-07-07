import { Router } from "express";
import { addCommentReport, addBoardReport } from "../controllers/reportController.js";

const reportRouter = Router();

reportRouter.post("/reports/comment/:id", addCommentReport);
reportRouter.post("/reports/board/:id", addBoardReport);

export { reportRouter };