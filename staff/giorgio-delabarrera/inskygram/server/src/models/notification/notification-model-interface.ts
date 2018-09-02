import { Document, Types } from "mongoose";
import NotificationInterface from "./notification-interface";

/**
 *
 *
 * @interface NotificationInterface
 * @extends {NotificationInterface}
 * @extends {Document}
 */
interface NotificationModelInterface extends NotificationInterface, Document {
  user: Types.ObjectId;
  post: Types.ObjectId;
}

export default NotificationModelInterface;
