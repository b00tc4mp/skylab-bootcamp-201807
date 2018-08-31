import { Document } from "mongoose";
import LikeInterface from "./like-interface";

/**
 *
 *
 * @interface LikeInterface
 * @extends {LikeInterface}
 * @extends {Document}
 */
interface LikeModelInterface extends LikeInterface, Document { }

export default LikeModelInterface;
