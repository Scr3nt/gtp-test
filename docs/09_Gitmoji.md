# Gitmoji

Personally, I use [Gitmoji](https://gitmoji.dev/) for my commits.

It allows me to quickly visualize the changes I'm going to push to production during a release.

To configure Gitmoji:

```bash
npm i -g gitmoji-cli

gitmoji -g
? Enable automatic "git add ." Yes
? Select how emojis should be used in commits :smile:
? Enable scope prompt Yes
? Set gitmojis api url https://gitmoji.dev/api/gitmojis

gitmoji -c
? Choose a gitmoji: ➕  - Add a dependency.
? Enter the scope of current changes:
? Enter the commit title [15/48]: Add Expo Router
? Enter the commit message:
```
