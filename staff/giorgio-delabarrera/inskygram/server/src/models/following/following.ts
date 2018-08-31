import { model, Model } from "mongoose";
import FollowingModelInterface from "./following-model-interface";
import followingSchema from "./following-schema";

const Following: Model<FollowingModelInterface> = model("Following", followingSchema);

export default Following;
