/*!
 * page-is-loading v1.0.0
 * Fri Jul 23 2021, lvdongy
 * Released under the MIT License.
 */
function e(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=e.el,t=e.each,f=e.load,a=[],c=[],i=0,u=0,l=/url\(\s*(['"]?)(.*?)\1\s*\)/g;if(!(r=null==r||""===r?document.body:document.querySelector(r)))throw new TypeError("Node not found: "+r);a=r.getElementsByTagName("*");for(var d=0;d<a.length;d++){var s=a[d];"IMG"===s.nodeName&&s.src&&c.push({element:s,src:s.src});var m=window.getComputedStyle(s).backgroundImage;if(m&&"none"!==m)for(var g=void 0;g=l.exec(m);)c.push({element:s,src:g[2]})}if(0!==(i=c.length))for(var h=function(e){var r=c[e],a=new Image;["load","error"].forEach((function(e){a.addEventListener(e,(function(){o(++u,i,r.element,t),u===i&&n(f),a=null}))})),a.src=r.src},v=0;v<i;v++)h(v);else n(f)}function n(e){if(e){if("function"!=typeof e)throw new TypeError("load is not a function");e()}}function o(e,n,o,r){if(r){if("function"!=typeof r)throw new TypeError("load is not a function");r(e,n,e/n,o)}}export default e;
