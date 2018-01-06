import Router from 'koa-router';

import teachers from './teachers';

const router = new Router();
router.use(teachers.routes());

export default router;