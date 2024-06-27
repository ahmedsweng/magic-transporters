import express from "express";

const magicItemsRoutes = express.Router();

magicItemsRoutes.get("/magic-items");
magicItemsRoutes.post("/magic-items");
magicItemsRoutes.delete("/magic-items/:id");

export default magicItemsRoutes;
