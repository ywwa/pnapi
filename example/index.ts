import { config } from "dotenv";
import Paynow from "../src";

config();

const main = async () => {
  const client = new Paynow();
  client.config = {
    auth: { type: "apikey", key: process.env.API_KEY },
    store_id: process.env.STORE_ID,
  };

  const store = await client.Management.Stores.get();

  console.log(store);
};

main();
