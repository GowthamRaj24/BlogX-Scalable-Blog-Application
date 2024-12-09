import { Hono } from 'hono'
import {PrismaClient} from "@prisma/client/edge"
import { withAccelerate } from '@prisma/extension-accelerate'
import {decode , jwt, sign , verify} from "hono/jwt";
import { blogRoutes } from './routes/blogRoutes';
import { userRoutes } from './routes/userRoutes';

const app = new Hono<{
  Bindings : {
    DATABASE_URL : string,
    JWT_TOKEN : string
  },
}>
();


app.route("/user" , userRoutes);
app.route("/blog" , blogRoutes);

export default app;