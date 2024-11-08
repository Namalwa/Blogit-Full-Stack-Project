import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
const client = new PrismaClient();

export const logginUsers = async (req, res) => {
    try {


        const {password, usernameoremail} = req.body
        // console.log(password, usernameoremail);

        // const { usernameoremail, password } = req.body;

        const user = await client.user.findFirst({
            where: {
                OR: [
                    { email: usernameoremail },
                    { username: usernameoremail }
                ]
            }
        });

        if (!user) {
            res.status(400).json({message: "wrong email or password"});
            return;
        }

         const passwordsMatch = await bcrypt.compare(password, user.password);
         
        if (!passwordsMatch) {
            res.status(401).json({ message: "Wrong email address or password" });
            return;
        }
        const token = jwt.sign(user.id, process.env.JWT_SECRET);

        res.status(200).cookie("authToken", token, { httpOnly: true }).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
