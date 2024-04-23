# How to test

For unit tests, we use [React Native Testing Library](https://github.com/callstack/react-native-testing-library). Execute `npm run test` to run your tests (the available components already have tests written).

For end-to-end tests, we use [Maestro](https://maestro.mobile.dev/). All tests are located in the `maestro` folder. Install Maestro and run `maestro test maestro` to launch the test flows.

To create your own tests, you can use [Maestro Studio](https://maestro.mobile.dev/getting-started/maestro-studio). To do this, execute `maestro studio`.

You can also run ESLint tests to ensure code quality by executing `npm run lint`. However, [Husky](https://typicode.github.io/husky/) will perform a check before each commit to prevent pushing code with errors.

The ESLint rules are available in the `.eslintrc.js` file.
