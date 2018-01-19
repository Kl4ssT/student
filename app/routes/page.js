import Router from 'koa-router';
import models from '../db';

const Page = new Router();
Page.prefix('/page');

Page.get('/:page', async (ctx) => {
    try
    {
        const page = await models.page.findOne({
            where: {
                page: ctx.params.page
            }
        });

        ctx.body = page;
    }
    catch (e)
    {
        console.log(e);
    }

});

export default Page;