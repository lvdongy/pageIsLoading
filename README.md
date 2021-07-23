# pageIsLoading

监听网页图片资源加载进度，可实现网页加载进度条。纯JavaScript实现，不需要依赖其他库。

# 安装
直接将`pageIsLoading.js`文件拷贝到你的项目中，`pageIsLoading.js`向外抛出一个`pageIsLoading`函数

```javascript
import pageIsLoading from './pageIsLoading.js'
````

# 用法

```javascript
pageIsLoading({
    each: function(loaded, total, progress){
        
    },
    load: function(){
        
    }
})
```
