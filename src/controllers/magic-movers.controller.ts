import { Request, Response } from "express";
import { prisma } from "../index";

export const getMovers = async (req: Request, res: Response) => {
  try {
    const movers = await prisma.magicMover.findMany();
    res.json(movers);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching movers." });
  }
};

export const createMover = async (req: Request, res: Response) => {
  try {
    const { name, weightLimit, energy } = req.body;
    const mover = await prisma.magicMover.create({
      data: { name, weightLimit, energy },
    });
    res.json(mover);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the mover." });
  }
};

export const loadMover = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { itemIds } = req.body;

    const mover = await prisma.magicMover.findUnique({
      where: { id: Number(id) },
    });
    if (!mover) return res.status(404).json({ error: "Mover not found" });

    if (mover.questState == "ON_A_MISSION")
      return res
        .status(400)
        .json({
          error: "The mover is already on a mission, when done load again.",
        });

    const items = await prisma.magicItem.findMany({
      where: { id: { in: itemIds } },
    });

    const totalWeight = items.reduce((acc, item) => acc + item.weight, 0);

    // * FUNCTIONAL REQUIREMENT
    // * Make sure that the magic mover don't have too much to carry for efficiency
    // * by adding 5 to overcome its weightLimit
    if (totalWeight + 5 > mover.weightLimit)
      return res.status(400).json({ error: "Overweight" });

    await prisma.missionLog.create({
      data: {
        magicMoverId: mover.id,
        items: { connect: items.map((item) => ({ id: item.id })) },
        state: "LOADING",
      },
    });

    await prisma.magicMover.update({
      where: { id: mover.id },
      data: { questState: "LOADING" },
    });

    res.json({ message: "Items loaded" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while loading items." });
  }
};

export const startMission = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const mover = await prisma.magicMover.findUnique({
      where: { id: Number(id) },
    });
    if (!mover) return res.status(404).json({ error: "Mover not found" });

    if (mover.questState != "LOADING")
      return res
        .status(400)
        .json({ error: "You can't start a mission for this mover." });

    await prisma.missionLog.create({
      data: {
        magicMoverId: mover.id,
        state: "ON_A_MISSION",
      },
    });

    await prisma.magicMover.update({
      where: { id: mover.id },
      data: { questState: "ON_A_MISSION" },
    });

    res.json({ message: "Mission started" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while starting the mission." });
  }
};

export const endMission = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const mover = await prisma.magicMover.findUnique({
      where: { id: Number(id) },
    });
    if (!mover) return res.status(404).json({ error: "Mover not found" });

    if (mover.questState != "ON_A_MISSION")
      return res
        .status(400)
        .json({ error: "There is no mission started to be ended." });

    await prisma.missionLog.create({
      data: {
        magicMoverId: mover.id,
        state: "DONE",
      },
    });

    await prisma.magicMover.update({
      where: { id: mover.id },
      data: { questState: "DONE" },
    });

    res.json({ message: "Mission ended" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while ending the mission." });
  }
};

// * FUNCTIONAL REQUIREMENT
// * A simple list showing who completed the most missions.
export const topMovers = async (req: Request, res: Response) => {
  try {
    const topMovers = await prisma.magicMover.findMany({
      include: {
        missions: {
          where: { state: "DONE" },
          select: { id: true },
        },
      },
      orderBy: {
        missions: {
          _count: "desc",
        },
      },
    });

    res.json(
      topMovers.map((mover) => ({
        id: mover.id,
        name: mover.name,
        missionCount: mover.missions.length,
      }))
    );
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching top movers." });
  }
};

export const deleteMover = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.magicMover.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Mover deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the mover." });
  }
};
