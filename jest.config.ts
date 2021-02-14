import { resolve } from "path";

export default {
  rootDir: resolve(__dirname),
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleFileExtensions: ["vue", "js", "json", "jsx", "ts", "tsx", "node"],
  // The alias set
  moduleNameMapper: {
    "@/(.*)$": "<rootDir>/src/$1"
  },
  preset: "ts-jest",
  testEnvironment: "jsdom",
  // The test file
  transform: {
    "^.+\\js$": "babel-jest",
    "^.+\\.(t|j)sx?$": "ts-jest"
  }
};
