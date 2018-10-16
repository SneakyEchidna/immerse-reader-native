module.exports = {
  "parser": "babel-eslint",
    "extends":[  "airbnb" , "prettier"],
    plugins: ["prettier", "react", "import"],
    rules: {
      indent: ["error", 2],
      quotes: ["error", "single"],
      semi: ["error", "always"]
    }
};
