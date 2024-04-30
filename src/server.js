import { connect } from "./database/connection.js";
import app from "./app.js";
import logger from "../config/logger.js";

const MONGODB_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT;

connect(MONGODB_URL).then(() => {
  logger.info("Connected to DB");
  app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
  });
});