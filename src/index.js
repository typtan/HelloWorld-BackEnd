import express from "express";
import connection from "./config/database.js";
import roomRoute from "./routes/roomRoute.js";
import bookingRoute from "./routes/bookingRoute.js";
import currentRoute from "./routes/currentRoute.js"
import cors from "cors";
import { logger } from "./middlewares/logger.js";


const app = express();
const port = 3000;

app.use(logger);
app.use(express.json());
app.use(cors());
app.use("/api/room", roomRoute);
app.use("/api/booking", bookingRoute);
app.use("/api/current", currentRoute);




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
