import express from "express";
import fs from "fs/promises";

const app = express();
const PORT = 3000;
const DATA_FILE = "./log.json";

app.use(express.json());

// Helper functions for data management
const getItems = async () => {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(data || "[]");
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
};

const saveItems = async (items) => {
  await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2));
};

app.get("/items", async (req, res) => {
  try {
    const items = await getItems();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Error reading items" });
  }
});

app.post("/add-todo", async (req, res) => {
  try {
    const { id, name } = req.body;
    const items = await getItems();
    const newItem = { id, name };
    items.push(newItem);
    await saveItems(items);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: "Error saving item" });
  }
});

app.get("/items/:id", async (req, res) => {
  try {
    const items = await getItems();
    const item = items.find((i) => i.id == req.params.id);
    item ? res.json(item) : res.status(404).json({ message: "Item not found" });
  } catch (err) {
    res.status(500).json({ error: "Could not read data file" });
  }
});

app.put("/items/:id", async (req, res) => {
  try {
    const items = await getItems();
    const index = items.findIndex((i) => i.id == req.params.id);
    if (index === -1)
      return res.status(404).json({ message: "Item not found" });

    items[index].name = req.body.name;
    await saveItems(items);
    res.json(items[index]);
  } catch (err) {
    res.status(500).json({ error: "Could not update data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
