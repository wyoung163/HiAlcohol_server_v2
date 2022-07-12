import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired.js";
import { isLogined } from "../middlewares/isLogined.js";
import { showSuggestions, showSuggestionBoard, addSuggestionBoard, editSuggestionBoard, addSuggestionLike, cancelSuggestionLike } from "../controllers/suggestionController.js";
import { suggestionValidator } from "../middlewares/express-validator/index.js";

const suggestionRouter = Router();

suggestionRouter.get("/suggestions", isLogined, showSuggestions);
suggestionRouter.post("/suggestion", loginRequired, suggestionValidator.checkSuggestion, addSuggestionBoard);
suggestionRouter.get("/suggestion/:id", isLogined, showSuggestionBoard);
suggestionRouter.patch("/suggestion/:id", loginRequired, suggestionValidator.checkSuggestion, editSuggestionBoard);
suggestionRouter.post("/suggestion/:id/like", loginRequired, addSuggestionLike);
suggestionRouter.delete("/suggestion/:id/like", loginRequired, cancelSuggestionLike);

export { suggestionRouter };