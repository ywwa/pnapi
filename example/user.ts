import * as dotenv from "dotenv";
import { Paynow } from "../src";
dotenv.config();

const client = new Paynow({
  access: { type: "user", key: process.env.USER_KEY! },
});

async function example() {
  const user = await client.Users.me();

  console.log(user);
}

example();
