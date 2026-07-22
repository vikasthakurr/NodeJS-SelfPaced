import request from "supertest";
import app from "./app";

test("on starting of server", async () => {
  const res = await request(app).get("/");
  expect(res.status).toBe(200);
  expect(res.body).toEqual({
    message: "hello from server",
  });
});

test("on user creation", async () => {
  const res = await request(app).post("/users").send({
    name: "vikas",
  });

  expect(res.status).toBe(201);

  expect(res.body).toEqual({ name: "vikas" });
});
