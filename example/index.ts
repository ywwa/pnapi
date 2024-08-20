import * as dotenv from "dotenv";
import { Management } from "../src";

dotenv.config();

const mc = new Management({
  access: {
    type: "user",
    key: process.env.USER_KEY!,
  },
  storeId: process.env.STORE_ID!,
});

async function example() {
  const store = await mc.Stores.get();

  console.log(store);
}

example();
