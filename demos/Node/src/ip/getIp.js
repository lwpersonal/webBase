const Koa = require('koa');
const Router = require('koa-router');

const router = new Router();
const app = new Koa();

router.get('/getIp', async ctx => {
  const ip = ctx.request.get('x-forwarded-for');
  console.log('remoteAddress: ', ctx.request.socket.remoteAddress);
  console.log('accept: ', ctx.get('accept'));
  console.log('x-forwarded-for: ', ctx.get('x-forwarded-for'));
  ctx.body = `ip: ${ip}`;
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(2999, () => {
  console.log('启动成功!');
});
