import { config } from "dotenv";
import express from "express";
import connect from "./db";
import { Follower, User } from "./models";

config();
const { DATABASE_HOST, DATABASE_PORT, DATABASE_NAME } = process.env;

const db = connect(DATABASE_HOST, Number(DATABASE_PORT), DATABASE_NAME);