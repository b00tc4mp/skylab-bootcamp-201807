import { Document } from "mongoose";
import PostInterface from "./post-interface";

/**
 * Post Model
 *
 * @interface PostInterface
 * @extends {PostInterface}
 * @extends {Document}
 */
interface PostModelInterface extends PostInterface, Document { }

export default PostModelInterface;
