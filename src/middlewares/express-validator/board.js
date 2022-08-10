import { check, body, query } from "express-validator";
import { validate, notFoundValidate } from "../validator.js";

export default {
  checkBody: [
    body("title")
      .exists()
      .withMessage("title을 body에 담아주세요.")
      .bail(),
    body("content")
      .exists()
      .withMessage("content를 body에 담아주세요.")
      .bail(),
    notFoundValidate,
    validate,
  ],

  checkId: [
    check("id")
      .trim()
      .isLength()
      .exists()
      .withMessage("parameter 값으로 id를 입력해주세요.")
      .bail(),
    notFoundValidate,
    validate,
  ],

  checkPostId: [
    check("postId")
      .trim()
      .isLength()
      .exists()
      .withMessage("parameter 값으로 postId를 입력해주세요.")
      .bail(),
    notFoundValidate,
    validate,
  ],
};