import { Schema, SchemaOptions } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { followRequestSchema } from "../follow-request";
import { followerSchema } from "../follower";
import { followingSchema } from "../following";
import { notificationSchema } from "../notification";
import { savedPostSchema } from "../saved-post";
const validate: any = require("mongoose-validator");

const options: SchemaOptions = { timestamps: true };

const emailValidator = validate({
  validator: "isEmail",
  message: "This value is not a valid email address.",
});

const userSchema: Schema = new Schema({
  username: {
    type: String,
    minlength: 1,
    maxlength: 50,
    unique: true,
    required: [true, "{PATH} is required"],
  },
  password: {
    type: String,
    required: [true, "{PATH} is required"],
  },
  name: {
    type: String,
    maxlength: 255,
  },
  email: {
    type: String,
    maxlength: 255,
    unique: true,
    required: [true, "{PATH} is required"],
    validate: emailValidator,
  },
  website: String,
  phoneNumber: {
    type: String,
    maxlength: 30,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  biography: String,
  avatar: String,
  privateAccount: Boolean,
  lastLogin: {
    type: Date,
  },
  enable: { type: Boolean, default: true },
  followers: [followerSchema],
  followings: [followingSchema],
  savedPosts: [savedPostSchema],
  notifications: [notificationSchema],
  followRequests: [followRequestSchema],
}, options);

userSchema.plugin(uniqueValidator, { message: `user with {PATH} {VALUE} already exist` });

export default userSchema;
