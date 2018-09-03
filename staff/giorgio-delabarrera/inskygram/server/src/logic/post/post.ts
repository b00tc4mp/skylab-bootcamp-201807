import { config } from "dotenv";
import { Types } from "mongoose";
import Post, { PostModelInterface } from "../../models/post";
import User, { UserModelInterface } from "../../models/user";
import { UserTagModelInterface } from "../../models/user-tag";
import LogicError from "../error/logic-error";
import { resolve } from "path";
const cloudinary = require("cloudinary");

config();
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const postLogic = {

  create(username: string, filename: string, buffer: Buffer, caption?: string) {
    return Promise.resolve()
      .then(() => {
        if (!filename) { throw new LogicError("invalid filename"); }
        if (!buffer) { throw new LogicError("invalid buffer"); }

        return User.findOne({ username });
      })
      .then((user: UserModelInterface) => {
        if (!user) { throw new LogicError(`user with username ${username} does not exists`); }

        return new Promise((resolve, reject) => {
          cloudinary.v2.uploader.upload_stream((error: any, result: any) => {
            if (error) {
              return reject(new LogicError(`the file could not be uploaded ${filename}`));
            }

            const post = new Post();

            post.imageId = result.public_id;
            post.imageUrl = result.secure_url;
            post.user = user._id;
            if (caption) { post.caption = caption; }

            post.save();

            resolve(true);
          }).end(buffer);
        });
      });
  },

  // create(
  //   user: Types.ObjectId,
  //   caption?: string,
  // ): Promise<boolean> | never {
  //   return Promise.resolve()
  //     .then(() => {
  //       const post = new Post();
  //       post.user = user;
  //       if (caption) { post.caption = caption; }

  //       // TODO: cloudinary
  //       { post.image = "TODO/image"; }

  //       // post.save();
  //       return Post.create(post);
  //     })
  //     .then(() => true);
  // },

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
