import express from "express";
import {
  createItem,
  deleteItem,
  getItems,
} from "../controllers/magic-items.controller";

const magicItemsRoutes = express.Router();

magicItemsRoutes.get("/items", getItems);
magicItemsRoutes.post("/items", createItem);
magicItemsRoutes.delete("/items/:id", deleteItem);

export default magicItemsRoutes;
