import Router from 'koa-router';
import departments from './departments';
import teachers from './teachers';
import streams from './streams';
import video from './video';
import page from './page';

const router = new Router();

router.use(teachers.routes());
router.use(departments.routes());
router.use(streams.routes());
router.use(video.routes());
router.use(page.routes());

export default router;