
# pageIsLoading

监听网页图片资源加载进度，可实现网页加载进度条，纯JavaScript实现，不需要依赖其他库。

目前第一版只实现了对图片资源加载的监听（包括css中引入的图片）

# 安装

配合打包工具使用
```javascript
npm i page-is-loading
```
```javascript
import pageIsLoading from 'page-is-loading'
```

或者使用`<script>`标签导入可直接将`dist`目录下的`page-is-loading.min.js`文件拷贝到你的项目中，`page-is-loading.min.js`向外抛出一个`pageIsLoading`函数
```javascript
<script src="./path/page-is-loading.min.js"></script>
// pageIsLoading(..)
```

# 用法

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
由于是检测页面所有图片资源的加载进度，所以确保`pageIsLoading`执行时，页面的DOM已经存在


更新中.. 
