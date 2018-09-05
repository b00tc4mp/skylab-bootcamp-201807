import { config } from "dotenv";
import "jest";
import Post, { PostModelInterface } from "../../models/post";
import User, { UserModelInterface } from "../../models/user";
import postLogic from ".";
import { connect } from "../../db";
const Jimp: any = require("jimp");
import fs from "fs";
import { Types } from "mongoose";

config();
const { DATABASE_URL_TEST } = process.env;

let db: any;
const { ObjectId } = Types;

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

describe("post", () => {
  let user: UserModelInterface;
  let caption: string;
  const filename = "post.png";

  beforeEach(() => {
    caption = `abcdef-${Math.random()}`;

    const username = `user-${Math.random()}`;
    const email = `user-${Math.random()}@inskygram.com`;
    const password = `123${Math.random()}`;

    return User.create({ username, email, password })
      .then((createdUser: UserModelInterface) => {
        user = createdUser;
        return true;
      });
  });

  describe("create", () => {
    let buffer: Buffer;

    beforeEach(() => {
      return new Promise((resolve, reject) => {
        return new Jimp(256, 256, 0xff0000ff, (err: any, image: any) => {
          if (err) { return reject(err); }

          image.write(`${__dirname}/${filename}`, resolve);
        });
      })
        .then(() => {
          buffer = fs.readFileSync(`${__dirname}/${filename}`);
        });
    });

    afterEach(() => {
      fs.unlinkSync(`${__dirname}/${filename}`);
    });

    test("should create correctly", () => {
      return postLogic.create(user.username, filename, buffer)
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
      return postLogic.create(user.username, filename, buffer, caption)
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

  describe("retrieve", () => {
    let postId: string;

    beforeEach(() => {
      return new Promise((resolve, reject) => {
        return new Jimp(256, 256, 0xff0000ff, (err: any, image: any) => {
          if (err) { return reject(err); }

          image.write(`${__dirname}/${filename}`, resolve);
        });
      })
        .then(() => {
          return fs.readFileSync(`${__dirname}/${filename}`);
        })
        .then((buffer: Buffer) => {
          return postLogic.create(user.username, filename, buffer, caption);
        })
        .then((id: string) => {
          postId = id;
          return postId;
        });
    });

    afterEach(() => {
      fs.unlinkSync(`${__dirname}/${filename}`);
    });

    test("should retrieve correctly", () => {
      return postLogic.retrieve(user.username, postId)
        .then((post: PostModelInterface) => {
          expect(post).toBeInstanceOf(Post);
          expect(post._id).toBeInstanceOf(ObjectId);
          expect(post.user).toBeInstanceOf(ObjectId);
          expect(post.imageId).toBeDefined();
          expect(post.caption).toBe(caption);
        });
    });
  });

  describe("remove", () => {
    let postId: string;

    beforeEach(() => {
      return new Promise((resolve, reject) => {
        return new Jimp(256, 256, 0xff0000ff, (err: any, image: any) => {
          if (err) { return reject(err); }

          image.write(`${__dirname}/${filename}`, resolve);
        });
      })
        .then(() => {
          return fs.readFileSync(`${__dirname}/${filename}`);
        })
        .then((buffer: Buffer) => {
          return postLogic.create(user.username, filename, buffer, caption);
        })
        .then((id: string) => {
          postId = id;
          return postId;
        });
    });

    afterEach(() => {
      fs.unlinkSync(`${__dirname}/${filename}`);
    });

    test("should remove correctly", () => {
      return postLogic.remove(user.username, postId)
        .then((res: boolean) => {
          expect(res).toBeTruthy();

          return Post.findById(postId);
        })
        .then((post: PostModelInterface) => expect(post).toBeNull());
    });
  });

  // describe("add comment", () => {
  //   let postId: string;

  //   beforeEach(() => {
  //     return new Promise((resolve, reject) => {
  //       return new Jimp(256, 256, 0xff0000ff, (err: any, image: any) => {
  //         if (err) { return reject(err); }

  //         image.write(`${__dirname}/${filename}`, resolve);
  //       });
  //     })
  //       .then(() => {
  //         return fs.readFileSync(`${__dirname}/${filename}`);
  //       })
  //       .then((buffer: Buffer) => {
  //         return postLogic.create(user.username, filename, buffer, caption);
  //       })
  //       .then((id: string) => {
  //         postId = id;
  //         return postId;
  //       });
  //   });

  //   afterEach(() => {
  //     fs.unlinkSync(`${__dirname}/${filename}`);
  //   });

  //   test("should add a comment to a post", () => {
  //     return postLogic.addComment(user.username, filename, buffer)
  //       .then((id: string) => {
  //         expect(id).toBeDefined();

  //         return Post.findById(id);
  //       })
  //       .then((post: PostModelInterface) => {
  //         expect(post).toBeInstanceOf(Post);
  //         expect(post._id).toBeInstanceOf(ObjectId);
  //         expect(post.user).toBeInstanceOf(ObjectId);
  //         expect(post.imageId).toBeDefined();
  //         expect(post.caption).toBeUndefined();
  //       });
  //   });

  //   test("should create the comment correctly", () => { });

  // });

});
