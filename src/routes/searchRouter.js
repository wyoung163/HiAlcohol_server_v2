import { Router } from "express";
import { showSearchLists, showRecipe } from "../controllers/searchController.js";
const searchRouter = Router();

searchRouter.get("/search", showSearchLists);
searchRouter.get("/recipe/:id", showRecipe);

export {searchRouter};