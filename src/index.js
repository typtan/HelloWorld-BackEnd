import express from "express";
import connection from "./config/database.js";
import roomRoute from "./routes/roomRoute.js";
import cors from "cors";
import { logger } from "./middlewares/logger.js";
import { getRoomById, updateRoomStatus } from "./models/roomModel.js";

const app = express();
const port = 3000;

app.use(logger);
app.use(express.json());
app.use(cors());
app.use("/api/room", roomRoute);



connection.connect((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Database is connected");
    }
  });

app.listen(port,() => {
    console.log(`Server running on port ${port}`);
})
