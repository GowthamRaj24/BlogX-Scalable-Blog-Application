import { Hono } from 'hono'
import {PrismaClient} from "@prisma/client/edge"
import { withAccelerate } from '@prisma/extension-accelerate'
import {decode , jwt, sign , verify} from "hono/jwt";
import { signupInput , signinInput } from "@gowthamraj24n/medium-common";




export const userRoutes = new Hono<{
    Bindings : {
      DATABASE_URL : string,
      JWT_TOKEN : string
    },
}>
  ();

  
const api = "api"

userRoutes.post(`/${api}/v1/signup` , async (c) => {

    const prisma = new PrismaClient({
      datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
    const success = signupInput.safeParse(body);

    if (! success){
        c.status(411)
        return c.json({error : "Inputs are not Correct"});
    }

    const exists = await prisma.user.findFirst({
      where : {
        email : body.email
      }
    })

    if (exists){
      c.status(403)
      return c.json({error: "User Already Exists"});
    }

    const user = await prisma.user.create({
      data : {
        email : body.email,
        password : body.password,
        name : body.name
      }
    })

    const token = await sign({id : user.id} ,"123000");
    c.status(200)
    return c.json({jwt : token,  message : "User Created for " + user.name});
})

userRoutes.post("/idToUser" , async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const user = await prisma.user.findFirst({
    where : {
      id : body.id
    }
  })

  if (!user){
    c.status(403)
    return c.json({user : "User does not exist"});
  }
  c.status(200)
  return c.json({user : user});
})

userRoutes.post("/JWTToUser", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const token = body.token;

  try {
    const decoded = await verify(token, "123000") as { id: string };
    const userId = decoded.id;

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ error: "User does not exist" });
    }

    c.status(200);
    return c.json({ user: user });
  } catch (error) {
    c.status(403);
    return c.json({ error: "Invalid token" });
  }

});

  
  


userRoutes.post(`/${api}/v1/signin` ,async (c) => {
    const body = await c.req.json();

    const success = signinInput.safeParse(body);

    if (! success){
        c.status(411)
        return c.json({error : "Invalid Credentials"});
    }
  
    const prisma = new PrismaClient({
      datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const user = await prisma.user.findFirst(
      {where:
        {email : body.email}
      }
    )
  
    if (!user){
      c.status(403) //Unauthorized
      return c.json({error : "User does not exist"});
    }
    if (user.password == body.password){
      const jwt = await sign({id : user.id} , "123000")
      c.status(200)
      return c.json({jwt : jwt , message : "User Signed in Successfully"})
    }
    else{
      c.status(403)
      return c.json({error : "Invalid Credentials"})
    }
})