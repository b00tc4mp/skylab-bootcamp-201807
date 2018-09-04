import { config } from "dotenv";
import { Router, Request, Response } from "express";
import bodyParser from "body-parser";
const multer = require("multer");
import passport from "passport";

config();

const router: Router = Router();

const jsonBodyParser = bodyParser.json();

const upload = multer();

const validateJwt = passport.authenticate("jwt", { session: false });

router.get("/me", [validateJwt], (req: Request, res: Response) => { });

router.put("/me", [validateJwt, jsonBodyParser], (req: Request, res: Response) => { });

router.patch("/me/actions/update-password", [validateJwt, jsonBodyParser], (req: Request, res: Response) => { });

router.patch("/me/actions/update-avatar", [validateJwt, upload.single("avatar")], (req: Request, res: Response) => { });

router.get("/me/followers", validateJwt, (req: Request, res: Response) => { });

router.get("/me/followings", validateJwt, (req: Request, res: Response) => { });

router.get("/me/posts", validateJwt, (req: Request, res: Response) => { });

router.get("/me/saved", validateJwt, (req: Request, res: Response) => { });

router.get("/me/wall", validateJwt, (req: Request, res: Response) => { });

export default router;
