import Router from 'koa-router';
import models from '../db';
import authMiddleware from '../middlewares/auth';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from "../config";

const Auth = new Router();
Auth.prefix('/auth');

Auth.get('/verify', authMiddleware, async (ctx) => {
    ctx.body = true;
});

Auth.post('/', async (ctx) => {
    try
    {
        const { login, password } = ctx.request.body;

        if (!login || !password) ctx.status = 400;

        const admin = await models.admins.findOne({ where: { login: login } });

        if (password !== admin.password) ctx.status = 400;

        ctx.body = jwt.sign({ login }, JWT_SECRET);
    }
    catch (e)
    {
        console.log(e);
    }
});

export default Auth;