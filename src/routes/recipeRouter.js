import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { addRecipes } from "../controllers/recipeController.js";
import { recipeValidator } from "../middlewares/express-validator/index.js";

const recipeRouter = Router();

recipeRouter.post("/recipe", loginRequired, isAdmin, recipeValidator.checkRecipe, addRecipes);

export {recipeRouter};