import { Document } from "mongoose";
import UserTagInterface from "./user-tag-interface";

/**
 *
 *
 * @interface UserTagInterface
 * @extends {UserTagInterface}
 * @extends {Document}
 */
interface UserTagModelInterface extends UserTagInterface, Document { }

export default UserTagModelInterface;
