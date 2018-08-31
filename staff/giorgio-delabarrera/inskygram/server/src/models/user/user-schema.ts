import { Schema, SchemaOptions } from "mongoose";
import { followRequestSchema } from "../follow-request";
import { followerSchema } from "../follower";
import { followingSchema } from "../following";
import { notificationSchema } from "../notification";
import { savedPostSchema } from "../saved-post";
import { emailValidator } from "../validators";

const options: SchemaOptions = { timestamps: true };

const userSchema: Schema = new Schema({
  username: {
    type: String,
    maxlength: 50,
    unique: true,
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
    unique: true,
    required: true,
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
  enable: Boolean,
  followers: [followerSchema],
  followings: [followingSchema],
  savedPosts: [savedPostSchema],
  notifications: [notificationSchema],
  followRequests: [followRequestSchema],
}, options);

export default userSchema;
