import express from "express";
import magicItemsRoutes from "./router/magic-items.router";
import magicMoversRoutes from "./router/magic-movers.router";

const app = express();

app.use(express.json());

app.use("/api/v1", magicMoversRoutes);
app.use("/api/v1", magicItemsRoutes);

app.listen(5000, () => {
  console.log(`app is listening on port ${5000}`);
});
