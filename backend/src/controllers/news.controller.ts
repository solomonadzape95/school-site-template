import { Request, Response } from "express";
import prisma from "../client"

//Creation
 export async function createNews(req:Request, res:Response){
    try{
        const news = await prisma.news.create({
            data: req.body,
        });
        res.status(201).json({
            status: true,
            message: "News Created Successfully",
            data: news
        });
    }catch(error){
        res.status(500).json({
            status:false, 
            message: "Internal Server Error"
        })
    }
}

//Fetching All
 export async function getNews(req:Request, res:Response){
    try{
        const news = await prisma.news.findMany();
        res.json({
            status: true,
            message: "News Fetched Successfully", 
            data: news
        })
    }catch(error){
        res.json({
            status: false,
            message: "iNews Fetching Faiiled"
        })
    }
}

//Fetching All
 export async function getOne(req:Request, res:Response){
    const {newsSlug} = req.params;
    try{
        const news = await prisma.news.findFirst(
            {where: {
                slug: newsSlug 
            }}
        );
        res.json({
            status: true,
            message: "News Fetched Successfully", 
            data: news
        })
    }catch(error){
        res.json({
            status: false,
            message: "News Fetching Faiiled"
        })
    }
}

//Update News
 export async function updateNews(req: Request, res: Response){
    const {newsSlug} = req.params;
    try{
    const news = await prisma.news.findFirst({
        where: {
            slug: newsSlug
        }
    });
    if(!news){
        res.status(401).json({
            status: false,
            message: "News Not Found"
        })
    }
    const updatedNews = await prisma.news.update({
        where: {
            slug: newsSlug
        },
        data: req.body
    });
    res.json({
        status: true,
        message: "News Updated Successfully",
        data: updatedNews
    })
    }catch(error){
        res.status(401).json({
            status: false,
            message: "News Not Found"
        })
    }
}

//Delete News
export async function deleteNews(req: Request, res: Response){
    const {newsSlug} = req.params;
    try{
    const news = await prisma.news.findFirst({
        where: {
            slug: newsSlug
        }
    });
    if(!news){
        res.status(401).json({
            status: false,
            message: "News Not Found"
        })
    }
    const updatedNews = await prisma.news.delete({
        where: {
            slug: newsSlug
        },
        data: req.body
    });
    res.json({
        status: true,
        message: "News Deleted Successfully",
        data: updatedNews
    })
    }catch(error){
        res.status(401).json({
            status: false,
            message: "News Not Found"
        })
    }
}
