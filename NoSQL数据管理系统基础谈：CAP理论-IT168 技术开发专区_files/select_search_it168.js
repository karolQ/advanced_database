(function(t){var q={version:"1.0.7",debug:false};function u(a,b){if(a instanceof Array){for(var c=0,d=a.length;c<d;c++){if(b.call(a[c],a[c],c)===false){return}}}else{for(var c in a){if(a.hasOwnProperty(c)){if(b.call(a[c],a[c],c)===false){return}}}}}function s(c,a){if(Array.prototype.indexOf){return c.indexOf(a)}for(var b=0,d=c.length;b<d;b++){if(c[b]===a){return b}}return-1}function B(c,a){if(Array.prototype.filter){return c.filter(a)}var b=[];u(c,function(d,e,f){if(a(d,e,f)){b.push(d)}});return b}function x(b,a){return B(a,function(c){return!v.loadingPaths[c]||!o(v.cache[c],b)})}function o(c,b){if(!c||c._loaded){return false}var a=c.deps||[];if(a.length){if(s(a,b)>-1){return true}else{for(var d=0;d<a.length;d++){if(o(v.cache[a[d]],b)){return true}}return false}}return false}function v(a,b){this.name=b;this.path=a;this.fn=null;this.exports={};this._loaded=false;this._requiredStack=[];this._readyStack=[];v.cache[this.name]=this}v.loadedPaths={};v.loadingPaths={};v.cache={};v.paths={};v.moduleFileMap={};v.requiredPaths={};v.lazyLoadPaths={};v.prototype={init:function(){if(!this._inited){this._inited=true;if(!this.fn){throw new Error('Module "'+this.name+'" not found!')}var a;if(a=this.fn.call(null,y,this.exports)){this.exports=a}}},load:function(){v.loadingPaths[this.path]=true;var a=q.debug?this.path:(v.moduleFileMap[this.name]||this.path);p.create({src:a,charset:"gbk"})},lazyLoad:function(){var b=this.name,a=this.path;if(v.lazyLoadPaths[b]){this.define();delete v.lazyLoadPaths[b]}else{if(v.loadedPaths[a]){this.triggerStack()}else{if(!v.loadingPaths[a]){v.requiredPaths[this.name]=true;this.load()}}}},ready:function(b,a){var c=a?this._requiredStack:this._readyStack;if(b){if(this._loaded){this.init();b()}else{c.push(b)}}else{this._loaded=true;v.loadedPaths[this.path]=true;delete v.loadingPaths[this.path];this.triggerStack()}},triggerStack:function(){if(this._readyStack.length>0){this.init();u(this._readyStack,function(a){if(!a.doing){a.doing=true;a()}});this._readyStack=[]}if(this._requiredStack.length>0){u(this._requiredStack,function(a){if(!a.doing){a.doing=true;a()}});this._requiredStack=[]}},define:function(){var a=this,c=this.deps,b=[];if(!c&&q.debug){c=getDependents(a.fn)}c=x(a.path,c);if(c.length){v.loadingPaths[this.path]=true;u(c,function(d){var e=z(d);b.push(e.path)});u(c,function(d){var e=z(d);e.ready(function(){if(r(b)){a.ready()}},true);e.lazyLoad()})}else{this.ready()}}};function y(b){var a=z(b);a.init();return a.exports}function r(a){var b=true;u(a,function(c){if(!(c in v.loadedPaths)){return b=false}});return b}function w(a){return t?(t+a):a}function z(b){var a=b.indexOf(":")>-1?b:w(b);if(v.cache[b]){return v.cache[b]}return new v(a,b)}if(t&&t.charAt(t.length-1)=="/"){t=t.substr(0,t.length-1)}var p={create:function(b){if(b.src in this._paths){return}this._paths[b.src]=true;u(this._rules,function(d){d.call(null,b)});var c=document.getElementsByTagName("head")[0];var a=document.createElement("script");a.type=b.type||"text/javascript";b.charset&&(a.charset=b.charset);a.src=b.src;a.onload=a.onerror=a.onreadystatechange=function(){if((!this.readyState||this.readyState==="loaded"||this.readyState==="complete")){a.onload=a.onerror=a.onreadystatechange=null;if(a.parentNode&&!q.debug){c.removeChild(a)}a=undefined;b.loaded&&b.loaded()}};c.insertBefore(a,c.firstChild)},_paths:{},_rules:[],addPathRule:function(a){this._rules.push(a)}};q.use=function(a,b){if(typeof a==="string"){a=[a]}var c=[];var d=[];u(a,function(f,e){d[e]=false});u(a,function(g,e){var f=z(g);f.ready(function(){c[e]=f.exports;d[e]=true;var h=true;u(d,function(i){if(i===false){return h=false}});if(b&&h){b.apply(null,c)}});f.lazyLoad()})};q.module=function(d,b,a){var c=z(d);c.fn=b;c.deps=a;if(v.requiredPaths[d]){c.define()}else{v.lazyLoadPaths[d]=true}};q.pathRule=function(a){p.addPathRule(a)};q._fileMap=function(a,b){if(typeof a==="object"){u(a,function(d,c){q._fileMap(c,d)})}else{if(typeof b==="string"){b=[b]}u(b,function(c){v.moduleFileMap[c]=a})}};var A={};q.context=function(c,a){var b=arguments.length;if(b>1){A[c]=a}else{if(b==1){if(typeof c=="object"){for(var d in c){if(c.hasOwnProperty(d)){A[d]=c[d]}}}else{return A[c]}}}};"F"in window||(window.F=q)})("http://cdn.iknow.bdimg.com/");F.use('/static/common/lib/tangram/base/base.js',function(T){var hasBind=false;function select(obj){T(obj||$(".bor1")).mouseup(function(e){var btnVal=e.button;if(T.browser.ie<9?btnVal!=1:btnVal!=0)return;var tid=e.target.id;setTimeout(function(){var isStandard=Boolean(window.getSelection),selection=isStandard?window.getSelection():document.selection.createRange();text=(isStandard?selection+"":selection.text).replace(/\n+/g,"|");var textLen=text.length,areaEle,range=isStandard?(textLen&&selection.getRangeAt(0)):selection;if(textLen<2||textLen>200||tid=="selectsearch-icon"){return hideIcon()}showIcon(range,isStandard);range=selection=null},25)})}function showIcon(range,isStandard){var img=T("#selectsearch-icon"),r;if(isStandard){if(!img.size()){img=T('<img id="selectsearch-icon" />').attr({src:"http://img.baidu.com/img/iknow/qb/select-search.png",alt:"搜索"})}r=range.cloneRange();r.collapse(false);r.insertNode(img.get(0));img.removeClass("selectsearch-hide");r.detach()}else{img.remove();hasBind=false;r=range.duplicate();r.collapse(false);r.pasteHTML("<img id='selectsearch-icon' src='http://img.baidu.com/img/iknow/qb/select-search.png' alt='搜索' />")}r=null;handleIcon()}function handleIcon(){if(hasBind)return;hasBind=true;T("#selectsearch-icon").click(function(){hideIcon();window.open('http://zhidao.baidu.com/search?word='+text+'&fr=it168_search')})}function hideIcon(){T("#selectsearch-icon").addClass('selectsearch-hide')}select();T(document).click(function(e){if(!T(e.target).closest('#selectsearch-icon').size()){hideIcon()}})});