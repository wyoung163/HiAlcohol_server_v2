import { Router } from "express";
import { addBoardLike, cancelBoardLike } from "../controllers/likeController.js";

const likeRouter = Router();

likeRouter.post("/board/:id/like", addBoardLike);
likeRouter.delete("/board/:id/like", cancelBoardLike);

export { likeRouter };