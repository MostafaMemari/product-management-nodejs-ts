import { Application } from "./server";

import * as dotenv from "dotenv";
dotenv.config();

new Application(4500, process.env.DB_URL);
