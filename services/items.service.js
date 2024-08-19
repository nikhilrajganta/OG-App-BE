import { Items } from "../entities/items.entity.js";

async function deleteItem(id) {
  return await Items.delete({ id }).go();
}

async function updateItem(existing, updateData) {
  return await Items.put({ ...existing.data, ...updateData }).go();
}

async function CreateNewItem(addProduct) {
  return await Items.create(addProduct).go();
}

async function getItemById(id) {
  return await Items.get({ id }).go();
}

async function getItems() {
  return await Items.scan.go();
}

export { deleteItem, updateItem, CreateNewItem, getItemById, getItems };
