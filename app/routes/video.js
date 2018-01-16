import Router from 'koa-router';
import Youtube from "../youtube";

const Video = new Router();
Video.prefix('/video');

Video.get('/:id', async (ctx) => {
    try
    {
        const getVideo = (videoId) => {
            return new Promise((resolve, reject) => {
                Youtube.videos.list({
                    part: 'snippet',
                    id: videoId
                }, (err, res) => {
                    if (err) reject(err);

                    resolve({
                        id: res.items[0].id,
                        title: res.items[0].snippet.title
                    });
                });
            });
        };

        ctx.body = await getVideo(ctx.params.id);
    }
    catch (e)
    {
        console.log(e);
    }

});

export default Video;