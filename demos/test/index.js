var Koa = require('koa');
var Router = require('koa-router');

var app = new Koa();
var router = new Router();

app.use((ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type');
  if (ctx.request.method === 'OPTIONS') {
    ctx.body = {
      code: 200,
    };
  } else {
    next();
  }
});

router.get('/api/test', (ctx, next) => {
  console.log('请求成功');
  ctx.set('Access-Control-Allow-Origin', '*');
  // ctx.set('Access-Control-Allow-Method', 'GET,HEAD,POST');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type');
  ctx.body = {
    code: 200,
    message: 'success',
  };
});

//使用路由中间件
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000, () => {
  console.log('启动成功！');
});
