import { config } from "dotenv";
import "jest";
import { Types } from "mongoose";
import User, { UserModelInterface } from "../../models/user";
import userLogic from ".";
import { connect } from "../../db";
const Jimp: any = require("jimp");
import fs from "fs";

config();

const { DATABASE_URL_TEST } = process.env;

let db: any;
const { ObjectId } = Types;

beforeAll(async () => {
  db = await connect(DATABASE_URL_TEST);
});

beforeEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await User.deleteMany({});

  await db.disconnect();
});

describe("user", () => {
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
      return userLogic.register(username, email, password)
        .then(res => expect(res).toBeTruthy());
    });

    test("should fail on trying to register an user with the same username", () => {
      const otherEmail = `user-${Math.random()}@inskygram.com`;

      return User.create({ username, email, password })
        .then(() => userLogic.register(username, otherEmail, password))
        .catch(err => err)
        .then(({ message }) => {
          expect(message).toBe(`user with username ${username} already exists`);
        });
    });

    test("should fail on trying to register an user with the same email", () => {
      const otherUsername = `user-${Math.random()}`;

      return User.create({ username, email, password })
        .then(() => userLogic.register(otherUsername, email, password))
        .catch(err => err)
        .then(({ message }) => {
          expect(message).toBe(`user with email ${email} already exists`);
        });
    });

    test("should fail on trying to register with an undefined username", () => {
      return userLogic.register(undefined, email, password)
        .catch(err => err)
        .then(({ message }) => {
          expect(message).toBe("invalid username");
        });
    });

    test("should fail on trying to register with an undefined email", () => {
      return userLogic.register(username, undefined, password)
        .catch(err => err)
        .then(({ message }) => {
          expect(message).toBe("invalid email");
        });
    });

    test("should fail on trying to register with an undefined password", () => {
      return userLogic.register(username, email, undefined)
        .catch(err => err)
        .then(({ message }) => {
          expect(message).toBe("invalid password");
        });
    });

    test("should fail on trying to register with an empty username", () => {
      return userLogic.register("", email, password)
        .catch(err => err)
        .then(({ message }) => {
          expect(message).toBe("invalid username");
        });
    });

    test("should fail on trying to register with an empty email", () => {
      return userLogic.register(username, "", password)
        .catch(err => err)
        .then(({ message }) => {
          expect(message).toBe("invalid email");
        });
    });

    test("should fail on trying to register with an empty password", () => {
      return userLogic.register(username, email, "")
        .catch(err => err)
        .then(({ message }) => {
          expect(message).toBe("invalid password");
        });
    });

  });

  describe("authenticate", () => {
    beforeEach(() => User.create({ username, email, password }));

    test("should login correctly", () => {
      return userLogic.authenticate(username, password)
        .then(res => {
          expect(res).toBeTruthy();
        });
    });

    test("should fail on trying to login with an undefined username", () => {
      return userLogic.authenticate(undefined, password)
        .catch(err => err)
        .then(({ message }) => expect(message).toBe(`invalid username`));
    });

    test("should fail on trying to login with an empty email", () => {
      return userLogic.authenticate("", password)
        .catch(err => err)
        .then(({ message }) => expect(message).toBe(`invalid username`));
    });

    test("should fail on trying to login with an undefined password", () => {
      return userLogic.authenticate(username, undefined)
        .catch(err => err)
        .then(({ message }) => expect(message).toBe(`invalid password`));
    });

    test("should fail on trying to login with an empty password", () => {
      return userLogic.authenticate(email, "")
        .catch(err => err)
        .then(({ message }) => expect(message).toBe(`invalid password`));
    });
  });

  describe("retrieve", () => {
    beforeEach(() => User.create({ username, email, password }));

    test("should retrieve correctly", () => {
      return userLogic.retrieve(username)
        .then((user: UserModelInterface) => {
          expect(user).toBeInstanceOf(User);
          expect(user._id).toBeInstanceOf(ObjectId);
          expect(user.username).toBe(username);
          expect(user.email).toBe(email);
        });
    });
  });

  describe("update", () => {
    beforeEach(() => User.create({ username, email, password }));

    test("should update correctly", () => {
      const newEmail = `user-${Math.random()}@inskygram.com`;
      const name = `name-${Math.random()}`;
      const website = `https://www.${Math.random()}.com`;
      const phoneNumber = `${Math.random()}`;
      const gender = "male";
      const biography = `bio-${Math.random()}`;
      const privateAccount = false;

      return userLogic.update(username, newEmail, name, website, phoneNumber, gender, biography, privateAccount)
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

      return userLogic.update(username, undefined, name, website, phoneNumber, gender, biography, privateAccount)
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

      return userLogic.update(username, undefined, undefined, website, phoneNumber, gender, biography, privateAccount)
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

      return userLogic.register(newUsername, newEmail, newPassword)
        .then((res: boolean) => userLogic.update(newUsername, email))
        .catch(err => err)
        .then(({ message }) => {
          expect(message).toBe(`user with email ${email} already exists`);
        });
    });

    test("should update correctly only some fields", () => {
      const name = `name-${Math.random()}`;
      const biography = `bio-${Math.random()}`;
      const privateAccount = true;

      return userLogic.update(username, undefined, name, undefined, undefined, undefined, biography, privateAccount)
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

  describe("update password", () => {
    const newPassword = `${password}-${Math.random()}`;

    beforeEach(() => User.create({ username, email, password }));

    test("should update password correctly", () => {
      return userLogic.updatePassword(username, password, newPassword)
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

  describe("update avatar", () => {
    const filename = "avatar.png";
    let buffer: Buffer;

    beforeEach(() => {
      return User.create({ username, email, password })
        .then(() => {
          return new Promise((resolve, reject) => {
            return new Jimp(256, 256, 0xff0000ff, (err: any, image: any) => {
              if (err) { return reject(err); }

              image.write(`${__dirname}/${filename}`, resolve);
            });
          });
        })
        .then(() => {
          buffer = fs.readFileSync(`${__dirname}/${filename}`);
        });
    });

    afterEach(() => {
      fs.unlinkSync(`${__dirname}/${filename}`);
    });

    test("should update avatar correctly", () => {
      return userLogic.updateAvatar(username, filename, buffer)
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

  describe("disable", () => {
    beforeEach(() => User.create({ username, email, password }));

    test("should disable the user correctly", () => {
      return userLogic.disable(username)
        .then((res: boolean) => {
          expect(res).toBeTruthy();

          return User.findOne({ username });
        })
        .then((user: UserModelInterface) => {
          expect(user).toBeInstanceOf(User);
          expect(user.username).toBe(username);
          expect(user.enable).toBeFalsy();
        });
    });
  });

});
