/**
 * breakpt.js
 * 
 * @author Alexander Vince https://github.com/AlexanderVince 
 * @copyright 2015 Alexander Vince 
 * @license BSD 3-Clause <http://opensource.org/licenses/BSD-3-Clause>
 *
 */
window.BreakPoint=function(a,b,c){"use strict";var d={__initialised:!1,__breakPoints:[],__lastWidth:0,__currentBreakPoint:0,set:function(a){return this.__initialised?!1:(this.__initialised=!0,this.__breakPoints=a,this.addListeners(),void this.checkBreakPoints())}};return d.addListeners=function(){a.addEventListener("resize",this.checkBreakPoints.bind(this),!1)},d.checkBreakPoints=function(){for(var a=this.getDimensions().w,b=[].concat(this.__breakPoints),c=b.sort(function(a,b){return b-a}),d=!1,e=0,f=c.length;f>e;e++)!d&&a>=c[e]&&this.__lastWidth<c[e]&&(this.__currentBreakPoint=c[e],this.publish("EnterBreakpoint/"+c[e]),d=!0),a<c[e]&&this.__lastWidth>=c[e]&&this.publish("ExitBreakpoint/"+c[e]),a>=c[e]&&a<c[e-1]&&this.__lastWidth>a&&this.__lastWidth>0&&this.__currentBreakPoint!==c[e]&&(this.__currentBreakPoint=c[e],this.publish("EnterBreakpoint/"+c[e]));this.__lastWidth=this.__lastWidth!==a?a:this.__lastWidth},d.getDimensions=function(){var c=a,d=b,e=d.documentElement,f=d.getElementsByTagName("body")[0],g=c.innerWidth||e.clientWidth||f.clientWidth,h=c.innerHeight||e.clientHeight||f.clientHeight;if(!g||!h)throw new Error("BreakPoint: Cannot determine device screen dimensions");return{w:g,h:h}},d.publish=function(a){var c;"function"==typeof Event?c=new Event(a):b.createEvent&&(c=b.createEvent("Event"),c.initEvent(a,!0,!0)),b.dispatchEvent(c)},d}(window,document);