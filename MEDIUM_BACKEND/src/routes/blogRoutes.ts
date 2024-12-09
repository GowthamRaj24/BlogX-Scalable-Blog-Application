import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/jwt";
import { updateBlogInput, createblogInput } from "@gowthamraj24n/medium-common";


export const blogRoutes = new Hono<{
    Bindings : {
      DATABASE_URL : string,
      JWT_TOKEN : string
    },
    Variables : {
        userId : string;
    }
}>();

const api = "api"

blogRoutes.use("/*", async (c, next) => {
    const authHeader = c.req.header("authorization") || "";
    try{
        const user = await verify(authHeader, "123000");
        if (user) {
            //@ts-ignore
            c.set("userId", user.id);
            console.log("userId set for context " + user.id);
            await next();
        } else {
            c.status(403)
            return c.json({error : "You are not logged in"})
        }
    }
    catch(e){
        c.status(403)
        return c.json({error : "You are not logged in"})
    }
});



blogRoutes.post(`${api}/v1/blog` , async (c) =>{

    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
      }).$extends(withAccelerate());

    const body = await c.req.json();
    console.log("body -->" + body.title);

    const success = createblogInput.safeParse(body);

    if (!success) {
        c.status(411)
        return c.json({error : "Inputs are not Correct"})
    }

    try{
        const userID = c.get("userId");
        console.log("userId -->" +userID)
        const blog = await prisma.post.create({
            data : {
                title : body.title,
                content : body.content,
                authorId : userID
            }
        })
        c.status(200)
        return c.json({blogId : blog.id , message : "created a blog "+blog.title})
    }
    catch(e){
        c.status(400)
        return c.json({error : "Error Creating Blog "+e})
    }
})

blogRoutes.get(`/${api}/v1/blog/:id` , async (c)=> {
    const blogId =  c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const blog = await prisma.post.findFirst({
        where : {
            id : blogId
        }
    })
    return c.json({blogs : blog})
})


blogRoutes.put(`/${api}/v1/blog` , async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const success = updateBlogInput.safeParse(body);

    if (!success) {
        c.status(411)
        return c.json({error : "Inputs are not Correct"})
    }

    try{
        const blog = await prisma.post.update({
            where : {
                id : body.id
            },
            data : {
                title : body.title,
                content : body.content
            }
        })
        c.status(200)
        return c.json({blogId : blog.id , message : "Updated a blog"})
    }
    catch(e){
        return c.json({error : e})
    }
})

blogRoutes.get(`/${api}/v1/blog/:id` , async (c)=> {
    const blogId =  c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const blog = await prisma.post.findFirst({
        where : {
            id : blogId
        }
    })
    return c.json({blogs : blog})
})



blogRoutes.get("/all" ,async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogs = await prisma.post.findMany()

    return c.json({blogs : blogs})
})