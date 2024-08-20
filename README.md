# Paynow API (pnApi)

[paynow.gg](https://paynow.gg) Developer API Wrapper.

## Installation

```bash
# with NPM
npm install @ywwa/pnapi

# with BUN
bun add @ywwa/pnapi

# ... any other preferred package manager.
```

## Usage/Examples

```typescript
import { config } from "dotenv";
import { Paynow, UsersApi } from "@ywwa/pnapi";
config();

// Paynow client contains rest of the clients as well
// so you can import everything at once or import apis one by one
const paynow = new Paynow({
  auth: {
    type: "user",
    key: process.env.API_KEY,
  },
});

const usersApi = new UsersApi({
  auth: {
    type: "user",
    key: process.env.API_KEY,
  },
});

async function main() {
  // get current users profile response
  const userA = await Paynow.Users.me();

  console.log(userA);

  const userB = await Users.me();

  console.log(userB);

  /*
  Response {
    id: '123456789000000000',
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@mail.com',
    created_at: 2024-01-01T00:00:00.000Z
  }
  */
}

main();
```

## TODO:

- [ ] jsdocs. code is almost completely undocumented.
- [ ] unit tests.
- [ ] automated builds and published to npm.
- [ ] revisit dtos.
- [ ] package size?

## Note

If you encounter any issues, please [open an issue](https://github.com/ywwa/pnapi/issues).
