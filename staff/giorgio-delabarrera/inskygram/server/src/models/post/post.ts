import { model, Model } from "mongoose";
import PostModelInterface from "./post-model-interface";
import postSchema from "./post-schema";

const Post: Model<PostModelInterface> = model("Post", postSchema);

export default Post;
