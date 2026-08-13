require("dotenv").config();
const express = require("express");
const cors = require("cors");
const uploadRoutes = require("./routes/uploadRoutes");



const notesRoutes = require("./routes/notesRoutes");

const app = express();


app.use(cors());
app.use(express.json());


app.use("/api/notes", notesRoutes);
app.use("/api/upload", uploadRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});