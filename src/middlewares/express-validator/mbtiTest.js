import { query } from "express-validator";
import { validate, notFoundValidate } from "../validator.js";

export default {
  checkTestAnswers: [
    query("result")
      .trim()      
      .notEmpty()
      .withMessage("테스트 답안이 존재하지 않습니다.")
      .isLength(12)
      .withMessage("12개의 답안이 필요합니다."),
    notFoundValidate,
    validate,
  ],
};