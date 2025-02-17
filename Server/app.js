import express from "express";
import cors from "cors";
import dotenv from 'dotenv'

const PORT = process.env.PORT || 3000;

const app = express();

// Middleware
dotenv.config();
app.use(express.json());
app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
});
// Cors
const allowedOrigins = [
    'http://localhost:8081',
    'null'
];
app.use(cors({
    origin: function (origin, callback) {
        console.log(origin)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

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
