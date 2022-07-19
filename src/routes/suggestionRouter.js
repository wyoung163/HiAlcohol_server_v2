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

suggestionRouter.get("/suggestions", isLogined, showSuggestions);
suggestionRouter.get("/admin/suggestions", loginRequired, isAdmin, showSuggestionsForAdmin);
suggestionRouter.post("/suggestion", loginRequired, suggestionValidator.checkSuggestion, addSuggestionBoard);
suggestionRouter.get("/suggestion/:id", isLogined, showSuggestionBoard);
suggestionRouter.get("/admin/suggestion/:id", loginRequired, isAdmin, showSuggestionBoardForAdmin);
suggestionRouter.patch("/suggestion/:id", loginRequired, suggestionValidator.checkSuggestion, editSuggestionBoard);

export { suggestionRouter };