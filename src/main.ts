import { Application } from "./server";

new Application(4500, process.env.DB_URL);
