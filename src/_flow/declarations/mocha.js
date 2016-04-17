// Mocha is the test framework we're using; it exposes a few global functions

// a group of test cases
declare function describe(name: string, testCases: () => void): void;

// a unit test case
declare function it(description: string, assertion: () => void): void;
