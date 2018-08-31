import { UserInterface } from "../user";

/**
 *
 *
 * @interface LikeInterface
 */
interface LikeInterface {
  user: UserInterface;
  createdAt: Date;
}

export default LikeInterface;
