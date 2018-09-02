import { Document, Types } from "mongoose";
import FollowingInterface from "./following-interface";

/**
 *
 *
 * @interface FollowingInterface
 * @extends {FollowingInterface}
 * @extends {Document}
 */
interface FollowingModelInterface extends FollowingInterface, Document {
  user: Types.ObjectId;
}

export default FollowingModelInterface;
