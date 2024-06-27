import express from "express";
import {
  createMover,
  deleteMover,
  endMission,
  getMovers,
  loadMover,
  startMission,
  topMovers,
} from "../controllers/magic-movers.controller";

const magicMoversRoutes = express.Router();

magicMoversRoutes.get("/movers", getMovers);
magicMoversRoutes.post("/movers", createMover);
magicMoversRoutes.post("/load-movers/:id", loadMover);
magicMoversRoutes.post("/start-mission/:id", startMission);
magicMoversRoutes.post("/end-mission/:id", endMission);
magicMoversRoutes.get("/top-movers", topMovers);
magicMoversRoutes.delete("/movers/:id", deleteMover);

export default magicMoversRoutes;
