import { check, body, query } from "express-validator";
import { validate, notFoundValidate } from "../validator.js";

export default {
  checkId: [
    check("id")
      .trim()
      .isLength()
      .exists()
      .withMessage("parameter 값으로 아이디를 입력해주세요.")
      .bail(),
    notFoundValidate,
    validate,
  ],
};