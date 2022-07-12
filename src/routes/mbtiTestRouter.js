import { Router } from "express";
import { showTestResult } from "../controllers/mbtiTestController.js";
import { mbtiTestValidator } from "../middlewares/express-validator/index.js";

const mbtiTestRouter = Router();

mbtiTestRouter.get("/mbti", mbtiTestValidator.checkTestAnswers, showTestResult);

export { mbtiTestRouter };