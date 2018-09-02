import { config } from "dotenv";
import { Types } from "mongoose";
import { Post } from "../../models";
import { PostModelInterface } from "../../models/post";
import User, { UserModelInterface } from "../../models/user";
import { UserTagModelInterface } from "../../models/user-tag";
import LogicError from "../error/logic-error";
const cloudinary = require("cloudinary");

config();
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const postLogic = {
  create(
    user: Types.ObjectId,
    caption?: string,
  ): Promise<boolean> | never {
    return Promise.resolve()
      .then(() => {
        const post = new Post();
        post.user = user;
        if (caption) { post.caption = caption; }

        // TODO: cloudinary
        { post.image = "TODO/image"; }

        // post.save();
        return Post.create(post);
      })
      .then(() => true);
  },

  retrieve(userId: Types.ObjectId, id: Types.ObjectId): Promise<PostModelInterface> | never {
    return Promise.resolve()
      .then(() => {
        if (!userId) { throw new LogicError("invalid user"); }

        return User.findById(userId);
      })
      .then((user: UserModelInterface) => {
        return Post.findOne({ _id: id, user: user._id }, { __v: 0 });
      })
      .then((post: PostModelInterface) => post);
  },

  // update(user: Types.ObjectId, id: Types.ObjectId, caption?: string, location?: string) { },

  // remove(user: Types.ObjectId, id: Types.ObjectId) { },

  // addUserTag(userTag: UserTagModelInterface) { },

  // removeUserTag(userTag: UserTagModelInterface) { },

};

export default postLogic;
