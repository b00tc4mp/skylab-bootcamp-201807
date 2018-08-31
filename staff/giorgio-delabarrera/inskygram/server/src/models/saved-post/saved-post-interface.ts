import { PostInterface } from "../post";

/**
 *
 *
 * @interface SavedPostInterface
 */
interface SavedPostInterface {
  post: PostInterface;
  createdAt: Date;
}

export default SavedPostInterface;
