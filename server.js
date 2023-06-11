process.on("uncaughtException", (err) => {
  console.log("error", err);
});
import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
dotenv.config();
import { dbConnection } from "./database/dbConfig/dataBaseConnection.js";
import { init } from "./src/modules/index.routes.js";
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("uploads"));
const port = 4000 || 4001;
init(app)
dbConnection();
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
// Handle rejection outside express
process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});
