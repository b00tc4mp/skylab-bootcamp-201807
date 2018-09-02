import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

config();

const { JWT_SECRET } = process.env;

function validateJwt(req: Request, res: Response, next: NextFunction) {
    const { params: { username } } = req;

    try {
        const authorization = req.get("authorization");

        if (!authorization || !authorization.length) { throw new Error("invalid token"); }

        const parts = authorization.split(" ");

        if (parts.length !== 2) { throw new Error("invalid token"); }

        if (parts[0].toLowerCase() !== "bearer") { throw new Error("invalid token"); }

        const token = parts[1];

        const payload: any = jwt.verify(token, JWT_SECRET);

        if (payload.sub !== username) { throw new Error("invalid token"); }

        next();
    } catch ({ message }) {
        res.status(500).json({ message });
    }
}

export default validateJwt;
