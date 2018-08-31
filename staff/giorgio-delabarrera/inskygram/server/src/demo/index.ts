import { config } from "dotenv";
import express from "express";
import connect from "../db";
import { Follower, User } from "../models";

config();
const { DATABASE_HOST, DATABASE_PORT, DATABASE_NAME } = process.env;

const db = connect(DATABASE_HOST, Number(DATABASE_PORT), DATABASE_NAME);

// const user = new User();
// user.username = "giorgio";
// user.password = "123456";
// user.email = "giorgiodelabarrera@gmail.com";
// User.create(user);

// User.findOne({ username: "jacob" })
//   .then(jacob => {
//     User.findOne({ username: "giorgio" }).then(giorgio => {
//       const follower = new Follower({ user: jacob });
//       giorgio.followers.push(follower);
//       giorgio.save()
//         .then(gio => {
//           debugger;
//           console.log(gio);
//         })
//         .catch(err => {
//           debugger;
//           console.log(err);
//         });
//     });
//   });
