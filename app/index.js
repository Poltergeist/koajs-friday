var koa = require('koa'),
  app = koa(),

  route = require('koa-route'),
  views = require('koa-render');

app.env = 'development';

app.use(views('./app/views', 'jade'));

app.use(function *(next) {
  var start = new Date(),
    ms;
  yield next;
  ms = new Date() - start;
  this.set('X-Response-Time', ms + 'ms');
});

// logger

app.use(function *(next) {
  var start = new Date(),
    ms;
  yield next;
  ms = new Date() - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(route.get('/', index));
app.use(route.get('/time', time));
app.use(route.get('/:filename', file));

function *index() {
  this.body = yield this.render('index');
}
function *file(filename) {
  var time = new Date();
  try {
    this.body = yield this.render(filename);
  } catch (e) {
    console.log('%s %s - %s', this.method, this.url, time);
  }
}

function *time(next) {
  this.body = yield this.render('msg', {msg: new Date()});
}


app.listen(3000);
