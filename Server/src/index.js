import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { registerUser } from './controllers/users.controllers.js';

const app = express();

app.use(express.json());``
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: true, 
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true 
}));

app.use(cookieParser());

app.post("/users", validateUserInformation, registerUser);

app.listen(3000,() => console.log(`Server running...`))