import { describe, it, expect } from "vitest";
import { progress, users } from "./schema";
import { getTableColumns } from "drizzle-orm";

describe("db schema", () => {
  it("progress a la clé métier attendue", () => {
    const cols = Object.keys(getTableColumns(progress));
    expect(cols).toEqual(expect.arrayContaining(["userId", "moduleSlug", "lessonSlug", "completedAt", "quizScore", "quizTotal"]));
  });
  it("users expose email", () => {
    expect(Object.keys(getTableColumns(users))).toContain("email");
  });
});
