module.exports = {
    globals: {
        "ts-jest": {
            tsConfig: "tsconfig.json"
        }
    },
    moduleFileExtensions: [
        'ts', 'tsx', 'js', 'jsx', 'json', 'node'
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    testMatch: [
        "**/test/**/*.test.(ts|js)"
    ],
    testEnvironment: "node"
};