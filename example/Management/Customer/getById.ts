/**
 * Get customer by its id
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
  const customer = await management.Customers.getById("294923449837559808");

  console.log(customer);
})();
