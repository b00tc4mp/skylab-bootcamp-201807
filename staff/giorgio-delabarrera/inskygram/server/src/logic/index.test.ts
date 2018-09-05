import { config } from "dotenv";
import "jest";
import Post, { PostModelInterface } from "../models/post";
import User, { UserModelInterface } from "../models/user";
import Following, { FollowingModelInterface } from "../models/following";
import logic from ".";
import { connect } from "../db";
const Jimp: any = require("jimp");
import fs from "fs";
import { Types } from "mongoose";
import { AccessDeniedError, UniqueConstraintError, LogicError } from "./errors";
import Follower, { FollowerModelInterface } from "../models/follower";
import rimraf from "rimraf";
import SavedPost, { SavedPostModelInterface } from "../models/saved-post";

config();

const { DATABASE_URL_TEST } = process.env;

const { ObjectId } = Types;

let db: any;

beforeAll(async () => {
  db = await connect(DATABASE_URL_TEST);
});

beforeEach(async () => {
  await Post.deleteMany({});
  await User.deleteMany({});
});

afterAll(async () => {
  await Post.deleteMany({});
  await User.deleteMany({});

  await db.disconnect();
});

describe("logic", () => {
  let username: string;
  let email: string;
  let password: string;

  beforeEach(() => {
    username = `user-${Math.random()}`;
    email = `user-${Math.random()}@inskygram.com`;
    password = `123${Math.random()}`;
  });

  describe("register", () => {
    test("should register correctly", () => {
      return logic.register(username, email, password)
        .then(res => expect(res).toBeTruthy());
    });

    test("should fail on trying to register an user with the same username", () => {
      const otherEmail = `user-${Math.random()}@inskygram.com`;

      return User.create({ username, email, password })
        .then(() => logic.register(username, otherEmail, password))
        .catch(err => err)
        .then(({ message }) => {
          expect(message).toBe(`user with username ${username} already exists`);
        });
    });

    test("should fail on trying to register an user with the same email", () => {
      const otherUsername = `user-${Math.random()}`;

      return User.create({ username, email, password })
        .then(() => logic.register(otherUsername, email, password))
        .catch(err => err)
        .then(({ message }) => {
          expect(message).toBe(`user with email ${email} already exists`);
        });
    });

    test("should fail on trying to register with an undefined username", () => {
      return logic.register(undefined, email, password)
        .catch(err => err)
        .then(({ message }) => {
          expect(message).toBe("invalid username");
        });
    });

    test("should fail on trying to register with an undefined email", () => {
      return logic.register(username, undefined, password)
        .catch(err => err)
        .then(({ message }) => {
          expect(message).toBe("invalid email");
        });
    });

    test("should fail on trying to register with an undefined password", () => {
      return logic.register(username, email, undefined)
        .catch(err => err)
        .then(({ message }) => {
          expect(message).toBe("invalid password");
        });
    });

    test("should fail on trying to register with an empty username", () => {
      return logic.register("", email, password)
        .catch(err => err)
        .then(({ message }) => {
          expect(message).toBe("invalid username");
        });
    });

    test("should fail on trying to register with an empty email", () => {
      return logic.register(username, "", password)
        .catch(err => err)
        .then(({ message }) => {
          expect(message).toBe("invalid email");
        });
    });

    test("should fail on trying to register with an empty password", () => {
      return logic.register(username, email, "")
        .catch(err => err)
        .then(({ message }) => {
          expect(message).toBe("invalid password");
        });
    });

  });

  describe("authenticate", () => {
    beforeEach(() => User.create({ username, email, password }));

    test("should login correctly", () => {
      return logic.authenticate(username, password)
        .then(res => {
          expect(res).toBeTruthy();
        });
    });

    test("should fail on trying to login with an undefined username", () => {
      return logic.authenticate(undefined, password)
        .catch(err => err)
        .then(({ message }) => expect(message).toBe(`invalid username`));
    });

    test("should fail on trying to login with an empty email", () => {
      return logic.authenticate("", password)
        .catch(err => err)
        .then(({ message }) => expect(message).toBe(`invalid username`));
    });

    test("should fail on trying to login with an undefined password", () => {
      return logic.authenticate(username, undefined)
        .catch(err => err)
        .then(({ message }) => expect(message).toBe(`invalid password`));
    });

    test("should fail on trying to login with an empty password", () => {
      return logic.authenticate(email, "")
        .catch(err => err)
        .then(({ message }) => expect(message).toBe(`invalid password`));
    });
  });

  describe("retrieve user", () => {
    let user: UserModelInterface;

    beforeEach(async () => {
      user = await User.create({ username, email, password });
    });

    describe("target user", () => {
      let targetUsername: string;
      let targetEmail: string;
      let targetPassword: string;
      let targetUser: UserModelInterface;

      beforeEach(async () => {
        targetUsername = `user-${Math.random()}`;
        targetEmail = `user-${Math.random()}@inskygram.com`;
        targetPassword = `123${Math.random()}`;

        targetUser = await User.create({ targetUsername, targetEmail, targetPassword });
      });

      test("should retrieve correctly a public user seeing him by a logged-in user", () => {
        return logic.retrieveUser(username, targetUsername)
          .then((targetUser: UserModelInterface) => {
            expect(targetUser).toBeInstanceOf(User);
            expect(targetUser._id).toBeInstanceOf(ObjectId);
            expect(targetUser.username).toBe(targetUsername);
          });
      });

      test("should retrieve correctly a public user seeing him by a user not logged in", () => {
        return logic.retrieveUser(undefined, targetUsername)
          .then((targetUser: UserModelInterface) => {
            expect(targetUser).toBeInstanceOf(User);
            expect(targetUser._id).toBeInstanceOf(ObjectId);
            expect(targetUser.username).toBe(targetUsername);
          });
      });

      test("should retrieve correctly a private user seeing him by a logged-in follower user", () => {
        targetUser.privateAccount = true;

        return targetUser.save()
          .then((targetUser: UserModelInterface) => {
            const following = new Following();
            following.user = targetUser._id;
            following.createdAt = new Date();

            user.followings.push(following);

            return targetUser.save();
          })
          .then((targetUser: UserModelInterface) => logic.retrieveUser(username, targetUsername))
          .then((targetUser: UserModelInterface) => {
            expect(targetUser).toBeInstanceOf(User);
            expect(targetUser._id).toBeInstanceOf(ObjectId);
            expect(targetUser.username).toBe(targetUsername);
          });
      });

      test("should retrieve correctly a private user seeing him by a logged-in user not follower", () => {
        targetUser.privateAccount = true;

        return targetUser.save()
          .then((targetUser: UserModelInterface) => logic.retrieveUser(username, targetUsername))
          .then((targetUser: UserModelInterface) => {
            expect(targetUser).toBeInstanceOf(User);
            expect(targetUser._id).toBeInstanceOf(ObjectId);
            expect(targetUser.username).toBe(targetUsername);
          });
      });

      test("should retrieve correctly a private user seeing him by a user not logged in", () => {
        targetUser.privateAccount = true;

        return targetUser.save()
          .then((targetUser: UserModelInterface) => logic.retrieveUser(undefined, targetUsername))
          .then((targetUser: UserModelInterface) => {
            expect(targetUser).toBeInstanceOf(User);
            expect(targetUser._id).toBeInstanceOf(ObjectId);
            expect(targetUser.username).toBe(targetUsername);
          });
      });
    });

    describe("user", () => {
      test("should retrieve correctly the logged-in user with his private info", () => {
        const name = `name-${Math.random()}`;
        const website = `https://www.${Math.random()}.com`;
        const phoneNumber = `${Math.random()}`;
        const gender = "male";
        const biography = `bio-${Math.random()}`;
        const privateAccount = false;

        user.name = name;
        user.website = website;
        user.phoneNumber = phoneNumber;
        user.gender = gender;
        user.biography = biography;
        user.privateAccount = privateAccount;

        return user.save()
          .then((user: UserModelInterface) => logic.retrieveUser(username))
          .then((user: UserModelInterface) => {
            expect(user).toBeInstanceOf(User);
            expect(user._id).toBeInstanceOf(ObjectId);
            expect(user.username).toBe(username);
            expect(user.name).toBe(name);
            expect(user.website).toBe(website);
            expect(user.phoneNumber).toBe(phoneNumber);
            expect(user.gender).toBe(gender);
            expect(user.biography).toBe(biography);
            expect(user.privateAccount).toBeFalsy();
          });
      });
    });
  });

  describe("update user", () => {
    beforeEach(() => User.create({ username, email, password }));

    test("should update correctly", () => {
      const newEmail = `user-${Math.random()}@inskygram.com`;
      const name = `name-${Math.random()}`;
      const website = `https://www.${Math.random()}.com`;
      const phoneNumber = `${Math.random()}`;
      const gender = "male";
      const biography = `bio-${Math.random()}`;
      const privateAccount = false;

      return logic.updateUser(username, newEmail, name, website, phoneNumber, gender, biography, privateAccount)
        .then((res: boolean) => {
          expect(res).toBeTruthy();

          return User.findOne({ username });
        })
        .then((user: UserModelInterface) => {
          expect(user.name).toBe(name);
          expect(user.website).toBe(website);
          expect(user.phoneNumber).toBe(phoneNumber);
          expect(user.gender).toBe(gender);
          expect(user.biography).toBe(biography);
          expect(user.privateAccount).toBe(privateAccount);

          expect(user.username).toBe(username);
          expect(user.email).toBe(newEmail);
          expect(user.password).toBe(password);
        });
    });

    test("should update correctly without email parameter", () => {
      const name = `name-${Math.random()}`;
      const website = `https://www.${Math.random()}.com`;
      const phoneNumber = `${Math.random()}`;
      const gender = "male";
      const biography = `bio-${Math.random()}`;
      const privateAccount = false;

      return logic.updateUser(username, undefined, name, website, phoneNumber, gender, biography, privateAccount)
        .then((res: boolean) => {
          expect(res).toBeTruthy();

          return User.findOne({ username });
        })
        .then((user: UserModelInterface) => {
          expect(user.name).toBe(name);
          expect(user.website).toBe(website);
          expect(user.phoneNumber).toBe(phoneNumber);
          expect(user.gender).toBe(gender);
          expect(user.biography).toBe(biography);
          expect(user.privateAccount).toBe(privateAccount);

          expect(user.username).toBe(username);
          expect(user.email).toBe(email);
          expect(user.password).toBe(password);
        });
    });

    test("should update correctly without name parameter", () => {
      const website = `https://www.${Math.random()}.com`;
      const phoneNumber = `${Math.random()}`;
      const gender = "male";
      const biography = `bio-${Math.random()}`;
      const privateAccount = false;

      return logic.updateUser(username, undefined, undefined, website, phoneNumber, gender, biography, privateAccount)
        .then((res: boolean) => {
          expect(res).toBeTruthy();

          return User.findOne({ username });
        })
        .then((user: UserModelInterface) => {
          expect(user.name).toBeUndefined();
          expect(user.website).toBe(website);
          expect(user.phoneNumber).toBe(phoneNumber);
          expect(user.gender).toBe(gender);
          expect(user.biography).toBe(biography);
          expect(user.privateAccount).toBe(privateAccount);

          expect(user.username).toBe(username);
          expect(user.email).toBe(email);
          expect(user.password).toBe(password);
        });
    });

    test("should fail on trying to update an email that is already in use", () => {
      const newUsername = `user-${Math.random()}`;
      const newEmail = `user-${Math.random()}@inskygram.com`;
      const newPassword = `123${Math.random()}`;

      return logic.register(newUsername, newEmail, newPassword)
        .then((res: boolean) => {
          expect(() => logic.updateUser(newUsername, email)).toThrowError(UniqueConstraintError);
          expect(() => logic.updateUser(newUsername, email)).toThrowError(`user with email ${email} already exists`);
        });
    });

    test("should update correctly only some fields", () => {
      const name = `name-${Math.random()}`;
      const biography = `bio-${Math.random()}`;
      const privateAccount = true;

      return logic.updateUser(username, undefined, name, undefined, undefined, undefined, biography, privateAccount)
        .then((res: boolean) => {
          expect(res).toBeTruthy();

          return User.findOne({ username });
        })
        .then((user: UserModelInterface) => {
          expect(user.name).toBe(name);
          expect(user.biography).toBe(biography);
          expect(user.privateAccount).toBe(privateAccount);

          expect(user.email).toBe(email);
        });
    });
  });

  describe("update user password", () => {
    const newPassword = `${password}-${Math.random()}`;

    beforeEach(() => User.create({ username, email, password }));

    test("should update password correctly", () => {
      return logic.updateUserPassword(username, password, newPassword)
        .then((res: boolean) => {
          expect(res).toBeTruthy();

          return User.findOne({ username });
        })
        .then((user: UserModelInterface) => {
          expect(user).toBeInstanceOf(User);
          expect(user.email).toBe(email);
          expect(user.password).toBe(newPassword);
        });
    });
  });

  describe("update user avatar", () => {
    let buffer: Buffer;
    const filename = `${username}.png`;

    beforeEach(() => {
      fs.mkdirSync("test");

      return User.create({ username, email, password })
        .then(() => {
          return new Promise((resolve, reject) => {
            return new Jimp(256, 256, 0xff0000ff, (err: any, image: any) => {
              if (err) { return reject(err); }

              image.write(`${__dirname}/test/${filename}`, resolve);
            });
          });
        })
        .then(() => {
          buffer = fs.readFileSync(`${__dirname}/test/${filename}`);
        });
    });

    afterEach(() => {
      rimraf.sync("test");
    });

    test("should update avatar correctly", () => {
      return logic.updateUserAvatar(username, filename, buffer)
        .then((res: boolean) => {
          expect(res).toBeTruthy();

          return User.findOne({ username });
        })
        .then((user: UserModelInterface) => {
          expect(user).toBeInstanceOf(User);
          expect(user.imageId).toBeDefined();
        });
    });
  });

  describe("toggle follow user", () => {
    let targetUsername: string;
    let targetEmail: string;
    let targetPassword: string;
    let user: UserModelInterface;
    let targetUser: UserModelInterface;

    beforeEach(async () => {
      targetUsername = `user-${Math.random()}`;
      targetEmail = `user-${Math.random()}@inskygram.com`;
      targetPassword = `123${Math.random()}`;

      user = await User.create({ username, email, password });
      targetUser = await User.create({ targetUsername, targetEmail, targetPassword });
    });

    test("should follow correctly a public user seeing him by a logged-in user", () => {
      return logic.toggleFollowUser(username, targetUsername)
        .then((res: boolean) => expect(res).toBeTruthy());
    });

    test("should unfollow correctly a public user seeing him by a logged-in user", () => {
      return logic.toggleFollowUser(username, targetUsername)
        .then((res: boolean) => logic.toggleFollowUser(username, targetUsername))
        .then((res: boolean) => expect(res).toBeTruthy());
    });

    test("should fail on trying to follow with an undefined username", () => {
      return Promise.resolve()
        .then(() => {
          expect(() => logic.toggleFollowUser(undefined, targetUsername))
            .toThrowError(LogicError);
          expect(() => logic.toggleFollowUser(undefined, targetUsername))
            .toThrowError("invalid username");
        });
    });

    test("should fail on trying to follow with an undefined target username", () => {
      return Promise.resolve()
        .then(() => {
          expect(() => logic.toggleFollowUser(username, undefined))
            .toThrowError(LogicError);
          expect(() => logic.toggleFollowUser(username, undefined))
            .toThrowError("invalid target username");
        });
    });

  });

  describe("list user followers", () => {
    let user: UserModelInterface;

    beforeEach(async () => {
      user = await User.create({ username, email, password });
    });

    describe("target user", () => {
      let targetUsername: string;
      let targetEmail: string;
      let targetPassword: string;
      let targetUser: UserModelInterface;

      beforeEach(async () => {
        targetUsername = `user-${Math.random()}`;
        targetEmail = `user-${Math.random()}@inskygram.com`;
        targetPassword = `123${Math.random()}`;

        targetUser = await User.create({ targetUsername, targetEmail, targetPassword });

        const followers: FollowerModelInterface[] = [];

        for (let i = 0; i < 4; i++) {
          const randomUsername = `user-${Math.random()}`;
          const randomEmail = `user-${Math.random()}@inskygram.com`;
          const randomPassword = `123${Math.random()}`;

          const randomUser = await User.create({ randomUsername, randomEmail, randomPassword });

          const follower = new Follower();
          follower.user = randomUser._id;
          follower.createdAt = new Date();

          followers.push(follower);
        }

        targetUser.followers = followers;

        await targetUser.save();
      });

      test("should list the followers of a public user seeing him by a logged-in user", () => {
        return logic.listUserFollowers(username, targetUsername)
          .then((followers: FollowerModelInterface[]) => {
            expect(followers).toHaveLength(4);
          });
      });

      test("should list the followers of a public user seeing him by a user not logged in", () => {
        return logic.listUserFollowers(undefined, targetUsername)
          .then((followers: FollowerModelInterface[]) => {
            expect(followers).toHaveLength(4);
          });
      });

      test("should list the followers of a private user seeing him by a logged-in follower user", () => {
        targetUser.privateAccount = true;

        return targetUser.save()
          .then((targetUser: UserModelInterface) => {
            const following = new Following();
            following.user = targetUser._id;
            following.createdAt = new Date();

            user.followings.push(following);

            return user.save();
          })
          .then((user: UserModelInterface) => {
            const follower = new Follower();
            follower.user = user._id;
            follower.createdAt = new Date();

            targetUser.followers.push(follower);

            return targetUser.save();
          })
          .then((targetUser: UserModelInterface) => logic.listUserFollowers(username, targetUsername))
          .then((followers: FollowerModelInterface[]) => expect(followers).toHaveLength(4));
      });

      test("should fail on trying to retrieve a list the followers of a private user " +
        "seeing him by a logged-in user not follower", () => {
          targetUser.privateAccount = true;

          return targetUser.save()
            .then((targetUser: UserModelInterface) => {
              expect(() => logic.listUserFollowers(username, targetUsername)).toThrowError(AccessDeniedError);
              expect(() => logic.listUserFollowers(username, targetUsername))
                .toThrowError(`user ${username} can not see the follower users of user ${targetUsername}`);
            });
        });

      test("should fail on trying to retrieve a list the followers of a private user " +
        "seeing him by a user not logged in", () => {
          targetUser.privateAccount = true;

          return targetUser.save()
            .then((targetUser: UserModelInterface) => {
              expect(() => logic.listUserFollowers(undefined, targetUsername)).toThrowError(AccessDeniedError);
              expect(() => logic.listUserFollowers(undefined, targetUsername))
                .toThrowError(`user not logged in can not see the follower users of user ${targetUsername}`);
            });
        });
    });

    describe("user", () => {

      beforeEach(async () => {
        const followers: FollowerModelInterface[] = [];

        for (let i = 0; i < 4; i++) {
          const randomUsername = `user-${Math.random()}`;
          const randomEmail = `user-${Math.random()}@inskygram.com`;
          const randomPassword = `123${Math.random()}`;

          const randomUser = await User.create({ randomUsername, randomEmail, randomPassword });

          const follower = new Follower();
          follower.user = randomUser._id;
          follower.createdAt = new Date();

          followers.push(follower);
        }

        user.followers = followers;

        await user.save();
      });

      test("should list the followers of the logged-in user", () => {
        return logic.listUserFollowers(username)
          .then((followers: FollowerModelInterface[]) => expect(followers).toHaveLength(4));
      });
    })
  });

  describe("list user followings", () => {
    let user: UserModelInterface;

    beforeEach(async () => {
      user = await User.create({ username, email, password });
    });

    describe("target user", () => {
      let targetUsername: string;
      let targetEmail: string;
      let targetPassword: string;
      let targetUser: UserModelInterface;

      beforeEach(async () => {
        targetUsername = `user-${Math.random()}`;
        targetEmail = `user-${Math.random()}@inskygram.com`;
        targetPassword = `123${Math.random()}`;

        targetUser = await User.create({ targetUsername, targetEmail, targetPassword });

        const followings: FollowingModelInterface[] = [];

        for (let i = 0; i < 4; i++) {
          const randomUsername = `user-${Math.random()}`;
          const randomEmail = `user-${Math.random()}@inskygram.com`;
          const randomPassword = `123${Math.random()}`;

          const randomUser = await User.create({ randomUsername, randomEmail, randomPassword });

          const following = new Following();
          following.user = randomUser._id;
          following.createdAt = new Date();

          followings.push(following);
        }

        targetUser.followings = followings;

        await targetUser.save();
      });

      test("should list the followings of a public user seeing him by a logged-in user", () => {
        return logic.listUserFollowings(username, targetUsername)
          .then((followings: FollowingModelInterface[]) => {
            expect(followings).toHaveLength(4);
          });
      });

      test("should list the followings of a public user seeing him by a user not logged in", () => {
        return logic.listUserFollowings(undefined, targetUsername)
          .then((followings: FollowerModelInterface[]) => {
            expect(followings).toHaveLength(4);
          });
      });

      test("should list the followings of a private user seeing him by a logged-in follower user", () => {
        targetUser.privateAccount = true;

        return targetUser.save()
          .then((targetUser: UserModelInterface) => {
            const following = new Following();
            following.user = targetUser._id;
            following.createdAt = new Date();

            user.followings.push(following);

            return user.save();
          })
          .then((user: UserModelInterface) => {
            const follower = new Follower();
            follower.user = user._id;
            follower.createdAt = new Date();

            targetUser.followers.push(follower);

            return targetUser.save();
          })
          .then((targetUser: UserModelInterface) => logic.listUserFollowings(username, targetUsername))
          .then((followings: FollowerModelInterface[]) => expect(followings).toHaveLength(4));
      });

      test("should fail on trying to retrieve a list the followings of a private user " +
        "seeing him by a logged-in user not follower", () => {
          targetUser.privateAccount = true;

          return targetUser.save()
            .then((targetUser: UserModelInterface) => {
              expect(() => logic.listUserFollowings(username, targetUsername)).toThrowError(AccessDeniedError);
              expect(() => logic.listUserFollowings(username, targetUsername))
                .toThrowError(`user ${username} can not see the following users of user ${targetUsername}`);
            });
        });

      test("should fail on trying to retrieve a list the followings of a private user " +
        "seeing him by a user not logged in", () => {
          targetUser.privateAccount = true;

          return targetUser.save()
            .then((targetUser: UserModelInterface) => {
              expect(() => logic.listUserFollowings(undefined, targetUsername)).toThrowError(AccessDeniedError);
              expect(() => logic.listUserFollowings(undefined, targetUsername))
                .toThrowError(`user not logged in can not see the following users of user ${targetUsername}`);
            });
        });
    });

    describe("user", () => {

      beforeEach(async () => {
        const followings: FollowingModelInterface[] = [];

        for (let i = 0; i < 4; i++) {
          const randomUsername = `user-${Math.random()}`;
          const randomEmail = `user-${Math.random()}@inskygram.com`;
          const randomPassword = `123${Math.random()}`;

          const randomUser = await User.create({ randomUsername, randomEmail, randomPassword });

          const following = new Following();
          following.user = randomUser._id;
          following.createdAt = new Date();

          followings.push(following);
        }

        user.followings = followings;

        await user.save();
      });

      test("should list the followings of the logged-in user", () => {
        return logic.listUserFollowings(username)
          .then((followings: FollowingModelInterface[]) => expect(followings).toHaveLength(4));
      });
    });

  });

  describe("create post", () => {
    let buffer: Buffer;
    const filename = `${username}.png`;

    beforeEach(() => {
      fs.mkdirSync("test");

      return User.create({ username, email, password })
        .then(() => {
          return new Promise((resolve, reject) => {
            return new Jimp(256, 256, 0xff0000ff, (err: any, image: any) => {
              if (err) { return reject(err); }

              image.write(`${__dirname}/test/${filename}`, resolve);
            });
          });
        })
        .then(() => {
          buffer = fs.readFileSync(`${__dirname}/test/${filename}`);
        });
    });

    afterEach(() => {
      rimraf.sync("test");
    });

    test("should create correctly", () => {
      return logic.createPost(username, filename, buffer)
        .then((id: string) => {
          expect(id).toBeDefined();

          return Post.findById(id);
        })
        .then((post: PostModelInterface) => {
          expect(post).toBeInstanceOf(Post);
          expect(post._id).toBeInstanceOf(ObjectId);
          expect(post.user).toBeInstanceOf(ObjectId);
          expect(post.imageId).toBeDefined();
          expect(post.caption).toBeUndefined();
        });
    });

    test("should create correctly with optional parameters", () => {
      const caption = "Lorem ipsum";

      return logic.createPost(username, filename, buffer, caption)
        .then((id: string) => {
          expect(id).toBeDefined();

          return Post.findById(id);
        })
        .then((post: PostModelInterface) => {
          expect(post).toBeInstanceOf(Post);
          expect(post._id).toBeInstanceOf(ObjectId);
          expect(post.user).toBeInstanceOf(ObjectId);
          expect(post.imageId).toBeDefined();
          expect(post.caption).toBe(caption);
        });
    });

  });

  describe("retrieve post", () => {
    let user: UserModelInterface;
    let postId: string;

    beforeEach(async () => {
      user = await User.create({ username, email, password });
    });

    describe("target user", () => {
      let targetUsername: string;
      let targetEmail: string;
      let targetPassword: string;
      let targetFilename: string;
      let targetUser: UserModelInterface;

      beforeEach(async () => {
        fs.mkdirSync("test");

        targetUsername = `user-${Math.random()}`;
        targetEmail = `user-${Math.random()}@inskygram.com`;
        targetPassword = `123${Math.random()}`;
        targetFilename = `${targetUsername}.png`;

        targetUser = await User.create({ targetUsername, targetEmail, targetPassword });

        await new Promise((resolve, reject) => {
          return new Jimp(256, 256, 0xff0000ff, (err: any, image: any) => {
            if (err) { return reject(err); }

            image.write(`${__dirname}/test/${targetFilename}`, resolve);
          });
        });

        const buffer: Buffer = fs.readFileSync(`${__dirname}/test/${targetFilename}`);

        postId = await logic.createPost(targetUsername, targetFilename, buffer);
      });

      afterEach(() => {
        rimraf.sync("test");
      });

      test("should retrieve the post of a public user seeing him by a logged-in user", () => {
        return logic.retrievePost(username, postId)
          .then((post: PostModelInterface) => {
            expect(post).toBeInstanceOf(Post);
            expect(post._id).toBeInstanceOf(ObjectId);
            expect(post._id).toEqual(postId);
            expect(post.user).toBeInstanceOf(ObjectId);
            expect(post.user).toEqual(targetUser._id);
            expect(post.imageId).toBeDefined();
          });
      });

      test("should retrieve the post of a public user seeing him by a user not logged in", () => {
        return logic.retrievePost(undefined, postId)
          .then((post: PostModelInterface) => {
            expect(post).toBeInstanceOf(Post);
            expect(post._id).toBeInstanceOf(ObjectId);
            expect(post._id).toEqual(postId);
            expect(post.user).toBeInstanceOf(ObjectId);
            expect(post.user).toEqual(targetUser._id);
            expect(post.imageId).toBeDefined();
          });
      });

      test("should retrieve the post of a private user seeing him by a logged-in follower user", () => {
        targetUser.privateAccount = true;

        return targetUser.save()
          .then((targetUser: UserModelInterface) => {
            const following = new Following();
            following.user = targetUser._id;
            following.createdAt = new Date();

            user.followings.push(following);

            return user.save();
          })
          .then((user: UserModelInterface) => {
            const follower = new Follower();
            follower.user = user._id;
            follower.createdAt = new Date();

            targetUser.followers.push(follower);

            return targetUser.save();
          })
          .then((targetUser: UserModelInterface) => logic.retrievePost(username, postId))
          .then((post: PostModelInterface) => {
            expect(post).toBeInstanceOf(Post);
            expect(post._id).toBeInstanceOf(ObjectId);
            expect(post._id).toEqual(postId);
            expect(post.user).toBeInstanceOf(ObjectId);
            expect(post.user).toEqual(targetUser._id);
            expect(post.imageId).toBeDefined();
          });
      });

      test("should fail on trying to retrieve the post of a private user " +
        "seeing him by a logged-in user not follower", () => {
          targetUser.privateAccount = true;

          return targetUser.save()
            .then((targetUser: UserModelInterface) => {
              expect(() => logic.retrievePost(username, postId)).toThrowError(AccessDeniedError);
              expect(() => logic.retrievePost(username, postId))
                .toThrowError(`user ${username} can not see the post of user ${targetUsername}`);
            });
        });

      test("should fail on trying to retrieve the post of a private user " +
        "seeing him by a user not logged in", () => {
          targetUser.privateAccount = true;

          return targetUser.save()
            .then((targetUser: UserModelInterface) => {
              expect(() => logic.retrievePost(undefined, postId)).toThrowError(AccessDeniedError);
              expect(() => logic.retrievePost(undefined, postId))
                .toThrowError(`user not logged in can not see the post of user ${targetUsername}`);
            });
        });
    });

    describe("user", () => {
      let filename: string;

      beforeEach(async () => {
        fs.mkdirSync("test");

        filename = `${username}.png`;

        await new Promise((resolve, reject) => {
          return new Jimp(256, 256, 0xff0000ff, (err: any, image: any) => {
            if (err) { return reject(err); }

            image.write(`${__dirname}/test/${filename}`, resolve);
          });
        });

        const buffer: Buffer = fs.readFileSync(`${__dirname}/test/${filename}`);

        postId = await logic.createPost(username, filename, buffer);
      });

      afterEach(() => {
        rimraf.sync("test");
      });

      test("should retrieve the post of the logged-in user", () => {
        return logic.retrievePost(username, postId)
          .then((post: PostModelInterface) => {
            expect(post).toBeInstanceOf(Post);
            expect(post._id).toBeInstanceOf(ObjectId);
            expect(post._id).toEqual(postId);
            expect(post.user).toBeInstanceOf(ObjectId);
            expect(post.user).toEqual(user._id);
            expect(post.imageId).toBeDefined();
          });
      });
    });
  });

  describe("list user posts", () => {
    let user: UserModelInterface;

    beforeEach(async () => {
      user = await User.create({ username, email, password });
    });

    describe("target user", () => {
      let targetUsername: string;
      let targetEmail: string;
      let targetPassword: string;
      let targetFilename: string;
      let targetUser: UserModelInterface;

      beforeEach(async () => {
        fs.mkdirSync("test");

        targetUsername = `user-${Math.random()}`;
        targetEmail = `user-${Math.random()}@inskygram.com`;
        targetPassword = `123${Math.random()}`;

        targetUser = await User.create({ targetUsername, targetEmail, targetPassword });

        for (let i = 0; i < 4; i++) {
          targetFilename = `${targetUsername}-${i}.png`;

          await new Promise((resolve, reject) => {
            return new Jimp(256, 256, 0xff0000ff, (err: any, image: any) => {
              if (err) { return reject(err); }

              image.write(`${__dirname}/test/${targetFilename}`, resolve);
            });
          });

          const buffer: Buffer = fs.readFileSync(`${__dirname}/test/${targetFilename}`);

          await logic.createPost(targetUsername, targetFilename, buffer);
        }
      });

      afterEach(() => {
        rimraf.sync("test");
      });

      test("should list the posts of a public user seeing him by a logged-in user", () => {
        return logic.listUserPosts(username, targetUsername)
          .then((posts: PostModelInterface[]) => {
            expect(posts).toHaveLength(4);
          });
      });

      test("should list the posts of a public user seeing him by a user not logged in", () => {
        return logic.listUserPosts(undefined, targetUsername)
          .then((posts: PostModelInterface[]) => {
            expect(posts).toHaveLength(4);
          });
      });

      test("should list the posts of a private user seeing him by a logged-in follower user", () => {
        targetUser.privateAccount = true;

        return targetUser.save()
          .then((targetUser: UserModelInterface) => {
            const following = new Following();
            following.user = targetUser._id;
            following.createdAt = new Date();

            user.followings.push(following);

            return user.save();
          })
          .then((user: UserModelInterface) => {
            const follower = new Follower();
            follower.user = user._id;
            follower.createdAt = new Date();

            targetUser.followers.push(follower);

            return targetUser.save();
          })
          .then((targetUser: UserModelInterface) => logic.listUserPosts(username, targetUsername))
          .then((posts: PostModelInterface[]) => expect(posts).toHaveLength(4));
      });

      test("should fail on trying to retrieve a list the posts of a private user " +
        "seeing him by a logged-in user not follower", () => {
          targetUser.privateAccount = true;

          return targetUser.save()
            .then((targetUser: UserModelInterface) => {
              expect(() => logic.listUserPosts(username, targetUsername)).toThrowError(AccessDeniedError);
              expect(() => logic.listUserPosts(username, targetUsername))
                .toThrowError(`user ${username} can not see the posts of user ${targetUsername}`);
            });
        });

      test("should fail on trying to retrieve a list the posts of a private user " +
        "seeing him by a user not logged in", () => {
          targetUser.privateAccount = true;

          return targetUser.save()
            .then((targetUser: UserModelInterface) => {
              expect(() => logic.listUserPosts(undefined, targetUsername)).toThrowError(AccessDeniedError);
              expect(() => logic.listUserPosts(undefined, targetUsername))
                .toThrowError(`user not logged in can not see the posts of user ${targetUsername}`);
            });
        });
    });

    describe("user", () => {
      let filename: string;

      beforeEach(async () => {
        fs.mkdirSync("test");

        for (let i = 0; i < 4; i++) {
          filename = `${username}-${i}.png`;

          await new Promise((resolve, reject) => {
            return new Jimp(256, 256, 0xff0000ff, (err: any, image: any) => {
              if (err) { return reject(err); }

              image.write(`${__dirname}/test/${filename}`, resolve);
            });
          });

          const buffer: Buffer = fs.readFileSync(`${__dirname}/test/${filename}`);

          await logic.createPost(username, filename, buffer);
        }
      });

      afterEach(() => {
        rimraf.sync("test");
      });

      test("should list the posts of the logged-in user", () => {
        return logic.listUserPosts(username)
          .then((posts: PostModelInterface[]) => expect(posts).toHaveLength(4));
      });
    });
  });

  describe("list user saved posts", () => {
    let user: UserModelInterface;
    let otherUsername: string;
    let otherEmail: string;
    let otherPassword: string;
    let otherFilename: string;
    let otherUser: UserModelInterface;

    beforeEach(async () => {
      user = await User.create({ username, email, password });

      otherUsername = `user-${Math.random()}`;
      otherEmail = `user-${Math.random()}@inskygram.com`;
      otherPassword = `123${Math.random()}`;

      otherUser = await User.create({ otherUsername, otherEmail, otherPassword, privateAccount: false });
    });

    describe("target user", () => {
      let targetUsername: string;
      let targetEmail: string;
      let targetPassword: string;
      let targetUser: UserModelInterface;

      beforeEach(async () => {
        fs.mkdirSync("test");

        targetUsername = `user-${Math.random()}`;
        targetEmail = `user-${Math.random()}@inskygram.com`;
        targetPassword = `123${Math.random()}`;

        targetUser = await User.create({ targetUsername, targetEmail, targetPassword });

        const savedPosts: SavedPostModelInterface[] = [];

        for (let i = 0; i < 4; i++) {
          otherFilename = `${otherUsername}-${i}.png`;

          await new Promise((resolve, reject) => {
            return new Jimp(256, 256, 0xff0000ff, (err: any, image: any) => {
              if (err) { return reject(err); }

              image.write(`${__dirname}/test/${otherFilename}`, resolve);
            });
          });

          const buffer: Buffer = fs.readFileSync(`${__dirname}/test/${otherFilename}`);

          const postId: string = await logic.createPost(otherUsername, otherFilename, buffer);

          const post: PostModelInterface = await Post.findById(postId);

          const savedPost = new SavedPost();
          savedPost.post = post._id;
          savedPost.createdAt = new Date();

          savedPosts.push(savedPost);
        }

        targetUser.savedPosts = savedPosts;

        await targetUser.save();
      });

      afterEach(() => {
        rimraf.sync("test");
      });

      test("should list the saved posts of a public user seeing him by a logged-in user", () => {
        return logic.listUserSavedPosts(username, targetUsername)
          .then((savedPosts: SavedPostModelInterface[]) => {
            expect(savedPosts).toHaveLength(4);
          });
      });

      test("should list the saved posts of a public user seeing him by a user not logged in", () => {
        return logic.listUserSavedPosts(undefined, targetUsername)
          .then((savedPosts: PostModelInterface[]) => {
            expect(savedPosts).toHaveLength(4);
          });
      });

      test("should list the saved posts of a private user seeing him by a logged-in follower user", () => {
        targetUser.privateAccount = true;

        return targetUser.save()
          .then((targetUser: UserModelInterface) => {
            const following = new Following();
            following.user = targetUser._id;
            following.createdAt = new Date();

            user.followings.push(following);

            return user.save();
          })
          .then((user: UserModelInterface) => {
            const follower = new Follower();
            follower.user = user._id;
            follower.createdAt = new Date();

            targetUser.followers.push(follower);

            return targetUser.save();
          })
          .then((targetUser: UserModelInterface) => logic.listUserSavedPosts(username, targetUsername))
          .then((savedPosts: SavedPostModelInterface[]) => expect(savedPosts).toHaveLength(4));
      });

      test("should fail on trying to retrieve a list the saved posts of a private user " +
        "seeing him by a logged-in user not follower", () => {
          targetUser.privateAccount = true;

          return targetUser.save()
            .then((targetUser: UserModelInterface) => {
              expect(() => logic.listUserSavedPosts(username, targetUsername)).toThrowError(AccessDeniedError);
              expect(() => logic.listUserSavedPosts(username, targetUsername))
                .toThrowError(`user ${username} can not see the saved posts of user ${targetUsername}`);
            });
        });

      test("should fail on trying to retrieve a list the saved posts of a private user " +
        "seeing him by a user not logged in", () => {
          targetUser.privateAccount = true;

          return targetUser.save()
            .then((targetUser: UserModelInterface) => {
              expect(() => logic.listUserSavedPosts(undefined, targetUsername)).toThrowError(AccessDeniedError);
              expect(() => logic.listUserSavedPosts(undefined, targetUsername))
                .toThrowError(`user not logged in can not see the saved posts of user ${targetUsername}`);
            });
        });
    });

    describe("user", () => {
      beforeEach(async () => {
        fs.mkdirSync("test");

        const savedPosts: SavedPostModelInterface[] = [];

        for (let i = 0; i < 4; i++) {
          otherFilename = `${otherUsername}-${i}.png`;

          await new Promise((resolve, reject) => {
            return new Jimp(256, 256, 0xff0000ff, (err: any, image: any) => {
              if (err) { return reject(err); }

              image.write(`${__dirname}/test/${otherFilename}`, resolve);
            });
          });

          const buffer: Buffer = fs.readFileSync(`${__dirname}/test/${otherFilename}`);

          const postId: string = await logic.createPost(otherUsername, otherFilename, buffer);

          const post: PostModelInterface = await Post.findById(postId);

          const savedPost = new SavedPost();
          savedPost.post = post._id;
          savedPost.createdAt = new Date();

          savedPosts.push(savedPost);
        }

        user.savedPosts = savedPosts;

        await user.save();
      });

      afterEach(() => {
        rimraf.sync("test");
      });

      test("should list the saved posts of the logged-in user", () => {
        return logic.listUserSavedPosts(username)
          .then((savedPosts: SavedPostModelInterface[]) => expect(savedPosts).toHaveLength(4));
      });
    });
  });

  describe("list user wall", () => {
    let user: UserModelInterface;
    let filename: string;
    let targetUsername: string;
    let targetEmail: string;
    let targetPassword: string;
    let targetFilename: string;
    let targetUser: UserModelInterface;

    beforeEach(async () => {
      fs.mkdirSync("test");

      user = await User.create({ username, email, password });

      targetUsername = `user-${Math.random()}`;
      targetEmail = `user-${Math.random()}@inskygram.com`;
      targetPassword = `123${Math.random()}`;
      targetFilename = `${targetUsername}.png`;

      targetUser = await User.create({ targetUsername, targetEmail, targetPassword });

      for (let i = 0; i < 4; i++) {
        targetFilename = `${targetFilename}-${i}.png`;

        await new Promise((resolve, reject) => {
          return new Jimp(256, 256, 0xff0000ff, (err: any, image: any) => {
            if (err) { return reject(err); }

            image.write(`${__dirname}/test/${targetFilename}`, resolve);
          });
        });

        const buffer = fs.readFileSync(`${__dirname}/test/${targetFilename}`);

        await logic.createPost(targetUsername, targetFilename, buffer);
      }

      filename = `${username}.png`;

      await new Promise((resolve, reject) => {
        return new Jimp(256, 256, 0xff0000ff, (err: any, image: any) => {
          if (err) { return reject(err); }

          image.write(`${__dirname}/test/${filename}`, resolve);
        });
      });

      const buffer = fs.readFileSync(`${__dirname}/test/${filename}`);

      await logic.createPost(username, filename, buffer);
    });

    afterEach(() => {
      rimraf.sync("test");
    });

    test("should list wall of the logged-in user", () => {
      return Promise.resolve()
        .then(() => {
          const following = new Following();
          following.user = targetUser._id;
          following.createdAt = new Date();

          user.followings.push(following);

          return user.save();
        })
        .then((user: UserModelInterface) => {
          const follower = new Follower();
          follower.user = user._id;
          follower.createdAt = new Date();

          targetUser.followers.push(follower);

          return targetUser.save();
        })
        .then((targetUser: UserModelInterface) => {
          return logic.listUserWall(username)
            .then((posts: PostModelInterface[]) => expect(posts).toHaveLength(5));
        });
    });

    // TODO: test wall with pagination
  });

  describe("add comment to post", () => {
    let user: UserModelInterface;
    let filename: string;
    let targetUsername: string;
    let targetEmail: string;
    let targetPassword: string;
    let targetFilename: string;
    let targetUser: UserModelInterface;
    let targetPostId: string;
    let postId: string;

    beforeEach(async () => {
      fs.mkdirSync("test");

      user = await User.create({ username, email, password });

      targetUsername = `user-${Math.random()}`;
      targetEmail = `user-${Math.random()}@inskygram.com`;
      targetPassword = `123${Math.random()}`;
      targetFilename = `${targetUsername}.png`;

      let buffer: Buffer;

      targetUser = await User.create({ targetUsername, targetEmail, targetPassword });

      targetFilename = `${targetFilename}.png`;

      await new Promise((resolve, reject) => {
        return new Jimp(256, 256, 0xff0000ff, (err: any, image: any) => {
          if (err) { return reject(err); }

          image.write(`${__dirname}/test/${targetFilename}`, resolve);
        });
      });

      buffer = fs.readFileSync(`${__dirname}/test/${targetFilename}`);

      targetPostId = await logic.createPost(targetUsername, targetFilename, buffer);

      filename = `${username}.png`;

      await new Promise((resolve, reject) => {
        return new Jimp(256, 256, 0xff0000ff, (err: any, image: any) => {
          if (err) { return reject(err); }

          image.write(`${__dirname}/test/${filename}`, resolve);
        });
      });

      buffer = fs.readFileSync(`${__dirname}/test/${filename}`);

      postId = await logic.createPost(username, filename, buffer);
    });

    afterEach(() => {
      rimraf.sync("test");
    });

    test("should add comment correctly to post of same user", () => {
      const description = "Lorem ipsum...";
      return logic.addCommentToPost(username, postId, description)
        .then((res: boolean) => expect(res).toBeTruthy());
    });

    test("should add comment correctly to post of a following user", () => {
      const description = "Lorem ipsum...";
      return logic.addCommentToPost(username, targetPostId, description)
        .then((res: boolean) => expect(res).toBeTruthy());
    });
  });

  describe("toggle like post", () => {
    let user: UserModelInterface;
    let filename: string;
    let targetUsername: string;
    let targetEmail: string;
    let targetPassword: string;
    let targetFilename: string;
    let targetUser: UserModelInterface;
    let targetPostId: string;
    let postId: string;

    beforeEach(async () => {
      fs.mkdirSync("test");

      user = await User.create({ username, email, password });

      targetUsername = `user-${Math.random()}`;
      targetEmail = `user-${Math.random()}@inskygram.com`;
      targetPassword = `123${Math.random()}`;
      targetFilename = `${targetUsername}.png`;

      let buffer: Buffer;

      targetUser = await User.create({ targetUsername, targetEmail, targetPassword });

      targetFilename = `${targetFilename}.png`;

      await new Promise((resolve, reject) => {
        return new Jimp(256, 256, 0xff0000ff, (err: any, image: any) => {
          if (err) { return reject(err); }

          image.write(`${__dirname}/test/${targetFilename}`, resolve);
        });
      });

      buffer = fs.readFileSync(`${__dirname}/test/${targetFilename}`);

      targetPostId = await logic.createPost(targetUsername, targetFilename, buffer);

      filename = `${username}.png`;

      await new Promise((resolve, reject) => {
        return new Jimp(256, 256, 0xff0000ff, (err: any, image: any) => {
          if (err) { return reject(err); }

          image.write(`${__dirname}/test/${filename}`, resolve);
        });
      });

      buffer = fs.readFileSync(`${__dirname}/test/${filename}`);

      postId = await logic.createPost(username, filename, buffer);
    });

    afterEach(() => {
      rimraf.sync("test");
    });

    test("should do like correctly to post of same user", () => {
      return logic.toggleLikePost(username, postId)
        .then((res: boolean) => expect(res).toBeTruthy());
    });

    test("should do unlike correctly to post of same user", () => {
      return logic.toggleLikePost(username, postId)
        .then((res: boolean) => logic.toggleLikePost(username, postId))
        .then((res: boolean) => expect(res).toBeTruthy());
    });

    test("should do like correctly to post of a following user", () => {
      return logic.toggleLikePost(username, targetPostId)
        .then((res: boolean) => expect(res).toBeTruthy());
    });

    test("should do unlike correctly to post of a following user", () => {
      return logic.toggleLikePost(username, targetPostId)
        .then((res: boolean) => logic.toggleLikePost(username, targetPostId))
        .then((res: boolean) => expect(res).toBeTruthy());
    });
  });

  describe("toggle save post", () => {
    let user: UserModelInterface;
    let filename: string;
    let targetUsername: string;
    let targetEmail: string;
    let targetPassword: string;
    let targetFilename: string;
    let targetUser: UserModelInterface;
    let targetPostId: string;
    let postId: string;

    beforeEach(async () => {
      fs.mkdirSync("test");

      user = await User.create({ username, email, password });

      targetUsername = `user-${Math.random()}`;
      targetEmail = `user-${Math.random()}@inskygram.com`;
      targetPassword = `123${Math.random()}`;
      targetFilename = `${targetUsername}.png`;

      let buffer: Buffer;

      targetUser = await User.create({ targetUsername, targetEmail, targetPassword });

      targetFilename = `${targetFilename}.png`;

      await new Promise((resolve, reject) => {
        return new Jimp(256, 256, 0xff0000ff, (err: any, image: any) => {
          if (err) { return reject(err); }

          image.write(`${__dirname}/test/${targetFilename}`, resolve);
        });
      });

      buffer = fs.readFileSync(`${__dirname}/test/${targetFilename}`);

      targetPostId = await logic.createPost(targetUsername, targetFilename, buffer);

      filename = `${username}.png`;

      await new Promise((resolve, reject) => {
        return new Jimp(256, 256, 0xff0000ff, (err: any, image: any) => {
          if (err) { return reject(err); }

          image.write(`${__dirname}/test/${filename}`, resolve);
        });
      });

      buffer = fs.readFileSync(`${__dirname}/test/${filename}`);

      postId = await logic.createPost(username, filename, buffer);
    });

    afterEach(() => {
      rimraf.sync("test");
    });

    test("should save post correctly to post of same user", () => {
      return logic.toggleSavePost(username, postId)
        .then((res: boolean) => expect(res).toBeTruthy());
    });

    test("should remove post saved correctly to post of same user", () => {
      return logic.toggleSavePost(username, postId)
        .then((res: boolean) => logic.toggleSavePost(username, postId))
        .then((res: boolean) => expect(res).toBeTruthy());
    });

    test("should save post correctly to post of following user", () => {
      return logic.toggleSavePost(username, targetPostId)
        .then((res: boolean) => expect(res).toBeTruthy());
    });

    test("should remove post saved correctly to post of following user", () => {
      return logic.toggleSavePost(username, targetPostId)
        .then((res: boolean) => logic.toggleSavePost(username, targetPostId))
        .then((res: boolean) => expect(res).toBeTruthy());
    });

    // TODO test more in depth
    // TODO test pagination

  });

  describe("list popular posts", () => {
    let user: UserModelInterface;
    let filename: string;
    
    let targetUser: UserModelInterface;
    let targetUsername: string;
    let targetEmail: string;
    let targetPassword: string;
    let targetFilename: string;
    
    let privateUser: UserModelInterface;
    let privateUsername: string;
    let privateEmail: string;
    let privatePassword: string;
    let privateFilename: string;

    beforeEach(async () => {
      fs.mkdirSync("test");

      user = await User.create({ username, email, password });

      targetUsername = `user-${Math.random()}`;
      targetEmail = `user-${Math.random()}@inskygram.com`;
      targetPassword = `123${Math.random()}`;
      targetFilename = `${targetUsername}.png`;

      let buffer: Buffer;

      targetUser = await User.create({ targetUsername, targetEmail, targetPassword });

      targetFilename = `${targetFilename}.png`;

      await new Promise((resolve, reject) => {
        return new Jimp(256, 256, 0xff0000ff, (err: any, image: any) => {
          if (err) { return reject(err); }

          image.write(`${__dirname}/test/${targetFilename}`, resolve);
        });
      });

      buffer = fs.readFileSync(`${__dirname}/test/${targetFilename}`);

      await logic.createPost(targetUsername, targetFilename, buffer);

      filename = `${username}.png`;

      await new Promise((resolve, reject) => {
        return new Jimp(256, 256, 0xff0000ff, (err: any, image: any) => {
          if (err) { return reject(err); }

          image.write(`${__dirname}/test/${filename}`, resolve);
        });
      });

      buffer = fs.readFileSync(`${__dirname}/test/${filename}`);

      await logic.createPost(username, filename, buffer);

      privateUsername = `user-${Math.random()}`;
      privateEmail = `user-${Math.random()}@inskygram.com`;
      privatePassword = `123${Math.random()}`;
      privateFilename = `${privateUsername}.png`;

      privateUser = await User.create({ privateUsername, privateEmail, privatePassword });

      privateFilename = `${privateFilename}.png`;

      await new Promise((resolve, reject) => {
        return new Jimp(256, 256, 0xff0000ff, (err: any, image: any) => {
          if (err) { return reject(err); }

          image.write(`${__dirname}/test/${privateFilename}`, resolve);
        });
      });

      buffer = fs.readFileSync(`${__dirname}/test/${privateFilename}`);

      await logic.createPost(privateUsername, privateFilename, buffer);
    });

    afterEach(() => {
      rimraf.sync("test");
    });

    test("should list popular posts correctly of only the public users", () => {
      return logic.listPopularPosts()
        .then((posts: PostModelInterface) => expect(posts).toHaveLength(2));
    });

    // TODO test more in depth
    // TODO test pagination
  });

  describe("search", () => {
    let user: UserModelInterface;
    
    let targetUser: UserModelInterface;
    let targetUsername: string;
    let targetEmail: string;
    let targetPassword: string;
    let targetFilename: string;
    
    let privateUser: UserModelInterface;
    let privateUsername: string;
    let privateEmail: string;
    let privatePassword: string;
    let privateFilename: string;

    beforeEach(async () => {
      user = await User.create({ username, email, password });

      targetUsername = `user-${Math.random()}`;
      targetEmail = `user-${Math.random()}@inskygram.com`;
      targetPassword = `123${Math.random()}`;
      targetFilename = `${targetUsername}.png`;

      targetUser = await User.create({ targetUsername, targetEmail, targetPassword });

      privateUsername = `user-${Math.random()}`;
      privateEmail = `user-${Math.random()}@inskygram.com`;
      privatePassword = `123${Math.random()}`;
      privateFilename = `${privateUsername}.png`;

      privateUser = await User.create({ privateUsername, privateEmail, privatePassword });
    });

    test("should search correctly users by username query", () => {
      return logic.search("user-")
        .then((users: UserModelInterface) => expect(users).toHaveLength(3));
    });
  });

});
