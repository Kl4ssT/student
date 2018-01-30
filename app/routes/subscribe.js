import Router from 'koa-router';
import models from '../db';

const Subscribe = new Router();
Subscribe.prefix('/subscribe');

Subscribe.post('/', async (ctx) => {
    const { teacherId, email } = ctx.request.body;

    if (!teacherId || !email) ctx.throw(400, 'Invalid data');

    const subsriber = await models.subscribers.findOne({ where: { email: email, id_teacher: teacherId } });

    if (subsriber) ctx.throw(400, { message: 'Is subscribed' });

    const newSubscriber = await models.subscribers.create({ id_teacher: teacherId, email: email });

    if (!newSubscriber) ctx.throw(400, 'Error create');

    ctx.body = newSubscriber;
});

export default Subscribe;