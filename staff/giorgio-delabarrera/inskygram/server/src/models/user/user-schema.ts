import { Schema } from "mongoose";
import { emailValidator } from "../validators";

const userSchema: Schema = new Schema({
  username: {
    type: String,
    maxlength: 50,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    maxlength: 255,
  },
  email: {
    type: String,
    maxlength: 255,
    required: true,
    validate: emailValidator,
  },
  website: String,
  phoneNumber: {
    type: String,
    maxlength: 30,
  },
  gender: {
    type: Number,
    min: 0,
    max: 2,
    default: 0,
  },
  biography: String,
  avatar: String,
  privateAccount: Boolean,
  lastLogin: {
    type: Date,
  },
  enable: Boolean,
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
});

export default userSchema;
