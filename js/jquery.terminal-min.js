/*

 |       __ _____                     ________                              __
 |      / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /
 |  __ / // // // // // _  // _// // / / // _  // _//     // //  \/ // _ \/ /
 | /  / // // // // // ___// / / // / / // ___// / / / / // // /\  // // / /__
 | \___//____ \\___//____//_/ _\_  / /_//____//_/ /_/ /_//_//_/ /_/ \__\_\___/
 |           \/              /____/                              version 0.6.5
 http://terminal.jcubic.pl

 Licensed under GNU LGPL Version 3 license
 Copyright (c) 2011-2013 Jakub Jankiewicz <http://jcubic.pl>

 Includes:

 Storage plugin Distributed under the MIT License
 Copyright (c) 2010 Dave Schindler

 jQuery Timers licenced with the WTFPL
 <http://jquery.offput.ca/every/>

 Cross-Browser Split 1.1.1
 Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
 Available under the MIT License

 Date: Sat, 13 Jul 2013 10:02:08 +0000
*/
(function(f,K){function ka(d,e){var i;if(typeof d==="string"&&typeof e==="string"){localStorage[d]=e;return true}else if(typeof d==="object"&&typeof e==="undefined"){for(i in d)if(d.hasOwnProperty(i))localStorage[i]=d[i];return true}return false}function ga(d,e){var i,g;i=new Date;i.setTime(i.getTime()+31536E6);i="; expires="+i.toGMTString();if(typeof d==="string"&&typeof e==="string"){document.cookie=d+"="+e+i+"; path=/";return true}else if(typeof d==="object"&&typeof e==="undefined"){for(g in d)if(d.hasOwnProperty(g))document.cookie=
g+"="+d[g]+i+"; path=/";return true}return false}function la(d){return localStorage[d]}function ma(d){var e,i,g;d+="=";e=document.cookie.split(";");for(i=0;i<e.length;i++){for(g=e[i];g.charAt(0)===" ";)g=g.substring(1,g.length);if(g.indexOf(d)===0)return g.substring(d.length,g.length)}return null}function na(d){return delete localStorage[d]}function oa(d){return ga(d,"",-1)}function ca(d,e){var i=[],g=d.length;if(g<e)return[d];for(var j=0;j<g;j+=e)i.push(d.substring(j,j+e));return i}function pa(d){var e=
d?[d]:[];f.extend(this,{size:function(){return e.length},pop:function(){if(e.length===0)return null;else{var i=e[e.length-1];e=e.slice(0,e.length-1);return i}},push:function(i){e=e.concat([i]);return i},top:function(){return e.length>0?e[e.length-1]:null}})}function qa(d,e){var i=true;if(typeof d==="string"&&d!=="")d+="_";var g=f.Storage.get(d+"commands");g=g?(new Function("return "+g+";"))():[];var j=g.length-1;f.extend(this,{append:function(n){if(i)if(g[g.length-1]!==n){g.push(n);j=g.length-1;if(e&&
g.length>e)g=g.slice(-e);f.Storage.set(d+"commands",f.json_stringify(g))}},data:function(){return g},next:function(){j<g.length-1&&++j;if(j!==-1)return g[j]},reset:function(){j=g.length-1},last:function(){return g[length-1]},end:function(){return j===g.length-1},position:function(){return j},previous:function(){var n=j;j>0&&--j;if(n!==-1)return g[n]},clear:function(){g=[];f.Storage.remove(d+"commands")},enable:function(){i=true},purge:function(){f.Storage.remove(d+"commands")},disable:function(){i=
false}})}function ha(d){return f("<div>"+f.terminal.strip(d)+"</div>").text().length}function da(d,e){var i=d.split(/( +)/);return{name:i[0],args:e(i.slice(2).join(""))}}f.omap=function(d,e){var i={};f.each(d,function(g,j){i[g]=e.call(d,g,j)});return i};var $=typeof window.localStorage!=="undefined";f.extend({Storage:{set:$?ka:ga,get:$?la:ma,remove:$?na:oa}});jQuery.fn.extend({everyTime:function(d,e,i,g,j){return this.each(function(){jQuery.timer.add(this,d,e,i,g,j)})},oneTime:function(d,e,i){return this.each(function(){jQuery.timer.add(this,
d,e,i,1)})},stopTime:function(d,e){return this.each(function(){jQuery.timer.remove(this,d,e)})}});jQuery.extend({timer:{guid:1,global:{},regex:/^([0-9]+)\s*(.*s)?$/,powers:{ms:1,cs:10,ds:100,s:1E3,das:1E4,hs:1E5,ks:1E6},timeParse:function(d){if(d===K||d===null)return null;var e=this.regex.exec(jQuery.trim(d.toString()));return e[2]?parseInt(e[1],10)*(this.powers[e[2]]||1):d},add:function(d,e,i,g,j,n){var t=0;if(jQuery.isFunction(i)){j||(j=g);g=i;i=e}e=jQuery.timer.timeParse(e);if(!(typeof e!=="number"||
isNaN(e)||e<=0)){if(j&&j.constructor!==Number){n=!!j;j=0}j=j||0;n=n||false;if(!d.$timers)d.$timers={};d.$timers[i]||(d.$timers[i]={});g.$timerID=g.$timerID||this.guid++;var l=function(){if(!(n&&l.inProgress)){l.inProgress=true;if(++t>j&&j!==0||g.call(d,t)===false)jQuery.timer.remove(d,i,g);l.inProgress=false}};l.$timerID=g.$timerID;d.$timers[i][g.$timerID]||(d.$timers[i][g.$timerID]=window.setInterval(l,e));this.global[i]||(this.global[i]=[]);this.global[i].push(d)}},remove:function(d,e,i){var g=
d.$timers,j;if(g){if(e){if(g[e]){if(i){if(i.$timerID){window.clearInterval(g[e][i.$timerID]);delete g[e][i.$timerID]}}else for(var n in g[e])if(g[e].hasOwnProperty(n)){window.clearInterval(g[e][n]);delete g[e][n]}for(j in g[e])if(g[e].hasOwnProperty(j))break;if(!j){j=null;delete g[e]}}}else for(var t in g)g.hasOwnProperty(t)&&this.remove(d,t,i);for(j in g)if(g.hasOwnProperty(j))break;if(!j)d.$timers=null}}}});if(jQuery.browser&&jQuery.browser.msie||/(msie) ([\w.]+)/.exec(navigator.userAgent.toLowerCase()))jQuery(window).one("unload",
function(){var d=jQuery.timer.global,e;for(e in d)if(d.hasOwnProperty(e))for(var i=d[e],g=i.length;--g;)jQuery.timer.remove(i[g],e)});(function(d){if(String.prototype.split.toString().match(/\[native/)){var e=String.prototype.split,i=/()??/.exec("")[1]===d,g;g=function(j,n,t){if(Object.prototype.toString.call(n)!=="[object RegExp]")return e.call(j,n,t);var l=[],F=(n.ignoreCase?"i":"")+(n.multiline?"m":"")+(n.extended?"x":"")+(n.sticky?"y":""),A=0,z,v,C;n=RegExp(n.source,F+"g");j+="";i||(z=RegExp("^"+
n.source+"$(?!\\s)",F));for(t=t===d?4294967295:t>>>0;v=n.exec(j);){F=v.index+v[0].length;if(F>A){l.push(j.slice(A,v.index));!i&&v.length>1&&v[0].replace(z,function(){for(var I=1;I<arguments.length-2;I++)if(arguments[I]===d)v[I]=d});v.length>1&&v.index<j.length&&Array.prototype.push.apply(l,v.slice(1));C=v[0].length;A=F;if(l.length>=t)break}n.lastIndex===v.index&&n.lastIndex++}if(A===j.length){if(C||!n.test(""))l.push("")}else l.push(j.slice(A));return l.length>t?l.slice(0,t):l};String.prototype.split=
function(j,n){return g(this,j,n)};return g}})();f.json_stringify=function(d,e){var i="",g;e=e===K?1:e;switch(typeof d){case "function":i+=d;break;case "boolean":i+=d?"true":"false";break;case "object":if(d===null)i+="null";else if(d instanceof Array){i+="[";var j=d.length;for(g=0;g<j-1;++g)i+=f.json_stringify(d[g],e+1);i+=f.json_stringify(d[j-1],e+1)+"]"}else{i+="{";for(j in d)if(d.hasOwnProperty(j))i+='"'+j+'":'+f.json_stringify(d[j],e+1);i+="}"}break;case "string":j=d;var n={"\\\\":"\\\\",'"':'\\"',
"/":"\\/","\\n":"\\n","\\r":"\\r","\\t":"\\t"};for(g in n)if(n.hasOwnProperty(g))j=j.replace(RegExp(g,"g"),n[g]);i+='"'+j+'"';break;case "number":i+=String(d)}i+=e>1?",":"";if(e===1)i=i.replace(/,([\]}])/g,"$1");return i.replace(/([\[{]),/g,"$1")};f.fn.cmd=function(d){function e(){D.toggleClass("inverted")}function i(){J="(reverse-i-search)`"+I+"': ";L()}function g(a){var q=c.data(),N=q.length;if(a&&O>0)N-=O;if(I.length>0)for(var M=I.length;M>0;M--){a=RegExp("^"+I.substring(0,M));for(var S=N;S--;)if(a.test(q[S])){O=
q.length-S;p=0;l.set(q[S],true);E();if(I.length!==M){I=I.substring(0,M);i()}return}}}function j(a){var q=a.substring(0,z-v);a=a.substring(z-v);return[q].concat(ca(a,z))}function n(){A.focus();l.oneTime(1,function(){l.insert(A.val());A.blur().val("")})}function t(a){if(typeof d.keydown=="function"){var q=d.keydown(a);if(q!==K)return q}if(G){if(C&&(a.which===35||a.which===36||a.which===37||a.which===38||a.which===39||a.which===40||a.which===13||a.which===27)){J=H;C=false;O=null;I="";L();if(a.which===
27)o="";E();t.call(this,a)}else if(a.altKey){if(a.which===68){l.set(o.slice(0,p)+o.slice(p).replace(/[^ ]+ |[^ ]+$/,""),true);return false}return true}else if(a.keyCode===13){if(c&&o&&(d.historyFilter&&d.historyFilter(o)||!d.historyFilter))c.append(o);a=o;c.reset();l.set("");d.commands&&d.commands(a);typeof J==="function"&&L()}else if(a.which===8)if(C){I=I.slice(0,-1);i()}else{if(o!==""&&p>0){o=o.slice(0,p-1)+o.slice(p,o.length);--p;E()}}else if(a.which===9&&!(a.ctrlKey||a.altKey))l.insert("\t");
else if(a.which===46){if(o!==""&&p<o.length){o=o.slice(0,p)+o.slice(p+1,o.length);E()}return true}else if(c&&a.which===38||a.which===80&&a.ctrlKey){if(c.end())T=o;l.set(c.previous())}else if(c&&a.which===40||a.which===78&&a.ctrlKey)l.set(c.end()?T:c.next());else if(a.which===37||a.which===66&&a.ctrlKey)if(a.ctrlKey&&a.which!==66){q=p-1;a=0;for(o[q]===" "&&--q;q>0;--q)if(o[q]===" "&&o[q+1]!==" "){a=q+1;break}else if(o[q]==="\n"&&o[q+1]!=="\n"){a=q;break}l.position(a)}else{if(p>0){--p;E()}}else if(a.which===
82&&a.ctrlKey)if(C)g(true);else{H=J;i();T=o;o="";E();C=true}else if(a.which==71&&a.ctrlKey){if(C){J=H;L();o=T;E();C=false}}else if(a.which===39||a.which===70&&a.ctrlKey)if(a.ctrlKey&&a.which!==70){o[p]===" "&&++p;a=o.slice(p).match(/\S[\n\s]{2,}|[\n\s]+\S?/);if(!a||a[0].match(/^\s+$/))p=o.length;else if(a[0][0]!==" ")p+=a.index+1;else{p+=a.index+a[0].length-1;a[0][a[0].length-1]!==" "&&--p}E()}else{if(p<o.length){++p;E()}}else if(a.which===123)return true;else if(a.which===36)l.position(0);else if(a.which===
35)l.position(o.length);else if(a.shiftKey&&a.which==45){n();return true}else if(a.ctrlKey||a.metaKey){if(a.which===192)return true;if(a.metaKey){if(a.which===82)return true;if(a.which===76)return true}if(a.shiftKey){if(a.which===84)return true}else if(a.which===87){if(o!==""){a=o.slice(0,p);q=o.slice(p+1);var N=a.match(/([^ ]+ *$)/);p=a.length-N[0].length;o=a.slice(0,p)+q;E()}}else if(a.which===72){if(o!==""&&p>0){o=o.slice(0,--p);if(p<o.length-1)o+=o.slice(p);E()}}else if(a.which===65)l.position(0);
else if(a.which===69)l.position(o.length);else if(a.which===88||a.which===67||a.which===84)return true;else if(a.which===86){n();return true}else if(a.which===75)if(p===0)l.set("");else p!==o.length&&l.set(o.slice(0,p));else if(a.which===85){l.set(o.slice(p,o.length));l.position(0)}}else return true;return false}}var l=this,F=l.data("cmd");if(F)return F;l.addClass("cmd");l.append('<span class="prompt"></span><span></span><span class="cursor">&nbsp;</span><span></span>');var A=f("<textarea/>").addClass("clipboard").appendTo(l);
d.width&&l.width(d.width);var z,v,C=false,I="",O=null,H,U=d.mask||false,o="",p=0,J,G=d.enabled,X=d.historySize||60,Y,c,D=l.find(".cursor"),E=function(a){function q(w,y){if(y===w.length){P.html(f.terminal.encode(w));D.html("&nbsp;");V.html("")}else if(y===0){P.html("");D.html(f.terminal.encode(w.slice(0,1)));V.html(f.terminal.encode(w.slice(1)))}else{var s=f.terminal.encode(w.slice(0,y));P.html(s);s=w.slice(y,y+1);D.html(s===" "?"&nbsp;":f.terminal.encode(s));y===w.length-1?V.html(""):V.html(f.terminal.encode(w.slice(y+
1)))}}function N(w){return"<div>"+f.terminal.encode(w)+"</div>"}function M(w){var y=V;f.each(w,function(s,m){y=f(N(m)).insertAfter(y).addClass("clear")})}function S(w){f.each(w,function(y,s){P.before(N(s))})}var P=D.prev(),V=D.next();return function(){var w=U?o.replace(/./g,"*"):o,y,s;a.find("div").remove();P.html("");if(w.length>z-v-1||w.match(/\n/)){var m,b=w.match(/\t/g),h=b?b.length*3:0;if(b)w=w.replace(/\t/g,"\u0000\u0000\u0000\u0000");if(w.match(/\n/)){var k=w.split("\n");s=z-v-1;for(y=0;y<
k.length-1;++y)k[y]+=" ";if(k[0].length>s){m=[k[0].substring(0,s)];m=m.concat(ca(k[0].substring(s),z))}else m=[k[0]];for(y=1;y<k.length;++y)if(k[y].length>z)m=m.concat(ca(k[y],z));else m.push(k[y])}else m=j(w);if(b)m=f.map(m,function(r){return r.replace(/\x00\x00\x00\x00/g,"\t")});s=m[0].length;if(!(s===0&&m.length===1))if(p<s){q(m[0],p);M(m.slice(1))}else if(p===s){P.before(N(m[0]));q(m[1],0);M(m.slice(2))}else{y=m.length;if(p<s){q(m[0],p);M(m.slice(1))}else if(p===s){P.before(N(m[0]));q(m[1],0);
M(m.slice(2))}else{b=m.slice(-1)[0];k=w.length-p;var u=b.length;w=0;if(k<=u){S(m.slice(0,-1));q(b,(u===k?0:u-k)+h)}else if(y===3){P.before("<div>"+f.terminal.encode(m[0])+"</div>");q(m[1],p-s-1);V.after('<div class="clear">'+f.terminal.encode(m[2])+"</div>")}else{w=p;for(y=0;y<m.length;++y){s=m[y].length;if(w>s)w-=s;else break}s=m[y];h=y;if(w===s.length){w=0;s=m[++h]}q(s,w);S(m.slice(0,h));M(m.slice(h+1))}}}}else if(w===""){P.html("");D.html("&nbsp;");V.html("")}else q(w,p)}}(l),T,L=function(){var a=
l.find(".prompt");return function(){if(typeof J==="string"){v=ha(J);a.html(f.terminal.format(J))}else J(function(q){v=ha(q);a.html(f.terminal.format(q))})}}(),Z=[];f.extend(l,{name:function(a){if(a!==K){Y=a;c=new qa(a,X);Z.push(c);return l}else return Y},purge:function(){for(var a=Z.length;a--;)Z[a].purge();Z=[];return l},history:function(){return c},set:function(a,q){if(a!==K){o=a;if(!q)p=o.length;E();if(typeof d.onCommandChange==="function")d.onCommandChange(o)}return l},insert:function(a,q){if(p===
o.length)o+=a;else o=p===0?a+o:o.slice(0,p)+a+o.slice(p);q||(p+=a.length);E();if(typeof d.onCommandChange==="function")d.onCommandChange(o);return l},get:function(){return o},commands:function(a){if(a){d.commands=a;return l}else return a},destroy:function(){f(document.documentElement||window).unbind(".cmd");l.stopTime("blink",e);l.find(".cursor").next().remove().end().prev().remove().end().remove();l.find(".prompt, .clipboard").remove();l.removeClass("cmd");return l},prompt:function(a){if(a===K)return J;
else{if(typeof a==="string"||typeof a==="function")J=a;else throw"prompt must be a function or string";L();E();return l}},position:function(a){if(typeof a==="number"){p=a<0?0:a>o.length?o.length:a;E();return l}else return p},visible:function(){var a=l.visible;return function(){a.apply(l,[]);E();L()}}(),show:function(){var a=l.show;return function(){a.apply(l,[]);E();L()}}(),resize:function(a){if(a)z=a;else{a=l.width();var q=D.innerWidth();z=Math.floor(a/q)}E();return l},enable:function(){if(!G){D.addClass("inverted");
l.everyTime(500,"blink",e);G=true}return l},isenabled:function(){return G},disable:function(){if(G){l.stopTime("blink",e);D.removeClass("inverted");G=false}return l},mask:function(a){if(typeof a==="boolean"){U=a;E();return l}else return U}});l.name(d.name||d.prompt||"");J=d.prompt||"> ";L();if(d.enabled===K||d.enabled===true)l.enable();f(document.documentElement||window).bind("keypress.cmd",function(a){var q;if(a.ctrlKey&&a.which===99)return true;if(!C&&typeof d.keypress==="function")q=d.keypress(a);
if(q===K||q){if(G)if(f.inArray(a.which,[38,13,0,8])>-1&&a.keyCode!==123&&!(a.which===38&&a.shiftKey))return false;else if(!a.ctrlKey&&!(a.altKey&&a.which===100)||a.altKey){if(C){I+=String.fromCharCode(a.which);g();i()}else l.insert(String.fromCharCode(a.which));return false}}else return q}).bind("keydown.cmd",t);l.data("cmd",l);return l};var ra=/(\[\[[gbius]*;[^;]*;[^\]]*\](?:[^\]]*\\\][^\]]*|[^\]]*|[^\[]*\[[^\]]*)\]?)/,ea=/\[\[([gbius]*);([^;]*);([^;\]]*;|[^\]]*);?([^;\]]*;|[^\]]*);?([^\]]*)\]([^\]]*\\\][^\]]*|[^\]]*|[^\[]*\[[^\]]*)\]?/g;
ea=/\[\[([gbius]*);([^;]*);([^;\]]*);?([^;\]]*);?([^\]]*)\]([^\]]*\\\][^\]]*|[^\]]*|[^\[]*\[[^\]]*)\]?/g;var ia=/#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})/,sa=/https?:\/\/(?:(?!&[^;]+;)[^\s:"'<>)])+/g,ta=/((([^<>('")[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))/g,ja=/('[^']*'|"(\\"|[^"])*"|\/(\\\/|[^\/])*\/|(\\ |[^ ])+|[\w-]+)/g;f.terminal={split_equal:function(d,e){for(var i=/\[\[([gbius]*;[^;]*;[^;\]]*;|[^\]]*;?[^\]]*)\]([^\]]*\\\][^\]]*|[^\]]*|[^\[]*\[[^\]]*)\]?/g,
g=/(\[\[[gbius]*;[^;]*;[^\]]*\])/,j=/\[\[[gbius]*;?[^;]*;?[^\]]*\]?$/,n=false,t=false,l="",F=[],A=d.replace(i,function(J,G,X){J=G.match(/;/g).length;return"[["+G+(J==2?";;":J==3?";":"")+X.replace(/\\\]/g,"&#93;").replace(/\n/g,"\\n")+"]"+X+"]"}).split(/\n/g),z=0,v=A.length;z<v;++z)if(A[z]==="")F.push("");else for(var C=A[z],I=0,O=0,H=0,U=C.length;H<U;++H){if(C[H]==="["&&C[H+1]==="[")n=true;else if(n&&C[H]==="]")if(t)t=n=false;else t=true;else if(n&&t||!n)if(C[H]==="&"){var o=C.substring(H).match(/^(&[^;]+;)/);
if(!o)throw"Unclosed html entity at char "+H;H+=o[1].length-2;H===U-1&&F.push(p+o[1]);continue}else if(C[H]==="]"&&C[H-1]==="\\")--O;else++O;if(O===e||H===U-1){var p=C.substring(I,H+1);if(l){p=l+p;if(p.match("]"))l=""}I=H+1;O=0;if(o=p.match(i)){o=o[o.length-1];if(o[o.length-1]!=="]"){l=o.match(g)[1];p+="]"}else if(p.match(j)){p=p.replace(j,"");l=o.match(g)[1]}}F.push(p)}}return F},encode:function(d){return d.replace(/&(?!#[0-9]+;|[a-zA-Z]+;|[^=]+=)/,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,
"<br/>").replace(/ /g,"&nbsp;").replace(/\t/g,"&nbsp;&nbsp;&nbsp;&nbsp;")},format:function(d){if(typeof d==="string"){d=f.terminal.encode(d);var e=d.split(ra);if(e&&e.length>1)d=f.map(e,function(i){return i===""?i:i.substring(0,1)==="["?i.replace(ea,function(g,j,n,t,l,F,A){if(A==="")return"<span>&nbsp;</span>";A=A.replace(/\\]/g,"]");g="";if(j.indexOf("b")!==-1)g+="font-weight:bold;";var z="text-decoration:";if(j.indexOf("u")!==-1)z+="underline ";if(j.indexOf("s")!==-1)z+="line-through";if(j.indexOf("s")!==
-1||j.indexOf("u")!==-1)g+=z+";";if(j.indexOf("i")!==-1)g+="font-style:italic;";if(n.match(ia)){g+="color:"+n+";";if(j.indexOf("g")!==-1)g+="text-shadow: 0 0 5px "+n+";"}if(t.match(ia))g+="background-color:"+t;return'<span style="'+g+'"'+(l!==""?' class="'+l+'"':"")+' data-text="'+(F===""?A:F.replace(/&#93;/g,"]")).replace('"',"&quote;")+'">'+A+"</span>"}):"<span>"+i+"</span>"}).join("");return f.map(d.split(/(<\/?span[^>]*>)/g),function(i){return i.match(/span/)?i:i.replace(sa,function(g){var j=
g.match(/\.$/);g=g.replace(/\.$/,"");return'<a target="_blank" href="'+g+'">'+g+"</a>"+(j?".":"")}).replace(ta,'<a href="mailto:$1">$1</a>')}).join("").replace(/<span><br\/?><\/span>/g,"<br/>")}else return""},strip:function(d){return d.replace(ea,"$6")},active:function(){return W.front()},ansi_colors:{normal:{black:"#000",red:"#AA0000",green:"#008400",yellow:"#AA5500",blue:"#0000AA",magenta:"#AA00AA",cyan:"#00AAAA",white:"#AAA"},faited:{black:"#000",red:"#640000",green:"#006100",yellow:"#737300",
blue:"#000087",magenta:"#650065",cyan:"#008787",white:"#818181"},bold:{black:"#000",red:"#FF5555",green:"#44D544",yellow:"#FFFF55",blue:"#5555FF",magenta:"#FF55FF",cyan:"#55FFFF",white:"#fff"}},from_ansi:function(){function d(g){var j=g.split(";"),n,t=g=false,l=false,F=[],A="",z="",v;for(v in j){n=parseInt(j[v],10);switch(n){case 1:F.push("b");l=true;g=false;break;case 4:F.push("u");break;case 3:F.push("i");break;case 2:g=true;l=false;break;case 7:t=true}if(i[n])z=i[n];if(e[n])A=e[n]}if(t){v=z;z=
A;A=v}A||(A=t?"black":"white");z||(z=t?"white":"black");v=t=f.terminal.ansi_colors.normal;if(l)t=v=f.terminal.ansi_colors.bold;else if(g)t=v=f.terminal.ansi_colors.faited;return"[["+[F.join(""),t[A],v[z]].join(";")+"]"}var e={30:"black",31:"red",32:"green",33:"yellow",34:"blue",35:"magenta",36:"cyan",37:"white"},i={40:"black",41:"red",42:"green",43:"yellow",44:"blue",45:"magenta",46:"cyan",47:"white"};return function(g){var j=g.split(/(\x1B\[[0-9;]*[A-Za-z])/g);if(j.length==1)return g;g=[];if(j.length>
3&&j.slice(0,3).join("")=="[0m")j=j.slice(3);for(var n=false,t=0;t<j.length;++t){var l=j[t].match(/^\x1B\[([0-9;]*)([A-Za-z])$/);if(l)switch(l[2]){case "m":if(l[1]=="")continue;if(n){g.push("]");if(l[1]=="0")n=false;else g.push(d(l[1]))}else{n=true;g.push(d(l[1]))}}else g.push(j[t])}n&&g.push("]");return g.join("")}}(),parseArguments:function(d){return f.map(d.match(ja)||[],function(e){if(e[0]==="'"&&e[e.length-1]==="'")return e.replace(/^'|'$/g,"");else if(e[0]==='"'&&e[e.length-1]==='"'){e=e.replace(/^"|"$/g,
"").replace(/\\([" ])/g,"$1");return e.replace(/\\\\|\\t|\\n/g,function(i){return i[1]==="t"?"\t":i[1]==="n"?"\n":"\\"}).replace(/\\x([0-9a-f]+)/gi,function(i,g){return String.fromCharCode(parseInt(g,16))}).replace(/\\0([0-7]+)/g,function(i,g){return String.fromCharCode(parseInt(g,8))})}else return e[0]==="/"&&e[e.length-1]=="/"?RegExp(e.replace(/^\/|\/$/g,"")):e.match(/^-?[0-9]+$/)?parseInt(e,10):e.match(/^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/)?parseFloat(e):e.replace(/\\ /g," ")})},splitArguments:function(d){return f.map(d.match(ja)||
[],function(e){return e[0]==="'"&&e[e.length-1]==="'"?e.replace(/^'|'$/g,""):e[0]==='"'&&e[e.length-1]==='"'?e.replace(/^"|"$/g,"").replace(/\\([" ])/g,"$1"):e[0]==="/"&&e[e.length-1]=="/"?e:e.replace(/\\ /g," ")})},parseCommand:function(d){return da(d,f.terminal.parseArguments)},splitCommand:function(d){return da(d,f.terminal.splitArguments)}};f.fn.visible=function(){return this.css("visibility","visible")};f.fn.hidden=function(){return this.css("visibility","hidden")};f.jrpc=function(d,e,i,g,j,
n){e=f.json_stringify({jsonrpc:"2.0",method:i,params:g,id:e});return f.ajax({url:d,data:e,success:j,error:n,contentType:"application/json",dataType:"json",async:true,cache:false,type:"POST"})};$=/ {13}$/;var ua=[["jQuery Terminal","(c) 2011-2013 jcubic"],["jQuery Terminal Emulator v. 0.6.5","Copyright (c) 2011-2013 Jakub Jankiewicz <http://jcubic.pl>".replace(/ *<.*>/,"")],["jQuery Terminal Emulator version version 0.6.5","Copyright (c) 2011-2013 Jakub Jankiewicz <http://jcubic.pl>"],["      _______                 ________                        __",
"     / / _  /_ ____________ _/__  ___/______________  _____  / /"," __ / / // / // / _  / _/ // / / / _  / _/     / /  \\/ / _ \\/ /","/  / / // / // / ___/ // // / / / ___/ // / / / / /\\  / // / /__","\\___/____ \\\\__/____/_/ \\__ / /_/____/_//_/ /_/ /_/  \\/\\__\\_\\___/","         \\/          /____/                                   ".replace($,"")+"version 0.6.5","Copyright (c) 2011-2013 Jakub Jankiewicz <http://jcubic.pl>"],["      __ _____                     ________                              __",
"     / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /"," __ / // // // // // _  // _// // / / // _  // _//     // //  \\/ // _ \\/ /","/  / // // // // // ___// / / // / / // ___// / / / / // // /\\  // // / /__","\\___//____ \\\\___//____//_/ _\\_  / /_//____//_/ /_/ /_//_//_/ /_/ \\__\\_\\___/","          \\/              /____/                                          ".replace($,"")+"version 0.6.5","Copyright (c) 2011-2013 Jakub Jankiewicz <http://jcubic.pl>"]],fa=[],W=
new function(d){var e=d?[d]:[],i=0;f.extend(this,{get:function(){return e},rotate:function(){if(e.length===1)return e[0];else{if(i===e.length-1)i=0;else++i;return e[i]}},length:function(){return e.length},set:function(g){for(var j=e.length;j--;)if(e[j]===g){i=j;return}this.append(g)},front:function(){return e[i]},append:function(g){e.push(g)}})},ba=[];f.fn.terminal=function(d,e){function i(){return c.get(0).scrollHeight>c.innerHeight()}function g(){var b=c.find(".cursor").width(),h=Math.floor(c.width()/
b);if(i()){var k=c.innerWidth()-c.width();h-=Math.ceil((20-k/2)/(b-1))}return h}function j(b){return b.replace(/\[/g,"&#91;").replace(/\]/g,"&#93;")}function n(b,h){if(a.displayExceptions){c.error("&#91;"+h+"&#93;: "+(typeof b==="string"?b:typeof b.fileName==="string"?b.fileName+": "+b.message:b.message));if(typeof b.fileName==="string"){c.pause();f.get(b.fileName,function(k){c.resume();var u=b.lineNumber-1;(k=k.split("\n")[u])&&c.error("&#91;"+b.lineNumber+"&#93;: "+k)})}b.stack&&c.error(b.stack)}}
function t(){var b=G.prop?G.prop("scrollHeight"):G.attr("scrollHeight");G.scrollTop(b)}function l(b,h){try{if(typeof h==="function")h(function(){});else if(typeof h!=="string")throw b+" must be string or function";}catch(k){n(k,b.toUpperCase());return false}return true}function F(b,h){var k=f.extend({raw:false,finalize:f.noop},h||{});b=f.type(b)==="function"?b():b;b=f.type(b)==="string"?b:String(b);var u,r,x;if(!k.raw&&(b.length>L||b.match(/\n/))){var B=f.terminal.split_equal(f.terminal.from_ansi(b),
L);u=f("<div></div>");r=0;for(x=B.length;r<x;++r)B[r]===""||B[r]==="\r"?u.append("<div>&nbsp;</div>"):f("<div/>").html(k.raw?B[r]:f.terminal.format(B[r])).appendTo(u)}else{k.raw||(b=f.terminal.format(f.terminal.from_ansi(b)));u=f("<div/>").html("<div>"+b+"</div>")}E.append(u);u.width("100%");k.finalize(u);t();return u}function A(){if(a.greetings===K)c.echo(c.signature);else a.greetings&&c.echo(a.greetings)}function z(b,h){var k=1,u=function(r,x){h.pause();f.jrpc(b,k++,r,x,function(B){if(B.error)h.error("&#91;RPC&#93; "+
B.error.message);else if(typeof B.result==="string")h.echo(B.result);else if(B.result instanceof Array)h.echo(f.map(B.result,function(Q){return f.json_stringify(Q)}).join(" "));else typeof B.result==="object"&&h.echo(f.json_stringify(B.result));h.resume()},function(B,Q){Q!=="abort"&&h.error("&#91;AJAX&#93; "+Q+" - Server reponse is: \n"+B.responseText);h.resume()})};return function(r,x){if(r!==""){r=p(r);if(!a.login||method==="help")u(r.name,r.args);else{var B=x.token();B?u(r.name,[B].concat(r.args)):
x.error("&#91;AUTH&#93; Access denied (no token)")}}}}function v(b){b=j(f.terminal.encode(b));var h=m.prompt();if(m.mask())b=b.replace(/./g,"*");typeof h==="function"?h(function(k){c.echo(k+b)}):c.echo(h+b)}function C(b,h){try{X=b;var k=s.top();if(b==="exit"&&a.exit)if(s.size()===1)if(a.login)O();else{h||v(b);c.echo("You can't exit from main interpeter")}else c.pop("exit");else{h||v(b);var u=D.length-1;if(b==="clear"&&a.clear)c.clear();else{var r=k.eval(b,c);if(r!==K){if(u===D.length-1){D.pop();r!==
false&&c.echo(r)}else D=r===false?D.slice(0,u).concat(D.slice(u+1)):D.slice(0,u).concat([r]).concat(D.slice(u+1));c.resize()}}}}catch(x){n(x,"USER");c.resume();throw x;}}function I(){var b=null;m.prompt("login: ");a.history&&m.history().disable();m.commands(function(h){try{v(h);if(b){m.mask(false);c.pause();if(typeof a.login!=="function")throw"Value of login property must be a function";a.login(b,h,function(u){if(u){var r=a.name;r=(r?r+"_":"")+T+"_";f.Storage.set(r+"token",u);f.Storage.set(r+"login",
b);m.commands(C);U()}else{c.error("Wrong password try again");m.prompt("login: ");b=null}c.resume();a.history&&m.history().enable()},c)}else{b=h;m.prompt("password: ");m.mask(true)}}catch(k){n(k,"LOGIN",c);throw k;}})}function O(){if(typeof a.onBeforelogout==="function")try{if(a.onBeforelogout(c)==false)return}catch(b){n(b,"onBeforelogout");throw b;}var h=(a.name?a.name+"_":"")+T+"_";f.Storage.remove(h+"token");f.Storage.remove(h+"login");a.history&&m.history().disable();I();if(typeof a.onAfterlogout===
"function")try{a.onAfterlogout(c)}catch(k){n(k,"onAfterlogout");throw k;}}function H(){var b=s.top(),h=a.name+"_"+T+(ba.length?"_"+ba.join("_"):"");m.name(h);typeof b.prompt=="function"?m.prompt(function(k){b.prompt(k,c)}):m.prompt(b.prompt);a.history&&m.history().enable();m.set("");if(typeof b.onStart==="function")b.onStart(c)}function U(){H();A();if(typeof a.onInit==="function")try{a.onInit(c)}catch(b){n(b,"OnInit");throw b;}}function o(b){var h=s.top();if(f.type(h.keydown)==="function"){h=h.keydown(b,
c);if(h!==K)return h}var k;c.oneTime(10,function(){P()});if(f.type(a.keydown)==="function"){h=a.keydown(b,c);if(h!==K)return h}if(c.paused()){if(b.which===68&&b.ctrlKey){for(k=fa.length;k--;){b=fa[k];if(4!==b.readyState)try{b.abort()}catch(u){c.error("error in aborting ajax")}}c.resume();return false}}else{if(b.which!==9)Y=0;if(b.which===68&&b.ctrlKey){if(m.get()==="")if(s.size()>1||a.login!==K)c.pop("");else{c.resume();c.echo("")}else c.set_command("");return false}else if(a.tabcompletion&&b.which===
9){++Y;var r=m.get().substring(0,m.position());b=r.split(" ");var x;if(b.length==1)x=b[0];else{x=b[b.length-1];for(k=b.length-1;k>0;k--)if(b[k-1][b[k-1].length-1]=="\\")x=b[k-1]+" "+x;else break}b=x.replace(/([\^\$\[\]\(\)\+\*\.\|])/g,"\\$1");var B=RegExp("^"+b);s.top().completion(c,x,function(Q){if(m.get().substring(0,m.position())===r){var R=[];for(k=Q.length;k--;)B.test(Q[k])&&R.push(Q[k]);if(R.length===1)c.insert(R[0].replace(B,""));else if(R.length>1)if(Y>=2){v(r);c.echo(R.join("\t"));Y=0}else{Q=
false;var aa=x.length;a:for(;aa<R[0].length;++aa){for(k=1;k<R.length;++k)if(R[0].charAt(aa)!==R[k].charAt(aa))break a;Q=true}Q&&c.insert(R[0].slice(0,aa).replace(B,""))}}});return false}else if(b.which===86&&b.ctrlKey)c.oneTime(1,function(){t()});else if(b.which===9&&b.ctrlKey){if(W.length()>1){c.focus(false);return false}}else if(b.which===34)c.scroll(c.height());else b.which===33?c.scroll(-c.height()):c.attr({scrollTop:c.attr("scrollHeight")})}}function p(b){return f.type(a.processArguments)===
"function"?da(b,a.processArguments):a.processArguments?f.terminal.parseCommand(b):f.terminal.splitCommand(b)}function J(b){return function(h){if(h!==""){h=p(h);var k=b[h.name],u=f.type(k);if(u==="function")return k.apply(c,h.args);else if(u==="object"||u==="string"){var r=[];if(u==="object"){for(var x in k)k.hasOwnProperty(x)&&r.push(x);k=J(k)}c.push(k,{prompt:h.name+"> ",name:h.name,completion:u==="object"?function(B,Q,R){R(r)}:K})}else c.error("Command '"+h.name+"' Not Found")}}}var G,X,Y=0,c=this;
if(this.length>1)return this.each(function(){f.fn.terminal.call(f(this),d,f.extend({name:c.selector},e))});else{var D=[],E,T=W.length(),L,Z=[],a=f.extend({name:c.selector,prompt:"> ",history:true,exit:true,clear:true,enabled:true,historySize:60,displayExceptions:true,cancelableAjax:true,processArguments:true,login:null,tabcompletion:null,historyFilter:null,onInit:f.noop,onClear:f.noop,onBlur:f.noop,onFocus:f.noop,onTerminalChange:f.noop,onExit:f.noop,keypress:f.noop,keydown:f.noop},e||{});a.width&&
c.width(a.width);a.height&&c.height(a.height);G=!navigator.userAgent.toLowerCase().match(/(webkit)[ \/]([\w.]+)/)&&c[0].tagName.toLowerCase()=="body"?f("html"):c;var q=!a.enabled;if(c.length===0)throw'Sorry, but terminal said that "'+c.selector+'" is not valid selector!';c.ajaxSend(function(b,h){fa.push(h)});if(c.data("terminal"))return c.data("terminal");E=f("<div>").addClass("terminal-output").appendTo(c);c.addClass("terminal").append("<div/>");if("ontouchstart"in window||window.DocumentTouch&&
document instanceof DocumentTouch){c.click(function(){c.find("textarea").focus()});c.find("textarea").focus()}var N,M,S=[];f.extend(c,f.omap({clear:function(){E.html("");m.set("");D=[];try{a.onClear(c)}catch(b){n(b,"onClear");throw b;}c.attr({scrollTop:0});return c},export_view:function(){return{prompt:c.get_prompt(),command:c.get_command(),position:m.position(),lines:D.slice(0)}},import_view:function(b){c.set_prompt(b.prompt);c.set_command(b.command);m.position(b.position);D=b.lines;c.resize();return c},
exec:function(b,h){q?S.push([b,h]):C(b,h);return c},commands:function(){return s.top().eval},greetings:function(){A();return c},paused:function(){return q},pause:function(){if(m){q=true;c.disable();m.hidden()}return c},resume:function(){if(m){c.enable();var b=S;for(S=[];b.length;){var h=b.shift();c.exec.apply(c,h)}m.visible();t()}return c},cols:function(){return L},rows:function(){return Math.floor(c.height()/c.find(".cursor").height())},history:function(){return m.history()},next:function(){if(W.length()===
1)return c;else{var b=c.offset().top;c.height();c.scrollTop();var h=c,k=f(window).scrollTop(),u=k+f(window).height(),r=f(h).offset().top;if(r+f(h).height()>=k&&r<=u){W.front().disable();b=W.rotate().enable();h=b.offset().top-50;f("html,body").animate({scrollTop:h},500);try{a.onTerminalChange(b)}catch(x){n(x,"onTerminalChange");throw x;}return b}else{c.enable();f("html,body").animate({scrollTop:b-50},500);return c}}},focus:function(b,h){c.oneTime(1,function(){if(W.length()===1)if(b===false)try{!h&&
a.onBlur(c)!==false&&c.disable()}catch(k){n(k,"onBlur");throw k;}else try{!h&&a.onFocus(c)!==false&&c.enable()}catch(u){n(u,"onFocus");throw u;}else if(b===false)c.next();else{var r=W.front();if(r!=c){r.disable();if(!h)try{a.onTerminalChange(c)}catch(x){n(x,"onTerminalChange");throw x;}}W.set(c);c.enable()}});return c},enable:function(){L===K&&c.resize();if(q)if(m){m.enable();q=false}return c},disable:function(){if(m){q=true;m.disable()}return c},enabled:function(){return q},signature:function(){var b=
c.cols();b=b<15?null:b<35?0:b<55?1:b<64?2:b<75?3:4;return b!==null?ua[b].join("\n")+"\n":""},version:function(){return"0.6.5"},get_command:function(){return m.get()},insert:function(b){if(typeof b==="string"){m.insert(b);return c}else throw"insert function argument is not a string";},set_prompt:function(b){if(l("prompt",b)){typeof b=="function"?m.prompt(function(h){b(h,c)}):m.prompt(b);s.top().prompt=b}return c},get_prompt:function(){return s.top().prompt},set_command:function(b){m.set(b);return c},
set_mask:function(b){m.mask(b);return c},get_output:function(b){return b?D:f.map(D,function(h,k){return typeof k=="function"?k():k}).join("\n")},resize:function(b,h){if(b&&h){c.width(b);c.height(h)}b=c.width();h=c.height();L=g();m.resize(L);var k=E.detach();E.html("");f.each(D,function(u,r){F.apply(null,r)});c.prepend(k);t();if(f.type(a.onResize)==="function"&&(M!==h||N!==b))a.onResize(c);if(M!==h||N!==b){M=h;N=b}return c},echo:function(b,h){var k=f.extend({raw:false,finalize:f.noop},h||{});D.push([b,
k]);F(b,k);P();return c},error:function(b,h){return c.echo("[[;#f00;]"+j(b).replace(/\\$/,"&#92;")+"]",h)},scroll:function(b){var h;b=Math.round(b);if(G.prop){b>G.prop("scrollTop")&&b>0&&G.prop("scrollTop",0);h=G.prop("scrollTop")}else{b>G.attr("scrollTop")&&b>0&&G.attr("scrollTop",0);h=G.attr("scrollTop")}G.scrollTop(h+b);return c},logout:a.login?function(){for(;s.size()>1;)s.pop();O();return c}:function(){throw"You don't have login function";},token:a.login?function(){var b=a.name;return f.Storage.get((b?
b+"_":"")+T+"_token")}:f.noop,login_name:a.login?function(){var b=a.name;return f.Storage.get((b?b+"_":"")+T+"_login")}:f.noop,name:function(){return s.top().name},push:function(b,h){if(h&&(!h.prompt||l("prompt",h.prompt))||!h){h=h||{};h.name=h.name||X;h.prompt=h.prompt||h.name+" ";ba.push(h.name);s.top().mask=m.mask();if(f.type(b)==="string")b=z(b,c);else if(f.type(b)==="object"){var k=[],u;for(u in b)k.push(u);b=J(b);h=h||{};h.completion=function(r,x,B){B(k)}}else if(f.type(b)!="function")throw"Invalid value as eval in push command";
s.push(f.extend({eval:b},h));H()}return c},pop:function(b){b!==K&&v(b);ba.pop();if(s.top().name===a.name){if(a.login){O();if(f.type(a.onExit)==="function")try{a.onExit(c)}catch(h){n(h,"onExit");throw h;}}}else{b=s.pop();H();if(f.type(b.onExit)==="function")try{b.onExit(c)}catch(k){n(k,"onExit");throw k;}c.set_mask(s.top().mask)}return c},level:function(){return s.size()},reset:function(){for(c.clear();s.size()>1;)s.pop();U()},purge:function(){m.purge();var b=(a.name?a.name+"_":"")+T+"_";f.Storage.remove(b+
"token");f.Storage.remove(b+"login")}},function(b,h){return function(){try{return h.apply(this,Array.prototype.slice.apply(arguments))}catch(k){b!=="exec"&&n(k,"TERMINAL");throw k;}}}));var P=function(){var b=i();return function(){if(b!==i()){c.resize();b=i()}}}(),V;if(a.login&&f.type(a.onBeforeLogin)==="function")try{a.onBeforeLogin(c)}catch(w){n(w,"onBeforeLogin");throw w;}if(f.type(d)==="string"){V=d;d=z(d,c)}else if(f.type(d)==="array")throw"You can't use array as eval";else if(f.type(d)==="object"){for(var y in d)d.hasOwnProperty(y)&&
Z.push(y);d=J(d)}else if(f.type(d)!=="function")throw'Unknow object "'+String(d)+'" passed as eval';if(V&&(f.type(a.login)==="string"||a.login))a.login=function(b){var h=1;return function(k,u,r){c.pause();f.jrpc(V,h++,b,[k,u],function(x){c.resume();!x.error&&x.result?r(x.result):r(null)},function(x,B){c.resume();c.error("&#91;AJAX&#92; Response: "+B+"\n"+x.responseText)})}}(f.type(a.login)==="boolean"?"login":a.login);if(l("prompt",a.prompt)){var s=new pa({name:a.name,eval:d,prompt:a.prompt,completion:a.completion?
a.completion:function(b,h,k){k(Z)},greetings:a.greetings}),m=c.find(".terminal-output").next().cmd({prompt:a.prompt,history:a.history,historyFilter:a.historyFilter,historySize:a.historySize,width:"100%",keydown:o,keypress:a.keypress?function(b){return a.keypress(b,c)}:null,onCommandChange:function(b){if(f.type(a.onCommandChange)==="function")try{a.onCommandChange(b,c)}catch(h){n(h,"onCommandChange");throw h;}t()},commands:C});L=g();W.append(c);a.enabled===true?c.focus(K,true):c.disable();f(document).click(function(b){!f(b.target).parents().hasClass("terminal")&&
a.onBlur(c)!==false&&c.disable()});f(window).resize(function(){if(c.is(":visible")){var b=c.width(),h=c.height();if(M!==h||N!==b)c.resize()}});c.click(function(){c.focus()});a.login&&c.token&&!c.token()&&c.login_name&&!c.login_name()?I():U();f.type(f.fn.init.prototype.mousewheel)==="function"&&c.mousewheel(function(b,h){h>0?c.scroll(-40):c.scroll(40);return false},true)}c.data("terminal",c);return c}}})(jQuery);
