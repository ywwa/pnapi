import { faker } from "@faker-js/faker";
import { config } from "dotenv";
import Paynow from "../../src";
config();

const client = new Paynow({
  api_key: process.env.API_KEY!,
  store_id: process.env.STORE_ID!,
});

const store = client.Management.Stores;

describe("Management Store API", () => {
  it("Get Store Object", async () => {
    const response = await store.get();

    expect(response).toHaveProperty("id", process.env.STORE_ID!);
  });

  it("Update Store data", async () => {
    const storeName = faker.company.name();

    const response = await store.update({
      name: storeName,
    });

    expect(response.name).toBe(storeName);
  });
});
