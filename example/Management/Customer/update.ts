/**
 * Update the customer
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
  const updatedCustomer = await management.Customers.update(
    "294923449837559808",
    {
      steam_id: "123456789",
      name: "John Doe",
      metadata: {
        fieldOne: "valueOne",
        fieldTwo: "valueTwo",
      },
    },
  );

  console.log(updatedCustomer);
})();
