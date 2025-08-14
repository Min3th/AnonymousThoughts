import express from "express";
import { connectDB } from "./db/db";
import cors from "cors";
import thoughtRoutes from "./routes/thoughtRoutes";

const app = express();
const port = 8080;

connectDB(); // Connect to MongoDB

app.use(cors());
app.use(express.json());

app.use("/api/thoughts", thoughtRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
