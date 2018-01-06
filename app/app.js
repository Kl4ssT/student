import Koa from 'koa';
import middlewares from './middlewares';
import router from './routes';

const app = new Koa();

app.use(middlewares());
app
    .use(router.routes())
    .use(router.allowedMethods());

export default app;