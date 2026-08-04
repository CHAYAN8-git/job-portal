const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const companyRoutes = require("./routes/companyRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const path = require("path");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const messageRoutes = require("./routes/messageRoutes");
const conversationRoutes = require("./routes/conversationRoutes");
dotenv.config();


const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173",
        "http://localhost:5174"],
        methods: ["GET", "POST"],
    },
});
const onlineUsers = new Map();
app.set("io", io);
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
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
io.on("connection", (socket) => {

    console.log("🟢 Connected:", socket.id);

  socket.on("join", (userId) => {

    socket.join(userId);

    onlineUsers.set(userId, socket.id);

    io.emit(
        "online-users",
        [...onlineUsers.keys()]
    );

});

   socket.on("disconnect", () => {

    for (const [userId, socketId] of onlineUsers.entries()) {

        if (socketId === socket.id) {

            onlineUsers.delete(userId);

            break;

        }

    }

    io.emit(
        "online-users",
        [...onlineUsers.keys()]
    );

});

});