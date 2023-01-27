const config = {
  collectCoverageFrom: [
    "src/**/*.js",
    "!src/index.js", // files you need to avoid in test coverage
    "!src/hooks/*.js",
    "!src/context/*.js",
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  coverageReporters: ["html", "text"],
};

module.exports = config;
