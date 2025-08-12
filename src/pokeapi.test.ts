import { describe, expect, test } from "vitest";
import { Cache } from "./pokecache.js";

test.concurrent.each([
  {
    key: "https://example.com",
    val: "testdata",
    interval: 2500, // 2/2 second
  },
  {
    key: "https://example.com/path",
    val: "moretestdata",
    interval: 4000, // 4 second
  },
])("Test Caching $interval ms", async ({ key, val, interval }) => {
  const cache = new Cache(interval);

  cache.add(key, val);
  const cached = cache.get(key);
  expect(cached).toBe(val);

  await new Promise((resolve) => setTimeout(resolve, interval + 100));
  const reaped = cache.get(key);
  expect(reaped).toBe(undefined);

  cache.stopReapLoop();
});