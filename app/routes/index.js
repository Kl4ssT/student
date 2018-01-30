import Router from 'koa-router';
import departments from './departments';
import teachers from './teachers';
import streams from './streams';
import video from './video';
import page from './page';
import auth from './auth';
import subscribe from './subscribe';

import fs from 'fs';
import path from 'path';

const api = new Router();
api.prefix('/api');

api.use(teachers.routes(), teachers.allowedMethods());
api.use(departments.routes(), departments.allowedMethods());
api.use(streams.routes(), streams.allowedMethods());
api.use(video.routes(), video.allowedMethods());
api.use(page.routes(), page.allowedMethods());
api.use(auth.routes(), auth.allowedMethods());
api.use(subscribe.routes(), subscribe.allowedMethods());

const admin = new Router();
admin.prefix('/admin');
admin.get('*', async (ctx) => {
    ctx.type = 'html';
    ctx.body = fs.createReadStream(path.join(__dirname, '..', 'admin', 'index.html'));
});

const router = new Router();
router.use(api.routes(), api.allowedMethods());
router.use(admin.routes(), admin.allowedMethods());

router.get('*', async (ctx) => {
    ctx.type = 'html';
    ctx.body = fs.createReadStream(path.join(__dirname, '..', 'client', 'index.html'));
});

export default router;