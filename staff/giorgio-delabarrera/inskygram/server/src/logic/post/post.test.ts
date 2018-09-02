import { config } from "dotenv";
import "jest";
import { connect, Types } from "mongoose";
import { Post } from "../../models";
import User, { UserModelInterface } from "../../models/user";
import userLogic from "../user";
import postLogic from "./post";

config();
const { DATABASE_URL_TEST } = process.env;

let db: any;

beforeAll(async () => {
  db = await connect(DATABASE_URL_TEST, { useNewUrlParser: true });
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

describe("user", () => {
  let userId: Types.ObjectId;
  let caption: string;

  beforeEach(() => {
    caption = `abcdef-${Math.random()}`;

    const username = `user-${Math.random()}`;
    const email = `user-${Math.random()}@inskygram.com`;
    const password = `123${Math.random()}`;

    return User.create({ username, email, password })
      .then((user: UserModelInterface) => {
        userId = user._id;
        return true;
      });
  });

  describe("create", () => {
    test("should create correctly", () => {
      return postLogic.create(userId)
        .then(res => expect(res).toBeTruthy());
    });
  });

});
