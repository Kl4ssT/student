import Router from 'koa-router';
import path from 'path';
import { createReadStream } from 'fs';

import departments from './departments';
import teachers from './teachers';
import streams from './streams';
import video from './video';

const router = new Router();

router.use(teachers.routes());
router.use(departments.routes());
router.use(streams.routes());
router.use(video.routes());

router.get('/', async (ctx) => {
    ctx.type = 'html';
    ctx.body = createReadStream(path.join(path.dirname(process.mainModule.filename), 'build', 'index.html'));
});

export default router;