import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import adminRoute from "../routes/admin.route.js";
import authRoute from "../routes/auth.route.js";
import kitcheRoute from "../routes/kitchen.route.js";
import menuRoute from "../routes/menu.route.js";
import orderRoute from "../routes/order.route.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../config/swagger.config.js";

const app = express();
//security middleware
app.use(helmet());

//CORS
app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true }));

//logger
app.use(morgan("dev"));

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "Cloud kitchen backend is up and running",
    docs: "/api-docs",
  });
});

//api documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: ".swagger-ui .topbar {display:none} ",
    customSiteTitle: "Cloud Kitchen API Docs",
  }),
);

//route middleware
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/kitchen", kitcheRoute);
app.use("/api/v1/menu", menuRoute);
app.use("/api/v1/order", orderRoute);

//404 handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

//global error handler
app.use((err, req, res, next) => {
  console.log(err.stack);

  res.status(err.statusCode || 500).json({
    message: err.message || "Internal server error",
  });
});

export default app;
