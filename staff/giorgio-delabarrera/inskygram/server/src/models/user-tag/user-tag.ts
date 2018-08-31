import { model, Model } from "mongoose";
import UserTagModelInterface from "./user-tag-model-interface";
import userTagSchema from "./user-tag-schema";

const UserTag: Model<UserTagModelInterface> = model("UserTag", userTagSchema);

export default UserTag;
