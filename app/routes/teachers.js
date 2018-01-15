import Router from 'koa-router';
import models from '../db';
import Youtube from "../youtube";

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

Teachers.get('/:id', async (ctx) => {
    try
    {
        const teacher = await models.Teachers.findById(ctx.params.id);

        ctx.body = teacher;
    }
    catch (err)
    {
        console.log(err);
    }
});

Teachers.get('/videos/:id', async (ctx) => {
    try
    {
        const teacher = await models.Teachers.findById(ctx.params.id);

        Youtube.channels.list({
            part: 'contentDetails',
            forUsername: teacher.youtube_user,
        }, (err, res) => {

           Youtube.playlistItems.list({
               part: 'snippet',
               playlistId: res.items[0].contentDetails.relatedPlaylists.uploads
           }, (err, res) => {

               Youtube.videos.list()
               console.log(res.items[0].snippet.resourceId.videoId);

           });

        });
    }
    catch (err)
    {
        console.log(err);
    }
});



export default Teachers;