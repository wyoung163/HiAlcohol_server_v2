import { Router } from "express";
import { showSuggestions, showSuggestionBoard, addSuggestionBoard, editSuggestionBoard } from "../controllers/suggestionController.js";
import { suggestionValidator } from "../middlewares/express-validator/index.js";

const suggestionRouter = Router();

suggestionRouter.get("/suggestions", showSuggestions);
suggestionRouter.get("/suggestions/:id", showSuggestionBoard);
suggestionRouter.post("/suggestion", suggestionValidator.checkSuggestion, addSuggestionBoard);
suggestionRouter.patch("/suggestions/:id", suggestionValidator.checkSuggestion, editSuggestionBoard);

export { suggestionRouter };