import { Document, Types } from "mongoose";
import SavedPostInterface from "./saved-post-interface";

/**
 *
 *
 * @interface SavedPostInterface
 * @extends {SavedPostInterface}
 * @extends {Document}
 */
interface SavedPostModelInterface extends SavedPostInterface, Document {
  post: Types.ObjectId;
}

export default SavedPostModelInterface;
