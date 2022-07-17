import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { addRecipes, editRecipes } from "../controllers/recipeController.js";
import { recipeValidator } from "../middlewares/express-validator/index.js";
import  imageUpload  from "../utils/s3.js";

const recipeRouter = Router();

recipeRouter.post("/admin/recipe", loginRequired, isAdmin, recipeValidator.checkRecipe, imageUpload.single("image"), addRecipes);
recipeRouter.patch("/admin/recipe", loginRequired, isAdmin, recipeValidator.checkRecipe, imageUpload.single("image"), editRecipes);

export { recipeRouter };