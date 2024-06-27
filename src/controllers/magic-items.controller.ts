import { Request, Response } from "express";
import { prisma } from "../index";

export const getItems = async (req: Request, res: Response) => {
  try {
    const items = await prisma.magicItem.findMany();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching items." });
  }
};

export const createItem = async (req: Request, res: Response) => {
  try {
    const { name, weight } = req.body;
    const item = await prisma.magicItem.create({
      data: { name, weight },
    });
    res.json(item);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the item." });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const { itemId } = req.params;
    await prisma.magicItem.delete({
      where: { id: Number(itemId) },
    });
    res.json({ message: "Item deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the item." });
  }
};
