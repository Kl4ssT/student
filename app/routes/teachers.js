import Router from 'koa-router';
import models from '../db';

const Teachers = new Router();
Teachers.prefix('/teachers');

Teachers.get('/', async (ctx) => {
    try
    {
        const teach = await models.Teachers.findOne();
        ctx.body = teach;
    }
    catch (err)
    {
        console.log(err);
    }
});

export default Teachers;