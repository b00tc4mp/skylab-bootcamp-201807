import { UserInterface } from "../user";

/**
 *
 *
 * @interface FollowRequestInterface
 */
interface FollowRequestInterface {
  user: UserInterface;
  createdAt: Date;
}

export default FollowRequestInterface;
