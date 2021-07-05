// demo
// pageIsLoading({
//     el: '.body',
//     each: function(loaded, total, progress, element){},
//     load: function(){}
// })

function pageIsLoading(options = {}) {

    let { el, each, load } = options;
    let allElements = [];
    let allFiles = [];
    let allFilesLen = 0;
    let allFilesLoaded = 0;
    const matchURL = /url\(\s*(['"]?)(.*?)\1\s*\)/g;
    
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
            // 背景图片可能存在多图的情况，这里使用while循环将所有图片url匹配出来，直到mathRes = null
            let mathRes;
            while(mathRes = matchURL.exec(bgSrc)){
                allFiles.push({
                    element,
                    src: mathRes[2] // 真实的图片url，为正则的第二个子表达式
                })
            }
        }
    }

    // 收集完毕，得到需要加载的资源总数
    allFilesLen = allFiles.length;


    if(allFilesLen === 0){
        runLoad(load);
        return
    }

    for (let index = 0; index < allFilesLen; index++) {

        let item = allFiles[index];
        let img = new Image();

        // 失败或者成功都计为加载完成
        ['load', 'error'].forEach((event) => {
            img.addEventListener(event, () => {
                allFilesLoaded++;
                runEach(allFilesLoaded, allFilesLen, item.element, each);
                if(allFilesLoaded === allFilesLen){
                    runLoad(load);
                }
                img = null;
            })
        })

        img.src = item.src;
    }
}

function runLoad(fn){
    if(!fn){
        return
    }
    if(typeof fn !== 'function'){
        throw new TypeError('load is not a function');
    }
    fn();
}

function runEach(loaded, total, element, fn) {
    if(!fn){
        return
    }
    if(typeof fn !== 'function'){
        throw new TypeError('load is not a function');
    }
    let progress = loaded / total;
    fn(loaded, total, progress, element);
}

export default pageIsLoading