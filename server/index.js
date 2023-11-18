import express from "express";
import cors from "cors";
import { PORT } from "./config.js";

import asientoRoutes from "./routes/asientos.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(asientoRoutes);

app.listen(PORT);
console.log(`Server is listening on port ${PORT}`);