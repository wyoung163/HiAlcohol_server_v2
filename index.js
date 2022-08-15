import "dotenv/config";
import { app } from "./src/app.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const PORT = process.env.SERVER_PORT || 5000;

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "HiAlcohol API 문서",
    version: "1.0.0",
    description: "HiAlcohol API 문서",
  },
  servers: [
    {
      url: `https://${process.env.PUBLIC_IP}:5000`,
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./src/routes/*.js"],
};
const swaggerSpec = swaggerJSDoc(options);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// app.listen(PORT, () => {
//   console.log(`정상적으로 서버를 시작하였습니다. https://localhost:${PORT}`);
// });


// https 설정하기
import fs from 'fs';
// import http from 'http';
import https from 'https';

// Certificate 인증서 경로
const privateKey = fs.readFileSync('/etc/letsencrypt/live/hialcohol.p-e.kr/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/hialcohol.p-e.kr/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/hialcohol.p-e.kr/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

// Starting both http & https servers
// const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

// 포트 번호 그대로 사용
// httpServer.listen(80, () => {
// 	console.log('HTTP Server running on port 80');
// });

httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
});