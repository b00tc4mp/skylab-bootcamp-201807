import { Document, Types } from "mongoose";
import FollowRequestInterface from "./follow-request-interface";

/**
 *
 *
 * @interface FollowRequestInterface
 * @extends {FollowRequestInterface}
 * @extends {Document}
 */
interface FollowRequestModelInterface extends FollowRequestInterface, Document {
  user: Types.ObjectId;
}

export default FollowRequestModelInterface;
