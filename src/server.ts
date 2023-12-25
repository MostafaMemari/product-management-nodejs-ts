import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { connectMongoDB } from "./config/mongoose.config";
import { AllRouter } from "./app.routes";
import { ApiErrorHandler, NotFoundErrorHandler } from "./common/exception/error.handler";
import * as http from "http";

export class Application {
  private app = express();
  private server?: http.Server;
  constructor(private PORT: number, private DB_URL: string | undefined) {
    this.DB_URL = DB_URL;
    this.PORT = PORT;

    this.configApplication();
    this.connectToMongoDB();
    this.createServer();
    this.createRoute();
    this.errorHandler();
  }
  configApplication(): void {
    this.app.use(cors({ origin: "*" }));
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(path.join(__dirname, "..", "public")));
  }
  connectToMongoDB(): void {
    connectMongoDB(this.DB_URL);
  }
  createServer(): void {
    this.server = http.createServer(this.app);
    this.server.listen(this.PORT, () => {
      console.log(`Server listen on Port : http://localhost:${this.PORT}`);
    });
  }
  createRoute(): void {
    this.app.use(AllRouter);
  }
  errorHandler(): void {
    this.app.use(NotFoundErrorHandler);
    this.app.use(ApiErrorHandler);
  }
}
