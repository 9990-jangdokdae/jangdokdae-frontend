import assert from "node:assert/strict";
import test from "node:test";
import { resolveApiBase } from "./api.js";

test("uses the configured API base URL when provided", () => {
  assert.equal(resolveApiBase("https://api.example.com", "production"), "https://api.example.com");
});

test("uses localhost fallback outside production", () => {
  assert.equal(resolveApiBase(undefined, "development"), "http://localhost:8000");
});

test("throws when production API base URL is missing", () => {
  assert.throws(
    () => resolveApiBase(undefined, "production"),
    /NEXT_PUBLIC_API_BASE_URL is required in production/,
  );
});
