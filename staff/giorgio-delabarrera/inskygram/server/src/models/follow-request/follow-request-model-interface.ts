import { Document } from "mongoose";
import FollowRequestInterface from "./follow-request-interface";

/**
 *
 *
 * @interface FollowRequestInterface
 * @extends {FollowRequestInterface}
 * @extends {Document}
 */
interface FollowRequestModelInterface extends FollowRequestInterface, Document { }

export default FollowRequestModelInterface;
