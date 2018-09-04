import { config } from "dotenv";
import { Router, Response, Request } from "express";

config();

const router: Router = Router();

router.get("/explore", (req: Request, res: Response) => { });

router.get("/search", (req: Request, res: Response) => { });

export default router;
