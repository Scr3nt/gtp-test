// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push(
  "jsx",
  "js",
  "ts",
  "tsx",
  "json",
  "svg",
  "d.ts",
  "mjs",
  "ttf",
  "otf",
);

config.resolver.assetExts.push("ttf", "otf");

module.exports = config;
