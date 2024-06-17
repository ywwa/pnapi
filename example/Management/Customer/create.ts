/**
 * Create new store customer
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
  // create new customer without specifying any optional data
  const customerDefault = await management.Customers.create();

  // create new customer with all optional data
  const customerFull = await management.Customers.create({
    name: "John Doe",
    steam_id: "76561199133159319",
    metadata: {
      metafield: "metavalue",
      example: "lorem ipsum",
    },
  });

  console.log(customerDefault);
  console.log(customerFull);
})();
