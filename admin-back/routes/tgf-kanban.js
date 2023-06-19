const router = require('koa-router')()
const fs = require('fs')
const path = require('path')

router.prefix('/hengtai/api/tgf/kanban')

let editing = false

router.get('/', function (ctx, next) {
    const data = fs.readFileSync(path.resolve(__dirname, '../database/tgf-kanban.json'), 'utf-8');
    ctx.body = JSON.parse(data)
})

router.post('/', function (ctx, next) {
    fs.writeFileSync(path.resolve(__dirname, '../database/tgf-kanban.json'), JSON.stringify(ctx.request.body, null, 2))
    editing = true
    ctx.body = fs.readFileSync(path.resolve(__dirname, '../database/tgf-kanban.json'), 'utf-8');
})

module.exports = router
