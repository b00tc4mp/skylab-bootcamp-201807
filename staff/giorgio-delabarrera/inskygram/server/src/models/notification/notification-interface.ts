import { PostInterface } from "../post";
import { UserInterface } from "../user";

/**
 *
 *
 * @interface NotificationInterface
 */
interface NotificationInterface {
  user: UserInterface;
  post: PostInterface;
  type: string;
  viewd: boolean;
  createdAt: Date;
}

export default NotificationInterface;
