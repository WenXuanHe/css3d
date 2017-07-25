var router = require('koa-router')();

router.get('/', async function (ctx, next) {
  await ctx.render("index", {});
});

router.get('/three', async function (ctx, next) {
  await ctx.render("three", {});
});
router.get('/creation', async function (ctx, next) {
  await ctx.render("creation", {});
});
router.get('/fly', async function (ctx, next) {
  await ctx.render("fly", {});
});
router.get('/trans', async function (ctx, next) {
  await ctx.render("trans", {});
});

module.exports = router;
