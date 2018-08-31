import { UserInterface } from "../user";

/**
 *
 *
 * @interface FollowerInterface
 */
interface FollowerInterface {
  user: UserInterface;
  createdAt: Date;
}

export default FollowerInterface;
