import validator from "validator";
import User, { UserModelInterface } from "../models/user";
import { LogicError, AccessDeniedError, NotFoundError, UniqueConstraintError } from "./errors";
import cloudinary from "../config/cloudinary";

const logic = {

  isPrivateUser(username: string) { },

  isFollowingUser(username: string, targetUsername: string) { },

  hasPermissionOverUser(username: string, targetUsername: string) { },

  register(username: string, email: string, password: string): Promise<boolean> | never {

    return Promise.resolve()
      .then(() => {
        if (!username) { throw new LogicError("invalid username"); }
        if (!email) { throw new LogicError("invalid email"); }
        if (!validator.isEmail(email)) { throw new LogicError("invalid email"); }
        if (!password) { throw new LogicError("invalid password"); }

        return User.findOne({ username });
      })
      .then((user: UserModelInterface) => {
        if (user) { throw new UniqueConstraintError(`user with username ${username} already exists`); }

        return User.findOne({ email });
      })
      .then((user: UserModelInterface) => {
        if (user) { throw new UniqueConstraintError(`user with email ${email} already exists`); }

        return User.findOne({ email });
      })
      .then(() => User.create({ username, email, password }))
      .then(() => true);
  },

  authenticate(username: string, password: string): Promise<boolean> | never {
    return Promise.resolve()
      .then(() => {

        if (!username) { throw new LogicError("invalid username"); }
        if (!password) { throw new LogicError("invalid password"); }

        return User.findOne({ username });
      })
      .then((user: UserModelInterface) => {
        if (!user) { throw new NotFoundError(`user with username ${username} does not exists`); }

        if (user.password !== password) { throw new LogicError(`wrong password`); }

        user.lastLogin = new Date();

        return user.save();
      })
      .then((user: UserModelInterface) => true);
  },

  retrieveUser(username?: string, targetUsername?: string): Promise<UserModelInterface> | never {
    return Promise.resolve()
      .then(() => {
        if (!username) { throw new LogicError("invalid username"); }

        return User.findOne({ username }, { password: 0, __v: 0 });
      })
      .then((user: UserModelInterface) => user);
  },

  updateUser(
    username: string,
    newEmail?: string,
    name?: string,
    website?: string,
    phoneNumber?: string,
    gender?: string,
    biography?: string,
    privateAccount?: boolean,
  ): Promise<boolean> | never {
    return Promise.resolve()
      .then(() => {
        if (!username) { throw new LogicError("invalid username"); }

        return User.findOne({ username });
      })
      .then((user: UserModelInterface) => {
        if (!user) { throw new NotFoundError(`user with username ${username} does not exists`); }

        if (newEmail) {
          return new Promise((resolve, reject) => {
            User.findOne({ email: newEmail })
              .then((foundUser: UserModelInterface) => {
                if (foundUser) {
                  return reject(new UniqueConstraintError(`user with email ${newEmail} already exists`));
                }

                user.email = newEmail;

                resolve(user);
              });
          });
        }
        return user;
      })
      .then((user: UserModelInterface) => {
        if (name) { user.name = name; }
        if (website) { user.website = website; }
        if (phoneNumber) { user.phoneNumber = phoneNumber; }
        if (gender) { user.gender = gender; }
        if (biography) { user.biography = biography; }
        if (privateAccount !== undefined) { user.privateAccount = privateAccount; }

        return user.save();
      })
      .then(() => true);
  },

  updateUserPassword(username: string, password: string, newPassword: string): Promise<boolean> | never {
    return Promise.resolve()
      .then(() => {
        if (!username) { throw new LogicError("invalid username"); }
        if (!password) { throw new LogicError("invalid password"); }
        if (!newPassword) { throw new LogicError("invalid new password"); }

        return User.findOne({ username });
      })
      .then((user: UserModelInterface) => {
        if (!user) { throw new NotFoundError(`user with email ${username} does not exists`); }

        if (user.password !== password) { throw new LogicError(`wrong password`); }

        if (password === newPassword) { throw new LogicError("new password must be different to old password"); }

        user.password = newPassword;

        return user.save();
      })
      .then(() => true);
  },

  updateUserAvatar(username: string, filename: string, buffer: Buffer): Promise<boolean> | never {
    return Promise.resolve()
      .then(() => {
        if (!username) { throw new LogicError("invalid username"); }
        if (!filename) { throw new LogicError("invalid filename"); }
        if (!buffer) { throw new LogicError("invalid buffer"); }

        return User.findOne({ username });
      })
      .then((user: UserModelInterface) => {
        if (!user) { throw new NotFoundError(`user with username ${username} does not exists`); }

        return new Promise((resolve, reject) => {
          cloudinary.v2.uploader.upload_stream((error: any, result: any) => {
            if (error) {
              return reject(new LogicError(`the file ${filename} could not be uploaded`));
            }

            user.imageId = result.public_id;

            resolve(user.save());

          }).end(buffer);
        });
      })
      .then((user: UserModelInterface) => true);
  },

  toggleFollowUser(username: string, targetUsername: string) { return true; },

  listUserFollowers(username?: string, targetUsername?: string) { },

  listUserFollowings(username?: string, targetUsername?: string) { },

  createPost(username: string, filename: string, buffer: Buffer, caption?: string): Promise<string> | never {
    return Promise.resolve()
      .then(() => {
        if (!filename) { throw new LogicError("invalid filename"); }
        if (!buffer) { throw new LogicError("invalid buffer"); }

        return User.findOne({ username });
      })
      .then((user: UserModelInterface) => {
        if (!user) { throw new NotFoundError(`user with username ${username} does not exists`); }

        return new Promise((resolve, reject) => {
          cloudinary.v2.uploader.upload_stream((error: any, result: any) => {
            if (error) {
              return reject(new LogicError(`the file ${filename} could not be uploaded`));
            }

            const post = new Post();

            post.imageId = result.public_id;
            post.user = user._id;
            if (caption) { post.caption = caption; }

            resolve(post.save());

          }).end(buffer);
        });
      })
      .then((post: PostModelInterface) => post.id);
  },

  retrievePost(username?: string, postId: string): Promise<PostModelInterface> | never {
    let post: PostModelInterface;
    return Promise.resolve()
      .then(() => {
        if (!postId) { throw new LogicError("invalid post id"); }

        return Post.findOne({ _id: postId }, { __v: 0 });
      })
      .then((foundPost: PostModelInterface) => {
        if (!foundPost) { throw new NotFoundError(`post with id ${postId} does not exists`); }

        post = foundPost;

        return User.findById(post.user);
      })
      .then((user: UserModelInterface) => {
        if (!user) { throw new NotFoundError(`user with id ${post.user} does not exists`); }

        // if (user.privateAccount)

        return Post.findOne({ _id: postId, user: user._id }, { __v: 0 });
      });

    // .then((user: UserModelInterface) => {
    //   if (!user) { throw new LogicError(`user with username ${username} does not exists`); }

    //   return Post.findOne({ _id: id, user: user._id }, { __v: 0 });
    // })
    // .then((post: PostModelInterface) => {
    //   if (!post) { throw new LogicError(`post with id ${id} does not exists`); }

    //   return post;
    // });
  },

  listUserPosts(username?: string, targetUsername?: string) { },

  listUserSavedPosts(username?: string, targetUsername?: string) { },

  listUserWall(username: string, limit: number = 10, offset: number = 1) { },

  addCommentToPost(username: string, postId: string, description: string): Promise<boolean> | never {
    let post: PostModelInterface;

    return Promise.resolve()
      .then(() => {
        if (!username) { throw new LogicError("invalid username"); }
        if (!postId) { throw new LogicError("invalid post id"); }
        if (!commentUsername) { throw new LogicError("invalid comment username"); }
        if (!description) { throw new LogicError("invalid comment description"); }

        return User.findOne({ username });
      })
      .then((user: UserModelInterface) => {
        if (!user) { throw new NotFoundError(`user with username ${username} does not exists`); }

        return Post.findOne({ _id: postId, user: user._id });
      })
      .then((foundPost: PostModelInterface) => {
        if (!foundPost) { throw new NotFoundError(`post with id ${postId} does not exists`); }

        post = foundPost;

        return User.findOne({ commentUsername });
      })
      .then((commentUser: UserModelInterface) => {
        if (!commentUser) { throw new NotFoundError(`comment user with username ${username} does not exists`); }

        const comment = new Comment();
        comment.description = description;
        comment.user = commentUser._id;

        post.comments.push(comment);

        return post.save();
      })
      .then((post: PostModelInterface) => true);
  },

  toggleLikePost(username: string, postId: string) { },

  toggleSavePost(username: string, postId: string) { },

  listPopularPosts(limit: number = 10, offset: number = 1) { },

  search(query: string) { },
};

export default logic;
