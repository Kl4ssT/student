import Router from 'koa-router';
import models from '../db';
import Youtube from "../youtube";

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