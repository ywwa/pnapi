/**
 * Get customer by its id or steam_id
 */

import { Paynow } from "../../../src";

// Init the library
const paynow = new Paynow({
  apikey: process.env.API_KEY!,
  store_id: process.env.STORE_ID!,
});

const management = paynow.Management;

// asynchronously invoke the method
(async () => {
  const customerById = await management.Customers.lookup({
    id: "294923449837559808",
  });

  const customerBySteamId = await management.Customers.lookup({
    steam_id: "76561199133159319",
  });

  console.log(customerById);
  console.log(customerBySteamId);
})();
