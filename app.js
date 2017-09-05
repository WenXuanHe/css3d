const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}));

app.use(require('koa-static')(__dirname + '/public'));

const index = require('./routes/index');

app.use(index.routes(), index.allowedMethods());

app.listen(6000, function(){
	console.log("server on 6000")
});
