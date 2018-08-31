import { model, Model } from "mongoose";
import LikeModelInterface from "./like-model-interface";
import likeSchema from "./like-schema";

const Like: Model<LikeModelInterface> = model("Like", likeSchema);

export default Like;
