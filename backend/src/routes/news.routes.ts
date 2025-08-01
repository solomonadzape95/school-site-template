import {Router} from 'express'
import { createNews, getNews,getOne,updateNews,deleteNews } from '../controllers/news.controller'

const newsRoute = Router();

newsRoute.post('', createNews)
newsRoute.get('', getNews)
newsRoute.get('/:newsSlug', getOne)
newsRoute.patch('/:newsSlug', updateNews)
newsRoute.delete('/:newsSlug', deleteNews)

export default newsRoute