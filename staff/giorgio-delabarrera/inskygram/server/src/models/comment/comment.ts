import { model, Model } from "mongoose";
import CommentModelInterface from "./comment-model-interface";
import commentSchema from "./comment-schema";

const Comment: Model<CommentModelInterface> = model("Comment", commentSchema);

export default Comment;
