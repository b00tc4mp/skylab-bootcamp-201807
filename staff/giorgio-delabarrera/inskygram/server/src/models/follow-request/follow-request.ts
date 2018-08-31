import { model, Model } from "mongoose";
import FollowRequestModelInterface from "./follow-request-model-interface";
import followRequestSchema from "./follow-request-schema";

const FollowRequest: Model<FollowRequestModelInterface> = model("FollowRequest", followRequestSchema);

export default FollowRequest;
