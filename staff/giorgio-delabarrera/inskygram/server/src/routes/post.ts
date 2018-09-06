import { config } from "dotenv";
import { Router, Response, Request } from "express";
const multer = require("multer");
import bodyParser from "body-parser";
import passport from "passport";
import logic from "../logic";
import { LogicError } from "../logic/errors";

config();

const router: Router = Router();

const upload = multer();

const jsonBodyParser = bodyParser.json();

const validateJwt = passport.authenticate("jwt", { session: false });

router.post("/posts", [validateJwt, upload.single("image")], (req: Request | any, res: Response) => {
  const { params: { username }, body: { caption }, file } = req;

  if (file) {
    logic.createPost(username, file.originalname, file.buffer, caption)
      .then(() => res.status(201).json({ message: "post saved" }))
      .catch((err: any) => {
        const { message } = err;

        res.status(err instanceof LogicError ? 400 : 500).json({ message });
      });
  } else {
    res.status(418).json({ message: "no image received" });
  }
});

router.get("/posts/:id", (req: Request, res: Response) => { });

router.post("/posts/:id/actions/add-comment", [validateJwt, jsonBodyParser], (req: Request, res: Response) => { });

router.post("/posts/:id/actions/like", validateJwt, (req: Request, res: Response) => { });

router.post("/posts/:id/actions/save", validateJwt, (req: Request, res: Response) => { });

// router.get("/users/:username/posts/:id", validateJwt, (req: Request, res: Response) => {
//   const { params: { username, id } } = req;

//   logic.post.retrieve(username, id)
//     .then((post: PostModelInterface) => res.json(post))
//     .catch((err: Error) => {
//       const { message } = err;

//       return res.status(err instanceof LogicError ? 400 : 500).json({ message });
//     });
// });

export default router;
