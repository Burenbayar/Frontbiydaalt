
 import express, { Request, Response } from "express";
// import cors from "cors";
// import helmet from "helmet";
// import prisma from "./database"
// dotenv.config();
// const app = express();
// app.use(helmet());

// app.use(cors());
// app.use(express.json());

// app.get("/get/products",async(req:Request, res:Response) =>{
//    const result = await prisma.product.findMany();
//    res.json(result);
// });
// app.post("/product", async (req: Request, res: Response) => {
//   try {
//     const { name, price,color,size,description } = req.body;
//     const product = await prisma.product.create({
//       data: {
//         name: name,
//         price : price,
//         color: color,
//         sizes:size,
//         decription:description
//       },
//     });
//     res.json({  data: product });
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// });
// app.delete("/product",async(req:Request,res:Response)=>{
//   const {id} = req.body;
//   const product = await prisma.product.delete({
//     where:{
//       id :id,
//     }
//   });
//   res.json({success:true,data:product})
// })
// app.put("/product", async (req: Request, res: Response) => {
//   try {
//     const {id, name, price,color,size,description } = req.body;
//     const product = await prisma.product.update({
//       where:{
//         id:id
//       },
//       data: {
//         name: name,
//         price : price,
//         color: color,
//         sizes:size,
//         decription:description
//       },
//     });
//     res.json({  data: product });
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// });

import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import prisma from './database';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET

app.use(cors());
app.use(express.json());

// User Registration
app.post('/register', async (req:Request, res:Response) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await prisma.user.create({
            data: { email, password: hashedPassword }
        });
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: 'User already exists' });
    }
});

// User Login
app.post('/login', async (req:Request, res:Response) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

// Get Products
app.get('/products', async (req, res) => {
    const products = await prisma.product.findMany();
    res.json(products);
});

// Get Product by ID
app.get('/products/:id', async (req, res) => {
    const product = await prisma.product.findUnique({ where: { id: Number(req.params.id) } });
    res.json(product);
});

// Create Product
app.post('/products', async (req, res) => {
    const { name, price, color, size, quantity } = req.body;
    const product = await prisma.product.create({
        data: { name, price, color, size, quantity }
    });
    res.json(product);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));









const port = process.env.port || 3000;
app.listen(port, async () => {
  console.log(`server running on port http://localhost:${port}`);
});

module.exports = app;
