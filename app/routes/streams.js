import Router from 'koa-router';
import models from '../db';
import Youtube from "../youtube";

const Streams = new Router();
Streams.prefix('/streams');

Streams.get('/', async (ctx) => {
    try
    {
        const teachers = await models.Teachers.findAll();

        const isLive = (streamId) => {
            return new Promise((resolve, reject) => {
                Youtube.videos.list({
                    part: 'snippet',
                    id: streamId
                }, (err, res) => {
                    if (err) reject(err);

                    if (res.items.length > 0)
                        if (res.items[0].snippet.liveBroadcastContent === 'live')
                            resolve({
                                live: true,
                                thumbnail: res.items[0].snippet.thumbnails.medium.url,
                                videoId: res.items[0].id
                            });
                        else
                            resolve(false);
                    else
                        resolve(false);
                });
            });
        };

        let currentStreams = [];

        for (let teacher of teachers) {
            const is_live = await isLive(teacher.stream_id);

            if (is_live.live)
                currentStreams.push({
                    id: teacher.channel_id,
                    thumbnail: is_live.thumbnail,
                    videoId: is_live.videoId
                });
        }

        currentStreams = currentStreams.slice(0, 4);

        ctx.body = currentStreams;
    }
    catch (e)
    {
        console.log(e);
    }

});

export default Streams;