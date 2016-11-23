module.exports = {
  extends: "airbnb",
  parserOptions: {
    ecmaVersion: 7,
    sourceType: "module"
  },
  ecmaFeatures: { 
    modules: true 
  },
  env: {
    "node": true
  },
  rules: {
    "no-console": 1,
    "no-unused-vars": 1,

    /* Fat arrow curly braces used */
    "arrow-body-style": ["error", "always"],

    /* Allow undefined returns due to Express res object */
    "consistent-return": 0  
  }
}
