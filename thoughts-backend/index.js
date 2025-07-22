const express = require("express");
const app = express();
const port = 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Node.js backend!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
