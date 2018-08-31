import { UserInterface } from "../user";

/**
 *
 *
 * @interface CommentInterface
 */
interface CommentInterface {
  user: UserInterface;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export default CommentInterface;
