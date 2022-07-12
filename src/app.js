import cors from "cors";
import express from "express";
import bodyParser from "body-parser";

import { errorMiddleware } from "./middlewares/errorMiddleware.js";
// import { homeRouter } from "./routes/homeRouter.js";
import { userRouter } from "./routes/userRouter.js";
import { searchRouter } from "./routes/searchRouter.js";
import { suggestionRouter } from "./routes/suggestionRouter.js";
import { recipeRouter } from "./routes/recipeRouter.js";
import { reportRouter } from "./routes/reportRouter.js";
import { likeRouter } from "./routes/likeRouter.js";

const app = express();

// CORS 에러 방지
app.use(cors());

// express 기본 제공 middleware
// express.json(): POST 등의 요청과 함께 오는 json형태의 데이터를 인식하고 핸들링할 수 있게 함.
// express.urlencoded: 주로 Form submit 에 의해 만들어지는 URL-Encoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));

// 기본 페이지
// app.use(homeRouter);

// userRouter 아래에 라우터 넣어주세요!
app.use(userRouter);
app.use('/cocktails', searchRouter);
app.use(suggestionRouter);
app.use(recipeRouter);
app.use(reportRouter);
app.use(likeRouter);

app.use(errorMiddleware);

// .env가 있는지 확인
["SERVER_PORT"].forEach((k) => {
  if (!(k in process.env)) {
    throw new Error(`.env 파일이 빠진 것 같아요! 체크체크!`);
  }
});

export { app };