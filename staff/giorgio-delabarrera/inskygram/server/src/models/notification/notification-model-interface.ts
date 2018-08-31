import { Document } from "mongoose";
import NotificationInterface from "./notification-interface";

/**
 *
 *
 * @interface NotificationInterface
 * @extends {NotificationInterface}
 * @extends {Document}
 */
interface NotificationModelInterface extends NotificationInterface, Document { }

export default NotificationModelInterface;
