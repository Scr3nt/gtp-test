# Upgrade dependencies

I recommend checking for new updates to dependencies every week (I highly recommend to use dependabot to not forget to update)

To do this, I use [npm-check-updates](https://www.npmjs.com/package/npm-check-updates).

In your terminal, run this command: `npx npm-check-updates --interactive --format group`

This will allow you to see which dependencies need to be updated and their importance (--format group). Additionally, you can directly select the dependencies you want to update or leave unchanged (--interactive).

Don't forget to run `npx expo-doctor@latest` to assure the compatibility with the last version of expo
