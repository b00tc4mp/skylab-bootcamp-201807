import { config } from "dotenv";
import express from "express";
import connect from "./db";
import { User } from "./models";

config();
const { DATABASE_HOST, DATABASE_PORT, DATABASE_NAME } = process.env;

const db = connect(DATABASE_HOST, Number(DATABASE_PORT), DATABASE_NAME);

const user = new User();
user.username = "Giorgio pepeGiorgio pepeGiorgio pepeGiorgio pepe";
user.password = "De la Barrera";
user.email = "De la Barrera";

// user.save()
//   .catch(error => {
//     debugger;
//     console.log(error);
//   });
