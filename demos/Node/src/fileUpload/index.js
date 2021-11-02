const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

//通过req的hearers来获取客户端ip
function getIp(req) {
  let ip =
    req.headers['x-real-ip'] ||
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddres ||
    req.socket.remoteAddress ||
    '';
  return ip;
}

router.post('/upload', async ctx => {});

app.use(router.routes()).use(router.allowedMethods());

app.listen(10086, () => {
  console.log('启动成功! http://localhost:10086');
});
