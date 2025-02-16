import express from 'express';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { v4 as uuidv4 } from "uuid";
import { hashPassword } from './utils/auth.js';

const json_base = "http://localhost:5000/" 

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const response = await fetch(`${json_base}users`);
        const users = await response.json();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

router.post("/create", async (req, res) => {
    try {
        const { username, email, password } = req.body;
    
        if(!username || !email || !password)
            return res.status(400).send({status: "error", message: "Missing required parameters"});

        const generateRandomId = () => uuidv4();

        const newUser = {
            id: generateRandomId(),
            username,
            email,
            password: await hashPassword(password),
        };
    
        await axios.post(`${json_base}users`, newUser);
    
        return res.status(201).send({
            status: "success",
            message: "user created successfully",
        });
    } catch (error) {
        console.log(error); // dev mode
        if (error.code === 11000) {
            return res.status(409).json({
                status: "error",
                message: "email or username already exists",
            });
        }
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
            error: error.message,
        });
    }
});



export default router;