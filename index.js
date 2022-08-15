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