import { Router } from "express";
import { addRecipes } from "../controllers/recipeController.js";
import { recipeValidator } from "../middlewares/express-validator/index.js";

const recipeRouter = Router();

recipeRouter.post("/recipe", recipeValidator.checkRecipe, addRecipes);

export {recipeRouter};