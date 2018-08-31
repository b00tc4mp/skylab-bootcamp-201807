import { model, Model } from "mongoose";
import UserModelInterface from "./user-model-interface";
import userSchema from "./user-schema";

const User: Model<UserModelInterface> = model("User", userSchema);

export default User;
