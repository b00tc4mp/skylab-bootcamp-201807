import validator from "validator";
import User, { UserModelInterface } from "../models/user";
import { LogicError, AccessDeniedError, NotFoundError, UniqueConstraintError } from "./errors";
import cloudinary from "../config/cloudinary";
import Post, { PostModelInterface } from "../models/post";
import Following from "../models/following";
import Follower from "../models/follower";
import Comment from "../models/comment";
import Like from "../models/like";
import SavedPost, { SavedPostModelInterface } from "../models/saved-post";

const logic = {

  _isFollowingUser(user: UserModelInterface, targetUser: UserModelInterface): Promise<boolean> | never {
    return Promise.resolve()
      .then(() => User.findOne({ _id: user._id, "followings.user": targetUser._id }))
      .then((user: UserModelInterface) => {
        return (user) ? true : false;
      });
  },

  _isSameUser(user: UserModelInterface, targetUser: UserModelInterface): boolean {
    return user._id.toString() === targetUser._id.toString();
  },

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
        if (!username && !targetUsername) { throw new LogicError("invalid username and target username"); }

        if (username && !targetUsername) {

          return User.findOne({ username })
            .then((_user: UserModelInterface) => {
              if (!_user) { throw new NotFoundError(`user with username ${username} does not exists`); }

              return User.findOne({ username }, { password: 0, __v: 0 });
            });

        } else if (!username && targetUsername) {

          return User.findOne({ username: targetUsername })
            .then((_targetUser: UserModelInterface) => {
              if (!_targetUser) { throw new NotFoundError(`user with username ${targetUsername} does not exists`); }

              return User.findOne({ username: targetUsername }, {
                password: 0,
                email: 0,
                phoneNumber: 0,
                enable: 0,
                __v: 0,
              });
            });
        } else {

          return User.findOne({ username })
            .then((_user: UserModelInterface) => {
              if (!_user) { throw new NotFoundError(`user with username ${username} does not exists`); }

              return User.findOne({ username: targetUsername });
            })
            .then((_targetUser: UserModelInterface) => {
              if (!_targetUser) { throw new NotFoundError(`user with username ${targetUsername} does not exists`); }

              return User.findOne({ username: targetUsername }, {
                password: 0,
                email: 0,
                phoneNumber: 0,
                enable: 0,
                __v: 0,
              });
            });
            // .then((user: UserModelInterface) => {
            //   console.log(user);
            //   return user;
            // });
        }
      });
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
            user.imageUrl = result.secure_url;

            resolve(user.save());

          }).end(buffer);
        });
      })
      .then((user: UserModelInterface) => true);
  },

  toggleFollowUser(username: string, targetUsername: string): Promise<boolean> | never {
    let user: UserModelInterface;
    let targetUser: UserModelInterface;

    return Promise.resolve()
      .then(() => {

        if (!username) { throw new LogicError("invalid username"); }
        if (!targetUsername) { throw new LogicError("invalid target username"); }

        return User.findOne({ username });
      })
      .then((_user: UserModelInterface) => {
        if (!_user) { throw new NotFoundError(`user with username ${username} does not exists`); }

        user = _user;

        return User.findOne({ username: targetUsername });
      })
      .then((_targetUser: UserModelInterface) => {
        if (!_targetUser) { throw new NotFoundError(`user with username ${targetUsername} does not exists`); }

        targetUser = _targetUser;

        return User.findOne({ _id: user._id, "followings.user": targetUser._id });
      })
      .then((foundFollowingUser: UserModelInterface) => {
        if (!foundFollowingUser) {
          const following = new Following();
          following.user = targetUser._id;
          following.createdAt = new Date();

          user.followings.push(following);

          return user.save()
            .then(() => {
              const follower = new Follower();
              follower.user = user._id;
              follower.createdAt = new Date();

              targetUser.followers.push(follower);

              return targetUser.save();
            })
            .then(() => true);
        } else {
          return User.update({ _id: user._id }, { $pull: { followings: { _id: targetUser._id } } })
            .then(() => User.update({ _id: targetUser._id }, { $pull: { followers: { _id: user._id } } }))
            .then(() => true);
        }
      });
  },

  listUserFollowers(username?: string, targetUsername?: string): Promise<UserModelInterface[]> | never {
    let user: UserModelInterface;
    let targetUser: UserModelInterface;

    return Promise.resolve()
      .then(() => {
        if (!username && !targetUsername) { throw new LogicError("invalid username and target username"); }

        if (username && !targetUsername) {
          return User.findOne({ username })
            .then((_user: UserModelInterface) => {
              if (!_user) { throw new NotFoundError(`user with username ${username} does not exists`); }

              user = _user;

              return User.find({ "followings.user": user._id });
            })
            .then((followerUsers: UserModelInterface[]) => followerUsers);

        } else if (!username && targetUsername) {
          return User.findOne({ username: targetUsername })
            .then((_targetUser: UserModelInterface) => {
              if (!_targetUser) { throw new NotFoundError(`user with username ${username} does not exists`); }

              targetUser = _targetUser;

              if (targetUser.privateAccount) {
                throw new AccessDeniedError(`user not logged in can not see the follower users of user ${targetUsername}`);
              } else {
                return User.find({ "followings.user": targetUser._id }, { password: 0, __v: 0 })
                  .then((followerUsers: UserModelInterface[]) => followerUsers);
              }
            });

        } else {
          return User.findOne({ username })
            .then((_user: UserModelInterface) => {
              if (!_user) { throw new NotFoundError(`user with username ${username} does not exists`); }

              user = _user;

              return User.findOne({ username: targetUsername });
            })
            .then((_targetUser: UserModelInterface) => {
              if (!_targetUser) { throw new NotFoundError(`user with username ${username} does not exists`); }

              targetUser = _targetUser;

              if (targetUser.privateAccount) {
                return this._isFollowingUser(user, targetUser)
                  .then((isFollowingUser: boolean) => {
                    if (isFollowingUser) {
                      return User.find({ "followings.user": targetUser._id }, { password: 0, __v: 0 })
                        .then((followerUsers: UserModelInterface[]) => followerUsers);
                    } else {
                      throw new AccessDeniedError(`user ${username} in can not see the follower users of user ${targetUsername}`);
                    }
                  });
              } else {
                return User.find({ "followings.user": targetUser._id }, { password: 0, __v: 0 })
                  .then((followerUsers: UserModelInterface[]) => followerUsers);
              }
            });
        }
      });
  },

  listUserFollowings(username?: string, targetUsername?: string): Promise<UserModelInterface[]> | never {
    let user: UserModelInterface;
    let targetUser: UserModelInterface;

    return Promise.resolve()
      .then(() => {
        if (!username && !targetUsername) { throw new LogicError("invalid username and target username"); }

        if (username && !targetUsername) {
          return User.findOne({ username })
            .then((_user: UserModelInterface) => {
              if (!_user) { throw new NotFoundError(`user with username ${username} does not exists`); }

              user = _user;

              return User.find({ "followers.user": user._id });
            })
            .then((followingUsers: UserModelInterface[]) => followingUsers);

        } else if (!username && targetUsername) {
          return User.findOne({ username: targetUsername })
            .then((_targetUser: UserModelInterface) => {
              if (!_targetUser) { throw new NotFoundError(`user with username ${username} does not exists`); }

              targetUser = _targetUser;

              if (targetUser.privateAccount) {
                throw new AccessDeniedError(`user not logged in can not see the following users of user ${targetUsername}`);
              } else {
                return User.find({ "followers.user": targetUser._id }, { password: 0, __v: 0 })
                  .then((followingUsers: UserModelInterface[]) => followingUsers);
              }
            });

        } else {
          return User.findOne({ username })
            .then((_user: UserModelInterface) => {
              if (!_user) { throw new NotFoundError(`user with username ${username} does not exists`); }

              user = _user;

              return User.findOne({ username: targetUsername });
            })
            .then((_targetUser: UserModelInterface) => {
              if (!_targetUser) { throw new NotFoundError(`user with username ${username} does not exists`); }

              targetUser = _targetUser;

              if (targetUser.privateAccount) {
                return this._isFollowingUser(user, targetUser)
                  .then((isFollowingUser: boolean) => {
                    if (isFollowingUser) {
                      return User.find({ "followers.user": targetUser._id }, { password: 0, __v: 0 })
                        .then((followingUsers: UserModelInterface[]) => followingUsers);
                    } else {
                      throw new AccessDeniedError(`user ${username} in can not see the following users of user ${targetUsername}`);
                    }
                  });
              } else {
                return User.find({ "followers.user": targetUser._id }, { password: 0, __v: 0 })
                  .then((followingUsers: UserModelInterface[]) => followingUsers);
              }
            });
        }
      });
  },

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
            post.imageUrl = result.secure_url;
            post.user = user._id;
            if (caption) { post.caption = caption; }

            resolve(post.save());

          }).end(buffer);
        });
      })
      .then((post: PostModelInterface) => post.id);
  },

  retrievePost(postId: string, username?: string): Promise<PostModelInterface> | never {
    let post: PostModelInterface;
    let targetUser: UserModelInterface;
    let user: UserModelInterface;

    return Promise.resolve()
      .then(() => {
        if (!postId) { throw new LogicError("invalid post id"); }

        return Post.findOne({ _id: postId });
      })
      .then((_post: PostModelInterface) => {
        if (!_post) { throw new NotFoundError(`post with id ${postId} does not exists`); }

        post = _post;

        return User.findById(post.user);
      })
      .then((_targetUser: UserModelInterface) => {
        if (!_targetUser) { throw new NotFoundError(`user with id ${post.user} does not exists`); }

        targetUser = _targetUser;

        if (username) {
          return User.findOne({ username })
            .then((_user: UserModelInterface) => {
              if (!_user) { throw new NotFoundError(`user with username ${username} does not exists`); }

              user = _user;
            });
        }
      })
      .then(() => {
        if (!username) {
          if (targetUser.privateAccount) {
            throw new AccessDeniedError(`user not logged in can not see the post of user ${targetUser.username}`);
          } else {
            return Post.findById(postId)
              .populate({ path: "user", select: "-password -__v" })
              .populate("comments")
              .populate("likes");
          }
        } else if (username && this._isSameUser(user, targetUser)) {
          return Post.findById(postId)
            .populate({ path: "user", select: "-password -__v" })
            .populate("comments")
            .populate("likes");
        } else {
          if (targetUser.privateAccount) {
            return this._isFollowingUser(user, targetUser)
              .then((isFollowingUser: boolean) => {
                if (isFollowingUser) {
                  return Post.findById(postId)
                    .populate({ path: "user", select: "-password -__v" })
                    .populate("comments")
                    .populate("likes");
                } else {
                  throw new AccessDeniedError(`user ${username} can not see the post of user ${targetUser.username}`);
                }
              });
          } else {
            return Post.findById(postId)
              .populate({ path: "user", select: "-password -__v" })
              .populate("comments")
              .populate("likes");
          }
        }
      })
      .then((post: PostModelInterface) => post);
  },

  listUserPosts(username?: string, targetUsername?: string): Promise<PostModelInterface[]> | never {
    let user: UserModelInterface;
    let targetUser: UserModelInterface;

    return Promise.resolve()
      .then(() => {
        if (!username && !targetUsername) { throw new LogicError("invalid username and target username"); }

        if (username && !targetUsername) {
          return User.findOne({ username })
            .then((_user: UserModelInterface) => {
              if (!_user) { throw new NotFoundError(`user with username ${username} does not exists`); }

              user = _user;

              return Post.find({ user: user._id })
                .populate({ path: "user", select: "-password -__v" })
                .populate("comments")
                .populate("likes")
                .sort({ createdAt: -1 });
            })
            .then((posts: PostModelInterface[]) => posts);
        } else if (!username && targetUsername) {
          return User.findOne({ username: targetUsername })
            .then((_targetUser: UserModelInterface) => {
              if (!_targetUser) { throw new NotFoundError(`user with username ${username} does not exists`); }

              targetUser = _targetUser;

              if (targetUser.privateAccount) {
                throw new AccessDeniedError(`user not logged in can not see the posts of user ${targetUsername}`);
              } else {
                return Post.find({ user: targetUser._id })
                  .populate({ path: "user", select: "-password -__v" })
                  .populate("comments")
                  .populate("likes")
                  .sort({ createdAt: -1 });
              }
            });
        } else {
          return User.findOne({ username })
            .then((_user: UserModelInterface) => {
              if (!_user) { throw new NotFoundError(`user with username ${username} does not exists`); }

              user = _user;

              return User.findOne({ username: targetUsername });
            })
            .then((_targetUser: UserModelInterface) => {
              if (!_targetUser) { throw new NotFoundError(`user with username ${username} does not exists`); }

              targetUser = _targetUser;

              if (targetUser.privateAccount) {
                return this._isFollowingUser(user, targetUser)
                  .then((isFollowingUser: boolean) => {
                    if (isFollowingUser) {
                      return Post.find({ user: targetUser._id })
                        .populate({ path: "user", select: "-password -__v" })
                        .populate("comments")
                        .populate("likes")
                        .sort({ createdAt: -1 });
                    } else {
                      throw new AccessDeniedError(`user ${username} in can not see the posts of user ${targetUsername}`);
                    }
                  });
              } else {
                return Post.find({ user: targetUser._id })
                  .populate({ path: "user", select: "-password -__v" })
                  .populate("comments")
                  .populate("likes")
                  .sort({ createdAt: -1 });
              }
            });
        }
      });
  },

  listUserSavedPosts(username?: string, targetUsername?: string): Promise<PostModelInterface[]> | never {
    let user: UserModelInterface;
    let targetUser: UserModelInterface;

    return Promise.resolve()
      .then(() => {
        if (!username && !targetUsername) { throw new LogicError("invalid username and target username"); }

        if (username && !targetUsername) {
          return User.findOne({ username })
            .then((_user: UserModelInterface) => {
              if (!_user) { throw new NotFoundError(`user with username ${username} does not exists`); }

              user = _user;

              const postsId = user.savedPosts.map(savedPost => savedPost.post);

              return Post.find({ _id: { $in: postsId } })
                .populate({ path: "user", select: "-password -__v" })
                .populate("comments")
                .populate("likes");
            })
            .then((posts: PostModelInterface[]) => posts);
        } else if (!username && targetUsername) {
          return User.findOne({ username: targetUsername })
            .then((_targetUser: UserModelInterface) => {
              if (!_targetUser) { throw new NotFoundError(`user with username ${username} does not exists`); }

              targetUser = _targetUser;

              if (targetUser.privateAccount) {
                throw new AccessDeniedError(`user not logged in can not see the saved posts of user ${targetUsername}`);
              } else {
                const postsId = targetUser.savedPosts.map(savedPost => savedPost.post);

                return Post.find({ _id: { $in: postsId } })
                  .populate({ path: "user", select: "-password -__v" })
                  .populate("comments")
                  .populate("likes");
              }
            });
        } else {
          return User.findOne({ username })
            .then((_user: UserModelInterface) => {
              if (!_user) { throw new NotFoundError(`user with username ${username} does not exists`); }

              user = _user;

              return User.findOne({ username: targetUsername });
            })
            .then((_targetUser: UserModelInterface) => {
              if (!_targetUser) { throw new NotFoundError(`user with username ${username} does not exists`); }

              targetUser = _targetUser;

              if (targetUser.privateAccount) {
                return this._isFollowingUser(user, targetUser)
                  .then((isFollowingUser: boolean) => {
                    if (isFollowingUser) {
                      const postsId = targetUser.savedPosts.map(savedPost => savedPost.post);

                      return Post.find({ _id: { $in: postsId } })
                        .populate({ path: "user", select: "-password -__v" })
                        .populate("comments")
                        .populate("likes");
                    } else {
                      throw new AccessDeniedError(`user ${username} can not see the saved posts of user ${targetUsername}`);
                    }
                  });
              } else {
                const postsId = targetUser.savedPosts.map(savedPost => savedPost.post);

                return Post.find({ _id: { $in: postsId } })
                  .populate({ path: "user", select: "-password -__v" })
                  .populate("comments")
                  .populate("likes");
              }
            });
        }
      });
  },

  listUserWall(username: string, perPage: number = 10, page: number = 0): Promise<PostModelInterface[]> | never {
    let user: UserModelInterface;

    return Promise.resolve()
      .then(() => {
        if (!username) { throw new LogicError("invalid username"); }

        return User.findOne({ username })
          .then((_user: UserModelInterface) => {
            if (!_user) { throw new NotFoundError(`user with username ${username} does not exists`); }

            user = _user;

            const followingUsersId = user.followings.map(followingUser => followingUser.user);
            const usersId = [user._id, ...followingUsersId];

            return Post.find({ user: { $in: usersId } })
              .populate({ path: "user", select: "-password -__v" })
              .populate("comments")
              .populate("likes")
              .sort({ createdAt: -1 })
              .skip(page)
              .limit(perPage)
              ;
          })
          .then((posts: PostModelInterface[]) => posts);

      });
  },

  addCommentToPost(username: string, postId: string, description: string): Promise<boolean> | never {
    let user: UserModelInterface;
    let post: PostModelInterface;

    return Promise.resolve()
      .then(() => {
        if (!username) { throw new LogicError("invalid username"); }
        if (!postId) { throw new LogicError("invalid post id"); }
        if (!description) { throw new LogicError("invalid comment description"); }

        return User.findOne({ username });
      })
      .then((_user: UserModelInterface) => {
        if (!_user) { throw new NotFoundError(`user with username ${username} does not exists`); }

        user = _user;

        return Post.findOne({ _id: postId });
      })
      .then((_post: PostModelInterface) => {
        if (!_post) { throw new NotFoundError(`post with id ${postId} does not exists`); }

        post = _post;

        const comment = new Comment();
        comment.description = description;
        comment.user = user._id;
        comment.createdAt = new Date();

        post.comments.push(comment);

        return post.save();
      })
      .then((post: PostModelInterface) => true);
  },

  toggleLikePost(username: string, postId: string): Promise<boolean> | never {
    let user: UserModelInterface;
    let post: PostModelInterface;

    return Promise.resolve()
      .then(() => {
        if (!username) { throw new LogicError("invalid username"); }
        if (!postId) { throw new LogicError("invalid post id"); }

        return User.findOne({ username });
      })
      .then((_user: UserModelInterface) => {
        if (!_user) { throw new NotFoundError(`user with username ${username} does not exists`); }

        user = _user;

        return Post.findOne({ _id: postId });
      })
      .then((_post: PostModelInterface) => {
        if (!_post) { throw new NotFoundError(`post with id ${postId} does not exists`); }

        post = _post;

        return Post.findOne({ _id: post._id, "likes.user": user._id });
      })
      .then((likedPost: PostModelInterface) => {
        if (!likedPost) {
          const like = new Like();
          like.user = user._id;
          like.createdAt = new Date();

          post.likes.push(like);

          return post.save();

        } else {
          return Post.update({ _id: post._id }, { $pull: { likes: { _id: likedPost._id } } });
        }
      })
      .then(() => true);
  },

  toggleSavePost(username: string, postId: string): Promise<boolean> | never {
    let user: UserModelInterface;
    let post: PostModelInterface;

    return Promise.resolve()
      .then(() => {
        if (!username) { throw new LogicError("invalid username"); }
        if (!postId) { throw new LogicError("invalid post id"); }

        return User.findOne({ username });
      })
      .then((_user: UserModelInterface) => {
        if (!_user) { throw new NotFoundError(`user with username ${username} does not exists`); }

        user = _user;

        return Post.findOne({ _id: postId });
      })
      .then((_post: PostModelInterface) => {
        if (!_post) { throw new NotFoundError(`post with id ${postId} does not exists`); }

        post = _post;

        return User.findOne({ _id: user._id, "savedPosts.post": post._id });
      })
      .then((userWithSavedPost: UserModelInterface) => {
        if (!userWithSavedPost) {
          const savedPost = new SavedPost();
          savedPost.post = post._id;
          savedPost.createdAt = new Date();

          user.savedPosts.push(savedPost);

          return user.save();
        } else {
          return User.update({ _id: user._id }, { $pull: { savedPosts: { post: post._id } } });
        }
      })
      .then(() => true);
  },

  listExplorePosts(username: string, perPage: number = 10, page: number = 0): Promise<PostModelInterface[]> | never {
    let user: UserModelInterface;

    // TODO: optimize join post with user
    return Promise.resolve()
      .then(() => {
        if (!username) { throw new LogicError("invalid username"); }

        return User.findOne({ username });
      })
      .then((_user: UserModelInterface) => {
        if (!_user) { throw new NotFoundError(`user with username ${username} does not exists`); }

        user = _user;

        return User.find({ privateAccount: false }, "_id");
      })
      .then((publicUsers: UserModelInterface[]) => {
        const publicUsersId = publicUsers.map(publicUser => publicUser._id);

        return Post.find({ user: { $in: publicUsersId } })
          .populate({ path: "user", select: "-password -__v" })
          .populate("comments")
          .populate("likes")
          .sort({ createdAt: -1 })
          .skip(page)
          .limit(perPage);
      })
      .then((posts: PostModelInterface[]) => posts);
  },

  search(query: string): Promise<UserModelInterface[]> | never {
    return Promise.resolve()
      .then(() => {
        const regexp = new RegExp(`.*${query}.*`);

        return User.find({ privateAccount: false, username: regexp }, "-password -__v");
      })
      .then((users: UserModelInterface[]) => users);
  },

};

export default logic;
