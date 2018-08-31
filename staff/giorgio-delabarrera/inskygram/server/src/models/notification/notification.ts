import { model, Model } from "mongoose";
import NotificationModelInterface from "./notification-model-interface";
import notificationSchema from "./notification-schema";

const Notification: Model<NotificationModelInterface> = model("Notification", notificationSchema);

export default Notification;
