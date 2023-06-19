const router = require('koa-router')()
const fs = require('fs')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/hengtai/*', async (ctx, next) => {
  ctx.set('Content-Type', 'text/html;charset=utf-8')
  ctx.body = fs.readFileSync('public/hengtai/index.html')
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
