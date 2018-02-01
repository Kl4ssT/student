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

Departments.put('/:id', authMiddleware, async (ctx) => {

    state = {
        id: null,
        title: null,
        photo: null,
        icon: null,
        color: null
    };

    const { id, title, color } = ctx.request.body.fields;

    if (!id || !title || !color) ctx.throw(400, { message: 'Invalid data' });

    const editableDepartment = await models.departments.findById(id);

    if (!editableDepartment) ctx.throw(400, { message: 'Department not found' });

    let photo_name = (ctx.request.body.files.photo) ? uniqid() : editableDepartment.photo;

    if (ctx.request.body.files.photo)
    {
        photo_name += ctx.request.body.files.photo.name;
        const file = ctx.request.body.files.photo;
        const filePath = path.join(__dirname, '..', '..', 'assets', photo_name);
        const reader = fs.createReadStream(file.path);
        const writer = fs.createWriteStream(filePath);
        reader.pipe(writer);
    }

    let icon_name = (ctx.request.body.files.icon) ? uniqid() : editableDepartment.icon;

    if (ctx.request.body.files.icon)
    {
        icon_name += ctx.request.body.files.icon.name;
        const file = ctx.request.body.files.icon;
        const filePath = path.join(__dirname, '..', '..', 'assets', icon_name);
        const reader = fs.createReadStream(file.path);
        const writer = fs.createWriteStream(filePath);
        reader.pipe(writer);
    }

    const editedDepartment = await editableDepartment.update({ title: title, color: color, photo: photo_name, icon: icon_name });
    ctx.body = editedDepartment;
});

export default Departments;