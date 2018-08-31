import { Document } from "mongoose";
import CommentInterface from "./comment-interface";

/**
 *
 *
 * @interface CommentInterface
 * @extends {CommentInterface}
 * @extends {Document}
 */
interface CommentModelInterface extends CommentInterface, Document { }

export default CommentModelInterface;
