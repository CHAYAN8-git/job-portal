const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const companyRoutes = require("./routes/companyRoutes");
const jobRoutes = require("./routes/jobRoutes");
dotenv.config();

const app = express();
app.use(express.json());

connectDB();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Job Portal Backend is Running 🚀");
});
app.use("/api/users", userRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});