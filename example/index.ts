import { config } from "dotenv";
import Paynow from "../src";

config();

const client = new Paynow({
  api_key: process.env.API_KEY!,
  store_id: process.env.STORE_ID!,
});

(async () => {
  const store = await client.Management.Stores.get();

  console.log(store);
})();
