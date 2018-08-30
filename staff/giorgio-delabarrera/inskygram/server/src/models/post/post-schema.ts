import { Schema } from "mongoose";

const postSchema: Schema = new Schema({
  caption: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

export default postSchema;
