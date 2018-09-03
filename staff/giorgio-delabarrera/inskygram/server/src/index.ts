import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { connect } from "mongoose";
import { userRouter, postRouter } from "./routes";

config();

const { DATABASE_URL, PORT } = process.env;

connect(DATABASE_URL, { useNewUrlParser: true })
  .then(() => {

    const app = express();

    app.use(cors());

    app.use("/api", userRouter);

    app.use("/api", postRouter);

    app.listen(PORT, () => console.log(`inskygram up and running on port ${PORT}`));
  });
