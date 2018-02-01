import fs from 'fs';
import path from 'path';
import Router from 'koa-router';
import models from '../db';
import Youtube from "../youtube";
import authMiddleware from "../middlewares/auth";
import uniqid from 'uniqid';

const Teachers = new Router();
Teachers.prefix('/teachers');

Teachers.get('/', async (ctx) => {
    try
    {
        const teachers = await models.teachers.findAll();

        ctx.body = teachers;
    }
    catch (err)
    {
        console.log(err);
    }
});

Teachers.post('/', authMiddleware, async (ctx) => {
    try
    {
        const data = ctx.request.body;

        const fileName = uniqid();

        const file = data.files.file;
        const filePath = path.join(__dirname, '..', '..', 'assets', fileName);
        const reader = fs.createReadStream(file.path);
        const writer = fs.createWriteStream(filePath);
        reader.pipe(writer);

        const { name, description, channel, stream, department } = data.fields;

        await models.teachers.create({
            name: name,
            description: description,
            photo: fileName + data.files.file.name,
            channel_id: channel,
            stream_id: stream,
            id_category: department
        });

        ctx.status = 200;
    }
    catch (e)
    {
        console.log(e);
    }
});

Teachers.get('/:id', async (ctx) => {
    try
    {
        const teacher = await models.teachers.findById(ctx.params.id);

        ctx.body = teacher;
    }
    catch (err)
    {
        console.log(err);
    }
});

Teachers.del('/:id', authMiddleware, async (ctx) => {
    try
    {
        const teacher = await models.teachers.destroy({
            where: {
                id: ctx.params.id
            }
        });

        ctx.body = teacher;
    }
    catch (err)
    {
        console.log(err);
    }
});

Teachers.put('/:id', authMiddleware, async (ctx) => {

    console.log(ctx.request.body);

    const { id, name, description, id_category, channel_id, stream_id } = ctx.request.body.fields;

    if (!id || !name || !description || !id_category || !channel_id || !stream_id) ctx.throw(400, { message: 'Invalid data' });

    const editableTeacher = await models.teachers.findById(id);

    if (!editableTeacher) ctx.throw(400, { message: 'Teacher not found' });

    let photo_name = (ctx.request.body.files.photo) ? uniqid() : editableTeacher.photo;

    if (ctx.request.body.files.photo)
    {
        photo_name += ctx.request.body.files.photo.name;
        const file = ctx.request.body.files.photo;
        const filePath = path.join(__dirname, '..', '..', 'assets', photo_name);
        const reader = fs.createReadStream(file.path);
        const writer = fs.createWriteStream(filePath);
        reader.pipe(writer);
    }

    const editedTeacher = await editableTeacher.update({ name: name, description: description, id_category: id_category, channel_id: channel_id, stream_id: stream_id, photo: photo_name });
    ctx.body = editedTeacher;
});

Teachers.get('/department/:id', async (ctx) => {
    try
    {
        const teachers = await models.teachers.findAll({
            where: {
                id_category: ctx.params.id
            }
        });

        ctx.body = teachers;
    }
    catch (err)
    {
        console.log(err);
    }
});

Teachers.get('/videos/:id', async (ctx) => {
    try
    {
        const teacher = await models.teachers.findById(ctx.params.id);

        const getVideos = new Promise((resolve, reject) => {

            Youtube.channels.list({
                part: 'contentDetails',
                id: teacher.channel_id,
            }, (err, res) => {

                if (err) reject(err);

                Youtube.playlistItems.list({
                    part: 'snippet,contentDetails',
                    playlistId: res.items[0].contentDetails.relatedPlaylists.uploads,
                    maxResults: 10
                }, (err, res) => {

                    console.log(res);

                    if (err) reject(err);

                    let videos = [];

                    res.items.forEach((item) => {

                        videos.push({
                            id: item.snippet.resourceId.videoId,
                            thumbnail: item.snippet.thumbnails.medium.url,
                            title: item.snippet.title
                        });
                    });

                    console.log(videos);

                    resolve(videos);
                });
            });
        });

        ctx.body = await getVideos;
    }
    catch (err)
    {
        console.log(err);
    }
});


export default Teachers;