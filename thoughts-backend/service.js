const express = require("express");
const connectDB = require("./db/db");
const cors = require("cors");

const app = express();
const port = 8080;

connectDB(); // Connect to MongoDB

app.use(cors());
app.use(express.json());

const thoughtRoutes = require("./routes/thoughtRoutes");
app.use("/api/thoughts", thoughtRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
