import { model, Model } from "mongoose";
import FollowerModelInterface from "./follower-model-interface";
import followerSchema from "./follower-schema";

const Follower: Model<FollowerModelInterface> = model("Follower", followerSchema);

export default Follower;
