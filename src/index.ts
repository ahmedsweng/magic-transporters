import { PrismaClient } from "@prisma/client";
import express from "express";
import magicItemsRoutes from "./router/magic-items.router";
import magicMoversRoutes from "./router/magic-movers.router";

import dotenv from "dotenv";
dotenv.config();

export const prisma = new PrismaClient();

const app = express();

app.use(express.json());

app.use("/api/v1", magicMoversRoutes);
app.use("/api/v1", magicItemsRoutes);

app.listen(6000, () => {
  console.log(`app is listening on port ${6000}`);
});
