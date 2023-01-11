
# pageIsLoading

监听网页图片资源加载进度，可实现网页加载进度条，不需要依赖其他库。

目前主要实现了对图片资源加载的监听（包括css中引入的图片）

# 安装

配合打包工具使用
```javascript
npm i page-is-loading
```
```javascript
import pageIsLoading from 'page-is-loading'
```

或者使用`<script>`标签导入可直接将`dist`目录下的`page-is-loading.min.js`文件拷贝到你的项目中，`page-is-loading.min.js`向外抛出一个`pageIsLoading`函数
```html
<script src="./path/page-is-loading.min.js"></script>
// pageIsLoading(..)
```

# 用法

### 基础用法

```javascript
pageIsLoading({
    // 检索图片的范围，不传时默认为body
    el: '#app',
    // 进度更新触发
    each: function(loaded, total, progress){
        /**
         * loaded: 已加载的资源数量
         * total: 总共要加载的资源数量
         * progress: 当次的进度百分比数，number类型并保留小数
         */
    },
    // 全部加载完毕触发
    load: function(){
        // ...
    }
})
```

### 排除掉部分图片资源

最简单的方式就是给要排除掉的图片元素加上`data-page-is-loading-ignore`属性

```html
<img data-page-is-loading-ignore src="http://demo.com/a.jpeg">
```

或者传入一个正则表达式给配置项`ignoreImg`

```javascript
pageIsLoading({
    // 传入一个正则表达式，排除掉被命中的图片名资源（针对图片的文件名）
    ignoreImg: /^ignore/,
    each: (loaded, total, progress, element) => {
        // ...
    },
    load: () => {
        // ...
    }
});
```

`ignoreImg`也支持传入一个函数，自行控制判断逻辑，并返回一个布尔值，返回`true`时则代表排除该图片

```javascript
pageIsLoading({
    // 传入一个函数，该函数接受两个参数，filename图片名，url图片的地址
    // 函数返回 true 时，代表不检测该资源，反之则加入检测队列
    ignoreImg: (filename, url) => {
        return filename.startsWith('ignore')
    },
    each: (loaded, total, progress, element) => {
        // ...
    },
    load: () => {
        // ...
    }
});
```



### 额外检测一些图片

某些情况下，可能需要检测一些暂不存在DOM树中的图片，可以自行配置`extraImg`字段，插件内部会尝试去加载该图片资源，默认情况下该资源就会被浏览器缓存下来

```javascript
pageIsLoading({
    // 额外监听这两张图片资源
    extraImg: [
        'http://demo.com/a.jpg',
        'http://demo.com/b.jpg',
    ],
    each: (loaded, total, progress, element) => {
        // ...
    },
    load: () => {
        // ...
    }
});
```




# options 

| 参数         | 说明     | 类型     | 默认值    |
| ----------- | -------- | -------- | --------- |
| el          | 检测图片的DOM范围，传入一个选择器字符串 | _string_ | body |
| each        | 每加载一个图片资源就会触发该回调 | _function(loaded, total, progress)_ |  -  |
| load        | 当所有图片资源加载完毕触发 | _function_ |  -  |
| extraImg    | 额外检测的图片列表 | _array_ |  []  |
| ignoreImg   | 排除检测的图片，可传入正则表达式或一个函数 | _RegExp_,_function_ |  -  |

# DOM attribute

`data-page-is-loading-ignore`: 标记要排除检测的元素

# 注意

由于是检测页面图片资源的加载进度，所以确保`pageIsLoading`执行时，页面的DOM已经存在


