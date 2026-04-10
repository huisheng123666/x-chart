const router = require('koa-router')();
const fs = require('fs');

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
  });
});

router.get('/hengtai/*', async (ctx, next) => {
  ctx.set('Content-Type', 'text/html;charset=utf-8');
  ctx.body = fs.readFileSync('public/hengtai/index.html');
});

router.get('/screenapi/auth', async (ctx, next) => {
  const { password } = ctx.request.query;
  console.log(password);

  if (password === 'tgf@2026') {
    ctx.body = {
      code: 0,
      msg: '验证成功',
    };
  } else {
    ctx.body = {
      code: -1,
      msg: '验证失败',
    };
  }
});

router.post('/json', async (ctx, next) => {
  console.log(ctx.request.body);
  ctx.body = {
    title: 'koa2 json',
  };
});

module.exports = router;
