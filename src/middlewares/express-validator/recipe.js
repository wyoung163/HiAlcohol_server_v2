import { body } from "express-validator";
import { validate, notFoundValidate } from "../validator.js";

export default {
  checkRecipe: [
    body("cocktail")
      .trim()      
      .notEmpty()
      .withMessage("칵테일 이름을 입력해주세요.")
      .isLength({ min: 1, max: 40 })
      .withMessage("40자 이내로 입력해주세요."),
    body("materials")
      .isArray(),
    body('materials.*')
      .trim()
      .notEmpty()
      .withMessage("재료를 입력해주세요.")
      .isLength({ min: 1, max: 50 })
      .withMessage("50자 이내로 입력해주세요."),
    body("rate")
      .trim()      
      .notEmpty()
      .withMessage("비율을 입력해주세요.")
      .isLength({ min: 1, max: 255 })
      .withMessage("255자 이내로 입력해주세요."),
    body("content")
      .trim()
      .notEmpty()
      .withMessage("내용을 입력해주세요.")
      .isLength({ min: 1, max: 2000 })
      .withMessage("2000자 이내로 입력해주세요."),  
    notFoundValidate,
    validate,
  ],
};