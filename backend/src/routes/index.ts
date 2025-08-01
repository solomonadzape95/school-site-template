import { Router } from "express";
import newsRoute from './news.routes'

const indexRoute = Router();

indexRoute.get("", async(req,res) => {
    res.json({message: "Welcome User"})
})

indexRoute.use("/news", newsRoute)

export default indexRoute