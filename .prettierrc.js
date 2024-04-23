module.exports = {
  importOrder: ["<THIRD_PARTY_MODULES>", "^[@/]", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ["@trivago/prettier-plugin-sort-imports"],
};
