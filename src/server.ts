import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { connectMongoDB } from "./config/mongoose.config";
import { AllRouter } from "./app.routes";
import panelRouter from "./modules/template engine/panel/panel.routes";
import authRouter from "./modules/template engine/auth/auth.routes";
import { ApiErrorHandler, NotFoundErrorHandler } from "./common/exception/error.handler";
import * as http from "http";
import { SwaggerConfig } from "./config/swagger.config";
import expressEjsLayouts from "express-ejs-layouts";
import flash from "express-flash";
import session from "express-session";
import cookieParser from "cookie-parser";
import { Authorization } from "./common/guard/authorization.guard";
// import { setDefaultData } from "./common/exception/setDefaultDataReq";

export class Application {
  private app = express();
  private server?: http.Server;

  constructor(private PORT: number, private DB_URL: string | undefined) {
    this.DB_URL = DB_URL;
    this.PORT = PORT;

    this.configApplication();
    this.createServer();
    connectMongoDB(this.DB_URL);
    this.createRoute();
    SwaggerConfig(this.app);
    this.errorHandler();
  }
  configApplication(): void {
    this.app.use(
      session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false,
      })
    );
    // this.app.use(setDefaultData);

    this.app.use(flash());
    this.app.use(cors({ origin: "*" }));
    // this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(express.static(path.join(__dirname, "..", "public")));

    this.app.use(expressEjsLayouts);
    this.app.set("view engine", "ejs");
    this.app.set("layout", "layouts/panel/main.ejs");
  }

  createServer(): void {
    this.server = http.createServer(this.app);
    this.server.listen(this.PORT, () => {
      console.log(`Server listen on Port : \n http://localhost:${this.PORT}/api-docs \n http://localhost:${this.PORT}/panel/products`);
    });
  }
  createRoute(): void {
    this.app.use("/auth", authRouter);
    this.app.use("/panel", Authorization, panelRouter);
    this.app.use("/api/v1", AllRouter);
  }
  errorHandler(): void {
    this.app.use(NotFoundErrorHandler);
    this.app.use(ApiErrorHandler);
  }
}
