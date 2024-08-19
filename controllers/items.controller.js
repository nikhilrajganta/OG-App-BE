import { Items } from "../entities/items.entity.js";
import {
  deleteItem,
  updateItem,
  CreateNewItem,
  getItems,
  getItemById,
} from "../services/items.service.js";
import { v4 as uuidv4 } from "uuid";

async function getAllItem(request, response) {
  try {
    const allItems = await getItems();
    response.send(allItems.data);
  } catch (err) {
    response.status(500).send({ msg: "Unable to get Items" });
  }
}

async function getallItemById(request, response) {
  try {
    const { id } = request.params;
    // console.log(id);
    const item = await getItemById(id);
    response.send(item.data);
  } catch (err) {
    response.status(400).send({ msg: "Unable to retrive the Item by Id" });
  }
}

async function CreateNewItemData(req, res) {
  try {
    const data = req.body;
    const addItem = {
      ...data,
      id: uuidv4(),
    };
    await CreateNewItem(addItem);
    res.send(addItem);
  } catch (err) {
    res.send({ msg: "Failed to Add the Item", err });
  }
}

async function updateItemData(request, response) {
  const { id } = request.params;
  const updateData = request.body;
  const existing = await Items.get({ id }).go();

  try {
    const final = await updateItem(existing, updateData);
    // console.log(final.data);
    response.send(final.data);
  } catch (err) {
    console.log(err);
    response.send({ msg: "Failed to Update the Item" });
  }
}

async function deleteItemData(request, response) {
  const { id } = request.params;
  getItemById(id);

  try {
    await deleteItem(id);
    response.send("Item deleted 🎉");
  } catch (err) {
    response.status(404).send("No such Item 🥲");
  }
}

export {
  getAllItem,
  getallItemById,
  CreateNewItemData,
  updateItemData,
  deleteItemData,
};
