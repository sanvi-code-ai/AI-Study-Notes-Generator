require("dotenv").config();
const express = require("express");
const cors = require("cors");
const uploadRoutes = require("./routes/uploadRoutes");

console.log(process.env.GEMINI_API_KEY);

const notesRoutes = require("./routes/notesRoutes");

const app = express();


app.use(cors());
app.use(express.json());


app.use("/api/notes", notesRoutes);
app.use("/api/upload", uploadRoutes);

app.listen(5000, () => {
    console.log('Server running on port 5000');
});