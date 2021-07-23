const Koa = require('koa');
const path = require('path')
const static = require('koa-static');
const app = new Koa();

app.use(async (ctx, next) => {
    await lazyLoadScript(ctx.path);
    await static(path.join(__dirname, 'public'))(ctx, next);
});

function lazyLoadScript(path) {
    let time = 0;
    if(String.prototype.endsWith.call(path, 'js')){
        time = 5000;
    }else if(String.prototype.endsWith.call(path, 'css')){
        time = 10000;
    }else if(
        String.prototype.endsWith.call(path, 'jpeg')
        || String.prototype.endsWith.call(path, 'png')
    ){
        time = +(/\d+/.exec(path)[0])
        console.log(time);
    }
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, time)
    })
}


app.listen(3000, () => {
  console.log('[demo] static-use-middleware is starting at port 3000')
})