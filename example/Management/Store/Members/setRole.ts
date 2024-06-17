/**
 * Set role for the user.
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
  const member = await management.Stores.Members.setRole(
    "294562995718066176", // id of the user
    "294566566119358464", // id of the role
  );
  console.log(member);
})();
