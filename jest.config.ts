import { resolve } from "path";

export default {
  rootDir: resolve(__dirname),
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleFileExtensions: ["vue", "js", "json", "jsx", "ts", "tsx", "node"],
  // The alias set
  moduleNameMapper: {
    "\\.css$": "<rootDir>/src/__mocks__/styleMock.ts",
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
