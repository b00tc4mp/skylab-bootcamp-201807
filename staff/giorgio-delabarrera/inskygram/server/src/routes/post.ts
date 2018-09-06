import { config } from "dotenv";
import { Router, Response, Request } from "express";
const multer = require("multer");
import bodyParser from "body-parser";
import passport from "passport";
import logic from "../logic";
import { LogicError } from "../logic/errors";
import statusError from "./helpers/status-error";
import { PostModelInterface } from "../models/post";

config();

const router: Router = Router();

const upload = multer();

const jsonBodyParser = bodyParser.json();

const validateJwt = passport.authenticate("jwt", { session: false });

router.post("/posts", [validateJwt, upload.single("image")], (req: Request | any, res: Response) => {
  const username = req.user;
  const { file } = req;
  const caption = req.body.caption;

  if (file) {
    logic.createPost(username, file.originalname, file.buffer, caption)
      .then(() => res.status(201).json({ message: "post saved" }))
      .catch((err: Error) => {
        const { message } = err;
        const status = statusError(err);

        res.status(status).json({ message });
      });
  } else {
    res.status(400).json({ message: "no image received" });
  }
});

// TODO: falla cuando usuario logueado quiere ver un post suyo
router.get("/posts/:id", (req: Request, res: Response) => {
  const username = req.user;
  const postId = req.params.id;

  logic.retrievePost(postId, username)
    .then((post: PostModelInterface) => res.json(post))
    .catch((err: Error) => {
      const { message } = err;
      const status = statusError(err);

      res.status(status).json({ message });
    });
});

router.post("/posts/:id/actions/add-comment", [validateJwt, jsonBodyParser], (req: Request, res: Response) => {
  const username = req.user;
  const postId = req.params.id;
  const { body: { description } } = req;

  logic.addCommentToPost(username, postId, description)
    .then(() => res.json({ message: `comment added to post ${postId}` }))
    .catch((err: Error) => {
      const { message } = err;
      const status = statusError(err);

      res.status(status).json({ message });
    });
});

router.post("/posts/:id/actions/like", validateJwt, (req: Request, res: Response) => {
  const username = req.user;
  const postId = req.params.id;

  logic.toggleLikePost(username, postId)
    .then(() => res.json({ message: `toggle like to post ${postId}` }))
    .catch((err: Error) => {
      const { message } = err;
      const status = statusError(err);

      res.status(status).json({ message });
    });
});

router.post("/posts/:id/actions/save", validateJwt, (req: Request, res: Response) => {
  const username = req.user;
  const postId = req.params.id;

  logic.toggleSavePost(username, postId)
    .then(() => res.json({ message: `toggle save to post ${postId}` }))
    .catch((err: Error) => {
      const { message } = err;
      const status = statusError(err);

      res.status(status).json({ message });
    });
});

export default router;
