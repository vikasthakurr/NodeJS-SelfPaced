import app from "./app";
import request from "supertest";

it("should return 201 with username while creating user", async () => {
  const res = await request(app).post("/users").send({
    name: "vikas",
  });

  expect(res.statusCode).toBe(201);

  expect(res.body.name).toBe("vikas");
});
