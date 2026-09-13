import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import User from "../models/user.js";

async function handleCreateNewUser(req: Request, res: Response) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    const existingUser = await User.findOne({
        $or: [
            { username },
            { email }
        ]
    });

    if (existingUser) {
        return res.status(409).json({
            success: false,
            message: "Username or email already exists"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
        username,
        email,
        password: hashedPassword,
    })

    res.status(201).json({
        success: true,
        message: "User created successfully"
    });
}