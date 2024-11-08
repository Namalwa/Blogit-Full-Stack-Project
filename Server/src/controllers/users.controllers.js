import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();
export async function registerUser(req, res) {
    try {
        const { username, email, password, firstname, lastname } = req.body;

        if (!firstname || !lastname) {
            return res.status(400).json({ message: "First name and last name are required" });
        }

        const userExists = await client.user.findFirst({
            where: {
                OR: [
                    { email: email },
                    { username: username }
                ]
            }
        });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await client.user.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword,
                firstname: firstname,
                lastname: lastname
            }
        });

        res.status(201).json({ message: "User created successfully", user: { id: newUser.id, username: newUser.username } });
    } catch (e) {
        console.error("Error in user registration:", e);
        res.status(500).json({ message: "Something went wrong, please try again.", error: e.message });
    }
}
