import express from "express";
import connection from "./config/database.js";
import cors from "cors";

const express = require('express');
const app = express();
const port = 3000;

app.use(cors());

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
