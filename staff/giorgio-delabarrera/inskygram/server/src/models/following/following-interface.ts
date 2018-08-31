import { UserInterface } from "../user";

/**
 *
 *
 * @interface FollowingInterface
 */
interface FollowingInterface {
  user: UserInterface;
  createdAt: Date;
}

export default FollowingInterface;
