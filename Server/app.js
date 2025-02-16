import express from "express";
import cors from "cors";

const PORT = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Check route
app.get("/", (req, res) => {
    res.send("Server is alive !");
});

// Routes
import userRoutes from './userController.js'

app.use('/api/users', userRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
