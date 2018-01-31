# Contributing

Contributions are always welcome. To give you an overview over the modules an the usage of it, please check the following table.

| File               | Description                                        |
|--------------------|----------------------------------------------------|
| boilerplate.js     | Creates `src/store/modules` if not present         |
| construct.js       | Creates all entity files like actions and getters  |
| initialize.js      | Creates the store                                  |
| interpreter.js     | Handles the command line configuration             |
| replace.js         | Replaces the entity inside a module file           |
| write.js           | Writes a given string into a file                  |

## Tests

Run tests with:

```bash
$ npm run test
```