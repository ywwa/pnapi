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
import Paynow from "@ywwa/pnapi";

const client = new Paynow({ api_key: "", store_id: "" });

(async () => {
    // Obtain Store Object
    const store = await client.Management.Stores.get();

    console.log(store);
})();
```
