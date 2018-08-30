import { Document } from "mongoose";
import UserInterface from "./user-interface";

/**
 *
 *
 * @interface UserModelInterface
 * @extends {UserInterface}
 * @extends {Document}
 */
interface UserModelInterface extends UserInterface, Document { }

export default UserModelInterface;
