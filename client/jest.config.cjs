module.exports = {
  testEnvironment: "jsdom",

  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],

  testMatch: ["<rootDir>/src/**/*.test.(ts|tsx)"],

  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",

      {
        tsconfig: "tsconfig.app.json",
      },
    ],
  },

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
