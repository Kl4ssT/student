import Router from 'koa-router';

import departments from './departments';
import teachers from './teachers';

const router = new Router();
router.use(teachers.routes());
router.use(departments.routes());

export default router;