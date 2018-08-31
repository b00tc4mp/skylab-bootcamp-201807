import { CommentInterface } from "../comment";
import { LikeInterface } from "../like";
import { UserInterface } from "../user";
import { UserTagInterface } from "../user-tag";

/**
 *
 *
 * @interface PostInterface
 */
interface PostInterface {
  image: string;
  caption: string;
  location: string;
  user: UserInterface;
  createdAt: Date;
  updatedAt: Date;
  likes: LikeInterface[];
  comments: CommentInterface[];
  userTags: UserTagInterface[];
}

export default PostInterface;
