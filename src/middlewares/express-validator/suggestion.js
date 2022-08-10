import { check, body } from "express-validator";
import { validate, notFoundValidate } from "../validator.js";

export default {
    checkSuggestion: [
        body("title")
            .trim()
            .notEmpty()
            .withMessage('제목을 반드시 입력해주세요')
            .isLength({ min: 1, max: 255 })
            .withMessage('제목을 255자 이내로 입력해주세요'),
        body("content")
            .trim()
            .notEmpty()
            .withMessage('내용을 반드시 입력해주세요.')
            .isLength({ min: 1, max: 3000 })
            .withMessage('내용을 3000자 이내로 입력해주세요'),
        notFoundValidate,
        validate,
    ],
};