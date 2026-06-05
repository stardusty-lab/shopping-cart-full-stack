module.exports = {
  preset: "ts-jest",

  testEnvironment: "<rootDir>/jest.environment.cjs",

  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },

  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],

  testMatch: ["<rootDir>/src/**/*.test.(ts|tsx)"],

  transform: {
    "^.+\\.(ts|tsx|js|jsx|mjs)$": [
      "ts-jest",

      {
        tsconfig: "tsconfig.test.json",
      },
    ],
  },

  transformIgnorePatterns: [
    "/node_modules/(?!(@mswjs|@open-draft|msw|rettime|until-async)/)",
  ],

  moduleNameMapper: {
    "^@/configs/env$": "<rootDir>/src/configs/env.jest.ts",
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.css$": "<rootDir>/__mocks__/styleMock.js", // 이 부분 추가
  },
};
