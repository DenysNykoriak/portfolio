/* eslint-disable @typescript-eslint/no-var-requires */
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import("jest").Config} */
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleDirectories: ["node_modules", "<rootDir>/__tests__/**/*"],
  testMatch: ["<rootDir>/__tests__/**/*.test.(ts|tsx)"],
  testEnvironment: "jest-environment-jsdom",
  collectCoverage: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["<rootDir>/__tests__"],
};

module.exports = createJestConfig(customJestConfig);
