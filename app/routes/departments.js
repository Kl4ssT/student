import Router from 'koa-router';
import models, { Sequelize } from '../db';
import authMiddleware from "../middlewares/auth";
import path from 'path';
import fs from 'fs';
import uniqid from 'uniqid';

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

Departments.post('/', authMiddleware, async (ctx) => {
    try
    {
        const data = ctx.request.body;

        const names = {
            icon: uniqid(),
            photo: uniqid()
        };

        for (let key in data.files) {
            const file = data.files[key];
            const filePath = path.join(__dirname, '..', '..', 'assets', names[key] + file.name);
            const reader = fs.createReadStream(file.path);
            const writer = fs.createWriteStream(filePath);
            reader.pipe(writer);
        }

        const { title, color } = data.fields;

        await models.categories.create({
            title: title,
            color: color,
            image: names.photo + data.files.photo.name,
            icon: names.icon + data.files.icon.name
        });

        ctx.status = 200;
    }
    catch (e)
    {
        console.log(e);
    }
});

Departments.get('/:id', async (ctx) => {
    try
    {
        const department = await models.categories.findById(ctx.params.id, {
            include: [{
                model: models.teachers,
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

Departments.del('/:id', authMiddleware, async (ctx) => {
    try
    {
        const department = await models.categories.destroy({
            where: {
                id: ctx.params.id
            }
        });

        ctx.body = department;
    }
    catch (err)
    {
        console.log(err);
    }
});

export default Departments;