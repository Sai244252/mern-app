import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import itemRoutes from "./routes/itemRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//configuration

dotenv.config();
connectDb();

//middleware
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

const PORT = process.env.PORT || 8000;

//Routes
app.use("/api/v1/users/", userRoutes);

app.use("/api/v1/items/", itemRoutes);

app.listen(PORT, () => {
  console.log("Server is running at port", PORT);
});
