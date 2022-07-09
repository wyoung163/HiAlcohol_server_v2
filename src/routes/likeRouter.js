import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired.js";
import { addBoardLike, cancelBoardLike } from "../controllers/likeController.js";

const likeRouter = Router();

likeRouter.post("/board/:id/like", loginRequired, addBoardLike);
likeRouter.delete("/board/:id/like", loginRequired, cancelBoardLike);

export { likeRouter };