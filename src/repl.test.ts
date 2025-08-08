import { describe, expect, test } from "vitest";

import { cleanInput } from "./repl";

describe.each([
    {
        input: "  hello  world  ",
        expected: ["hello", "world"],
    },
    {
        input: "HELLO  woRld",
        expected: ["hello", "world"],
    },
    {
        input: "hello",
        expected: ["hello"],
    },
    {
        input: "",
        expected: [],
    },
    {
        input: "The `expect` and `toHaveLength` functions are from vitest",
        expected: [
            'the',
            '`expect`',
            'and',
            '`tohavelength`',
            'functions',
            'are',
            'from',
            'vitest'
        ]
    }
])("cleanInput($input)", ({ input, expected }) => {
    test(`Expected: ${expected}`, () => {
        const actual = cleanInput(input)

        // The `expect` and `toHaveLength` functions are from vitest
        // they will fail the test if the condition is not met
        expect(actual).toHaveLength(expected.length);
        for (const i in expected) {
        // likewise, the `toBe` function will fail the test if the values are not equal
        expect(actual[i]).toBe(expected[i]);
        }
    });
});