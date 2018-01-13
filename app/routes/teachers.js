import Router from 'koa-router';
import models from '../db';
import youtube from "../youtube";
import { YOUTUBE_KEY } from "../config";

const Teachers = new Router();
Teachers.prefix('/teachers');

Teachers.get('/', async (ctx) => {
    try
    {
        const teachers = await models.Teachers.findAll({
            include: [{
                model: models.Categories,
                as: 'Category'
            }]
        });

        ctx.body = teachers;
    }
    catch (err)
    {
        console.log(err);
    }
});

Teachers.get('/test', async (ctx) => {
    try
    {
        console.log(YOUTUBE_KEY);
        youtube.channels.list({
            auth: YOUTUBE_KEY,
            part: "auditDetails",
            forUsername: "UCIRd-yly3bh-RxHsfXm9-WQ"
        }, (err, response) => {
            if (err) console.log(err);
            console.log(response);
        });

        ctx.body =  null;
    }
    catch (err)
    {
        console.log(err);
    }
});

export default Teachers;