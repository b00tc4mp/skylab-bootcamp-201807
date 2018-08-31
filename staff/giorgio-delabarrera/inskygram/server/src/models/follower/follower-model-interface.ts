import { Document } from "mongoose";
import FollowerInterface from "./follower-interface";

/**
 *
 *
 * @interface FollowerInterface
 * @extends {FollowerInterface}
 * @extends {Document}
 */
interface FollowerModelInterface extends FollowerInterface, Document { }

export default FollowerModelInterface;
