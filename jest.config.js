module.exports = {
    preset: 'react-native',
    "roots": [
        "<rootDir>/"
    ],
    "globals": {
        "ts-jest": {
            "tsConfigFile": "tsconfig.jest.json"
        }
    },
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    "setupFiles": [
        "./__tests__/setup.js"
    ],
    "transformIgnorePatterns": [
        "node_modules/(?!react-native|react-navigation|react-native-gesture-handler)/"
    ]
}