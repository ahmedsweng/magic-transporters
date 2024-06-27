import express from "express";

const magicMoversRoutes = express.Router();

magicMoversRoutes.get("/magic-movers");
magicMoversRoutes.post("/magic-movers");
magicMoversRoutes.post("/load-movers/:id");
magicMoversRoutes.post("/start-mission/:id");
magicMoversRoutes.post("/end-mission/:id");
magicMoversRoutes.delete("/magic-movers/:id");

export default magicMoversRoutes;
