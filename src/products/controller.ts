import { prisma } from "../config/database";
import { Request, Response } from "express";

export class ProductController {

    public getProduct = async (req: Request, res: Response) => {
        const id = +req.params.id;
        const product = await prisma.product.findUnique({
            where: {
                id
            }
        });
        product ? res.json(product) : res.status(404).json({ message: `Product ${id} not found` });
    }

    public getProducts = async (req: Request, res: Response) => {
        const products = await prisma.product.findMany();
        res.json({ products });
    }
    
    public createProduct = async (req: Request, res: Response) => {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Name and price are required' });
        }
        const product = await prisma.product.create({
            data: {
                name: name,
                createTime: new Date()
            }
        })
        res.json({ product });
    }

    public updateProduct = async (req: Request, res: Response) => {
        const id = +req.params.id;
        const { name } = req.body;
        const product = prisma.product.findFirst({
            where: {
                id,
            }
        });
        if (!product) res.status(404).json({ message: `Product ${id} not found` });
        const updatedProduct = await prisma.product.update({
            where: {
                id,
            },
            data: {
                name
            }
        });
        res.json({ updatedProduct });
    }
    
    public deleteProduct = async (req: Request, res: Response) => {
        const id = +req.params.id;
        const product = await prisma.product.findFirst({
            where: {
                id,
            }
        });
        if (!product) res.status(404).json({ message: `Product ${id} not found` });
        await prisma.product.delete({
            where: {
                id,
            }
        });
        res.json({ message: `DELETE Product ${id}` });
    }
}