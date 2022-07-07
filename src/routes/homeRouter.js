import { Router } from "express";
import { showRecommendedCocktail } from "../controllers/homeController.js";

const homeRouter = Router();

homeRouter.get("/", showRecommendedCocktail);

export { homeRouter };