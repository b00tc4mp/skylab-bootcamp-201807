import { model, Model } from "mongoose";
import SavedPostModelInterface from "./saved-post-model-interface";
import savedPostSchema from "./saved-post-schema";

const SavedPost: Model<SavedPostModelInterface> = model("SavedPost", savedPostSchema);

export default SavedPost;
