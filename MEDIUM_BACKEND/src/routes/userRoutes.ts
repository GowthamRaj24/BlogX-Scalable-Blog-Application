import { Hono } from 'hono'
import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, jwt, sign, verify } from "hono/jwt"
import { signupInput, signinInput } from "@gowthamraj24n/medium-common"
import * as bcrypt from 'bcryptjs';

export const userRoutes = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_TOKEN: string
    },
}>();

const api = "api"
const SALT_ROUNDS = 10

userRoutes.post(`/${api}/v1/signup`, async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const success = signupInput.safeParse(body);

    if (!success) {
        c.status(411)
        return c.json({ error: "Inputs are not Correct" });
    }

    const exists = await prisma.user.findFirst({
        where: {
            email: body.email
        }
    })

    if (exists) {
        c.status(403)
        return c.json({ error: "User Already Exists" });
    }

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(body.password, SALT_ROUNDS);

    const user = await prisma.user.create({
        data: {
            email: body.email,
            password: hashedPassword,
            name: body.name
        }
    })

    const token = await sign({ id: user.id }, "123000");
    c.status(200)
    return c.json({ jwt: token, message: "User Created for " + user.name });
})

userRoutes.post(`/${api}/v1/signin`, async (c) => {
    const body = await c.req.json();
    const success = signinInput.safeParse(body);

    if (!success) {
        c.status(411)
        return c.json({ error: "Invalid Credentials" });
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const user = await prisma.user.findFirst({
        where: {
            email: body.email
        }
    })

    if (!user) {
        c.status(403)
        return c.json({ error: "User does not exist" });
    }

    // Compare password with hashed password
    const passwordMatch = await bcrypt.compare(body.password, user.password);

    if (passwordMatch) {
        const jwt = await sign({ id: user.id }, "123000")
        c.status(200)
        return c.json({ jwt: jwt, message: "User Signed in Successfully" })
    } else {
        c.status(403)
        return c.json({ error: "Invalid Credentials" })
    }
})

userRoutes.post(`/${api}/v1/reset-password`, async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const { email, newPassword } = await c.req.json();

    try {
        // Hash the new password before updating
        const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

        const user = await prisma.user.update({
            where: { email },
            data: { password: hashedPassword }
        });

        c.status(200);
        return c.json({ message: "Password updated successfully" });
    } catch (error) {
        c.status(500);
        return c.json({ error: "Error updating password" });
    }
});
