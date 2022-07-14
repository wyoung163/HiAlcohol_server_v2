import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { addRecipes, editRecipes } from "../controllers/recipeController.js";
import { recipeValidator } from "../middlewares/express-validator/index.js";

const recipeRouter = Router();

recipeRouter.post("/admin/recipe", loginRequired, isAdmin, recipeValidator.checkRecipe, addRecipes);
recipeRouter.patch("/admin/recipe", loginRequired, isAdmin, recipeValidator.checkRecipe, editRecipes);

export {recipeRouter};