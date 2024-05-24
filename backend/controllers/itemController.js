import asyncHandler from "../middlewares/asyncHandler.js";
import Item from "../models/Item.js";

const addItem = asyncHandler(async (req, res) => {
  const { name, description, date } = req.body;

  try {
    const newItem = new Item({
      name,
      description,
      date,
    });

    await newItem.save();

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const editItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, date } = req.body;

  try {
    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    item.name = name;
    item.description = description;
    item.updatedAt = Date.now();

    await item.save();

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const deleteItem = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findByIdAndDelete(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getItem = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getAllItems = asyncHandler(async (req, res) => {
  try {
    const items = await Item.find();

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export { addItem, editItem, deleteItem, getItem, getAllItems };
