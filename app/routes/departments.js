import Router from 'koa-router';
import models, { Sequelize } from '../db';

const Departments = new Router();
Departments.prefix('/departments');

Departments.get('/', async (ctx) => {
    try
    {
        const departments = await models.categories.findAll();

        ctx.body = departments;
    }
    catch (err)
    {
        console.log(err);
    }
});

Departments.get('/:id', async (ctx) => {
    try
    {
        const department = await models.categories.findById(ctx.params.id, {
            include: [{
                model: models.Teachers,
                as: 'Teachers'
            }]
        });

        ctx.body = department;
    }
    catch (err)
    {
        console.log(err);
    }
});

export default Departments;