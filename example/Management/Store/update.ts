/**
 * Update the current store.
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
  const updatedStore = await management.Stores.update({
    name: "New Store Name",
    slug: "new-store-slug",
  });

  console.log(updatedStore);
})();
