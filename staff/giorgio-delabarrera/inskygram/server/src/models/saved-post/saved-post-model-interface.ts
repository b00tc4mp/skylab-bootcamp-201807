import { Document } from "mongoose";
import SavedPostInterface from "./saved-post-interface";

/**
 *
 *
 * @interface SavedPostInterface
 * @extends {SavedPostInterface}
 * @extends {Document}
 */
interface SavedPostModelInterface extends SavedPostInterface, Document { }

export default SavedPostModelInterface;
