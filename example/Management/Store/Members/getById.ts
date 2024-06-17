/**
 * Get specific member of the current store by its id.
 */

import { Paynow } from "../../../../src";

// Init the library
const paynow = new Paynow({
  apikey: process.env.API_KEY!,
  store_id: process.env.STORE_ID!,
});

const management = paynow.Management;

// asynchronously invoke the method
(async () => {
  const member = await management.Stores.Members.getById("294562995718066176");
  console.log(member);
})();
