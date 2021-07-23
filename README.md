
# pageIsLoading

监听网页图片资源加载进度，可实现网页加载进度条。纯JavaScript实现，不需要依赖其他库。

# 安装
直接将`dist`目录下对应的文件拷贝到你的项目中，`page-is-loading.xx.js`向外抛出一个`pageIsLoading`函数

```javascript
import pageIsLoading from './page-is-loading.esm.js'
```

```javascript
<script src="./path/page-is-loading.min.js"></script>
```

# 用法

```javascript
pageIsLoading({
    // 进度更新触发
    each: function(loaded, total, progress){
        /**
         * loaded: 已加载数量
         * total: 总共要加载的数量
         * progress: 当次的进度百分比数，number类型并保留小数
         */
    },
    // 全部加载完毕触发
    load: function(){
        
    }
})
```

更新中..
