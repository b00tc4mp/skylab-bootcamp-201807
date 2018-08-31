import { Document } from "mongoose";
import FollowingInterface from "./following-interface";

/**
 *
 *
 * @interface FollowingInterface
 * @extends {FollowingInterface}
 * @extends {Document}
 */
interface FollowingModelInterface extends FollowingInterface, Document { }

export default FollowingModelInterface;
