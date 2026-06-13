import express from "express";

const app = express();
app.use(express.json());

const PORT = 3000;
const items = [
  { id: 1, name: "vikas" },
  { id: 2, name: "gfg" },
];

//get route
app.get("/items", (req, res) => {
  res.status(200).json(items);
});

app.get("/items/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = items.find((item) => item.id === id);
  if (!item) return res.status(404).json({ error: "item not found" });
  res.status(200).json(item);
});

//create route

app.post("/items", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "enter valid name" });
  const newItem = {
    id: items.length + 1,
    name,
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.put("/items/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = items.find((item) => item.id === id);
  if (!item) return res.status(404).json({ error: "item is not available" });

  item.name = req.body.name;
  res.status(200).json({ message: "user updated" });
});

app.delete("/items/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return res.status(404).json({ error: "item not found" });
  items.splice(index, 1);
  res.status(200).json({ message: "user deleted successfuly" });
});
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
