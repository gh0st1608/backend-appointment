module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: ".",

  collectCoverageFrom: [
    "src/**/*.ts",
    '!src/**/*.dto.ts' // ✅ excluye los DTOs
  ],

  /* setupFiles: [
    './test/setEnvVars.ts'
  ], */

  testMatch: [
    "**/test/**/*.spec.ts",  // Archivos unitarios terminados en .spec.ts
    "**/test/**/*.e2e-spec.ts",  // Archivos end to end .e2s-spec.ts
  ],

  coveragePathIgnorePatterns: [
    'src/.*\\.entity.ts$', // Ignora todos los archivos que terminan en .entities.ts
  ],
  
  coverageDirectory: "./coverage",
  verbose: true, // Muestra detalles de los tests en consola

  transform: {
    "^.+\\.(ts|tsx|js)$": "ts-jest",
  },
};
