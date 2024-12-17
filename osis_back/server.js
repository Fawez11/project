import { createServer } from "http";
import app from "./app.js";
import database from "./config/database.js";
import "./syncTables.js";
console.log("server.js");
const PORT = process.env.PORT || 5000;

const server = createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
