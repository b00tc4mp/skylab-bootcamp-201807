import { config } from "dotenv";
import { Router, Request, Response } from "express";
import passport from "passport";

config();

const router: Router = Router();

const validateJwt = passport.authenticate("jwt", { session: false });

router.get("/users/:username", (req: Request, res: Response) => { });

router.post("/users/:username/actions/follow", [validateJwt], (req: Request, res: Response) => { });

router.get("/users/:username/followers", (req: Request, res: Response) => { });

router.get("/users/:username/followings", (req: Request, res: Response) => { });

router.get("/users/:username/posts", (req: Request, res: Response) => { });

router.get("/users/:username/saved", (req: Request, res: Response) => { });

// router.get("/users/:username", validateJwt, (req: Request, res: Response) => {
//   const { params: { username } } = req;

//   logic.user.retrieve(username)
//     .then((user: UserModelInterface) => res.json(user))
//     .catch((err: Error) => {
//       const { message } = err;
//       return res.status(err instanceof LogicError ? 400 : 500).json({ message });
//     });
// });

// router.put("/users/:username", [validateJwt, jsonBodyParser], (req: Request, res: Response) => {
//   const { params: { username } } = req;
//   const { body: { email, name, website, phoneNumber, gender, biography, privateAccount } } = req;

//   logic.user.update(username, email, name, website, phoneNumber, gender, biography, privateAccount)
//     .then(() => res.json({ message: "user updated" }))
//     .catch(err => {
//       const { message } = err;

//       res.status(err instanceof LogicError ? 400 : 500).json({ message });
//     });
// });

// router.patch("/users/:username/update-password", [validateJwt, jsonBodyParser], (req: Request, res: Response) => {
//   const { params: { username }, body: { password, newPassword } } = req;

//   logic.user.updatePassword(username, password, newPassword)
//     .then(() => res.json({ message: "user password updated" }))
//     .catch(err => {
//       const { message } = err;

//       res.status(err instanceof LogicError ? 400 : 500).json({ message });
//     });
// });

// router.patch(
//   "/users/:username/update-avatar",
//   [validateJwt, upload.single("avatar")],
//   (req: Request | any, res: Response) => {
//     const { params: { username }, file } = req;

//     if (file) {
//       logic.user.updateAvatar(username, file.originalname, file.buffer)
//         .then(() => res.json({ message: "user avatar updated" }))
//         .catch((err: any) => {
//           const { message } = err;

//           res.status(err instanceof LogicError ? 400 : 500).json({ message });
//         });
//     } else {
//       res.status(400).json({ message: "no image received" });
//     }
//   });

// router.patch("/users/:username/disable", [validateJwt, jsonBodyParser], (req: Request, res: Response) => {
//   const { params: { username } } = req;

//   logic.user.disable(username)
//     .then(() => res.json({ message: "user disabled" }))
//     .catch(err => {
//       const { message } = err;

//       res.status(err instanceof LogicError ? 400 : 500).json({ message });
//     });
// });

export default router;
