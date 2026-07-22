import sum from "./sum.js";
// console.log(sum)
test("sum of two positive number", () => {
  expect(sum(4, 5)).toBe(9);
});
test("sum of two negative number", () => {
  expect(sum(-4, -4)).toBe(-9);
});
test("sum of two zeros", () => {
  expect(sum(0, 0)).toBe(0);
});

// it("add two number", () => {
//   expect(sum(4, 5)).toBe(9);
// });
