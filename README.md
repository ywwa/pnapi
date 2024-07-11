# Paynow API (PNAPI)

[Paynow.gg](https://paynow.gg/) Developer API Wrapper.

> :warning: Package is in very early stages of development, it is not
> recommended for production use.

## Installation

```bash
# using bun
bun add @ywwa/pnapi

# using npm
npm install @ywwa/pnapi
```

## Simple usage example

```typescript
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
```
