import validator from "validator";
import { User } from "../../models";
import { UserModelInterface } from "../../models/user";
import LogicError from "../error/logic-error";

const userLogic = {

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
        if (user) { throw new LogicError(`user with username ${username} already exists`); }

        return User.findOne({ email });
      })
      .then((user: UserModelInterface) => {
        if (user) { throw new LogicError(`user with email ${email} already exists`); }

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
        if (!user) { throw new LogicError(`user with username ${username} does not exists`); }

        if (user.password !== password) { throw new LogicError(`wrong password`); }

        return true;
      });
  },

  retrieve(username: string): Promise<UserModelInterface> | never {
    return Promise.resolve()
      .then(() => {
        if (!username) { throw new LogicError("invalid username"); }

        return User.findOne({ username }, { password: 0, __v: 0 });
      })
      .then((user: UserModelInterface) => user);
  },

  update(
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
        if (!user) { throw new LogicError(`user with username ${username} does not exists`); }

        if (newEmail) {
          return User.findOne({ email: newEmail })
            .then((_user: UserModelInterface) => {
              if (_user) { throw new LogicError(`user with email ${newEmail} already exists`); }

              user.email = newEmail;

              return user;
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

  updatePassword(username: string, password: string, newPassword: string): Promise<boolean> | never {
    return Promise.resolve()
      .then(() => {
        if (!username) { throw new LogicError("invalid username"); }
        if (!password) { throw new LogicError("invalid password"); }
        if (!newPassword) { throw new LogicError("invalid new password"); }

        return User.findOne({ username });
      })
      .then((user: UserModelInterface) => {
        if (!user) { throw new LogicError(`user with ${username} email does not exists`); }

        if (user.password !== password) { throw new LogicError(`wrong password`); }

        if (password === newPassword) { throw new LogicError("new password must be different to old password"); }

        user.password = newPassword;

        return user.save();
      })
      .then(() => true);
  },

  disable(username: string): Promise<boolean> | never {
    return Promise.resolve()
      .then(() => {
        if (!username) { throw new LogicError("invalid username"); }

        return User.findOne({ username });
      })
      .then((user: UserModelInterface) => {
        if (!user) { throw new LogicError(`user with ${username} email does not exists`); }

        user.enable = false;

        return user.save();
      })
      .then(() => true);
  },

};

export default userLogic;
