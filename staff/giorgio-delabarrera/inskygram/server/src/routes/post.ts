import { config } from "dotenv";
import { Router, Response, Request } from "express";
import logic from "../logic";
import LogicError from "../logic/error/logic-error";
import validateJwt from "./helpers/validate-jwt";
import { PostModelInterface } from "../models/post";
const multer = require("multer");

config();

const router: Router = Router();

const upload = multer();

router.post(
  "/users/:username/posts/create",
  [validateJwt, upload.single("image")],
  (req: Request | any, res: Response) => {
    const { params: { username }, body: { caption }, file } = req;

    if (file) {
      logic.post.create(username, file.originalname, file.buffer, caption)
        .then(() => res.status(201).json({ message: "post saved" }))
        .catch((err: any) => {
          const { message } = err;

          res.status(err instanceof LogicError ? 400 : 500).json({ message });
        });
    } else {
      res.status(418).json({ message: "no image received" });
    }
  });

router.get("/users/:username/posts/:id", validateJwt, (req: Request, res: Response) => {
  const { params: { username, id } } = req;

  logic.post.retrieve(username, id)
    .then((post: PostModelInterface) => res.json(post))
    .catch((err: Error) => {
      const { message } = err;

      return res.status(err instanceof LogicError ? 400 : 500).json({ message });
    });
});

export default router;
