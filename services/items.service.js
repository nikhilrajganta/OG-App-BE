import { Items } from "../entities/items.entity.js";

async function deleteItem(productId) {
  return await Items.delete({ productId }).go();
}

async function updateItem(existing, updateData) {
  return await Items.put({ ...existing.data, ...updateData }).go();
}

async function CreateNewItem(addProduct) {
  return await Items.create(addProduct).go();
}

async function getItemById(productId) {
  return await Items.get({ productId }).go();
}

async function getItems() {
  return await Items.scan.go();
}

export { deleteItem, updateItem, CreateNewItem, getItemById, getItems };
