const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const companyRoutes = require("./routes/companyRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const path = require("path");
const cors = require("cors");
const messageRoutes = require("./routes/messageRoutes");
const conversationRoutes = require("./routes/conversationRoutes");
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

connectDB();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Job Portal Backend is Running 🚀");
});
app.use("/api/users", userRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);



app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messageRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});