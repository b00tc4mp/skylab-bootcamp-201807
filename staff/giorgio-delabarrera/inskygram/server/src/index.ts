import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { userRouter, postRouter } from "./routes";
import { connect } from "./db";

config();

const { DATABASE_URL, PORT } = process.env;

connect(DATABASE_URL)
  .then(db => {

    const app = express();

    app.use(cors());

    app.use("/api", userRouter);

    app.use("/api", postRouter);

    app.listen(PORT, () => console.log(`inskygram up and running on port ${PORT}`));
  });
