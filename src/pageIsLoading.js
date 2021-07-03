// demo
// pageIsLoading({
//     el: '.body',
//     each: function(element, index, total, progress){},
//     load: function(){}
// })

function pageIsLoading(options = {}) {

    let { el, each, load } = options;
    let allElements = [];
    let allFiles = [];
    let allFilesLen = 0;
    let allFilesLoaded = 0;
    
    // 检查
    if(el == null || el === ''){
        el = document.body;
    }else{
        el = document.querySelector(el);
    }
    if(!el) throw new TypeError('Node not found: ' + el);

    // 收集加载的资源列表: img, backgroundImage
    allElements = el.getElementsByTagName('*');
    for (let index = 0; index < allElements.length; index++) {

        const element = allElements[index];
        
        // 处理img元素
        if(
            element.nodeName === 'IMG' &&
            element.src
        ){
            allFiles.push({
                element,
                src: element.src
            })
        }

        // 处理背景图片
        // element.style.backgroundImage只会在内联样式查找
        const bgSrc = window.getComputedStyle(element).backgroundImage;
        if(
            bgSrc && 
            bgSrc !== 'none'
        ){
            allFiles.push({
                element,
                src: bgSrc // TODO:这里需要正则获取地址
            })
        }
    }

    console.log(allFiles);
    
}

export default pageIsLoading