import bodyParser from "body-parser";
import { config } from "dotenv";
import { Router } from "express";
import { userLogic } from "../logic";
// const jwt = require("jsonwebtoken");
// const validateJwt = require("./helpers/validate-jwt");

config();

const router: Router = Router();

const jsonBodyParser = bodyParser.json();

router.post("/register", jsonBodyParser, (req, res) => {
  const { body: { username, email, password } } = req;

  userLogic.register(username, email, password)
    .then(() => res.status(201).json({ message: "user registered" }))
    .catch(err => {
      res.status(500).json({ message: "hola" });
      // const { message } = err;
      // res.status(err instanceof LogicError ? 400 : 500).json({ message });
    });
});

export default router;
