var zu=e=>{throw TypeError(e)};var ja=(e,t,n)=>t.has(e)||zu("Cannot "+n);var j=(e,t,n)=>(ja(e,t,"read from private field"),n?n.call(e):t.get(e)),D=(e,t,n)=>t.has(e)?zu("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),A=(e,t,n,r)=>(ja(e,t,"write to private field"),r?r.call(e,n):t.set(e,n),n),q=(e,t,n)=>(ja(e,t,"access private method"),n);var $i=(e,t,n,r)=>({set _(s){A(e,t,s,n)},get _(){return j(e,t,r)}});function g0(e,t){for(var n=0;n<t.length;n++){const r=t[n];if(typeof r!="string"&&!Array.isArray(r)){for(const s in r)if(s!=="default"&&!(s in e)){const i=Object.getOwnPropertyDescriptor(r,s);i&&Object.defineProperty(e,s,i.get?i:{enumerable:!0,get:()=>r[s]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();function y0(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Wf={exports:{}},Go={},Hf={exports:{}},Q={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _i=Symbol.for("react.element"),x0=Symbol.for("react.portal"),v0=Symbol.for("react.fragment"),b0=Symbol.for("react.strict_mode"),w0=Symbol.for("react.profiler"),k0=Symbol.for("react.provider"),S0=Symbol.for("react.context"),j0=Symbol.for("react.forward_ref"),C0=Symbol.for("react.suspense"),E0=Symbol.for("react.memo"),T0=Symbol.for("react.lazy"),Lu=Symbol.iterator;function _0(e){return e===null||typeof e!="object"?null:(e=Lu&&e[Lu]||e["@@iterator"],typeof e=="function"?e:null)}var Vf={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},qf=Object.assign,Qf={};function ks(e,t,n){this.props=e,this.context=t,this.refs=Qf,this.updater=n||Vf}ks.prototype.isReactComponent={};ks.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};ks.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Kf(){}Kf.prototype=ks.prototype;function kc(e,t,n){this.props=e,this.context=t,this.refs=Qf,this.updater=n||Vf}var Sc=kc.prototype=new Kf;Sc.constructor=kc;qf(Sc,ks.prototype);Sc.isPureReactComponent=!0;var Ou=Array.isArray,Yf=Object.prototype.hasOwnProperty,jc={current:null},Jf={key:!0,ref:!0,__self:!0,__source:!0};function Xf(e,t,n){var r,s={},i=null,a=null;if(t!=null)for(r in t.ref!==void 0&&(a=t.ref),t.key!==void 0&&(i=""+t.key),t)Yf.call(t,r)&&!Jf.hasOwnProperty(r)&&(s[r]=t[r]);var l=arguments.length-2;if(l===1)s.children=n;else if(1<l){for(var c=Array(l),u=0;u<l;u++)c[u]=arguments[u+2];s.children=c}if(e&&e.defaultProps)for(r in l=e.defaultProps,l)s[r]===void 0&&(s[r]=l[r]);return{$$typeof:_i,type:e,key:i,ref:a,props:s,_owner:jc.current}}function N0(e,t){return{$$typeof:_i,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Cc(e){return typeof e=="object"&&e!==null&&e.$$typeof===_i}function R0(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Iu=/\/+/g;function Ca(e,t){return typeof e=="object"&&e!==null&&e.key!=null?R0(""+e.key):t.toString(36)}function ao(e,t,n,r,s){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var a=!1;if(e===null)a=!0;else switch(i){case"string":case"number":a=!0;break;case"object":switch(e.$$typeof){case _i:case x0:a=!0}}if(a)return a=e,s=s(a),e=r===""?"."+Ca(a,0):r,Ou(s)?(n="",e!=null&&(n=e.replace(Iu,"$&/")+"/"),ao(s,t,n,"",function(u){return u})):s!=null&&(Cc(s)&&(s=N0(s,n+(!s.key||a&&a.key===s.key?"":(""+s.key).replace(Iu,"$&/")+"/")+e)),t.push(s)),1;if(a=0,r=r===""?".":r+":",Ou(e))for(var l=0;l<e.length;l++){i=e[l];var c=r+Ca(i,l);a+=ao(i,t,n,c,s)}else if(c=_0(e),typeof c=="function")for(e=c.call(e),l=0;!(i=e.next()).done;)i=i.value,c=r+Ca(i,l++),a+=ao(i,t,n,c,s);else if(i==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return a}function Bi(e,t,n){if(e==null)return e;var r=[],s=0;return ao(e,r,"","",function(i){return t.call(n,i,s++)}),r}function P0(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Je={current:null},lo={transition:null},z0={ReactCurrentDispatcher:Je,ReactCurrentBatchConfig:lo,ReactCurrentOwner:jc};function Gf(){throw Error("act(...) is not supported in production builds of React.")}Q.Children={map:Bi,forEach:function(e,t,n){Bi(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Bi(e,function(){t++}),t},toArray:function(e){return Bi(e,function(t){return t})||[]},only:function(e){if(!Cc(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};Q.Component=ks;Q.Fragment=v0;Q.Profiler=w0;Q.PureComponent=kc;Q.StrictMode=b0;Q.Suspense=C0;Q.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=z0;Q.act=Gf;Q.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=qf({},e.props),s=e.key,i=e.ref,a=e._owner;if(t!=null){if(t.ref!==void 0&&(i=t.ref,a=jc.current),t.key!==void 0&&(s=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(c in t)Yf.call(t,c)&&!Jf.hasOwnProperty(c)&&(r[c]=t[c]===void 0&&l!==void 0?l[c]:t[c])}var c=arguments.length-2;if(c===1)r.children=n;else if(1<c){l=Array(c);for(var u=0;u<c;u++)l[u]=arguments[u+2];r.children=l}return{$$typeof:_i,type:e.type,key:s,ref:i,props:r,_owner:a}};Q.createContext=function(e){return e={$$typeof:S0,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:k0,_context:e},e.Consumer=e};Q.createElement=Xf;Q.createFactory=function(e){var t=Xf.bind(null,e);return t.type=e,t};Q.createRef=function(){return{current:null}};Q.forwardRef=function(e){return{$$typeof:j0,render:e}};Q.isValidElement=Cc;Q.lazy=function(e){return{$$typeof:T0,_payload:{_status:-1,_result:e},_init:P0}};Q.memo=function(e,t){return{$$typeof:E0,type:e,compare:t===void 0?null:t}};Q.startTransition=function(e){var t=lo.transition;lo.transition={};try{e()}finally{lo.transition=t}};Q.unstable_act=Gf;Q.useCallback=function(e,t){return Je.current.useCallback(e,t)};Q.useContext=function(e){return Je.current.useContext(e)};Q.useDebugValue=function(){};Q.useDeferredValue=function(e){return Je.current.useDeferredValue(e)};Q.useEffect=function(e,t){return Je.current.useEffect(e,t)};Q.useId=function(){return Je.current.useId()};Q.useImperativeHandle=function(e,t,n){return Je.current.useImperativeHandle(e,t,n)};Q.useInsertionEffect=function(e,t){return Je.current.useInsertionEffect(e,t)};Q.useLayoutEffect=function(e,t){return Je.current.useLayoutEffect(e,t)};Q.useMemo=function(e,t){return Je.current.useMemo(e,t)};Q.useReducer=function(e,t,n){return Je.current.useReducer(e,t,n)};Q.useRef=function(e){return Je.current.useRef(e)};Q.useState=function(e){return Je.current.useState(e)};Q.useSyncExternalStore=function(e,t,n){return Je.current.useSyncExternalStore(e,t,n)};Q.useTransition=function(){return Je.current.useTransition()};Q.version="18.3.1";Hf.exports=Q;var b=Hf.exports;const ne=y0(b),L0=g0({__proto__:null,default:ne},[b]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var O0=b,I0=Symbol.for("react.element"),A0=Symbol.for("react.fragment"),M0=Object.prototype.hasOwnProperty,F0=O0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,D0={key:!0,ref:!0,__self:!0,__source:!0};function Zf(e,t,n){var r,s={},i=null,a=null;n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(a=t.ref);for(r in t)M0.call(t,r)&&!D0.hasOwnProperty(r)&&(s[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)s[r]===void 0&&(s[r]=t[r]);return{$$typeof:I0,type:e,key:i,ref:a,props:s,_owner:F0.current}}Go.Fragment=A0;Go.jsx=Zf;Go.jsxs=Zf;Wf.exports=Go;var o=Wf.exports,ep={exports:{}},ht={},tp={exports:{}},np={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(O,W){var H=O.length;O.push(W);e:for(;0<H;){var Y=H-1>>>1,G=O[Y];if(0<s(G,W))O[Y]=W,O[H]=G,H=Y;else break e}}function n(O){return O.length===0?null:O[0]}function r(O){if(O.length===0)return null;var W=O[0],H=O.pop();if(H!==W){O[0]=H;e:for(var Y=0,G=O.length,Me=G>>>1;Y<Me;){var Ee=2*(Y+1)-1,Bt=O[Ee],ct=Ee+1,xn=O[ct];if(0>s(Bt,H))ct<G&&0>s(xn,Bt)?(O[Y]=xn,O[ct]=H,Y=ct):(O[Y]=Bt,O[Ee]=H,Y=Ee);else if(ct<G&&0>s(xn,H))O[Y]=xn,O[ct]=H,Y=ct;else break e}}return W}function s(O,W){var H=O.sortIndex-W.sortIndex;return H!==0?H:O.id-W.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;e.unstable_now=function(){return i.now()}}else{var a=Date,l=a.now();e.unstable_now=function(){return a.now()-l}}var c=[],u=[],p=1,m=null,y=3,w=!1,g=!1,v=!1,S=typeof setTimeout=="function"?setTimeout:null,x=typeof clearTimeout=="function"?clearTimeout:null,f=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function h(O){for(var W=n(u);W!==null;){if(W.callback===null)r(u);else if(W.startTime<=O)r(u),W.sortIndex=W.expirationTime,t(c,W);else break;W=n(u)}}function k(O){if(v=!1,h(O),!g)if(n(c)!==null)g=!0,se(E);else{var W=n(u);W!==null&&me(k,W.startTime-O)}}function E(O,W){g=!1,v&&(v=!1,x(N),N=-1),w=!0;var H=y;try{for(h(W),m=n(c);m!==null&&(!(m.expirationTime>W)||O&&!U());){var Y=m.callback;if(typeof Y=="function"){m.callback=null,y=m.priorityLevel;var G=Y(m.expirationTime<=W);W=e.unstable_now(),typeof G=="function"?m.callback=G:m===n(c)&&r(c),h(W)}else r(c);m=n(c)}if(m!==null)var Me=!0;else{var Ee=n(u);Ee!==null&&me(k,Ee.startTime-W),Me=!1}return Me}finally{m=null,y=H,w=!1}}var R=!1,T=null,N=-1,C=5,P=-1;function U(){return!(e.unstable_now()-P<C)}function J(){if(T!==null){var O=e.unstable_now();P=O;var W=!0;try{W=T(!0,O)}finally{W?re():(R=!1,T=null)}}else R=!1}var re;if(typeof f=="function")re=function(){f(J)};else if(typeof MessageChannel<"u"){var xe=new MessageChannel,ve=xe.port2;xe.port1.onmessage=J,re=function(){ve.postMessage(null)}}else re=function(){S(J,0)};function se(O){T=O,R||(R=!0,re())}function me(O,W){N=S(function(){O(e.unstable_now())},W)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(O){O.callback=null},e.unstable_continueExecution=function(){g||w||(g=!0,se(E))},e.unstable_forceFrameRate=function(O){0>O||125<O?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):C=0<O?Math.floor(1e3/O):5},e.unstable_getCurrentPriorityLevel=function(){return y},e.unstable_getFirstCallbackNode=function(){return n(c)},e.unstable_next=function(O){switch(y){case 1:case 2:case 3:var W=3;break;default:W=y}var H=y;y=W;try{return O()}finally{y=H}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(O,W){switch(O){case 1:case 2:case 3:case 4:case 5:break;default:O=3}var H=y;y=O;try{return W()}finally{y=H}},e.unstable_scheduleCallback=function(O,W,H){var Y=e.unstable_now();switch(typeof H=="object"&&H!==null?(H=H.delay,H=typeof H=="number"&&0<H?Y+H:Y):H=Y,O){case 1:var G=-1;break;case 2:G=250;break;case 5:G=1073741823;break;case 4:G=1e4;break;default:G=5e3}return G=H+G,O={id:p++,callback:W,priorityLevel:O,startTime:H,expirationTime:G,sortIndex:-1},H>Y?(O.sortIndex=H,t(u,O),n(c)===null&&O===n(u)&&(v?(x(N),N=-1):v=!0,me(k,H-Y))):(O.sortIndex=G,t(c,O),g||w||(g=!0,se(E))),O},e.unstable_shouldYield=U,e.unstable_wrapCallback=function(O){var W=y;return function(){var H=y;y=W;try{return O.apply(this,arguments)}finally{y=H}}}})(np);tp.exports=np;var $0=tp.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var B0=b,pt=$0;function L(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var rp=new Set,ti={};function Rr(e,t){hs(e,t),hs(e+"Capture",t)}function hs(e,t){for(ti[e]=t,e=0;e<t.length;e++)rp.add(t[e])}var un=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),tl=Object.prototype.hasOwnProperty,U0=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Au={},Mu={};function W0(e){return tl.call(Mu,e)?!0:tl.call(Au,e)?!1:U0.test(e)?Mu[e]=!0:(Au[e]=!0,!1)}function H0(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function V0(e,t,n,r){if(t===null||typeof t>"u"||H0(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Xe(e,t,n,r,s,i,a){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=s,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=a}var Ae={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){Ae[e]=new Xe(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];Ae[t]=new Xe(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){Ae[e]=new Xe(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){Ae[e]=new Xe(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){Ae[e]=new Xe(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){Ae[e]=new Xe(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){Ae[e]=new Xe(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){Ae[e]=new Xe(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){Ae[e]=new Xe(e,5,!1,e.toLowerCase(),null,!1,!1)});var Ec=/[\-:]([a-z])/g;function Tc(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Ec,Tc);Ae[t]=new Xe(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Ec,Tc);Ae[t]=new Xe(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Ec,Tc);Ae[t]=new Xe(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){Ae[e]=new Xe(e,1,!1,e.toLowerCase(),null,!1,!1)});Ae.xlinkHref=new Xe("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){Ae[e]=new Xe(e,1,!1,e.toLowerCase(),null,!0,!0)});function _c(e,t,n,r){var s=Ae.hasOwnProperty(t)?Ae[t]:null;(s!==null?s.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(V0(t,n,s,r)&&(n=null),r||s===null?W0(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):s.mustUseProperty?e[s.propertyName]=n===null?s.type===3?!1:"":n:(t=s.attributeName,r=s.attributeNamespace,n===null?e.removeAttribute(t):(s=s.type,n=s===3||s===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var mn=B0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ui=Symbol.for("react.element"),Fr=Symbol.for("react.portal"),Dr=Symbol.for("react.fragment"),Nc=Symbol.for("react.strict_mode"),nl=Symbol.for("react.profiler"),sp=Symbol.for("react.provider"),ip=Symbol.for("react.context"),Rc=Symbol.for("react.forward_ref"),rl=Symbol.for("react.suspense"),sl=Symbol.for("react.suspense_list"),Pc=Symbol.for("react.memo"),kn=Symbol.for("react.lazy"),op=Symbol.for("react.offscreen"),Fu=Symbol.iterator;function zs(e){return e===null||typeof e!="object"?null:(e=Fu&&e[Fu]||e["@@iterator"],typeof e=="function"?e:null)}var fe=Object.assign,Ea;function Bs(e){if(Ea===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Ea=t&&t[1]||""}return`
`+Ea+e}var Ta=!1;function _a(e,t){if(!e||Ta)return"";Ta=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(u){var r=u}Reflect.construct(e,[],t)}else{try{t.call()}catch(u){r=u}e.call(t.prototype)}else{try{throw Error()}catch(u){r=u}e()}}catch(u){if(u&&r&&typeof u.stack=="string"){for(var s=u.stack.split(`
`),i=r.stack.split(`
`),a=s.length-1,l=i.length-1;1<=a&&0<=l&&s[a]!==i[l];)l--;for(;1<=a&&0<=l;a--,l--)if(s[a]!==i[l]){if(a!==1||l!==1)do if(a--,l--,0>l||s[a]!==i[l]){var c=`
`+s[a].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=a&&0<=l);break}}}finally{Ta=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Bs(e):""}function q0(e){switch(e.tag){case 5:return Bs(e.type);case 16:return Bs("Lazy");case 13:return Bs("Suspense");case 19:return Bs("SuspenseList");case 0:case 2:case 15:return e=_a(e.type,!1),e;case 11:return e=_a(e.type.render,!1),e;case 1:return e=_a(e.type,!0),e;default:return""}}function il(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Dr:return"Fragment";case Fr:return"Portal";case nl:return"Profiler";case Nc:return"StrictMode";case rl:return"Suspense";case sl:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case ip:return(e.displayName||"Context")+".Consumer";case sp:return(e._context.displayName||"Context")+".Provider";case Rc:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Pc:return t=e.displayName||null,t!==null?t:il(e.type)||"Memo";case kn:t=e._payload,e=e._init;try{return il(e(t))}catch{}}return null}function Q0(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return il(t);case 8:return t===Nc?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Kn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function ap(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function K0(e){var t=ap(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var s=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return s.call(this)},set:function(a){r=""+a,i.call(this,a)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(a){r=""+a},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Wi(e){e._valueTracker||(e._valueTracker=K0(e))}function lp(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=ap(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function jo(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function ol(e,t){var n=t.checked;return fe({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Du(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Kn(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function cp(e,t){t=t.checked,t!=null&&_c(e,"checked",t,!1)}function al(e,t){cp(e,t);var n=Kn(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?ll(e,t.type,n):t.hasOwnProperty("defaultValue")&&ll(e,t.type,Kn(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function $u(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function ll(e,t,n){(t!=="number"||jo(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Us=Array.isArray;function Jr(e,t,n,r){if(e=e.options,t){t={};for(var s=0;s<n.length;s++)t["$"+n[s]]=!0;for(n=0;n<e.length;n++)s=t.hasOwnProperty("$"+e[n].value),e[n].selected!==s&&(e[n].selected=s),s&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Kn(n),t=null,s=0;s<e.length;s++){if(e[s].value===n){e[s].selected=!0,r&&(e[s].defaultSelected=!0);return}t!==null||e[s].disabled||(t=e[s])}t!==null&&(t.selected=!0)}}function cl(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(L(91));return fe({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Bu(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(L(92));if(Us(n)){if(1<n.length)throw Error(L(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Kn(n)}}function up(e,t){var n=Kn(t.value),r=Kn(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Uu(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function dp(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function ul(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?dp(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Hi,fp=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,s){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,s)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Hi=Hi||document.createElement("div"),Hi.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Hi.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function ni(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var qs={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Y0=["Webkit","ms","Moz","O"];Object.keys(qs).forEach(function(e){Y0.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),qs[t]=qs[e]})});function pp(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||qs.hasOwnProperty(e)&&qs[e]?(""+t).trim():t+"px"}function hp(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,s=pp(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,s):e[n]=s}}var J0=fe({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function dl(e,t){if(t){if(J0[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(L(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(L(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(L(61))}if(t.style!=null&&typeof t.style!="object")throw Error(L(62))}}function fl(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var pl=null;function zc(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var hl=null,Xr=null,Gr=null;function Wu(e){if(e=Pi(e)){if(typeof hl!="function")throw Error(L(280));var t=e.stateNode;t&&(t=ra(t),hl(e.stateNode,e.type,t))}}function mp(e){Xr?Gr?Gr.push(e):Gr=[e]:Xr=e}function gp(){if(Xr){var e=Xr,t=Gr;if(Gr=Xr=null,Wu(e),t)for(e=0;e<t.length;e++)Wu(t[e])}}function yp(e,t){return e(t)}function xp(){}var Na=!1;function vp(e,t,n){if(Na)return e(t,n);Na=!0;try{return yp(e,t,n)}finally{Na=!1,(Xr!==null||Gr!==null)&&(xp(),gp())}}function ri(e,t){var n=e.stateNode;if(n===null)return null;var r=ra(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(L(231,t,typeof n));return n}var ml=!1;if(un)try{var Ls={};Object.defineProperty(Ls,"passive",{get:function(){ml=!0}}),window.addEventListener("test",Ls,Ls),window.removeEventListener("test",Ls,Ls)}catch{ml=!1}function X0(e,t,n,r,s,i,a,l,c){var u=Array.prototype.slice.call(arguments,3);try{t.apply(n,u)}catch(p){this.onError(p)}}var Qs=!1,Co=null,Eo=!1,gl=null,G0={onError:function(e){Qs=!0,Co=e}};function Z0(e,t,n,r,s,i,a,l,c){Qs=!1,Co=null,X0.apply(G0,arguments)}function eg(e,t,n,r,s,i,a,l,c){if(Z0.apply(this,arguments),Qs){if(Qs){var u=Co;Qs=!1,Co=null}else throw Error(L(198));Eo||(Eo=!0,gl=u)}}function Pr(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function bp(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Hu(e){if(Pr(e)!==e)throw Error(L(188))}function tg(e){var t=e.alternate;if(!t){if(t=Pr(e),t===null)throw Error(L(188));return t!==e?null:e}for(var n=e,r=t;;){var s=n.return;if(s===null)break;var i=s.alternate;if(i===null){if(r=s.return,r!==null){n=r;continue}break}if(s.child===i.child){for(i=s.child;i;){if(i===n)return Hu(s),e;if(i===r)return Hu(s),t;i=i.sibling}throw Error(L(188))}if(n.return!==r.return)n=s,r=i;else{for(var a=!1,l=s.child;l;){if(l===n){a=!0,n=s,r=i;break}if(l===r){a=!0,r=s,n=i;break}l=l.sibling}if(!a){for(l=i.child;l;){if(l===n){a=!0,n=i,r=s;break}if(l===r){a=!0,r=i,n=s;break}l=l.sibling}if(!a)throw Error(L(189))}}if(n.alternate!==r)throw Error(L(190))}if(n.tag!==3)throw Error(L(188));return n.stateNode.current===n?e:t}function wp(e){return e=tg(e),e!==null?kp(e):null}function kp(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=kp(e);if(t!==null)return t;e=e.sibling}return null}var Sp=pt.unstable_scheduleCallback,Vu=pt.unstable_cancelCallback,ng=pt.unstable_shouldYield,rg=pt.unstable_requestPaint,ge=pt.unstable_now,sg=pt.unstable_getCurrentPriorityLevel,Lc=pt.unstable_ImmediatePriority,jp=pt.unstable_UserBlockingPriority,To=pt.unstable_NormalPriority,ig=pt.unstable_LowPriority,Cp=pt.unstable_IdlePriority,Zo=null,Yt=null;function og(e){if(Yt&&typeof Yt.onCommitFiberRoot=="function")try{Yt.onCommitFiberRoot(Zo,e,void 0,(e.current.flags&128)===128)}catch{}}var At=Math.clz32?Math.clz32:cg,ag=Math.log,lg=Math.LN2;function cg(e){return e>>>=0,e===0?32:31-(ag(e)/lg|0)|0}var Vi=64,qi=4194304;function Ws(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function _o(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,s=e.suspendedLanes,i=e.pingedLanes,a=n&268435455;if(a!==0){var l=a&~s;l!==0?r=Ws(l):(i&=a,i!==0&&(r=Ws(i)))}else a=n&~s,a!==0?r=Ws(a):i!==0&&(r=Ws(i));if(r===0)return 0;if(t!==0&&t!==r&&!(t&s)&&(s=r&-r,i=t&-t,s>=i||s===16&&(i&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-At(t),s=1<<n,r|=e[n],t&=~s;return r}function ug(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function dg(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,s=e.expirationTimes,i=e.pendingLanes;0<i;){var a=31-At(i),l=1<<a,c=s[a];c===-1?(!(l&n)||l&r)&&(s[a]=ug(l,t)):c<=t&&(e.expiredLanes|=l),i&=~l}}function yl(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Ep(){var e=Vi;return Vi<<=1,!(Vi&4194240)&&(Vi=64),e}function Ra(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Ni(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-At(t),e[t]=n}function fg(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var s=31-At(n),i=1<<s;t[s]=0,r[s]=-1,e[s]=-1,n&=~i}}function Oc(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-At(n),s=1<<r;s&t|e[r]&t&&(e[r]|=t),n&=~s}}var ee=0;function Tp(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var _p,Ic,Np,Rp,Pp,xl=!1,Qi=[],Fn=null,Dn=null,$n=null,si=new Map,ii=new Map,jn=[],pg="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function qu(e,t){switch(e){case"focusin":case"focusout":Fn=null;break;case"dragenter":case"dragleave":Dn=null;break;case"mouseover":case"mouseout":$n=null;break;case"pointerover":case"pointerout":si.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":ii.delete(t.pointerId)}}function Os(e,t,n,r,s,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[s]},t!==null&&(t=Pi(t),t!==null&&Ic(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,s!==null&&t.indexOf(s)===-1&&t.push(s),e)}function hg(e,t,n,r,s){switch(t){case"focusin":return Fn=Os(Fn,e,t,n,r,s),!0;case"dragenter":return Dn=Os(Dn,e,t,n,r,s),!0;case"mouseover":return $n=Os($n,e,t,n,r,s),!0;case"pointerover":var i=s.pointerId;return si.set(i,Os(si.get(i)||null,e,t,n,r,s)),!0;case"gotpointercapture":return i=s.pointerId,ii.set(i,Os(ii.get(i)||null,e,t,n,r,s)),!0}return!1}function zp(e){var t=nr(e.target);if(t!==null){var n=Pr(t);if(n!==null){if(t=n.tag,t===13){if(t=bp(n),t!==null){e.blockedOn=t,Pp(e.priority,function(){Np(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function co(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=vl(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);pl=r,n.target.dispatchEvent(r),pl=null}else return t=Pi(n),t!==null&&Ic(t),e.blockedOn=n,!1;t.shift()}return!0}function Qu(e,t,n){co(e)&&n.delete(t)}function mg(){xl=!1,Fn!==null&&co(Fn)&&(Fn=null),Dn!==null&&co(Dn)&&(Dn=null),$n!==null&&co($n)&&($n=null),si.forEach(Qu),ii.forEach(Qu)}function Is(e,t){e.blockedOn===t&&(e.blockedOn=null,xl||(xl=!0,pt.unstable_scheduleCallback(pt.unstable_NormalPriority,mg)))}function oi(e){function t(s){return Is(s,e)}if(0<Qi.length){Is(Qi[0],e);for(var n=1;n<Qi.length;n++){var r=Qi[n];r.blockedOn===e&&(r.blockedOn=null)}}for(Fn!==null&&Is(Fn,e),Dn!==null&&Is(Dn,e),$n!==null&&Is($n,e),si.forEach(t),ii.forEach(t),n=0;n<jn.length;n++)r=jn[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<jn.length&&(n=jn[0],n.blockedOn===null);)zp(n),n.blockedOn===null&&jn.shift()}var Zr=mn.ReactCurrentBatchConfig,No=!0;function gg(e,t,n,r){var s=ee,i=Zr.transition;Zr.transition=null;try{ee=1,Ac(e,t,n,r)}finally{ee=s,Zr.transition=i}}function yg(e,t,n,r){var s=ee,i=Zr.transition;Zr.transition=null;try{ee=4,Ac(e,t,n,r)}finally{ee=s,Zr.transition=i}}function Ac(e,t,n,r){if(No){var s=vl(e,t,n,r);if(s===null)$a(e,t,r,Ro,n),qu(e,r);else if(hg(s,e,t,n,r))r.stopPropagation();else if(qu(e,r),t&4&&-1<pg.indexOf(e)){for(;s!==null;){var i=Pi(s);if(i!==null&&_p(i),i=vl(e,t,n,r),i===null&&$a(e,t,r,Ro,n),i===s)break;s=i}s!==null&&r.stopPropagation()}else $a(e,t,r,null,n)}}var Ro=null;function vl(e,t,n,r){if(Ro=null,e=zc(r),e=nr(e),e!==null)if(t=Pr(e),t===null)e=null;else if(n=t.tag,n===13){if(e=bp(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Ro=e,null}function Lp(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(sg()){case Lc:return 1;case jp:return 4;case To:case ig:return 16;case Cp:return 536870912;default:return 16}default:return 16}}var In=null,Mc=null,uo=null;function Op(){if(uo)return uo;var e,t=Mc,n=t.length,r,s="value"in In?In.value:In.textContent,i=s.length;for(e=0;e<n&&t[e]===s[e];e++);var a=n-e;for(r=1;r<=a&&t[n-r]===s[i-r];r++);return uo=s.slice(e,1<r?1-r:void 0)}function fo(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Ki(){return!0}function Ku(){return!1}function mt(e){function t(n,r,s,i,a){this._reactName=n,this._targetInst=s,this.type=r,this.nativeEvent=i,this.target=a,this.currentTarget=null;for(var l in e)e.hasOwnProperty(l)&&(n=e[l],this[l]=n?n(i):i[l]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Ki:Ku,this.isPropagationStopped=Ku,this}return fe(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Ki)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Ki)},persist:function(){},isPersistent:Ki}),t}var Ss={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Fc=mt(Ss),Ri=fe({},Ss,{view:0,detail:0}),xg=mt(Ri),Pa,za,As,ea=fe({},Ri,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Dc,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==As&&(As&&e.type==="mousemove"?(Pa=e.screenX-As.screenX,za=e.screenY-As.screenY):za=Pa=0,As=e),Pa)},movementY:function(e){return"movementY"in e?e.movementY:za}}),Yu=mt(ea),vg=fe({},ea,{dataTransfer:0}),bg=mt(vg),wg=fe({},Ri,{relatedTarget:0}),La=mt(wg),kg=fe({},Ss,{animationName:0,elapsedTime:0,pseudoElement:0}),Sg=mt(kg),jg=fe({},Ss,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Cg=mt(jg),Eg=fe({},Ss,{data:0}),Ju=mt(Eg),Tg={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},_g={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Ng={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Rg(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Ng[e])?!!t[e]:!1}function Dc(){return Rg}var Pg=fe({},Ri,{key:function(e){if(e.key){var t=Tg[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=fo(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?_g[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Dc,charCode:function(e){return e.type==="keypress"?fo(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?fo(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),zg=mt(Pg),Lg=fe({},ea,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Xu=mt(Lg),Og=fe({},Ri,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Dc}),Ig=mt(Og),Ag=fe({},Ss,{propertyName:0,elapsedTime:0,pseudoElement:0}),Mg=mt(Ag),Fg=fe({},ea,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Dg=mt(Fg),$g=[9,13,27,32],$c=un&&"CompositionEvent"in window,Ks=null;un&&"documentMode"in document&&(Ks=document.documentMode);var Bg=un&&"TextEvent"in window&&!Ks,Ip=un&&(!$c||Ks&&8<Ks&&11>=Ks),Gu=" ",Zu=!1;function Ap(e,t){switch(e){case"keyup":return $g.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Mp(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var $r=!1;function Ug(e,t){switch(e){case"compositionend":return Mp(t);case"keypress":return t.which!==32?null:(Zu=!0,Gu);case"textInput":return e=t.data,e===Gu&&Zu?null:e;default:return null}}function Wg(e,t){if($r)return e==="compositionend"||!$c&&Ap(e,t)?(e=Op(),uo=Mc=In=null,$r=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Ip&&t.locale!=="ko"?null:t.data;default:return null}}var Hg={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ed(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Hg[e.type]:t==="textarea"}function Fp(e,t,n,r){mp(r),t=Po(t,"onChange"),0<t.length&&(n=new Fc("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Ys=null,ai=null;function Vg(e){Yp(e,0)}function ta(e){var t=Wr(e);if(lp(t))return e}function qg(e,t){if(e==="change")return t}var Dp=!1;if(un){var Oa;if(un){var Ia="oninput"in document;if(!Ia){var td=document.createElement("div");td.setAttribute("oninput","return;"),Ia=typeof td.oninput=="function"}Oa=Ia}else Oa=!1;Dp=Oa&&(!document.documentMode||9<document.documentMode)}function nd(){Ys&&(Ys.detachEvent("onpropertychange",$p),ai=Ys=null)}function $p(e){if(e.propertyName==="value"&&ta(ai)){var t=[];Fp(t,ai,e,zc(e)),vp(Vg,t)}}function Qg(e,t,n){e==="focusin"?(nd(),Ys=t,ai=n,Ys.attachEvent("onpropertychange",$p)):e==="focusout"&&nd()}function Kg(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return ta(ai)}function Yg(e,t){if(e==="click")return ta(t)}function Jg(e,t){if(e==="input"||e==="change")return ta(t)}function Xg(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Dt=typeof Object.is=="function"?Object.is:Xg;function li(e,t){if(Dt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var s=n[r];if(!tl.call(t,s)||!Dt(e[s],t[s]))return!1}return!0}function rd(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function sd(e,t){var n=rd(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=rd(n)}}function Bp(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Bp(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Up(){for(var e=window,t=jo();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=jo(e.document)}return t}function Bc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Gg(e){var t=Up(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Bp(n.ownerDocument.documentElement,n)){if(r!==null&&Bc(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var s=n.textContent.length,i=Math.min(r.start,s);r=r.end===void 0?i:Math.min(r.end,s),!e.extend&&i>r&&(s=r,r=i,i=s),s=sd(n,i);var a=sd(n,r);s&&a&&(e.rangeCount!==1||e.anchorNode!==s.node||e.anchorOffset!==s.offset||e.focusNode!==a.node||e.focusOffset!==a.offset)&&(t=t.createRange(),t.setStart(s.node,s.offset),e.removeAllRanges(),i>r?(e.addRange(t),e.extend(a.node,a.offset)):(t.setEnd(a.node,a.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Zg=un&&"documentMode"in document&&11>=document.documentMode,Br=null,bl=null,Js=null,wl=!1;function id(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;wl||Br==null||Br!==jo(r)||(r=Br,"selectionStart"in r&&Bc(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Js&&li(Js,r)||(Js=r,r=Po(bl,"onSelect"),0<r.length&&(t=new Fc("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=Br)))}function Yi(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Ur={animationend:Yi("Animation","AnimationEnd"),animationiteration:Yi("Animation","AnimationIteration"),animationstart:Yi("Animation","AnimationStart"),transitionend:Yi("Transition","TransitionEnd")},Aa={},Wp={};un&&(Wp=document.createElement("div").style,"AnimationEvent"in window||(delete Ur.animationend.animation,delete Ur.animationiteration.animation,delete Ur.animationstart.animation),"TransitionEvent"in window||delete Ur.transitionend.transition);function na(e){if(Aa[e])return Aa[e];if(!Ur[e])return e;var t=Ur[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Wp)return Aa[e]=t[n];return e}var Hp=na("animationend"),Vp=na("animationiteration"),qp=na("animationstart"),Qp=na("transitionend"),Kp=new Map,od="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Jn(e,t){Kp.set(e,t),Rr(t,[e])}for(var Ma=0;Ma<od.length;Ma++){var Fa=od[Ma],ey=Fa.toLowerCase(),ty=Fa[0].toUpperCase()+Fa.slice(1);Jn(ey,"on"+ty)}Jn(Hp,"onAnimationEnd");Jn(Vp,"onAnimationIteration");Jn(qp,"onAnimationStart");Jn("dblclick","onDoubleClick");Jn("focusin","onFocus");Jn("focusout","onBlur");Jn(Qp,"onTransitionEnd");hs("onMouseEnter",["mouseout","mouseover"]);hs("onMouseLeave",["mouseout","mouseover"]);hs("onPointerEnter",["pointerout","pointerover"]);hs("onPointerLeave",["pointerout","pointerover"]);Rr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Rr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Rr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Rr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Rr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Rr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Hs="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),ny=new Set("cancel close invalid load scroll toggle".split(" ").concat(Hs));function ad(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,eg(r,t,void 0,e),e.currentTarget=null}function Yp(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],s=r.event;r=r.listeners;e:{var i=void 0;if(t)for(var a=r.length-1;0<=a;a--){var l=r[a],c=l.instance,u=l.currentTarget;if(l=l.listener,c!==i&&s.isPropagationStopped())break e;ad(s,l,u),i=c}else for(a=0;a<r.length;a++){if(l=r[a],c=l.instance,u=l.currentTarget,l=l.listener,c!==i&&s.isPropagationStopped())break e;ad(s,l,u),i=c}}}if(Eo)throw e=gl,Eo=!1,gl=null,e}function oe(e,t){var n=t[El];n===void 0&&(n=t[El]=new Set);var r=e+"__bubble";n.has(r)||(Jp(t,e,2,!1),n.add(r))}function Da(e,t,n){var r=0;t&&(r|=4),Jp(n,e,r,t)}var Ji="_reactListening"+Math.random().toString(36).slice(2);function ci(e){if(!e[Ji]){e[Ji]=!0,rp.forEach(function(n){n!=="selectionchange"&&(ny.has(n)||Da(n,!1,e),Da(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Ji]||(t[Ji]=!0,Da("selectionchange",!1,t))}}function Jp(e,t,n,r){switch(Lp(t)){case 1:var s=gg;break;case 4:s=yg;break;default:s=Ac}n=s.bind(null,t,n,e),s=void 0,!ml||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(s=!0),r?s!==void 0?e.addEventListener(t,n,{capture:!0,passive:s}):e.addEventListener(t,n,!0):s!==void 0?e.addEventListener(t,n,{passive:s}):e.addEventListener(t,n,!1)}function $a(e,t,n,r,s){var i=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var a=r.tag;if(a===3||a===4){var l=r.stateNode.containerInfo;if(l===s||l.nodeType===8&&l.parentNode===s)break;if(a===4)for(a=r.return;a!==null;){var c=a.tag;if((c===3||c===4)&&(c=a.stateNode.containerInfo,c===s||c.nodeType===8&&c.parentNode===s))return;a=a.return}for(;l!==null;){if(a=nr(l),a===null)return;if(c=a.tag,c===5||c===6){r=i=a;continue e}l=l.parentNode}}r=r.return}vp(function(){var u=i,p=zc(n),m=[];e:{var y=Kp.get(e);if(y!==void 0){var w=Fc,g=e;switch(e){case"keypress":if(fo(n)===0)break e;case"keydown":case"keyup":w=zg;break;case"focusin":g="focus",w=La;break;case"focusout":g="blur",w=La;break;case"beforeblur":case"afterblur":w=La;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":w=Yu;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":w=bg;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":w=Ig;break;case Hp:case Vp:case qp:w=Sg;break;case Qp:w=Mg;break;case"scroll":w=xg;break;case"wheel":w=Dg;break;case"copy":case"cut":case"paste":w=Cg;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":w=Xu}var v=(t&4)!==0,S=!v&&e==="scroll",x=v?y!==null?y+"Capture":null:y;v=[];for(var f=u,h;f!==null;){h=f;var k=h.stateNode;if(h.tag===5&&k!==null&&(h=k,x!==null&&(k=ri(f,x),k!=null&&v.push(ui(f,k,h)))),S)break;f=f.return}0<v.length&&(y=new w(y,g,null,n,p),m.push({event:y,listeners:v}))}}if(!(t&7)){e:{if(y=e==="mouseover"||e==="pointerover",w=e==="mouseout"||e==="pointerout",y&&n!==pl&&(g=n.relatedTarget||n.fromElement)&&(nr(g)||g[dn]))break e;if((w||y)&&(y=p.window===p?p:(y=p.ownerDocument)?y.defaultView||y.parentWindow:window,w?(g=n.relatedTarget||n.toElement,w=u,g=g?nr(g):null,g!==null&&(S=Pr(g),g!==S||g.tag!==5&&g.tag!==6)&&(g=null)):(w=null,g=u),w!==g)){if(v=Yu,k="onMouseLeave",x="onMouseEnter",f="mouse",(e==="pointerout"||e==="pointerover")&&(v=Xu,k="onPointerLeave",x="onPointerEnter",f="pointer"),S=w==null?y:Wr(w),h=g==null?y:Wr(g),y=new v(k,f+"leave",w,n,p),y.target=S,y.relatedTarget=h,k=null,nr(p)===u&&(v=new v(x,f+"enter",g,n,p),v.target=h,v.relatedTarget=S,k=v),S=k,w&&g)t:{for(v=w,x=g,f=0,h=v;h;h=Ir(h))f++;for(h=0,k=x;k;k=Ir(k))h++;for(;0<f-h;)v=Ir(v),f--;for(;0<h-f;)x=Ir(x),h--;for(;f--;){if(v===x||x!==null&&v===x.alternate)break t;v=Ir(v),x=Ir(x)}v=null}else v=null;w!==null&&ld(m,y,w,v,!1),g!==null&&S!==null&&ld(m,S,g,v,!0)}}e:{if(y=u?Wr(u):window,w=y.nodeName&&y.nodeName.toLowerCase(),w==="select"||w==="input"&&y.type==="file")var E=qg;else if(ed(y))if(Dp)E=Jg;else{E=Kg;var R=Qg}else(w=y.nodeName)&&w.toLowerCase()==="input"&&(y.type==="checkbox"||y.type==="radio")&&(E=Yg);if(E&&(E=E(e,u))){Fp(m,E,n,p);break e}R&&R(e,y,u),e==="focusout"&&(R=y._wrapperState)&&R.controlled&&y.type==="number"&&ll(y,"number",y.value)}switch(R=u?Wr(u):window,e){case"focusin":(ed(R)||R.contentEditable==="true")&&(Br=R,bl=u,Js=null);break;case"focusout":Js=bl=Br=null;break;case"mousedown":wl=!0;break;case"contextmenu":case"mouseup":case"dragend":wl=!1,id(m,n,p);break;case"selectionchange":if(Zg)break;case"keydown":case"keyup":id(m,n,p)}var T;if($c)e:{switch(e){case"compositionstart":var N="onCompositionStart";break e;case"compositionend":N="onCompositionEnd";break e;case"compositionupdate":N="onCompositionUpdate";break e}N=void 0}else $r?Ap(e,n)&&(N="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(N="onCompositionStart");N&&(Ip&&n.locale!=="ko"&&($r||N!=="onCompositionStart"?N==="onCompositionEnd"&&$r&&(T=Op()):(In=p,Mc="value"in In?In.value:In.textContent,$r=!0)),R=Po(u,N),0<R.length&&(N=new Ju(N,e,null,n,p),m.push({event:N,listeners:R}),T?N.data=T:(T=Mp(n),T!==null&&(N.data=T)))),(T=Bg?Ug(e,n):Wg(e,n))&&(u=Po(u,"onBeforeInput"),0<u.length&&(p=new Ju("onBeforeInput","beforeinput",null,n,p),m.push({event:p,listeners:u}),p.data=T))}Yp(m,t)})}function ui(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Po(e,t){for(var n=t+"Capture",r=[];e!==null;){var s=e,i=s.stateNode;s.tag===5&&i!==null&&(s=i,i=ri(e,n),i!=null&&r.unshift(ui(e,i,s)),i=ri(e,t),i!=null&&r.push(ui(e,i,s))),e=e.return}return r}function Ir(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function ld(e,t,n,r,s){for(var i=t._reactName,a=[];n!==null&&n!==r;){var l=n,c=l.alternate,u=l.stateNode;if(c!==null&&c===r)break;l.tag===5&&u!==null&&(l=u,s?(c=ri(n,i),c!=null&&a.unshift(ui(n,c,l))):s||(c=ri(n,i),c!=null&&a.push(ui(n,c,l)))),n=n.return}a.length!==0&&e.push({event:t,listeners:a})}var ry=/\r\n?/g,sy=/\u0000|\uFFFD/g;function cd(e){return(typeof e=="string"?e:""+e).replace(ry,`
`).replace(sy,"")}function Xi(e,t,n){if(t=cd(t),cd(e)!==t&&n)throw Error(L(425))}function zo(){}var kl=null,Sl=null;function jl(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Cl=typeof setTimeout=="function"?setTimeout:void 0,iy=typeof clearTimeout=="function"?clearTimeout:void 0,ud=typeof Promise=="function"?Promise:void 0,oy=typeof queueMicrotask=="function"?queueMicrotask:typeof ud<"u"?function(e){return ud.resolve(null).then(e).catch(ay)}:Cl;function ay(e){setTimeout(function(){throw e})}function Ba(e,t){var n=t,r=0;do{var s=n.nextSibling;if(e.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"){if(r===0){e.removeChild(s),oi(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=s}while(n);oi(t)}function Bn(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function dd(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var js=Math.random().toString(36).slice(2),Kt="__reactFiber$"+js,di="__reactProps$"+js,dn="__reactContainer$"+js,El="__reactEvents$"+js,ly="__reactListeners$"+js,cy="__reactHandles$"+js;function nr(e){var t=e[Kt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[dn]||n[Kt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=dd(e);e!==null;){if(n=e[Kt])return n;e=dd(e)}return t}e=n,n=e.parentNode}return null}function Pi(e){return e=e[Kt]||e[dn],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Wr(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(L(33))}function ra(e){return e[di]||null}var Tl=[],Hr=-1;function Xn(e){return{current:e}}function ae(e){0>Hr||(e.current=Tl[Hr],Tl[Hr]=null,Hr--)}function ie(e,t){Hr++,Tl[Hr]=e.current,e.current=t}var Yn={},We=Xn(Yn),st=Xn(!1),wr=Yn;function ms(e,t){var n=e.type.contextTypes;if(!n)return Yn;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var s={},i;for(i in n)s[i]=t[i];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=s),s}function it(e){return e=e.childContextTypes,e!=null}function Lo(){ae(st),ae(We)}function fd(e,t,n){if(We.current!==Yn)throw Error(L(168));ie(We,t),ie(st,n)}function Xp(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var s in r)if(!(s in t))throw Error(L(108,Q0(e)||"Unknown",s));return fe({},n,r)}function Oo(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Yn,wr=We.current,ie(We,e),ie(st,st.current),!0}function pd(e,t,n){var r=e.stateNode;if(!r)throw Error(L(169));n?(e=Xp(e,t,wr),r.__reactInternalMemoizedMergedChildContext=e,ae(st),ae(We),ie(We,e)):ae(st),ie(st,n)}var en=null,sa=!1,Ua=!1;function Gp(e){en===null?en=[e]:en.push(e)}function uy(e){sa=!0,Gp(e)}function Gn(){if(!Ua&&en!==null){Ua=!0;var e=0,t=ee;try{var n=en;for(ee=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}en=null,sa=!1}catch(s){throw en!==null&&(en=en.slice(e+1)),Sp(Lc,Gn),s}finally{ee=t,Ua=!1}}return null}var Vr=[],qr=0,Io=null,Ao=0,bt=[],wt=0,kr=null,on=1,an="";function er(e,t){Vr[qr++]=Ao,Vr[qr++]=Io,Io=e,Ao=t}function Zp(e,t,n){bt[wt++]=on,bt[wt++]=an,bt[wt++]=kr,kr=e;var r=on;e=an;var s=32-At(r)-1;r&=~(1<<s),n+=1;var i=32-At(t)+s;if(30<i){var a=s-s%5;i=(r&(1<<a)-1).toString(32),r>>=a,s-=a,on=1<<32-At(t)+s|n<<s|r,an=i+e}else on=1<<i|n<<s|r,an=e}function Uc(e){e.return!==null&&(er(e,1),Zp(e,1,0))}function Wc(e){for(;e===Io;)Io=Vr[--qr],Vr[qr]=null,Ao=Vr[--qr],Vr[qr]=null;for(;e===kr;)kr=bt[--wt],bt[wt]=null,an=bt[--wt],bt[wt]=null,on=bt[--wt],bt[wt]=null}var ft=null,dt=null,ce=!1,It=null;function eh(e,t){var n=kt(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function hd(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,ft=e,dt=Bn(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,ft=e,dt=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=kr!==null?{id:on,overflow:an}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=kt(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,ft=e,dt=null,!0):!1;default:return!1}}function _l(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Nl(e){if(ce){var t=dt;if(t){var n=t;if(!hd(e,t)){if(_l(e))throw Error(L(418));t=Bn(n.nextSibling);var r=ft;t&&hd(e,t)?eh(r,n):(e.flags=e.flags&-4097|2,ce=!1,ft=e)}}else{if(_l(e))throw Error(L(418));e.flags=e.flags&-4097|2,ce=!1,ft=e}}}function md(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;ft=e}function Gi(e){if(e!==ft)return!1;if(!ce)return md(e),ce=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!jl(e.type,e.memoizedProps)),t&&(t=dt)){if(_l(e))throw th(),Error(L(418));for(;t;)eh(e,t),t=Bn(t.nextSibling)}if(md(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(L(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){dt=Bn(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}dt=null}}else dt=ft?Bn(e.stateNode.nextSibling):null;return!0}function th(){for(var e=dt;e;)e=Bn(e.nextSibling)}function gs(){dt=ft=null,ce=!1}function Hc(e){It===null?It=[e]:It.push(e)}var dy=mn.ReactCurrentBatchConfig;function Ms(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(L(309));var r=n.stateNode}if(!r)throw Error(L(147,e));var s=r,i=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===i?t.ref:(t=function(a){var l=s.refs;a===null?delete l[i]:l[i]=a},t._stringRef=i,t)}if(typeof e!="string")throw Error(L(284));if(!n._owner)throw Error(L(290,e))}return e}function Zi(e,t){throw e=Object.prototype.toString.call(t),Error(L(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function gd(e){var t=e._init;return t(e._payload)}function nh(e){function t(x,f){if(e){var h=x.deletions;h===null?(x.deletions=[f],x.flags|=16):h.push(f)}}function n(x,f){if(!e)return null;for(;f!==null;)t(x,f),f=f.sibling;return null}function r(x,f){for(x=new Map;f!==null;)f.key!==null?x.set(f.key,f):x.set(f.index,f),f=f.sibling;return x}function s(x,f){return x=Vn(x,f),x.index=0,x.sibling=null,x}function i(x,f,h){return x.index=h,e?(h=x.alternate,h!==null?(h=h.index,h<f?(x.flags|=2,f):h):(x.flags|=2,f)):(x.flags|=1048576,f)}function a(x){return e&&x.alternate===null&&(x.flags|=2),x}function l(x,f,h,k){return f===null||f.tag!==6?(f=Ya(h,x.mode,k),f.return=x,f):(f=s(f,h),f.return=x,f)}function c(x,f,h,k){var E=h.type;return E===Dr?p(x,f,h.props.children,k,h.key):f!==null&&(f.elementType===E||typeof E=="object"&&E!==null&&E.$$typeof===kn&&gd(E)===f.type)?(k=s(f,h.props),k.ref=Ms(x,f,h),k.return=x,k):(k=vo(h.type,h.key,h.props,null,x.mode,k),k.ref=Ms(x,f,h),k.return=x,k)}function u(x,f,h,k){return f===null||f.tag!==4||f.stateNode.containerInfo!==h.containerInfo||f.stateNode.implementation!==h.implementation?(f=Ja(h,x.mode,k),f.return=x,f):(f=s(f,h.children||[]),f.return=x,f)}function p(x,f,h,k,E){return f===null||f.tag!==7?(f=yr(h,x.mode,k,E),f.return=x,f):(f=s(f,h),f.return=x,f)}function m(x,f,h){if(typeof f=="string"&&f!==""||typeof f=="number")return f=Ya(""+f,x.mode,h),f.return=x,f;if(typeof f=="object"&&f!==null){switch(f.$$typeof){case Ui:return h=vo(f.type,f.key,f.props,null,x.mode,h),h.ref=Ms(x,null,f),h.return=x,h;case Fr:return f=Ja(f,x.mode,h),f.return=x,f;case kn:var k=f._init;return m(x,k(f._payload),h)}if(Us(f)||zs(f))return f=yr(f,x.mode,h,null),f.return=x,f;Zi(x,f)}return null}function y(x,f,h,k){var E=f!==null?f.key:null;if(typeof h=="string"&&h!==""||typeof h=="number")return E!==null?null:l(x,f,""+h,k);if(typeof h=="object"&&h!==null){switch(h.$$typeof){case Ui:return h.key===E?c(x,f,h,k):null;case Fr:return h.key===E?u(x,f,h,k):null;case kn:return E=h._init,y(x,f,E(h._payload),k)}if(Us(h)||zs(h))return E!==null?null:p(x,f,h,k,null);Zi(x,h)}return null}function w(x,f,h,k,E){if(typeof k=="string"&&k!==""||typeof k=="number")return x=x.get(h)||null,l(f,x,""+k,E);if(typeof k=="object"&&k!==null){switch(k.$$typeof){case Ui:return x=x.get(k.key===null?h:k.key)||null,c(f,x,k,E);case Fr:return x=x.get(k.key===null?h:k.key)||null,u(f,x,k,E);case kn:var R=k._init;return w(x,f,h,R(k._payload),E)}if(Us(k)||zs(k))return x=x.get(h)||null,p(f,x,k,E,null);Zi(f,k)}return null}function g(x,f,h,k){for(var E=null,R=null,T=f,N=f=0,C=null;T!==null&&N<h.length;N++){T.index>N?(C=T,T=null):C=T.sibling;var P=y(x,T,h[N],k);if(P===null){T===null&&(T=C);break}e&&T&&P.alternate===null&&t(x,T),f=i(P,f,N),R===null?E=P:R.sibling=P,R=P,T=C}if(N===h.length)return n(x,T),ce&&er(x,N),E;if(T===null){for(;N<h.length;N++)T=m(x,h[N],k),T!==null&&(f=i(T,f,N),R===null?E=T:R.sibling=T,R=T);return ce&&er(x,N),E}for(T=r(x,T);N<h.length;N++)C=w(T,x,N,h[N],k),C!==null&&(e&&C.alternate!==null&&T.delete(C.key===null?N:C.key),f=i(C,f,N),R===null?E=C:R.sibling=C,R=C);return e&&T.forEach(function(U){return t(x,U)}),ce&&er(x,N),E}function v(x,f,h,k){var E=zs(h);if(typeof E!="function")throw Error(L(150));if(h=E.call(h),h==null)throw Error(L(151));for(var R=E=null,T=f,N=f=0,C=null,P=h.next();T!==null&&!P.done;N++,P=h.next()){T.index>N?(C=T,T=null):C=T.sibling;var U=y(x,T,P.value,k);if(U===null){T===null&&(T=C);break}e&&T&&U.alternate===null&&t(x,T),f=i(U,f,N),R===null?E=U:R.sibling=U,R=U,T=C}if(P.done)return n(x,T),ce&&er(x,N),E;if(T===null){for(;!P.done;N++,P=h.next())P=m(x,P.value,k),P!==null&&(f=i(P,f,N),R===null?E=P:R.sibling=P,R=P);return ce&&er(x,N),E}for(T=r(x,T);!P.done;N++,P=h.next())P=w(T,x,N,P.value,k),P!==null&&(e&&P.alternate!==null&&T.delete(P.key===null?N:P.key),f=i(P,f,N),R===null?E=P:R.sibling=P,R=P);return e&&T.forEach(function(J){return t(x,J)}),ce&&er(x,N),E}function S(x,f,h,k){if(typeof h=="object"&&h!==null&&h.type===Dr&&h.key===null&&(h=h.props.children),typeof h=="object"&&h!==null){switch(h.$$typeof){case Ui:e:{for(var E=h.key,R=f;R!==null;){if(R.key===E){if(E=h.type,E===Dr){if(R.tag===7){n(x,R.sibling),f=s(R,h.props.children),f.return=x,x=f;break e}}else if(R.elementType===E||typeof E=="object"&&E!==null&&E.$$typeof===kn&&gd(E)===R.type){n(x,R.sibling),f=s(R,h.props),f.ref=Ms(x,R,h),f.return=x,x=f;break e}n(x,R);break}else t(x,R);R=R.sibling}h.type===Dr?(f=yr(h.props.children,x.mode,k,h.key),f.return=x,x=f):(k=vo(h.type,h.key,h.props,null,x.mode,k),k.ref=Ms(x,f,h),k.return=x,x=k)}return a(x);case Fr:e:{for(R=h.key;f!==null;){if(f.key===R)if(f.tag===4&&f.stateNode.containerInfo===h.containerInfo&&f.stateNode.implementation===h.implementation){n(x,f.sibling),f=s(f,h.children||[]),f.return=x,x=f;break e}else{n(x,f);break}else t(x,f);f=f.sibling}f=Ja(h,x.mode,k),f.return=x,x=f}return a(x);case kn:return R=h._init,S(x,f,R(h._payload),k)}if(Us(h))return g(x,f,h,k);if(zs(h))return v(x,f,h,k);Zi(x,h)}return typeof h=="string"&&h!==""||typeof h=="number"?(h=""+h,f!==null&&f.tag===6?(n(x,f.sibling),f=s(f,h),f.return=x,x=f):(n(x,f),f=Ya(h,x.mode,k),f.return=x,x=f),a(x)):n(x,f)}return S}var ys=nh(!0),rh=nh(!1),Mo=Xn(null),Fo=null,Qr=null,Vc=null;function qc(){Vc=Qr=Fo=null}function Qc(e){var t=Mo.current;ae(Mo),e._currentValue=t}function Rl(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function es(e,t){Fo=e,Vc=Qr=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(rt=!0),e.firstContext=null)}function jt(e){var t=e._currentValue;if(Vc!==e)if(e={context:e,memoizedValue:t,next:null},Qr===null){if(Fo===null)throw Error(L(308));Qr=e,Fo.dependencies={lanes:0,firstContext:e}}else Qr=Qr.next=e;return t}var rr=null;function Kc(e){rr===null?rr=[e]:rr.push(e)}function sh(e,t,n,r){var s=t.interleaved;return s===null?(n.next=n,Kc(t)):(n.next=s.next,s.next=n),t.interleaved=n,fn(e,r)}function fn(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var Sn=!1;function Yc(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function ih(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function ln(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Un(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,X&2){var s=r.pending;return s===null?t.next=t:(t.next=s.next,s.next=t),r.pending=t,fn(e,n)}return s=r.interleaved,s===null?(t.next=t,Kc(r)):(t.next=s.next,s.next=t),r.interleaved=t,fn(e,n)}function po(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Oc(e,n)}}function yd(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var s=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?s=i=a:i=i.next=a,n=n.next}while(n!==null);i===null?s=i=t:i=i.next=t}else s=i=t;n={baseState:r.baseState,firstBaseUpdate:s,lastBaseUpdate:i,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Do(e,t,n,r){var s=e.updateQueue;Sn=!1;var i=s.firstBaseUpdate,a=s.lastBaseUpdate,l=s.shared.pending;if(l!==null){s.shared.pending=null;var c=l,u=c.next;c.next=null,a===null?i=u:a.next=u,a=c;var p=e.alternate;p!==null&&(p=p.updateQueue,l=p.lastBaseUpdate,l!==a&&(l===null?p.firstBaseUpdate=u:l.next=u,p.lastBaseUpdate=c))}if(i!==null){var m=s.baseState;a=0,p=u=c=null,l=i;do{var y=l.lane,w=l.eventTime;if((r&y)===y){p!==null&&(p=p.next={eventTime:w,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var g=e,v=l;switch(y=t,w=n,v.tag){case 1:if(g=v.payload,typeof g=="function"){m=g.call(w,m,y);break e}m=g;break e;case 3:g.flags=g.flags&-65537|128;case 0:if(g=v.payload,y=typeof g=="function"?g.call(w,m,y):g,y==null)break e;m=fe({},m,y);break e;case 2:Sn=!0}}l.callback!==null&&l.lane!==0&&(e.flags|=64,y=s.effects,y===null?s.effects=[l]:y.push(l))}else w={eventTime:w,lane:y,tag:l.tag,payload:l.payload,callback:l.callback,next:null},p===null?(u=p=w,c=m):p=p.next=w,a|=y;if(l=l.next,l===null){if(l=s.shared.pending,l===null)break;y=l,l=y.next,y.next=null,s.lastBaseUpdate=y,s.shared.pending=null}}while(!0);if(p===null&&(c=m),s.baseState=c,s.firstBaseUpdate=u,s.lastBaseUpdate=p,t=s.shared.interleaved,t!==null){s=t;do a|=s.lane,s=s.next;while(s!==t)}else i===null&&(s.shared.lanes=0);jr|=a,e.lanes=a,e.memoizedState=m}}function xd(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],s=r.callback;if(s!==null){if(r.callback=null,r=n,typeof s!="function")throw Error(L(191,s));s.call(r)}}}var zi={},Jt=Xn(zi),fi=Xn(zi),pi=Xn(zi);function sr(e){if(e===zi)throw Error(L(174));return e}function Jc(e,t){switch(ie(pi,t),ie(fi,e),ie(Jt,zi),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:ul(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=ul(t,e)}ae(Jt),ie(Jt,t)}function xs(){ae(Jt),ae(fi),ae(pi)}function oh(e){sr(pi.current);var t=sr(Jt.current),n=ul(t,e.type);t!==n&&(ie(fi,e),ie(Jt,n))}function Xc(e){fi.current===e&&(ae(Jt),ae(fi))}var ue=Xn(0);function $o(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Wa=[];function Gc(){for(var e=0;e<Wa.length;e++)Wa[e]._workInProgressVersionPrimary=null;Wa.length=0}var ho=mn.ReactCurrentDispatcher,Ha=mn.ReactCurrentBatchConfig,Sr=0,de=null,Se=null,Ne=null,Bo=!1,Xs=!1,hi=0,fy=0;function De(){throw Error(L(321))}function Zc(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Dt(e[n],t[n]))return!1;return!0}function eu(e,t,n,r,s,i){if(Sr=i,de=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,ho.current=e===null||e.memoizedState===null?gy:yy,e=n(r,s),Xs){i=0;do{if(Xs=!1,hi=0,25<=i)throw Error(L(301));i+=1,Ne=Se=null,t.updateQueue=null,ho.current=xy,e=n(r,s)}while(Xs)}if(ho.current=Uo,t=Se!==null&&Se.next!==null,Sr=0,Ne=Se=de=null,Bo=!1,t)throw Error(L(300));return e}function tu(){var e=hi!==0;return hi=0,e}function Ht(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ne===null?de.memoizedState=Ne=e:Ne=Ne.next=e,Ne}function Ct(){if(Se===null){var e=de.alternate;e=e!==null?e.memoizedState:null}else e=Se.next;var t=Ne===null?de.memoizedState:Ne.next;if(t!==null)Ne=t,Se=e;else{if(e===null)throw Error(L(310));Se=e,e={memoizedState:Se.memoizedState,baseState:Se.baseState,baseQueue:Se.baseQueue,queue:Se.queue,next:null},Ne===null?de.memoizedState=Ne=e:Ne=Ne.next=e}return Ne}function mi(e,t){return typeof t=="function"?t(e):t}function Va(e){var t=Ct(),n=t.queue;if(n===null)throw Error(L(311));n.lastRenderedReducer=e;var r=Se,s=r.baseQueue,i=n.pending;if(i!==null){if(s!==null){var a=s.next;s.next=i.next,i.next=a}r.baseQueue=s=i,n.pending=null}if(s!==null){i=s.next,r=r.baseState;var l=a=null,c=null,u=i;do{var p=u.lane;if((Sr&p)===p)c!==null&&(c=c.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:e(r,u.action);else{var m={lane:p,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};c===null?(l=c=m,a=r):c=c.next=m,de.lanes|=p,jr|=p}u=u.next}while(u!==null&&u!==i);c===null?a=r:c.next=l,Dt(r,t.memoizedState)||(rt=!0),t.memoizedState=r,t.baseState=a,t.baseQueue=c,n.lastRenderedState=r}if(e=n.interleaved,e!==null){s=e;do i=s.lane,de.lanes|=i,jr|=i,s=s.next;while(s!==e)}else s===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function qa(e){var t=Ct(),n=t.queue;if(n===null)throw Error(L(311));n.lastRenderedReducer=e;var r=n.dispatch,s=n.pending,i=t.memoizedState;if(s!==null){n.pending=null;var a=s=s.next;do i=e(i,a.action),a=a.next;while(a!==s);Dt(i,t.memoizedState)||(rt=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,r]}function ah(){}function lh(e,t){var n=de,r=Ct(),s=t(),i=!Dt(r.memoizedState,s);if(i&&(r.memoizedState=s,rt=!0),r=r.queue,nu(dh.bind(null,n,r,e),[e]),r.getSnapshot!==t||i||Ne!==null&&Ne.memoizedState.tag&1){if(n.flags|=2048,gi(9,uh.bind(null,n,r,s,t),void 0,null),Re===null)throw Error(L(349));Sr&30||ch(n,t,s)}return s}function ch(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=de.updateQueue,t===null?(t={lastEffect:null,stores:null},de.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function uh(e,t,n,r){t.value=n,t.getSnapshot=r,fh(t)&&ph(e)}function dh(e,t,n){return n(function(){fh(t)&&ph(e)})}function fh(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Dt(e,n)}catch{return!0}}function ph(e){var t=fn(e,1);t!==null&&Mt(t,e,1,-1)}function vd(e){var t=Ht();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:mi,lastRenderedState:e},t.queue=e,e=e.dispatch=my.bind(null,de,e),[t.memoizedState,e]}function gi(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=de.updateQueue,t===null?(t={lastEffect:null,stores:null},de.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function hh(){return Ct().memoizedState}function mo(e,t,n,r){var s=Ht();de.flags|=e,s.memoizedState=gi(1|t,n,void 0,r===void 0?null:r)}function ia(e,t,n,r){var s=Ct();r=r===void 0?null:r;var i=void 0;if(Se!==null){var a=Se.memoizedState;if(i=a.destroy,r!==null&&Zc(r,a.deps)){s.memoizedState=gi(t,n,i,r);return}}de.flags|=e,s.memoizedState=gi(1|t,n,i,r)}function bd(e,t){return mo(8390656,8,e,t)}function nu(e,t){return ia(2048,8,e,t)}function mh(e,t){return ia(4,2,e,t)}function gh(e,t){return ia(4,4,e,t)}function yh(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function xh(e,t,n){return n=n!=null?n.concat([e]):null,ia(4,4,yh.bind(null,t,e),n)}function ru(){}function vh(e,t){var n=Ct();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Zc(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function bh(e,t){var n=Ct();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Zc(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function wh(e,t,n){return Sr&21?(Dt(n,t)||(n=Ep(),de.lanes|=n,jr|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,rt=!0),e.memoizedState=n)}function py(e,t){var n=ee;ee=n!==0&&4>n?n:4,e(!0);var r=Ha.transition;Ha.transition={};try{e(!1),t()}finally{ee=n,Ha.transition=r}}function kh(){return Ct().memoizedState}function hy(e,t,n){var r=Hn(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Sh(e))jh(t,n);else if(n=sh(e,t,n,r),n!==null){var s=Ye();Mt(n,e,r,s),Ch(n,t,r)}}function my(e,t,n){var r=Hn(e),s={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Sh(e))jh(t,s);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var a=t.lastRenderedState,l=i(a,n);if(s.hasEagerState=!0,s.eagerState=l,Dt(l,a)){var c=t.interleaved;c===null?(s.next=s,Kc(t)):(s.next=c.next,c.next=s),t.interleaved=s;return}}catch{}finally{}n=sh(e,t,s,r),n!==null&&(s=Ye(),Mt(n,e,r,s),Ch(n,t,r))}}function Sh(e){var t=e.alternate;return e===de||t!==null&&t===de}function jh(e,t){Xs=Bo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Ch(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Oc(e,n)}}var Uo={readContext:jt,useCallback:De,useContext:De,useEffect:De,useImperativeHandle:De,useInsertionEffect:De,useLayoutEffect:De,useMemo:De,useReducer:De,useRef:De,useState:De,useDebugValue:De,useDeferredValue:De,useTransition:De,useMutableSource:De,useSyncExternalStore:De,useId:De,unstable_isNewReconciler:!1},gy={readContext:jt,useCallback:function(e,t){return Ht().memoizedState=[e,t===void 0?null:t],e},useContext:jt,useEffect:bd,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,mo(4194308,4,yh.bind(null,t,e),n)},useLayoutEffect:function(e,t){return mo(4194308,4,e,t)},useInsertionEffect:function(e,t){return mo(4,2,e,t)},useMemo:function(e,t){var n=Ht();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Ht();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=hy.bind(null,de,e),[r.memoizedState,e]},useRef:function(e){var t=Ht();return e={current:e},t.memoizedState=e},useState:vd,useDebugValue:ru,useDeferredValue:function(e){return Ht().memoizedState=e},useTransition:function(){var e=vd(!1),t=e[0];return e=py.bind(null,e[1]),Ht().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=de,s=Ht();if(ce){if(n===void 0)throw Error(L(407));n=n()}else{if(n=t(),Re===null)throw Error(L(349));Sr&30||ch(r,t,n)}s.memoizedState=n;var i={value:n,getSnapshot:t};return s.queue=i,bd(dh.bind(null,r,i,e),[e]),r.flags|=2048,gi(9,uh.bind(null,r,i,n,t),void 0,null),n},useId:function(){var e=Ht(),t=Re.identifierPrefix;if(ce){var n=an,r=on;n=(r&~(1<<32-At(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=hi++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=fy++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},yy={readContext:jt,useCallback:vh,useContext:jt,useEffect:nu,useImperativeHandle:xh,useInsertionEffect:mh,useLayoutEffect:gh,useMemo:bh,useReducer:Va,useRef:hh,useState:function(){return Va(mi)},useDebugValue:ru,useDeferredValue:function(e){var t=Ct();return wh(t,Se.memoizedState,e)},useTransition:function(){var e=Va(mi)[0],t=Ct().memoizedState;return[e,t]},useMutableSource:ah,useSyncExternalStore:lh,useId:kh,unstable_isNewReconciler:!1},xy={readContext:jt,useCallback:vh,useContext:jt,useEffect:nu,useImperativeHandle:xh,useInsertionEffect:mh,useLayoutEffect:gh,useMemo:bh,useReducer:qa,useRef:hh,useState:function(){return qa(mi)},useDebugValue:ru,useDeferredValue:function(e){var t=Ct();return Se===null?t.memoizedState=e:wh(t,Se.memoizedState,e)},useTransition:function(){var e=qa(mi)[0],t=Ct().memoizedState;return[e,t]},useMutableSource:ah,useSyncExternalStore:lh,useId:kh,unstable_isNewReconciler:!1};function Rt(e,t){if(e&&e.defaultProps){t=fe({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Pl(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:fe({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var oa={isMounted:function(e){return(e=e._reactInternals)?Pr(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Ye(),s=Hn(e),i=ln(r,s);i.payload=t,n!=null&&(i.callback=n),t=Un(e,i,s),t!==null&&(Mt(t,e,s,r),po(t,e,s))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Ye(),s=Hn(e),i=ln(r,s);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=Un(e,i,s),t!==null&&(Mt(t,e,s,r),po(t,e,s))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Ye(),r=Hn(e),s=ln(n,r);s.tag=2,t!=null&&(s.callback=t),t=Un(e,s,r),t!==null&&(Mt(t,e,r,n),po(t,e,r))}};function wd(e,t,n,r,s,i,a){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,i,a):t.prototype&&t.prototype.isPureReactComponent?!li(n,r)||!li(s,i):!0}function Eh(e,t,n){var r=!1,s=Yn,i=t.contextType;return typeof i=="object"&&i!==null?i=jt(i):(s=it(t)?wr:We.current,r=t.contextTypes,i=(r=r!=null)?ms(e,s):Yn),t=new t(n,i),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=oa,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=s,e.__reactInternalMemoizedMaskedChildContext=i),t}function kd(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&oa.enqueueReplaceState(t,t.state,null)}function zl(e,t,n,r){var s=e.stateNode;s.props=n,s.state=e.memoizedState,s.refs={},Yc(e);var i=t.contextType;typeof i=="object"&&i!==null?s.context=jt(i):(i=it(t)?wr:We.current,s.context=ms(e,i)),s.state=e.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(Pl(e,t,i,n),s.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(t=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),t!==s.state&&oa.enqueueReplaceState(s,s.state,null),Do(e,n,s,r),s.state=e.memoizedState),typeof s.componentDidMount=="function"&&(e.flags|=4194308)}function vs(e,t){try{var n="",r=t;do n+=q0(r),r=r.return;while(r);var s=n}catch(i){s=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:t,stack:s,digest:null}}function Qa(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Ll(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var vy=typeof WeakMap=="function"?WeakMap:Map;function Th(e,t,n){n=ln(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Ho||(Ho=!0,Wl=r),Ll(e,t)},n}function _h(e,t,n){n=ln(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var s=t.value;n.payload=function(){return r(s)},n.callback=function(){Ll(e,t)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){Ll(e,t),typeof r!="function"&&(Wn===null?Wn=new Set([this]):Wn.add(this));var a=t.stack;this.componentDidCatch(t.value,{componentStack:a!==null?a:""})}),n}function Sd(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new vy;var s=new Set;r.set(t,s)}else s=r.get(t),s===void 0&&(s=new Set,r.set(t,s));s.has(n)||(s.add(n),e=Ly.bind(null,e,t,n),t.then(e,e))}function jd(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Cd(e,t,n,r,s){return e.mode&1?(e.flags|=65536,e.lanes=s,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=ln(-1,1),t.tag=2,Un(n,t,1))),n.lanes|=1),e)}var by=mn.ReactCurrentOwner,rt=!1;function qe(e,t,n,r){t.child=e===null?rh(t,null,n,r):ys(t,e.child,n,r)}function Ed(e,t,n,r,s){n=n.render;var i=t.ref;return es(t,s),r=eu(e,t,n,r,i,s),n=tu(),e!==null&&!rt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,pn(e,t,s)):(ce&&n&&Uc(t),t.flags|=1,qe(e,t,r,s),t.child)}function Td(e,t,n,r,s){if(e===null){var i=n.type;return typeof i=="function"&&!du(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=i,Nh(e,t,i,r,s)):(e=vo(n.type,null,r,t,t.mode,s),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!(e.lanes&s)){var a=i.memoizedProps;if(n=n.compare,n=n!==null?n:li,n(a,r)&&e.ref===t.ref)return pn(e,t,s)}return t.flags|=1,e=Vn(i,r),e.ref=t.ref,e.return=t,t.child=e}function Nh(e,t,n,r,s){if(e!==null){var i=e.memoizedProps;if(li(i,r)&&e.ref===t.ref)if(rt=!1,t.pendingProps=r=i,(e.lanes&s)!==0)e.flags&131072&&(rt=!0);else return t.lanes=e.lanes,pn(e,t,s)}return Ol(e,t,n,r,s)}function Rh(e,t,n){var r=t.pendingProps,s=r.children,i=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},ie(Yr,ut),ut|=n;else{if(!(n&1073741824))return e=i!==null?i.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,ie(Yr,ut),ut|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:n,ie(Yr,ut),ut|=r}else i!==null?(r=i.baseLanes|n,t.memoizedState=null):r=n,ie(Yr,ut),ut|=r;return qe(e,t,s,n),t.child}function Ph(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Ol(e,t,n,r,s){var i=it(n)?wr:We.current;return i=ms(t,i),es(t,s),n=eu(e,t,n,r,i,s),r=tu(),e!==null&&!rt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,pn(e,t,s)):(ce&&r&&Uc(t),t.flags|=1,qe(e,t,n,s),t.child)}function _d(e,t,n,r,s){if(it(n)){var i=!0;Oo(t)}else i=!1;if(es(t,s),t.stateNode===null)go(e,t),Eh(t,n,r),zl(t,n,r,s),r=!0;else if(e===null){var a=t.stateNode,l=t.memoizedProps;a.props=l;var c=a.context,u=n.contextType;typeof u=="object"&&u!==null?u=jt(u):(u=it(n)?wr:We.current,u=ms(t,u));var p=n.getDerivedStateFromProps,m=typeof p=="function"||typeof a.getSnapshotBeforeUpdate=="function";m||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(l!==r||c!==u)&&kd(t,a,r,u),Sn=!1;var y=t.memoizedState;a.state=y,Do(t,r,a,s),c=t.memoizedState,l!==r||y!==c||st.current||Sn?(typeof p=="function"&&(Pl(t,n,p,r),c=t.memoizedState),(l=Sn||wd(t,n,l,r,y,c,u))?(m||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(t.flags|=4194308)):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=c),a.props=r,a.state=c,a.context=u,r=l):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,ih(e,t),l=t.memoizedProps,u=t.type===t.elementType?l:Rt(t.type,l),a.props=u,m=t.pendingProps,y=a.context,c=n.contextType,typeof c=="object"&&c!==null?c=jt(c):(c=it(n)?wr:We.current,c=ms(t,c));var w=n.getDerivedStateFromProps;(p=typeof w=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(l!==m||y!==c)&&kd(t,a,r,c),Sn=!1,y=t.memoizedState,a.state=y,Do(t,r,a,s);var g=t.memoizedState;l!==m||y!==g||st.current||Sn?(typeof w=="function"&&(Pl(t,n,w,r),g=t.memoizedState),(u=Sn||wd(t,n,u,r,y,g,c)||!1)?(p||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(r,g,c),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(r,g,c)),typeof a.componentDidUpdate=="function"&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof a.componentDidUpdate!="function"||l===e.memoizedProps&&y===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&y===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=g),a.props=r,a.state=g,a.context=c,r=u):(typeof a.componentDidUpdate!="function"||l===e.memoizedProps&&y===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&y===e.memoizedState||(t.flags|=1024),r=!1)}return Il(e,t,n,r,i,s)}function Il(e,t,n,r,s,i){Ph(e,t);var a=(t.flags&128)!==0;if(!r&&!a)return s&&pd(t,n,!1),pn(e,t,i);r=t.stateNode,by.current=t;var l=a&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&a?(t.child=ys(t,e.child,null,i),t.child=ys(t,null,l,i)):qe(e,t,l,i),t.memoizedState=r.state,s&&pd(t,n,!0),t.child}function zh(e){var t=e.stateNode;t.pendingContext?fd(e,t.pendingContext,t.pendingContext!==t.context):t.context&&fd(e,t.context,!1),Jc(e,t.containerInfo)}function Nd(e,t,n,r,s){return gs(),Hc(s),t.flags|=256,qe(e,t,n,r),t.child}var Al={dehydrated:null,treeContext:null,retryLane:0};function Ml(e){return{baseLanes:e,cachePool:null,transitions:null}}function Lh(e,t,n){var r=t.pendingProps,s=ue.current,i=!1,a=(t.flags&128)!==0,l;if((l=a)||(l=e!==null&&e.memoizedState===null?!1:(s&2)!==0),l?(i=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(s|=1),ie(ue,s&1),e===null)return Nl(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(a=r.children,e=r.fallback,i?(r=t.mode,i=t.child,a={mode:"hidden",children:a},!(r&1)&&i!==null?(i.childLanes=0,i.pendingProps=a):i=ca(a,r,0,null),e=yr(e,r,n,null),i.return=t,e.return=t,i.sibling=e,t.child=i,t.child.memoizedState=Ml(n),t.memoizedState=Al,e):su(t,a));if(s=e.memoizedState,s!==null&&(l=s.dehydrated,l!==null))return wy(e,t,a,r,l,s,n);if(i){i=r.fallback,a=t.mode,s=e.child,l=s.sibling;var c={mode:"hidden",children:r.children};return!(a&1)&&t.child!==s?(r=t.child,r.childLanes=0,r.pendingProps=c,t.deletions=null):(r=Vn(s,c),r.subtreeFlags=s.subtreeFlags&14680064),l!==null?i=Vn(l,i):(i=yr(i,a,n,null),i.flags|=2),i.return=t,r.return=t,r.sibling=i,t.child=r,r=i,i=t.child,a=e.child.memoizedState,a=a===null?Ml(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},i.memoizedState=a,i.childLanes=e.childLanes&~n,t.memoizedState=Al,r}return i=e.child,e=i.sibling,r=Vn(i,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function su(e,t){return t=ca({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function eo(e,t,n,r){return r!==null&&Hc(r),ys(t,e.child,null,n),e=su(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function wy(e,t,n,r,s,i,a){if(n)return t.flags&256?(t.flags&=-257,r=Qa(Error(L(422))),eo(e,t,a,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(i=r.fallback,s=t.mode,r=ca({mode:"visible",children:r.children},s,0,null),i=yr(i,s,a,null),i.flags|=2,r.return=t,i.return=t,r.sibling=i,t.child=r,t.mode&1&&ys(t,e.child,null,a),t.child.memoizedState=Ml(a),t.memoizedState=Al,i);if(!(t.mode&1))return eo(e,t,a,null);if(s.data==="$!"){if(r=s.nextSibling&&s.nextSibling.dataset,r)var l=r.dgst;return r=l,i=Error(L(419)),r=Qa(i,r,void 0),eo(e,t,a,r)}if(l=(a&e.childLanes)!==0,rt||l){if(r=Re,r!==null){switch(a&-a){case 4:s=2;break;case 16:s=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:s=32;break;case 536870912:s=268435456;break;default:s=0}s=s&(r.suspendedLanes|a)?0:s,s!==0&&s!==i.retryLane&&(i.retryLane=s,fn(e,s),Mt(r,e,s,-1))}return uu(),r=Qa(Error(L(421))),eo(e,t,a,r)}return s.data==="$?"?(t.flags|=128,t.child=e.child,t=Oy.bind(null,e),s._reactRetry=t,null):(e=i.treeContext,dt=Bn(s.nextSibling),ft=t,ce=!0,It=null,e!==null&&(bt[wt++]=on,bt[wt++]=an,bt[wt++]=kr,on=e.id,an=e.overflow,kr=t),t=su(t,r.children),t.flags|=4096,t)}function Rd(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Rl(e.return,t,n)}function Ka(e,t,n,r,s){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:s}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=s)}function Oh(e,t,n){var r=t.pendingProps,s=r.revealOrder,i=r.tail;if(qe(e,t,r.children,n),r=ue.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Rd(e,n,t);else if(e.tag===19)Rd(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(ie(ue,r),!(t.mode&1))t.memoizedState=null;else switch(s){case"forwards":for(n=t.child,s=null;n!==null;)e=n.alternate,e!==null&&$o(e)===null&&(s=n),n=n.sibling;n=s,n===null?(s=t.child,t.child=null):(s=n.sibling,n.sibling=null),Ka(t,!1,s,n,i);break;case"backwards":for(n=null,s=t.child,t.child=null;s!==null;){if(e=s.alternate,e!==null&&$o(e)===null){t.child=s;break}e=s.sibling,s.sibling=n,n=s,s=e}Ka(t,!0,n,null,i);break;case"together":Ka(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function go(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function pn(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),jr|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(L(153));if(t.child!==null){for(e=t.child,n=Vn(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Vn(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function ky(e,t,n){switch(t.tag){case 3:zh(t),gs();break;case 5:oh(t);break;case 1:it(t.type)&&Oo(t);break;case 4:Jc(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,s=t.memoizedProps.value;ie(Mo,r._currentValue),r._currentValue=s;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(ie(ue,ue.current&1),t.flags|=128,null):n&t.child.childLanes?Lh(e,t,n):(ie(ue,ue.current&1),e=pn(e,t,n),e!==null?e.sibling:null);ie(ue,ue.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return Oh(e,t,n);t.flags|=128}if(s=t.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),ie(ue,ue.current),r)break;return null;case 22:case 23:return t.lanes=0,Rh(e,t,n)}return pn(e,t,n)}var Ih,Fl,Ah,Mh;Ih=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Fl=function(){};Ah=function(e,t,n,r){var s=e.memoizedProps;if(s!==r){e=t.stateNode,sr(Jt.current);var i=null;switch(n){case"input":s=ol(e,s),r=ol(e,r),i=[];break;case"select":s=fe({},s,{value:void 0}),r=fe({},r,{value:void 0}),i=[];break;case"textarea":s=cl(e,s),r=cl(e,r),i=[];break;default:typeof s.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=zo)}dl(n,r);var a;n=null;for(u in s)if(!r.hasOwnProperty(u)&&s.hasOwnProperty(u)&&s[u]!=null)if(u==="style"){var l=s[u];for(a in l)l.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(ti.hasOwnProperty(u)?i||(i=[]):(i=i||[]).push(u,null));for(u in r){var c=r[u];if(l=s!=null?s[u]:void 0,r.hasOwnProperty(u)&&c!==l&&(c!=null||l!=null))if(u==="style")if(l){for(a in l)!l.hasOwnProperty(a)||c&&c.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in c)c.hasOwnProperty(a)&&l[a]!==c[a]&&(n||(n={}),n[a]=c[a])}else n||(i||(i=[]),i.push(u,n)),n=c;else u==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,l=l?l.__html:void 0,c!=null&&l!==c&&(i=i||[]).push(u,c)):u==="children"?typeof c!="string"&&typeof c!="number"||(i=i||[]).push(u,""+c):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(ti.hasOwnProperty(u)?(c!=null&&u==="onScroll"&&oe("scroll",e),i||l===c||(i=[])):(i=i||[]).push(u,c))}n&&(i=i||[]).push("style",n);var u=i;(t.updateQueue=u)&&(t.flags|=4)}};Mh=function(e,t,n,r){n!==r&&(t.flags|=4)};function Fs(e,t){if(!ce)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function $e(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var s=e.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags&14680064,r|=s.flags&14680064,s.return=e,s=s.sibling;else for(s=e.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags,r|=s.flags,s.return=e,s=s.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Sy(e,t,n){var r=t.pendingProps;switch(Wc(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return $e(t),null;case 1:return it(t.type)&&Lo(),$e(t),null;case 3:return r=t.stateNode,xs(),ae(st),ae(We),Gc(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Gi(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,It!==null&&(ql(It),It=null))),Fl(e,t),$e(t),null;case 5:Xc(t);var s=sr(pi.current);if(n=t.type,e!==null&&t.stateNode!=null)Ah(e,t,n,r,s),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(L(166));return $e(t),null}if(e=sr(Jt.current),Gi(t)){r=t.stateNode,n=t.type;var i=t.memoizedProps;switch(r[Kt]=t,r[di]=i,e=(t.mode&1)!==0,n){case"dialog":oe("cancel",r),oe("close",r);break;case"iframe":case"object":case"embed":oe("load",r);break;case"video":case"audio":for(s=0;s<Hs.length;s++)oe(Hs[s],r);break;case"source":oe("error",r);break;case"img":case"image":case"link":oe("error",r),oe("load",r);break;case"details":oe("toggle",r);break;case"input":Du(r,i),oe("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},oe("invalid",r);break;case"textarea":Bu(r,i),oe("invalid",r)}dl(n,i),s=null;for(var a in i)if(i.hasOwnProperty(a)){var l=i[a];a==="children"?typeof l=="string"?r.textContent!==l&&(i.suppressHydrationWarning!==!0&&Xi(r.textContent,l,e),s=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(i.suppressHydrationWarning!==!0&&Xi(r.textContent,l,e),s=["children",""+l]):ti.hasOwnProperty(a)&&l!=null&&a==="onScroll"&&oe("scroll",r)}switch(n){case"input":Wi(r),$u(r,i,!0);break;case"textarea":Wi(r),Uu(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=zo)}r=s,t.updateQueue=r,r!==null&&(t.flags|=4)}else{a=s.nodeType===9?s:s.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=dp(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=a.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=a.createElement(n,{is:r.is}):(e=a.createElement(n),n==="select"&&(a=e,r.multiple?a.multiple=!0:r.size&&(a.size=r.size))):e=a.createElementNS(e,n),e[Kt]=t,e[di]=r,Ih(e,t,!1,!1),t.stateNode=e;e:{switch(a=fl(n,r),n){case"dialog":oe("cancel",e),oe("close",e),s=r;break;case"iframe":case"object":case"embed":oe("load",e),s=r;break;case"video":case"audio":for(s=0;s<Hs.length;s++)oe(Hs[s],e);s=r;break;case"source":oe("error",e),s=r;break;case"img":case"image":case"link":oe("error",e),oe("load",e),s=r;break;case"details":oe("toggle",e),s=r;break;case"input":Du(e,r),s=ol(e,r),oe("invalid",e);break;case"option":s=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},s=fe({},r,{value:void 0}),oe("invalid",e);break;case"textarea":Bu(e,r),s=cl(e,r),oe("invalid",e);break;default:s=r}dl(n,s),l=s;for(i in l)if(l.hasOwnProperty(i)){var c=l[i];i==="style"?hp(e,c):i==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&fp(e,c)):i==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&ni(e,c):typeof c=="number"&&ni(e,""+c):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(ti.hasOwnProperty(i)?c!=null&&i==="onScroll"&&oe("scroll",e):c!=null&&_c(e,i,c,a))}switch(n){case"input":Wi(e),$u(e,r,!1);break;case"textarea":Wi(e),Uu(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Kn(r.value));break;case"select":e.multiple=!!r.multiple,i=r.value,i!=null?Jr(e,!!r.multiple,i,!1):r.defaultValue!=null&&Jr(e,!!r.multiple,r.defaultValue,!0);break;default:typeof s.onClick=="function"&&(e.onclick=zo)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return $e(t),null;case 6:if(e&&t.stateNode!=null)Mh(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(L(166));if(n=sr(pi.current),sr(Jt.current),Gi(t)){if(r=t.stateNode,n=t.memoizedProps,r[Kt]=t,(i=r.nodeValue!==n)&&(e=ft,e!==null))switch(e.tag){case 3:Xi(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Xi(r.nodeValue,n,(e.mode&1)!==0)}i&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Kt]=t,t.stateNode=r}return $e(t),null;case 13:if(ae(ue),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(ce&&dt!==null&&t.mode&1&&!(t.flags&128))th(),gs(),t.flags|=98560,i=!1;else if(i=Gi(t),r!==null&&r.dehydrated!==null){if(e===null){if(!i)throw Error(L(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(L(317));i[Kt]=t}else gs(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;$e(t),i=!1}else It!==null&&(ql(It),It=null),i=!0;if(!i)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||ue.current&1?Ce===0&&(Ce=3):uu())),t.updateQueue!==null&&(t.flags|=4),$e(t),null);case 4:return xs(),Fl(e,t),e===null&&ci(t.stateNode.containerInfo),$e(t),null;case 10:return Qc(t.type._context),$e(t),null;case 17:return it(t.type)&&Lo(),$e(t),null;case 19:if(ae(ue),i=t.memoizedState,i===null)return $e(t),null;if(r=(t.flags&128)!==0,a=i.rendering,a===null)if(r)Fs(i,!1);else{if(Ce!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(a=$o(e),a!==null){for(t.flags|=128,Fs(i,!1),r=a.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)i=n,e=r,i.flags&=14680066,a=i.alternate,a===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=a.childLanes,i.lanes=a.lanes,i.child=a.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=a.memoizedProps,i.memoizedState=a.memoizedState,i.updateQueue=a.updateQueue,i.type=a.type,e=a.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return ie(ue,ue.current&1|2),t.child}e=e.sibling}i.tail!==null&&ge()>bs&&(t.flags|=128,r=!0,Fs(i,!1),t.lanes=4194304)}else{if(!r)if(e=$o(a),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Fs(i,!0),i.tail===null&&i.tailMode==="hidden"&&!a.alternate&&!ce)return $e(t),null}else 2*ge()-i.renderingStartTime>bs&&n!==1073741824&&(t.flags|=128,r=!0,Fs(i,!1),t.lanes=4194304);i.isBackwards?(a.sibling=t.child,t.child=a):(n=i.last,n!==null?n.sibling=a:t.child=a,i.last=a)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=ge(),t.sibling=null,n=ue.current,ie(ue,r?n&1|2:n&1),t):($e(t),null);case 22:case 23:return cu(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?ut&1073741824&&($e(t),t.subtreeFlags&6&&(t.flags|=8192)):$e(t),null;case 24:return null;case 25:return null}throw Error(L(156,t.tag))}function jy(e,t){switch(Wc(t),t.tag){case 1:return it(t.type)&&Lo(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return xs(),ae(st),ae(We),Gc(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Xc(t),null;case 13:if(ae(ue),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(L(340));gs()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return ae(ue),null;case 4:return xs(),null;case 10:return Qc(t.type._context),null;case 22:case 23:return cu(),null;case 24:return null;default:return null}}var to=!1,Be=!1,Cy=typeof WeakSet=="function"?WeakSet:Set,M=null;function Kr(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){he(e,t,r)}else n.current=null}function Dl(e,t,n){try{n()}catch(r){he(e,t,r)}}var Pd=!1;function Ey(e,t){if(kl=No,e=Up(),Bc(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var s=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var a=0,l=-1,c=-1,u=0,p=0,m=e,y=null;t:for(;;){for(var w;m!==n||s!==0&&m.nodeType!==3||(l=a+s),m!==i||r!==0&&m.nodeType!==3||(c=a+r),m.nodeType===3&&(a+=m.nodeValue.length),(w=m.firstChild)!==null;)y=m,m=w;for(;;){if(m===e)break t;if(y===n&&++u===s&&(l=a),y===i&&++p===r&&(c=a),(w=m.nextSibling)!==null)break;m=y,y=m.parentNode}m=w}n=l===-1||c===-1?null:{start:l,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(Sl={focusedElem:e,selectionRange:n},No=!1,M=t;M!==null;)if(t=M,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,M=e;else for(;M!==null;){t=M;try{var g=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(g!==null){var v=g.memoizedProps,S=g.memoizedState,x=t.stateNode,f=x.getSnapshotBeforeUpdate(t.elementType===t.type?v:Rt(t.type,v),S);x.__reactInternalSnapshotBeforeUpdate=f}break;case 3:var h=t.stateNode.containerInfo;h.nodeType===1?h.textContent="":h.nodeType===9&&h.documentElement&&h.removeChild(h.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(L(163))}}catch(k){he(t,t.return,k)}if(e=t.sibling,e!==null){e.return=t.return,M=e;break}M=t.return}return g=Pd,Pd=!1,g}function Gs(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var s=r=r.next;do{if((s.tag&e)===e){var i=s.destroy;s.destroy=void 0,i!==void 0&&Dl(t,n,i)}s=s.next}while(s!==r)}}function aa(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function $l(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Fh(e){var t=e.alternate;t!==null&&(e.alternate=null,Fh(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Kt],delete t[di],delete t[El],delete t[ly],delete t[cy])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Dh(e){return e.tag===5||e.tag===3||e.tag===4}function zd(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Dh(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Bl(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=zo));else if(r!==4&&(e=e.child,e!==null))for(Bl(e,t,n),e=e.sibling;e!==null;)Bl(e,t,n),e=e.sibling}function Ul(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Ul(e,t,n),e=e.sibling;e!==null;)Ul(e,t,n),e=e.sibling}var Oe=null,Lt=!1;function bn(e,t,n){for(n=n.child;n!==null;)$h(e,t,n),n=n.sibling}function $h(e,t,n){if(Yt&&typeof Yt.onCommitFiberUnmount=="function")try{Yt.onCommitFiberUnmount(Zo,n)}catch{}switch(n.tag){case 5:Be||Kr(n,t);case 6:var r=Oe,s=Lt;Oe=null,bn(e,t,n),Oe=r,Lt=s,Oe!==null&&(Lt?(e=Oe,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Oe.removeChild(n.stateNode));break;case 18:Oe!==null&&(Lt?(e=Oe,n=n.stateNode,e.nodeType===8?Ba(e.parentNode,n):e.nodeType===1&&Ba(e,n),oi(e)):Ba(Oe,n.stateNode));break;case 4:r=Oe,s=Lt,Oe=n.stateNode.containerInfo,Lt=!0,bn(e,t,n),Oe=r,Lt=s;break;case 0:case 11:case 14:case 15:if(!Be&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){s=r=r.next;do{var i=s,a=i.destroy;i=i.tag,a!==void 0&&(i&2||i&4)&&Dl(n,t,a),s=s.next}while(s!==r)}bn(e,t,n);break;case 1:if(!Be&&(Kr(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){he(n,t,l)}bn(e,t,n);break;case 21:bn(e,t,n);break;case 22:n.mode&1?(Be=(r=Be)||n.memoizedState!==null,bn(e,t,n),Be=r):bn(e,t,n);break;default:bn(e,t,n)}}function Ld(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Cy),t.forEach(function(r){var s=Iy.bind(null,e,r);n.has(r)||(n.add(r),r.then(s,s))})}}function Nt(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var s=n[r];try{var i=e,a=t,l=a;e:for(;l!==null;){switch(l.tag){case 5:Oe=l.stateNode,Lt=!1;break e;case 3:Oe=l.stateNode.containerInfo,Lt=!0;break e;case 4:Oe=l.stateNode.containerInfo,Lt=!0;break e}l=l.return}if(Oe===null)throw Error(L(160));$h(i,a,s),Oe=null,Lt=!1;var c=s.alternate;c!==null&&(c.return=null),s.return=null}catch(u){he(s,t,u)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Bh(t,e),t=t.sibling}function Bh(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Nt(t,e),Ut(e),r&4){try{Gs(3,e,e.return),aa(3,e)}catch(v){he(e,e.return,v)}try{Gs(5,e,e.return)}catch(v){he(e,e.return,v)}}break;case 1:Nt(t,e),Ut(e),r&512&&n!==null&&Kr(n,n.return);break;case 5:if(Nt(t,e),Ut(e),r&512&&n!==null&&Kr(n,n.return),e.flags&32){var s=e.stateNode;try{ni(s,"")}catch(v){he(e,e.return,v)}}if(r&4&&(s=e.stateNode,s!=null)){var i=e.memoizedProps,a=n!==null?n.memoizedProps:i,l=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{l==="input"&&i.type==="radio"&&i.name!=null&&cp(s,i),fl(l,a);var u=fl(l,i);for(a=0;a<c.length;a+=2){var p=c[a],m=c[a+1];p==="style"?hp(s,m):p==="dangerouslySetInnerHTML"?fp(s,m):p==="children"?ni(s,m):_c(s,p,m,u)}switch(l){case"input":al(s,i);break;case"textarea":up(s,i);break;case"select":var y=s._wrapperState.wasMultiple;s._wrapperState.wasMultiple=!!i.multiple;var w=i.value;w!=null?Jr(s,!!i.multiple,w,!1):y!==!!i.multiple&&(i.defaultValue!=null?Jr(s,!!i.multiple,i.defaultValue,!0):Jr(s,!!i.multiple,i.multiple?[]:"",!1))}s[di]=i}catch(v){he(e,e.return,v)}}break;case 6:if(Nt(t,e),Ut(e),r&4){if(e.stateNode===null)throw Error(L(162));s=e.stateNode,i=e.memoizedProps;try{s.nodeValue=i}catch(v){he(e,e.return,v)}}break;case 3:if(Nt(t,e),Ut(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{oi(t.containerInfo)}catch(v){he(e,e.return,v)}break;case 4:Nt(t,e),Ut(e);break;case 13:Nt(t,e),Ut(e),s=e.child,s.flags&8192&&(i=s.memoizedState!==null,s.stateNode.isHidden=i,!i||s.alternate!==null&&s.alternate.memoizedState!==null||(au=ge())),r&4&&Ld(e);break;case 22:if(p=n!==null&&n.memoizedState!==null,e.mode&1?(Be=(u=Be)||p,Nt(t,e),Be=u):Nt(t,e),Ut(e),r&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!p&&e.mode&1)for(M=e,p=e.child;p!==null;){for(m=M=p;M!==null;){switch(y=M,w=y.child,y.tag){case 0:case 11:case 14:case 15:Gs(4,y,y.return);break;case 1:Kr(y,y.return);var g=y.stateNode;if(typeof g.componentWillUnmount=="function"){r=y,n=y.return;try{t=r,g.props=t.memoizedProps,g.state=t.memoizedState,g.componentWillUnmount()}catch(v){he(r,n,v)}}break;case 5:Kr(y,y.return);break;case 22:if(y.memoizedState!==null){Id(m);continue}}w!==null?(w.return=y,M=w):Id(m)}p=p.sibling}e:for(p=null,m=e;;){if(m.tag===5){if(p===null){p=m;try{s=m.stateNode,u?(i=s.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(l=m.stateNode,c=m.memoizedProps.style,a=c!=null&&c.hasOwnProperty("display")?c.display:null,l.style.display=pp("display",a))}catch(v){he(e,e.return,v)}}}else if(m.tag===6){if(p===null)try{m.stateNode.nodeValue=u?"":m.memoizedProps}catch(v){he(e,e.return,v)}}else if((m.tag!==22&&m.tag!==23||m.memoizedState===null||m===e)&&m.child!==null){m.child.return=m,m=m.child;continue}if(m===e)break e;for(;m.sibling===null;){if(m.return===null||m.return===e)break e;p===m&&(p=null),m=m.return}p===m&&(p=null),m.sibling.return=m.return,m=m.sibling}}break;case 19:Nt(t,e),Ut(e),r&4&&Ld(e);break;case 21:break;default:Nt(t,e),Ut(e)}}function Ut(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Dh(n)){var r=n;break e}n=n.return}throw Error(L(160))}switch(r.tag){case 5:var s=r.stateNode;r.flags&32&&(ni(s,""),r.flags&=-33);var i=zd(e);Ul(e,i,s);break;case 3:case 4:var a=r.stateNode.containerInfo,l=zd(e);Bl(e,l,a);break;default:throw Error(L(161))}}catch(c){he(e,e.return,c)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Ty(e,t,n){M=e,Uh(e)}function Uh(e,t,n){for(var r=(e.mode&1)!==0;M!==null;){var s=M,i=s.child;if(s.tag===22&&r){var a=s.memoizedState!==null||to;if(!a){var l=s.alternate,c=l!==null&&l.memoizedState!==null||Be;l=to;var u=Be;if(to=a,(Be=c)&&!u)for(M=s;M!==null;)a=M,c=a.child,a.tag===22&&a.memoizedState!==null?Ad(s):c!==null?(c.return=a,M=c):Ad(s);for(;i!==null;)M=i,Uh(i),i=i.sibling;M=s,to=l,Be=u}Od(e)}else s.subtreeFlags&8772&&i!==null?(i.return=s,M=i):Od(e)}}function Od(e){for(;M!==null;){var t=M;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:Be||aa(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!Be)if(n===null)r.componentDidMount();else{var s=t.elementType===t.type?n.memoizedProps:Rt(t.type,n.memoizedProps);r.componentDidUpdate(s,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=t.updateQueue;i!==null&&xd(t,i,r);break;case 3:var a=t.updateQueue;if(a!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}xd(t,a,n)}break;case 5:var l=t.stateNode;if(n===null&&t.flags&4){n=l;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var u=t.alternate;if(u!==null){var p=u.memoizedState;if(p!==null){var m=p.dehydrated;m!==null&&oi(m)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(L(163))}Be||t.flags&512&&$l(t)}catch(y){he(t,t.return,y)}}if(t===e){M=null;break}if(n=t.sibling,n!==null){n.return=t.return,M=n;break}M=t.return}}function Id(e){for(;M!==null;){var t=M;if(t===e){M=null;break}var n=t.sibling;if(n!==null){n.return=t.return,M=n;break}M=t.return}}function Ad(e){for(;M!==null;){var t=M;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{aa(4,t)}catch(c){he(t,n,c)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var s=t.return;try{r.componentDidMount()}catch(c){he(t,s,c)}}var i=t.return;try{$l(t)}catch(c){he(t,i,c)}break;case 5:var a=t.return;try{$l(t)}catch(c){he(t,a,c)}}}catch(c){he(t,t.return,c)}if(t===e){M=null;break}var l=t.sibling;if(l!==null){l.return=t.return,M=l;break}M=t.return}}var _y=Math.ceil,Wo=mn.ReactCurrentDispatcher,iu=mn.ReactCurrentOwner,St=mn.ReactCurrentBatchConfig,X=0,Re=null,we=null,Ie=0,ut=0,Yr=Xn(0),Ce=0,yi=null,jr=0,la=0,ou=0,Zs=null,nt=null,au=0,bs=1/0,Zt=null,Ho=!1,Wl=null,Wn=null,no=!1,An=null,Vo=0,ei=0,Hl=null,yo=-1,xo=0;function Ye(){return X&6?ge():yo!==-1?yo:yo=ge()}function Hn(e){return e.mode&1?X&2&&Ie!==0?Ie&-Ie:dy.transition!==null?(xo===0&&(xo=Ep()),xo):(e=ee,e!==0||(e=window.event,e=e===void 0?16:Lp(e.type)),e):1}function Mt(e,t,n,r){if(50<ei)throw ei=0,Hl=null,Error(L(185));Ni(e,n,r),(!(X&2)||e!==Re)&&(e===Re&&(!(X&2)&&(la|=n),Ce===4&&Cn(e,Ie)),ot(e,r),n===1&&X===0&&!(t.mode&1)&&(bs=ge()+500,sa&&Gn()))}function ot(e,t){var n=e.callbackNode;dg(e,t);var r=_o(e,e===Re?Ie:0);if(r===0)n!==null&&Vu(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&Vu(n),t===1)e.tag===0?uy(Md.bind(null,e)):Gp(Md.bind(null,e)),oy(function(){!(X&6)&&Gn()}),n=null;else{switch(Tp(r)){case 1:n=Lc;break;case 4:n=jp;break;case 16:n=To;break;case 536870912:n=Cp;break;default:n=To}n=Jh(n,Wh.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Wh(e,t){if(yo=-1,xo=0,X&6)throw Error(L(327));var n=e.callbackNode;if(ts()&&e.callbackNode!==n)return null;var r=_o(e,e===Re?Ie:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=qo(e,r);else{t=r;var s=X;X|=2;var i=Vh();(Re!==e||Ie!==t)&&(Zt=null,bs=ge()+500,gr(e,t));do try{Py();break}catch(l){Hh(e,l)}while(!0);qc(),Wo.current=i,X=s,we!==null?t=0:(Re=null,Ie=0,t=Ce)}if(t!==0){if(t===2&&(s=yl(e),s!==0&&(r=s,t=Vl(e,s))),t===1)throw n=yi,gr(e,0),Cn(e,r),ot(e,ge()),n;if(t===6)Cn(e,r);else{if(s=e.current.alternate,!(r&30)&&!Ny(s)&&(t=qo(e,r),t===2&&(i=yl(e),i!==0&&(r=i,t=Vl(e,i))),t===1))throw n=yi,gr(e,0),Cn(e,r),ot(e,ge()),n;switch(e.finishedWork=s,e.finishedLanes=r,t){case 0:case 1:throw Error(L(345));case 2:tr(e,nt,Zt);break;case 3:if(Cn(e,r),(r&130023424)===r&&(t=au+500-ge(),10<t)){if(_o(e,0)!==0)break;if(s=e.suspendedLanes,(s&r)!==r){Ye(),e.pingedLanes|=e.suspendedLanes&s;break}e.timeoutHandle=Cl(tr.bind(null,e,nt,Zt),t);break}tr(e,nt,Zt);break;case 4:if(Cn(e,r),(r&4194240)===r)break;for(t=e.eventTimes,s=-1;0<r;){var a=31-At(r);i=1<<a,a=t[a],a>s&&(s=a),r&=~i}if(r=s,r=ge()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*_y(r/1960))-r,10<r){e.timeoutHandle=Cl(tr.bind(null,e,nt,Zt),r);break}tr(e,nt,Zt);break;case 5:tr(e,nt,Zt);break;default:throw Error(L(329))}}}return ot(e,ge()),e.callbackNode===n?Wh.bind(null,e):null}function Vl(e,t){var n=Zs;return e.current.memoizedState.isDehydrated&&(gr(e,t).flags|=256),e=qo(e,t),e!==2&&(t=nt,nt=n,t!==null&&ql(t)),e}function ql(e){nt===null?nt=e:nt.push.apply(nt,e)}function Ny(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var s=n[r],i=s.getSnapshot;s=s.value;try{if(!Dt(i(),s))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Cn(e,t){for(t&=~ou,t&=~la,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-At(t),r=1<<n;e[n]=-1,t&=~r}}function Md(e){if(X&6)throw Error(L(327));ts();var t=_o(e,0);if(!(t&1))return ot(e,ge()),null;var n=qo(e,t);if(e.tag!==0&&n===2){var r=yl(e);r!==0&&(t=r,n=Vl(e,r))}if(n===1)throw n=yi,gr(e,0),Cn(e,t),ot(e,ge()),n;if(n===6)throw Error(L(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,tr(e,nt,Zt),ot(e,ge()),null}function lu(e,t){var n=X;X|=1;try{return e(t)}finally{X=n,X===0&&(bs=ge()+500,sa&&Gn())}}function Cr(e){An!==null&&An.tag===0&&!(X&6)&&ts();var t=X;X|=1;var n=St.transition,r=ee;try{if(St.transition=null,ee=1,e)return e()}finally{ee=r,St.transition=n,X=t,!(X&6)&&Gn()}}function cu(){ut=Yr.current,ae(Yr)}function gr(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,iy(n)),we!==null)for(n=we.return;n!==null;){var r=n;switch(Wc(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Lo();break;case 3:xs(),ae(st),ae(We),Gc();break;case 5:Xc(r);break;case 4:xs();break;case 13:ae(ue);break;case 19:ae(ue);break;case 10:Qc(r.type._context);break;case 22:case 23:cu()}n=n.return}if(Re=e,we=e=Vn(e.current,null),Ie=ut=t,Ce=0,yi=null,ou=la=jr=0,nt=Zs=null,rr!==null){for(t=0;t<rr.length;t++)if(n=rr[t],r=n.interleaved,r!==null){n.interleaved=null;var s=r.next,i=n.pending;if(i!==null){var a=i.next;i.next=s,r.next=a}n.pending=r}rr=null}return e}function Hh(e,t){do{var n=we;try{if(qc(),ho.current=Uo,Bo){for(var r=de.memoizedState;r!==null;){var s=r.queue;s!==null&&(s.pending=null),r=r.next}Bo=!1}if(Sr=0,Ne=Se=de=null,Xs=!1,hi=0,iu.current=null,n===null||n.return===null){Ce=1,yi=t,we=null;break}e:{var i=e,a=n.return,l=n,c=t;if(t=Ie,l.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var u=c,p=l,m=p.tag;if(!(p.mode&1)&&(m===0||m===11||m===15)){var y=p.alternate;y?(p.updateQueue=y.updateQueue,p.memoizedState=y.memoizedState,p.lanes=y.lanes):(p.updateQueue=null,p.memoizedState=null)}var w=jd(a);if(w!==null){w.flags&=-257,Cd(w,a,l,i,t),w.mode&1&&Sd(i,u,t),t=w,c=u;var g=t.updateQueue;if(g===null){var v=new Set;v.add(c),t.updateQueue=v}else g.add(c);break e}else{if(!(t&1)){Sd(i,u,t),uu();break e}c=Error(L(426))}}else if(ce&&l.mode&1){var S=jd(a);if(S!==null){!(S.flags&65536)&&(S.flags|=256),Cd(S,a,l,i,t),Hc(vs(c,l));break e}}i=c=vs(c,l),Ce!==4&&(Ce=2),Zs===null?Zs=[i]:Zs.push(i),i=a;do{switch(i.tag){case 3:i.flags|=65536,t&=-t,i.lanes|=t;var x=Th(i,c,t);yd(i,x);break e;case 1:l=c;var f=i.type,h=i.stateNode;if(!(i.flags&128)&&(typeof f.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&(Wn===null||!Wn.has(h)))){i.flags|=65536,t&=-t,i.lanes|=t;var k=_h(i,l,t);yd(i,k);break e}}i=i.return}while(i!==null)}Qh(n)}catch(E){t=E,we===n&&n!==null&&(we=n=n.return);continue}break}while(!0)}function Vh(){var e=Wo.current;return Wo.current=Uo,e===null?Uo:e}function uu(){(Ce===0||Ce===3||Ce===2)&&(Ce=4),Re===null||!(jr&268435455)&&!(la&268435455)||Cn(Re,Ie)}function qo(e,t){var n=X;X|=2;var r=Vh();(Re!==e||Ie!==t)&&(Zt=null,gr(e,t));do try{Ry();break}catch(s){Hh(e,s)}while(!0);if(qc(),X=n,Wo.current=r,we!==null)throw Error(L(261));return Re=null,Ie=0,Ce}function Ry(){for(;we!==null;)qh(we)}function Py(){for(;we!==null&&!ng();)qh(we)}function qh(e){var t=Yh(e.alternate,e,ut);e.memoizedProps=e.pendingProps,t===null?Qh(e):we=t,iu.current=null}function Qh(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=jy(n,t),n!==null){n.flags&=32767,we=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Ce=6,we=null;return}}else if(n=Sy(n,t,ut),n!==null){we=n;return}if(t=t.sibling,t!==null){we=t;return}we=t=e}while(t!==null);Ce===0&&(Ce=5)}function tr(e,t,n){var r=ee,s=St.transition;try{St.transition=null,ee=1,zy(e,t,n,r)}finally{St.transition=s,ee=r}return null}function zy(e,t,n,r){do ts();while(An!==null);if(X&6)throw Error(L(327));n=e.finishedWork;var s=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(L(177));e.callbackNode=null,e.callbackPriority=0;var i=n.lanes|n.childLanes;if(fg(e,i),e===Re&&(we=Re=null,Ie=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||no||(no=!0,Jh(To,function(){return ts(),null})),i=(n.flags&15990)!==0,n.subtreeFlags&15990||i){i=St.transition,St.transition=null;var a=ee;ee=1;var l=X;X|=4,iu.current=null,Ey(e,n),Bh(n,e),Gg(Sl),No=!!kl,Sl=kl=null,e.current=n,Ty(n),rg(),X=l,ee=a,St.transition=i}else e.current=n;if(no&&(no=!1,An=e,Vo=s),i=e.pendingLanes,i===0&&(Wn=null),og(n.stateNode),ot(e,ge()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)s=t[n],r(s.value,{componentStack:s.stack,digest:s.digest});if(Ho)throw Ho=!1,e=Wl,Wl=null,e;return Vo&1&&e.tag!==0&&ts(),i=e.pendingLanes,i&1?e===Hl?ei++:(ei=0,Hl=e):ei=0,Gn(),null}function ts(){if(An!==null){var e=Tp(Vo),t=St.transition,n=ee;try{if(St.transition=null,ee=16>e?16:e,An===null)var r=!1;else{if(e=An,An=null,Vo=0,X&6)throw Error(L(331));var s=X;for(X|=4,M=e.current;M!==null;){var i=M,a=i.child;if(M.flags&16){var l=i.deletions;if(l!==null){for(var c=0;c<l.length;c++){var u=l[c];for(M=u;M!==null;){var p=M;switch(p.tag){case 0:case 11:case 15:Gs(8,p,i)}var m=p.child;if(m!==null)m.return=p,M=m;else for(;M!==null;){p=M;var y=p.sibling,w=p.return;if(Fh(p),p===u){M=null;break}if(y!==null){y.return=w,M=y;break}M=w}}}var g=i.alternate;if(g!==null){var v=g.child;if(v!==null){g.child=null;do{var S=v.sibling;v.sibling=null,v=S}while(v!==null)}}M=i}}if(i.subtreeFlags&2064&&a!==null)a.return=i,M=a;else e:for(;M!==null;){if(i=M,i.flags&2048)switch(i.tag){case 0:case 11:case 15:Gs(9,i,i.return)}var x=i.sibling;if(x!==null){x.return=i.return,M=x;break e}M=i.return}}var f=e.current;for(M=f;M!==null;){a=M;var h=a.child;if(a.subtreeFlags&2064&&h!==null)h.return=a,M=h;else e:for(a=f;M!==null;){if(l=M,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:aa(9,l)}}catch(E){he(l,l.return,E)}if(l===a){M=null;break e}var k=l.sibling;if(k!==null){k.return=l.return,M=k;break e}M=l.return}}if(X=s,Gn(),Yt&&typeof Yt.onPostCommitFiberRoot=="function")try{Yt.onPostCommitFiberRoot(Zo,e)}catch{}r=!0}return r}finally{ee=n,St.transition=t}}return!1}function Fd(e,t,n){t=vs(n,t),t=Th(e,t,1),e=Un(e,t,1),t=Ye(),e!==null&&(Ni(e,1,t),ot(e,t))}function he(e,t,n){if(e.tag===3)Fd(e,e,n);else for(;t!==null;){if(t.tag===3){Fd(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Wn===null||!Wn.has(r))){e=vs(n,e),e=_h(t,e,1),t=Un(t,e,1),e=Ye(),t!==null&&(Ni(t,1,e),ot(t,e));break}}t=t.return}}function Ly(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=Ye(),e.pingedLanes|=e.suspendedLanes&n,Re===e&&(Ie&n)===n&&(Ce===4||Ce===3&&(Ie&130023424)===Ie&&500>ge()-au?gr(e,0):ou|=n),ot(e,t)}function Kh(e,t){t===0&&(e.mode&1?(t=qi,qi<<=1,!(qi&130023424)&&(qi=4194304)):t=1);var n=Ye();e=fn(e,t),e!==null&&(Ni(e,t,n),ot(e,n))}function Oy(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Kh(e,n)}function Iy(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,s=e.memoizedState;s!==null&&(n=s.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(L(314))}r!==null&&r.delete(t),Kh(e,n)}var Yh;Yh=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||st.current)rt=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return rt=!1,ky(e,t,n);rt=!!(e.flags&131072)}else rt=!1,ce&&t.flags&1048576&&Zp(t,Ao,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;go(e,t),e=t.pendingProps;var s=ms(t,We.current);es(t,n),s=eu(null,t,r,e,s,n);var i=tu();return t.flags|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,it(r)?(i=!0,Oo(t)):i=!1,t.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,Yc(t),s.updater=oa,t.stateNode=s,s._reactInternals=t,zl(t,r,e,n),t=Il(null,t,r,!0,i,n)):(t.tag=0,ce&&i&&Uc(t),qe(null,t,s,n),t=t.child),t;case 16:r=t.elementType;e:{switch(go(e,t),e=t.pendingProps,s=r._init,r=s(r._payload),t.type=r,s=t.tag=My(r),e=Rt(r,e),s){case 0:t=Ol(null,t,r,e,n);break e;case 1:t=_d(null,t,r,e,n);break e;case 11:t=Ed(null,t,r,e,n);break e;case 14:t=Td(null,t,r,Rt(r.type,e),n);break e}throw Error(L(306,r,""))}return t;case 0:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:Rt(r,s),Ol(e,t,r,s,n);case 1:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:Rt(r,s),_d(e,t,r,s,n);case 3:e:{if(zh(t),e===null)throw Error(L(387));r=t.pendingProps,i=t.memoizedState,s=i.element,ih(e,t),Do(t,r,null,n);var a=t.memoizedState;if(r=a.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){s=vs(Error(L(423)),t),t=Nd(e,t,r,n,s);break e}else if(r!==s){s=vs(Error(L(424)),t),t=Nd(e,t,r,n,s);break e}else for(dt=Bn(t.stateNode.containerInfo.firstChild),ft=t,ce=!0,It=null,n=rh(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(gs(),r===s){t=pn(e,t,n);break e}qe(e,t,r,n)}t=t.child}return t;case 5:return oh(t),e===null&&Nl(t),r=t.type,s=t.pendingProps,i=e!==null?e.memoizedProps:null,a=s.children,jl(r,s)?a=null:i!==null&&jl(r,i)&&(t.flags|=32),Ph(e,t),qe(e,t,a,n),t.child;case 6:return e===null&&Nl(t),null;case 13:return Lh(e,t,n);case 4:return Jc(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=ys(t,null,r,n):qe(e,t,r,n),t.child;case 11:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:Rt(r,s),Ed(e,t,r,s,n);case 7:return qe(e,t,t.pendingProps,n),t.child;case 8:return qe(e,t,t.pendingProps.children,n),t.child;case 12:return qe(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,s=t.pendingProps,i=t.memoizedProps,a=s.value,ie(Mo,r._currentValue),r._currentValue=a,i!==null)if(Dt(i.value,a)){if(i.children===s.children&&!st.current){t=pn(e,t,n);break e}}else for(i=t.child,i!==null&&(i.return=t);i!==null;){var l=i.dependencies;if(l!==null){a=i.child;for(var c=l.firstContext;c!==null;){if(c.context===r){if(i.tag===1){c=ln(-1,n&-n),c.tag=2;var u=i.updateQueue;if(u!==null){u=u.shared;var p=u.pending;p===null?c.next=c:(c.next=p.next,p.next=c),u.pending=c}}i.lanes|=n,c=i.alternate,c!==null&&(c.lanes|=n),Rl(i.return,n,t),l.lanes|=n;break}c=c.next}}else if(i.tag===10)a=i.type===t.type?null:i.child;else if(i.tag===18){if(a=i.return,a===null)throw Error(L(341));a.lanes|=n,l=a.alternate,l!==null&&(l.lanes|=n),Rl(a,n,t),a=i.sibling}else a=i.child;if(a!==null)a.return=i;else for(a=i;a!==null;){if(a===t){a=null;break}if(i=a.sibling,i!==null){i.return=a.return,a=i;break}a=a.return}i=a}qe(e,t,s.children,n),t=t.child}return t;case 9:return s=t.type,r=t.pendingProps.children,es(t,n),s=jt(s),r=r(s),t.flags|=1,qe(e,t,r,n),t.child;case 14:return r=t.type,s=Rt(r,t.pendingProps),s=Rt(r.type,s),Td(e,t,r,s,n);case 15:return Nh(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:Rt(r,s),go(e,t),t.tag=1,it(r)?(e=!0,Oo(t)):e=!1,es(t,n),Eh(t,r,s),zl(t,r,s,n),Il(null,t,r,!0,e,n);case 19:return Oh(e,t,n);case 22:return Rh(e,t,n)}throw Error(L(156,t.tag))};function Jh(e,t){return Sp(e,t)}function Ay(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function kt(e,t,n,r){return new Ay(e,t,n,r)}function du(e){return e=e.prototype,!(!e||!e.isReactComponent)}function My(e){if(typeof e=="function")return du(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Rc)return 11;if(e===Pc)return 14}return 2}function Vn(e,t){var n=e.alternate;return n===null?(n=kt(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function vo(e,t,n,r,s,i){var a=2;if(r=e,typeof e=="function")du(e)&&(a=1);else if(typeof e=="string")a=5;else e:switch(e){case Dr:return yr(n.children,s,i,t);case Nc:a=8,s|=8;break;case nl:return e=kt(12,n,t,s|2),e.elementType=nl,e.lanes=i,e;case rl:return e=kt(13,n,t,s),e.elementType=rl,e.lanes=i,e;case sl:return e=kt(19,n,t,s),e.elementType=sl,e.lanes=i,e;case op:return ca(n,s,i,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case sp:a=10;break e;case ip:a=9;break e;case Rc:a=11;break e;case Pc:a=14;break e;case kn:a=16,r=null;break e}throw Error(L(130,e==null?e:typeof e,""))}return t=kt(a,n,t,s),t.elementType=e,t.type=r,t.lanes=i,t}function yr(e,t,n,r){return e=kt(7,e,r,t),e.lanes=n,e}function ca(e,t,n,r){return e=kt(22,e,r,t),e.elementType=op,e.lanes=n,e.stateNode={isHidden:!1},e}function Ya(e,t,n){return e=kt(6,e,null,t),e.lanes=n,e}function Ja(e,t,n){return t=kt(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Fy(e,t,n,r,s){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Ra(0),this.expirationTimes=Ra(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ra(0),this.identifierPrefix=r,this.onRecoverableError=s,this.mutableSourceEagerHydrationData=null}function fu(e,t,n,r,s,i,a,l,c){return e=new Fy(e,t,n,l,c),t===1?(t=1,i===!0&&(t|=8)):t=0,i=kt(3,null,null,t),e.current=i,i.stateNode=e,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Yc(i),e}function Dy(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Fr,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function Xh(e){if(!e)return Yn;e=e._reactInternals;e:{if(Pr(e)!==e||e.tag!==1)throw Error(L(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(it(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(L(171))}if(e.tag===1){var n=e.type;if(it(n))return Xp(e,n,t)}return t}function Gh(e,t,n,r,s,i,a,l,c){return e=fu(n,r,!0,e,s,i,a,l,c),e.context=Xh(null),n=e.current,r=Ye(),s=Hn(n),i=ln(r,s),i.callback=t??null,Un(n,i,s),e.current.lanes=s,Ni(e,s,r),ot(e,r),e}function ua(e,t,n,r){var s=t.current,i=Ye(),a=Hn(s);return n=Xh(n),t.context===null?t.context=n:t.pendingContext=n,t=ln(i,a),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=Un(s,t,a),e!==null&&(Mt(e,s,a,i),po(e,s,a)),a}function Qo(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Dd(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function pu(e,t){Dd(e,t),(e=e.alternate)&&Dd(e,t)}function $y(){return null}var Zh=typeof reportError=="function"?reportError:function(e){console.error(e)};function hu(e){this._internalRoot=e}da.prototype.render=hu.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(L(409));ua(e,t,null,null)};da.prototype.unmount=hu.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Cr(function(){ua(null,e,null,null)}),t[dn]=null}};function da(e){this._internalRoot=e}da.prototype.unstable_scheduleHydration=function(e){if(e){var t=Rp();e={blockedOn:null,target:e,priority:t};for(var n=0;n<jn.length&&t!==0&&t<jn[n].priority;n++);jn.splice(n,0,e),n===0&&zp(e)}};function mu(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function fa(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function $d(){}function By(e,t,n,r,s){if(s){if(typeof r=="function"){var i=r;r=function(){var u=Qo(a);i.call(u)}}var a=Gh(t,r,e,0,null,!1,!1,"",$d);return e._reactRootContainer=a,e[dn]=a.current,ci(e.nodeType===8?e.parentNode:e),Cr(),a}for(;s=e.lastChild;)e.removeChild(s);if(typeof r=="function"){var l=r;r=function(){var u=Qo(c);l.call(u)}}var c=fu(e,0,!1,null,null,!1,!1,"",$d);return e._reactRootContainer=c,e[dn]=c.current,ci(e.nodeType===8?e.parentNode:e),Cr(function(){ua(t,c,n,r)}),c}function pa(e,t,n,r,s){var i=n._reactRootContainer;if(i){var a=i;if(typeof s=="function"){var l=s;s=function(){var c=Qo(a);l.call(c)}}ua(t,a,e,s)}else a=By(n,t,e,s,r);return Qo(a)}_p=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Ws(t.pendingLanes);n!==0&&(Oc(t,n|1),ot(t,ge()),!(X&6)&&(bs=ge()+500,Gn()))}break;case 13:Cr(function(){var r=fn(e,1);if(r!==null){var s=Ye();Mt(r,e,1,s)}}),pu(e,1)}};Ic=function(e){if(e.tag===13){var t=fn(e,134217728);if(t!==null){var n=Ye();Mt(t,e,134217728,n)}pu(e,134217728)}};Np=function(e){if(e.tag===13){var t=Hn(e),n=fn(e,t);if(n!==null){var r=Ye();Mt(n,e,t,r)}pu(e,t)}};Rp=function(){return ee};Pp=function(e,t){var n=ee;try{return ee=e,t()}finally{ee=n}};hl=function(e,t,n){switch(t){case"input":if(al(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var s=ra(r);if(!s)throw Error(L(90));lp(r),al(r,s)}}}break;case"textarea":up(e,n);break;case"select":t=n.value,t!=null&&Jr(e,!!n.multiple,t,!1)}};yp=lu;xp=Cr;var Uy={usingClientEntryPoint:!1,Events:[Pi,Wr,ra,mp,gp,lu]},Ds={findFiberByHostInstance:nr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Wy={bundleType:Ds.bundleType,version:Ds.version,rendererPackageName:Ds.rendererPackageName,rendererConfig:Ds.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:mn.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=wp(e),e===null?null:e.stateNode},findFiberByHostInstance:Ds.findFiberByHostInstance||$y,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ro=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ro.isDisabled&&ro.supportsFiber)try{Zo=ro.inject(Wy),Yt=ro}catch{}}ht.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Uy;ht.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!mu(t))throw Error(L(200));return Dy(e,t,null,n)};ht.createRoot=function(e,t){if(!mu(e))throw Error(L(299));var n=!1,r="",s=Zh;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(s=t.onRecoverableError)),t=fu(e,1,!1,null,null,n,!1,r,s),e[dn]=t.current,ci(e.nodeType===8?e.parentNode:e),new hu(t)};ht.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(L(188)):(e=Object.keys(e).join(","),Error(L(268,e)));return e=wp(t),e=e===null?null:e.stateNode,e};ht.flushSync=function(e){return Cr(e)};ht.hydrate=function(e,t,n){if(!fa(t))throw Error(L(200));return pa(null,e,t,!0,n)};ht.hydrateRoot=function(e,t,n){if(!mu(e))throw Error(L(405));var r=n!=null&&n.hydratedSources||null,s=!1,i="",a=Zh;if(n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),t=Gh(t,null,e,1,n??null,s,!1,i,a),e[dn]=t.current,ci(e),r)for(e=0;e<r.length;e++)n=r[e],s=n._getVersion,s=s(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,s]:t.mutableSourceEagerHydrationData.push(n,s);return new da(t)};ht.render=function(e,t,n){if(!fa(t))throw Error(L(200));return pa(null,e,t,!1,n)};ht.unmountComponentAtNode=function(e){if(!fa(e))throw Error(L(40));return e._reactRootContainer?(Cr(function(){pa(null,null,e,!1,function(){e._reactRootContainer=null,e[dn]=null})}),!0):!1};ht.unstable_batchedUpdates=lu;ht.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!fa(n))throw Error(L(200));if(e==null||e._reactInternals===void 0)throw Error(L(38));return pa(e,t,n,!1,r)};ht.version="18.3.1-next-f1338f8080-20240426";function em(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(em)}catch(e){console.error(e)}}em(),ep.exports=ht;var Hy=ep.exports,tm,Bd=Hy;tm=Bd.createRoot,Bd.hydrateRoot;/**
 * @remix-run/router v1.23.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function xi(){return xi=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},xi.apply(this,arguments)}var Mn;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(Mn||(Mn={}));const Ud="popstate";function Vy(e){e===void 0&&(e={});function t(r,s){let{pathname:i,search:a,hash:l}=r.location;return Ql("",{pathname:i,search:a,hash:l},s.state&&s.state.usr||null,s.state&&s.state.key||"default")}function n(r,s){return typeof s=="string"?s:Ko(s)}return Qy(t,n,null,e)}function ye(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function nm(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function qy(){return Math.random().toString(36).substr(2,8)}function Wd(e,t){return{usr:e.state,key:e.key,idx:t}}function Ql(e,t,n,r){return n===void 0&&(n=null),xi({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?Cs(t):t,{state:n,key:t&&t.key||r||qy()})}function Ko(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&n!=="?"&&(t+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(t+=r.charAt(0)==="#"?r:"#"+r),t}function Cs(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function Qy(e,t,n,r){r===void 0&&(r={});let{window:s=document.defaultView,v5Compat:i=!1}=r,a=s.history,l=Mn.Pop,c=null,u=p();u==null&&(u=0,a.replaceState(xi({},a.state,{idx:u}),""));function p(){return(a.state||{idx:null}).idx}function m(){l=Mn.Pop;let S=p(),x=S==null?null:S-u;u=S,c&&c({action:l,location:v.location,delta:x})}function y(S,x){l=Mn.Push;let f=Ql(v.location,S,x);u=p()+1;let h=Wd(f,u),k=v.createHref(f);try{a.pushState(h,"",k)}catch(E){if(E instanceof DOMException&&E.name==="DataCloneError")throw E;s.location.assign(k)}i&&c&&c({action:l,location:v.location,delta:1})}function w(S,x){l=Mn.Replace;let f=Ql(v.location,S,x);u=p();let h=Wd(f,u),k=v.createHref(f);a.replaceState(h,"",k),i&&c&&c({action:l,location:v.location,delta:0})}function g(S){let x=s.location.origin!=="null"?s.location.origin:s.location.href,f=typeof S=="string"?S:Ko(S);return f=f.replace(/ $/,"%20"),ye(x,"No window.location.(origin|href) available to create URL for href: "+f),new URL(f,x)}let v={get action(){return l},get location(){return e(s,a)},listen(S){if(c)throw new Error("A history only accepts one active listener");return s.addEventListener(Ud,m),c=S,()=>{s.removeEventListener(Ud,m),c=null}},createHref(S){return t(s,S)},createURL:g,encodeLocation(S){let x=g(S);return{pathname:x.pathname,search:x.search,hash:x.hash}},push:y,replace:w,go(S){return a.go(S)}};return v}var Hd;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(Hd||(Hd={}));function Ky(e,t,n){return n===void 0&&(n="/"),Yy(e,t,n)}function Yy(e,t,n,r){let s=typeof t=="string"?Cs(t):t,i=gu(s.pathname||"/",n);if(i==null)return null;let a=rm(e);Jy(a);let l=null;for(let c=0;l==null&&c<a.length;++c){let u=l1(i);l=i1(a[c],u)}return l}function rm(e,t,n,r){t===void 0&&(t=[]),n===void 0&&(n=[]),r===void 0&&(r="");let s=(i,a,l)=>{let c={relativePath:l===void 0?i.path||"":l,caseSensitive:i.caseSensitive===!0,childrenIndex:a,route:i};c.relativePath.startsWith("/")&&(ye(c.relativePath.startsWith(r),'Absolute route path "'+c.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),c.relativePath=c.relativePath.slice(r.length));let u=qn([r,c.relativePath]),p=n.concat(c);i.children&&i.children.length>0&&(ye(i.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+u+'".')),rm(i.children,t,p,u)),!(i.path==null&&!i.index)&&t.push({path:u,score:r1(u,i.index),routesMeta:p})};return e.forEach((i,a)=>{var l;if(i.path===""||!((l=i.path)!=null&&l.includes("?")))s(i,a);else for(let c of sm(i.path))s(i,a,c)}),t}function sm(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,s=n.endsWith("?"),i=n.replace(/\?$/,"");if(r.length===0)return s?[i,""]:[i];let a=sm(r.join("/")),l=[];return l.push(...a.map(c=>c===""?i:[i,c].join("/"))),s&&l.push(...a),l.map(c=>e.startsWith("/")&&c===""?"/":c)}function Jy(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:s1(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}const Xy=/^:[\w-]+$/,Gy=3,Zy=2,e1=1,t1=10,n1=-2,Vd=e=>e==="*";function r1(e,t){let n=e.split("/"),r=n.length;return n.some(Vd)&&(r+=n1),t&&(r+=Zy),n.filter(s=>!Vd(s)).reduce((s,i)=>s+(Xy.test(i)?Gy:i===""?e1:t1),r)}function s1(e,t){return e.length===t.length&&e.slice(0,-1).every((r,s)=>r===t[s])?e[e.length-1]-t[t.length-1]:0}function i1(e,t,n){let{routesMeta:r}=e,s={},i="/",a=[];for(let l=0;l<r.length;++l){let c=r[l],u=l===r.length-1,p=i==="/"?t:t.slice(i.length)||"/",m=o1({path:c.relativePath,caseSensitive:c.caseSensitive,end:u},p),y=c.route;if(!m)return null;Object.assign(s,m.params),a.push({params:s,pathname:qn([i,m.pathname]),pathnameBase:f1(qn([i,m.pathnameBase])),route:y}),m.pathnameBase!=="/"&&(i=qn([i,m.pathnameBase]))}return a}function o1(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=a1(e.path,e.caseSensitive,e.end),s=t.match(n);if(!s)return null;let i=s[0],a=i.replace(/(.)\/+$/,"$1"),l=s.slice(1);return{params:r.reduce((u,p,m)=>{let{paramName:y,isOptional:w}=p;if(y==="*"){let v=l[m]||"";a=i.slice(0,i.length-v.length).replace(/(.)\/+$/,"$1")}const g=l[m];return w&&!g?u[y]=void 0:u[y]=(g||"").replace(/%2F/g,"/"),u},{}),pathname:i,pathnameBase:a,pattern:e}}function a1(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),nm(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let r=[],s="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(a,l,c)=>(r.push({paramName:l,isOptional:c!=null}),c?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(r.push({paramName:"*"}),s+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?s+="\\/*$":e!==""&&e!=="/"&&(s+="(?:(?=\\/|$))"),[new RegExp(s,t?void 0:"i"),r]}function l1(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return nm(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function gu(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}function c1(e,t){t===void 0&&(t="/");let{pathname:n,search:r="",hash:s=""}=typeof e=="string"?Cs(e):e;return{pathname:n?n.startsWith("/")?n:u1(n,t):t,search:p1(r),hash:h1(s)}}function u1(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(s=>{s===".."?n.length>1&&n.pop():s!=="."&&n.push(s)}),n.length>1?n.join("/"):"/"}function Xa(e,t,n,r){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function d1(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function yu(e,t){let n=d1(e);return t?n.map((r,s)=>s===n.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}function xu(e,t,n,r){r===void 0&&(r=!1);let s;typeof e=="string"?s=Cs(e):(s=xi({},e),ye(!s.pathname||!s.pathname.includes("?"),Xa("?","pathname","search",s)),ye(!s.pathname||!s.pathname.includes("#"),Xa("#","pathname","hash",s)),ye(!s.search||!s.search.includes("#"),Xa("#","search","hash",s)));let i=e===""||s.pathname==="",a=i?"/":s.pathname,l;if(a==null)l=n;else{let m=t.length-1;if(!r&&a.startsWith("..")){let y=a.split("/");for(;y[0]==="..";)y.shift(),m-=1;s.pathname=y.join("/")}l=m>=0?t[m]:"/"}let c=c1(s,l),u=a&&a!=="/"&&a.endsWith("/"),p=(i||a===".")&&n.endsWith("/");return!c.pathname.endsWith("/")&&(u||p)&&(c.pathname+="/"),c}const qn=e=>e.join("/").replace(/\/\/+/g,"/"),f1=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),p1=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,h1=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function m1(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const im=["post","put","patch","delete"];new Set(im);const g1=["get",...im];new Set(g1);/**
 * React Router v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function vi(){return vi=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},vi.apply(this,arguments)}const vu=b.createContext(null),y1=b.createContext(null),Zn=b.createContext(null),ha=b.createContext(null),gn=b.createContext({outlet:null,matches:[],isDataRoute:!1}),om=b.createContext(null);function x1(e,t){let{relative:n}=t===void 0?{}:t;Es()||ye(!1);let{basename:r,navigator:s}=b.useContext(Zn),{hash:i,pathname:a,search:l}=lm(e,{relative:n}),c=a;return r!=="/"&&(c=a==="/"?r:qn([r,a])),s.createHref({pathname:c,search:l,hash:i})}function Es(){return b.useContext(ha)!=null}function Ts(){return Es()||ye(!1),b.useContext(ha).location}function am(e){b.useContext(Zn).static||b.useLayoutEffect(e)}function zr(){let{isDataRoute:e}=b.useContext(gn);return e?z1():v1()}function v1(){Es()||ye(!1);let e=b.useContext(vu),{basename:t,future:n,navigator:r}=b.useContext(Zn),{matches:s}=b.useContext(gn),{pathname:i}=Ts(),a=JSON.stringify(yu(s,n.v7_relativeSplatPath)),l=b.useRef(!1);return am(()=>{l.current=!0}),b.useCallback(function(u,p){if(p===void 0&&(p={}),!l.current)return;if(typeof u=="number"){r.go(u);return}let m=xu(u,JSON.parse(a),i,p.relative==="path");e==null&&t!=="/"&&(m.pathname=m.pathname==="/"?t:qn([t,m.pathname])),(p.replace?r.replace:r.push)(m,p.state,p)},[t,r,a,i,e])}function b1(){let{matches:e}=b.useContext(gn),t=e[e.length-1];return t?t.params:{}}function lm(e,t){let{relative:n}=t===void 0?{}:t,{future:r}=b.useContext(Zn),{matches:s}=b.useContext(gn),{pathname:i}=Ts(),a=JSON.stringify(yu(s,r.v7_relativeSplatPath));return b.useMemo(()=>xu(e,JSON.parse(a),i,n==="path"),[e,a,i,n])}function w1(e,t){return k1(e,t)}function k1(e,t,n,r){Es()||ye(!1);let{navigator:s}=b.useContext(Zn),{matches:i}=b.useContext(gn),a=i[i.length-1],l=a?a.params:{};a&&a.pathname;let c=a?a.pathnameBase:"/";a&&a.route;let u=Ts(),p;if(t){var m;let S=typeof t=="string"?Cs(t):t;c==="/"||(m=S.pathname)!=null&&m.startsWith(c)||ye(!1),p=S}else p=u;let y=p.pathname||"/",w=y;if(c!=="/"){let S=c.replace(/^\//,"").split("/");w="/"+y.replace(/^\//,"").split("/").slice(S.length).join("/")}let g=Ky(e,{pathname:w}),v=T1(g&&g.map(S=>Object.assign({},S,{params:Object.assign({},l,S.params),pathname:qn([c,s.encodeLocation?s.encodeLocation(S.pathname).pathname:S.pathname]),pathnameBase:S.pathnameBase==="/"?c:qn([c,s.encodeLocation?s.encodeLocation(S.pathnameBase).pathname:S.pathnameBase])})),i,n,r);return t&&v?b.createElement(ha.Provider,{value:{location:vi({pathname:"/",search:"",hash:"",state:null,key:"default"},p),navigationType:Mn.Pop}},v):v}function S1(){let e=P1(),t=m1(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,s={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return b.createElement(b.Fragment,null,b.createElement("h2",null,"Unexpected Application Error!"),b.createElement("h3",{style:{fontStyle:"italic"}},t),n?b.createElement("pre",{style:s},n):null,null)}const j1=b.createElement(S1,null);class C1 extends b.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,n){return n.location!==t.location||n.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:n.error,location:n.location,revalidation:t.revalidation||n.revalidation}}componentDidCatch(t,n){console.error("React Router caught the following error during render",t,n)}render(){return this.state.error!==void 0?b.createElement(gn.Provider,{value:this.props.routeContext},b.createElement(om.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function E1(e){let{routeContext:t,match:n,children:r}=e,s=b.useContext(vu);return s&&s.static&&s.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(s.staticContext._deepestRenderedBoundaryId=n.route.id),b.createElement(gn.Provider,{value:t},r)}function T1(e,t,n,r){var s;if(t===void 0&&(t=[]),n===void 0&&(n=null),r===void 0&&(r=null),e==null){var i;if(!n)return null;if(n.errors)e=n.matches;else if((i=r)!=null&&i.v7_partialHydration&&t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let a=e,l=(s=n)==null?void 0:s.errors;if(l!=null){let p=a.findIndex(m=>m.route.id&&(l==null?void 0:l[m.route.id])!==void 0);p>=0||ye(!1),a=a.slice(0,Math.min(a.length,p+1))}let c=!1,u=-1;if(n&&r&&r.v7_partialHydration)for(let p=0;p<a.length;p++){let m=a[p];if((m.route.HydrateFallback||m.route.hydrateFallbackElement)&&(u=p),m.route.id){let{loaderData:y,errors:w}=n,g=m.route.loader&&y[m.route.id]===void 0&&(!w||w[m.route.id]===void 0);if(m.route.lazy||g){c=!0,u>=0?a=a.slice(0,u+1):a=[a[0]];break}}}return a.reduceRight((p,m,y)=>{let w,g=!1,v=null,S=null;n&&(w=l&&m.route.id?l[m.route.id]:void 0,v=m.route.errorElement||j1,c&&(u<0&&y===0?(L1("route-fallback"),g=!0,S=null):u===y&&(g=!0,S=m.route.hydrateFallbackElement||null)));let x=t.concat(a.slice(0,y+1)),f=()=>{let h;return w?h=v:g?h=S:m.route.Component?h=b.createElement(m.route.Component,null):m.route.element?h=m.route.element:h=p,b.createElement(E1,{match:m,routeContext:{outlet:p,matches:x,isDataRoute:n!=null},children:h})};return n&&(m.route.ErrorBoundary||m.route.errorElement||y===0)?b.createElement(C1,{location:n.location,revalidation:n.revalidation,component:v,error:w,children:f(),routeContext:{outlet:null,matches:x,isDataRoute:!0}}):f()},null)}var cm=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(cm||{}),um=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(um||{});function _1(e){let t=b.useContext(vu);return t||ye(!1),t}function N1(e){let t=b.useContext(y1);return t||ye(!1),t}function R1(e){let t=b.useContext(gn);return t||ye(!1),t}function dm(e){let t=R1(),n=t.matches[t.matches.length-1];return n.route.id||ye(!1),n.route.id}function P1(){var e;let t=b.useContext(om),n=N1(),r=dm();return t!==void 0?t:(e=n.errors)==null?void 0:e[r]}function z1(){let{router:e}=_1(cm.UseNavigateStable),t=dm(um.UseNavigateStable),n=b.useRef(!1);return am(()=>{n.current=!0}),b.useCallback(function(s,i){i===void 0&&(i={}),n.current&&(typeof s=="number"?e.navigate(s):e.navigate(s,vi({fromRouteId:t},i)))},[e,t])}const qd={};function L1(e,t,n){qd[e]||(qd[e]=!0)}function O1(e,t){e==null||e.v7_startTransition,e==null||e.v7_relativeSplatPath}function I1(e){let{to:t,replace:n,state:r,relative:s}=e;Es()||ye(!1);let{future:i,static:a}=b.useContext(Zn),{matches:l}=b.useContext(gn),{pathname:c}=Ts(),u=zr(),p=xu(t,yu(l,i.v7_relativeSplatPath),c,s==="path"),m=JSON.stringify(p);return b.useEffect(()=>u(JSON.parse(m),{replace:n,state:r,relative:s}),[u,m,s,n,r]),null}function Ze(e){ye(!1)}function A1(e){let{basename:t="/",children:n=null,location:r,navigationType:s=Mn.Pop,navigator:i,static:a=!1,future:l}=e;Es()&&ye(!1);let c=t.replace(/^\/*/,"/"),u=b.useMemo(()=>({basename:c,navigator:i,static:a,future:vi({v7_relativeSplatPath:!1},l)}),[c,l,i,a]);typeof r=="string"&&(r=Cs(r));let{pathname:p="/",search:m="",hash:y="",state:w=null,key:g="default"}=r,v=b.useMemo(()=>{let S=gu(p,c);return S==null?null:{location:{pathname:S,search:m,hash:y,state:w,key:g},navigationType:s}},[c,p,m,y,w,g,s]);return v==null?null:b.createElement(Zn.Provider,{value:u},b.createElement(ha.Provider,{children:n,value:v}))}function M1(e){let{children:t,location:n}=e;return w1(Kl(t),n)}new Promise(()=>{});function Kl(e,t){t===void 0&&(t=[]);let n=[];return b.Children.forEach(e,(r,s)=>{if(!b.isValidElement(r))return;let i=[...t,s];if(r.type===b.Fragment){n.push.apply(n,Kl(r.props.children,i));return}r.type!==Ze&&ye(!1),!r.props.index||!r.props.children||ye(!1);let a={id:r.props.id||i.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(a.children=Kl(r.props.children,i)),n.push(a)}),n}/**
 * React Router DOM v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Yl(){return Yl=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Yl.apply(this,arguments)}function F1(e,t){if(e==null)return{};var n={},r=Object.keys(e),s,i;for(i=0;i<r.length;i++)s=r[i],!(t.indexOf(s)>=0)&&(n[s]=e[s]);return n}function D1(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function $1(e,t){return e.button===0&&(!t||t==="_self")&&!D1(e)}function Jl(e){return e===void 0&&(e=""),new URLSearchParams(typeof e=="string"||Array.isArray(e)||e instanceof URLSearchParams?e:Object.keys(e).reduce((t,n)=>{let r=e[n];return t.concat(Array.isArray(r)?r.map(s=>[n,s]):[[n,r]])},[]))}function B1(e,t){let n=Jl(e);return t&&t.forEach((r,s)=>{n.has(s)||t.getAll(s).forEach(i=>{n.append(s,i)})}),n}const U1=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],W1="6";try{window.__reactRouterVersion=W1}catch{}const H1="startTransition",Qd=L0[H1];function V1(e){let{basename:t,children:n,future:r,window:s}=e,i=b.useRef();i.current==null&&(i.current=Vy({window:s,v5Compat:!0}));let a=i.current,[l,c]=b.useState({action:a.action,location:a.location}),{v7_startTransition:u}=r||{},p=b.useCallback(m=>{u&&Qd?Qd(()=>c(m)):c(m)},[c,u]);return b.useLayoutEffect(()=>a.listen(p),[a,p]),b.useEffect(()=>O1(r),[r]),b.createElement(A1,{basename:t,children:n,location:l.location,navigationType:l.action,navigator:a,future:r})}const q1=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",Q1=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,ke=b.forwardRef(function(t,n){let{onClick:r,relative:s,reloadDocument:i,replace:a,state:l,target:c,to:u,preventScrollReset:p,viewTransition:m}=t,y=F1(t,U1),{basename:w}=b.useContext(Zn),g,v=!1;if(typeof u=="string"&&Q1.test(u)&&(g=u,q1))try{let h=new URL(window.location.href),k=u.startsWith("//")?new URL(h.protocol+u):new URL(u),E=gu(k.pathname,w);k.origin===h.origin&&E!=null?u=E+k.search+k.hash:v=!0}catch{}let S=x1(u,{relative:s}),x=K1(u,{replace:a,state:l,target:c,preventScrollReset:p,relative:s,viewTransition:m});function f(h){r&&r(h),h.defaultPrevented||x(h)}return b.createElement("a",Yl({},y,{href:g||S,onClick:v||i?r:f,ref:n,target:c}))});var Kd;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(Kd||(Kd={}));var Yd;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(Yd||(Yd={}));function K1(e,t){let{target:n,replace:r,state:s,preventScrollReset:i,relative:a,viewTransition:l}=t===void 0?{}:t,c=zr(),u=Ts(),p=lm(e,{relative:a});return b.useCallback(m=>{if($1(m,n)){m.preventDefault();let y=r!==void 0?r:Ko(u)===Ko(p);c(e,{replace:y,state:s,preventScrollReset:i,relative:a,viewTransition:l})}},[u,c,p,r,s,n,e,i,a,l])}function Y1(e){let t=b.useRef(Jl(e)),n=b.useRef(!1),r=Ts(),s=b.useMemo(()=>B1(r.search,n.current?null:t.current),[r.search]),i=zr(),a=b.useCallback((l,c)=>{const u=Jl(typeof l=="function"?l(s):l);n.current=!0,i("?"+u,c)},[i,s]);return[s,a]}const fm=b.createContext(void 0),J1=({children:e})=>{const[t,n]=b.useState(()=>localStorage.getItem("token")),[r,s]=b.useState(()=>{const l=localStorage.getItem("user");return l?JSON.parse(l):null});ne.useEffect(()=>{if(t)try{const l=JSON.parse(atob(t.split(".")[1]));if(l.exp){const c=l.exp*1e3,u=Date.now();if(c<u)a();else{const p=setTimeout(()=>a(),c-u);return()=>clearTimeout(p)}}}catch{a()}},[t]),ne.useEffect(()=>{if(t)try{const l=JSON.parse(atob(t.split(".")[1]));if(l.exp){const c=l.exp*1e3,u=Date.now();if(c<u)a();else{const p=setTimeout(()=>a(),c-u);return()=>clearTimeout(p)}}}catch{a()}},[t]);const i=(l,c)=>{n(l),s(c),localStorage.setItem("token",l),localStorage.setItem("user",JSON.stringify(c))},a=()=>{n(null),s(null),localStorage.removeItem("token"),localStorage.removeItem("user")};return o.jsx(fm.Provider,{value:{token:t,user:r,login:i,logout:a},children:e})},gt=()=>{const e=b.useContext(fm);if(!e)throw new Error("useAuth must be used within AuthProvider");return e},pm=b.createContext(void 0),X1=({children:e})=>{const[t,n]=b.useState([]);b.useEffect(()=>{const i=new WebSocket("ws://localhost:3005/ws");return i.onmessage=a=>{const l=JSON.parse(a.data);n(c=>[...c,{id:Date.now().toString(),message:l.message,type:l.type||"info"}])},()=>i.close()},[]);const r=(i,a="info")=>{n(l=>[...l,{id:Date.now().toString(),message:i,type:a}])},s=i=>{n(a=>a.filter(l=>l.id!==i))};return o.jsx(pm.Provider,{value:{notifications:t,addNotification:r,removeNotification:s},children:e})},G1=()=>{const e=b.useContext(pm);if(!e)throw new Error("useNotifications must be used within NotificationProvider");return e},Z1=()=>{const{notifications:e,removeNotification:t}=G1();return o.jsxs(o.Fragment,{children:[o.jsx("style",{children:`
        .notif-list {
          position: fixed;
          top: 16px;
          right: 16px;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .notif-item {
          padding: 14px 18px;
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.10);
          border-left: 6px solid #1976d2;
          min-width: 220px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 1rem;
        }
        .notif-item[data-type="success"] {
          border-left-color: #43a047;
        }
        .notif-item[data-type="error"] {
          border-left-color: #d32f2f;
        }
        .notif-item[data-type="info"] {
          border-left-color: #1976d2;
        }
        .notif-dismiss {
          margin-left: 18px;
          background: #eee;
          border: none;
          border-radius: 6px;
          padding: 6px 12px;
          cursor: pointer;
          font-size: 0.95rem;
          color: #333;
          transition: background 0.2s;
        }
        .notif-dismiss:hover {
          background: #ddd;
        }
        @media (max-width: 600px) {
          .notif-list {
            top: 8px;
            right: 8px;
            gap: 8px;
          }
          .notif-item {
            min-width: 140px;
            font-size: 0.92rem;
            padding: 8px 10px;
          }
        }
      `}),o.jsx("div",{className:"notif-list",children:e.map(n=>o.jsxs("div",{className:"notif-item","data-type":n.type||"info",children:[o.jsx("span",{children:n.message}),o.jsx("button",{className:"notif-dismiss",onClick:()=>t(n.id),children:"Dismiss"})]},n.id))})]})},ex=()=>{const{token:e}=gt(),[t,n]=b.useState(!1),[r,s]=b.useState([]),[i,a]=b.useState(0),[l,c]=b.useState(!1),u=b.useRef(null);b.useEffect(()=>{const g=v=>{u.current&&!u.current.contains(v.target)&&n(!1)};return document.addEventListener("mousedown",g),()=>document.removeEventListener("mousedown",g)},[]);const p=b.useCallback(async()=>{if(e)try{const g=await fetch("http://localhost:3003/api/matching/team-requests/received",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(g.ok){const v=await g.json();if(v.success&&v.data&&v.data.requests){const S=v.data.requests;a(S.length),s(S.slice(0,5))}else a(0),s([])}}catch(g){console.error("Error fetching team requests:",g),a(0),s([])}},[e]);b.useEffect(()=>{p();const g=setInterval(p,3e4);return()=>clearInterval(g)},[p]);const m=b.useCallback(async g=>{if(e){c(!0);try{(await fetch(`http://localhost:3003/api/matching/team-requests/${g}`,{method:"PUT",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({status:"accepted"})})).ok&&await p()}catch(v){console.error("Error accepting request:",v)}finally{c(!1)}}},[e,p]),y=b.useCallback(async g=>{if(e){c(!0);try{(await fetch(`http://localhost:3003/api/matching/team-requests/${g}`,{method:"PUT",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({status:"rejected"})})).ok&&await p()}catch(v){console.error("Error rejecting request:",v)}finally{c(!1)}}},[e,p]),w=b.useCallback(g=>{const v=new Date(g),x=(new Date().getTime()-v.getTime())/(1e3*60*60);return x<1?"Just now":x<24?`${Math.floor(x)}h ago`:`${Math.floor(x/24)}d ago`},[]);return e?o.jsxs(o.Fragment,{children:[o.jsx("style",{children:`
        .notification-bell {
          position: relative;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          border-radius: 50%;
          transition: background-color 0.2s;
        }
        .notification-bell:hover {
          background-color: rgba(25, 118, 210, 0.1);
        }
        .notification-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          background-color: #f44336;
          color: white;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: bold;
          min-width: 18px;
        }
        .notification-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          min-width: 320px;
          max-width: 400px;
          z-index: 1000;
          margin-top: 0.5rem;
        }
        .notification-header {
          padding: 1rem;
          border-bottom: 1px solid #e0e0e0;
          font-weight: 600;
          color: #333;
        }
        .notification-list {
          max-height: 400px;
          overflow-y: auto;
        }
        .notification-item {
          padding: 1rem;
          border-bottom: 1px solid #f0f0f0;
          transition: background-color 0.2s;
        }
        .notification-item:hover {
          background-color: #f8f9fa;
        }
        .notification-item:last-child {
          border-bottom: none;
        }
        .sender-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .sender-name {
          font-weight: 600;
          color: #333;
        }
        .sender-company {
          color: #666;
          font-size: 0.875rem;
        }
        .request-message {
          color: #555;
          font-size: 0.875rem;
          margin-bottom: 0.75rem;
          line-height: 1.4;
        }
        .request-actions {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }
        .btn-accept {
          background-color: #4caf50;
          color: white;
          border: none;
          padding: 0.375rem 0.75rem;
          border-radius: 4px;
          font-size: 0.75rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .btn-accept:hover:not(:disabled) {
          background-color: #45a049;
        }
        .btn-reject {
          background-color: #f44336;
          color: white;
          border: none;
          padding: 0.375rem 0.75rem;
          border-radius: 4px;
          font-size: 0.75rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .btn-reject:hover:not(:disabled) {
          background-color: #da190b;
        }
        .btn-accept:disabled,
        .btn-reject:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .request-time {
          color: #999;
          font-size: 0.75rem;
          margin-left: auto;
        }
        .empty-state {
          padding: 2rem;
          text-align: center;
          color: #666;
        }
        .view-all {
          padding: 0.75rem 1rem;
          text-align: center;
          border-top: 1px solid #e0e0e0;
          background-color: #f8f9fa;
        }
        .view-all a {
          color: #1976d2;
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
        }
        .view-all a:hover {
          text-decoration: underline;
        }
      `}),o.jsxs("div",{className:"notification-bell",ref:u,children:[o.jsxs("div",{onClick:()=>n(!t),children:[o.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"#1976d2",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[o.jsx("path",{d:"M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"}),o.jsx("path",{d:"M13.73 21a2 2 0 0 1-3.46 0"})]}),i>0&&o.jsx("span",{className:"notification-badge",children:i>9?"9+":i})]}),t&&o.jsxs("div",{className:"notification-dropdown",children:[o.jsxs("div",{className:"notification-header",children:["Team Requests (",i,")"]}),o.jsx("div",{className:"notification-list",children:!r||r.length===0?o.jsx("div",{className:"empty-state",children:o.jsx("p",{children:"No pending team requests"})}):r.map(g=>o.jsxs("div",{className:"notification-item",children:[o.jsxs("div",{className:"sender-info",children:[o.jsx("span",{className:"sender-name",children:g.sender_name}),g.sender_company&&o.jsxs("span",{className:"sender-company",children:["• ",g.sender_company]}),o.jsx("span",{className:"request-time",children:w(g.created_at)})]}),g.message&&o.jsxs("div",{className:"request-message",children:['"',g.message,'"']}),g.match_context&&o.jsx("div",{className:"request-message",children:o.jsxs("small",{children:[g.match_context.skill&&`Skill: ${g.match_context.skill}`,g.match_context.distance&&` • ${g.match_context.distance}km away`]})}),o.jsxs("div",{className:"request-actions",children:[o.jsx("button",{className:"btn-accept",onClick:()=>m(g.id),disabled:l,children:"Accept"}),o.jsx("button",{className:"btn-reject",onClick:()=>y(g.id),disabled:l,children:"Reject"})]})]},g.id))}),i>5&&o.jsx("div",{className:"view-all",children:o.jsx("a",{href:"/dashboard",onClick:()=>n(!1),children:"View all requests"})})]})]})]}):null},tx=()=>{const{token:e,logout:t}=gt(),[n,r]=b.useState(!1),s=()=>{r(!n)};return o.jsxs(o.Fragment,{children:[o.jsx("style",{children:`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background: #f5ecd6;
          box-shadow: 0 2px 12px rgba(0,0,0,0.07);
          border-bottom: 2px solid #e9d8a6;
          font-size: 1.08rem;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          margin-right: 2rem;
        }

        .navbar-menu {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex: 1;
        }

        .navbar-menu.authenticated {
          justify-content: space-between;
        }

        .navbar-menu.unauthenticated {
          justify-content: flex-end;
        }

        .navbar-links {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .navbar a {
          color: #1976d2;
          text-decoration: none;
          font-weight: 600;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .navbar a:hover {
          background: #f5f7fa;
          color: #115293;
          transform: translateY(-1px);
        }

        .navbar button {
          background: #d32f2f;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 0.5rem 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .navbar button:hover {
          background: #b71c1c;
          transform: translateY(-1px);
        }

        .mobile-menu-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          color: #1976d2;
        }

        .mobile-menu {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: #f5ecd6;
          border-bottom: 2px solid #e9d8a6;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          flex-direction: column;
          padding: 1rem;
          gap: 0.5rem;
        }

        .mobile-menu.open {
          display: flex;
        }

        .mobile-menu a, .mobile-menu button {
          width: 100%;
          text-align: center;
          padding: 0.75rem;
          margin: 0.25rem 0;
        }

        /* Tablet styles */
        @media (max-width: 968px) {
          .navbar {
            padding: 1rem 1.5rem;
          }
          
          .navbar-links {
            gap: 1rem;
          }
          
          .navbar a, .navbar button {
            padding: 0.4rem 0.8rem;
            font-size: 0.95rem;
          }
        }

        /* Mobile styles */
        @media (max-width: 768px) {
          .navbar {
            padding: 0.75rem 1rem;
            position: relative;
          }

          .navbar-brand {
            margin-right: 1rem;
          }

          .navbar-menu {
            display: none;
          }

          .mobile-menu-toggle {
            display: block;
          }
        }

        /* Small mobile styles */
        @media (max-width: 480px) {
          .navbar {
            padding: 0.5rem 0.75rem;
          }
          
          .navbar-brand svg {
            width: 24px;
            height: 24px;
          }
        }
      `}),o.jsxs("nav",{className:"navbar",children:[o.jsx("div",{className:"navbar-brand",children:o.jsx(ke,{to:"/","aria-label":"Home",children:o.jsxs("svg",{width:"28",height:"28",viewBox:"0 0 24 24",fill:"none",stroke:"#1976d2",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[o.jsx("path",{d:"M3 9.5L12 3l9 6.5V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.5z"}),o.jsx("path",{d:"M9 22V12h6v10"})]})})}),o.jsx("button",{className:"mobile-menu-toggle",onClick:s,"aria-label":"Toggle mobile menu",children:o.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[o.jsx("line",{x1:"3",y1:"6",x2:"21",y2:"6"}),o.jsx("line",{x1:"3",y1:"12",x2:"21",y2:"12"}),o.jsx("line",{x1:"3",y1:"18",x2:"21",y2:"18"})]})}),e?o.jsxs("div",{className:"navbar-menu authenticated",children:[o.jsxs("div",{className:"navbar-links",children:[o.jsx(ke,{to:"/dashboard",children:"Dashboard"}),o.jsx(ke,{to:"/search",children:"Search"}),o.jsx(ke,{to:"/saved",children:"My Team"}),o.jsx(ke,{to:"/status",children:"Status"}),o.jsx(ke,{to:"/profile",children:"Profile"})]}),o.jsxs("div",{className:"navbar-actions",children:[o.jsx(ex,{}),o.jsx("button",{onClick:t,children:"Logout"})]})]}):o.jsx("div",{className:"navbar-menu unauthenticated",children:o.jsxs("div",{className:"navbar-links",children:[o.jsx(ke,{to:"/login",children:"Login"}),o.jsx(ke,{to:"/register",children:"Register"})]})}),o.jsx("div",{className:`mobile-menu ${n?"open":""}`,children:e?o.jsxs(o.Fragment,{children:[o.jsx(ke,{to:"/dashboard",onClick:()=>r(!1),children:"Dashboard"}),o.jsx(ke,{to:"/search",onClick:()=>r(!1),children:"Search"}),o.jsx(ke,{to:"/saved",onClick:()=>r(!1),children:"My Team"}),o.jsx(ke,{to:"/status",onClick:()=>r(!1),children:"Status"}),o.jsx(ke,{to:"/profile",onClick:()=>r(!1),children:"Profile"}),o.jsx("button",{onClick:()=>{t(),r(!1)},children:"Logout"})]}):o.jsxs(o.Fragment,{children:[o.jsx(ke,{to:"/login",onClick:()=>r(!1),children:"Login"}),o.jsx(ke,{to:"/register",onClick:()=>r(!1),children:"Register"})]})})]})]})},nx=!1,hm=!0,Ft={AUTH_SERVICE:"/api/auth",USER_SERVICE:"/api/users",MATCHING_SERVICE:"/api/matching",COMMUNICATION_SERVICE:"/api/communication",NOTIFICATION_SERVICE:"/api/notification"},rx=hm,xr=async(e,t={})=>{{console.log("Demo mode: Simulating API call to",e);let n={success:!0,message:"Demo mode - operation successful"};if(e.includes("/signup"))n={success:!0,message:"Demo: Account created successfully! You can now explore the app."};else if(e.includes("/login")){const r={id:1,email:"demo@example.com",role:"contractor",exp:Math.floor(Date.now()/1e3)+86400};n={success:!0,accessToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9."+btoa(JSON.stringify(r))+".demo-signature",user:{id:1,email:"demo@example.com",role:"contractor",name:"Demo User"}}}else e.includes("/profile")?n={success:!0,user:{id:1,name:"Demo User",email:"demo@example.com",role:"contractor"}}:e.includes("/skills")?n={success:!0,skills:["plumbing","electrical","carpentry","painting","construction"]}:e.includes("/team-requests/received")?n={success:!0,requests:[{id:1,senderName:"John Doe",projectTitle:"Home Renovation",message:"Need plumbing expert",date:"2025-10-01"},{id:2,senderName:"Jane Smith",projectTitle:"Kitchen Remodel",message:"Looking for electrician",date:"2025-10-02"}]}:e.includes("/my-team")?n={success:!0,team:[{id:1,name:"Mike Wilson",role:"Electrician",status:"active"},{id:2,name:"Sarah Johnson",role:"Plumber",status:"active"}]}:e.includes("/profile")&&(n={success:!0,user:{id:1,name:"Demo User",email:"demo@example.com",role:"contractor",phoneNumber:"+1234567890",location:"New York, NY"}});return await new Promise(r=>setTimeout(r,800)),new Response(JSON.stringify(n),{status:200,statusText:"OK",headers:{"Content-Type":"application/json"}})}};console.log("API Config:",{isDevelopment:nx,isProduction:hm,API_CONFIG:Ft,DEMO_MODE:rx});const sx=()=>{const{login:e,token:t}=gt(),n=zr();b.useEffect(()=>{t&&n("/dashboard")},[t,n]),b.useEffect(()=>{t&&n("/dashboard")},[]);const[r,s]=b.useState(""),[i,a]=b.useState(""),[l,c]=b.useState(!1),[u,p]=b.useState(""),[m,y]=b.useState(!1),[w,g]=b.useState(!1),v=async S=>{S.preventDefault(),p(""),g(!0);const x={email:r,password:i};try{const f=await xr(`${Ft.AUTH_SERVICE}/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(x)}),h=await f.json();if(f.ok&&h.accessToken)try{e(h.accessToken,h.user),y(!0)}catch{p("There was a problem saving your login. Please try again."),g(!1);return}else h.error&&typeof h.error=="string"&&h.error.toLowerCase().includes("invalid")?p("Invalid username or password. Please try again."):h.error&&typeof h.error=="object"&&h.error.message?p(h.error.message):h.error?p(typeof h.error=="string"?h.error:"Login failed. Please try again."):p("Login failed. Please try again.")}catch{p("Network error")}finally{g(!1)}};return o.jsxs(o.Fragment,{children:[o.jsx("style",{children:`
        .login-bg {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f5f7fa;
          padding: 2rem;
        }
        .login-form {
          width: 100%;
          max-width: 420px;
          min-width: 320px;
          padding: 2.5rem 2.5rem 2rem 2.5rem;
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 4px 32px rgba(0,0,0,0.10);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .login-form h2 {
          text-align: center;
          margin-bottom: 1rem;
          color: #1976d2;
          font-size: 2rem;
          font-weight: 700;
        }
        .login-form input {
          padding: 1rem;
          border-radius: 10px;
          border: 1px solid #bbb;
          font-size: 1.1rem;
          background: #f7f9fc;
        }
        .login-form button {
          padding: 1rem;
          border-radius: 10px;
          border: none;
          background: #1976d2;
          color: #fff;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(25,118,210,0.08);
          transition: background 0.2s;
        }
        .login-form button:hover {
          background: #115293;
        }
        .login-form .error {
          color: red;
          text-align: center;
          font-weight: 500;
        }
        @media (max-width: 600px) {
          .login-form {
            max-width: 100vw;
            min-width: 0;
            padding: 1.2rem 0.5rem 1rem 0.5rem;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          }
          .login-form h2 {
            font-size: 1.4rem;
          }
          .login-form input, .login-form button {
            font-size: 1rem;
            padding: 0.7rem;
            border-radius: 7px;
          }
        }
      `}),o.jsx("div",{className:"login-bg",children:o.jsxs("form",{className:"login-form",onSubmit:v,"aria-label":"Login form",tabIndex:0,children:[o.jsx("h2",{id:"login-title",children:"Login"}),m&&o.jsxs("div",{className:"success-bar",role:"status","aria-live":"polite",children:["Login successful!",o.jsx("button",{className:"close-btn",onClick:()=>y(!1),"aria-label":"Close success message",children:"×"})]}),o.jsx("label",{htmlFor:"login-username",style:{display:"none"},children:"Username"}),o.jsx("input",{id:"login-username",type:"text",placeholder:"Username (email or mobile)",value:r,onChange:S=>s(S.target.value),required:!0,"aria-label":"Username",autoComplete:"username"}),o.jsx("label",{htmlFor:"login-password",style:{display:"none"},children:"Password"}),o.jsx("input",{id:"login-password",type:"password",placeholder:"Password",value:i,onChange:S=>a(S.target.value),required:!0,"aria-label":"Password",autoComplete:"current-password"}),o.jsxs("div",{className:"login-options-row",children:[o.jsxs("label",{className:"remember-me",children:[o.jsx("input",{type:"checkbox",checked:l,onChange:S=>c(S.target.checked)}),"Remember me"]}),o.jsx("a",{href:"/forgot-password",className:"forgot-password-link",children:"Forgot password?"})]}),o.jsx("button",{type:"submit",disabled:w,"aria-busy":w,"aria-label":"Login",children:w?"Logging in...":"Login"}),u&&o.jsx("div",{className:"error",role:"alert",children:u})]})}),o.jsx("style",{children:`
        .success-bar {
          background: #43a047;
          color: #fff;
          padding: 0.8rem 1.2rem;
          border-radius: 8px;
          font-weight: 600;
          text-align: center;
          margin-bottom: 1rem;
          position: relative;
          box-shadow: 0 2px 8px rgba(67,160,71,0.12);
          animation: fadeIn 0.3s;
        }
        .login-options-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: -0.5rem;
        }
        .remember-me {
          display: flex;
          align-items: center;
          font-size: 1rem;
          gap: 0.4rem;
        }
        .forgot-password-link {
          color: #1976d2;
          text-decoration: none;
          font-size: 1rem;
          transition: color 0.2s;
        }
        .forgot-password-link:hover {
          color: #115293;
          text-decoration: underline;
        }
        .close-btn {
          background: none;
          border: none;
          color: #fff;
          font-size: 1.2rem;
          position: absolute;
          right: 12px;
          top: 8px;
          cursor: pointer;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `})]})};function mm(e){var t,n,r="";if(typeof e=="string"||typeof e=="number")r+=e;else if(typeof e=="object")if(Array.isArray(e)){var s=e.length;for(t=0;t<s;t++)e[t]&&(n=mm(e[t]))&&(r&&(r+=" "),r+=n)}else for(n in e)e[n]&&(r&&(r+=" "),r+=n);return r}function vr(){for(var e,t,n=0,r="",s=arguments.length;n<s;n++)(e=arguments[n])&&(t=mm(e))&&(r&&(r+=" "),r+=t);return r}function ix(e){if(typeof document>"u")return;let t=document.head||document.getElementsByTagName("head")[0],n=document.createElement("style");n.type="text/css",t.firstChild?t.insertBefore(n,t.firstChild):t.appendChild(n),n.styleSheet?n.styleSheet.cssText=e:n.appendChild(document.createTextNode(e))}ix(`:root{--toastify-color-light: #fff;--toastify-color-dark: #121212;--toastify-color-info: #3498db;--toastify-color-success: #07bc0c;--toastify-color-warning: #f1c40f;--toastify-color-error: hsl(6, 78%, 57%);--toastify-color-transparent: rgba(255, 255, 255, .7);--toastify-icon-color-info: var(--toastify-color-info);--toastify-icon-color-success: var(--toastify-color-success);--toastify-icon-color-warning: var(--toastify-color-warning);--toastify-icon-color-error: var(--toastify-color-error);--toastify-container-width: fit-content;--toastify-toast-width: 320px;--toastify-toast-offset: 16px;--toastify-toast-top: max(var(--toastify-toast-offset), env(safe-area-inset-top));--toastify-toast-right: max(var(--toastify-toast-offset), env(safe-area-inset-right));--toastify-toast-left: max(var(--toastify-toast-offset), env(safe-area-inset-left));--toastify-toast-bottom: max(var(--toastify-toast-offset), env(safe-area-inset-bottom));--toastify-toast-background: #fff;--toastify-toast-padding: 14px;--toastify-toast-min-height: 64px;--toastify-toast-max-height: 800px;--toastify-toast-bd-radius: 6px;--toastify-toast-shadow: 0px 4px 12px rgba(0, 0, 0, .1);--toastify-font-family: sans-serif;--toastify-z-index: 9999;--toastify-text-color-light: #757575;--toastify-text-color-dark: #fff;--toastify-text-color-info: #fff;--toastify-text-color-success: #fff;--toastify-text-color-warning: #fff;--toastify-text-color-error: #fff;--toastify-spinner-color: #616161;--toastify-spinner-color-empty-area: #e0e0e0;--toastify-color-progress-light: linear-gradient(to right, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55);--toastify-color-progress-dark: #bb86fc;--toastify-color-progress-info: var(--toastify-color-info);--toastify-color-progress-success: var(--toastify-color-success);--toastify-color-progress-warning: var(--toastify-color-warning);--toastify-color-progress-error: var(--toastify-color-error);--toastify-color-progress-bgo: .2}.Toastify__toast-container{z-index:var(--toastify-z-index);-webkit-transform:translate3d(0,0,var(--toastify-z-index));position:fixed;width:var(--toastify-container-width);box-sizing:border-box;color:#fff;display:flex;flex-direction:column}.Toastify__toast-container--top-left{top:var(--toastify-toast-top);left:var(--toastify-toast-left)}.Toastify__toast-container--top-center{top:var(--toastify-toast-top);left:50%;transform:translate(-50%);align-items:center}.Toastify__toast-container--top-right{top:var(--toastify-toast-top);right:var(--toastify-toast-right);align-items:end}.Toastify__toast-container--bottom-left{bottom:var(--toastify-toast-bottom);left:var(--toastify-toast-left)}.Toastify__toast-container--bottom-center{bottom:var(--toastify-toast-bottom);left:50%;transform:translate(-50%);align-items:center}.Toastify__toast-container--bottom-right{bottom:var(--toastify-toast-bottom);right:var(--toastify-toast-right);align-items:end}.Toastify__toast{--y: 0;position:relative;touch-action:none;width:var(--toastify-toast-width);min-height:var(--toastify-toast-min-height);box-sizing:border-box;margin-bottom:1rem;padding:var(--toastify-toast-padding);border-radius:var(--toastify-toast-bd-radius);box-shadow:var(--toastify-toast-shadow);max-height:var(--toastify-toast-max-height);font-family:var(--toastify-font-family);z-index:0;display:flex;flex:1 auto;align-items:center;word-break:break-word}@media only screen and (max-width: 480px){.Toastify__toast-container{width:100vw;left:env(safe-area-inset-left);margin:0}.Toastify__toast-container--top-left,.Toastify__toast-container--top-center,.Toastify__toast-container--top-right{top:env(safe-area-inset-top);transform:translate(0)}.Toastify__toast-container--bottom-left,.Toastify__toast-container--bottom-center,.Toastify__toast-container--bottom-right{bottom:env(safe-area-inset-bottom);transform:translate(0)}.Toastify__toast-container--rtl{right:env(safe-area-inset-right);left:initial}.Toastify__toast{--toastify-toast-width: 100%;margin-bottom:0;border-radius:0}}.Toastify__toast-container[data-stacked=true]{width:var(--toastify-toast-width)}.Toastify__toast--stacked{position:absolute;width:100%;transform:translate3d(0,var(--y),0) scale(var(--s));transition:transform .3s}.Toastify__toast--stacked[data-collapsed] .Toastify__toast-body,.Toastify__toast--stacked[data-collapsed] .Toastify__close-button{transition:opacity .1s}.Toastify__toast--stacked[data-collapsed=false]{overflow:visible}.Toastify__toast--stacked[data-collapsed=true]:not(:last-child)>*{opacity:0}.Toastify__toast--stacked:after{content:"";position:absolute;left:0;right:0;height:calc(var(--g) * 1px);bottom:100%}.Toastify__toast--stacked[data-pos=top]{top:0}.Toastify__toast--stacked[data-pos=bot]{bottom:0}.Toastify__toast--stacked[data-pos=bot].Toastify__toast--stacked:before{transform-origin:top}.Toastify__toast--stacked[data-pos=top].Toastify__toast--stacked:before{transform-origin:bottom}.Toastify__toast--stacked:before{content:"";position:absolute;left:0;right:0;bottom:0;height:100%;transform:scaleY(3);z-index:-1}.Toastify__toast--rtl{direction:rtl}.Toastify__toast--close-on-click{cursor:pointer}.Toastify__toast-icon{margin-inline-end:10px;width:22px;flex-shrink:0;display:flex}.Toastify--animate{animation-fill-mode:both;animation-duration:.5s}.Toastify--animate-icon{animation-fill-mode:both;animation-duration:.3s}.Toastify__toast-theme--dark{background:var(--toastify-color-dark);color:var(--toastify-text-color-dark)}.Toastify__toast-theme--light,.Toastify__toast-theme--colored.Toastify__toast--default{background:var(--toastify-color-light);color:var(--toastify-text-color-light)}.Toastify__toast-theme--colored.Toastify__toast--info{color:var(--toastify-text-color-info);background:var(--toastify-color-info)}.Toastify__toast-theme--colored.Toastify__toast--success{color:var(--toastify-text-color-success);background:var(--toastify-color-success)}.Toastify__toast-theme--colored.Toastify__toast--warning{color:var(--toastify-text-color-warning);background:var(--toastify-color-warning)}.Toastify__toast-theme--colored.Toastify__toast--error{color:var(--toastify-text-color-error);background:var(--toastify-color-error)}.Toastify__progress-bar-theme--light{background:var(--toastify-color-progress-light)}.Toastify__progress-bar-theme--dark{background:var(--toastify-color-progress-dark)}.Toastify__progress-bar--info{background:var(--toastify-color-progress-info)}.Toastify__progress-bar--success{background:var(--toastify-color-progress-success)}.Toastify__progress-bar--warning{background:var(--toastify-color-progress-warning)}.Toastify__progress-bar--error{background:var(--toastify-color-progress-error)}.Toastify__progress-bar-theme--colored.Toastify__progress-bar--info,.Toastify__progress-bar-theme--colored.Toastify__progress-bar--success,.Toastify__progress-bar-theme--colored.Toastify__progress-bar--warning,.Toastify__progress-bar-theme--colored.Toastify__progress-bar--error{background:var(--toastify-color-transparent)}.Toastify__close-button{color:#fff;position:absolute;top:6px;right:6px;background:transparent;outline:none;border:none;padding:0;cursor:pointer;opacity:.7;transition:.3s ease;z-index:1}.Toastify__toast--rtl .Toastify__close-button{left:6px;right:unset}.Toastify__close-button--light{color:#000;opacity:.3}.Toastify__close-button>svg{fill:currentColor;height:16px;width:14px}.Toastify__close-button:hover,.Toastify__close-button:focus{opacity:1}@keyframes Toastify__trackProgress{0%{transform:scaleX(1)}to{transform:scaleX(0)}}.Toastify__progress-bar{position:absolute;bottom:0;left:0;width:100%;height:100%;z-index:1;opacity:.7;transform-origin:left}.Toastify__progress-bar--animated{animation:Toastify__trackProgress linear 1 forwards}.Toastify__progress-bar--controlled{transition:transform .2s}.Toastify__progress-bar--rtl{right:0;left:initial;transform-origin:right;border-bottom-left-radius:initial}.Toastify__progress-bar--wrp{position:absolute;overflow:hidden;bottom:0;left:0;width:100%;height:5px;border-bottom-left-radius:var(--toastify-toast-bd-radius);border-bottom-right-radius:var(--toastify-toast-bd-radius)}.Toastify__progress-bar--wrp[data-hidden=true]{opacity:0}.Toastify__progress-bar--bg{opacity:var(--toastify-color-progress-bgo);width:100%;height:100%}.Toastify__spinner{width:20px;height:20px;box-sizing:border-box;border:2px solid;border-radius:100%;border-color:var(--toastify-spinner-color-empty-area);border-right-color:var(--toastify-spinner-color);animation:Toastify__spin .65s linear infinite}@keyframes Toastify__bounceInRight{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(3000px,0,0)}60%{opacity:1;transform:translate3d(-25px,0,0)}75%{transform:translate3d(10px,0,0)}90%{transform:translate3d(-5px,0,0)}to{transform:none}}@keyframes Toastify__bounceOutRight{20%{opacity:1;transform:translate3d(-20px,var(--y),0)}to{opacity:0;transform:translate3d(2000px,var(--y),0)}}@keyframes Toastify__bounceInLeft{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(-3000px,0,0)}60%{opacity:1;transform:translate3d(25px,0,0)}75%{transform:translate3d(-10px,0,0)}90%{transform:translate3d(5px,0,0)}to{transform:none}}@keyframes Toastify__bounceOutLeft{20%{opacity:1;transform:translate3d(20px,var(--y),0)}to{opacity:0;transform:translate3d(-2000px,var(--y),0)}}@keyframes Toastify__bounceInUp{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(0,3000px,0)}60%{opacity:1;transform:translate3d(0,-20px,0)}75%{transform:translate3d(0,10px,0)}90%{transform:translate3d(0,-5px,0)}to{transform:translateZ(0)}}@keyframes Toastify__bounceOutUp{20%{transform:translate3d(0,calc(var(--y) - 10px),0)}40%,45%{opacity:1;transform:translate3d(0,calc(var(--y) + 20px),0)}to{opacity:0;transform:translate3d(0,-2000px,0)}}@keyframes Toastify__bounceInDown{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(0,-3000px,0)}60%{opacity:1;transform:translate3d(0,25px,0)}75%{transform:translate3d(0,-10px,0)}90%{transform:translate3d(0,5px,0)}to{transform:none}}@keyframes Toastify__bounceOutDown{20%{transform:translate3d(0,calc(var(--y) - 10px),0)}40%,45%{opacity:1;transform:translate3d(0,calc(var(--y) + 20px),0)}to{opacity:0;transform:translate3d(0,2000px,0)}}.Toastify__bounce-enter--top-left,.Toastify__bounce-enter--bottom-left{animation-name:Toastify__bounceInLeft}.Toastify__bounce-enter--top-right,.Toastify__bounce-enter--bottom-right{animation-name:Toastify__bounceInRight}.Toastify__bounce-enter--top-center{animation-name:Toastify__bounceInDown}.Toastify__bounce-enter--bottom-center{animation-name:Toastify__bounceInUp}.Toastify__bounce-exit--top-left,.Toastify__bounce-exit--bottom-left{animation-name:Toastify__bounceOutLeft}.Toastify__bounce-exit--top-right,.Toastify__bounce-exit--bottom-right{animation-name:Toastify__bounceOutRight}.Toastify__bounce-exit--top-center{animation-name:Toastify__bounceOutUp}.Toastify__bounce-exit--bottom-center{animation-name:Toastify__bounceOutDown}@keyframes Toastify__zoomIn{0%{opacity:0;transform:scale3d(.3,.3,.3)}50%{opacity:1}}@keyframes Toastify__zoomOut{0%{opacity:1}50%{opacity:0;transform:translate3d(0,var(--y),0) scale3d(.3,.3,.3)}to{opacity:0}}.Toastify__zoom-enter{animation-name:Toastify__zoomIn}.Toastify__zoom-exit{animation-name:Toastify__zoomOut}@keyframes Toastify__flipIn{0%{transform:perspective(400px) rotateX(90deg);animation-timing-function:ease-in;opacity:0}40%{transform:perspective(400px) rotateX(-20deg);animation-timing-function:ease-in}60%{transform:perspective(400px) rotateX(10deg);opacity:1}80%{transform:perspective(400px) rotateX(-5deg)}to{transform:perspective(400px)}}@keyframes Toastify__flipOut{0%{transform:translate3d(0,var(--y),0) perspective(400px)}30%{transform:translate3d(0,var(--y),0) perspective(400px) rotateX(-20deg);opacity:1}to{transform:translate3d(0,var(--y),0) perspective(400px) rotateX(90deg);opacity:0}}.Toastify__flip-enter{animation-name:Toastify__flipIn}.Toastify__flip-exit{animation-name:Toastify__flipOut}@keyframes Toastify__slideInRight{0%{transform:translate3d(110%,0,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideInLeft{0%{transform:translate3d(-110%,0,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideInUp{0%{transform:translate3d(0,110%,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideInDown{0%{transform:translate3d(0,-110%,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideOutRight{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(110%,var(--y),0)}}@keyframes Toastify__slideOutLeft{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(-110%,var(--y),0)}}@keyframes Toastify__slideOutDown{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(0,500px,0)}}@keyframes Toastify__slideOutUp{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(0,-500px,0)}}.Toastify__slide-enter--top-left,.Toastify__slide-enter--bottom-left{animation-name:Toastify__slideInLeft}.Toastify__slide-enter--top-right,.Toastify__slide-enter--bottom-right{animation-name:Toastify__slideInRight}.Toastify__slide-enter--top-center{animation-name:Toastify__slideInDown}.Toastify__slide-enter--bottom-center{animation-name:Toastify__slideInUp}.Toastify__slide-exit--top-left,.Toastify__slide-exit--bottom-left{animation-name:Toastify__slideOutLeft;animation-timing-function:ease-in;animation-duration:.3s}.Toastify__slide-exit--top-right,.Toastify__slide-exit--bottom-right{animation-name:Toastify__slideOutRight;animation-timing-function:ease-in;animation-duration:.3s}.Toastify__slide-exit--top-center{animation-name:Toastify__slideOutUp;animation-timing-function:ease-in;animation-duration:.3s}.Toastify__slide-exit--bottom-center{animation-name:Toastify__slideOutDown;animation-timing-function:ease-in;animation-duration:.3s}@keyframes Toastify__spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}
`);var Li=e=>typeof e=="number"&&!isNaN(e),Er=e=>typeof e=="string",hn=e=>typeof e=="function",ox=e=>Er(e)||Li(e),Xl=e=>Er(e)||hn(e)?e:null,ax=(e,t)=>e===!1||Li(e)&&e>0?e:t,Gl=e=>b.isValidElement(e)||Er(e)||hn(e)||Li(e);function lx(e,t,n=300){let{scrollHeight:r,style:s}=e;requestAnimationFrame(()=>{s.minHeight="initial",s.height=r+"px",s.transition=`all ${n}ms`,requestAnimationFrame(()=>{s.height="0",s.padding="0",s.margin="0",setTimeout(t,n)})})}function cx({enter:e,exit:t,appendPosition:n=!1,collapse:r=!0,collapseDuration:s=300}){return function({children:i,position:a,preventExitTransition:l,done:c,nodeRef:u,isIn:p,playToast:m}){let y=n?`${e}--${a}`:e,w=n?`${t}--${a}`:t,g=b.useRef(0);return b.useLayoutEffect(()=>{let v=u.current,S=y.split(" "),x=f=>{f.target===u.current&&(m(),v.removeEventListener("animationend",x),v.removeEventListener("animationcancel",x),g.current===0&&f.type!=="animationcancel"&&v.classList.remove(...S))};v.classList.add(...S),v.addEventListener("animationend",x),v.addEventListener("animationcancel",x)},[]),b.useEffect(()=>{let v=u.current,S=()=>{v.removeEventListener("animationend",S),r?lx(v,c,s):c()};p||(l?S():(g.current=1,v.className+=` ${w}`,v.addEventListener("animationend",S)))},[p]),ne.createElement(ne.Fragment,null,i)}}function Jd(e,t){return{content:gm(e.content,e.props),containerId:e.props.containerId,id:e.props.toastId,theme:e.props.theme,type:e.props.type,data:e.props.data||{},isLoading:e.props.isLoading,icon:e.props.icon,reason:e.removalReason,status:t}}function gm(e,t,n=!1){return b.isValidElement(e)&&!Er(e.type)?b.cloneElement(e,{closeToast:t.closeToast,toastProps:t,data:t.data,isPaused:n}):hn(e)?e({closeToast:t.closeToast,toastProps:t,data:t.data,isPaused:n}):e}function ux({closeToast:e,theme:t,ariaLabel:n="close"}){return ne.createElement("button",{className:`Toastify__close-button Toastify__close-button--${t}`,type:"button",onClick:r=>{r.stopPropagation(),e(!0)},"aria-label":n},ne.createElement("svg",{"aria-hidden":"true",viewBox:"0 0 14 16"},ne.createElement("path",{fillRule:"evenodd",d:"M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"})))}function dx({delay:e,isRunning:t,closeToast:n,type:r="default",hide:s,className:i,controlledProgress:a,progress:l,rtl:c,isIn:u,theme:p}){let m=s||a&&l===0,y={animationDuration:`${e}ms`,animationPlayState:t?"running":"paused"};a&&(y.transform=`scaleX(${l})`);let w=vr("Toastify__progress-bar",a?"Toastify__progress-bar--controlled":"Toastify__progress-bar--animated",`Toastify__progress-bar-theme--${p}`,`Toastify__progress-bar--${r}`,{"Toastify__progress-bar--rtl":c}),g=hn(i)?i({rtl:c,type:r,defaultClassName:w}):vr(w,i),v={[a&&l>=1?"onTransitionEnd":"onAnimationEnd"]:a&&l<1?null:()=>{u&&n()}};return ne.createElement("div",{className:"Toastify__progress-bar--wrp","data-hidden":m},ne.createElement("div",{className:`Toastify__progress-bar--bg Toastify__progress-bar-theme--${p} Toastify__progress-bar--${r}`}),ne.createElement("div",{role:"progressbar","aria-hidden":m?"true":"false","aria-label":"notification timer",className:g,style:y,...v}))}var fx=1,ym=()=>`${fx++}`;function px(e,t,n){let r=1,s=0,i=[],a=[],l=t,c=new Map,u=new Set,p=f=>(u.add(f),()=>u.delete(f)),m=()=>{a=Array.from(c.values()),u.forEach(f=>f())},y=({containerId:f,toastId:h,updateId:k})=>{let E=f?f!==e:e!==1,R=c.has(h)&&k==null;return E||R},w=(f,h)=>{c.forEach(k=>{var E;(h==null||h===k.props.toastId)&&((E=k.toggle)==null||E.call(k,f))})},g=f=>{var h,k;(k=(h=f.props)==null?void 0:h.onClose)==null||k.call(h,f.removalReason),f.isActive=!1},v=f=>{if(f==null)c.forEach(g);else{let h=c.get(f);h&&g(h)}m()},S=()=>{s-=i.length,i=[]},x=f=>{var h,k;let{toastId:E,updateId:R}=f.props,T=R==null;f.staleId&&c.delete(f.staleId),f.isActive=!0,c.set(E,f),m(),n(Jd(f,T?"added":"updated")),T&&((k=(h=f.props).onOpen)==null||k.call(h))};return{id:e,props:l,observe:p,toggle:w,removeToast:v,toasts:c,clearQueue:S,buildToast:(f,h)=>{if(y(h))return;let{toastId:k,updateId:E,data:R,staleId:T,delay:N}=h,C=E==null;C&&s++;let P={...l,style:l.toastStyle,key:r++,...Object.fromEntries(Object.entries(h).filter(([J,re])=>re!=null)),toastId:k,updateId:E,data:R,isIn:!1,className:Xl(h.className||l.toastClassName),progressClassName:Xl(h.progressClassName||l.progressClassName),autoClose:h.isLoading?!1:ax(h.autoClose,l.autoClose),closeToast(J){c.get(k).removalReason=J,v(k)},deleteToast(){let J=c.get(k);if(J!=null){if(n(Jd(J,"removed")),c.delete(k),s--,s<0&&(s=0),i.length>0){x(i.shift());return}m()}}};P.closeButton=l.closeButton,h.closeButton===!1||Gl(h.closeButton)?P.closeButton=h.closeButton:h.closeButton===!0&&(P.closeButton=Gl(l.closeButton)?l.closeButton:!0);let U={content:f,props:P,staleId:T};l.limit&&l.limit>0&&s>l.limit&&C?i.push(U):Li(N)?setTimeout(()=>{x(U)},N):x(U)},setProps(f){l=f},setToggle:(f,h)=>{let k=c.get(f);k&&(k.toggle=h)},isToastActive:f=>{var h;return(h=c.get(f))==null?void 0:h.isActive},getSnapshot:()=>a}}var Ke=new Map,bi=[],Zl=new Set,hx=e=>Zl.forEach(t=>t(e)),xm=()=>Ke.size>0;function mx(){bi.forEach(e=>bm(e.content,e.options)),bi=[]}var gx=(e,{containerId:t})=>{var n;return(n=Ke.get(t||1))==null?void 0:n.toasts.get(e)};function vm(e,t){var n;if(t)return!!((n=Ke.get(t))!=null&&n.isToastActive(e));let r=!1;return Ke.forEach(s=>{s.isToastActive(e)&&(r=!0)}),r}function yx(e){if(!xm()){bi=bi.filter(t=>e!=null&&t.options.toastId!==e);return}if(e==null||ox(e))Ke.forEach(t=>{t.removeToast(e)});else if(e&&("containerId"in e||"id"in e)){let t=Ke.get(e.containerId);t?t.removeToast(e.id):Ke.forEach(n=>{n.removeToast(e.id)})}}var xx=(e={})=>{Ke.forEach(t=>{t.props.limit&&(!e.containerId||t.id===e.containerId)&&t.clearQueue()})};function bm(e,t){Gl(e)&&(xm()||bi.push({content:e,options:t}),Ke.forEach(n=>{n.buildToast(e,t)}))}function vx(e){var t;(t=Ke.get(e.containerId||1))==null||t.setToggle(e.id,e.fn)}function wm(e,t){Ke.forEach(n=>{(t==null||!(t!=null&&t.containerId)||(t==null?void 0:t.containerId)===n.id)&&n.toggle(e,t==null?void 0:t.id)})}function bx(e){let t=e.containerId||1;return{subscribe(n){let r=px(t,e,hx);Ke.set(t,r);let s=r.observe(n);return mx(),()=>{s(),Ke.delete(t)}},setProps(n){var r;(r=Ke.get(t))==null||r.setProps(n)},getSnapshot(){var n;return(n=Ke.get(t))==null?void 0:n.getSnapshot()}}}function wx(e){return Zl.add(e),()=>{Zl.delete(e)}}function kx(e){return e&&(Er(e.toastId)||Li(e.toastId))?e.toastId:ym()}function Oi(e,t){return bm(e,t),t.toastId}function ma(e,t){return{...t,type:t&&t.type||e,toastId:kx(t)}}function ga(e){return(t,n)=>Oi(t,ma(e,n))}function $(e,t){return Oi(e,ma("default",t))}$.loading=(e,t)=>Oi(e,ma("default",{isLoading:!0,autoClose:!1,closeOnClick:!1,closeButton:!1,draggable:!1,...t}));function Sx(e,{pending:t,error:n,success:r},s){let i;t&&(i=Er(t)?$.loading(t,s):$.loading(t.render,{...s,...t}));let a={isLoading:null,autoClose:null,closeOnClick:null,closeButton:null,draggable:null},l=(u,p,m)=>{if(p==null){$.dismiss(i);return}let y={type:u,...a,...s,data:m},w=Er(p)?{render:p}:p;return i?$.update(i,{...y,...w}):$(w.render,{...y,...w}),m},c=hn(e)?e():e;return c.then(u=>l("success",r,u)).catch(u=>l("error",n,u)),c}$.promise=Sx;$.success=ga("success");$.info=ga("info");$.error=ga("error");$.warning=ga("warning");$.warn=$.warning;$.dark=(e,t)=>Oi(e,ma("default",{theme:"dark",...t}));function jx(e){yx(e)}$.dismiss=jx;$.clearWaitingQueue=xx;$.isActive=vm;$.update=(e,t={})=>{let n=gx(e,t);if(n){let{props:r,content:s}=n,i={delay:100,...r,...t,toastId:t.toastId||e,updateId:ym()};i.toastId!==e&&(i.staleId=e);let a=i.render||s;delete i.render,Oi(a,i)}};$.done=e=>{$.update(e,{progress:1})};$.onChange=wx;$.play=e=>wm(!0,e);$.pause=e=>wm(!1,e);function Cx(e){var t;let{subscribe:n,getSnapshot:r,setProps:s}=b.useRef(bx(e)).current;s(e);let i=(t=b.useSyncExternalStore(n,r,r))==null?void 0:t.slice();function a(l){if(!i)return[];let c=new Map;return e.newestOnTop&&i.reverse(),i.forEach(u=>{let{position:p}=u.props;c.has(p)||c.set(p,[]),c.get(p).push(u)}),Array.from(c,u=>l(u[0],u[1]))}return{getToastToRender:a,isToastActive:vm,count:i==null?void 0:i.length}}function Ex(e){let[t,n]=b.useState(!1),[r,s]=b.useState(!1),i=b.useRef(null),a=b.useRef({start:0,delta:0,removalDistance:0,canCloseOnClick:!0,canDrag:!1,didMove:!1}).current,{autoClose:l,pauseOnHover:c,closeToast:u,onClick:p,closeOnClick:m}=e;vx({id:e.toastId,containerId:e.containerId,fn:n}),b.useEffect(()=>{if(e.pauseOnFocusLoss)return y(),()=>{w()}},[e.pauseOnFocusLoss]);function y(){document.hasFocus()||x(),window.addEventListener("focus",S),window.addEventListener("blur",x)}function w(){window.removeEventListener("focus",S),window.removeEventListener("blur",x)}function g(T){if(e.draggable===!0||e.draggable===T.pointerType){f();let N=i.current;a.canCloseOnClick=!0,a.canDrag=!0,N.style.transition="none",e.draggableDirection==="x"?(a.start=T.clientX,a.removalDistance=N.offsetWidth*(e.draggablePercent/100)):(a.start=T.clientY,a.removalDistance=N.offsetHeight*(e.draggablePercent===80?e.draggablePercent*1.5:e.draggablePercent)/100)}}function v(T){let{top:N,bottom:C,left:P,right:U}=i.current.getBoundingClientRect();T.nativeEvent.type!=="touchend"&&e.pauseOnHover&&T.clientX>=P&&T.clientX<=U&&T.clientY>=N&&T.clientY<=C?x():S()}function S(){n(!0)}function x(){n(!1)}function f(){a.didMove=!1,document.addEventListener("pointermove",k),document.addEventListener("pointerup",E)}function h(){document.removeEventListener("pointermove",k),document.removeEventListener("pointerup",E)}function k(T){let N=i.current;if(a.canDrag&&N){a.didMove=!0,t&&x(),e.draggableDirection==="x"?a.delta=T.clientX-a.start:a.delta=T.clientY-a.start,a.start!==T.clientX&&(a.canCloseOnClick=!1);let C=e.draggableDirection==="x"?`${a.delta}px, var(--y)`:`0, calc(${a.delta}px + var(--y))`;N.style.transform=`translate3d(${C},0)`,N.style.opacity=`${1-Math.abs(a.delta/a.removalDistance)}`}}function E(){h();let T=i.current;if(a.canDrag&&a.didMove&&T){if(a.canDrag=!1,Math.abs(a.delta)>a.removalDistance){s(!0),e.closeToast(!0),e.collapseAll();return}T.style.transition="transform 0.2s, opacity 0.2s",T.style.removeProperty("transform"),T.style.removeProperty("opacity")}}let R={onPointerDown:g,onPointerUp:v};return l&&c&&(R.onMouseEnter=x,e.stacked||(R.onMouseLeave=S)),m&&(R.onClick=T=>{p&&p(T),a.canCloseOnClick&&u(!0)}),{playToast:S,pauseToast:x,isRunning:t,preventExitTransition:r,toastRef:i,eventHandlers:R}}var Tx=typeof window<"u"?b.useLayoutEffect:b.useEffect,ya=({theme:e,type:t,isLoading:n,...r})=>ne.createElement("svg",{viewBox:"0 0 24 24",width:"100%",height:"100%",fill:e==="colored"?"currentColor":`var(--toastify-icon-color-${t})`,...r});function _x(e){return ne.createElement(ya,{...e},ne.createElement("path",{d:"M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"}))}function Nx(e){return ne.createElement(ya,{...e},ne.createElement("path",{d:"M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"}))}function Rx(e){return ne.createElement(ya,{...e},ne.createElement("path",{d:"M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"}))}function Px(e){return ne.createElement(ya,{...e},ne.createElement("path",{d:"M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"}))}function zx(){return ne.createElement("div",{className:"Toastify__spinner"})}var ec={info:Nx,warning:_x,success:Rx,error:Px,spinner:zx},Lx=e=>e in ec;function Ox({theme:e,type:t,isLoading:n,icon:r}){let s=null,i={theme:e,type:t};return r===!1||(hn(r)?s=r({...i,isLoading:n}):b.isValidElement(r)?s=b.cloneElement(r,i):n?s=ec.spinner():Lx(t)&&(s=ec[t](i))),s}var Ix=e=>{let{isRunning:t,preventExitTransition:n,toastRef:r,eventHandlers:s,playToast:i}=Ex(e),{closeButton:a,children:l,autoClose:c,onClick:u,type:p,hideProgressBar:m,closeToast:y,transition:w,position:g,className:v,style:S,progressClassName:x,updateId:f,role:h,progress:k,rtl:E,toastId:R,deleteToast:T,isIn:N,isLoading:C,closeOnClick:P,theme:U,ariaLabel:J}=e,re=vr("Toastify__toast",`Toastify__toast-theme--${U}`,`Toastify__toast--${p}`,{"Toastify__toast--rtl":E},{"Toastify__toast--close-on-click":P}),xe=hn(v)?v({rtl:E,position:g,type:p,defaultClassName:re}):vr(re,v),ve=Ox(e),se=!!k||!c,me={closeToast:y,type:p,theme:U},O=null;return a===!1||(hn(a)?O=a(me):b.isValidElement(a)?O=b.cloneElement(a,me):O=ux(me)),ne.createElement(w,{isIn:N,done:T,position:g,preventExitTransition:n,nodeRef:r,playToast:i},ne.createElement("div",{id:R,tabIndex:0,onClick:u,"data-in":N,className:xe,...s,style:S,ref:r,...N&&{role:h,"aria-label":J}},ve!=null&&ne.createElement("div",{className:vr("Toastify__toast-icon",{"Toastify--animate-icon Toastify__zoom-enter":!C})},ve),gm(l,e,!t),O,!e.customProgressBar&&ne.createElement(dx,{...f&&!se?{key:`p-${f}`}:{},rtl:E,theme:U,delay:c,isRunning:t,isIn:N,closeToast:y,hide:m,type:p,className:x,controlledProgress:se,progress:k||0})))},Ax=(e,t=!1)=>({enter:`Toastify--animate Toastify__${e}-enter`,exit:`Toastify--animate Toastify__${e}-exit`,appendPosition:t}),Mx=cx(Ax("bounce",!0)),Fx={position:"top-right",transition:Mx,autoClose:5e3,closeButton:!0,pauseOnHover:!0,pauseOnFocusLoss:!0,draggable:"touch",draggablePercent:80,draggableDirection:"x",role:"alert",theme:"light","aria-label":"Notifications Alt+T",hotKeys:e=>e.altKey&&e.code==="KeyT"};function bu(e){let t={...Fx,...e},n=e.stacked,[r,s]=b.useState(!0),i=b.useRef(null),{getToastToRender:a,isToastActive:l,count:c}=Cx(t),{className:u,style:p,rtl:m,containerId:y,hotKeys:w}=t;function g(S){let x=vr("Toastify__toast-container",`Toastify__toast-container--${S}`,{"Toastify__toast-container--rtl":m});return hn(u)?u({position:S,rtl:m,defaultClassName:x}):vr(x,Xl(u))}function v(){n&&(s(!0),$.play())}return Tx(()=>{var S;if(n){let x=i.current.querySelectorAll('[data-in="true"]'),f=12,h=(S=t.position)==null?void 0:S.includes("top"),k=0,E=0;Array.from(x).reverse().forEach((R,T)=>{let N=R;N.classList.add("Toastify__toast--stacked"),T>0&&(N.dataset.collapsed=`${r}`),N.dataset.pos||(N.dataset.pos=h?"top":"bot");let C=k*(r?.2:1)+(r?0:f*T);N.style.setProperty("--y",`${h?C:C*-1}px`),N.style.setProperty("--g",`${f}`),N.style.setProperty("--s",`${1-(r?E:0)}`),k+=N.offsetHeight,E+=.025})}},[r,c,n]),b.useEffect(()=>{function S(x){var f;let h=i.current;w(x)&&((f=h.querySelector('[tabIndex="0"]'))==null||f.focus(),s(!1),$.pause()),x.key==="Escape"&&(document.activeElement===h||h!=null&&h.contains(document.activeElement))&&(s(!0),$.play())}return document.addEventListener("keydown",S),()=>{document.removeEventListener("keydown",S)}},[w]),ne.createElement("section",{ref:i,className:"Toastify",id:y,onMouseEnter:()=>{n&&(s(!1),$.pause())},onMouseLeave:v,"aria-live":"polite","aria-atomic":"false","aria-relevant":"additions text","aria-label":t["aria-label"]},a((S,x)=>{let f=x.length?{...p}:{...p,pointerEvents:"none"};return ne.createElement("div",{tabIndex:-1,className:g(S),"data-stacked":n,style:f,key:`c-${S}`},x.map(({content:h,props:k})=>ne.createElement(Ix,{...k,stacked:n,collapseAll:v,isIn:l(k.toastId,k.containerId),key:`t-${k.key}`},h)))}))}const Dx=()=>{const{token:e}=gt(),t=zr();b.useEffect(()=>{e&&t("/dashboard")},[e,t]);const[n,r]=b.useState(""),[s,i]=b.useState(""),[a,l]=b.useState("contractor"),[c,u]=b.useState(""),[p,m]=b.useState(!1),y=async w=>{var S,x;w.preventDefault(),u(""),m(!1);const g=/^[^@\s]+@[^@\s]+\.[^@\s]+$/,v=/^[1-9][0-9]{9,14}$/;if(!n){u("Please provide your email or mobile number.");return}if(!g.test(n)&&!v.test(n)){u("Please enter a valid email or mobile number.");return}try{let f={username:n,password:s,role:a};console.log("Register payload:",f);const h=await xr(`${Ft.AUTH_SERVICE}/signup`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(f)}),k=await h.json();if(h.ok)m(!0),$.success("Registration successful! Redirecting to login...",{position:"top-right",autoClose:3e3}),setTimeout(()=>m(!1),3e3);else{const E=(S=k.error)==null?void 0:S.code,R=((x=k.error)==null?void 0:x.message)||k.message||"Registration failed";E==="EMAIL_TAKEN"?(u("This email is already registered. Please use a different email or login."),$.error("This email is already registered!",{position:"top-right",autoClose:5e3})):E==="PHONE_TAKEN"?(u("This phone number is already registered. Please use a different phone number or login."),$.error("This phone number is already registered!",{position:"top-right",autoClose:5e3})):E==="USERNAME_TAKEN"?(u(R),$.error(R,{position:"top-right",autoClose:5e3})):E==="DUPLICATE_USER"?(u("This email or phone number is already registered."),$.error("This email or phone number is already registered!",{position:"top-right",autoClose:5e3})):(u(R),$.error(R,{position:"top-right",autoClose:5e3}))}}catch{u("Network error"),$.error("Network error. Please check your connection and try again.",{position:"top-right",autoClose:5e3})}};return o.jsxs(o.Fragment,{children:[o.jsx(bu,{}),o.jsx("style",{children:`
        .register-split-bg {
          min-height: 100vh;
          display: flex;
          flex-direction: row;
          background: #f7f4e9;
        }
        .register-left {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem;
        }
        .register-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #a7c957 60%, #f7f4e9 100%);
          color: #3e2723;
          padding: 2rem;
        }
        .register-form {
          width: 100%;
          max-width: 420px;
          min-width: 320px;
          padding: 2.5rem 2.5rem 2rem 2.5rem;
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 4px 32px rgba(0,0,0,0.10);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .register-form h2 {
          text-align: center;
          margin-bottom: 1rem;
          color: #43a047;
          font-size: 2rem;
          font-weight: 700;
        }
        .register-form input, .register-form select {
          padding: 1.1rem;
          border-radius: 14px;
          border: 1.5px solid #b2b2b2;
          font-size: 1.13rem;
          background: #f7f9fc;
          box-shadow: 0 2px 8px rgba(67,160,71,0.06);
          margin-bottom: 0.5rem;
          transition: border 0.2s, box-shadow 0.2s;
        }
        .register-form input:focus, .register-form select:focus {
          outline: none;
          border: 1.5px solid #43a047;
          box-shadow: 0 0 0 2px #a7c95744;
          background: #f0fff0;
        }
        .register-form select {
          background: #f7f9fc;
        }
        .register-form button {
          padding: 1.1rem;
          border-radius: 14px;
          border: none;
          background: linear-gradient(90deg, #43a047 60%, #a7c957 100%);
          color: #fff;
          font-size: 1.13rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 2px 12px rgba(67,160,71,0.13);
          transition: background 0.2s, transform 0.1s;
        }
        .register-form button:hover {
          background: linear-gradient(90deg, #2e7031 60%, #a7c957 100%);
          transform: translateY(-2px) scale(1.03);
        }
        .register-form .error {
          color: red;
          text-align: center;
          font-weight: 500;
        }
        .register-form .success {
          color: green;
          text-align: center;
          font-weight: 500;
        }
        .divider {
          display: flex;
          align-items: center;
          text-align: center;
          margin: 0.5rem 0;
        }
        .divider::before,
        .divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid #ddd;
        }
        .divider span {
          padding: 0 1rem;
          color: #666;
          font-size: 0.9rem;
          font-weight: 600;
        }
        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 1rem;
          border-radius: 14px;
          border: 1.5px solid #ddd;
          background: #fff;
          color: #333;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        .social-btn:hover {
          border-color: #bbb;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transform: translateY(-1px);
        }
        .google-btn:hover {
          background: #f8f9fa;
        }
        .facebook-btn:hover {
          background: #f0f5ff;
        }
        .twitter-btn:hover {
          background: #f5f5f5;
        }
        @media (max-width: 900px) {
          .register-split-bg {
            flex-direction: column;
          }
          .register-right {
            min-height: 180px;
            padding: 1rem;
          }
        }
        @media (max-width: 600px) {
          .register-form {
            max-width: 100vw;
            min-width: 0;
            padding: 1.2rem 0.5rem 1rem 0.5rem;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          }
          .register-form h2 {
            font-size: 1.4rem;
          }
          .register-form input, .register-form select, .register-form button {
            font-size: 1rem;
            padding: 0.7rem;
            border-radius: 7px;
          }
        }
      `}),o.jsxs("div",{className:"register-split-bg",children:[o.jsx("div",{className:"register-left",children:o.jsxs("form",{className:"register-form",onSubmit:y,children:[o.jsx("h2",{children:"Register"}),o.jsx("input",{type:"text",placeholder:"Email or Mobile Number",value:n,onChange:w=>r(w.target.value),required:!0}),o.jsx("input",{type:"password",placeholder:"Password",value:s,onChange:w=>i(w.target.value),required:!0}),o.jsxs("select",{value:a,onChange:w=>l(w.target.value),required:!0,children:[o.jsx("option",{value:"contractor",children:"Contractor"}),o.jsx("option",{value:"worker",children:"Worker"})]}),o.jsx("button",{type:"submit",children:"Register"}),o.jsx("div",{className:"divider",children:o.jsx("span",{children:"OR"})}),o.jsxs("button",{type:"button",className:"social-btn google-btn",onClick:()=>window.location.href="http://localhost:3001/api/auth/google",children:[o.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 18 18",xmlns:"http://www.w3.org/2000/svg",children:[o.jsx("path",{d:"M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z",fill:"#4285F4"}),o.jsx("path",{d:"M9.003 18c2.43 0 4.467-.806 5.956-2.18L12.05 13.56c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z",fill:"#34A853"}),o.jsx("path",{d:"M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z",fill:"#FBBC05"}),o.jsx("path",{d:"M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.426 0 9.003 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z",fill:"#EA4335"})]}),"Continue with Google"]}),o.jsxs("button",{type:"button",className:"social-btn facebook-btn",onClick:()=>window.location.href="http://localhost:3001/api/auth/facebook",children:[o.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"#1877F2",xmlns:"http://www.w3.org/2000/svg",children:o.jsx("path",{d:"M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"})}),"Continue with Facebook"]}),o.jsxs("button",{type:"button",className:"social-btn twitter-btn",onClick:()=>window.location.href="http://localhost:3001/api/auth/twitter",children:[o.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg",children:o.jsx("path",{d:"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"})}),"Continue with X"]}),p&&o.jsxs("div",{className:"success-bar",children:["Registration successful!",o.jsx("button",{className:"close-btn",onClick:()=>m(!1),children:"×"})]}),c&&o.jsx("div",{className:"error",children:c}),o.jsx("style",{children:`
        .success-bar {
          background: #43a047;
          color: #fff;
          padding: 0.8rem 1.2rem;
          border-radius: 8px;
          font-weight: 600;
          text-align: center;
          margin-bottom: 1rem;
          position: relative;
          box-shadow: 0 2px 8px rgba(67,160,71,0.12);
          animation: fadeIn 0.3s;
        }
        .close-btn {
          background: none;
          border: none;
          color: #fff;
          font-size: 1.2rem;
          position: absolute;
          right: 12px;
          top: 8px;
          cursor: pointer;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `})]})}),o.jsxs("div",{className:"register-right",children:[o.jsx("h2",{style:{color:"#6d4c41"},children:"Connecting People. Creating Success."}),o.jsx("p",{style:{maxWidth:"340px",fontSize:"1.1rem",marginTop:"1rem",color:"#3e2723"},children:"Welcome! Our platform helps rural helpers and masons find work and connect with contractors. Simple, secure, and made for you."}),o.jsx("img",{src:"https://images.pexels.com/photos/34003193/pexels-photo-34003193.jpeg",alt:"Rural workers with wheelbarrow",style:{width:"90%",maxWidth:"320px",borderRadius:"12px",marginTop:"1.5rem",boxShadow:"0 2px 12px rgba(0,0,0,0.12)"}}),o.jsx("img",{src:"https://images.pexels.com/photos/4509092/pexels-photo-4509092.jpeg",alt:"Mason laying bricks in rural area",style:{width:"90%",maxWidth:"320px",borderRadius:"12px",marginTop:"1.5rem",boxShadow:"0 2px 12px rgba(0,0,0,0.12)"}})]})]})]})},$x=()=>{const[e,t]=b.useState(""),[n,r]=b.useState(!1),[s,i]=b.useState(""),[a,l]=b.useState(!1),c=async u=>{u.preventDefault(),i(""),l(!0);try{(await fetch(`${Ft.AUTH_SERVICE}/forgot-password`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e})})).ok?r(!0):i("Failed to send reset link. Please try again.")}catch{i("Network error. Please try again.")}finally{l(!1)}};return o.jsx("div",{className:"forgot-password-bg",style:{minHeight:"100vh",display:"flex",justifyContent:"center",alignItems:"center",background:"#f5f7fa"},children:o.jsxs("form",{className:"forgot-password-form",onSubmit:c,style:{background:"#fff",padding:"2.5rem",borderRadius:"16px",boxShadow:"0 4px 32px rgba(0,0,0,0.10)",maxWidth:"420px",width:"100%"},children:[o.jsx("h2",{style:{textAlign:"center",color:"#1976d2",fontWeight:700},children:"Forgot Password"}),n?o.jsx("div",{style:{color:"#43a047",textAlign:"center",margin:"1rem 0"},children:"If an account exists for this email, a reset link has been sent."}):o.jsxs(o.Fragment,{children:[o.jsx("label",{htmlFor:"forgot-email",style:{display:"none"},children:"Email"}),o.jsx("input",{id:"forgot-email",type:"email",placeholder:"Enter your email",value:e,onChange:u=>t(u.target.value),required:!0,style:{padding:"1rem",borderRadius:"10px",border:"1px solid #bbb",fontSize:"1.1rem",background:"#f7f9fc",width:"100%",marginBottom:"1rem"},autoComplete:"email"}),o.jsx("button",{type:"submit",disabled:a,style:{padding:"1rem",borderRadius:"10px",border:"none",background:"#1976d2",color:"#fff",fontWeight:700,fontSize:"1.1rem",width:"100%",cursor:"pointer"},children:a?"Sending...":"Send Reset Link"}),s&&o.jsx("div",{style:{color:"red",textAlign:"center",marginTop:"1rem"},children:s})]})]})})},Bx=()=>{const{token:e}=b1(),t=zr(),[n,r]=b.useState(""),[s,i]=b.useState(""),[a,l]=b.useState(!1),[c,u]=b.useState(""),[p,m]=b.useState(!1),[y,w]=b.useState(!0),[g,v]=b.useState(!1);b.useEffect(()=>{(async()=>{if(!e){u("Invalid reset link"),w(!1);return}try{const h=await(await fetch(`${Ft.AUTH_SERVICE}/validate-reset-token/${e}`)).json();h.success&&h.valid?v(!0):u(h.message||"This password reset link is invalid or has expired")}catch{u("Failed to validate reset link")}finally{w(!1)}})()},[e]);const S=async x=>{if(x.preventDefault(),u(""),n.length<6){u("Password must be at least 6 characters long");return}if(n!==s){u("Passwords do not match");return}l(!0);try{const h=await(await fetch(`${Ft.AUTH_SERVICE}/reset-password`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:e,newPassword:n})})).json();h.success?(m(!0),setTimeout(()=>{t("/login")},3e3)):u(h.message||"Failed to reset password")}catch{u("Network error. Please try again.")}finally{l(!1)}};return y?o.jsx("div",{className:"min-h-screen flex items-center justify-center bg-gray-50",children:o.jsxs("div",{className:"text-center",children:[o.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"}),o.jsx("p",{className:"mt-4 text-gray-600",children:"Validating reset link..."})]})}):g?p?o.jsx("div",{className:"min-h-screen flex items-center justify-center bg-gray-50",children:o.jsx("div",{className:"max-w-md w-full bg-white rounded-lg shadow-md p-8",children:o.jsxs("div",{className:"text-center",children:[o.jsx("svg",{className:"mx-auto h-12 w-12 text-green-500",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:o.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 13l4 4L19 7"})}),o.jsx("h2",{className:"mt-4 text-2xl font-bold text-gray-900",children:"Password Reset Successful!"}),o.jsx("p",{className:"mt-2 text-gray-600",children:"Your password has been successfully reset. Redirecting to login..."})]})})}):o.jsx("div",{className:"min-h-screen flex items-center justify-center bg-gray-50",children:o.jsxs("div",{className:"max-w-md w-full bg-white rounded-lg shadow-md p-8",children:[o.jsxs("div",{className:"text-center mb-8",children:[o.jsx("h2",{className:"text-3xl font-bold text-gray-900",children:"Reset Your Password"}),o.jsx("p",{className:"mt-2 text-gray-600",children:"Enter your new password below"})]}),o.jsxs("form",{onSubmit:S,className:"space-y-6",children:[c&&o.jsx("div",{className:"bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md",children:c}),o.jsxs("div",{children:[o.jsx("label",{htmlFor:"password",className:"block text-sm font-medium text-gray-700 mb-2",children:"New Password"}),o.jsx("input",{id:"password",type:"password",value:n,onChange:x=>r(x.target.value),required:!0,className:"w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent",placeholder:"Enter new password",minLength:6}),o.jsx("p",{className:"mt-1 text-xs text-gray-500",children:"Minimum 6 characters"})]}),o.jsxs("div",{children:[o.jsx("label",{htmlFor:"confirmPassword",className:"block text-sm font-medium text-gray-700 mb-2",children:"Confirm Password"}),o.jsx("input",{id:"confirmPassword",type:"password",value:s,onChange:x=>i(x.target.value),required:!0,className:"w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent",placeholder:"Confirm new password",minLength:6})]}),o.jsx("button",{type:"submit",disabled:a,className:"w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",children:a?"Resetting Password...":"Reset Password"})]}),o.jsx("div",{className:"mt-6 text-center",children:o.jsx(ke,{to:"/login",className:"text-sm text-blue-600 hover:text-blue-700",children:"Back to Login"})})]})}):o.jsx("div",{className:"min-h-screen flex items-center justify-center bg-gray-50",children:o.jsx("div",{className:"max-w-md w-full bg-white rounded-lg shadow-md p-8",children:o.jsxs("div",{className:"text-center",children:[o.jsx("svg",{className:"mx-auto h-12 w-12 text-red-500",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:o.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})}),o.jsx("h2",{className:"mt-4 text-2xl font-bold text-gray-900",children:"Invalid Reset Link"}),o.jsx("p",{className:"mt-2 text-gray-600",children:c}),o.jsx(ke,{to:"/forgot-password",className:"mt-6 inline-block text-blue-600 hover:text-blue-700 font-medium",children:"Request a new reset link"})]})})})},Ux=()=>{const[e]=Y1(),t=zr(),{login:n}=gt(),[r,s]=b.useState("");return b.useEffect(()=>{(async()=>{const a=e.get("access_token"),l=e.get("refresh_token"),c=e.get("user_id"),u=e.get("error");if(u){s(`OAuth authentication failed: ${u}`),setTimeout(()=>t("/register"),3e3);return}if(!a||!l||!c){s("Missing authentication tokens. Please try again."),setTimeout(()=>t("/register"),3e3);return}try{localStorage.setItem("refreshToken",l),n(a,{id:c}),t("/dashboard")}catch(p){console.error("OAuth callback error:",p),s("Failed to complete authentication. Please try again."),setTimeout(()=>t("/register"),3e3)}})()},[e,t,n]),o.jsx("div",{style:{minHeight:"100vh",display:"flex",justifyContent:"center",alignItems:"center",background:"#f7f4e9",padding:"2rem"},children:o.jsxs("div",{style:{background:"#fff",padding:"3rem",borderRadius:"16px",boxShadow:"0 4px 32px rgba(0,0,0,0.1)",textAlign:"center",maxWidth:"500px"},children:[r?o.jsxs(o.Fragment,{children:[o.jsx("div",{style:{fontSize:"3rem",color:"#d32f2f",marginBottom:"1rem"},children:"❌"}),o.jsx("h2",{style:{color:"#d32f2f",marginBottom:"1rem"},children:"Authentication Failed"}),o.jsx("p",{style:{color:"#666",marginBottom:"1.5rem"},children:r}),o.jsx("p",{style:{color:"#999",fontSize:"0.9rem"},children:"Redirecting to registration page..."})]}):o.jsxs(o.Fragment,{children:[o.jsx("div",{style:{width:"60px",height:"60px",border:"4px solid #43a047",borderTop:"4px solid transparent",borderRadius:"50%",animation:"spin 1s linear infinite",margin:"0 auto 1.5rem"}}),o.jsx("h2",{style:{color:"#43a047",marginBottom:"1rem"},children:"Completing Sign In..."}),o.jsx("p",{style:{color:"#666"},children:"Please wait while we set up your account."})]}),o.jsx("style",{children:`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `})]})})},km=b.createContext(void 0),wu=()=>{const e=b.useContext(km);if(!e)throw new Error("useToast must be used within a ToastProvider");return e},Wx=({children:e})=>{const[t,n]=b.useState([]),r=b.useCallback(u=>{const p=Math.random().toString(36).substr(2,9),m={...u,id:p};n(y=>[...y,m]),setTimeout(()=>{s(p)},u.duration||5e3)},[]),s=b.useCallback(u=>{n(p=>p.filter(m=>m.id!==u))},[]),i=b.useCallback((u,p)=>{r({type:"success",title:u,message:p})},[r]),a=b.useCallback((u,p)=>{r({type:"error",title:u,message:p,duration:7e3})},[r]),l=b.useCallback((u,p)=>{r({type:"warning",title:u,message:p})},[r]),c=b.useCallback((u,p)=>{r({type:"info",title:u,message:p})},[r]);return o.jsx(km.Provider,{value:{toasts:t,addToast:r,removeToast:s,success:i,error:a,warning:l,info:c},children:e})},d={colors:{primary:{50:"#eff6ff",100:"#dbeafe",400:"#60a5fa",500:"#3b82f6",600:"#1976d2",700:"#1565c0",800:"#1e40af"},success:{50:"#f0fdf4",100:"#dcfce7",500:"#10b981",600:"#059669",700:"#047857",800:"#065f46"},warning:{50:"#fffbeb",400:"#fbbf24",500:"#f59e0b",800:"#92400e"},danger:{50:"#fef2f2",500:"#ef4444",600:"#dc2626",800:"#991b1b"},neutral:{50:"#f9fafb",100:"#f3f4f6",200:"#e5e7eb",300:"#d1d5db",400:"#9ca3af",500:"#6b7280",600:"#4b5563",700:"#374151",900:"#111827"}},spacing:{xs:"0.25rem",sm:"0.5rem",md:"1rem",lg:"1.5rem",xl:"2rem","2xl":"3rem"},borderRadius:{sm:"4px",md:"8px",lg:"12px",full:"9999px"},shadows:{sm:"0 1px 2px 0 rgba(0, 0, 0, 0.05)",md:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",lg:"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"},typography:{fontSize:{xs:"0.75rem",sm:"0.875rem",base:"1rem",lg:"1.125rem",xl:"1.25rem","2xl":"1.5rem","3xl":"1.875rem","4xl":"2.25rem"},fontWeight:{medium:500,semibold:600,bold:700}}},Ot=({width:e="100%",height:t="1rem",borderRadius:n=d.borderRadius.sm,className:r=""})=>{const s={display:"inline-block",width:e,height:t,borderRadius:n,backgroundColor:d.colors.neutral[200],position:"relative",overflow:"hidden",animation:"skeleton-loading 1.5s ease-in-out infinite"};return o.jsxs(o.Fragment,{children:[o.jsx("style",{children:`
          @keyframes skeleton-loading {
            0% {
              background-color: ${d.colors.neutral[200]};
            }
            50% {
              background-color: ${d.colors.neutral[300]};
            }
            100% {
              background-color: ${d.colors.neutral[200]};
            }
          }
        `}),o.jsx("div",{className:r,style:s})]})},tc=()=>o.jsxs("div",{style:{padding:d.spacing.lg,border:`1px solid ${d.colors.neutral[200]}`,borderRadius:d.borderRadius.lg,backgroundColor:"white",boxShadow:d.shadows.sm},children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:d.spacing.md,marginBottom:d.spacing.md},children:[o.jsx(Ot,{width:"48px",height:"48px",borderRadius:"50%"}),o.jsxs("div",{style:{flex:1},children:[o.jsx(Ot,{width:"60%",height:"1.25rem"}),o.jsx("div",{style:{marginTop:d.spacing.xs},children:o.jsx(Ot,{width:"40%",height:"1rem"})})]})]}),o.jsx("div",{style:{marginBottom:d.spacing.sm},children:o.jsx(Ot,{width:"100%",height:"1rem"})}),o.jsx("div",{style:{marginBottom:d.spacing.sm},children:o.jsx(Ot,{width:"80%",height:"1rem"})}),o.jsxs("div",{style:{display:"flex",gap:d.spacing.sm,marginTop:d.spacing.md},children:[o.jsx(Ot,{width:"80px",height:"32px",borderRadius:d.borderRadius.sm}),o.jsx(Ot,{width:"80px",height:"32px",borderRadius:d.borderRadius.sm})]})]}),Hx=()=>o.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))",gap:d.spacing.lg},children:Array.from({length:4}).map((e,t)=>o.jsxs("div",{style:{padding:d.spacing.lg,border:`1px solid ${d.colors.neutral[200]}`,borderRadius:d.borderRadius.lg,backgroundColor:"white",boxShadow:d.shadows.sm},children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:d.spacing.md},children:[o.jsx(Ot,{width:"60%",height:"1rem"}),o.jsx(Ot,{width:"24px",height:"24px",borderRadius:"50%"})]}),o.jsx(Ot,{width:"40%",height:"2rem"}),o.jsx("div",{style:{marginTop:d.spacing.sm},children:o.jsx(Ot,{width:"80%",height:"0.875rem"})})]},t))}),Vx=({size:e="md",color:t=d.colors.primary[500]})=>{const n={sm:"16px",md:"24px",lg:"32px"},r={width:n[e],height:n[e],border:`2px solid ${d.colors.neutral[200]}`,borderTop:`2px solid ${t}`,borderRadius:"50%",animation:"spin 1s linear infinite"};return o.jsxs(o.Fragment,{children:[o.jsx("style",{children:`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}),o.jsx("div",{style:r})]})},wi=({isLoading:e,children:t,onClick:n,disabled:r=!1,variant:s="primary",size:i="md"})=>{const a=()=>{const l={display:"inline-flex",alignItems:"center",justifyContent:"center",gap:d.spacing.sm,border:"none",borderRadius:d.borderRadius.md,cursor:e||r?"not-allowed":"pointer",fontSize:d.typography.fontSize.sm,fontWeight:d.typography.fontWeight.medium,transition:"all 0.2s ease-in-out",opacity:e||r?.6:1},c={sm:{padding:`${d.spacing.xs} ${d.spacing.sm}`,fontSize:d.typography.fontSize.xs},md:{padding:`${d.spacing.sm} ${d.spacing.md}`,fontSize:d.typography.fontSize.sm},lg:{padding:`${d.spacing.md} ${d.spacing.lg}`,fontSize:d.typography.fontSize.base}},u={primary:{backgroundColor:d.colors.primary[500],color:"white"},secondary:{backgroundColor:d.colors.neutral[500],color:"white"},outline:{backgroundColor:"transparent",color:d.colors.primary[500],border:`1px solid ${d.colors.primary[500]}`}};return{...l,...c[i],...u[s]}};return o.jsxs("button",{style:a(),onClick:n,disabled:e||r,children:[e&&o.jsx(Vx,{size:"sm",color:"currentColor"}),t]})},Xd=({label:e,isActive:t,onClick:n,color:r=d.colors.primary[500]})=>o.jsxs("button",{onClick:n,style:{padding:`${d.spacing.xs} ${d.spacing.sm}`,borderRadius:d.borderRadius.full,border:`2px solid ${t?r:d.colors.neutral[300]}`,backgroundColor:t?r:"white",color:t?"white":d.colors.neutral[700],fontSize:d.typography.fontSize.sm,fontWeight:d.typography.fontWeight.medium,cursor:"pointer",transition:"all 0.2s ease-in-out",display:"flex",alignItems:"center",gap:d.spacing.xs},onMouseEnter:s=>{t||(s.currentTarget.style.borderColor=r,s.currentTarget.style.backgroundColor=`${r}10`)},onMouseLeave:s=>{t||(s.currentTarget.style.borderColor=d.colors.neutral[300],s.currentTarget.style.backgroundColor="white")},children:[e,t&&o.jsx("svg",{width:"16",height:"16",fill:"currentColor",viewBox:"0 0 20 20",children:o.jsx("path",{fillRule:"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",clipRule:"evenodd"})})]}),qx=({match:e,onContact:t,onTeamRequest:n,isLoading:r=!1})=>{var s,i,a;return o.jsxs("div",{style:{backgroundColor:"white",borderRadius:d.borderRadius.lg,border:`1px solid ${d.colors.neutral[200]}`,boxShadow:d.shadows.sm,padding:d.spacing.lg,transition:"all 0.2s ease-in-out"},onMouseEnter:l=>{l.currentTarget.style.boxShadow=d.shadows.md,l.currentTarget.style.transform="translateY(-2px)"},onMouseLeave:l=>{l.currentTarget.style.boxShadow=d.shadows.sm,l.currentTarget.style.transform="translateY(0)"},children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:d.spacing.md,marginBottom:d.spacing.md},children:[o.jsx("div",{style:{width:"48px",height:"48px",borderRadius:"50%",backgroundColor:d.colors.primary[100],display:"flex",alignItems:"center",justifyContent:"center",fontSize:d.typography.fontSize.xl,fontWeight:d.typography.fontWeight.bold,color:d.colors.primary[600]},children:((i=(s=e.name||e.id)==null?void 0:s.charAt(0))==null?void 0:i.toUpperCase())||"?"}),o.jsxs("div",{style:{flex:1},children:[o.jsx("div",{style:{fontSize:d.typography.fontSize.lg,fontWeight:d.typography.fontWeight.semibold,color:d.colors.neutral[900],marginBottom:d.spacing.xs},children:e.name||`Worker ${((a=e.id)==null?void 0:a.slice(-6))||"Unknown"}`}),o.jsx("div",{style:{fontSize:d.typography.fontSize.sm,color:d.colors.neutral[600]},children:e.company||"Individual Contractor"})]}),e.score&&o.jsxs("div",{style:{position:"absolute",top:d.spacing.sm,right:d.spacing.sm,backgroundColor:d.colors.success[100],color:d.colors.success[700],padding:`${d.spacing.xs} ${d.spacing.sm}`,borderRadius:d.borderRadius.full,fontSize:d.typography.fontSize.xs,fontWeight:d.typography.fontWeight.medium},children:[Math.round(e.score*100),"% match"]})]}),e.skills&&Array.isArray(e.skills)&&e.skills.length>0&&o.jsxs("div",{style:{marginBottom:d.spacing.md},children:[o.jsx("div",{style:{fontSize:d.typography.fontSize.sm,fontWeight:d.typography.fontWeight.medium,color:d.colors.neutral[700],marginBottom:d.spacing.xs},children:"Skills"}),o.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:d.spacing.xs},children:[e.skills.slice(0,4).map((l,c)=>o.jsx("span",{style:{padding:`${d.spacing.xs} ${d.spacing.sm}`,backgroundColor:d.colors.primary[50],color:d.colors.primary[700],borderRadius:d.borderRadius.sm,fontSize:d.typography.fontSize.xs,fontWeight:d.typography.fontWeight.medium},children:l.trim()},c)),e.skills.length>4&&o.jsxs("span",{style:{padding:`${d.spacing.xs} ${d.spacing.sm}`,backgroundColor:d.colors.neutral[100],color:d.colors.neutral[600],borderRadius:d.borderRadius.sm,fontSize:d.typography.fontSize.xs},children:["+",e.skills.length-4," more"]})]})]}),o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:d.spacing.md,marginBottom:d.spacing.md,fontSize:d.typography.fontSize.sm,color:d.colors.neutral[600]},children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:d.spacing.xs},children:[o.jsx("svg",{width:"16",height:"16",fill:"currentColor",viewBox:"0 0 20 20",children:o.jsx("path",{fillRule:"evenodd",d:"M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z",clipRule:"evenodd"})}),e.location||"Location not specified"]}),e.distanceKm&&o.jsxs("span",{style:{color:d.colors.neutral[500],fontSize:d.typography.fontSize.sm},children:[Math.round(e.distanceKm)," km away"]})]}),e.bio&&o.jsx("div",{style:{marginBottom:d.spacing.md,fontSize:d.typography.fontSize.sm,color:d.colors.neutral[700],lineHeight:"1.5",display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical",overflow:"hidden"},children:e.bio}),o.jsx("div",{style:{display:"flex",alignItems:"center",gap:d.spacing.md,marginBottom:d.spacing.lg,fontSize:d.typography.fontSize.sm,color:d.colors.neutral[600]},children:e.rating!=null&&!isNaN(Number(e.rating))&&o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:d.spacing.xs},children:[o.jsx("div",{style:{display:"flex",gap:"1px"},children:[...Array(5)].map((l,c)=>o.jsx("svg",{width:"16",height:"16",fill:c<Math.floor(Number(e.rating))?d.colors.warning[400]:d.colors.neutral[300],viewBox:"0 0 20 20",children:o.jsx("path",{d:"M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"})},c))}),o.jsx("span",{children:Number(e.rating).toFixed(1)}),e.review_count&&o.jsxs("span",{children:["(",e.review_count," reviews)"]})]})}),o.jsxs("div",{style:{display:"flex",gap:d.spacing.sm,justifyContent:"flex-end"},children:[o.jsx(wi,{isLoading:r,variant:"outline",size:"sm",onClick:t,children:"Contact"}),o.jsx(wi,{isLoading:r,variant:"primary",size:"sm",onClick:n,children:"Send Team Request"})]})]})},Qx=({currentPage:e,totalPages:t,onPageChange:n})=>{const r=()=>{const a=[],l=[];for(let c=Math.max(2,e-2);c<=Math.min(t-1,e+2);c++)a.push(c);return e-2>2?l.push(1,"..."):l.push(1),l.push(...a),e+2<t-1?l.push("...",t):t>1&&l.push(t),l};if(t<=1)return null;const s=r();return o.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:d.spacing.xs,marginTop:d.spacing.xl},children:[o.jsx("button",{onClick:()=>n(e-1),disabled:e===1,style:{padding:`${d.spacing.sm} ${d.spacing.sm}`,border:`1px solid ${d.colors.neutral[300]}`,borderRadius:d.borderRadius.sm,backgroundColor:"white",color:e===1?d.colors.neutral[400]:d.colors.neutral[700],cursor:e===1?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center"},children:o.jsx("svg",{width:"16",height:"16",fill:"currentColor",viewBox:"0 0 20 20",children:o.jsx("path",{fillRule:"evenodd",d:"M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",clipRule:"evenodd"})})}),s.map((i,a)=>o.jsx("button",{onClick:()=>typeof i=="number"?n(i):void 0,disabled:typeof i!="number",style:{padding:`${d.spacing.sm} ${d.spacing.md}`,border:`1px solid ${e===i?d.colors.primary[500]:d.colors.neutral[300]}`,borderRadius:d.borderRadius.sm,backgroundColor:e===i?d.colors.primary[500]:"white",color:e===i?"white":d.colors.neutral[700],cursor:typeof i=="number"?"pointer":"default",fontSize:d.typography.fontSize.sm,fontWeight:d.typography.fontWeight.medium,minWidth:"40px"},children:i},a)),o.jsx("button",{onClick:()=>n(e+1),disabled:e===t,style:{padding:`${d.spacing.sm} ${d.spacing.sm}`,border:`1px solid ${d.colors.neutral[300]}`,borderRadius:d.borderRadius.sm,backgroundColor:"white",color:e===t?d.colors.neutral[400]:d.colors.neutral[700],cursor:e===t?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center"},children:o.jsx("svg",{width:"16",height:"16",fill:"currentColor",viewBox:"0 0 20 20",children:o.jsx("path",{fillRule:"evenodd",d:"M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z",clipRule:"evenodd"})})})]})},Kx=()=>{const{token:e,user:t}=gt(),{success:n,error:r}=wu(),[s,i]=b.useState(""),[a,l]=b.useState(""),[c,u]=b.useState(50),[p,m]=b.useState(""),[y,w]=b.useState(""),[g,v]=b.useState([]),[S,x]=b.useState(!1),[f,h]=b.useState(!1),[k,E]=b.useState(1),[R,T]=b.useState(1),[N,C]=b.useState(0),[P,U]=b.useState([]),[J,re]=b.useState("relevance"),[xe,ve]=b.useState(null),[se,me]=b.useState([]),[O,W]=b.useState(!0),H=[{value:"beginner",label:"Beginner (0-2 years)"},{value:"intermediate",label:"Intermediate (2-5 years)"},{value:"expert",label:"Expert (5+ years)"}],Y=[{value:"low",label:"Low Priority"},{value:"medium",label:"Medium Priority"},{value:"high",label:"High Priority"}],G=[{value:"relevance",label:"Best Match"},{value:"distance",label:"Nearest First"},{value:"rating",label:"Highest Rated"},{value:"recent",label:"Recently Active"}];b.useEffect(()=>{e&&(async()=>{try{W(!0);const Pe=await xr(`${Ft.USER_SERVICE}/skills`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(Pe.ok){const vn=await Pe.json();vn.success&&Array.isArray(vn.data)?me(vn.data):(console.error("Invalid skills data format:",vn),me([]))}else console.error("Failed to fetch skills:",Pe.status),me([])}catch(Pe){console.error("Error fetching skills:",Pe),me([])}finally{W(!1)}})()},[e]);const Me=async(B=1)=>{if(e){x(!0),E(B);try{const vn=(t==null?void 0:t.role)==="contractor"?"find-workers":"find-contractors",Ps={skillType:s||void 0,location:a||void 0,maxDistance:c>0?c:void 0,limit:12,...p&&{experienceLevel:p},...y&&{urgency:y},...B>1&&{offset:(B-1)*12}},Lr=await fetch(`${MATCHING_BASE}/${vn}`,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify(Ps)});if(Lr.ok){const Et=await Lr.json();if(Et.success)v(Et.data.matches||[]),T(Et.data.totalPages||1),C(Et.data.total||0),h(!0),B===1&&n("Search completed",`Found ${Et.data.total||0} matches`);else throw new Error(Et.message||"Search failed")}else throw new Error("Search request failed")}catch(Pe){console.error("Search error:",Pe),r("Search failed","Please try again"),v([])}finally{x(!1)}}},Ee=async B=>{if(e){ve(`team-${B.id}`);try{if((await fetch(`${MATCHING_BASE}/team-requests`,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({recipient_id:B.id,message:`Hi ${B.name||"there"}, I'd like to invite you to join my team. Your skills in ${s} would be a great fit for our project.`})})).ok)n("Team request sent",`Invitation sent to ${B.name||"worker"}`);else throw new Error("Failed to send team request")}catch(Pe){console.error("Team request error:",Pe),r("Failed to send request","Please try again")}finally{ve(null)}}},Bt=async B=>{ve(`contact-${B.id}`),setTimeout(()=>{n("Contact initiated",`You can now message ${B.name}`),ve(null)},1e3)},ct=()=>{i(""),m(""),w(""),U([])},xn=s||p||y||P.length>0;return o.jsxs("div",{style:{maxWidth:"1400px",margin:"0 auto",padding:d.spacing.xl,backgroundColor:d.colors.neutral[50],minHeight:"100vh"},children:[o.jsxs("div",{style:{textAlign:"center",marginBottom:d.spacing.xl},children:[o.jsx("h1",{style:{fontSize:d.typography.fontSize["4xl"],fontWeight:d.typography.fontWeight.bold,color:d.colors.neutral[900],marginBottom:d.spacing.sm},children:"Find Your Perfect Team Match"}),o.jsx("p",{style:{fontSize:d.typography.fontSize.lg,color:d.colors.neutral[600]},children:"Discover talented contractors and workers for your projects"})]}),o.jsxs("div",{style:{backgroundColor:"white",borderRadius:d.borderRadius.lg,padding:d.spacing.xl,boxShadow:d.shadows.sm,border:`1px solid ${d.colors.neutral[200]}`,marginBottom:d.spacing.xl},children:[o.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))",gap:d.spacing.lg,marginBottom:d.spacing.lg},children:[o.jsxs("div",{children:[o.jsx("label",{style:{display:"block",fontSize:d.typography.fontSize.sm,fontWeight:d.typography.fontWeight.medium,color:d.colors.neutral[700],marginBottom:d.spacing.xs},children:"Skills Required"}),o.jsxs("select",{value:s,onChange:B=>i(B.target.value),disabled:O,style:{width:"100%",padding:d.spacing.sm,border:`1px solid ${d.colors.neutral[300]}`,borderRadius:d.borderRadius.md,fontSize:d.typography.fontSize.sm,backgroundColor:O?d.colors.neutral[100]:"white",cursor:O?"wait":"pointer"},children:[o.jsx("option",{value:"",children:O?"Loading skills...":"Select a skill..."}),se.map(B=>o.jsx("option",{value:B,children:B},B))]})]}),o.jsxs("div",{children:[o.jsx("label",{style:{display:"block",fontSize:d.typography.fontSize.sm,fontWeight:d.typography.fontWeight.medium,color:d.colors.neutral[700],marginBottom:d.spacing.xs},children:"Location"}),o.jsx("input",{type:"text",value:a,onChange:B=>l(B.target.value),placeholder:"Enter city, state, or zip code",style:{width:"100%",padding:d.spacing.sm,border:`1px solid ${d.colors.neutral[300]}`,borderRadius:d.borderRadius.md,fontSize:d.typography.fontSize.sm}})]}),o.jsxs("div",{children:[o.jsxs("label",{style:{display:"block",fontSize:d.typography.fontSize.sm,fontWeight:d.typography.fontWeight.medium,color:d.colors.neutral[700],marginBottom:d.spacing.xs},children:["Max Distance: ",c," km"]}),o.jsx("input",{type:"range",min:"5",max:"200",value:c,onChange:B=>u(Number(B.target.value)),style:{width:"100%",height:"6px",borderRadius:"3px",backgroundColor:d.colors.neutral[200],outline:"none",cursor:"pointer"}})]})]}),o.jsxs("div",{style:{marginBottom:d.spacing.lg},children:[o.jsx("div",{style:{fontSize:d.typography.fontSize.sm,fontWeight:d.typography.fontWeight.medium,color:d.colors.neutral[700],marginBottom:d.spacing.sm},children:"Experience Level"}),o.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:d.spacing.sm,marginBottom:d.spacing.md},children:H.map(B=>o.jsx(Xd,{label:B.label,value:B.value,isActive:p===B.value,onClick:()=>m(p===B.value?"":B.value),color:d.colors.success[500]},B.value))}),o.jsx("div",{style:{fontSize:d.typography.fontSize.sm,fontWeight:d.typography.fontWeight.medium,color:d.colors.neutral[700],marginBottom:d.spacing.sm},children:"Project Urgency"}),o.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:d.spacing.sm},children:Y.map(B=>o.jsx(Xd,{label:B.label,value:B.value,isActive:y===B.value,onClick:()=>w(y===B.value?"":B.value),color:d.colors.warning[500]},B.value))})]}),o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:d.spacing.md,justifyContent:"space-between",flexWrap:"wrap"},children:[o.jsxs("div",{style:{display:"flex",gap:d.spacing.sm},children:[o.jsxs(wi,{isLoading:S,variant:"primary",onClick:()=>Me(1),disabled:!s,children:[o.jsx("svg",{width:"16",height:"16",fill:"currentColor",viewBox:"0 0 20 20",children:o.jsx("path",{fillRule:"evenodd",d:"M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",clipRule:"evenodd"})}),"Search Matches"]}),xn&&o.jsxs("button",{onClick:ct,style:{padding:`${d.spacing.sm} ${d.spacing.md}`,border:`1px solid ${d.colors.neutral[300]}`,borderRadius:d.borderRadius.md,backgroundColor:"white",color:d.colors.neutral[600],fontSize:d.typography.fontSize.sm,cursor:"pointer",display:"flex",alignItems:"center",gap:d.spacing.xs},children:[o.jsx("svg",{width:"16",height:"16",fill:"currentColor",viewBox:"0 0 20 20",children:o.jsx("path",{fillRule:"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",clipRule:"evenodd"})}),"Clear Filters"]})]}),f&&o.jsx("select",{value:J,onChange:B=>{re(B.target.value),Me(1)},style:{padding:d.spacing.sm,border:`1px solid ${d.colors.neutral[300]}`,borderRadius:d.borderRadius.md,fontSize:d.typography.fontSize.sm,backgroundColor:"white"},children:G.map(B=>o.jsx("option",{value:B.value,children:B.label},B.value))})]})]}),f&&o.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:d.spacing.lg},children:[o.jsx("div",{style:{fontSize:d.typography.fontSize.lg,fontWeight:d.typography.fontWeight.medium,color:d.colors.neutral[900]},children:S?"Searching...":`${N} matches found`}),R>1&&o.jsxs("div",{style:{fontSize:d.typography.fontSize.sm,color:d.colors.neutral[600]},children:["Page ",k," of ",R]})]}),S&&o.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(400px, 1fr))",gap:d.spacing.lg},children:Array.from({length:6}).map((B,Pe)=>o.jsx(tc,{},Pe))}),!S&&f&&o.jsxs(o.Fragment,{children:[g.length===0?o.jsxs("div",{style:{textAlign:"center",padding:d.spacing["2xl"],backgroundColor:"white",borderRadius:d.borderRadius.lg,border:`1px solid ${d.colors.neutral[200]}`},children:[o.jsx("svg",{width:"64",height:"64",fill:d.colors.neutral[400],viewBox:"0 0 20 20",style:{margin:"0 auto",marginBottom:d.spacing.lg},children:o.jsx("path",{fillRule:"evenodd",d:"M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",clipRule:"evenodd"})}),o.jsx("h3",{style:{fontSize:d.typography.fontSize.xl,fontWeight:d.typography.fontWeight.semibold,color:d.colors.neutral[900],marginBottom:d.spacing.sm},children:"No matches found"}),o.jsx("p",{style:{fontSize:d.typography.fontSize.base,color:d.colors.neutral[600],marginBottom:d.spacing.lg},children:"Try adjusting your search criteria or expanding your location range."}),o.jsx("button",{onClick:ct,style:{padding:`${d.spacing.sm} ${d.spacing.lg}`,backgroundColor:d.colors.primary[500],color:"white",border:"none",borderRadius:d.borderRadius.md,fontSize:d.typography.fontSize.sm,fontWeight:d.typography.fontWeight.medium,cursor:"pointer"},children:"Clear All Filters"})]}):o.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(400px, 1fr))",gap:d.spacing.lg},children:g.map((B,Pe)=>o.jsx(qx,{match:B,onContact:()=>Bt(B),onTeamRequest:()=>Ee(B),isLoading:xe===`team-${B.id}`||xe===`contact-${B.id}`},B.user_id||Pe))}),o.jsx(Qx,{currentPage:k,totalPages:R,onPageChange:Me})]}),!f&&!S&&o.jsxs("div",{style:{textAlign:"center",padding:d.spacing["2xl"],backgroundColor:"white",borderRadius:d.borderRadius.lg,border:`1px solid ${d.colors.neutral[200]}`},children:[o.jsx("svg",{width:"80",height:"80",fill:d.colors.primary[400],viewBox:"0 0 20 20",style:{margin:"0 auto",marginBottom:d.spacing.lg},children:o.jsx("path",{d:"M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"})}),o.jsx("h3",{style:{fontSize:d.typography.fontSize["2xl"],fontWeight:d.typography.fontWeight.semibold,color:d.colors.neutral[900],marginBottom:d.spacing.sm},children:"Ready to find your next team member?"}),o.jsx("p",{style:{fontSize:d.typography.fontSize.lg,color:d.colors.neutral[600]},children:"Enter your requirements above and start searching for the perfect match."})]})]})},yt=({width:e="100%",height:t="20px",borderRadius:n="4px",className:r=""})=>o.jsx("div",{className:`skeleton ${r}`,style:{width:e,height:t,borderRadius:n,background:"linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",backgroundSize:"200% 100%",animation:"skeleton-loading 1.5s infinite"}}),Sm=({showActions:e=!0})=>o.jsxs("div",{style:{padding:"20px",background:"#fff",borderRadius:"12px",boxShadow:"0 2px 8px rgba(0,0,0,0.08)",marginBottom:"16px"},children:[o.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"16px"},children:[o.jsxs("div",{style:{flex:1},children:[o.jsx(yt,{height:"24px",width:"70%"}),o.jsx("div",{style:{marginTop:"8px"},children:o.jsx(yt,{height:"16px",width:"50%"})})]}),o.jsx("div",{children:o.jsx(yt,{height:"32px",width:"80px",borderRadius:"20px"})})]}),o.jsxs("div",{style:{marginBottom:"12px"},children:[o.jsx(yt,{height:"16px",width:"40%"}),o.jsxs("div",{style:{marginTop:"8px",display:"flex",gap:"8px"},children:[o.jsx(yt,{height:"24px",width:"60px",borderRadius:"12px"}),o.jsx(yt,{height:"24px",width:"80px",borderRadius:"12px"}),o.jsx(yt,{height:"24px",width:"70px",borderRadius:"12px"})]})]}),o.jsxs("div",{style:{marginBottom:"12px"},children:[o.jsx(yt,{height:"16px",width:"30%"}),o.jsx("div",{style:{marginTop:"4px"},children:o.jsx(yt,{height:"16px",width:"60%"})})]}),o.jsx(yt,{height:"14px",width:"45%"}),e&&o.jsxs("div",{style:{marginTop:"16px",display:"flex",gap:"12px"},children:[o.jsx(yt,{height:"36px",width:"120px",borderRadius:"6px"}),o.jsx(yt,{height:"36px",width:"100px",borderRadius:"6px"})]})]}),jm=()=>o.jsx("style",{children:`
    @keyframes skeleton-loading {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }
    
    .skeleton {
      position: relative;
      overflow: hidden;
    }
  `}),Yx=({isOpen:e,onClose:t,contactName:n,contactEmail:r,contactPhone:s,onCall:i,onMessage:a})=>e?o.jsx("div",{style:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0, 0, 0, 0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1e3},onClick:t,children:o.jsxs("div",{style:{backgroundColor:"white",borderRadius:"12px",padding:"2rem",maxWidth:"400px",width:"90%",boxShadow:"0 10px 40px rgba(0, 0, 0, 0.2)",position:"relative"},onClick:l=>l.stopPropagation(),children:[o.jsx("button",{onClick:t,style:{position:"absolute",top:"1rem",right:"1rem",background:"none",border:"none",fontSize:"1.5rem",cursor:"pointer",color:"#666",padding:"0.25rem"},children:"×"}),o.jsxs("div",{style:{marginBottom:"1.5rem"},children:[o.jsxs("h3",{style:{margin:"0 0 0.5rem 0",color:"#1976d2",fontSize:"1.3rem"},children:["Contact ",n]}),o.jsx("p",{style:{margin:0,color:"#666",fontSize:"0.9rem"},children:"Choose how you'd like to contact this person:"})]}),o.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[o.jsxs("button",{onClick:i,disabled:!s,style:{display:"flex",alignItems:"center",padding:"1rem",background:s?"#4caf50":"#f5f5f5",color:s?"white":"#999",border:"none",borderRadius:"8px",cursor:s?"pointer":"not-allowed",fontSize:"1rem",transition:"all 0.2s"},children:[o.jsx("span",{style:{fontSize:"1.5rem",marginRight:"1rem"},children:"📞"}),o.jsxs("div",{style:{textAlign:"left",flex:1},children:[o.jsx("div",{style:{fontWeight:"bold"},children:"Call"}),o.jsx("div",{style:{fontSize:"0.85rem",opacity:.8},children:s||"Phone number not available"})]})]}),o.jsxs("button",{onClick:a,style:{display:"flex",alignItems:"center",padding:"1rem",background:"#1976d2",color:"white",border:"none",borderRadius:"8px",cursor:"pointer",fontSize:"1rem",transition:"all 0.2s"},children:[o.jsx("span",{style:{fontSize:"1.5rem",marginRight:"1rem"},children:"💬"}),o.jsxs("div",{style:{textAlign:"left",flex:1},children:[o.jsx("div",{style:{fontWeight:"bold"},children:"Send Message"}),o.jsx("div",{style:{fontSize:"0.85rem",opacity:.8},children:"Send a message via the platform"})]})]}),o.jsxs("button",{onClick:()=>window.open(`mailto:${r}`,"_blank"),style:{display:"flex",alignItems:"center",padding:"1rem",background:"#ff9800",color:"white",border:"none",borderRadius:"8px",cursor:"pointer",fontSize:"1rem",transition:"all 0.2s"},children:[o.jsx("span",{style:{fontSize:"1.5rem",marginRight:"1rem"},children:"📧"}),o.jsxs("div",{style:{textAlign:"left",flex:1},children:[o.jsx("div",{style:{fontWeight:"bold"},children:"Email"}),o.jsx("div",{style:{fontSize:"0.85rem",opacity:.8},children:r})]})]})]}),o.jsx("div",{style:{marginTop:"1.5rem",textAlign:"center"},children:o.jsx("button",{onClick:t,style:{background:"#f5f5f5",color:"#666",border:"none",borderRadius:"6px",padding:"0.5rem 1.5rem",cursor:"pointer",fontSize:"0.9rem"},children:"Cancel"})})]})}):null,Gd="/api/matching",Jx=({showContactButton:e=!0})=>{const{token:t}=gt(),[n,r]=b.useState([]),[s,i]=b.useState(!1),[a,l]=b.useState(""),[c,u]=b.useState(null),[p,m]=b.useState(""),[y,w]=b.useState(""),[g,v]=b.useState(!1),[S,x]=b.useState(!1),[f,h]=b.useState(null),k=()=>{t&&(i(!0),l(""),fetch(`${Gd}/contractor-requirements`,{headers:{Authorization:`Bearer ${t}`}}).then(C=>C.json()).then(C=>{C.success&&Array.isArray(C.data)?r(C.data):l(C.message||"Failed to fetch requirements")}).catch(()=>l("Network error")).finally(()=>i(!1)))};b.useEffect(()=>{k()},[t]);const E=async C=>{if(!p.trim()){alert("Please enter a message");return}v(!0);try{const U=await(await fetch(`${Gd}/contact-contractor`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({contractorId:C,message:p})})).json();U.success?(w("✅ Message sent successfully!"),m(""),u(null),setTimeout(()=>w(""),5e3)):alert(`Failed to send message: ${U.message}`)}catch{alert("Network error sending message")}finally{v(!1)}},R=()=>{f!=null&&f.contractor_phone?window.open(`tel:${f.contractor_phone}`,"_self"):alert("Phone number not available for this contractor"),x(!1)},T=()=>{x(!1),f&&u(f.id)},N=()=>{x(!1),h(null)};return o.jsxs("div",{style:{margin:"2rem 0"},children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",marginBottom:"1rem",padding:"1rem",background:"linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",borderRadius:"12px",color:"white"},children:[o.jsx("div",{style:{marginRight:"0.5rem",fontSize:"1.5em"},children:"💼"}),o.jsxs("div",{children:[o.jsx("h3",{style:{margin:0,fontSize:"1.2em"},children:"Available Work Opportunities"}),o.jsx("p",{style:{margin:"4px 0 0 0",fontSize:"0.9em",opacity:.9},children:"Contractors are looking for workers like you!"})]})]}),s&&o.jsxs("div",{children:[o.jsx(jm,{}),[1,2,3].map(C=>o.jsx(Sm,{showActions:!0},C))]}),a&&o.jsxs("div",{style:{color:"#d32f2f",background:"#ffebee",padding:"1rem",borderRadius:"8px",marginBottom:"1rem",border:"1px solid #ffcdd2",textAlign:"center"},children:[o.jsxs("div",{style:{marginBottom:"1rem"},children:["❌ ",a]}),o.jsx("button",{onClick:k,style:{background:"#1976d2",color:"white",border:"none",borderRadius:"6px",padding:"8px 16px",cursor:"pointer",fontSize:"14px"},children:"🔄 Try Again"})]}),!s&&n.length===0&&!a&&o.jsxs("div",{style:{textAlign:"center",padding:"3rem 1rem",background:"#f8f9fa",borderRadius:"12px",color:"#666"},children:[o.jsx("div",{style:{fontSize:"3em",marginBottom:"1rem"},children:"📋"}),o.jsx("h4",{style:{margin:"0 0 0.5rem 0"},children:"No opportunities available right now"}),o.jsx("p",{style:{margin:0,fontSize:"0.9em"},children:"Check back later or update your profile to get matched with contractors!"})]}),o.jsx("ul",{style:{listStyle:"none",padding:0},children:n.map(C=>{var P;return o.jsxs("li",{style:{background:"#f7f9fc",marginBottom:16,padding:20,borderRadius:12,boxShadow:"0 2px 8px rgba(0,0,0,0.08)",border:"1px solid #e3f2fd"},children:[o.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12},children:[o.jsxs("div",{children:[o.jsxs("div",{style:{fontSize:"1.1em",fontWeight:"bold",color:"#1976d2",marginBottom:4},children:[C.contractor_name||((P=C.contractor_email)==null?void 0:P.split("@")[0])||"Contractor"," is looking for workers"]}),o.jsx("div",{style:{fontSize:"0.9em",color:"#666"},children:C.contractor_email||`ID: ${C.contractor_id.substring(0,8)}...`})]}),o.jsxs("div",{style:{background:"#1976d2",color:"white",padding:"4px 12px",borderRadius:"20px",fontSize:"0.9em",fontWeight:"bold"},children:[C.required_workers," worker",C.required_workers!==1?"s":""," needed"]})]}),C.skills&&C.skills.length>0&&o.jsxs("div",{style:{marginBottom:8},children:[o.jsx("strong",{style:{color:"#333"},children:"Skills Required:"}),o.jsx("div",{style:{marginTop:4},children:C.skills.map(U=>o.jsx("span",{style:{display:"inline-block",background:"#e8f5e8",color:"#2e7d32",padding:"2px 8px",borderRadius:"12px",fontSize:"0.85em",marginRight:6,marginBottom:4},children:U},U))})]}),C.location&&o.jsxs("div",{style:{marginBottom:8},children:[o.jsx("strong",{style:{color:"#333"},children:"📍 Location:"})," ",C.location]}),C.notes&&o.jsxs("div",{style:{marginBottom:8},children:[o.jsx("strong",{style:{color:"#333"},children:"📝 Additional Notes:"}),o.jsx("div",{style:{marginTop:4,padding:"8px 12px",background:"#f5f5f5",borderRadius:"6px",fontSize:"0.9em",fontStyle:"italic"},children:C.notes})]}),o.jsxs("div",{style:{fontSize:"0.8em",color:"#888",marginTop:8,marginBottom:12},children:["🕒 Posted: ",C.created_at?new Date(C.created_at).toLocaleString():"N/A"]}),e&&o.jsx("div",{style:{marginTop:8},children:o.jsx("button",{onClick:()=>{h(C),x(!0)},style:{background:"#1976d2",color:"white",border:"none",borderRadius:6,padding:"6px 16px",cursor:"pointer",display:"flex",alignItems:"center",gap:"6px"},children:"📞 Contact"})})]},C.id)})}),y&&o.jsx("div",{style:{color:"#2e7d32",background:"#e8f5e8",padding:"1rem",borderRadius:"8px",marginTop:"1rem",border:"1px solid #c8e6c9",textAlign:"center",fontSize:"1.1em"},children:y}),o.jsx(Yx,{isOpen:S,onClose:N,contactName:(f==null?void 0:f.contractor_name)||"Contractor",contactEmail:(f==null?void 0:f.contractor_email)||"",contactPhone:f==null?void 0:f.contractor_phone,onCall:R,onMessage:T}),c&&o.jsx("div",{style:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0, 0, 0, 0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1e3},onClick:()=>u(null),children:o.jsxs("div",{style:{backgroundColor:"white",borderRadius:"12px",padding:"2rem",maxWidth:"500px",width:"90%",boxShadow:"0 10px 40px rgba(0, 0, 0, 0.2)"},onClick:C=>C.stopPropagation(),children:[o.jsx("h3",{style:{margin:"0 0 1rem 0",color:"#1976d2"},children:"Send Message"}),o.jsx("textarea",{value:p,onChange:C=>m(C.target.value),placeholder:"Enter your message to the contractor...",rows:4,style:{width:"100%",marginBottom:"1rem",padding:"0.75rem",border:"1px solid #ddd",borderRadius:"8px",fontSize:"14px",resize:"vertical"}}),o.jsxs("div",{style:{display:"flex",gap:"1rem",justifyContent:"flex-end"},children:[o.jsx("button",{onClick:()=>u(null),style:{background:"#f5f5f5",color:"#666",border:"none",borderRadius:"6px",padding:"0.75rem 1.5rem",cursor:"pointer"},children:"Cancel"}),o.jsx("button",{onClick:()=>f&&E(f.contractor_id),disabled:g||!p.trim(),style:{background:g||!p.trim()?"#ccc":"#1976d2",color:"white",border:"none",borderRadius:"6px",padding:"0.75rem 1.5rem",cursor:g||!p.trim()?"not-allowed":"pointer"},children:g?"Sending...":"Send Message"})]})]})})]})},Xx="/api/matching/my-team",Gx=()=>{const{token:e}=gt(),[t,n]=b.useState([]),[r,s]=b.useState(""),[i,a]=b.useState(!1),[l,c]=b.useState("all"),u=async()=>{if(s(""),a(!0),!e){s("Please log in to view your team members"),a(!1);return}try{const y=await fetch(Xx,{credentials:"include",headers:e?{Authorization:`Bearer ${e}`}:{}});if(!y.ok)throw new Error(`HTTP ${y.status}: ${y.statusText}`);const w=await y.json();if(console.log("MyTeamPage: Response data:",w),w.success&&Array.isArray(w.data))n(w.data);else if(w.data&&Array.isArray(w.data))n(w.data);else if(Array.isArray(w))n(w);else if(w.message&&(w.message.includes("Found")&&w.message.includes("team member")||w.message.includes("No team members")||w.message.includes("empty")))n([]);else{if(w.message&&(w.message.includes("error")||w.message.includes("failed")||w.message.includes("unauthorized")))throw new Error(w.message);console.warn("MyTeamPage: Unknown response format:",w),n([])}}catch(y){console.error("MyTeamPage: Network/Fetch Error:",y);const w=y instanceof Error?y.message:"Unknown error";s(`Network error: ${w}. Please check if backend services are running.`)}finally{a(!1)}};b.useEffect(()=>{console.log("MyTeamPage: useEffect running, token exists:",!!e),u()},[e]);const p=t.filter(y=>l==="all"?!0:l==="available"?y.isAvailable===!0:l==="busy"?y.isAvailable===!1||y.isAvailable===null||y.isAvailable===void 0:!0),m=y=>y===!0?o.jsx("span",{style:{display:"inline-block",padding:"0.2rem 0.6rem",borderRadius:"12px",fontSize:"0.85rem",fontWeight:"600",background:"#4caf50",color:"white",marginLeft:"0.5rem"},children:"Available"}):y===!1?o.jsx("span",{style:{display:"inline-block",padding:"0.2rem 0.6rem",borderRadius:"12px",fontSize:"0.85rem",fontWeight:"600",background:"#f44336",color:"white",marginLeft:"0.5rem"},children:"Busy"}):o.jsx("span",{style:{display:"inline-block",padding:"0.2rem 0.6rem",borderRadius:"12px",fontSize:"0.85rem",fontWeight:"600",background:"#9e9e9e",color:"white",marginLeft:"0.5rem"},children:"N/A"});return o.jsxs(o.Fragment,{children:[o.jsx("style",{children:`
        .myteam-bg {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          background: #f5f7fa;
          padding: 2rem;
        }
        .myteam-container {
          width: 100%;
          max-width: 500px;
          min-width: 320px;
          padding: 2.5rem 2.5rem 2rem 2.5rem;
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 4px 32px rgba(0,0,0,0.10);
          display: flex;
          animation: fadeInUp 0.6s ease-out;
          flex-direction: column;
          gap: 1.5rem;
        }
        .myteam-header {
          text-align: center;
          margin-bottom: 1rem;
          color: #fbc02d;
          font-size: 2rem;
          font-weight: 700;
        }
        .myteam-error {
          color: red;
          text-align: center;
          font-weight: 500;
        }
        .myteam-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .myteam-list li {
          background: #f7f9fc;
          margin-bottom: 1rem;
          padding: 1rem;
          border-radius: 8px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
          font-size: 1.05rem;
          color: #333;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
        }
        .filter-buttons {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
          margin-bottom: 1rem;
        }
        .filter-btn {
          padding: 0.5rem 1rem;
          border: 2px solid #1976d2;
          background: white;
          color: #1976d2;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .filter-btn:hover {
          background: #e3f2fd;
        }
        .filter-btn.active {
          background: #1976d2;
          color: white;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .myteam-container {
            padding: 1rem;
          }
          .filter-buttons {
            flex-wrap: wrap;
            gap: 0.25rem;
          }
          .filter-btn {
            padding: 0.4rem 0.8rem;
            font-size: 0.9rem;
          }
          .myteam-list li {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
          .myteam-title {
            font-size: 1.5rem;
          }
        }
        @media (max-width: 600px) {
          .myteam-container {
            max-width: 100vw;
            min-width: 0;
            padding: 1.2rem 0.5rem 1rem 0.5rem;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          }
          .myteam-header {
            font-size: 1.4rem;
          }
          .myteam-list li {
            font-size: 0.98rem;
            padding: 0.7rem;
          }
        }
      `}),o.jsx("div",{className:"myteam-bg",children:o.jsxs("div",{className:"myteam-container",children:[o.jsx("div",{className:"myteam-header",children:"My Team"}),r&&o.jsxs("div",{style:{background:"#ffebee",color:"#d32f2f",padding:"1rem",borderRadius:"8px",textAlign:"center",marginBottom:"1rem",border:"1px solid #ffcdd2"},children:[o.jsxs("div",{style:{marginBottom:"1rem"},children:["❌ ",r]}),o.jsx("button",{onClick:u,style:{background:"#1976d2",color:"white",border:"none",borderRadius:"6px",padding:"8px 16px",cursor:"pointer",fontSize:"14px"},children:"🔄 Try Again"})]}),o.jsxs("div",{className:"filter-buttons",children:[o.jsxs("button",{className:`filter-btn ${l==="all"?"active":""}`,onClick:()=>c("all"),children:["All (",t.length,")"]}),o.jsxs("button",{className:`filter-btn ${l==="available"?"active":""}`,onClick:()=>c("available"),children:["Available (",t.filter(y=>y.isAvailable===!0).length,")"]}),o.jsxs("button",{className:`filter-btn ${l==="busy"?"active":""}`,onClick:()=>c("busy"),children:["Busy (",t.filter(y=>y.isAvailable===!1||y.isAvailable===null||y.isAvailable===void 0).length,")"]})]}),o.jsxs("ul",{className:"myteam-list",children:[i&&o.jsxs(o.Fragment,{children:[o.jsx(jm,{}),[1,2,3,4].map(y=>o.jsx("li",{style:{listStyle:"none"},children:o.jsx(Sm,{showActions:!1})},y))]}),!i&&p.length===0&&!r&&o.jsx("li",{style:{textAlign:"center",color:"#888",justifyContent:"center"},children:l==="all"?"No team members found.":`No ${l} team members found.`}),!i&&p.map((y,w)=>o.jsxs("li",{children:[o.jsxs("div",{children:[o.jsx("strong",{children:y.name}),y.profile_info&&o.jsxs(o.Fragment,{children:[" — ",y.profile_info]}),o.jsxs("div",{style:{fontSize:"0.85em",color:"#666",marginTop:"4px"},children:[y.role," • ",y.location," • Rating: ",y.rating||"N/A"]})]}),m(y.isAvailable)]},y.team_member_record_id||w))]}),o.jsx(Jx,{showContactButton:!0})]})})]})},Cm=b.createContext(void 0),Zx=({children:e})=>{const[t,n]=b.useState([]);b.useEffect(()=>{const s=new WebSocket("ws://localhost:3004/ws");return s.onmessage=i=>{const a=JSON.parse(i.data);n(l=>[...l,a])},()=>s.close()},[]);const r=(s,i)=>{const a=new WebSocket("ws://localhost:3004/ws");a.onopen=()=>{a.send(JSON.stringify({to:s,content:i})),a.close()}};return o.jsx(Cm.Provider,{value:{messages:t,sendMessage:r},children:e})},Em=()=>{const e=b.useContext(Cm);if(!e)throw new Error("useMessages must be used within MessageProvider");return e},ev=()=>{const{messages:e}=Em();return o.jsxs(o.Fragment,{children:[o.jsx("style",{children:`
        .msg-list-container {
          width: 100%;
          max-width: 500px;
          margin: 2rem auto 0 auto;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.08);
          padding: 2rem 2rem 1rem 2rem;
        }
        .msg-list-header {
          text-align: center;
          color: #1976d2;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }
        .msg-list-ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .msg-list-li {
          margin-bottom: 1.2rem;
          background: #f7f9fc;
          border-radius: 8px;
          padding: 1rem;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }
        .msg-list-from {
          font-weight: 600;
          color: #43a047;
        }
        .msg-list-content {
          margin-left: 0.5rem;
          color: #222;
        }
        .msg-list-timestamp {
          font-size: 0.85em;
          color: #888;
          margin-top: 0.5rem;
        }
        @media (max-width: 600px) {
          .msg-list-container {
            max-width: 100vw;
            padding: 1rem 0.5rem 0.5rem 0.5rem;
            border-radius: 8px;
          }
          .msg-list-header {
            font-size: 1.1rem;
          }
          .msg-list-li {
            font-size: 0.98rem;
            padding: 0.7rem;
          }
        }
      `}),o.jsxs("div",{className:"msg-list-container",children:[o.jsx("div",{className:"msg-list-header",children:"Messages"}),o.jsx("ul",{className:"msg-list-ul",children:e.map((t,n)=>o.jsxs("li",{className:"msg-list-li",children:[o.jsxs("span",{className:"msg-list-from",children:[t.from,":"]}),o.jsx("span",{className:"msg-list-content",children:t.content}),o.jsx("div",{className:"msg-list-timestamp",children:new Date(t.timestamp).toLocaleString()})]},t.id||n))})]})]})},tv=()=>{const{sendMessage:e}=Em(),[t,n]=b.useState(""),[r,s]=b.useState(""),i=a=>{a.preventDefault(),t&&r&&(e(t,r),s(""))};return o.jsxs(o.Fragment,{children:[o.jsx("style",{children:`
        .msg-input-form {
          max-width: 500px;
          margin: 1.5rem auto 2rem auto;
          display: flex;
          gap: 1rem;
        }
        .msg-input-form input {
          padding: 1rem;
          border-radius: 10px;
          border: 1px solid #bbb;
          font-size: 1.1rem;
          background: #f7f9fc;
        }
        .msg-input-form button {
          padding: 1rem 2rem;
          border-radius: 10px;
          border: none;
          background: #43a047;
          color: #fff;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(67,160,71,0.08);
          transition: background 0.2s;
        }
        .msg-input-form button:hover {
          background: #2e7031;
        }
        @media (max-width: 600px) {
          .msg-input-form {
            max-width: 100vw;
            gap: 0.5rem;
          }
          .msg-input-form input, .msg-input-form button {
            font-size: 1rem;
            padding: 0.7rem;
            border-radius: 7px;
          }
        }
      `}),o.jsxs("form",{className:"msg-input-form",onSubmit:i,children:[o.jsx("input",{type:"text",placeholder:"Recipient",value:t,onChange:a=>n(a.target.value),required:!0,style:{flex:1}}),o.jsx("input",{type:"text",placeholder:"Message",value:r,onChange:a=>s(a.target.value),required:!0,style:{flex:2}}),o.jsx("button",{type:"submit",children:"Send"})]})]})},nv=()=>o.jsx(Zx,{children:o.jsxs("div",{style:{minHeight:"100vh",background:"#f5f7fa",paddingBottom:"2rem"},children:[o.jsx(ev,{}),o.jsx(tv,{})]})}),rv="_homeRoot_1w478_1",sv="_leftSection_1w478_12",iv="_buttonRow_1w478_29",ov="_rightSection_1w478_34",av="_fortImage_1w478_50",Ar={homeRoot:rv,leftSection:sv,buttonRow:iv,rightSection:ov,fortImage:av},Zd=()=>o.jsxs("div",{className:Ar.homeRoot,children:[o.jsxs("div",{className:Ar.leftSection,children:[o.jsxs("div",{style:{background:"#f5ecd6",borderRadius:12,padding:"1.2rem 1.5rem",marginBottom:28,boxShadow:"0 2px 8px #e9d8a633",textAlign:"center"},children:[o.jsxs("h1",{style:{fontSize:"2.4rem",fontWeight:700,marginBottom:16,color:"#222",lineHeight:1.2},children:["Connecting People.",o.jsx("br",{}),"Creating Success."]}),o.jsx("p",{style:{fontSize:"1.15rem",color:"#555",marginBottom:0},children:"Welcome! Find the best matches for your needs, chat in real time, and manage your saved connections."})]}),o.jsxs("div",{className:Ar.buttonRow,children:[o.jsx(ke,{to:"/search",children:o.jsx("button",{style:{padding:"0.85rem 2.2rem",fontSize:"1.08rem",borderRadius:10,border:"none",background:"#c97d60",color:"#fff",fontWeight:600,boxShadow:"0 2px 8px #c97d6022",cursor:"pointer",transition:"background 0.2s"},children:"Find Matches"})}),o.jsx(ke,{to:"/messages",children:o.jsx("button",{style:{padding:"0.85rem 2.2rem",fontSize:"1.08rem",borderRadius:10,border:"none",background:"#a5a58d",color:"#fff",fontWeight:600,boxShadow:"0 2px 8px #a5a58d22",cursor:"pointer",transition:"background 0.2s"},children:"Messages"})})]})]}),o.jsxs("div",{className:Ar.rightSection,children:[o.jsx("img",{src:"/staff/images/fort1.png",alt:"Fort 1",className:Ar.fortImage}),o.jsx("img",{src:"/staff/images/fort2.png",alt:"Fort 2",className:Ar.fortImage})]})]}),so=({title:e,value:t,icon:n,trend:r,color:s})=>o.jsxs("div",{style:{padding:d.spacing.lg,backgroundColor:"white",borderRadius:d.borderRadius.lg,boxShadow:d.shadows.sm,border:`1px solid ${d.colors.neutral[200]}`,position:"relative",overflow:"hidden"},children:[o.jsx("div",{style:{position:"absolute",top:0,left:0,width:"4px",height:"100%",backgroundColor:s}}),o.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:d.spacing.sm},children:[o.jsx("div",{style:{color:d.colors.neutral[600],fontSize:d.typography.fontSize.sm,fontWeight:d.typography.fontWeight.medium},children:e}),o.jsx("div",{style:{color:s,opacity:.8},children:n})]}),o.jsx("div",{style:{fontSize:d.typography.fontSize["3xl"],fontWeight:d.typography.fontWeight.bold,color:d.colors.neutral[900],marginBottom:d.spacing.xs},children:t}),r&&o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:d.spacing.xs,fontSize:d.typography.fontSize.sm,color:r.isPositive?d.colors.success[600]:d.colors.danger[600]},children:[o.jsx("span",{children:r.isPositive?"↗":"↘"}),o.jsxs("span",{children:[Math.abs(r.value),"% vs last month"]})]})]}),lv=({title:e,description:t,icon:n,onClick:r,color:s})=>o.jsx("div",{onClick:r,style:{padding:d.spacing.lg,backgroundColor:"white",borderRadius:d.borderRadius.lg,boxShadow:d.shadows.sm,border:`1px solid ${d.colors.neutral[200]}`,cursor:"pointer",transition:"all 0.2s ease-in-out"},onMouseEnter:i=>{i.currentTarget.style.boxShadow=d.shadows.md,i.currentTarget.style.transform="translateY(-2px)"},onMouseLeave:i=>{i.currentTarget.style.boxShadow=d.shadows.sm,i.currentTarget.style.transform="translateY(0)"},children:o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:d.spacing.md,marginBottom:d.spacing.sm},children:[o.jsx("div",{style:{width:"48px",height:"48px",borderRadius:d.borderRadius.lg,backgroundColor:`${s}20`,display:"flex",alignItems:"center",justifyContent:"center",color:s},children:n}),o.jsxs("div",{children:[o.jsx("div",{style:{fontSize:d.typography.fontSize.lg,fontWeight:d.typography.fontWeight.semibold,color:d.colors.neutral[900],marginBottom:d.spacing.xs},children:e}),o.jsx("div",{style:{fontSize:d.typography.fontSize.sm,color:d.colors.neutral[600]},children:t})]})]})}),cv=({type:e,title:t,description:n,time:r,avatar:s})=>{const i=()=>{switch(e){case"request":return d.colors.warning[500];case"connection":return d.colors.success[500];case"message":return d.colors.primary[500];default:return d.colors.neutral[500]}},a=()=>{switch(e){case"request":return o.jsx("svg",{width:"16",height:"16",fill:"currentColor",viewBox:"0 0 20 20",children:o.jsx("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z",clipRule:"evenodd"})});case"connection":return o.jsx("svg",{width:"16",height:"16",fill:"currentColor",viewBox:"0 0 20 20",children:o.jsx("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",clipRule:"evenodd"})});case"message":return o.jsxs("svg",{width:"16",height:"16",fill:"currentColor",viewBox:"0 0 20 20",children:[o.jsx("path",{d:"M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"}),o.jsx("path",{d:"M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"})]});default:return null}};return o.jsxs("div",{style:{display:"flex",gap:d.spacing.md,padding:d.spacing.md,borderBottom:`1px solid ${d.colors.neutral[100]}`},children:[o.jsx("div",{style:{width:"32px",height:"32px",borderRadius:"50%",backgroundColor:s?"transparent":`${i()}20`,display:"flex",alignItems:"center",justifyContent:"center",color:i(),flexShrink:0,backgroundImage:s?`url(${s})`:void 0,backgroundSize:"cover",backgroundPosition:"center"},children:!s&&a()}),o.jsxs("div",{style:{flex:1},children:[o.jsx("div",{style:{fontSize:d.typography.fontSize.sm,fontWeight:d.typography.fontWeight.medium,color:d.colors.neutral[900],marginBottom:d.spacing.xs},children:t}),o.jsx("div",{style:{fontSize:d.typography.fontSize.sm,color:d.colors.neutral[600],marginBottom:d.spacing.xs},children:n}),o.jsx("div",{style:{fontSize:d.typography.fontSize.xs,color:d.colors.neutral[500]},children:r})]})]})},uv=()=>{const{token:e}=gt(),{error:t,success:n}=wu(),[r,s]=b.useState([]),[i,a]=b.useState([]),[l,c]=b.useState({totalConnections:0,pendingRequests:0,activeProjects:0,profileViews:0}),[u,p]=b.useState(!0),[m,y]=b.useState(null),w=b.useCallback(async()=>{if(e)try{p(!0);const f=await xr(`${Ft.MATCHING_SERVICE}/team-requests/received`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}),h=await xr(`${Ft.MATCHING_SERVICE}/my-team`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(f.ok){const k=await f.json();k.success&&k.data&&k.data.requests?s(k.data.requests):s([])}if(h.ok){const k=await h.json();k.success&&k.data&&k.data.teamMembers?a(k.data.teamMembers):a([])}c({totalConnections:i.length,pendingRequests:r.length,activeProjects:Math.floor(Math.random()*5)+1,profileViews:Math.floor(Math.random()*100)+50})}catch(f){console.error("Error fetching dashboard data:",f),t("Failed to load dashboard data","Please try refreshing the page"),s([]),a([])}finally{p(!1)}},[e,r.length,i.length,t]);b.useEffect(()=>{w()},[w]);const g=async(f,h)=>{if(e){y(f);try{if((await xr(`${Ft.MATCHING_SERVICE}/team-requests/${f}`,{method:"PUT",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({status:h})})).ok)n(`Request ${h}`,`Team request has been ${h} successfully`),await w();else throw new Error(`Failed to ${h} request`)}catch(k){console.error(`Error ${h} request:`,k),t(`Failed to ${h} request`,"Please try again")}finally{y(null)}}},v=f=>new Date(f).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),S=[{title:"Find Matches",description:"Discover new team members",icon:o.jsx("svg",{width:"24",height:"24",fill:"currentColor",viewBox:"0 0 20 20",children:o.jsx("path",{fillRule:"evenodd",d:"M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",clipRule:"evenodd"})}),onClick:()=>window.location.href="/search",color:d.colors.primary[500]},{title:"Send Invitation",description:"Invite someone to join your team",icon:o.jsx("svg",{width:"24",height:"24",fill:"currentColor",viewBox:"0 0 20 20",children:o.jsx("path",{d:"M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"})}),onClick:()=>window.location.href="/profile",color:d.colors.success[500]},{title:"View Messages",description:"Check your conversations",icon:o.jsxs("svg",{width:"24",height:"24",fill:"currentColor",viewBox:"0 0 20 20",children:[o.jsx("path",{d:"M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"}),o.jsx("path",{d:"M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"})]}),onClick:()=>window.location.href="/messages",color:d.colors.warning[500]},{title:"Update Profile",description:"Keep your profile current",icon:o.jsx("svg",{width:"24",height:"24",fill:"currentColor",viewBox:"0 0 20 20",children:o.jsx("path",{fillRule:"evenodd",d:"M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z",clipRule:"evenodd"})}),onClick:()=>window.location.href="/profile",color:d.colors.primary[600]}],x=[{type:"connection",title:"New team member added",description:"John Doe joined your team",time:"2 hours ago"},{type:"request",title:"Team request received",description:"Jane Smith wants to join your project",time:"4 hours ago"},{type:"message",title:"New message",description:"You have 3 unread messages",time:"6 hours ago"}];return u?o.jsxs("div",{style:{maxWidth:"1200px",margin:"0 auto",padding:d.spacing.xl,backgroundColor:d.colors.neutral[50],minHeight:"100vh"},children:[o.jsx("div",{style:{marginBottom:d.spacing.xl},children:o.jsx(Hx,{})}),o.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:d.spacing.lg},children:[o.jsx(tc,{}),o.jsx(tc,{})]})]}):o.jsxs("div",{style:{maxWidth:"1200px",margin:"0 auto",padding:d.spacing.xl,backgroundColor:d.colors.neutral[50],minHeight:"100vh"},children:[o.jsxs("div",{style:{textAlign:"center",marginBottom:d.spacing.xl},children:[o.jsx("h1",{style:{fontSize:d.typography.fontSize["4xl"],fontWeight:d.typography.fontWeight.bold,color:d.colors.neutral[900],marginBottom:d.spacing.sm},children:"Welcome to Your Dashboard"}),o.jsx("p",{style:{fontSize:d.typography.fontSize.lg,color:d.colors.neutral[600]},children:"Manage your team connections and track your progress"})]}),o.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))",gap:d.spacing.lg,marginBottom:d.spacing.xl},children:[o.jsx(so,{title:"Total Connections",value:l.totalConnections,icon:o.jsx("svg",{width:"24",height:"24",fill:"currentColor",viewBox:"0 0 20 20",children:o.jsx("path",{d:"M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"})}),trend:{value:15,isPositive:!0},color:d.colors.primary[500]}),o.jsx(so,{title:"Pending Requests",value:l.pendingRequests,icon:o.jsx("svg",{width:"24",height:"24",fill:"currentColor",viewBox:"0 0 20 20",children:o.jsx("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z",clipRule:"evenodd"})}),color:l.pendingRequests>0?d.colors.warning[500]:d.colors.success[500]}),o.jsx(so,{title:"Active Projects",value:l.activeProjects,icon:o.jsx("svg",{width:"24",height:"24",fill:"currentColor",viewBox:"0 0 20 20",children:o.jsx("path",{d:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"})}),trend:{value:8,isPositive:!0},color:d.colors.success[500]}),o.jsx(so,{title:"Profile Views",value:l.profileViews,icon:o.jsxs("svg",{width:"24",height:"24",fill:"currentColor",viewBox:"0 0 20 20",children:[o.jsx("path",{d:"M10 12a2 2 0 100-4 2 2 0 000 4z"}),o.jsx("path",{fillRule:"evenodd",d:"M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z",clipRule:"evenodd"})]}),trend:{value:23,isPositive:!0},color:d.colors.primary[600]})]}),o.jsxs("div",{style:{marginBottom:d.spacing.xl},children:[o.jsx("h2",{style:{fontSize:d.typography.fontSize["2xl"],fontWeight:d.typography.fontWeight.semibold,color:d.colors.neutral[900],marginBottom:d.spacing.lg},children:"Quick Actions"}),o.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:d.spacing.lg},children:S.map((f,h)=>o.jsx(lv,{...f},h))})]}),o.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(400px, 1fr))",gap:d.spacing.xl},children:[o.jsxs("div",{style:{backgroundColor:"white",borderRadius:d.borderRadius.lg,boxShadow:d.shadows.sm,border:`1px solid ${d.colors.neutral[200]}`},children:[o.jsx("div",{style:{padding:d.spacing.lg,borderBottom:`1px solid ${d.colors.neutral[200]}`},children:o.jsxs("h3",{style:{fontSize:d.typography.fontSize.xl,fontWeight:d.typography.fontWeight.semibold,color:d.colors.neutral[900]},children:["Pending Team Requests (",r.length,")"]})}),o.jsx("div",{style:{maxHeight:"400px",overflowY:"auto"},children:r.length===0?o.jsxs("div",{style:{padding:d.spacing.xl,textAlign:"center",color:d.colors.neutral[500]},children:[o.jsx("svg",{width:"48",height:"48",fill:"currentColor",viewBox:"0 0 20 20",style:{margin:"0 auto",marginBottom:d.spacing.md,opacity:.5},children:o.jsx("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",clipRule:"evenodd"})}),o.jsx("p",{children:"No pending requests"})]}):r.map(f=>o.jsxs("div",{style:{padding:d.spacing.lg,borderBottom:`1px solid ${d.colors.neutral[100]}`},children:[o.jsx("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:d.spacing.sm},children:o.jsxs("div",{children:[o.jsx("div",{style:{fontSize:d.typography.fontSize.lg,fontWeight:d.typography.fontWeight.semibold,color:d.colors.neutral[900],marginBottom:d.spacing.xs},children:f.sender_name}),f.sender_company&&o.jsx("div",{style:{fontSize:d.typography.fontSize.sm,color:d.colors.neutral[600],marginBottom:d.spacing.xs},children:f.sender_company}),o.jsx("div",{style:{fontSize:d.typography.fontSize.xs,color:d.colors.neutral[500]},children:v(f.created_at)})]})}),o.jsx("div",{style:{fontSize:d.typography.fontSize.sm,color:d.colors.neutral[700],marginBottom:d.spacing.md,padding:d.spacing.sm,backgroundColor:d.colors.neutral[50],borderRadius:d.borderRadius.sm,borderLeft:`3px solid ${d.colors.primary[500]}`},children:f.message}),o.jsxs("div",{style:{display:"flex",gap:d.spacing.sm},children:[o.jsx(wi,{isLoading:m===f.id,variant:"primary",size:"sm",onClick:()=>g(f.id,"accepted"),children:"Accept"}),o.jsx(wi,{isLoading:m===f.id,variant:"outline",size:"sm",onClick:()=>g(f.id,"rejected"),children:"Decline"})]})]},f.id))})]}),o.jsxs("div",{style:{backgroundColor:"white",borderRadius:d.borderRadius.lg,boxShadow:d.shadows.sm,border:`1px solid ${d.colors.neutral[200]}`},children:[o.jsx("div",{style:{padding:d.spacing.lg,borderBottom:`1px solid ${d.colors.neutral[200]}`},children:o.jsx("h3",{style:{fontSize:d.typography.fontSize.xl,fontWeight:d.typography.fontWeight.semibold,color:d.colors.neutral[900]},children:"Recent Activity"})}),o.jsx("div",{style:{maxHeight:"400px",overflowY:"auto"},children:x.map((f,h)=>o.jsx(cv,{...f},h))})]})]})]})};function Tm(e,t){return function(){return e.apply(t,arguments)}}const{toString:dv}=Object.prototype,{getPrototypeOf:ku}=Object,{iterator:xa,toStringTag:_m}=Symbol,va=(e=>t=>{const n=dv.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),$t=e=>(e=e.toLowerCase(),t=>va(t)===e),ba=e=>t=>typeof t===e,{isArray:_s}=Array,ws=ba("undefined");function Ii(e){return e!==null&&!ws(e)&&e.constructor!==null&&!ws(e.constructor)&&at(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const Nm=$t("ArrayBuffer");function fv(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&Nm(e.buffer),t}const pv=ba("string"),at=ba("function"),Rm=ba("number"),Ai=e=>e!==null&&typeof e=="object",hv=e=>e===!0||e===!1,bo=e=>{if(va(e)!=="object")return!1;const t=ku(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(_m in e)&&!(xa in e)},mv=e=>{if(!Ai(e)||Ii(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},gv=$t("Date"),yv=$t("File"),xv=$t("Blob"),vv=$t("FileList"),bv=e=>Ai(e)&&at(e.pipe),wv=e=>{let t;return e&&(typeof FormData=="function"&&e instanceof FormData||at(e.append)&&((t=va(e))==="formdata"||t==="object"&&at(e.toString)&&e.toString()==="[object FormData]"))},kv=$t("URLSearchParams"),[Sv,jv,Cv,Ev]=["ReadableStream","Request","Response","Headers"].map($t),Tv=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function Mi(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let r,s;if(typeof e!="object"&&(e=[e]),_s(e))for(r=0,s=e.length;r<s;r++)t.call(null,e[r],r,e);else{if(Ii(e))return;const i=n?Object.getOwnPropertyNames(e):Object.keys(e),a=i.length;let l;for(r=0;r<a;r++)l=i[r],t.call(null,e[l],l,e)}}function Pm(e,t){if(Ii(e))return null;t=t.toLowerCase();const n=Object.keys(e);let r=n.length,s;for(;r-- >0;)if(s=n[r],t===s.toLowerCase())return s;return null}const ir=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,zm=e=>!ws(e)&&e!==ir;function nc(){const{caseless:e,skipUndefined:t}=zm(this)&&this||{},n={},r=(s,i)=>{const a=e&&Pm(n,i)||i;bo(n[a])&&bo(s)?n[a]=nc(n[a],s):bo(s)?n[a]=nc({},s):_s(s)?n[a]=s.slice():(!t||!ws(s))&&(n[a]=s)};for(let s=0,i=arguments.length;s<i;s++)arguments[s]&&Mi(arguments[s],r);return n}const _v=(e,t,n,{allOwnKeys:r}={})=>(Mi(t,(s,i)=>{n&&at(s)?e[i]=Tm(s,n):e[i]=s},{allOwnKeys:r}),e),Nv=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),Rv=(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},Pv=(e,t,n,r)=>{let s,i,a;const l={};if(t=t||{},e==null)return t;do{for(s=Object.getOwnPropertyNames(e),i=s.length;i-- >0;)a=s[i],(!r||r(a,e,t))&&!l[a]&&(t[a]=e[a],l[a]=!0);e=n!==!1&&ku(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},zv=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const r=e.indexOf(t,n);return r!==-1&&r===n},Lv=e=>{if(!e)return null;if(_s(e))return e;let t=e.length;if(!Rm(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},Ov=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&ku(Uint8Array)),Iv=(e,t)=>{const r=(e&&e[xa]).call(e);let s;for(;(s=r.next())&&!s.done;){const i=s.value;t.call(e,i[0],i[1])}},Av=(e,t)=>{let n;const r=[];for(;(n=e.exec(t))!==null;)r.push(n);return r},Mv=$t("HTMLFormElement"),Fv=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,r,s){return r.toUpperCase()+s}),ef=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),Dv=$t("RegExp"),Lm=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),r={};Mi(n,(s,i)=>{let a;(a=t(s,i,e))!==!1&&(r[i]=a||s)}),Object.defineProperties(e,r)},$v=e=>{Lm(e,(t,n)=>{if(at(e)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const r=e[n];if(at(r)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},Bv=(e,t)=>{const n={},r=s=>{s.forEach(i=>{n[i]=!0})};return _s(e)?r(e):r(String(e).split(t)),n},Uv=()=>{},Wv=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function Hv(e){return!!(e&&at(e.append)&&e[_m]==="FormData"&&e[xa])}const Vv=e=>{const t=new Array(10),n=(r,s)=>{if(Ai(r)){if(t.indexOf(r)>=0)return;if(Ii(r))return r;if(!("toJSON"in r)){t[s]=r;const i=_s(r)?[]:{};return Mi(r,(a,l)=>{const c=n(a,s+1);!ws(c)&&(i[l]=c)}),t[s]=void 0,i}}return r};return n(e,0)},qv=$t("AsyncFunction"),Qv=e=>e&&(Ai(e)||at(e))&&at(e.then)&&at(e.catch),Om=((e,t)=>e?setImmediate:t?((n,r)=>(ir.addEventListener("message",({source:s,data:i})=>{s===ir&&i===n&&r.length&&r.shift()()},!1),s=>{r.push(s),ir.postMessage(n,"*")}))(`axios@${Math.random()}`,[]):n=>setTimeout(n))(typeof setImmediate=="function",at(ir.postMessage)),Kv=typeof queueMicrotask<"u"?queueMicrotask.bind(ir):typeof process<"u"&&process.nextTick||Om,Yv=e=>e!=null&&at(e[xa]),_={isArray:_s,isArrayBuffer:Nm,isBuffer:Ii,isFormData:wv,isArrayBufferView:fv,isString:pv,isNumber:Rm,isBoolean:hv,isObject:Ai,isPlainObject:bo,isEmptyObject:mv,isReadableStream:Sv,isRequest:jv,isResponse:Cv,isHeaders:Ev,isUndefined:ws,isDate:gv,isFile:yv,isBlob:xv,isRegExp:Dv,isFunction:at,isStream:bv,isURLSearchParams:kv,isTypedArray:Ov,isFileList:vv,forEach:Mi,merge:nc,extend:_v,trim:Tv,stripBOM:Nv,inherits:Rv,toFlatObject:Pv,kindOf:va,kindOfTest:$t,endsWith:zv,toArray:Lv,forEachEntry:Iv,matchAll:Av,isHTMLForm:Mv,hasOwnProperty:ef,hasOwnProp:ef,reduceDescriptors:Lm,freezeMethods:$v,toObjectSet:Bv,toCamelCase:Fv,noop:Uv,toFiniteNumber:Wv,findKey:Pm,global:ir,isContextDefined:zm,isSpecCompliantForm:Hv,toJSONObject:Vv,isAsyncFn:qv,isThenable:Qv,setImmediate:Om,asap:Kv,isIterable:Yv};function V(e,t,n,r,s){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=e,this.name="AxiosError",t&&(this.code=t),n&&(this.config=n),r&&(this.request=r),s&&(this.response=s,this.status=s.status?s.status:null)}_.inherits(V,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:_.toJSONObject(this.config),code:this.code,status:this.status}}});const Im=V.prototype,Am={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(e=>{Am[e]={value:e}});Object.defineProperties(V,Am);Object.defineProperty(Im,"isAxiosError",{value:!0});V.from=(e,t,n,r,s,i)=>{const a=Object.create(Im);_.toFlatObject(e,a,function(p){return p!==Error.prototype},u=>u!=="isAxiosError");const l=e&&e.message?e.message:"Error",c=t==null&&e?e.code:t;return V.call(a,l,c,n,r,s),e&&a.cause==null&&Object.defineProperty(a,"cause",{value:e,configurable:!0}),a.name=e&&e.name||"Error",i&&Object.assign(a,i),a};const Jv=null;function rc(e){return _.isPlainObject(e)||_.isArray(e)}function Mm(e){return _.endsWith(e,"[]")?e.slice(0,-2):e}function tf(e,t,n){return e?e.concat(t).map(function(s,i){return s=Mm(s),!n&&i?"["+s+"]":s}).join(n?".":""):t}function Xv(e){return _.isArray(e)&&!e.some(rc)}const Gv=_.toFlatObject(_,{},null,function(t){return/^is[A-Z]/.test(t)});function wa(e,t,n){if(!_.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,n=_.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(v,S){return!_.isUndefined(S[v])});const r=n.metaTokens,s=n.visitor||p,i=n.dots,a=n.indexes,c=(n.Blob||typeof Blob<"u"&&Blob)&&_.isSpecCompliantForm(t);if(!_.isFunction(s))throw new TypeError("visitor must be a function");function u(g){if(g===null)return"";if(_.isDate(g))return g.toISOString();if(_.isBoolean(g))return g.toString();if(!c&&_.isBlob(g))throw new V("Blob is not supported. Use a Buffer instead.");return _.isArrayBuffer(g)||_.isTypedArray(g)?c&&typeof Blob=="function"?new Blob([g]):Buffer.from(g):g}function p(g,v,S){let x=g;if(g&&!S&&typeof g=="object"){if(_.endsWith(v,"{}"))v=r?v:v.slice(0,-2),g=JSON.stringify(g);else if(_.isArray(g)&&Xv(g)||(_.isFileList(g)||_.endsWith(v,"[]"))&&(x=_.toArray(g)))return v=Mm(v),x.forEach(function(h,k){!(_.isUndefined(h)||h===null)&&t.append(a===!0?tf([v],k,i):a===null?v:v+"[]",u(h))}),!1}return rc(g)?!0:(t.append(tf(S,v,i),u(g)),!1)}const m=[],y=Object.assign(Gv,{defaultVisitor:p,convertValue:u,isVisitable:rc});function w(g,v){if(!_.isUndefined(g)){if(m.indexOf(g)!==-1)throw Error("Circular reference detected in "+v.join("."));m.push(g),_.forEach(g,function(x,f){(!(_.isUndefined(x)||x===null)&&s.call(t,x,_.isString(f)?f.trim():f,v,y))===!0&&w(x,v?v.concat(f):[f])}),m.pop()}}if(!_.isObject(e))throw new TypeError("data must be an object");return w(e),t}function nf(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(r){return t[r]})}function Su(e,t){this._pairs=[],e&&wa(e,this,t)}const Fm=Su.prototype;Fm.append=function(t,n){this._pairs.push([t,n])};Fm.toString=function(t){const n=t?function(r){return t.call(this,r,nf)}:nf;return this._pairs.map(function(s){return n(s[0])+"="+n(s[1])},"").join("&")};function Zv(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function Dm(e,t,n){if(!t)return e;const r=n&&n.encode||Zv;_.isFunction(n)&&(n={serialize:n});const s=n&&n.serialize;let i;if(s?i=s(t,n):i=_.isURLSearchParams(t)?t.toString():new Su(t,n).toString(r),i){const a=e.indexOf("#");a!==-1&&(e=e.slice(0,a)),e+=(e.indexOf("?")===-1?"?":"&")+i}return e}class rf{constructor(){this.handlers=[]}use(t,n,r){return this.handlers.push({fulfilled:t,rejected:n,synchronous:r?r.synchronous:!1,runWhen:r?r.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){_.forEach(this.handlers,function(r){r!==null&&t(r)})}}const $m={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},eb=typeof URLSearchParams<"u"?URLSearchParams:Su,tb=typeof FormData<"u"?FormData:null,nb=typeof Blob<"u"?Blob:null,rb={isBrowser:!0,classes:{URLSearchParams:eb,FormData:tb,Blob:nb},protocols:["http","https","file","blob","url","data"]},ju=typeof window<"u"&&typeof document<"u",sc=typeof navigator=="object"&&navigator||void 0,sb=ju&&(!sc||["ReactNative","NativeScript","NS"].indexOf(sc.product)<0),ib=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",ob=ju&&window.location.href||"http://localhost",ab=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:ju,hasStandardBrowserEnv:sb,hasStandardBrowserWebWorkerEnv:ib,navigator:sc,origin:ob},Symbol.toStringTag,{value:"Module"})),Ue={...ab,...rb};function lb(e,t){return wa(e,new Ue.classes.URLSearchParams,{visitor:function(n,r,s,i){return Ue.isNode&&_.isBuffer(n)?(this.append(r,n.toString("base64")),!1):i.defaultVisitor.apply(this,arguments)},...t})}function cb(e){return _.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function ub(e){const t={},n=Object.keys(e);let r;const s=n.length;let i;for(r=0;r<s;r++)i=n[r],t[i]=e[i];return t}function Bm(e){function t(n,r,s,i){let a=n[i++];if(a==="__proto__")return!0;const l=Number.isFinite(+a),c=i>=n.length;return a=!a&&_.isArray(s)?s.length:a,c?(_.hasOwnProp(s,a)?s[a]=[s[a],r]:s[a]=r,!l):((!s[a]||!_.isObject(s[a]))&&(s[a]=[]),t(n,r,s[a],i)&&_.isArray(s[a])&&(s[a]=ub(s[a])),!l)}if(_.isFormData(e)&&_.isFunction(e.entries)){const n={};return _.forEachEntry(e,(r,s)=>{t(cb(r),s,n,0)}),n}return null}function db(e,t,n){if(_.isString(e))try{return(t||JSON.parse)(e),_.trim(e)}catch(r){if(r.name!=="SyntaxError")throw r}return(n||JSON.stringify)(e)}const Fi={transitional:$m,adapter:["xhr","http","fetch"],transformRequest:[function(t,n){const r=n.getContentType()||"",s=r.indexOf("application/json")>-1,i=_.isObject(t);if(i&&_.isHTMLForm(t)&&(t=new FormData(t)),_.isFormData(t))return s?JSON.stringify(Bm(t)):t;if(_.isArrayBuffer(t)||_.isBuffer(t)||_.isStream(t)||_.isFile(t)||_.isBlob(t)||_.isReadableStream(t))return t;if(_.isArrayBufferView(t))return t.buffer;if(_.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let l;if(i){if(r.indexOf("application/x-www-form-urlencoded")>-1)return lb(t,this.formSerializer).toString();if((l=_.isFileList(t))||r.indexOf("multipart/form-data")>-1){const c=this.env&&this.env.FormData;return wa(l?{"files[]":t}:t,c&&new c,this.formSerializer)}}return i||s?(n.setContentType("application/json",!1),db(t)):t}],transformResponse:[function(t){const n=this.transitional||Fi.transitional,r=n&&n.forcedJSONParsing,s=this.responseType==="json";if(_.isResponse(t)||_.isReadableStream(t))return t;if(t&&_.isString(t)&&(r&&!this.responseType||s)){const a=!(n&&n.silentJSONParsing)&&s;try{return JSON.parse(t,this.parseReviver)}catch(l){if(a)throw l.name==="SyntaxError"?V.from(l,V.ERR_BAD_RESPONSE,this,null,this.response):l}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:Ue.classes.FormData,Blob:Ue.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};_.forEach(["delete","get","head","post","put","patch"],e=>{Fi.headers[e]={}});const fb=_.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),pb=e=>{const t={};let n,r,s;return e&&e.split(`
`).forEach(function(a){s=a.indexOf(":"),n=a.substring(0,s).trim().toLowerCase(),r=a.substring(s+1).trim(),!(!n||t[n]&&fb[n])&&(n==="set-cookie"?t[n]?t[n].push(r):t[n]=[r]:t[n]=t[n]?t[n]+", "+r:r)}),t},sf=Symbol("internals");function $s(e){return e&&String(e).trim().toLowerCase()}function wo(e){return e===!1||e==null?e:_.isArray(e)?e.map(wo):String(e)}function hb(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}const mb=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function Ga(e,t,n,r,s){if(_.isFunction(r))return r.call(this,t,n);if(s&&(t=n),!!_.isString(t)){if(_.isString(r))return t.indexOf(r)!==-1;if(_.isRegExp(r))return r.test(t)}}function gb(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,r)=>n.toUpperCase()+r)}function yb(e,t){const n=_.toCamelCase(" "+t);["get","set","has"].forEach(r=>{Object.defineProperty(e,r+n,{value:function(s,i,a){return this[r].call(this,t,s,i,a)},configurable:!0})})}let lt=class{constructor(t){t&&this.set(t)}set(t,n,r){const s=this;function i(l,c,u){const p=$s(c);if(!p)throw new Error("header name must be a non-empty string");const m=_.findKey(s,p);(!m||s[m]===void 0||u===!0||u===void 0&&s[m]!==!1)&&(s[m||c]=wo(l))}const a=(l,c)=>_.forEach(l,(u,p)=>i(u,p,c));if(_.isPlainObject(t)||t instanceof this.constructor)a(t,n);else if(_.isString(t)&&(t=t.trim())&&!mb(t))a(pb(t),n);else if(_.isObject(t)&&_.isIterable(t)){let l={},c,u;for(const p of t){if(!_.isArray(p))throw TypeError("Object iterator must return a key-value pair");l[u=p[0]]=(c=l[u])?_.isArray(c)?[...c,p[1]]:[c,p[1]]:p[1]}a(l,n)}else t!=null&&i(n,t,r);return this}get(t,n){if(t=$s(t),t){const r=_.findKey(this,t);if(r){const s=this[r];if(!n)return s;if(n===!0)return hb(s);if(_.isFunction(n))return n.call(this,s,r);if(_.isRegExp(n))return n.exec(s);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=$s(t),t){const r=_.findKey(this,t);return!!(r&&this[r]!==void 0&&(!n||Ga(this,this[r],r,n)))}return!1}delete(t,n){const r=this;let s=!1;function i(a){if(a=$s(a),a){const l=_.findKey(r,a);l&&(!n||Ga(r,r[l],l,n))&&(delete r[l],s=!0)}}return _.isArray(t)?t.forEach(i):i(t),s}clear(t){const n=Object.keys(this);let r=n.length,s=!1;for(;r--;){const i=n[r];(!t||Ga(this,this[i],i,t,!0))&&(delete this[i],s=!0)}return s}normalize(t){const n=this,r={};return _.forEach(this,(s,i)=>{const a=_.findKey(r,i);if(a){n[a]=wo(s),delete n[i];return}const l=t?gb(i):String(i).trim();l!==i&&delete n[i],n[l]=wo(s),r[l]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return _.forEach(this,(r,s)=>{r!=null&&r!==!1&&(n[s]=t&&_.isArray(r)?r.join(", "):r)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...n){const r=new this(t);return n.forEach(s=>r.set(s)),r}static accessor(t){const r=(this[sf]=this[sf]={accessors:{}}).accessors,s=this.prototype;function i(a){const l=$s(a);r[l]||(yb(s,a),r[l]=!0)}return _.isArray(t)?t.forEach(i):i(t),this}};lt.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);_.reduceDescriptors(lt.prototype,({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(r){this[n]=r}}});_.freezeMethods(lt);function Za(e,t){const n=this||Fi,r=t||n,s=lt.from(r.headers);let i=r.data;return _.forEach(e,function(l){i=l.call(n,i,s.normalize(),t?t.status:void 0)}),s.normalize(),i}function Um(e){return!!(e&&e.__CANCEL__)}function Ns(e,t,n){V.call(this,e??"canceled",V.ERR_CANCELED,t,n),this.name="CanceledError"}_.inherits(Ns,V,{__CANCEL__:!0});function Wm(e,t,n){const r=n.config.validateStatus;!n.status||!r||r(n.status)?e(n):t(new V("Request failed with status code "+n.status,[V.ERR_BAD_REQUEST,V.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}function xb(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function vb(e,t){e=e||10;const n=new Array(e),r=new Array(e);let s=0,i=0,a;return t=t!==void 0?t:1e3,function(c){const u=Date.now(),p=r[i];a||(a=u),n[s]=c,r[s]=u;let m=i,y=0;for(;m!==s;)y+=n[m++],m=m%e;if(s=(s+1)%e,s===i&&(i=(i+1)%e),u-a<t)return;const w=p&&u-p;return w?Math.round(y*1e3/w):void 0}}function bb(e,t){let n=0,r=1e3/t,s,i;const a=(u,p=Date.now())=>{n=p,s=null,i&&(clearTimeout(i),i=null),e(...u)};return[(...u)=>{const p=Date.now(),m=p-n;m>=r?a(u,p):(s=u,i||(i=setTimeout(()=>{i=null,a(s)},r-m)))},()=>s&&a(s)]}const Yo=(e,t,n=3)=>{let r=0;const s=vb(50,250);return bb(i=>{const a=i.loaded,l=i.lengthComputable?i.total:void 0,c=a-r,u=s(c),p=a<=l;r=a;const m={loaded:a,total:l,progress:l?a/l:void 0,bytes:c,rate:u||void 0,estimated:u&&l&&p?(l-a)/u:void 0,event:i,lengthComputable:l!=null,[t?"download":"upload"]:!0};e(m)},n)},of=(e,t)=>{const n=e!=null;return[r=>t[0]({lengthComputable:n,total:e,loaded:r}),t[1]]},af=e=>(...t)=>_.asap(()=>e(...t)),wb=Ue.hasStandardBrowserEnv?((e,t)=>n=>(n=new URL(n,Ue.origin),e.protocol===n.protocol&&e.host===n.host&&(t||e.port===n.port)))(new URL(Ue.origin),Ue.navigator&&/(msie|trident)/i.test(Ue.navigator.userAgent)):()=>!0,kb=Ue.hasStandardBrowserEnv?{write(e,t,n,r,s,i){const a=[e+"="+encodeURIComponent(t)];_.isNumber(n)&&a.push("expires="+new Date(n).toGMTString()),_.isString(r)&&a.push("path="+r),_.isString(s)&&a.push("domain="+s),i===!0&&a.push("secure"),document.cookie=a.join("; ")},read(e){const t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove(e){this.write(e,"",Date.now()-864e5)}}:{write(){},read(){return null},remove(){}};function Sb(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function jb(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}function Hm(e,t,n){let r=!Sb(t);return e&&(r||n==!1)?jb(e,t):t}const lf=e=>e instanceof lt?{...e}:e;function Tr(e,t){t=t||{};const n={};function r(u,p,m,y){return _.isPlainObject(u)&&_.isPlainObject(p)?_.merge.call({caseless:y},u,p):_.isPlainObject(p)?_.merge({},p):_.isArray(p)?p.slice():p}function s(u,p,m,y){if(_.isUndefined(p)){if(!_.isUndefined(u))return r(void 0,u,m,y)}else return r(u,p,m,y)}function i(u,p){if(!_.isUndefined(p))return r(void 0,p)}function a(u,p){if(_.isUndefined(p)){if(!_.isUndefined(u))return r(void 0,u)}else return r(void 0,p)}function l(u,p,m){if(m in t)return r(u,p);if(m in e)return r(void 0,u)}const c={url:i,method:i,data:i,baseURL:a,transformRequest:a,transformResponse:a,paramsSerializer:a,timeout:a,timeoutMessage:a,withCredentials:a,withXSRFToken:a,adapter:a,responseType:a,xsrfCookieName:a,xsrfHeaderName:a,onUploadProgress:a,onDownloadProgress:a,decompress:a,maxContentLength:a,maxBodyLength:a,beforeRedirect:a,transport:a,httpAgent:a,httpsAgent:a,cancelToken:a,socketPath:a,responseEncoding:a,validateStatus:l,headers:(u,p,m)=>s(lf(u),lf(p),m,!0)};return _.forEach(Object.keys({...e,...t}),function(p){const m=c[p]||s,y=m(e[p],t[p],p);_.isUndefined(y)&&m!==l||(n[p]=y)}),n}const Vm=e=>{const t=Tr({},e);let{data:n,withXSRFToken:r,xsrfHeaderName:s,xsrfCookieName:i,headers:a,auth:l}=t;if(t.headers=a=lt.from(a),t.url=Dm(Hm(t.baseURL,t.url,t.allowAbsoluteUrls),e.params,e.paramsSerializer),l&&a.set("Authorization","Basic "+btoa((l.username||"")+":"+(l.password?unescape(encodeURIComponent(l.password)):""))),_.isFormData(n)){if(Ue.hasStandardBrowserEnv||Ue.hasStandardBrowserWebWorkerEnv)a.setContentType(void 0);else if(_.isFunction(n.getHeaders)){const c=n.getHeaders(),u=["content-type","content-length"];Object.entries(c).forEach(([p,m])=>{u.includes(p.toLowerCase())&&a.set(p,m)})}}if(Ue.hasStandardBrowserEnv&&(r&&_.isFunction(r)&&(r=r(t)),r||r!==!1&&wb(t.url))){const c=s&&i&&kb.read(i);c&&a.set(s,c)}return t},Cb=typeof XMLHttpRequest<"u",Eb=Cb&&function(e){return new Promise(function(n,r){const s=Vm(e);let i=s.data;const a=lt.from(s.headers).normalize();let{responseType:l,onUploadProgress:c,onDownloadProgress:u}=s,p,m,y,w,g;function v(){w&&w(),g&&g(),s.cancelToken&&s.cancelToken.unsubscribe(p),s.signal&&s.signal.removeEventListener("abort",p)}let S=new XMLHttpRequest;S.open(s.method.toUpperCase(),s.url,!0),S.timeout=s.timeout;function x(){if(!S)return;const h=lt.from("getAllResponseHeaders"in S&&S.getAllResponseHeaders()),E={data:!l||l==="text"||l==="json"?S.responseText:S.response,status:S.status,statusText:S.statusText,headers:h,config:e,request:S};Wm(function(T){n(T),v()},function(T){r(T),v()},E),S=null}"onloadend"in S?S.onloadend=x:S.onreadystatechange=function(){!S||S.readyState!==4||S.status===0&&!(S.responseURL&&S.responseURL.indexOf("file:")===0)||setTimeout(x)},S.onabort=function(){S&&(r(new V("Request aborted",V.ECONNABORTED,e,S)),S=null)},S.onerror=function(k){const E=k&&k.message?k.message:"Network Error",R=new V(E,V.ERR_NETWORK,e,S);R.event=k||null,r(R),S=null},S.ontimeout=function(){let k=s.timeout?"timeout of "+s.timeout+"ms exceeded":"timeout exceeded";const E=s.transitional||$m;s.timeoutErrorMessage&&(k=s.timeoutErrorMessage),r(new V(k,E.clarifyTimeoutError?V.ETIMEDOUT:V.ECONNABORTED,e,S)),S=null},i===void 0&&a.setContentType(null),"setRequestHeader"in S&&_.forEach(a.toJSON(),function(k,E){S.setRequestHeader(E,k)}),_.isUndefined(s.withCredentials)||(S.withCredentials=!!s.withCredentials),l&&l!=="json"&&(S.responseType=s.responseType),u&&([y,g]=Yo(u,!0),S.addEventListener("progress",y)),c&&S.upload&&([m,w]=Yo(c),S.upload.addEventListener("progress",m),S.upload.addEventListener("loadend",w)),(s.cancelToken||s.signal)&&(p=h=>{S&&(r(!h||h.type?new Ns(null,e,S):h),S.abort(),S=null)},s.cancelToken&&s.cancelToken.subscribe(p),s.signal&&(s.signal.aborted?p():s.signal.addEventListener("abort",p)));const f=xb(s.url);if(f&&Ue.protocols.indexOf(f)===-1){r(new V("Unsupported protocol "+f+":",V.ERR_BAD_REQUEST,e));return}S.send(i||null)})},Tb=(e,t)=>{const{length:n}=e=e?e.filter(Boolean):[];if(t||n){let r=new AbortController,s;const i=function(u){if(!s){s=!0,l();const p=u instanceof Error?u:this.reason;r.abort(p instanceof V?p:new Ns(p instanceof Error?p.message:p))}};let a=t&&setTimeout(()=>{a=null,i(new V(`timeout ${t} of ms exceeded`,V.ETIMEDOUT))},t);const l=()=>{e&&(a&&clearTimeout(a),a=null,e.forEach(u=>{u.unsubscribe?u.unsubscribe(i):u.removeEventListener("abort",i)}),e=null)};e.forEach(u=>u.addEventListener("abort",i));const{signal:c}=r;return c.unsubscribe=()=>_.asap(l),c}},_b=function*(e,t){let n=e.byteLength;if(n<t){yield e;return}let r=0,s;for(;r<n;)s=r+t,yield e.slice(r,s),r=s},Nb=async function*(e,t){for await(const n of Rb(e))yield*_b(n,t)},Rb=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}const t=e.getReader();try{for(;;){const{done:n,value:r}=await t.read();if(n)break;yield r}}finally{await t.cancel()}},cf=(e,t,n,r)=>{const s=Nb(e,t);let i=0,a,l=c=>{a||(a=!0,r&&r(c))};return new ReadableStream({async pull(c){try{const{done:u,value:p}=await s.next();if(u){l(),c.close();return}let m=p.byteLength;if(n){let y=i+=m;n(y)}c.enqueue(new Uint8Array(p))}catch(u){throw l(u),u}},cancel(c){return l(c),s.return()}},{highWaterMark:2})},uf=64*1024,{isFunction:io}=_,Pb=(({Request:e,Response:t})=>({Request:e,Response:t}))(_.global),{ReadableStream:df,TextEncoder:ff}=_.global,pf=(e,...t)=>{try{return!!e(...t)}catch{return!1}},zb=e=>{e=_.merge.call({skipUndefined:!0},Pb,e);const{fetch:t,Request:n,Response:r}=e,s=t?io(t):typeof fetch=="function",i=io(n),a=io(r);if(!s)return!1;const l=s&&io(df),c=s&&(typeof ff=="function"?(g=>v=>g.encode(v))(new ff):async g=>new Uint8Array(await new n(g).arrayBuffer())),u=i&&l&&pf(()=>{let g=!1;const v=new n(Ue.origin,{body:new df,method:"POST",get duplex(){return g=!0,"half"}}).headers.has("Content-Type");return g&&!v}),p=a&&l&&pf(()=>_.isReadableStream(new r("").body)),m={stream:p&&(g=>g.body)};s&&["text","arrayBuffer","blob","formData","stream"].forEach(g=>{!m[g]&&(m[g]=(v,S)=>{let x=v&&v[g];if(x)return x.call(v);throw new V(`Response type '${g}' is not supported`,V.ERR_NOT_SUPPORT,S)})});const y=async g=>{if(g==null)return 0;if(_.isBlob(g))return g.size;if(_.isSpecCompliantForm(g))return(await new n(Ue.origin,{method:"POST",body:g}).arrayBuffer()).byteLength;if(_.isArrayBufferView(g)||_.isArrayBuffer(g))return g.byteLength;if(_.isURLSearchParams(g)&&(g=g+""),_.isString(g))return(await c(g)).byteLength},w=async(g,v)=>{const S=_.toFiniteNumber(g.getContentLength());return S??y(v)};return async g=>{let{url:v,method:S,data:x,signal:f,cancelToken:h,timeout:k,onDownloadProgress:E,onUploadProgress:R,responseType:T,headers:N,withCredentials:C="same-origin",fetchOptions:P}=Vm(g),U=t||fetch;T=T?(T+"").toLowerCase():"text";let J=Tb([f,h&&h.toAbortSignal()],k),re=null;const xe=J&&J.unsubscribe&&(()=>{J.unsubscribe()});let ve;try{if(R&&u&&S!=="get"&&S!=="head"&&(ve=await w(N,x))!==0){let Y=new n(v,{method:"POST",body:x,duplex:"half"}),G;if(_.isFormData(x)&&(G=Y.headers.get("content-type"))&&N.setContentType(G),Y.body){const[Me,Ee]=of(ve,Yo(af(R)));x=cf(Y.body,uf,Me,Ee)}}_.isString(C)||(C=C?"include":"omit");const se=i&&"credentials"in n.prototype,me={...P,signal:J,method:S.toUpperCase(),headers:N.normalize().toJSON(),body:x,duplex:"half",credentials:se?C:void 0};re=i&&new n(v,me);let O=await(i?U(re,P):U(v,me));const W=p&&(T==="stream"||T==="response");if(p&&(E||W&&xe)){const Y={};["status","statusText","headers"].forEach(Bt=>{Y[Bt]=O[Bt]});const G=_.toFiniteNumber(O.headers.get("content-length")),[Me,Ee]=E&&of(G,Yo(af(E),!0))||[];O=new r(cf(O.body,uf,Me,()=>{Ee&&Ee(),xe&&xe()}),Y)}T=T||"text";let H=await m[_.findKey(m,T)||"text"](O,g);return!W&&xe&&xe(),await new Promise((Y,G)=>{Wm(Y,G,{data:H,headers:lt.from(O.headers),status:O.status,statusText:O.statusText,config:g,request:re})})}catch(se){throw xe&&xe(),se&&se.name==="TypeError"&&/Load failed|fetch/i.test(se.message)?Object.assign(new V("Network Error",V.ERR_NETWORK,g,re),{cause:se.cause||se}):V.from(se,se&&se.code,g,re)}}},Lb=new Map,qm=e=>{let t=e?e.env:{};const{fetch:n,Request:r,Response:s}=t,i=[r,s,n];let a=i.length,l=a,c,u,p=Lb;for(;l--;)c=i[l],u=p.get(c),u===void 0&&p.set(c,u=l?new Map:zb(t)),p=u;return u};qm();const ic={http:Jv,xhr:Eb,fetch:{get:qm}};_.forEach(ic,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const hf=e=>`- ${e}`,Ob=e=>_.isFunction(e)||e===null||e===!1,Qm={getAdapter:(e,t)=>{e=_.isArray(e)?e:[e];const{length:n}=e;let r,s;const i={};for(let a=0;a<n;a++){r=e[a];let l;if(s=r,!Ob(r)&&(s=ic[(l=String(r)).toLowerCase()],s===void 0))throw new V(`Unknown adapter '${l}'`);if(s&&(_.isFunction(s)||(s=s.get(t))))break;i[l||"#"+a]=s}if(!s){const a=Object.entries(i).map(([c,u])=>`adapter ${c} `+(u===!1?"is not supported by the environment":"is not available in the build"));let l=n?a.length>1?`since :
`+a.map(hf).join(`
`):" "+hf(a[0]):"as no adapter specified";throw new V("There is no suitable adapter to dispatch the request "+l,"ERR_NOT_SUPPORT")}return s},adapters:ic};function el(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new Ns(null,e)}function mf(e){return el(e),e.headers=lt.from(e.headers),e.data=Za.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),Qm.getAdapter(e.adapter||Fi.adapter,e)(e).then(function(r){return el(e),r.data=Za.call(e,e.transformResponse,r),r.headers=lt.from(r.headers),r},function(r){return Um(r)||(el(e),r&&r.response&&(r.response.data=Za.call(e,e.transformResponse,r.response),r.response.headers=lt.from(r.response.headers))),Promise.reject(r)})}const Km="1.12.2",ka={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{ka[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}});const gf={};ka.transitional=function(t,n,r){function s(i,a){return"[Axios v"+Km+"] Transitional option '"+i+"'"+a+(r?". "+r:"")}return(i,a,l)=>{if(t===!1)throw new V(s(a," has been removed"+(n?" in "+n:"")),V.ERR_DEPRECATED);return n&&!gf[a]&&(gf[a]=!0,console.warn(s(a," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(i,a,l):!0}};ka.spelling=function(t){return(n,r)=>(console.warn(`${r} is likely a misspelling of ${t}`),!0)};function Ib(e,t,n){if(typeof e!="object")throw new V("options must be an object",V.ERR_BAD_OPTION_VALUE);const r=Object.keys(e);let s=r.length;for(;s-- >0;){const i=r[s],a=t[i];if(a){const l=e[i],c=l===void 0||a(l,i,e);if(c!==!0)throw new V("option "+i+" must be "+c,V.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new V("Unknown option "+i,V.ERR_BAD_OPTION)}}const ko={assertOptions:Ib,validators:ka},Wt=ko.validators;let br=class{constructor(t){this.defaults=t||{},this.interceptors={request:new rf,response:new rf}}async request(t,n){try{return await this._request(t,n)}catch(r){if(r instanceof Error){let s={};Error.captureStackTrace?Error.captureStackTrace(s):s=new Error;const i=s.stack?s.stack.replace(/^.+\n/,""):"";try{r.stack?i&&!String(r.stack).endsWith(i.replace(/^.+\n.+\n/,""))&&(r.stack+=`
`+i):r.stack=i}catch{}}throw r}}_request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=Tr(this.defaults,n);const{transitional:r,paramsSerializer:s,headers:i}=n;r!==void 0&&ko.assertOptions(r,{silentJSONParsing:Wt.transitional(Wt.boolean),forcedJSONParsing:Wt.transitional(Wt.boolean),clarifyTimeoutError:Wt.transitional(Wt.boolean)},!1),s!=null&&(_.isFunction(s)?n.paramsSerializer={serialize:s}:ko.assertOptions(s,{encode:Wt.function,serialize:Wt.function},!0)),n.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?n.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:n.allowAbsoluteUrls=!0),ko.assertOptions(n,{baseUrl:Wt.spelling("baseURL"),withXsrfToken:Wt.spelling("withXSRFToken")},!0),n.method=(n.method||this.defaults.method||"get").toLowerCase();let a=i&&_.merge(i.common,i[n.method]);i&&_.forEach(["delete","get","head","post","put","patch","common"],g=>{delete i[g]}),n.headers=lt.concat(a,i);const l=[];let c=!0;this.interceptors.request.forEach(function(v){typeof v.runWhen=="function"&&v.runWhen(n)===!1||(c=c&&v.synchronous,l.unshift(v.fulfilled,v.rejected))});const u=[];this.interceptors.response.forEach(function(v){u.push(v.fulfilled,v.rejected)});let p,m=0,y;if(!c){const g=[mf.bind(this),void 0];for(g.unshift(...l),g.push(...u),y=g.length,p=Promise.resolve(n);m<y;)p=p.then(g[m++],g[m++]);return p}y=l.length;let w=n;for(;m<y;){const g=l[m++],v=l[m++];try{w=g(w)}catch(S){v.call(this,S);break}}try{p=mf.call(this,w)}catch(g){return Promise.reject(g)}for(m=0,y=u.length;m<y;)p=p.then(u[m++],u[m++]);return p}getUri(t){t=Tr(this.defaults,t);const n=Hm(t.baseURL,t.url,t.allowAbsoluteUrls);return Dm(n,t.params,t.paramsSerializer)}};_.forEach(["delete","get","head","options"],function(t){br.prototype[t]=function(n,r){return this.request(Tr(r||{},{method:t,url:n,data:(r||{}).data}))}});_.forEach(["post","put","patch"],function(t){function n(r){return function(i,a,l){return this.request(Tr(l||{},{method:t,headers:r?{"Content-Type":"multipart/form-data"}:{},url:i,data:a}))}}br.prototype[t]=n(),br.prototype[t+"Form"]=n(!0)});let Ab=class Ym{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(i){n=i});const r=this;this.promise.then(s=>{if(!r._listeners)return;let i=r._listeners.length;for(;i-- >0;)r._listeners[i](s);r._listeners=null}),this.promise.then=s=>{let i;const a=new Promise(l=>{r.subscribe(l),i=l}).then(s);return a.cancel=function(){r.unsubscribe(i)},a},t(function(i,a,l){r.reason||(r.reason=new Ns(i,a,l),n(r.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}toAbortSignal(){const t=new AbortController,n=r=>{t.abort(r)};return this.subscribe(n),t.signal.unsubscribe=()=>this.unsubscribe(n),t.signal}static source(){let t;return{token:new Ym(function(s){t=s}),cancel:t}}};function Mb(e){return function(n){return e.apply(null,n)}}function Fb(e){return _.isObject(e)&&e.isAxiosError===!0}const oc={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(oc).forEach(([e,t])=>{oc[t]=e});function Jm(e){const t=new br(e),n=Tm(br.prototype.request,t);return _.extend(n,br.prototype,t,{allOwnKeys:!0}),_.extend(n,t,null,{allOwnKeys:!0}),n.create=function(s){return Jm(Tr(e,s))},n}const te=Jm(Fi);te.Axios=br;te.CanceledError=Ns;te.CancelToken=Ab;te.isCancel=Um;te.VERSION=Km;te.toFormData=wa;te.AxiosError=V;te.Cancel=te.CanceledError;te.all=function(t){return Promise.all(t)};te.spread=Mb;te.isAxiosError=Fb;te.mergeConfig=Tr;te.AxiosHeaders=lt;te.formToJSON=e=>Bm(_.isHTMLForm(e)?new FormData(e):e);te.getAdapter=Qm.getAdapter;te.HttpStatusCode=oc;te.default=te;const{Axios:Xw,AxiosError:Gw,CanceledError:Zw,isCancel:e2,CancelToken:t2,VERSION:n2,all:r2,Cancel:s2,isAxiosError:i2,spread:o2,toFormData:a2,AxiosHeaders:l2,HttpStatusCode:c2,formToJSON:u2,getAdapter:d2,mergeConfig:f2}=te;var Rs=class{constructor(){this.listeners=new Set,this.subscribe=this.subscribe.bind(this)}subscribe(e){return this.listeners.add(e),this.onSubscribe(),()=>{this.listeners.delete(e),this.onUnsubscribe()}}hasListeners(){return this.listeners.size>0}onSubscribe(){}onUnsubscribe(){}},Db={setTimeout:(e,t)=>setTimeout(e,t),clearTimeout:e=>clearTimeout(e),setInterval:(e,t)=>setInterval(e,t),clearInterval:e=>clearInterval(e)},En,wc,zf,$b=(zf=class{constructor(){D(this,En,Db);D(this,wc,!1)}setTimeoutProvider(e){A(this,En,e)}setTimeout(e,t){return j(this,En).setTimeout(e,t)}clearTimeout(e){j(this,En).clearTimeout(e)}setInterval(e,t){return j(this,En).setInterval(e,t)}clearInterval(e){j(this,En).clearInterval(e)}},En=new WeakMap,wc=new WeakMap,zf),or=new $b;function Bb(e){setTimeout(e,0)}var _r=typeof window>"u"||"Deno"in globalThis;function Qe(){}function Ub(e,t){return typeof e=="function"?e(t):e}function ac(e){return typeof e=="number"&&e>=0&&e!==1/0}function Xm(e,t){return Math.max(e+(t||0)-Date.now(),0)}function Qn(e,t){return typeof e=="function"?e(t):e}function vt(e,t){return typeof e=="function"?e(t):e}function yf(e,t){const{type:n="all",exact:r,fetchStatus:s,predicate:i,queryKey:a,stale:l}=e;if(a){if(r){if(t.queryHash!==Cu(a,t.options))return!1}else if(!ki(t.queryKey,a))return!1}if(n!=="all"){const c=t.isActive();if(n==="active"&&!c||n==="inactive"&&c)return!1}return!(typeof l=="boolean"&&t.isStale()!==l||s&&s!==t.state.fetchStatus||i&&!i(t))}function xf(e,t){const{exact:n,status:r,predicate:s,mutationKey:i}=e;if(i){if(!t.options.mutationKey)return!1;if(n){if(Nr(t.options.mutationKey)!==Nr(i))return!1}else if(!ki(t.options.mutationKey,i))return!1}return!(r&&t.state.status!==r||s&&!s(t))}function Cu(e,t){return((t==null?void 0:t.queryKeyHashFn)||Nr)(e)}function Nr(e){return JSON.stringify(e,(t,n)=>lc(n)?Object.keys(n).sort().reduce((r,s)=>(r[s]=n[s],r),{}):n)}function ki(e,t){return e===t?!0:typeof e!=typeof t?!1:e&&t&&typeof e=="object"&&typeof t=="object"?Object.keys(t).every(n=>ki(e[n],t[n])):!1}var Wb=Object.prototype.hasOwnProperty;function Gm(e,t){if(e===t)return e;const n=vf(e)&&vf(t);if(!n&&!(lc(e)&&lc(t)))return t;const s=(n?e:Object.keys(e)).length,i=n?t:Object.keys(t),a=i.length,l=n?new Array(a):{};let c=0;for(let u=0;u<a;u++){const p=n?u:i[u],m=e[p],y=t[p];if(m===y){l[p]=m,(n?u<s:Wb.call(e,p))&&c++;continue}if(m===null||y===null||typeof m!="object"||typeof y!="object"){l[p]=y;continue}const w=Gm(m,y);l[p]=w,w===m&&c++}return s===a&&c===s?e:l}function Jo(e,t){if(!t||Object.keys(e).length!==Object.keys(t).length)return!1;for(const n in e)if(e[n]!==t[n])return!1;return!0}function vf(e){return Array.isArray(e)&&e.length===Object.keys(e).length}function lc(e){if(!bf(e))return!1;const t=e.constructor;if(t===void 0)return!0;const n=t.prototype;return!(!bf(n)||!n.hasOwnProperty("isPrototypeOf")||Object.getPrototypeOf(e)!==Object.prototype)}function bf(e){return Object.prototype.toString.call(e)==="[object Object]"}function Hb(e){return new Promise(t=>{or.setTimeout(t,e)})}function cc(e,t,n){return typeof n.structuralSharing=="function"?n.structuralSharing(e,t):n.structuralSharing!==!1?Gm(e,t):t}function Vb(e,t,n=0){const r=[...e,t];return n&&r.length>n?r.slice(1):r}function qb(e,t,n=0){const r=[t,...e];return n&&r.length>n?r.slice(0,-1):r}var Eu=Symbol();function Zm(e,t){return!e.queryFn&&(t!=null&&t.initialPromise)?()=>t.initialPromise:!e.queryFn||e.queryFn===Eu?()=>Promise.reject(new Error(`Missing queryFn: '${e.queryHash}'`)):e.queryFn}function e0(e,t){return typeof e=="function"?e(...t):!!e}var ar,Tn,ns,Lf,Qb=(Lf=class extends Rs{constructor(){super();D(this,ar);D(this,Tn);D(this,ns);A(this,ns,t=>{if(!_r&&window.addEventListener){const n=()=>t();return window.addEventListener("visibilitychange",n,!1),()=>{window.removeEventListener("visibilitychange",n)}}})}onSubscribe(){j(this,Tn)||this.setEventListener(j(this,ns))}onUnsubscribe(){var t;this.hasListeners()||((t=j(this,Tn))==null||t.call(this),A(this,Tn,void 0))}setEventListener(t){var n;A(this,ns,t),(n=j(this,Tn))==null||n.call(this),A(this,Tn,t(r=>{typeof r=="boolean"?this.setFocused(r):this.onFocus()}))}setFocused(t){j(this,ar)!==t&&(A(this,ar,t),this.onFocus())}onFocus(){const t=this.isFocused();this.listeners.forEach(n=>{n(t)})}isFocused(){var t;return typeof j(this,ar)=="boolean"?j(this,ar):((t=globalThis.document)==null?void 0:t.visibilityState)!=="hidden"}},ar=new WeakMap,Tn=new WeakMap,ns=new WeakMap,Lf),Tu=new Qb;function uc(){let e,t;const n=new Promise((s,i)=>{e=s,t=i});n.status="pending",n.catch(()=>{});function r(s){Object.assign(n,s),delete n.resolve,delete n.reject}return n.resolve=s=>{r({status:"fulfilled",value:s}),e(s)},n.reject=s=>{r({status:"rejected",reason:s}),t(s)},n}var Kb=Bb;function Yb(){let e=[],t=0,n=l=>{l()},r=l=>{l()},s=Kb;const i=l=>{t?e.push(l):s(()=>{n(l)})},a=()=>{const l=e;e=[],l.length&&s(()=>{r(()=>{l.forEach(c=>{n(c)})})})};return{batch:l=>{let c;t++;try{c=l()}finally{t--,t||a()}return c},batchCalls:l=>(...c)=>{i(()=>{l(...c)})},schedule:i,setNotifyFunction:l=>{n=l},setBatchNotifyFunction:l=>{r=l},setScheduler:l=>{s=l}}}var je=Yb(),rs,_n,ss,Of,Jb=(Of=class extends Rs{constructor(){super();D(this,rs,!0);D(this,_n);D(this,ss);A(this,ss,t=>{if(!_r&&window.addEventListener){const n=()=>t(!0),r=()=>t(!1);return window.addEventListener("online",n,!1),window.addEventListener("offline",r,!1),()=>{window.removeEventListener("online",n),window.removeEventListener("offline",r)}}})}onSubscribe(){j(this,_n)||this.setEventListener(j(this,ss))}onUnsubscribe(){var t;this.hasListeners()||((t=j(this,_n))==null||t.call(this),A(this,_n,void 0))}setEventListener(t){var n;A(this,ss,t),(n=j(this,_n))==null||n.call(this),A(this,_n,t(this.setOnline.bind(this)))}setOnline(t){j(this,rs)!==t&&(A(this,rs,t),this.listeners.forEach(r=>{r(t)}))}isOnline(){return j(this,rs)}},rs=new WeakMap,_n=new WeakMap,ss=new WeakMap,Of),Xo=new Jb;function Xb(e){return Math.min(1e3*2**e,3e4)}function t0(e){return(e??"online")==="online"?Xo.isOnline():!0}var dc=class extends Error{constructor(e){super("CancelledError"),this.revert=e==null?void 0:e.revert,this.silent=e==null?void 0:e.silent}};function n0(e){let t=!1,n=0,r;const s=uc(),i=()=>s.status!=="pending",a=v=>{var S;if(!i()){const x=new dc(v);y(x),(S=e.onCancel)==null||S.call(e,x)}},l=()=>{t=!0},c=()=>{t=!1},u=()=>Tu.isFocused()&&(e.networkMode==="always"||Xo.isOnline())&&e.canRun(),p=()=>t0(e.networkMode)&&e.canRun(),m=v=>{i()||(r==null||r(),s.resolve(v))},y=v=>{i()||(r==null||r(),s.reject(v))},w=()=>new Promise(v=>{var S;r=x=>{(i()||u())&&v(x)},(S=e.onPause)==null||S.call(e)}).then(()=>{var v;r=void 0,i()||(v=e.onContinue)==null||v.call(e)}),g=()=>{if(i())return;let v;const S=n===0?e.initialPromise:void 0;try{v=S??e.fn()}catch(x){v=Promise.reject(x)}Promise.resolve(v).then(m).catch(x=>{var R;if(i())return;const f=e.retry??(_r?0:3),h=e.retryDelay??Xb,k=typeof h=="function"?h(n,x):h,E=f===!0||typeof f=="number"&&n<f||typeof f=="function"&&f(n,x);if(t||!E){y(x);return}n++,(R=e.onFail)==null||R.call(e,n,x),Hb(k).then(()=>u()?void 0:w()).then(()=>{t?y(x):g()})})};return{promise:s,status:()=>s.status,cancel:a,continue:()=>(r==null||r(),s),cancelRetry:l,continueRetry:c,canStart:p,start:()=>(p()?g():w().then(g),s)}}var lr,If,r0=(If=class{constructor(){D(this,lr)}destroy(){this.clearGcTimeout()}scheduleGc(){this.clearGcTimeout(),ac(this.gcTime)&&A(this,lr,or.setTimeout(()=>{this.optionalRemove()},this.gcTime))}updateGcTime(e){this.gcTime=Math.max(this.gcTime||0,e??(_r?1/0:5*60*1e3))}clearGcTimeout(){j(this,lr)&&(or.clearTimeout(j(this,lr)),A(this,lr,void 0))}},lr=new WeakMap,If),cr,is,xt,ur,_e,Si,dr,Pt,Gt,Af,Gb=(Af=class extends r0{constructor(t){super();D(this,Pt);D(this,cr);D(this,is);D(this,xt);D(this,ur);D(this,_e);D(this,Si);D(this,dr);A(this,dr,!1),A(this,Si,t.defaultOptions),this.setOptions(t.options),this.observers=[],A(this,ur,t.client),A(this,xt,j(this,ur).getQueryCache()),this.queryKey=t.queryKey,this.queryHash=t.queryHash,A(this,cr,wf(this.options)),this.state=t.state??j(this,cr),this.scheduleGc()}get meta(){return this.options.meta}get promise(){var t;return(t=j(this,_e))==null?void 0:t.promise}setOptions(t){if(this.options={...j(this,Si),...t},this.updateGcTime(this.options.gcTime),this.state&&this.state.data===void 0){const n=wf(this.options);n.data!==void 0&&(this.setData(n.data,{updatedAt:n.dataUpdatedAt,manual:!0}),A(this,cr,n))}}optionalRemove(){!this.observers.length&&this.state.fetchStatus==="idle"&&j(this,xt).remove(this)}setData(t,n){const r=cc(this.state.data,t,this.options);return q(this,Pt,Gt).call(this,{data:r,type:"success",dataUpdatedAt:n==null?void 0:n.updatedAt,manual:n==null?void 0:n.manual}),r}setState(t,n){q(this,Pt,Gt).call(this,{type:"setState",state:t,setStateOptions:n})}cancel(t){var r,s;const n=(r=j(this,_e))==null?void 0:r.promise;return(s=j(this,_e))==null||s.cancel(t),n?n.then(Qe).catch(Qe):Promise.resolve()}destroy(){super.destroy(),this.cancel({silent:!0})}reset(){this.destroy(),this.setState(j(this,cr))}isActive(){return this.observers.some(t=>vt(t.options.enabled,this)!==!1)}isDisabled(){return this.getObserversCount()>0?!this.isActive():this.options.queryFn===Eu||this.state.dataUpdateCount+this.state.errorUpdateCount===0}isStatic(){return this.getObserversCount()>0?this.observers.some(t=>Qn(t.options.staleTime,this)==="static"):!1}isStale(){return this.getObserversCount()>0?this.observers.some(t=>t.getCurrentResult().isStale):this.state.data===void 0||this.state.isInvalidated}isStaleByTime(t=0){return this.state.data===void 0?!0:t==="static"?!1:this.state.isInvalidated?!0:!Xm(this.state.dataUpdatedAt,t)}onFocus(){var n;const t=this.observers.find(r=>r.shouldFetchOnWindowFocus());t==null||t.refetch({cancelRefetch:!1}),(n=j(this,_e))==null||n.continue()}onOnline(){var n;const t=this.observers.find(r=>r.shouldFetchOnReconnect());t==null||t.refetch({cancelRefetch:!1}),(n=j(this,_e))==null||n.continue()}addObserver(t){this.observers.includes(t)||(this.observers.push(t),this.clearGcTimeout(),j(this,xt).notify({type:"observerAdded",query:this,observer:t}))}removeObserver(t){this.observers.includes(t)&&(this.observers=this.observers.filter(n=>n!==t),this.observers.length||(j(this,_e)&&(j(this,dr)?j(this,_e).cancel({revert:!0}):j(this,_e).cancelRetry()),this.scheduleGc()),j(this,xt).notify({type:"observerRemoved",query:this,observer:t}))}getObserversCount(){return this.observers.length}invalidate(){this.state.isInvalidated||q(this,Pt,Gt).call(this,{type:"invalidate"})}async fetch(t,n){var c,u,p,m,y,w,g,v,S,x,f,h;if(this.state.fetchStatus!=="idle"&&((c=j(this,_e))==null?void 0:c.status())!=="rejected"){if(this.state.data!==void 0&&(n!=null&&n.cancelRefetch))this.cancel({silent:!0});else if(j(this,_e))return j(this,_e).continueRetry(),j(this,_e).promise}if(t&&this.setOptions(t),!this.options.queryFn){const k=this.observers.find(E=>E.options.queryFn);k&&this.setOptions(k.options)}const r=new AbortController,s=k=>{Object.defineProperty(k,"signal",{enumerable:!0,get:()=>(A(this,dr,!0),r.signal)})},i=()=>{const k=Zm(this.options,n),R=(()=>{const T={client:j(this,ur),queryKey:this.queryKey,meta:this.meta};return s(T),T})();return A(this,dr,!1),this.options.persister?this.options.persister(k,R,this):k(R)},l=(()=>{const k={fetchOptions:n,options:this.options,queryKey:this.queryKey,client:j(this,ur),state:this.state,fetchFn:i};return s(k),k})();(u=this.options.behavior)==null||u.onFetch(l,this),A(this,is,this.state),(this.state.fetchStatus==="idle"||this.state.fetchMeta!==((p=l.fetchOptions)==null?void 0:p.meta))&&q(this,Pt,Gt).call(this,{type:"fetch",meta:(m=l.fetchOptions)==null?void 0:m.meta}),A(this,_e,n0({initialPromise:n==null?void 0:n.initialPromise,fn:l.fetchFn,onCancel:k=>{k instanceof dc&&k.revert&&this.setState({...j(this,is),fetchStatus:"idle"}),r.abort()},onFail:(k,E)=>{q(this,Pt,Gt).call(this,{type:"failed",failureCount:k,error:E})},onPause:()=>{q(this,Pt,Gt).call(this,{type:"pause"})},onContinue:()=>{q(this,Pt,Gt).call(this,{type:"continue"})},retry:l.options.retry,retryDelay:l.options.retryDelay,networkMode:l.options.networkMode,canRun:()=>!0}));try{const k=await j(this,_e).start();if(k===void 0)throw new Error(`${this.queryHash} data is undefined`);return this.setData(k),(w=(y=j(this,xt).config).onSuccess)==null||w.call(y,k,this),(v=(g=j(this,xt).config).onSettled)==null||v.call(g,k,this.state.error,this),k}catch(k){if(k instanceof dc){if(k.silent)return j(this,_e).promise;if(k.revert){if(this.state.data===void 0)throw k;return this.state.data}}throw q(this,Pt,Gt).call(this,{type:"error",error:k}),(x=(S=j(this,xt).config).onError)==null||x.call(S,k,this),(h=(f=j(this,xt).config).onSettled)==null||h.call(f,this.state.data,k,this),k}finally{this.scheduleGc()}}},cr=new WeakMap,is=new WeakMap,xt=new WeakMap,ur=new WeakMap,_e=new WeakMap,Si=new WeakMap,dr=new WeakMap,Pt=new WeakSet,Gt=function(t){const n=r=>{switch(t.type){case"failed":return{...r,fetchFailureCount:t.failureCount,fetchFailureReason:t.error};case"pause":return{...r,fetchStatus:"paused"};case"continue":return{...r,fetchStatus:"fetching"};case"fetch":return{...r,...s0(r.data,this.options),fetchMeta:t.meta??null};case"success":const s={...r,data:t.data,dataUpdateCount:r.dataUpdateCount+1,dataUpdatedAt:t.dataUpdatedAt??Date.now(),error:null,isInvalidated:!1,status:"success",...!t.manual&&{fetchStatus:"idle",fetchFailureCount:0,fetchFailureReason:null}};return A(this,is,t.manual?s:void 0),s;case"error":const i=t.error;return{...r,error:i,errorUpdateCount:r.errorUpdateCount+1,errorUpdatedAt:Date.now(),fetchFailureCount:r.fetchFailureCount+1,fetchFailureReason:i,fetchStatus:"idle",status:"error"};case"invalidate":return{...r,isInvalidated:!0};case"setState":return{...r,...t.state}}};this.state=n(this.state),je.batch(()=>{this.observers.forEach(r=>{r.onQueryUpdate()}),j(this,xt).notify({query:this,type:"updated",action:t})})},Af);function s0(e,t){return{fetchFailureCount:0,fetchFailureReason:null,fetchStatus:t0(t.networkMode)?"fetching":"paused",...e===void 0&&{error:null,status:"pending"}}}function wf(e){const t=typeof e.initialData=="function"?e.initialData():e.initialData,n=t!==void 0,r=n?typeof e.initialDataUpdatedAt=="function"?e.initialDataUpdatedAt():e.initialDataUpdatedAt:0;return{data:t,dataUpdateCount:0,dataUpdatedAt:n?r??Date.now():0,error:null,errorUpdateCount:0,errorUpdatedAt:0,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:null,isInvalidated:!1,status:n?"success":"pending",fetchStatus:"idle"}}var et,K,ji,He,fr,os,tn,Nn,Ci,as,ls,pr,hr,Rn,cs,Z,Vs,fc,pc,hc,mc,gc,yc,xc,i0,Mf,Zb=(Mf=class extends Rs{constructor(t,n){super();D(this,Z);D(this,et);D(this,K);D(this,ji);D(this,He);D(this,fr);D(this,os);D(this,tn);D(this,Nn);D(this,Ci);D(this,as);D(this,ls);D(this,pr);D(this,hr);D(this,Rn);D(this,cs,new Set);this.options=n,A(this,et,t),A(this,Nn,null),A(this,tn,uc()),this.bindMethods(),this.setOptions(n)}bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.size===1&&(j(this,K).addObserver(this),kf(j(this,K),this.options)?q(this,Z,Vs).call(this):this.updateResult(),q(this,Z,mc).call(this))}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return vc(j(this,K),this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return vc(j(this,K),this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,q(this,Z,gc).call(this),q(this,Z,yc).call(this),j(this,K).removeObserver(this)}setOptions(t){const n=this.options,r=j(this,K);if(this.options=j(this,et).defaultQueryOptions(t),this.options.enabled!==void 0&&typeof this.options.enabled!="boolean"&&typeof this.options.enabled!="function"&&typeof vt(this.options.enabled,j(this,K))!="boolean")throw new Error("Expected enabled to be a boolean or a callback that returns a boolean");q(this,Z,xc).call(this),j(this,K).setOptions(this.options),n._defaulted&&!Jo(this.options,n)&&j(this,et).getQueryCache().notify({type:"observerOptionsUpdated",query:j(this,K),observer:this});const s=this.hasListeners();s&&Sf(j(this,K),r,this.options,n)&&q(this,Z,Vs).call(this),this.updateResult(),s&&(j(this,K)!==r||vt(this.options.enabled,j(this,K))!==vt(n.enabled,j(this,K))||Qn(this.options.staleTime,j(this,K))!==Qn(n.staleTime,j(this,K)))&&q(this,Z,fc).call(this);const i=q(this,Z,pc).call(this);s&&(j(this,K)!==r||vt(this.options.enabled,j(this,K))!==vt(n.enabled,j(this,K))||i!==j(this,Rn))&&q(this,Z,hc).call(this,i)}getOptimisticResult(t){const n=j(this,et).getQueryCache().build(j(this,et),t),r=this.createResult(n,t);return tw(this,r)&&(A(this,He,r),A(this,os,this.options),A(this,fr,j(this,K).state)),r}getCurrentResult(){return j(this,He)}trackResult(t,n){return new Proxy(t,{get:(r,s)=>(this.trackProp(s),n==null||n(s),s==="promise"&&!this.options.experimental_prefetchInRender&&j(this,tn).status==="pending"&&j(this,tn).reject(new Error("experimental_prefetchInRender feature flag is not enabled")),Reflect.get(r,s))})}trackProp(t){j(this,cs).add(t)}getCurrentQuery(){return j(this,K)}refetch({...t}={}){return this.fetch({...t})}fetchOptimistic(t){const n=j(this,et).defaultQueryOptions(t),r=j(this,et).getQueryCache().build(j(this,et),n);return r.fetch().then(()=>this.createResult(r,n))}fetch(t){return q(this,Z,Vs).call(this,{...t,cancelRefetch:t.cancelRefetch??!0}).then(()=>(this.updateResult(),j(this,He)))}createResult(t,n){var C;const r=j(this,K),s=this.options,i=j(this,He),a=j(this,fr),l=j(this,os),u=t!==r?t.state:j(this,ji),{state:p}=t;let m={...p},y=!1,w;if(n._optimisticResults){const P=this.hasListeners(),U=!P&&kf(t,n),J=P&&Sf(t,r,n,s);(U||J)&&(m={...m,...s0(p.data,t.options)}),n._optimisticResults==="isRestoring"&&(m.fetchStatus="idle")}let{error:g,errorUpdatedAt:v,status:S}=m;w=m.data;let x=!1;if(n.placeholderData!==void 0&&w===void 0&&S==="pending"){let P;i!=null&&i.isPlaceholderData&&n.placeholderData===(l==null?void 0:l.placeholderData)?(P=i.data,x=!0):P=typeof n.placeholderData=="function"?n.placeholderData((C=j(this,ls))==null?void 0:C.state.data,j(this,ls)):n.placeholderData,P!==void 0&&(S="success",w=cc(i==null?void 0:i.data,P,n),y=!0)}if(n.select&&w!==void 0&&!x)if(i&&w===(a==null?void 0:a.data)&&n.select===j(this,Ci))w=j(this,as);else try{A(this,Ci,n.select),w=n.select(w),w=cc(i==null?void 0:i.data,w,n),A(this,as,w),A(this,Nn,null)}catch(P){A(this,Nn,P)}j(this,Nn)&&(g=j(this,Nn),w=j(this,as),v=Date.now(),S="error");const f=m.fetchStatus==="fetching",h=S==="pending",k=S==="error",E=h&&f,R=w!==void 0,N={status:S,fetchStatus:m.fetchStatus,isPending:h,isSuccess:S==="success",isError:k,isInitialLoading:E,isLoading:E,data:w,dataUpdatedAt:m.dataUpdatedAt,error:g,errorUpdatedAt:v,failureCount:m.fetchFailureCount,failureReason:m.fetchFailureReason,errorUpdateCount:m.errorUpdateCount,isFetched:m.dataUpdateCount>0||m.errorUpdateCount>0,isFetchedAfterMount:m.dataUpdateCount>u.dataUpdateCount||m.errorUpdateCount>u.errorUpdateCount,isFetching:f,isRefetching:f&&!h,isLoadingError:k&&!R,isPaused:m.fetchStatus==="paused",isPlaceholderData:y,isRefetchError:k&&R,isStale:_u(t,n),refetch:this.refetch,promise:j(this,tn),isEnabled:vt(n.enabled,t)!==!1};if(this.options.experimental_prefetchInRender){const P=re=>{N.status==="error"?re.reject(N.error):N.data!==void 0&&re.resolve(N.data)},U=()=>{const re=A(this,tn,N.promise=uc());P(re)},J=j(this,tn);switch(J.status){case"pending":t.queryHash===r.queryHash&&P(J);break;case"fulfilled":(N.status==="error"||N.data!==J.value)&&U();break;case"rejected":(N.status!=="error"||N.error!==J.reason)&&U();break}}return N}updateResult(){const t=j(this,He),n=this.createResult(j(this,K),this.options);if(A(this,fr,j(this,K).state),A(this,os,this.options),j(this,fr).data!==void 0&&A(this,ls,j(this,K)),Jo(n,t))return;A(this,He,n);const r=()=>{if(!t)return!0;const{notifyOnChangeProps:s}=this.options,i=typeof s=="function"?s():s;if(i==="all"||!i&&!j(this,cs).size)return!0;const a=new Set(i??j(this,cs));return this.options.throwOnError&&a.add("error"),Object.keys(j(this,He)).some(l=>{const c=l;return j(this,He)[c]!==t[c]&&a.has(c)})};q(this,Z,i0).call(this,{listeners:r()})}onQueryUpdate(){this.updateResult(),this.hasListeners()&&q(this,Z,mc).call(this)}},et=new WeakMap,K=new WeakMap,ji=new WeakMap,He=new WeakMap,fr=new WeakMap,os=new WeakMap,tn=new WeakMap,Nn=new WeakMap,Ci=new WeakMap,as=new WeakMap,ls=new WeakMap,pr=new WeakMap,hr=new WeakMap,Rn=new WeakMap,cs=new WeakMap,Z=new WeakSet,Vs=function(t){q(this,Z,xc).call(this);let n=j(this,K).fetch(this.options,t);return t!=null&&t.throwOnError||(n=n.catch(Qe)),n},fc=function(){q(this,Z,gc).call(this);const t=Qn(this.options.staleTime,j(this,K));if(_r||j(this,He).isStale||!ac(t))return;const r=Xm(j(this,He).dataUpdatedAt,t)+1;A(this,pr,or.setTimeout(()=>{j(this,He).isStale||this.updateResult()},r))},pc=function(){return(typeof this.options.refetchInterval=="function"?this.options.refetchInterval(j(this,K)):this.options.refetchInterval)??!1},hc=function(t){q(this,Z,yc).call(this),A(this,Rn,t),!(_r||vt(this.options.enabled,j(this,K))===!1||!ac(j(this,Rn))||j(this,Rn)===0)&&A(this,hr,or.setInterval(()=>{(this.options.refetchIntervalInBackground||Tu.isFocused())&&q(this,Z,Vs).call(this)},j(this,Rn)))},mc=function(){q(this,Z,fc).call(this),q(this,Z,hc).call(this,q(this,Z,pc).call(this))},gc=function(){j(this,pr)&&(or.clearTimeout(j(this,pr)),A(this,pr,void 0))},yc=function(){j(this,hr)&&(or.clearInterval(j(this,hr)),A(this,hr,void 0))},xc=function(){const t=j(this,et).getQueryCache().build(j(this,et),this.options);if(t===j(this,K))return;const n=j(this,K);A(this,K,t),A(this,ji,t.state),this.hasListeners()&&(n==null||n.removeObserver(this),t.addObserver(this))},i0=function(t){je.batch(()=>{t.listeners&&this.listeners.forEach(n=>{n(j(this,He))}),j(this,et).getQueryCache().notify({query:j(this,K),type:"observerResultsUpdated"})})},Mf);function ew(e,t){return vt(t.enabled,e)!==!1&&e.state.data===void 0&&!(e.state.status==="error"&&t.retryOnMount===!1)}function kf(e,t){return ew(e,t)||e.state.data!==void 0&&vc(e,t,t.refetchOnMount)}function vc(e,t,n){if(vt(t.enabled,e)!==!1&&Qn(t.staleTime,e)!=="static"){const r=typeof n=="function"?n(e):n;return r==="always"||r!==!1&&_u(e,t)}return!1}function Sf(e,t,n,r){return(e!==t||vt(r.enabled,e)===!1)&&(!n.suspense||e.state.status!=="error")&&_u(e,n)}function _u(e,t){return vt(t.enabled,e)!==!1&&e.isStaleByTime(Qn(t.staleTime,e))}function tw(e,t){return!Jo(e.getCurrentResult(),t)}function jf(e){return{onFetch:(t,n)=>{var p,m,y,w,g;const r=t.options,s=(y=(m=(p=t.fetchOptions)==null?void 0:p.meta)==null?void 0:m.fetchMore)==null?void 0:y.direction,i=((w=t.state.data)==null?void 0:w.pages)||[],a=((g=t.state.data)==null?void 0:g.pageParams)||[];let l={pages:[],pageParams:[]},c=0;const u=async()=>{let v=!1;const S=h=>{Object.defineProperty(h,"signal",{enumerable:!0,get:()=>(t.signal.aborted?v=!0:t.signal.addEventListener("abort",()=>{v=!0}),t.signal)})},x=Zm(t.options,t.fetchOptions),f=async(h,k,E)=>{if(v)return Promise.reject();if(k==null&&h.pages.length)return Promise.resolve(h);const T=(()=>{const U={client:t.client,queryKey:t.queryKey,pageParam:k,direction:E?"backward":"forward",meta:t.options.meta};return S(U),U})(),N=await x(T),{maxPages:C}=t.options,P=E?qb:Vb;return{pages:P(h.pages,N,C),pageParams:P(h.pageParams,k,C)}};if(s&&i.length){const h=s==="backward",k=h?nw:Cf,E={pages:i,pageParams:a},R=k(r,E);l=await f(E,R,h)}else{const h=e??i.length;do{const k=c===0?a[0]??r.initialPageParam:Cf(r,l);if(c>0&&k==null)break;l=await f(l,k),c++}while(c<h)}return l};t.options.persister?t.fetchFn=()=>{var v,S;return(S=(v=t.options).persister)==null?void 0:S.call(v,u,{client:t.client,queryKey:t.queryKey,meta:t.options.meta,signal:t.signal},n)}:t.fetchFn=u}}}function Cf(e,{pages:t,pageParams:n}){const r=t.length-1;return t.length>0?e.getNextPageParam(t[r],t,n[r],n):void 0}function nw(e,{pages:t,pageParams:n}){var r;return t.length>0?(r=e.getPreviousPageParam)==null?void 0:r.call(e,t[0],t,n[0],n):void 0}var Ei,Vt,Ve,mr,qt,wn,Ff,rw=(Ff=class extends r0{constructor(t){super();D(this,qt);D(this,Ei);D(this,Vt);D(this,Ve);D(this,mr);A(this,Ei,t.client),this.mutationId=t.mutationId,A(this,Ve,t.mutationCache),A(this,Vt,[]),this.state=t.state||o0(),this.setOptions(t.options),this.scheduleGc()}setOptions(t){this.options=t,this.updateGcTime(this.options.gcTime)}get meta(){return this.options.meta}addObserver(t){j(this,Vt).includes(t)||(j(this,Vt).push(t),this.clearGcTimeout(),j(this,Ve).notify({type:"observerAdded",mutation:this,observer:t}))}removeObserver(t){A(this,Vt,j(this,Vt).filter(n=>n!==t)),this.scheduleGc(),j(this,Ve).notify({type:"observerRemoved",mutation:this,observer:t})}optionalRemove(){j(this,Vt).length||(this.state.status==="pending"?this.scheduleGc():j(this,Ve).remove(this))}continue(){var t;return((t=j(this,mr))==null?void 0:t.continue())??this.execute(this.state.variables)}async execute(t){var a,l,c,u,p,m,y,w,g,v,S,x,f,h,k,E,R,T,N,C;const n=()=>{q(this,qt,wn).call(this,{type:"continue"})},r={client:j(this,Ei),meta:this.options.meta,mutationKey:this.options.mutationKey};A(this,mr,n0({fn:()=>this.options.mutationFn?this.options.mutationFn(t,r):Promise.reject(new Error("No mutationFn found")),onFail:(P,U)=>{q(this,qt,wn).call(this,{type:"failed",failureCount:P,error:U})},onPause:()=>{q(this,qt,wn).call(this,{type:"pause"})},onContinue:n,retry:this.options.retry??0,retryDelay:this.options.retryDelay,networkMode:this.options.networkMode,canRun:()=>j(this,Ve).canRun(this)}));const s=this.state.status==="pending",i=!j(this,mr).canStart();try{if(s)n();else{q(this,qt,wn).call(this,{type:"pending",variables:t,isPaused:i}),await((l=(a=j(this,Ve).config).onMutate)==null?void 0:l.call(a,t,this,r));const U=await((u=(c=this.options).onMutate)==null?void 0:u.call(c,t,r));U!==this.state.context&&q(this,qt,wn).call(this,{type:"pending",context:U,variables:t,isPaused:i})}const P=await j(this,mr).start();return await((m=(p=j(this,Ve).config).onSuccess)==null?void 0:m.call(p,P,t,this.state.context,this,r)),await((w=(y=this.options).onSuccess)==null?void 0:w.call(y,P,t,this.state.context,r)),await((v=(g=j(this,Ve).config).onSettled)==null?void 0:v.call(g,P,null,this.state.variables,this.state.context,this,r)),await((x=(S=this.options).onSettled)==null?void 0:x.call(S,P,null,t,this.state.context,r)),q(this,qt,wn).call(this,{type:"success",data:P}),P}catch(P){try{throw await((h=(f=j(this,Ve).config).onError)==null?void 0:h.call(f,P,t,this.state.context,this,r)),await((E=(k=this.options).onError)==null?void 0:E.call(k,P,t,this.state.context,r)),await((T=(R=j(this,Ve).config).onSettled)==null?void 0:T.call(R,void 0,P,this.state.variables,this.state.context,this,r)),await((C=(N=this.options).onSettled)==null?void 0:C.call(N,void 0,P,t,this.state.context,r)),P}finally{q(this,qt,wn).call(this,{type:"error",error:P})}}finally{j(this,Ve).runNext(this)}}},Ei=new WeakMap,Vt=new WeakMap,Ve=new WeakMap,mr=new WeakMap,qt=new WeakSet,wn=function(t){const n=r=>{switch(t.type){case"failed":return{...r,failureCount:t.failureCount,failureReason:t.error};case"pause":return{...r,isPaused:!0};case"continue":return{...r,isPaused:!1};case"pending":return{...r,context:t.context,data:void 0,failureCount:0,failureReason:null,error:null,isPaused:t.isPaused,status:"pending",variables:t.variables,submittedAt:Date.now()};case"success":return{...r,data:t.data,failureCount:0,failureReason:null,error:null,status:"success",isPaused:!1};case"error":return{...r,data:void 0,error:t.error,failureCount:r.failureCount+1,failureReason:t.error,isPaused:!1,status:"error"}}};this.state=n(this.state),je.batch(()=>{j(this,Vt).forEach(r=>{r.onMutationUpdate(t)}),j(this,Ve).notify({mutation:this,type:"updated",action:t})})},Ff);function o0(){return{context:void 0,data:void 0,error:null,failureCount:0,failureReason:null,isPaused:!1,status:"idle",variables:void 0,submittedAt:0}}var nn,zt,Ti,Df,sw=(Df=class extends Rs{constructor(t={}){super();D(this,nn);D(this,zt);D(this,Ti);this.config=t,A(this,nn,new Set),A(this,zt,new Map),A(this,Ti,0)}build(t,n,r){const s=new rw({client:t,mutationCache:this,mutationId:++$i(this,Ti)._,options:t.defaultMutationOptions(n),state:r});return this.add(s),s}add(t){j(this,nn).add(t);const n=oo(t);if(typeof n=="string"){const r=j(this,zt).get(n);r?r.push(t):j(this,zt).set(n,[t])}this.notify({type:"added",mutation:t})}remove(t){if(j(this,nn).delete(t)){const n=oo(t);if(typeof n=="string"){const r=j(this,zt).get(n);if(r)if(r.length>1){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}else r[0]===t&&j(this,zt).delete(n)}}this.notify({type:"removed",mutation:t})}canRun(t){const n=oo(t);if(typeof n=="string"){const r=j(this,zt).get(n),s=r==null?void 0:r.find(i=>i.state.status==="pending");return!s||s===t}else return!0}runNext(t){var r;const n=oo(t);if(typeof n=="string"){const s=(r=j(this,zt).get(n))==null?void 0:r.find(i=>i!==t&&i.state.isPaused);return(s==null?void 0:s.continue())??Promise.resolve()}else return Promise.resolve()}clear(){je.batch(()=>{j(this,nn).forEach(t=>{this.notify({type:"removed",mutation:t})}),j(this,nn).clear(),j(this,zt).clear()})}getAll(){return Array.from(j(this,nn))}find(t){const n={exact:!0,...t};return this.getAll().find(r=>xf(n,r))}findAll(t={}){return this.getAll().filter(n=>xf(t,n))}notify(t){je.batch(()=>{this.listeners.forEach(n=>{n(t)})})}resumePausedMutations(){const t=this.getAll().filter(n=>n.state.isPaused);return je.batch(()=>Promise.all(t.map(n=>n.continue().catch(Qe))))}},nn=new WeakMap,zt=new WeakMap,Ti=new WeakMap,Df);function oo(e){var t;return(t=e.options.scope)==null?void 0:t.id}var rn,Pn,tt,sn,cn,So,bc,$f,iw=($f=class extends Rs{constructor(n,r){super();D(this,cn);D(this,rn);D(this,Pn);D(this,tt);D(this,sn);A(this,rn,n),this.setOptions(r),this.bindMethods(),q(this,cn,So).call(this)}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(n){var s;const r=this.options;this.options=j(this,rn).defaultMutationOptions(n),Jo(this.options,r)||j(this,rn).getMutationCache().notify({type:"observerOptionsUpdated",mutation:j(this,tt),observer:this}),r!=null&&r.mutationKey&&this.options.mutationKey&&Nr(r.mutationKey)!==Nr(this.options.mutationKey)?this.reset():((s=j(this,tt))==null?void 0:s.state.status)==="pending"&&j(this,tt).setOptions(this.options)}onUnsubscribe(){var n;this.hasListeners()||(n=j(this,tt))==null||n.removeObserver(this)}onMutationUpdate(n){q(this,cn,So).call(this),q(this,cn,bc).call(this,n)}getCurrentResult(){return j(this,Pn)}reset(){var n;(n=j(this,tt))==null||n.removeObserver(this),A(this,tt,void 0),q(this,cn,So).call(this),q(this,cn,bc).call(this)}mutate(n,r){var s;return A(this,sn,r),(s=j(this,tt))==null||s.removeObserver(this),A(this,tt,j(this,rn).getMutationCache().build(j(this,rn),this.options)),j(this,tt).addObserver(this),j(this,tt).execute(n)}},rn=new WeakMap,Pn=new WeakMap,tt=new WeakMap,sn=new WeakMap,cn=new WeakSet,So=function(){var r;const n=((r=j(this,tt))==null?void 0:r.state)??o0();A(this,Pn,{...n,isPending:n.status==="pending",isSuccess:n.status==="success",isError:n.status==="error",isIdle:n.status==="idle",mutate:this.mutate,reset:this.reset})},bc=function(n){je.batch(()=>{var r,s,i,a,l,c,u,p;if(j(this,sn)&&this.hasListeners()){const m=j(this,Pn).variables,y=j(this,Pn).context,w={client:j(this,rn),meta:this.options.meta,mutationKey:this.options.mutationKey};(n==null?void 0:n.type)==="success"?((s=(r=j(this,sn)).onSuccess)==null||s.call(r,n.data,m,y,w),(a=(i=j(this,sn)).onSettled)==null||a.call(i,n.data,null,m,y,w)):(n==null?void 0:n.type)==="error"&&((c=(l=j(this,sn)).onError)==null||c.call(l,n.error,m,y,w),(p=(u=j(this,sn)).onSettled)==null||p.call(u,void 0,n.error,m,y,w))}this.listeners.forEach(m=>{m(j(this,Pn))})})},$f),Qt,Bf,ow=(Bf=class extends Rs{constructor(t={}){super();D(this,Qt);this.config=t,A(this,Qt,new Map)}build(t,n,r){const s=n.queryKey,i=n.queryHash??Cu(s,n);let a=this.get(i);return a||(a=new Gb({client:t,queryKey:s,queryHash:i,options:t.defaultQueryOptions(n),state:r,defaultOptions:t.getQueryDefaults(s)}),this.add(a)),a}add(t){j(this,Qt).has(t.queryHash)||(j(this,Qt).set(t.queryHash,t),this.notify({type:"added",query:t}))}remove(t){const n=j(this,Qt).get(t.queryHash);n&&(t.destroy(),n===t&&j(this,Qt).delete(t.queryHash),this.notify({type:"removed",query:t}))}clear(){je.batch(()=>{this.getAll().forEach(t=>{this.remove(t)})})}get(t){return j(this,Qt).get(t)}getAll(){return[...j(this,Qt).values()]}find(t){const n={exact:!0,...t};return this.getAll().find(r=>yf(n,r))}findAll(t={}){const n=this.getAll();return Object.keys(t).length>0?n.filter(r=>yf(t,r)):n}notify(t){je.batch(()=>{this.listeners.forEach(n=>{n(t)})})}onFocus(){je.batch(()=>{this.getAll().forEach(t=>{t.onFocus()})})}onOnline(){je.batch(()=>{this.getAll().forEach(t=>{t.onOnline()})})}},Qt=new WeakMap,Bf),pe,zn,Ln,us,ds,On,fs,ps,Uf,aw=(Uf=class{constructor(e={}){D(this,pe);D(this,zn);D(this,Ln);D(this,us);D(this,ds);D(this,On);D(this,fs);D(this,ps);A(this,pe,e.queryCache||new ow),A(this,zn,e.mutationCache||new sw),A(this,Ln,e.defaultOptions||{}),A(this,us,new Map),A(this,ds,new Map),A(this,On,0)}mount(){$i(this,On)._++,j(this,On)===1&&(A(this,fs,Tu.subscribe(async e=>{e&&(await this.resumePausedMutations(),j(this,pe).onFocus())})),A(this,ps,Xo.subscribe(async e=>{e&&(await this.resumePausedMutations(),j(this,pe).onOnline())})))}unmount(){var e,t;$i(this,On)._--,j(this,On)===0&&((e=j(this,fs))==null||e.call(this),A(this,fs,void 0),(t=j(this,ps))==null||t.call(this),A(this,ps,void 0))}isFetching(e){return j(this,pe).findAll({...e,fetchStatus:"fetching"}).length}isMutating(e){return j(this,zn).findAll({...e,status:"pending"}).length}getQueryData(e){var n;const t=this.defaultQueryOptions({queryKey:e});return(n=j(this,pe).get(t.queryHash))==null?void 0:n.state.data}ensureQueryData(e){const t=this.defaultQueryOptions(e),n=j(this,pe).build(this,t),r=n.state.data;return r===void 0?this.fetchQuery(e):(e.revalidateIfStale&&n.isStaleByTime(Qn(t.staleTime,n))&&this.prefetchQuery(t),Promise.resolve(r))}getQueriesData(e){return j(this,pe).findAll(e).map(({queryKey:t,state:n})=>{const r=n.data;return[t,r]})}setQueryData(e,t,n){const r=this.defaultQueryOptions({queryKey:e}),s=j(this,pe).get(r.queryHash),i=s==null?void 0:s.state.data,a=Ub(t,i);if(a!==void 0)return j(this,pe).build(this,r).setData(a,{...n,manual:!0})}setQueriesData(e,t,n){return je.batch(()=>j(this,pe).findAll(e).map(({queryKey:r})=>[r,this.setQueryData(r,t,n)]))}getQueryState(e){var n;const t=this.defaultQueryOptions({queryKey:e});return(n=j(this,pe).get(t.queryHash))==null?void 0:n.state}removeQueries(e){const t=j(this,pe);je.batch(()=>{t.findAll(e).forEach(n=>{t.remove(n)})})}resetQueries(e,t){const n=j(this,pe);return je.batch(()=>(n.findAll(e).forEach(r=>{r.reset()}),this.refetchQueries({type:"active",...e},t)))}cancelQueries(e,t={}){const n={revert:!0,...t},r=je.batch(()=>j(this,pe).findAll(e).map(s=>s.cancel(n)));return Promise.all(r).then(Qe).catch(Qe)}invalidateQueries(e,t={}){return je.batch(()=>(j(this,pe).findAll(e).forEach(n=>{n.invalidate()}),(e==null?void 0:e.refetchType)==="none"?Promise.resolve():this.refetchQueries({...e,type:(e==null?void 0:e.refetchType)??(e==null?void 0:e.type)??"active"},t)))}refetchQueries(e,t={}){const n={...t,cancelRefetch:t.cancelRefetch??!0},r=je.batch(()=>j(this,pe).findAll(e).filter(s=>!s.isDisabled()&&!s.isStatic()).map(s=>{let i=s.fetch(void 0,n);return n.throwOnError||(i=i.catch(Qe)),s.state.fetchStatus==="paused"?Promise.resolve():i}));return Promise.all(r).then(Qe)}fetchQuery(e){const t=this.defaultQueryOptions(e);t.retry===void 0&&(t.retry=!1);const n=j(this,pe).build(this,t);return n.isStaleByTime(Qn(t.staleTime,n))?n.fetch(t):Promise.resolve(n.state.data)}prefetchQuery(e){return this.fetchQuery(e).then(Qe).catch(Qe)}fetchInfiniteQuery(e){return e.behavior=jf(e.pages),this.fetchQuery(e)}prefetchInfiniteQuery(e){return this.fetchInfiniteQuery(e).then(Qe).catch(Qe)}ensureInfiniteQueryData(e){return e.behavior=jf(e.pages),this.ensureQueryData(e)}resumePausedMutations(){return Xo.isOnline()?j(this,zn).resumePausedMutations():Promise.resolve()}getQueryCache(){return j(this,pe)}getMutationCache(){return j(this,zn)}getDefaultOptions(){return j(this,Ln)}setDefaultOptions(e){A(this,Ln,e)}setQueryDefaults(e,t){j(this,us).set(Nr(e),{queryKey:e,defaultOptions:t})}getQueryDefaults(e){const t=[...j(this,us).values()],n={};return t.forEach(r=>{ki(e,r.queryKey)&&Object.assign(n,r.defaultOptions)}),n}setMutationDefaults(e,t){j(this,ds).set(Nr(e),{mutationKey:e,defaultOptions:t})}getMutationDefaults(e){const t=[...j(this,ds).values()],n={};return t.forEach(r=>{ki(e,r.mutationKey)&&Object.assign(n,r.defaultOptions)}),n}defaultQueryOptions(e){if(e._defaulted)return e;const t={...j(this,Ln).queries,...this.getQueryDefaults(e.queryKey),...e,_defaulted:!0};return t.queryHash||(t.queryHash=Cu(t.queryKey,t)),t.refetchOnReconnect===void 0&&(t.refetchOnReconnect=t.networkMode!=="always"),t.throwOnError===void 0&&(t.throwOnError=!!t.suspense),!t.networkMode&&t.persister&&(t.networkMode="offlineFirst"),t.queryFn===Eu&&(t.enabled=!1),t}defaultMutationOptions(e){return e!=null&&e._defaulted?e:{...j(this,Ln).mutations,...(e==null?void 0:e.mutationKey)&&this.getMutationDefaults(e.mutationKey),...e,_defaulted:!0}}clear(){j(this,pe).clear(),j(this,zn).clear()}},pe=new WeakMap,zn=new WeakMap,Ln=new WeakMap,us=new WeakMap,ds=new WeakMap,On=new WeakMap,fs=new WeakMap,ps=new WeakMap,Uf),a0=b.createContext(void 0),Sa=e=>{const t=b.useContext(a0);if(!t)throw new Error("No QueryClient set, use QueryClientProvider to set one");return t},lw=({client:e,children:t})=>(b.useEffect(()=>(e.mount(),()=>{e.unmount()}),[e]),o.jsx(a0.Provider,{value:e,children:t})),l0=b.createContext(!1),cw=()=>b.useContext(l0);l0.Provider;function uw(){let e=!1;return{clearReset:()=>{e=!1},reset:()=>{e=!0},isReset:()=>e}}var dw=b.createContext(uw()),fw=()=>b.useContext(dw),pw=(e,t)=>{(e.suspense||e.throwOnError||e.experimental_prefetchInRender)&&(t.isReset()||(e.retryOnMount=!1))},hw=e=>{b.useEffect(()=>{e.clearReset()},[e])},mw=({result:e,errorResetBoundary:t,throwOnError:n,query:r,suspense:s})=>e.isError&&!t.isReset()&&!e.isFetching&&r&&(s&&e.data===void 0||e0(n,[e.error,r])),gw=e=>{if(e.suspense){const n=s=>s==="static"?s:Math.max(s??1e3,1e3),r=e.staleTime;e.staleTime=typeof r=="function"?(...s)=>n(r(...s)):n(r),typeof e.gcTime=="number"&&(e.gcTime=Math.max(e.gcTime,1e3))}},yw=(e,t)=>e.isLoading&&e.isFetching&&!t,xw=(e,t)=>(e==null?void 0:e.suspense)&&t.isPending,Ef=(e,t,n)=>t.fetchOptimistic(e).catch(()=>{n.clearReset()});function vw(e,t,n){var m,y,w,g,v;const r=cw(),s=fw(),i=Sa(),a=i.defaultQueryOptions(e);(y=(m=i.getDefaultOptions().queries)==null?void 0:m._experimental_beforeQuery)==null||y.call(m,a),a._optimisticResults=r?"isRestoring":"optimistic",gw(a),pw(a,s),hw(s);const l=!i.getQueryCache().get(a.queryHash),[c]=b.useState(()=>new t(i,a)),u=c.getOptimisticResult(a),p=!r&&e.subscribed!==!1;if(b.useSyncExternalStore(b.useCallback(S=>{const x=p?c.subscribe(je.batchCalls(S)):Qe;return c.updateResult(),x},[c,p]),()=>c.getCurrentResult(),()=>c.getCurrentResult()),b.useEffect(()=>{c.setOptions(a)},[a,c]),xw(a,u))throw Ef(a,c,s);if(mw({result:u,errorResetBoundary:s,throwOnError:a.throwOnError,query:i.getQueryCache().get(a.queryHash),suspense:a.suspense}))throw u.error;if((g=(w=i.getDefaultOptions().queries)==null?void 0:w._experimental_afterQuery)==null||g.call(w,a,u),a.experimental_prefetchInRender&&!_r&&yw(u,r)){const S=l?Ef(a,c,s):(v=i.getQueryCache().get(a.queryHash))==null?void 0:v.promise;S==null||S.catch(Qe).finally(()=>{c.updateResult()})}return a.notifyOnChangeProps?u:c.trackResult(u)}function c0(e,t){return vw(e,Zb)}function u0(e,t){const n=Sa(),[r]=b.useState(()=>new iw(n,e));b.useEffect(()=>{r.setOptions(e)},[r,e]);const s=b.useSyncExternalStore(b.useCallback(a=>r.subscribe(je.batchCalls(a)),[r]),()=>r.getCurrentResult(),()=>r.getCurrentResult()),i=b.useCallback((a,l)=>{r.mutate(a,l).catch(Qe)},[r]);if(s.error&&e0(r.options.throwOnError,[s.error]))throw s.error;return{...s,mutate:i,mutateAsync:s.mutate}}const bw=({skills:e,onSkillsChange:t,availableSkills:n,placeholder:r="Add skills...",maxSkills:s=10})=>{const[i,a]=b.useState(""),[l,c]=b.useState(!1),[u,p]=b.useState(-1),m=b.useRef(null),y=b.useRef(null),w=n.filter(f=>f.toLowerCase().includes(i.toLowerCase())&&!e.includes(f)).slice(0,8);b.useEffect(()=>{const f=h=>{y.current&&!y.current.contains(h.target)&&c(!1)};return document.addEventListener("mousedown",f),()=>document.removeEventListener("mousedown",f)},[]);const g=f=>{f.trim()&&!e.includes(f.trim())&&e.length<s&&(t([...e,f.trim()]),a(""),c(!1),p(-1))},v=f=>{t(e.filter(h=>h!==f))},S=f=>{f.key==="Enter"?(f.preventDefault(),u>=0&&w[u]?g(w[u]):i.trim()&&g(i.trim())):f.key==="ArrowDown"?(f.preventDefault(),p(h=>h<w.length-1?h+1:0)):f.key==="ArrowUp"?(f.preventDefault(),p(h=>h>0?h-1:w.length-1)):f.key==="Backspace"&&!i&&e.length>0?v(e[e.length-1]):f.key==="Escape"&&(c(!1),p(-1))},x=f=>{const h=f.target.value;a(h),c(h.length>0),p(-1)};return o.jsxs(o.Fragment,{children:[o.jsx("style",{children:`
        .skills-container {
          position: relative;
          width: 100%;
        }
        
        .skills-input-wrapper {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          background: #f7fafc;
          min-height: 44px;
          transition: all 0.3s ease;
        }
        
        .skills-input-wrapper:focus-within {
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        
        .skill-tag {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.85em;
          font-weight: 500;
          animation: slideIn 0.2s ease-out;
        }
        
        .skill-tag-remove {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 12px;
          transition: background 0.2s ease;
        }
        
        .skill-tag-remove:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        
        .skills-input {
          border: none;
          outline: none;
          background: transparent;
          flex: 1;
          min-width: 120px;
          font-size: 1rem;
          color: #2d3748;
        }
        
        .skills-input::placeholder {
          color: #a0aec0;
        }
        
        .skills-suggestions {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border: 2px solid #e2e8f0;
          border-top: none;
          border-radius: 0 0 8px 8px;
          max-height: 200px;
          overflow-y: auto;
          z-index: 1000;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .suggestion-item {
          padding: 0.75rem;
          cursor: pointer;
          transition: background 0.2s ease;
          border-bottom: 1px solid #f7fafc;
        }
        
        .suggestion-item:hover,
        .suggestion-item.highlighted {
          background: #f7fafc;
        }
        
        .suggestion-item.highlighted {
          background: #e6fffa;
          color: #234e52;
        }
        
        .skills-counter {
          font-size: 0.8em;
          color: #718096;
          margin-top: 0.25rem;
        }
        
        .skills-counter.warning {
          color: #d69e2e;
        }
        
        .skills-counter.error {
          color: #e53e3e;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
      `}),o.jsxs("div",{className:"skills-container",ref:y,children:[o.jsxs("div",{className:"skills-input-wrapper",children:[e.map((f,h)=>o.jsxs("div",{className:"skill-tag",children:[f,o.jsx("button",{type:"button",className:"skill-tag-remove",onClick:()=>v(f),title:`Remove ${f}`,children:"×"})]},h)),o.jsx("input",{ref:m,type:"text",className:"skills-input",value:i,onChange:x,onKeyDown:S,onFocus:()=>i&&c(!0),placeholder:e.length===0?r:"",disabled:e.length>=s})]}),l&&w.length>0&&o.jsx("div",{className:"skills-suggestions",children:w.map((f,h)=>o.jsx("div",{className:`suggestion-item ${h===u?"highlighted":""}`,onClick:()=>g(f),children:f},f))}),o.jsxs("div",{className:`skills-counter ${e.length===s?"error":e.length>=s*.8?"warning":""}`,children:[e.length,"/",s," skills"]})]})]})},ww=({profileId:e,userName:t,isPublic:n,onPrivacyChange:r})=>{const[s,i]=b.useState(!1),[a,l]=b.useState(!1),c=`${window.location.origin}/public-profile/${e}`,u={name:t,profileUrl:c,timestamp:new Date().toISOString()},p=async v=>{try{await navigator.clipboard.writeText(v),i(!0),$.success("Copied to clipboard!"),setTimeout(()=>i(!1),2e3)}catch{$.error("Failed to copy to clipboard")}},m=()=>{const v=encodeURIComponent(`Check out ${t}'s professional profile`),S=encodeURIComponent(`Hi!

I'd like to share my professional profile with you:
${c}

Best regards,
${t}`);window.open(`mailto:?subject=${v}&body=${S}`,"_blank")},y=()=>{const v=encodeURIComponent(c),S=encodeURIComponent(`Check out my professional profile: ${t}`);window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${v}&text=${S}`,"_blank")},w=()=>{const v=encodeURIComponent(`Check out my professional profile: ${c}`);window.open(`https://wa.me/?text=${v}`,"_blank")},g=async()=>{l(!0);try{await new Promise(h=>setTimeout(h,2e3));const v=`
        Professional Profile - ${t}
        Generated on: ${new Date().toLocaleDateString()}
        Profile URL: ${c}
        
        This is a simplified version of the profile.
        For the full interactive experience, visit: ${c}
      `,S=new Blob([v],{type:"text/plain"}),x=URL.createObjectURL(S),f=document.createElement("a");f.href=x,f.download=`${t.replace(/\s+/g,"_")}_profile.txt`,document.body.appendChild(f),f.click(),document.body.removeChild(f),URL.revokeObjectURL(x),$.success("Profile exported successfully!")}catch{$.error("Failed to generate profile export")}finally{l(!1)}};return o.jsxs(o.Fragment,{children:[o.jsx("style",{children:`
        .sharing-container {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          margin-bottom: 2rem;
        }
        
        .sharing-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #f7fafc;
        }
        
        .sharing-title {
          font-size: 1.2em;
          font-weight: 700;
          color: #2d3748;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .privacy-toggle {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .toggle-switch {
          position: relative;
          width: 50px;
          height: 24px;
          background: #e2e8f0;
          border-radius: 12px;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        
        .toggle-switch.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .toggle-slider {
          position: absolute;
          top: 2px;
          left: 2px;
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 50%;
          transition: transform 0.3s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .toggle-switch.active .toggle-slider {
          transform: translateX(26px);
        }
        
        .url-section {
          background: #f7fafc;
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .url-input-group {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }
        
        .url-input {
          flex: 1;
          padding: 0.75rem;
          border: 2px solid #e2e8f0;
          border-radius: 6px;
          background: white;
          font-family: monospace;
          font-size: 0.9em;
          color: #4a5568;
        }
        
        .copy-button {
          background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
          color: white;
          border: none;
          padding: 0.75rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          min-width: 80px;
        }
        
        .copy-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(72, 187, 120, 0.3);
        }
        
        .copy-button.copied {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .sharing-options {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .share-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          background: white;
          color: #4a5568;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
          text-decoration: none;
        }
        
        .share-button:hover {
          border-color: #667eea;
          color: #667eea;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .share-button.linkedin {
          border-color: #0077b5;
          color: #0077b5;
        }
        
        .share-button.linkedin:hover {
          background: #0077b5;
          color: white;
        }
        
        .share-button.whatsapp {
          border-color: #25d366;
          color: #25d366;
        }
        
        .share-button.whatsapp:hover {
          background: #25d366;
          color: white;
        }
        
        .share-button.email {
          border-color: #dd6b20;
          color: #dd6b20;
        }
        
        .share-button.email:hover {
          background: #dd6b20;
          color: white;
        }
        
        .export-section {
          padding-top: 1rem;
          border-top: 2px solid #f7fafc;
        }
        
        .export-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .export-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
        }
        
        .export-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
        
        .privacy-info {
          background: #e6fffa;
          border: 1px solid #b2f5ea;
          border-radius: 8px;
          padding: 1rem;
          margin-top: 1rem;
          font-size: 0.9em;
          color: #234e52;
        }
        
        @media (max-width: 768px) {
          .sharing-header {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
          
          .url-input-group {
            flex-direction: column;
          }
          
          .url-input {
            font-size: 0.8em;
          }
          
          .sharing-options {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}),o.jsxs("div",{className:"sharing-container",children:[o.jsxs("div",{className:"sharing-header",children:[o.jsx("div",{className:"sharing-title",children:"🔗 Profile Sharing & Privacy"}),o.jsxs("div",{className:"privacy-toggle",children:[o.jsx("span",{style:{fontSize:"0.9em",color:"#718096"},children:n?"Public":"Private"}),o.jsx("div",{className:`toggle-switch ${n?"active":""}`,onClick:()=>r(!n),children:o.jsx("div",{className:"toggle-slider"})})]})]}),n&&o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"url-section",children:[o.jsx("div",{style:{marginBottom:"0.5rem",fontSize:"0.9em",color:"#718096"},children:"Public Profile URL:"}),o.jsxs("div",{className:"url-input-group",children:[o.jsx("input",{type:"text",className:"url-input",value:c,readOnly:!0}),o.jsx("button",{className:`copy-button ${s?"copied":""}`,onClick:()=>p(c),children:s?"✓ Copied":"📋 Copy"})]})]}),o.jsx("div",{style:{marginBottom:"1rem",fontSize:"0.9em",color:"#718096"},children:"Share your profile:"}),o.jsxs("div",{className:"sharing-options",children:[o.jsx("button",{className:"share-button linkedin",onClick:y,children:"💼 LinkedIn"}),o.jsx("button",{className:"share-button whatsapp",onClick:w,children:"💬 WhatsApp"}),o.jsx("button",{className:"share-button email",onClick:m,children:"✉️ Email"}),o.jsx("button",{className:"share-button",onClick:()=>p(JSON.stringify(u,null,2)),children:"📄 Copy Data"})]})]}),o.jsx("div",{className:"export-section",children:o.jsx("button",{className:"export-button",onClick:g,disabled:a,children:a?"⏳ Generating...":"📥 Export Profile"})}),o.jsxs("div",{className:"privacy-info",children:[o.jsx("strong",{children:"Privacy Info:"})," ",n?"Your profile is visible to anyone with the link. You can disable public access anytime.":"Your profile is private and only visible to you when logged in."]})]})]})},kw=({userRole:e,portfolioItems:t,certifications:n,onPortfolioUpdate:r})=>{const[s,i]=b.useState("portfolio"),[a,l]=b.useState(!1),[c]=b.useState(null),u=[{id:"1",title:"Modern Kitchen Renovation",description:"Complete kitchen renovation including custom cabinets, granite countertops, and modern appliances.",imageUrl:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",tags:["Kitchen","Renovation","Carpentry"],completedDate:"2024-08-15"},{id:"2",title:"Bathroom Remodel",description:"Luxury bathroom remodel with heated floors, rain shower, and custom tile work.",imageUrl:"https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400",tags:["Bathroom","Plumbing","Tiling"],completedDate:"2024-06-20"}],p=[{id:"1",name:"Licensed General Contractor",issuer:"State Licensing Board",issueDate:"2020-03-15",expiryDate:"2025-03-15",credentialId:"GC-2020-12345"},{id:"2",name:"OSHA 30-Hour Construction Safety",issuer:"OSHA Training Institute",issueDate:"2023-01-10",credentialId:"OSHA-30-67890"}],m=g=>{r(t.filter(v=>v.id!==g)),$.success("Portfolio item removed")},y=t.length>0?t:u,w=n.length>0?n:p;return o.jsxs(o.Fragment,{children:[o.jsx("style",{children:`
        .portfolio-container {
          width: 100%;
        }
        
        .portfolio-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
          border-bottom: 2px solid #e2e8f0;
        }
        
        .portfolio-tab {
          padding: 0.75rem 1.5rem;
          border: none;
          background: none;
          color: #718096;
          font-weight: 600;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .portfolio-tab.active {
          color: #667eea;
          border-bottom-color: #667eea;
        }
        
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .portfolio-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }
        
        .portfolio-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          border-color: #667eea;
        }
        
        .portfolio-image {
          width: 100%;
          height: 200px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 3em;
          background-size: cover;
          background-position: center;
        }
        
        .portfolio-content {
          padding: 1.5rem;
        }
        
        .portfolio-title {
          font-size: 1.2em;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 0.5rem;
        }
        
        .portfolio-description {
          color: #718096;
          margin-bottom: 1rem;
          line-height: 1.5;
        }
        
        .portfolio-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        
        .portfolio-tag {
          background: #e6fffa;
          color: #234e52;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8em;
          border: 1px solid #b2f5ea;
        }
        
        .portfolio-date {
          font-size: 0.85em;
          color: #a0aec0;
          margin-bottom: 1rem;
        }
        
        .portfolio-actions {
          display: flex;
          gap: 0.5rem;
        }
        
        .action-button {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          font-size: 0.85em;
        }
        
        .action-button.primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        
        .action-button.danger {
          background: #fed7d7;
          color: #c53030;
        }
        
        .action-button:hover {
          transform: translateY(-1px);
        }
        
        .add-button {
          background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }
        
        .add-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(72, 187, 120, 0.3);
        }
        
        .certification-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .certification-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border-left: 4px solid #667eea;
        }
        
        .certification-header {
          display: flex;
          justify-content: between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }
        
        .certification-name {
          font-size: 1.1em;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 0.25rem;
        }
        
        .certification-issuer {
          color: #667eea;
          font-weight: 600;
        }
        
        .certification-details {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }
        
        .certification-detail {
          font-size: 0.9em;
        }
        
        .certification-detail-label {
          color: #718096;
          font-weight: 600;
        }
        
        .certification-detail-value {
          color: #2d3748;
          margin-top: 0.25rem;
        }
        
        .social-links {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }
        
        .social-link-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.3s ease;
        }
        
        .social-link-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
        
        .social-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5em;
          color: white;
        }
        
        .social-icon.linkedin { background: #0077b5; }
        .social-icon.github { background: #333; }
        .social-icon.website { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .social-icon.twitter { background: #1da1f2; }
        
        .empty-state {
          text-align: center;
          padding: 3rem 1rem;
          color: #718096;
        }
        
        .empty-state-icon {
          font-size: 4em;
          margin-bottom: 1rem;
        }
        
        @media (max-width: 768px) {
          .portfolio-grid {
            grid-template-columns: 1fr;
          }
          
          .portfolio-tabs {
            flex-wrap: wrap;
          }
          
          .certification-details {
            grid-template-columns: 1fr;
          }
          
          .social-links {
            grid-template-columns: 1fr;
          }
        }
      `}),o.jsxs("div",{className:"portfolio-container",children:[o.jsxs("div",{className:"portfolio-tabs",children:[o.jsxs("button",{className:`portfolio-tab ${s==="portfolio"?"active":""}`,onClick:()=>i("portfolio"),children:["📁 ",e==="contractor"?"Projects":"Portfolio"]}),o.jsx("button",{className:`portfolio-tab ${s==="certifications"?"active":""}`,onClick:()=>i("certifications"),children:"🏆 Certifications"}),o.jsx("button",{className:`portfolio-tab ${s==="social"?"active":""}`,onClick:()=>i("social"),children:"🔗 Links"})]}),s==="portfolio"&&o.jsxs("div",{children:[o.jsxs("button",{className:"add-button",onClick:()=>l(!0),children:["➕ Add ",e==="contractor"?"Project":"Portfolio Item"]}),y.length>0?o.jsx("div",{className:"portfolio-grid",children:y.map(g=>o.jsxs("div",{className:"portfolio-card",children:[o.jsx("div",{className:"portfolio-image",style:{backgroundImage:g.imageUrl?`url(${g.imageUrl})`:"none"},children:!g.imageUrl&&"🖼️"}),o.jsxs("div",{className:"portfolio-content",children:[o.jsx("div",{className:"portfolio-title",children:g.title}),o.jsx("div",{className:"portfolio-description",children:g.description}),g.tags.length>0&&o.jsx("div",{className:"portfolio-tags",children:g.tags.map((v,S)=>o.jsx("span",{className:"portfolio-tag",children:v},S))}),g.completedDate&&o.jsxs("div",{className:"portfolio-date",children:["📅 Completed: ",new Date(g.completedDate).toLocaleDateString()]}),o.jsxs("div",{className:"portfolio-actions",children:[g.projectUrl&&o.jsx("button",{className:"action-button primary",onClick:()=>window.open(g.projectUrl,"_blank"),children:"🔗 View"}),o.jsx("button",{className:"action-button danger",onClick:()=>m(g.id),children:"🗑️ Remove"})]})]})]},g.id))}):o.jsxs("div",{className:"empty-state",children:[o.jsx("div",{className:"empty-state-icon",children:"📁"}),o.jsxs("h3",{children:["No ",e==="contractor"?"projects":"portfolio items"," yet"]}),o.jsxs("p",{children:["Showcase your work by adding your first ",e==="contractor"?"project":"portfolio item","!"]})]})]}),s==="certifications"&&o.jsxs("div",{children:[o.jsx("button",{className:"add-button",children:"➕ Add Certification"}),w.length>0?o.jsx("div",{className:"certification-list",children:w.map(g=>o.jsxs("div",{className:"certification-card",children:[o.jsx("div",{className:"certification-header",children:o.jsxs("div",{children:[o.jsx("div",{className:"certification-name",children:g.name}),o.jsx("div",{className:"certification-issuer",children:g.issuer})]})}),o.jsxs("div",{className:"certification-details",children:[o.jsxs("div",{className:"certification-detail",children:[o.jsx("div",{className:"certification-detail-label",children:"Issue Date"}),o.jsx("div",{className:"certification-detail-value",children:new Date(g.issueDate).toLocaleDateString()})]}),g.expiryDate&&o.jsxs("div",{className:"certification-detail",children:[o.jsx("div",{className:"certification-detail-label",children:"Expires"}),o.jsx("div",{className:"certification-detail-value",children:new Date(g.expiryDate).toLocaleDateString()})]}),g.credentialId&&o.jsxs("div",{className:"certification-detail",children:[o.jsx("div",{className:"certification-detail-label",children:"Credential ID"}),o.jsx("div",{className:"certification-detail-value",children:g.credentialId})]})]})]},g.id))}):o.jsxs("div",{className:"empty-state",children:[o.jsx("div",{className:"empty-state-icon",children:"🏆"}),o.jsx("h3",{children:"No certifications added"}),o.jsx("p",{children:"Add your professional certifications and licenses to build trust with clients."})]})]}),s==="social"&&o.jsxs("div",{children:[o.jsx("button",{className:"add-button",children:"➕ Add Social Link"}),o.jsxs("div",{className:"social-links",children:[o.jsxs("div",{className:"social-link-card",children:[o.jsx("div",{className:"social-icon linkedin",children:"💼"}),o.jsxs("div",{children:[o.jsx("div",{style:{fontWeight:"600",color:"#2d3748"},children:"LinkedIn"}),o.jsx("div",{style:{color:"#718096",fontSize:"0.9em"},children:"Connect professionally"})]})]}),o.jsxs("div",{className:"social-link-card",children:[o.jsx("div",{className:"social-icon website",children:"🌐"}),o.jsxs("div",{children:[o.jsx("div",{style:{fontWeight:"600",color:"#2d3748"},children:"Website"}),o.jsx("div",{style:{color:"#718096",fontSize:"0.9em"},children:"Your professional website"})]})]}),o.jsxs("div",{className:"social-link-card",children:[o.jsx("div",{className:"social-icon github",children:"🔧"}),o.jsxs("div",{children:[o.jsx("div",{style:{fontWeight:"600",color:"#2d3748"},children:"Portfolio"}),o.jsx("div",{style:{color:"#718096",fontSize:"0.9em"},children:"Showcase your work"})]})]})]})]})]})]})},Sw=({location:e,address:t,onLocationChange:n,onAddressChange:r,disabled:s=!1})=>{const[i,a]=b.useState(!1),[l,c]=b.useState(!0),u=async(m,y)=>{try{const w=await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${m}&lon=${y}&zoom=18&addressdetails=1`);if(!w.ok)throw new Error("Geocoding service unavailable");const g=await w.json();if(g.error)throw new Error(g.error);const v=g.address||{};return{street:`${v.house_number||""} ${v.road||""}`.trim(),city:v.city||v.town||v.village||"",state:v.state||v.province||"",country:v.country||"",postalCode:v.postcode||"",formattedAddress:g.display_name||""}}catch(w){throw console.error("Reverse geocoding failed:",w),new Error("Unable to get address for this location")}},p=async()=>{if(!navigator.geolocation){$.error("Geolocation is not supported by your browser");return}a(!0);try{const m=await new Promise((g,v)=>{navigator.geolocation.getCurrentPosition(g,v,{enableHighAccuracy:!0,timeout:1e4,maximumAge:6e4})}),{latitude:y,longitude:w}=m.coords;try{const g=await u(y,w),v=[g.city,g.state,g.country].filter(Boolean).join(", "),S=[g.street,g.city,g.state,g.postalCode,g.country].filter(Boolean).join(", ");n(v||`${y.toFixed(4)}, ${w.toFixed(4)}`),r(S||g.formattedAddress||"");const x=v||`${y.toFixed(4)}, ${w.toFixed(4)}`;$.success(`📍 Location detected: ${x}`,{autoClose:4e3,position:"top-right"}),c(!1)}catch{const v=`${y.toFixed(4)}, ${w.toFixed(4)}`;n(v),$.warning("Location detected, but unable to get address details. You can edit manually.")}}catch(m){let y="Unable to detect location";m.code===1?y="Location access denied. Please enable location permissions.":m.code===2?y="Location unavailable. Please check your GPS settings.":m.code===3&&(y="Location request timed out. Please try again."),$.error(y)}finally{a(!1)}};return o.jsxs(o.Fragment,{children:[o.jsx("style",{children:`
        .location-selector {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .location-detection {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border: 2px dashed #cbd5e0;
          border-radius: 8px;
          transition: all 0.3s ease;
        }
        
        .location-detection:hover {
          border-color: #667eea;
          transform: translateY(-1px);
        }
        
        .detect-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 6px;
          padding: 0.75rem 1.5rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }
        
        .detect-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
        }
        
        .detect-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }
        
        .detect-btn.detecting {
          background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
        }
        
        .location-info {
          flex: 1;
          font-size: 0.9em;
          color: #4a5568;
        }
        
        .location-info-title {
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 0.25rem;
        }
        
        .location-divider {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 1rem 0;
          color: #718096;
          font-size: 0.9em;
        }
        
        .location-divider::before,
        .location-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #e2e8f0;
        }
        
        .manual-entry {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        
        .form-label {
          font-weight: 600;
          color: #2d3748;
          font-size: 0.9em;
        }
        
        .form-input {
          padding: 0.75rem;
          border: 2px solid #e2e8f0;
          border-radius: 6px;
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        
        .form-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        
        .spinner {
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .toggle-manual {
          align-self: flex-start;
          background: none;
          border: none;
          color: #667eea;
          text-decoration: underline;
          cursor: pointer;
          font-size: 0.9em;
          padding: 0.25rem 0;
        }
        
        .toggle-manual:hover {
          color: #5a67d8;
        }
      `}),o.jsxs("div",{className:"location-selector",children:[o.jsxs("div",{className:"location-detection",children:[o.jsxs("div",{className:"location-info",children:[o.jsx("div",{className:"location-info-title",children:"📍 Use Current Location"}),o.jsx("div",{children:"Automatically detect and fill your location details using GPS"})]}),o.jsx("button",{type:"button",className:`detect-btn ${i?"detecting":""}`,onClick:p,disabled:s||i,children:i?o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"spinner",children:"🔄"}),"Detecting..."]}):o.jsxs(o.Fragment,{children:[o.jsx("span",{children:"📡"}),"Use Current Location"]})})]}),o.jsx("div",{className:"location-divider",children:"OR enter manually"}),l&&o.jsxs("div",{className:"manual-entry",children:[o.jsxs("div",{className:"form-group",children:[o.jsx("label",{className:"form-label",children:"Location/City"}),o.jsx("input",{type:"text",className:"form-input",value:e,onChange:m=>n(m.target.value),placeholder:"Enter your city, state, country",disabled:s})]}),o.jsxs("div",{className:"form-group",children:[o.jsx("label",{className:"form-label",children:"Full Address"}),o.jsx("textarea",{className:"form-input",value:t,onChange:m=>r(m.target.value),placeholder:"Enter your complete address",disabled:s,rows:3,style:{resize:"vertical",minHeight:"80px"}})]})]}),!l&&o.jsx("button",{type:"button",className:"toggle-manual",onClick:()=>c(!0),children:"✏️ Edit address manually"})]})]})};function jw(e,t){const[n,r]=b.useState({isComplete:!1,isFirstLogin:!1,missingFields:[],completionPercentage:0,isLocked:!1});return b.useEffect(()=>{if(!e||!t){r({isComplete:!1,isFirstLogin:!1,missingFields:[],completionPercentage:0,isLocked:!1});return}const s=Cw(t.username||""),a=[{key:"email",label:"Email",value:e.email,required:s!=="email"},{key:"phone",label:"Phone Number",value:e.phone,required:s!=="phone"},{key:"location",label:"Location",value:e.location,required:!0},{key:"address",label:"Address",value:e.address,required:!0},{key:"skillType",label:"Primary Skill",value:e.skillType,required:!0},{key:"name",label:"Display Name",value:e.name,required:!0}].filter(v=>v.required),l=a.filter(v=>!v.value||v.value.toString().trim()==="").map(v=>v.label),c=a.length-l.length,u=Math.round(c/a.length*100),p=l.length===0,m=s!=="email",y=s!=="phone",w=!e.profileCompletedAt&&(m&&!e.email||y&&!e.phone||!e.location||!e.skillType),g=!!e.profileLockedAt||p&&!!e.profileCompletedAt;r({isComplete:p,isFirstLogin:w,missingFields:l,completionPercentage:u,isLocked:g})},[e,t]),n}function Cw(e){if(!e)return"unknown";const t=e.trim();return/^\+?\d{7,15}$/.test(t)?"phone":/^\S+@\S+\.\S+$/.test(t)||t.includes("@")?"email":"unknown"}function Le(e,t){return!e||!["email","phone"].includes(t)?!1:!!e.profileLockedAt||!!e.profileCompletedAt&&!!e.email&&!!e.phone}function Ew(e){const t={isValid:!0,errors:[],warnings:[],infos:[]};return!e.value||e.value.toString().trim()===""?(t.isValid=!1,t.errors.push(`${e.fieldName} is required`),t):(!e.value||e.value.toString().trim()===""||e.rules.forEach(n=>{if(!n.rule(e.value))switch(n.severity){case"error":t.isValid=!1,t.errors.push(n.message);break;case"warning":t.warnings.push(n.message);break;case"info":t.infos.push(n.message);break}}),t)}const Tw=({validation:e,showSuccess:t=!0})=>e.errors.length>0?o.jsxs("div",{style:{color:"#e53e3e",fontSize:"0.8em",marginTop:"0.25rem",display:"flex",alignItems:"center",gap:"0.25rem"},children:[o.jsx("span",{children:"❌"}),o.jsx("div",{children:e.errors.map((n,r)=>o.jsx("div",{children:n},r))})]}):e.warnings.length>0?o.jsxs("div",{style:{color:"#d69e2e",fontSize:"0.8em",marginTop:"0.25rem",display:"flex",alignItems:"center",gap:"0.25rem"},children:[o.jsx("span",{children:"⚠️"}),o.jsx("div",{children:e.warnings.map((n,r)=>o.jsx("div",{children:n},r))})]}):e.infos.length>0?o.jsxs("div",{style:{color:"#3182ce",fontSize:"0.8em",marginTop:"0.25rem",display:"flex",alignItems:"center",gap:"0.25rem"},children:[o.jsx("span",{children:"ℹ️"}),o.jsx("div",{children:e.infos.map((n,r)=>o.jsx("div",{children:n},r))})]}):t&&e.isValid?o.jsxs("div",{style:{color:"#38a169",fontSize:"0.8em",marginTop:"0.25rem",display:"flex",alignItems:"center",gap:"0.25rem"},children:[o.jsx("span",{children:"✅"}),o.jsx("span",{children:"Looks good!"})]}):null,Tf={email:{rule:e=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e),message:"Please enter a valid email address",severity:"error"},professionalEmail:{rule:e=>{const t=e.split("@")[1];return t?!["gmail.com","yahoo.com","hotmail.com","outlook.com"].includes(t.toLowerCase()):!1},message:"Consider using a professional email address",severity:"warning"}},_w=({message:e,show:t})=>t?o.jsxs(o.Fragment,{children:[o.jsx("style",{children:`
        .success-animation {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          text-align: center;
          z-index: 10000;
          animation: successSlideIn 0.5s ease-out;
        }
        
        .success-icon {
          font-size: 4em;
          margin-bottom: 1rem;
          animation: successBounce 0.6s ease-out 0.2s both;
        }
        
        .success-message {
          font-size: 1.2em;
          font-weight: 700;
          color: #38a169;
          margin-bottom: 0.5rem;
        }
        
        .success-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.3);
          z-index: 9999;
          animation: fadeIn 0.3s ease-out;
        }
        
        @keyframes successSlideIn {
          from {
            opacity: 0;
            transform: translate(-50%, -60%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
        
        @keyframes successBounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
          }
          40%, 43% {
            transform: translate3d(0, -20px, 0);
          }
          70% {
            transform: translate3d(0, -10px, 0);
          }
          90% {
            transform: translate3d(0, -4px, 0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}),o.jsx("div",{className:"success-backdrop",children:o.jsxs("div",{className:"success-animation",children:[o.jsx("div",{className:"success-icon",children:"🎉"}),o.jsx("div",{className:"success-message",children:e}),o.jsx("div",{style:{color:"#718096",fontSize:"0.9em"},children:"Your changes have been saved successfully!"})]})})]}):null;var Nw={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const Rw=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Pw=(e,t)=>{const n=b.forwardRef(({color:r="currentColor",size:s=24,strokeWidth:i=2,absoluteStrokeWidth:a,children:l,...c},u)=>b.createElement("svg",{ref:u,...Nw,width:s,height:s,stroke:r,strokeWidth:a?Number(i)*24/Number(s):i,className:`lucide lucide-${Rw(e)}`,...c},[...t.map(([p,m])=>b.createElement(p,m)),...(Array.isArray(l)?l:[l])||[]]));return n.displayName=`${e}`,n};var yn=Pw;const zw=yn("Calendar",[["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",ry:"2",key:"eu3xkr"}],["line",{x1:"16",x2:"16",y1:"2",y2:"6",key:"m3sa8f"}],["line",{x1:"8",x2:"8",y1:"2",y2:"6",key:"18kwsl"}],["line",{x1:"3",x2:"21",y1:"10",y2:"10",key:"xt86sb"}]]),Lw=yn("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]),_f=yn("Eye",[["path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z",key:"rwhkz3"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]),Ow=yn("MessageCircle",[["path",{d:"m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z",key:"v2veuj"}]]),Iw=yn("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]),Aw=yn("Share",[["path",{d:"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8",key:"1b2hhj"}],["polyline",{points:"16 6 12 2 8 6",key:"m901s6"}],["line",{x1:"12",x2:"12",y1:"2",y2:"15",key:"1p0rca"}]]),Nf=yn("TrendingUp",[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]]),Rf=yn("UserCheck",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["polyline",{points:"16 11 18 13 22 9",key:"1pwet4"}]]),Pf=yn("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]),Mw=()=>{const{token:e}=gt(),[t,n]=b.useState([]),[r,s]=b.useState(null),[i,a]=b.useState(!0),[l,c]=b.useState(!1),[u,p]=b.useState(!1),[m,y]=b.useState({customMessage:"Hey! I'd love for you to join this amazing platform. It's perfect for connecting contractors and workers. Check it out!"}),w=async()=>{if(!e){a(!1);return}try{const h=await fetch("/api/invitations",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(h.ok){const k=await h.json();n(k.data.invitations),s(k.data.stats)}}catch(h){console.error("Error fetching invitations:",h)}finally{a(!1)}},g=async()=>{if(!e){alert("Please log in to create invitations");return}p(!0);try{const h=await fetch("/api/invitations",{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({invitationType:"general",customMessage:m.customMessage})});if(h.ok){const k=await h.json(),{invitationLink:E,shareLinks:R}=k.data;v(E,R),w(),y({customMessage:"Hey! I'd love for you to join this amazing platform. It's perfect for connecting contractors and workers. Check it out!"}),c(!1)}else alert("Failed to create invitation. Please try again.")}catch(h){console.error("Error creating invitation:",h),alert("Error creating invitation. Please try again.")}finally{p(!1)}},v=(h,k)=>{const E=`${m.customMessage}

${h}`,R=document.createElement("div");R.className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",R.innerHTML=`
      <div class="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
        <h3 class="text-lg font-semibold mb-4">🎉 Your Invitation Message is Ready!</h3>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Complete Message to Share:</label>
          <div class="bg-gray-50 p-4 rounded-lg border mb-3">
            <div class="text-sm text-gray-800 whitespace-pre-wrap">${E}</div>
          </div>
          <div class="flex items-center space-x-2">
            <button onclick="navigator.clipboard.writeText('${E.replace(/'/g,"\\'")}')" class="flex-1 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
              📋 Copy Complete Message
            </button>
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Or share directly:</label>
          <div class="grid grid-cols-3 gap-2">
            <a href="${k.whatsapp}" target="_blank" class="flex flex-col items-center p-3 bg-green-500 text-white rounded hover:bg-green-600">
              <svg class="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 2.079.549 4.088 1.595 5.872L0 24l6.257-1.611c1.724.957 3.67 1.466 5.76 1.466 6.621 0 11.988-5.367 11.988-11.988C23.971 5.346 18.637.001 12.017.001zM18.476 16.641c-.295.827-1.455 1.511-2.389 1.701-.642.131-1.48.193-4.318-1.012-3.604-1.532-5.918-5.17-6.096-5.412-.177-.241-1.455-1.933-1.455-3.688s.916-2.616 1.241-2.975c.326-.359.712-.449 1.012-.449.295 0 .594.006.85.015.273.01.64-.103.998 1.012.366 1.139 1.262 3.076 1.375 3.297.113.221.189.482.038.772-.15.295-.225.482-.449.741-.225.259-.472.577-.675.772-.225.221-.459.459-.197.9.262.441 1.166 1.93 2.505 3.125 1.723 1.54 3.174 2.018 3.628 2.244.455.225.719.189.984-.113.266-.302 1.139-1.329 1.442-1.785.304-.455.607-.378.026.227-.38.604-1.513 2.244-2.389 2.714z"/>
              </svg>
              <span class="text-xs">WhatsApp</span>
            </a>
            <a href="${k.email}" target="_blank" class="flex flex-col items-center p-3 bg-blue-500 text-white rounded hover:bg-blue-600">
              <svg class="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <span class="text-xs">Email</span>
            </a>
            <a href="${k.sms}" target="_blank" class="flex flex-col items-center p-3 bg-gray-500 text-white rounded hover:bg-gray-600">
              <svg class="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
              <span class="text-xs">SMS</span>
            </a>
          </div>
        </div>
        <button onclick="this.parentElement.parentElement.remove()" class="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600">
          Close
        </button>
      </div>
    `,document.body.appendChild(R)},S=h=>{navigator.clipboard.writeText(h)},x=h=>new Date(h).toLocaleDateString(),f=h=>{switch(h){case"sent":return"bg-yellow-100 text-yellow-800";case"clicked":return"bg-blue-100 text-blue-800";case"registered":return"bg-green-100 text-green-800";case"expired":return"bg-red-100 text-red-800";default:return"bg-gray-100 text-gray-800"}};return b.useEffect(()=>{w()},[]),i?o.jsx("div",{className:"flex items-center justify-center p-8",children:o.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"})}):o.jsxs("div",{className:"max-w-6xl mx-auto p-6",children:[o.jsxs("div",{className:"bg-white rounded-lg shadow-sm border",children:[o.jsx("div",{className:"border-b p-6",children:o.jsxs("div",{className:"flex items-center justify-between",children:[o.jsxs("div",{children:[o.jsxs("h2",{className:"text-2xl font-semibold text-gray-900 flex items-center",children:[o.jsx(Pf,{className:"mr-3 text-blue-600",size:28}),"Invite Friends"]}),o.jsx("p",{className:"text-gray-600 mt-1",children:"Grow our community by inviting friends and colleagues"})]}),o.jsxs("button",{onClick:()=>c(!0),className:"bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2",children:[o.jsx(Iw,{size:16}),o.jsx("span",{children:"Create Invitation Message"})]})]})}),r&&o.jsx("div",{className:"p-6 border-b bg-gray-50",children:o.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-5 gap-4",children:[o.jsxs("div",{className:"text-center",children:[o.jsx("div",{className:"flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-2",children:o.jsx(Aw,{className:"text-blue-600",size:20})}),o.jsx("div",{className:"text-2xl font-semibold text-gray-900",children:r.totalSent}),o.jsx("div",{className:"text-sm text-gray-600",children:"Sent"})]}),o.jsxs("div",{className:"text-center",children:[o.jsx("div",{className:"flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-2",children:o.jsx(_f,{className:"text-purple-600",size:20})}),o.jsx("div",{className:"text-2xl font-semibold text-gray-900",children:r.totalClicked}),o.jsx("div",{className:"text-sm text-gray-600",children:"Clicked"})]}),o.jsxs("div",{className:"text-center",children:[o.jsx("div",{className:"flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-2",children:o.jsx(Rf,{className:"text-green-600",size:20})}),o.jsx("div",{className:"text-2xl font-semibold text-gray-900",children:r.totalRegistered}),o.jsx("div",{className:"text-sm text-gray-600",children:"Joined"})]}),o.jsxs("div",{className:"text-center",children:[o.jsx("div",{className:"flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mx-auto mb-2",children:o.jsx(Nf,{className:"text-orange-600",size:20})}),o.jsxs("div",{className:"text-2xl font-semibold text-gray-900",children:[r.clickRate.toFixed(1),"%"]}),o.jsx("div",{className:"text-sm text-gray-600",children:"Click Rate"})]}),o.jsxs("div",{className:"text-center",children:[o.jsx("div",{className:"flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mx-auto mb-2",children:o.jsx(Nf,{className:"text-indigo-600",size:20})}),o.jsxs("div",{className:"text-2xl font-semibold text-gray-900",children:[r.conversionRate.toFixed(1),"%"]}),o.jsx("div",{className:"text-sm text-gray-600",children:"Conversion"})]})]})}),o.jsxs("div",{className:"p-6",children:[o.jsx("h3",{className:"text-lg font-medium text-gray-900 mb-4",children:"Your Invitations"}),t.length===0?o.jsxs("div",{className:"text-center py-8",children:[o.jsx(Pf,{className:"mx-auto h-12 w-12 text-gray-400"}),o.jsx("h3",{className:"mt-2 text-sm font-medium text-gray-900",children:"No invitations yet"}),o.jsx("p",{className:"mt-1 text-sm text-gray-500",children:"Start by creating your first invitation"})]}):o.jsx("div",{className:"space-y-4",children:t.map(h=>o.jsx("div",{className:"border rounded-lg p-4 hover:bg-gray-50 transition-colors",children:o.jsxs("div",{className:"flex items-center justify-between",children:[o.jsxs("div",{className:"flex-1",children:[o.jsxs("div",{className:"flex items-center space-x-3",children:[o.jsx("div",{className:`px-2 py-1 rounded-full text-xs font-medium ${f(h.status)}`,children:h.status.charAt(0).toUpperCase()+h.status.slice(1)}),o.jsx("span",{className:"text-sm text-gray-500 capitalize",children:h.type}),h.recipientName&&o.jsxs("span",{className:"text-sm text-gray-700",children:["→ ",h.recipientName]})]}),o.jsxs("div",{className:"mt-2 flex items-center space-x-4 text-sm text-gray-500",children:[o.jsxs("span",{className:"flex items-center",children:[o.jsx(zw,{className:"mr-1",size:14}),x(h.createdAt)]}),o.jsxs("span",{className:"flex items-center",children:[o.jsx(_f,{className:"mr-1",size:14}),h.clicksCount," clicks"]}),h.registeredAt&&o.jsxs("span",{className:"flex items-center text-green-600",children:[o.jsx(Rf,{className:"mr-1",size:14}),"Joined ",x(h.registeredAt)]})]})]}),o.jsxs("div",{className:"flex items-center space-x-2",children:[o.jsx("button",{onClick:()=>{const k=`${window.location.origin}/register?invite=${h.code}`;S(k)},className:"p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded",title:"Copy link",children:o.jsx(Lw,{size:16})}),o.jsx("button",{onClick:()=>{const k=`${window.location.origin}/register?invite=${h.code}`,E=`https://wa.me/?text=${encodeURIComponent(`Join our platform! ${k}`)}`;window.open(E,"_blank")},className:"p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded",title:"Share on WhatsApp",children:o.jsx(Ow,{size:16})})]})]})},h.id))})]})]}),l&&o.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",children:o.jsxs("div",{className:"bg-white rounded-lg p-6 max-w-md w-full mx-4",children:[o.jsx("h3",{className:"text-lg font-semibold mb-4",children:"Create Invitation Message"}),o.jsx("div",{className:"space-y-4",children:o.jsxs("div",{children:[o.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Write your invitation message"}),o.jsx("textarea",{value:m.customMessage,onChange:h=>y({...m,customMessage:h.target.value}),className:"w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500",rows:4,placeholder:"Write your personal invitation message here..."}),o.jsx("p",{className:"text-sm text-gray-500 mt-1",children:"Write a personal message to invite someone. The invitation link will be automatically added to your message."})]})}),o.jsxs("div",{className:"flex space-x-3 mt-6",children:[o.jsx("button",{onClick:()=>c(!1),className:"flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300",disabled:u,children:"Cancel"}),o.jsx("button",{onClick:g,className:"flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50",disabled:u,children:u?"Creating...":"Generate Message & Link"})]})]})})]})};function Fw(e,t){return e?/^\+?\d{7,15}$/.test(e.trim())?"phone":/^\S+@\S+\.\S+$/.test(e.trim())?"email":t!=null&&t.provider||t!=null&&t.oauth_provider?"oauth":"email":t!=null&&t.email?"email":t!=null&&t.phone?"phone":"unknown"}function Dw(e,t){return e&&e.trim()?e.trim().split(" ").map(n=>n[0]).join("").toUpperCase().slice(0,2):t?t.split("@")[0].slice(0,2).toUpperCase():"U"}function $w(e,t){const n=["#FF6B6B","#4ECDC4","#45B7D1","#96CEB4","#FECA57","#FF9FF3","#54A0FF","#5F27CD","#00D2D3","#FF9F43","#10AC84","#EE5A6F","#60A3BC","#778CA3","#F8B500"],r=e||t||"default";let s=0;for(let i=0;i<r.length;i++)s=r.charCodeAt(i)+((s<<5)-s);return n[Math.abs(s)%n.length]}const Bw=()=>{var Ru,Pu;const{user:e,token:t}=gt(),n=Fw((e==null?void 0:e.username)||"",e),r=((Ru=e==null?void 0:e.roles)==null?void 0:Ru.includes("admin"))||(e==null?void 0:e.role)==="admin",s=b.useRef(null),i=I=>I==="email"&&n==="email"||I==="phone"&&n==="phone",[a,l]=b.useState([{value:"",label:"Select skill type"}]),[c,u]=b.useState(!1),[p,m]=b.useState(""),[y,w]=b.useState({}),[g,v]=b.useState("basic"),[S,x]=b.useState("idle"),[f,h]=b.useState(null),[k,E]=b.useState(!1),R={email:n==="email"&&(e==null?void 0:e.username)||"",phone:n==="phone"&&(e==null?void 0:e.username)||"",role:(e==null?void 0:e.role)||void 0,name:"",location:"",address:"",avatar:null,skillType:"",experienceYears:null,hourlyRate:null,availability:"",description:"",isAvailable:null,rating:null,completedJobs:null,skills:[],certifications:[],portfolioLinks:[],companyName:"",companyDescription:"",verificationStatus:null,totalJobsPosted:null,companyWebsite:"",companySize:"",establishedYear:null},[T,N]=b.useState(R),[C,P]=b.useState(R),[U,J]=b.useState(!0),[re,xe]=b.useState(!1),[ve,se]=b.useState(""),[me,O]=b.useState(null),[W,H]=b.useState([]),[Y,G]=b.useState(!1),[Me,Ee]=b.useState({projects:[],certifications:[],socialLinks:[]}),[Bt,ct]=b.useState([]),xn=jw(T,e);b.useEffect(()=>{},[xn.isFirstLogin,U,T,e]),b.useEffect(()=>{t&&(async()=>{try{const F=await(await xr(`${Ft.USER_SERVICE}/skills`,{headers:t?{Authorization:`Bearer ${t}`}:{}})).json(),le=(F==null?void 0:F.skills)||(F==null?void 0:F.data)||[];ct(Array.isArray(le)?le:[])}catch(z){console.log("Failed to load skills:",z),ct(["JavaScript","Python","React","Node.js","CSS","HTML","TypeScript","Vue.js","Angular","PHP"])}})()},[t]);const B=(I,z,F)=>{let le="";return z&&(le=z.skillType||z.skill_type||z.skilltype||z.SkillType||z.SKILL_TYPE||"",!le&&z.skills&&Array.isArray(z.skills)&&z.skills.length>0&&(le=z.skills[0])),{id:I.id,name:I.name??null,email:I.email??(n==="email"?I.username:null),phone:I.phone??(n==="phone"?I.username:null),role:I.role,location:I.location??null,address:I.address??null,avatar:I.avatar??null,skillType:le||null,experienceYears:((z==null?void 0:z.experienceYears)||(z==null?void 0:z.experience_years))??null,hourlyRate:((z==null?void 0:z.hourlyRate)||(z==null?void 0:z.hourly_rate))??null,availability:(z==null?void 0:z.availability)??null,description:(z==null?void 0:z.description)??null,isAvailable:(z==null?void 0:z.isAvailable)??(z==null?void 0:z.is_available)??null,rating:((z==null?void 0:z.rating)||(F==null?void 0:F.rating))??null,completedJobs:(z==null?void 0:z.completed_jobs)??null,skills:(z==null?void 0:z.skills)||[],certifications:(z==null?void 0:z.certifications)||[],portfolioLinks:(z==null?void 0:z.portfolio_links)||[],companyName:((F==null?void 0:F.companyName)||(F==null?void 0:F.company_name))??null,companyDescription:((F==null?void 0:F.companyDescription)||(F==null?void 0:F.company_description))??null,verificationStatus:(F==null?void 0:F.verification_status)??null,totalJobsPosted:(F==null?void 0:F.total_jobs_posted)??null,companyWebsite:(F==null?void 0:F.company_website)??null,companySize:(F==null?void 0:F.company_size)??null,establishedYear:(F==null?void 0:F.established_year)??null}},Pe=b.useCallback(async()=>{var z;return t?(z=(await te.get("http://localhost:3002/api/users/profile",{withCredentials:!0,headers:{Authorization:`Bearer ${t}`}})).data)==null?void 0:z.data:null},[t]),vn=Sa(),{data:Ps,isLoading:Lr,error:Et}=c0({queryKey:["profile"],queryFn:Pe,enabled:!!t,staleTime:1e3*60});b.useEffect(()=>{if(Ps){const I=Ps,z=I.user||{},F=z.role==="worker"&&(I.workerProfile||I.profile)||void 0,le=z.role==="contractor"&&(I.contractorProfile||I.profile)||void 0,Fe=B(z,F,le);N(Fe);const be={...Fe};if(be.phone===null&&(be.phone=""),be.email===null&&(be.email=""),be.name===null&&(be.name=""),be.location===null&&(be.location=""),be.address===null&&(be.address=""),P(Xt=>({...Xt,...be})),I.meta&&(typeof I.meta.completeness=="number"&&O(I.meta.completeness),Array.isArray(I.meta.completenessBreakdown))){const Xt=I.meta.completenessBreakdown.filter(Or=>!Or.present).map(Or=>Or.field);H(Xt)}J(!1)}else Lr||J(!1)},[Ps,Lr]);const Nu=b.useCallback(async()=>{var I;u(!0),m("");try{const F=((I=(await te.get("http://localhost:3002/api/users/skills")).data)==null?void 0:I.data)||[],le=[{value:"",label:"Select skill type"},...F.map(Fe=>({value:Fe,label:Fe.charAt(0).toUpperCase()+Fe.slice(1)}))];l(le)}catch{m("Failed to load skills")}finally{u(!1)}},[]);b.useEffect(()=>{Nu()},[Nu]);const d0=async I=>{var F;const z=(F=I.target.files)==null?void 0:F[0];if(z){if(z.size>5*1024*1024){$.error("File size must be less than 5MB");return}if(!z.type.startsWith("image/")){$.error("Please select an image file");return}try{E(!0);const le=new FileReader;le.onload=be=>{var Xt;h((Xt=be.target)==null?void 0:Xt.result)},le.readAsDataURL(z),new FormData().append("avatar",z),setTimeout(()=>{P(be=>({...be,avatar:URL.createObjectURL(z)})),$.success("Avatar uploaded successfully!"),E(!1)},1500)}catch{$.error("Failed to upload avatar"),E(!1),h(null)}}},f0=I=>I&&I.startsWith("+91")?I.slice(3):I||"";function Tt(I){const{name:z,value:F}=I.target;if(z==="phone"){const Fe=F.replace(/\D/g,"").slice(0,10),be=Fe?`+91${Fe}`:"";P({...C,[z]:be})}else P({...C,[z]:F});w({...y,[z]:""}),x("saving")}const p0=()=>{const I={};if(r){const Fe=C.email||"";Fe.trim()?/^\S+@\S+\.\S+$/.test(Fe)||(I.email="Invalid email address."):I.email="Email is required."}const z=C.phone||"";return z&&(/^\+91[6-9]\d{9}$/.test(z)||(I.phone="Phone number must be in format +91xxxxxxxxxx (10 digits starting with 6-9)")),(C.location||"").trim()||(I.location="Location is required."),(C.address||"").trim()||(I.address="Address is required."),T.role==="worker"&&!C.skillType&&(I.skillType="Skill type is required."),I},Di=u0({mutationFn:async I=>{const{userPayload:z,workerPayload:F,contractorPayload:le}=I;return Object.keys(z).length>0&&await te.put("http://localhost:3002/api/users/profile",z,{withCredentials:!0,headers:t?{Authorization:`Bearer ${t}`}:{}}),T.role==="worker"&&F&&Object.keys(F).length>0&&await te.put("http://localhost:3002/api/users/worker-profile",F,{withCredentials:!0,headers:t?{Authorization:`Bearer ${t}`}:{}}),T.role==="contractor"&&le&&Object.keys(le).length>0&&await te.put("http://localhost:3002/api/users/contractor-profile",le,{withCredentials:!0,headers:t?{Authorization:`Bearer ${t}`}:{}}),!0},onError:(I,z,F)=>{$.error("Failed to update profile."),x("error")},onSuccess:async()=>{await vn.invalidateQueries({queryKey:["profile"]}),$.success("Profile updated successfully!"),x("saved"),G(!0),setTimeout(()=>{x("idle"),G(!1)},3e3)}}),h0=async I=>{var F,le,Fe,be,Xt,Or;I.preventDefault(),se("");const z=p0();if(w(z),!(Object.keys(z).length>0))try{const ze={name:C.name,phone:C.phone,location:C.location,address:C.address};r&&(ze.email=C.email),Object.keys(ze).forEach(Te=>{(ze[Te]===void 0||ze[Te]===""||ze[Te]===null)&&delete ze[Te]});let _t,Ge;T.role==="worker"&&(_t={skillType:C.skillType,experienceYears:C.experienceYears,availability:C.availability,description:C.description,isAvailable:C.isAvailable,skills:C.skills,certifications:C.certifications,portfolioLinks:C.portfolioLinks},Object.keys(_t).forEach(Te=>{(_t[Te]===void 0||_t[Te]===null||_t[Te]==="")&&delete _t[Te]}),Object.keys(_t).length===0&&(_t=void 0)),T.role==="contractor"&&(Ge={companyName:C.companyName,companyDescription:C.companyDescription,companyWebsite:C.companyWebsite,companySize:C.companySize,establishedYear:C.establishedYear},Object.keys(Ge).forEach(Te=>{(Ge[Te]===void 0||Ge[Te]===null||Ge[Te]==="")&&delete Ge[Te]}),Object.keys(Ge).length===0&&(Ge=void 0)),await Di.mutateAsync({userPayload:ze,workerPayload:_t,contractorPayload:Ge}),xe(!0),setTimeout(()=>xe(!1),2e3)}catch(ze){const _t=(le=(F=ze==null?void 0:ze.response)==null?void 0:F.data)==null?void 0:le.code,Ge=((be=(Fe=ze==null?void 0:ze.response)==null?void 0:Fe.data)==null?void 0:be.message)||((Or=(Xt=ze==null?void 0:ze.response)==null?void 0:Xt.data)==null?void 0:Or.error)||"";_t==="CONFLICT"||Ge.toLowerCase().includes("email")?(w(Te=>({...Te,email:"This email is already in use by another account."})),se("This email is already in use by another account."),$.error("This email is already in use by another account.")):Ge.toLowerCase().includes("phone")?(w(Te=>({...Te,phone:"This phone number is already in use by another account."})),se("This phone number is already in use by another account."),$.error("This phone number is already in use by another account.")):(se(Ge||"Failed to update profile."),$.error(Ge||"Failed to update profile."))}},m0=I=>Array.from({length:5},(z,F)=>o.jsx("span",{style:{color:F<I?"#FFD700":"#DDD",fontSize:"1.2em"},children:"★"},F));return U||Lr?o.jsxs("div",{style:{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)"},children:[o.jsxs("div",{style:{textAlign:"center",color:"white"},children:[o.jsx("div",{style:{width:"60px",height:"60px",border:"4px solid rgba(255,255,255,0.3)",borderTop:"4px solid white",borderRadius:"50%",animation:"spin 1s linear infinite",margin:"0 auto 1rem"}}),o.jsx("div",{children:"Loading your profile..."})]}),o.jsx("style",{children:`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `})]}):o.jsxs(o.Fragment,{children:[o.jsx(bu,{position:"top-right",autoClose:3e3,hideProgressBar:!1,newestOnTop:!0,closeOnClick:!0,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0}),o.jsx("style",{children:`
        .enhanced-profile {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 2rem 1rem;
          font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        .profile-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 350px 1fr;
          gap: 2rem;
          align-items: start;
        }
        
        .profile-sidebar {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          position: sticky;
          top: 2rem;
        }
        
        .profile-main {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        
        .avatar-section {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .avatar-wrapper {
          position: relative;
          display: inline-block;
          margin-bottom: 1rem;
        }
        
        .avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5em;
          font-weight: bold;
          color: white;
          margin: 0 auto;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .avatar:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
        
        .avatar-upload-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          color: white;
          font-size: 0.9em;
          border-radius: 50%;
        }
        
        .avatar:hover .avatar-upload-overlay {
          opacity: 1;
        }
        
        .profile-name {
          font-size: 1.5em;
          font-weight: 700;
          margin: 0.5rem 0;
          color: #2d3748;
        }
        
        .profile-role {
          display: inline-block;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 0.3rem 1rem;
          border-radius: 20px;
          font-size: 0.9em;
          font-weight: 600;
          text-transform: capitalize;
        }
        
        .completeness-card {
          background: #f7fafc;
          border-radius: 12px;
          padding: 1.5rem;
          margin: 1.5rem 0;
        }
        
        .completeness-bar {
          width: 100%;
          height: 8px;
          background: #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
          margin: 0.5rem 0;
        }
        
        .completeness-fill {
          height: 100%;
          background: linear-gradient(90deg, #48bb78 0%, #38a169 100%);
          transition: width 0.3s ease;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-top: 1.5rem;
        }
        
        .stat-card {
          background: #f7fafc;
          border-radius: 12px;
          padding: 1rem;
          text-align: center;
        }
        
        .stat-number {
          font-size: 1.5em;
          font-weight: 700;
          color: #2d3748;
        }
        
        .stat-label {
          font-size: 0.8em;
          color: #718096;
          margin-top: 0.25rem;
        }

        .sidebar-section {
          background: #f7fafc;
          border-radius: 12px;
          padding: 1rem;
          margin-top: 1rem;
          border: 1px solid #e2e8f0;
        }

        .sidebar-section-title {
          margin: 0 0 0.75rem 0;
          font-size: 0.9em;
          font-weight: 700;
          color: #2d3748;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .sidebar-details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .detail-item {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.85em;
        }

        .detail-label {
          font-weight: 600;
          color: #4a5568;
          min-width: 60px;
          flex-shrink: 0;
        }

        .detail-value {
          color: #2d3748;
          flex: 1;
          word-break: break-word;
        }

        .registration-badge {
          font-size: 0.8em;
          background: #e6fffa;
          color: #234e52;
          padding: 0.1rem 0.3rem;
          border-radius: 4px;
          margin-left: 0.25rem;
        }

        .skill-badge {
          background: #667eea;
          color: white;
          padding: 0.2rem 0.5rem;
          border-radius: 6px;
          font-size: 0.8em;
          font-weight: 600;
        }

        .skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.25rem;
          align-items: center;
        }

        .skill-tag-mini {
          background: #e2e8f0;
          color: #4a5568;
          padding: 0.1rem 0.4rem;
          border-radius: 4px;
          font-size: 0.7em;
          font-weight: 500;
        }

        .skill-more {
          color: #718096;
          font-size: 0.7em;
          font-style: italic;
        }

        .availability-badge {
          padding: 0.2rem 0.5rem;
          border-radius: 6px;
          font-size: 0.8em;
          font-weight: 600;
        }

        .availability-badge.available {
          background: #c6f6d5;
          color: #276749;
        }

        .availability-badge.unavailable {
          background: #fed7d7;
          color: #742a2a;
        }
        
        .section-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
          border-bottom: 2px solid #e2e8f0;
        }
        
        .tab-button {
          padding: 0.75rem 1.5rem;
          border: none;
          background: none;
          color: #718096;
          font-weight: 600;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: all 0.3s ease;
        }
        
        .tab-button.active {
          color: #667eea;
          border-bottom-color: #667eea;
        }
        
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-group.full-width {
          grid-column: 1 / -1;
        }
        
        .form-label {
          display: block;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 0.5rem;
          font-size: 0.9em;
        }
        
        .form-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: #f7fafc;
        }
        
        .form-input:focus {
          outline: none;
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        
        .form-textarea {
          min-height: 100px;
          resize: vertical;
        }
        
        .form-error {
          color: #e53e3e;
          font-size: 0.8em;
          margin-top: 0.25rem;
        }
        
        .save-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 0.75rem 2rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
        }
        
        .save-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
        }
        
        .save-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
        
        .auto-save-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8em;
          color: #718096;
          margin-left: 1rem;
        }
        
        .skills-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }
        
        .skill-tag {
          background: #e6fffa;
          color: #234e52;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8em;
          border: 1px solid #b2f5ea;
        }
        
        @media (max-width: 768px) {
          .profile-container {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .profile-sidebar {
            position: static;
          }
          
          .form-grid {
            grid-template-columns: 1fr;
          }
          
          .enhanced-profile {
            padding: 1rem 0.5rem;
          }
        }
      `}),o.jsx("div",{className:"enhanced-profile",children:o.jsxs("div",{className:"profile-container",children:[o.jsxs("div",{className:"profile-sidebar",children:[o.jsxs("div",{className:"avatar-section",children:[o.jsxs("div",{className:"avatar-wrapper",children:[o.jsxs("div",{className:"avatar",style:{backgroundImage:C.avatar?`url(${C.avatar})`:"none",backgroundSize:"cover",backgroundPosition:"center",backgroundColor:C.avatar?"transparent":$w(C.name,e==null?void 0:e.username)},onClick:()=>{var I;return(I=s.current)==null?void 0:I.click()},children:[!C.avatar&&Dw(C.name,e==null?void 0:e.username),o.jsx("div",{className:"avatar-upload-overlay",children:k?"⏳":"📷 Upload"})]}),o.jsx("input",{ref:s,type:"file",accept:"image/*",onChange:d0,style:{display:"none"}})]}),o.jsx("div",{className:"profile-name",children:C.name||(e==null?void 0:e.username)||"User"}),C.role&&o.jsx("div",{className:"profile-role",children:C.role}),C.rating&&o.jsxs("div",{style:{margin:"1rem 0"},children:[m0(C.rating),o.jsxs("div",{style:{fontSize:"0.8em",color:"#718096",marginTop:"0.25rem"},children:[C.rating,"/5 Rating"]})]})]}),me!==null&&o.jsxs("div",{className:"completeness-card",children:[o.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"0.5rem"},children:[o.jsx("span",{style:{fontWeight:"600",color:"#2d3748"},children:"Profile Completeness"}),o.jsxs("span",{style:{fontWeight:"700",color:"#667eea"},children:[me,"%"]})]}),o.jsx("div",{className:"completeness-bar",children:o.jsx("div",{className:"completeness-fill",style:{width:`${me}%`}})}),W.length>0&&o.jsxs("div",{style:{fontSize:"0.8em",color:"#718096",marginTop:"0.5rem"},children:["Missing: ",W.join(", ")]})]}),o.jsxs("div",{className:"stats-grid",children:[C.role==="worker"&&o.jsx(o.Fragment,{children:o.jsxs("div",{className:"stat-card",children:[o.jsx("div",{className:"stat-number",children:C.completedJobs||0}),o.jsx("div",{className:"stat-label",children:"Jobs Done"})]})}),C.role==="contractor"&&o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"stat-card",children:[o.jsx("div",{className:"stat-number",children:C.totalJobsPosted||0}),o.jsx("div",{className:"stat-label",children:"Jobs Posted"})]}),o.jsxs("div",{className:"stat-card",children:[o.jsx("div",{className:"stat-number",children:C.establishedYear||"N/A"}),o.jsx("div",{className:"stat-label",children:"Established"})]})]})]}),o.jsxs("div",{className:"sidebar-section",children:[o.jsx("h4",{className:"sidebar-section-title",children:"📞 Contact Info"}),o.jsxs("div",{className:"sidebar-details",children:[C.email&&o.jsxs("div",{className:"detail-item",children:[o.jsx("span",{className:"detail-label",children:"Email:"}),o.jsx("span",{className:"detail-value",children:C.email}),i("email")&&o.jsx("span",{className:"registration-badge",children:"📧"})]}),C.phone&&o.jsxs("div",{className:"detail-item",children:[o.jsx("span",{className:"detail-label",children:"Phone:"}),o.jsx("span",{className:"detail-value",children:C.phone}),i("phone")&&o.jsx("span",{className:"registration-badge",children:"📱"})]}),C.location&&o.jsxs("div",{className:"detail-item",children:[o.jsx("span",{className:"detail-label",children:"Location:"}),o.jsx("span",{className:"detail-value",children:C.location})]}),C.address&&o.jsxs("div",{className:"detail-item",children:[o.jsx("span",{className:"detail-label",children:"Address:"}),o.jsx("span",{className:"detail-value",children:C.address})]})]})]}),(C.skillType||((Pu=C.skills)==null?void 0:Pu.length)||C.experienceYears)&&o.jsxs("div",{className:"sidebar-section",children:[o.jsx("h4",{className:"sidebar-section-title",children:"💼 Professional"}),o.jsxs("div",{className:"sidebar-details",children:[C.skillType&&o.jsxs("div",{className:"detail-item",children:[o.jsx("span",{className:"detail-label",children:"Primary Skill:"}),o.jsx("span",{className:"detail-value skill-badge",children:C.skillType})]}),C.experienceYears&&o.jsxs("div",{className:"detail-item",children:[o.jsx("span",{className:"detail-label",children:"Experience:"}),o.jsxs("span",{className:"detail-value",children:[C.experienceYears," years"]})]}),C.skills&&C.skills.length>0&&o.jsxs("div",{className:"detail-item",children:[o.jsx("span",{className:"detail-label",children:"Skills:"}),o.jsxs("div",{className:"skills-list",children:[C.skills.slice(0,3).map(I=>o.jsx("span",{className:"skill-tag-mini",children:I},I)),C.skills.length>3&&o.jsxs("span",{className:"skill-more",children:["+",C.skills.length-3," more"]})]})]})]})]}),o.jsxs("div",{className:"sidebar-section",children:[o.jsx("h4",{className:"sidebar-section-title",children:"🔐 Account"}),o.jsxs("div",{className:"sidebar-details",children:[o.jsxs("div",{className:"detail-item",children:[o.jsx("span",{className:"detail-label",children:"Registration:"}),o.jsxs("span",{className:"detail-value",children:[n==="email"&&"Email based",n==="phone"&&"Phone based",n==="oauth"&&"OAuth based",n==="unknown"&&"Standard account"]})]}),T.profileCompletedAt&&o.jsxs("div",{className:"detail-item",children:[o.jsx("span",{className:"detail-label",children:"Completed:"}),o.jsx("span",{className:"detail-value",children:new Date(T.profileCompletedAt).toLocaleDateString()})]}),T.profileLockedAt&&o.jsxs("div",{className:"detail-item",children:[o.jsx("span",{className:"detail-label",children:"Secured:"}),o.jsx("span",{className:"detail-value",children:"🔒 Locked"})]})]})]}),r&&o.jsx("div",{style:{background:"linear-gradient(135deg, #ffd700 0%, #ff8c00 100%)",color:"#333",padding:"0.5rem 1rem",borderRadius:"8px",textAlign:"center",fontWeight:"700",marginTop:"1rem"},children:"🔒 ADMIN ACCESS"})]}),o.jsxs("div",{className:"profile-main",children:[o.jsxs("div",{className:"section-tabs",children:[o.jsx("button",{className:`tab-button ${g==="basic"?"active":""}`,onClick:()=>v("basic"),children:"Basic Info"}),o.jsx("button",{className:`tab-button ${g==="professional"?"active":""}`,onClick:()=>v("professional"),children:"Professional"}),o.jsx("button",{className:`tab-button ${g==="portfolio"?"active":""}`,onClick:()=>v("portfolio"),children:"Portfolio"}),o.jsx("button",{className:`tab-button ${g==="sharing"?"active":""}`,onClick:()=>v("sharing"),children:"Sharing"}),o.jsx("button",{className:`tab-button ${g==="invitations"?"active":""}`,onClick:()=>v("invitations"),children:"🎯 Invitations"})]}),o.jsxs("form",{onSubmit:h0,children:[g==="basic"&&o.jsxs("div",{className:"form-grid",children:[o.jsxs("div",{className:"form-group",children:[o.jsxs("label",{className:"form-label",children:["Display Name",C.name&&o.jsx("span",{style:{color:"#38b2ac",fontSize:"0.8em"},children:" (pre-filled)"}),Le(T,"name")&&!r&&o.jsx("span",{style:{color:"#718096",fontSize:"0.8em"},children:" (locked)"})]}),o.jsx("input",{className:"form-input",name:"name",value:C.name||"",onChange:Tt,disabled:!!(C.name&&Le(T,"name")&&!r),style:{opacity:C.name&&Le(T,"name")&&!r?.6:1},placeholder:C.name?"Display name is set":"Your display name"}),C.name&&Le(T,"name")&&!r&&o.jsx("small",{style:{color:"#38b2ac"},children:"This field is locked for security."})]}),o.jsxs("div",{className:"form-group",children:[o.jsxs("label",{className:"form-label",children:["Email",i("email")&&o.jsx("span",{style:{color:"#38b2ac",fontSize:"0.8em"},children:" (registration method)"}),Le(T,"email")&&!r&&!i("email")&&o.jsx("span",{style:{color:"#718096",fontSize:"0.8em"},children:" (locked)"})]}),o.jsx("input",{className:"form-input",name:"email",type:"email",value:C.email||"",onChange:Tt,disabled:i("email")||Le(T,"email")&&!r,style:{opacity:i("email")||Le(T,"email")&&!r?.6:1},placeholder:i("email")?"Registration email (cannot be changed)":Le(T,"email")&&!r?"Email locked for security":"Enter your email"}),y.email&&o.jsx("div",{className:"form-error",children:y.email}),r&&C.email&&o.jsx(Tw,{validation:Ew({fieldName:"Email",value:C.email,rules:[Tf.email,Tf.professionalEmail]})})]}),o.jsxs("div",{className:"form-group",children:[o.jsxs("label",{className:"form-label",children:["Phone",i("phone")&&o.jsx("span",{style:{color:"#38b2ac",fontSize:"0.8em"},children:" (registration method)"}),Le(T,"phone")&&!r&&!i("phone")&&o.jsx("span",{style:{color:"#718096",fontSize:"0.8em"},children:" (locked)"})]}),o.jsxs("div",{className:"phone-input-container",style:{display:"flex",alignItems:"center",border:"1px solid #e2e8f0",borderRadius:"6px",padding:"0",backgroundColor:"white",opacity:i("phone")||Le(T,"phone")&&!r?.6:1},children:[o.jsx("div",{className:"country-code",style:{padding:"12px 16px",backgroundColor:"#f7fafc",border:"none",borderRight:"1px solid #e2e8f0",color:"#4a5568",fontWeight:"500",fontSize:"16px",minWidth:"60px",textAlign:"center"},children:"+91"}),o.jsx("input",{className:"form-input",name:"phone",value:f0(C.phone||""),onChange:Tt,disabled:i("phone")||Le(T,"phone")&&!r,style:{border:"none",borderRadius:"0 6px 6px 0",flex:1,margin:0,padding:"12px 16px",fontSize:"16px"},placeholder:i("phone")?"Registration number (cannot be changed)":Le(T,"phone")&&!r?"Number locked for security":"Enter your 10-digit mobile number",maxLength:10,type:"tel"})]}),y.phone&&o.jsx("div",{className:"form-error",children:y.phone})]}),o.jsxs("div",{className:"form-group full-width",children:[o.jsxs("label",{className:"form-label",children:["Location & Address",(C.location||C.address)&&o.jsx("span",{style:{color:"#38b2ac",fontSize:"0.8em"},children:" (pre-filled)"}),Le(T,"location")&&!r&&o.jsx("span",{style:{color:"#718096",fontSize:"0.8em"},children:" (locked)"})]}),o.jsx(Sw,{location:C.location||"",address:C.address||"",onLocationChange:I=>{Le(T,"location")&&!r||P(z=>({...z,location:I}))},onAddressChange:I=>{Le(T,"address")&&!r||P(z=>({...z,address:I}))},disabled:Di.isPending||Le(T,"location")&&!r}),Le(T,"location")&&!r&&(C.location||C.address)&&o.jsx("small",{style:{color:"#38b2ac"},children:"Location information is locked for security."}),(y.location||y.address)&&o.jsx("div",{className:"form-error",children:y.location||y.address})]}),C.role==="worker"&&o.jsxs("div",{className:"form-group",children:[o.jsx("label",{className:"form-label",children:"Primary Skill"}),o.jsx("select",{className:"form-input",name:"skillType",value:C.skillType||"",onChange:Tt,required:!0,children:a.map(I=>o.jsx("option",{value:I.value,disabled:I.value==="",children:I.label},I.value))}),y.skillType&&o.jsx("div",{className:"form-error",children:y.skillType})]})]}),g==="professional"&&o.jsxs("div",{className:"form-grid",children:[C.role==="worker"&&o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"form-group",children:[o.jsx("label",{className:"form-label",children:"Experience (Years)"}),o.jsx("input",{className:"form-input",name:"experienceYears",type:"number",value:C.experienceYears??"",onChange:Tt,min:0,placeholder:"Years of experience"})]}),o.jsxs("div",{className:"form-group full-width",children:[o.jsx("label",{className:"form-label",children:"Skills"}),o.jsx(bw,{skills:C.skills||[],onSkillsChange:I=>P(z=>({...z,skills:I})),availableSkills:Bt,placeholder:"Add your skills..."})]}),o.jsxs("div",{className:"form-group full-width",children:[o.jsx("label",{className:"form-label",children:"Professional Description"}),o.jsx("textarea",{className:"form-input form-textarea",name:"description",value:C.description||"",onChange:Tt,placeholder:"Describe your skills, experience, and what makes you unique..."})]})]}),C.role==="contractor"&&o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"form-group",children:[o.jsx("label",{className:"form-label",children:"Company Name"}),o.jsx("input",{className:"form-input",name:"companyName",value:C.companyName||"",onChange:Tt,placeholder:"Your company name"})]}),o.jsxs("div",{className:"form-group",children:[o.jsx("label",{className:"form-label",children:"Company Website"}),o.jsx("input",{className:"form-input",name:"companyWebsite",type:"url",value:C.companyWebsite||"",onChange:Tt,placeholder:"https://www.yourcompany.com"})]}),o.jsxs("div",{className:"form-group",children:[o.jsx("label",{className:"form-label",children:"Company Size"}),o.jsxs("select",{className:"form-input",name:"companySize",value:C.companySize||"",onChange:Tt,children:[o.jsx("option",{value:"",children:"Select company size..."}),o.jsx("option",{value:"1-10",children:"1-10 employees"}),o.jsx("option",{value:"11-50",children:"11-50 employees"}),o.jsx("option",{value:"51-200",children:"51-200 employees"}),o.jsx("option",{value:"201-500",children:"201-500 employees"}),o.jsx("option",{value:"500+",children:"500+ employees"})]})]}),o.jsxs("div",{className:"form-group",children:[o.jsx("label",{className:"form-label",children:"Established Year"}),o.jsx("input",{className:"form-input",name:"establishedYear",type:"number",value:C.establishedYear??"",onChange:Tt,min:1900,max:new Date().getFullYear(),placeholder:"Year established"})]}),o.jsxs("div",{className:"form-group full-width",children:[o.jsx("label",{className:"form-label",children:"Company Description"}),o.jsx("textarea",{className:"form-input form-textarea",name:"companyDescription",value:C.companyDescription||"",onChange:Tt,placeholder:"Describe your company, services, and values..."})]})]})]}),g==="portfolio"&&o.jsx(kw,{userRole:C.role||"worker",portfolioItems:Me.projects,certifications:Me.certifications,socialLinks:Me.socialLinks,onPortfolioUpdate:I=>Ee(z=>({...z,projects:I})),onCertificationsUpdate:I=>Ee(z=>({...z,certifications:I})),onSocialLinksUpdate:I=>Ee(z=>({...z,socialLinks:I}))}),g==="sharing"&&o.jsx(ww,{profileId:(e==null?void 0:e.id)||"",userName:C.name||(e==null?void 0:e.username)||"User",isPublic:!1,onPrivacyChange:I=>{console.log("Privacy changed:",I),$.info(`Profile is now ${I?"public":"private"}`)}}),g==="invitations"&&o.jsx("div",{style:{marginTop:"1rem"},children:o.jsx(Mw,{})}),o.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"2rem",paddingTop:"2rem",borderTop:"2px solid #e2e8f0"},children:[o.jsx("button",{type:"submit",className:"save-button",disabled:Di.isPending,children:Di.isPending?"💾 Saving...":"💾 Save Profile"}),o.jsxs("div",{className:"auto-save-indicator",children:[S==="saving"&&o.jsx(o.Fragment,{children:"⏳ Saving..."}),S==="saved"&&o.jsx(o.Fragment,{children:"✅ Saved"}),S==="error"&&o.jsx(o.Fragment,{children:"❌ Error saving"})]})]})]}),(ve||Et)&&o.jsx("div",{style:{background:"#fed7d7",border:"1px solid #feb2b2",color:"#c53030",padding:"1rem",borderRadius:"8px",marginTop:"1rem"},children:ve||(Et==null?void 0:Et.message)}),re&&o.jsx("div",{style:{background:"#c6f6d5",border:"1px solid #9ae6b4",color:"#2f855a",padding:"1rem",borderRadius:"8px",marginTop:"1rem"},children:"✅ Profile updated successfully!"})]})]})}),o.jsx(_w,{message:"Profile Updated Successfully!",show:Y})]})},Uw=()=>{var E,R,T;const{user:e,token:t}=gt(),n=Sa(),[r,s]=b.useState(!1),[i,a]=b.useState(""),[l,c]=b.useState(""),[u,p]=b.useState(!1),[m,y]=b.useState(""),[w,g]=b.useState(""),{data:v,isLoading:S}=c0({queryKey:["profile"],queryFn:async()=>{var C;return t?(C=(await te.get("http://localhost:3002/api/users/profile",{withCredentials:!0,headers:{Authorization:`Bearer ${t}`}})).data)==null?void 0:C.data:null},enabled:!!t}),x=u0({mutationFn:async N=>(await te.put("http://localhost:3002/api/users/worker-profile",{isAvailable:N},{withCredentials:!0,headers:t?{Authorization:`Bearer ${t}`}:{}}),N),onSuccess:N=>{n.invalidateQueries({queryKey:["profile"]}),$.success(N?"✅ You are now visible in My Team section!":"⏸️ You are now hidden from My Team section")},onError:()=>{$.error("Failed to update availability status"),s(!r)}});b.useEffect(()=>{if(v&&v.user.role==="worker"&&v.workerProfile){const N=v.workerProfile.isAvailable??v.workerProfile.is_available??!1;s(N)}},[v]),b.useEffect(()=>{var P,U;let N;const C=((P=v==null?void 0:v.workerProfile)==null?void 0:P.availabilityExpiresAt)??((U=v==null?void 0:v.workerProfile)==null?void 0:U.availability_expires_at);if(r&&C){const J=()=>{const re=new Date(C).getTime(),xe=new Date().getTime(),ve=re-xe;if(ve>0){const se=Math.floor(ve/36e5),me=Math.floor(ve%(1e3*60*60)/(1e3*60)),O=Math.floor(ve%(1e3*60)/1e3);a(`${se}h ${me}m ${O}s`)}else a("Expired"),n.invalidateQueries({queryKey:["profile"]})};J(),N=setInterval(J,1e3)}else a("");return()=>{N&&clearInterval(N)}},[r,(E=v==null?void 0:v.workerProfile)==null?void 0:E.availabilityExpiresAt,n]);const f=()=>{const N=!r;s(N),x.mutate(N)};if(!e||!t)return o.jsx("div",{style:{padding:"2rem",textAlign:"center"},children:o.jsx("p",{children:"Please log in to manage your status."})});if(S)return o.jsx("div",{style:{padding:"2rem",textAlign:"center"},children:o.jsx("p",{children:"Loading your profile..."})});const h=((R=v==null?void 0:v.user)==null?void 0:R.role)||(e==null?void 0:e.role)||((T=e==null?void 0:e.roles)==null?void 0:T[0]),k=async N=>{N.preventDefault(),p(!0),y(""),g("");try{await te.post("http://localhost:3003/api/matching/contractor-requirements",{requiredWorkers:Number(l)},{withCredentials:!0,headers:t?{Authorization:`Bearer ${t}`}:{}}),y("Requirement submitted successfully!"),c("")}catch{g("Failed to submit requirement.")}finally{p(!1)}};return h!=="worker"?o.jsxs("div",{style:{padding:"2rem",textAlign:"center"},children:[o.jsx("h2",{children:"Status Management"}),o.jsx("p",{style:{color:"#666",marginTop:"1rem"},children:"As a contractor, you can specify how many workers you require."}),o.jsxs("form",{onSubmit:k,style:{marginTop:"2rem"},children:[o.jsx("label",{htmlFor:"requiredWorkers",style:{fontWeight:500,fontSize:"16px"},children:"Number of workers required:"}),o.jsx("input",{id:"requiredWorkers",type:"number",min:1,value:l,onChange:N=>c(N.target.value===""?"":Number(N.target.value)),style:{marginLeft:"1rem",padding:"0.5rem",fontSize:"16px",width:"80px"},required:!0}),o.jsx("button",{type:"submit",disabled:u||l==="",style:{marginLeft:"1rem",padding:"0.5rem 1.5rem",fontSize:"16px",background:"#2196F3",color:"white",border:"none",borderRadius:"6px",cursor:"pointer"},children:u?"Submitting...":"Submit"})]}),m&&o.jsx("div",{style:{color:"green",marginTop:"1rem"},children:m}),w&&o.jsx("div",{style:{color:"red",marginTop:"1rem"},children:w})]}):o.jsxs("div",{style:{maxWidth:"600px",margin:"2rem auto",padding:"2rem",background:"#fff",borderRadius:"16px",boxShadow:"0 4px 20px rgba(0,0,0,0.08)"},children:[o.jsx(bu,{position:"top-right",autoClose:3e3}),o.jsx("style",{children:`
        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 80px;
          height: 40px;
        }
        
        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: .4s;
          border-radius: 40px;
        }
        
        .slider:before {
          position: absolute;
          content: "";
          height: 32px;
          width: 32px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        input:checked + .slider {
          background-color: #4CAF50;
        }
        
        input:checked + .slider:before {
          transform: translateX(40px);
        }
        
        .status-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 2rem;
          border-radius: 12px;
          margin-bottom: 2rem;
          text-align: center;
        }
        
        .status-card.available {
          background: linear-gradient(135deg, #43a047 0%, #66bb6a 100%);
        }
        
        .status-card.busy {
          background: linear-gradient(135deg, #e53935 0%, #ef5350 100%);
        }
        
        .info-box {
          background: #f5f5f5;
          padding: 1.5rem;
          border-radius: 8px;
          margin-top: 1.5rem;
          border-left: 4px solid #2196F3;
        }
      `}),o.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"},children:[o.jsxs("div",{children:[o.jsx("h2",{style:{margin:0,color:"#333"},children:"Work Status"}),o.jsx("p",{style:{color:"#666",fontSize:"14px",margin:"0.25rem 0 0 0"},children:'Control your visibility in the "My Team" section'})]}),o.jsx("button",{onClick:()=>n.invalidateQueries({queryKey:["profile"]}),style:{padding:"0.5rem 1rem",background:"#2196F3",color:"white",border:"none",borderRadius:"6px",cursor:"pointer",fontSize:"14px"},children:"🔄 Refresh"})]}),S?o.jsx("div",{style:{textAlign:"center",padding:"2rem"},children:o.jsx("p",{children:"Loading status..."})}):o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:`status-card ${r?"available":"busy"}`,children:[o.jsx("div",{style:{fontSize:"48px",marginBottom:"1rem"},children:r?"✅":"⏸️"}),o.jsx("h3",{style:{margin:"0 0 0.5rem 0",fontSize:"24px"},children:r?"Available for Work":"Not Available / Busy"}),o.jsx("p",{style:{margin:"0 0 0.5rem 0",opacity:.9,fontSize:"14px"},children:r?"You are visible to contractors in My Team section":"You are hidden from My Team section"}),r&&i&&o.jsxs("div",{style:{marginTop:"1rem",padding:"0.5rem 1rem",background:"rgba(255, 255, 255, 0.2)",borderRadius:"20px",fontSize:"16px",fontWeight:"bold"},children:["⏰ Auto-unavailable in: ",i]})]}),o.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"1.5rem",background:"#fafafa",borderRadius:"8px",marginBottom:"1.5rem"},children:[o.jsxs("div",{children:[o.jsx("h4",{style:{margin:"0 0 0.25rem 0",color:"#333"},children:"Availability Status"}),o.jsx("p",{style:{margin:0,fontSize:"13px",color:"#666"},children:"Toggle to change your status"})]}),o.jsxs("label",{className:"toggle-switch",children:[o.jsx("input",{type:"checkbox",checked:r,onChange:f,disabled:x.isPending}),o.jsx("span",{className:"slider"})]})]}),o.jsxs("div",{className:"info-box",children:[o.jsx("h4",{style:{marginTop:0,color:"#1976d2"},children:"ℹ️ How it works"}),o.jsxs("ul",{style:{margin:0,paddingLeft:"1.5rem",fontSize:"14px",lineHeight:"1.8",color:"#555"},children:[o.jsxs("li",{children:[o.jsx("strong",{children:"Available:"}),' Contractors can see your profile in their "My Team" section and can contact you for work opportunities.']}),o.jsxs("li",{children:[o.jsx("strong",{children:"Not Available/Busy:"}),` Your profile is hidden from "My Team" listings. You won't receive new work requests.`]}),o.jsx("li",{children:"You can change your status anytime based on your availability."})]})]}),x.isPending&&o.jsx("div",{style:{textAlign:"center",color:"#666",fontSize:"14px",marginTop:"1rem"},children:"Updating status..."})]})]})},Ww=({toast:e,onRemove:t})=>{const[n,r]=b.useState(!1),s=()=>{r(!0),setTimeout(()=>t(e.id),300)};b.useEffect(()=>{const l=setTimeout(()=>{s()},e.duration||5e3);return()=>clearTimeout(l)},[e.duration]);const i=()=>{const l={position:"relative",display:"flex",alignItems:"flex-start",gap:d.spacing.sm,padding:d.spacing.lg,marginBottom:d.spacing.sm,borderRadius:d.borderRadius.lg,boxShadow:d.shadows.lg,transform:n?"translateX(100%)":"translateX(0)",opacity:n?0:1,transition:"all 0.3s ease-in-out",maxWidth:"400px",cursor:"pointer"},c={success:{backgroundColor:d.colors.success[50],borderLeft:`4px solid ${d.colors.success[500]}`,color:d.colors.success[800]},error:{backgroundColor:d.colors.danger[50],borderLeft:`4px solid ${d.colors.danger[500]}`,color:d.colors.danger[800]},warning:{backgroundColor:d.colors.warning[50],borderLeft:`4px solid ${d.colors.warning[500]}`,color:d.colors.warning[800]},info:{backgroundColor:d.colors.primary[50],borderLeft:`4px solid ${d.colors.primary[500]}`,color:d.colors.primary[800]}};return{...l,...c[e.type]}},a=()=>{const l={width:"20px",height:"20px",flexShrink:0,marginTop:"2px"};switch(e.type){case"success":return o.jsx("svg",{style:l,fill:"currentColor",viewBox:"0 0 20 20",children:o.jsx("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",clipRule:"evenodd"})});case"error":return o.jsx("svg",{style:l,fill:"currentColor",viewBox:"0 0 20 20",children:o.jsx("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",clipRule:"evenodd"})});case"warning":return o.jsx("svg",{style:l,fill:"currentColor",viewBox:"0 0 20 20",children:o.jsx("path",{fillRule:"evenodd",d:"M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z",clipRule:"evenodd"})});case"info":return o.jsx("svg",{style:l,fill:"currentColor",viewBox:"0 0 20 20",children:o.jsx("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",clipRule:"evenodd"})});default:return null}};return o.jsxs("div",{style:i(),onClick:s,children:[a(),o.jsxs("div",{style:{flex:1},children:[o.jsx("div",{style:{fontWeight:d.typography.fontWeight.semibold,marginBottom:d.spacing.xs},children:e.title}),e.message&&o.jsx("div",{style:{fontSize:d.typography.fontSize.sm,opacity:.8},children:e.message}),e.action&&o.jsx("button",{onClick:l=>{l.stopPropagation(),e.action.onClick(),s()},style:{marginTop:d.spacing.sm,padding:`${d.spacing.xs} ${d.spacing.sm}`,backgroundColor:"transparent",border:"1px solid currentColor",borderRadius:d.borderRadius.sm,color:"inherit",fontSize:d.typography.fontSize.sm,cursor:"pointer",fontWeight:d.typography.fontWeight.medium},children:e.action.label})]}),o.jsx("button",{onClick:l=>{l.stopPropagation(),s()},style:{backgroundColor:"transparent",border:"none",cursor:"pointer",padding:d.spacing.xs,color:"inherit",opacity:.6},children:o.jsx("svg",{width:"16",height:"16",fill:"currentColor",viewBox:"0 0 20 20",children:o.jsx("path",{fillRule:"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",clipRule:"evenodd"})})})]})},Hw=()=>{const{toasts:e,removeToast:t}=wu();return e.length===0?null:o.jsx("div",{style:{position:"fixed",top:d.spacing.lg,right:d.spacing.lg,zIndex:1e3,pointerEvents:"none"},children:o.jsx("div",{style:{pointerEvents:"auto"},children:e.map(n=>o.jsx(Ww,{toast:n,onRemove:t},n.id))})})},Vw=()=>o.jsx("style",{children:`
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes slideInRight {
        from {
          opacity: 0;
          transform: translateX(30px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes slideInLeft {
        from {
          opacity: 0;
          transform: translateX(-30px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes scaleIn {
        from {
          opacity: 0;
          transform: scale(0.9);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      @keyframes bounce {
        0%, 20%, 53%, 80%, 100% {
          transform: translate3d(0, 0, 0);
        }
        40%, 43% {
          transform: translate3d(0, -30px, 0);
        }
        70% {
          transform: translate3d(0, -15px, 0);
        }
        90% {
          transform: translate3d(0, -4px, 0);
        }
      }

      @keyframes pulse {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.05);
        }
        100% {
          transform: scale(1);
        }
      }

      @keyframes shake {
        0%, 100% {
          transform: translateX(0);
        }
        10%, 30%, 50%, 70%, 90% {
          transform: translateX(-10px);
        }
        20%, 40%, 60%, 80% {
          transform: translateX(10px);
        }
      }

      @keyframes ripple {
        0% {
          transform: scale(0);
          opacity: 1;
        }
        100% {
          transform: scale(4);
          opacity: 0;
        }
      }

      @keyframes shimmer {
        0% {
          background-position: -468px 0;
        }
        100% {
          background-position: 468px 0;
        }
      }

      @keyframes glow {
        0% {
          box-shadow: 0 0 5px ${d.colors.primary[500]};
        }
        50% {
          box-shadow: 0 0 20px ${d.colors.primary[500]}, 0 0 30px ${d.colors.primary[500]};
        }
        100% {
          box-shadow: 0 0 5px ${d.colors.primary[500]};
        }
      }

      .animate-fade-in {
        animation: fadeIn 0.6s ease-out forwards;
      }

      .animate-fade-in-up {
        animation: fadeInUp 0.6s ease-out forwards;
      }

      .animate-slide-in-right {
        animation: slideInRight 0.6s ease-out forwards;
      }

      .animate-slide-in-left {
        animation: slideInLeft 0.6s ease-out forwards;
      }

      .animate-scale-in {
        animation: scaleIn 0.3s ease-out forwards;
      }

      .animate-bounce {
        animation: bounce 1s ease-in-out;
      }

      .animate-pulse {
        animation: pulse 2s ease-in-out infinite;
      }

      .animate-shake {
        animation: shake 0.5s ease-in-out;
      }

      .animate-glow {
        animation: glow 2s ease-in-out infinite;
      }

      .hover-lift {
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      }

      .hover-lift:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      }

      .hover-grow {
        transition: transform 0.3s ease;
      }

      .hover-grow:hover {
        transform: scale(1.05);
      }

      .hover-bounce {
        transition: transform 0.3s ease;
      }

      .hover-bounce:hover {
        transform: translateY(-5px);
        animation: bounce 0.6s ease-in-out;
      }

      .hover-glow {
        transition: box-shadow 0.3s ease;
      }

      .hover-glow:hover {
        box-shadow: 0 0 20px ${d.colors.primary[500]}40;
      }

      .focus-ring:focus {
        outline: 2px solid ${d.colors.primary[500]};
        outline-offset: 2px;
      }

      .ripple-effect {
        position: relative;
        overflow: hidden;
      }

      .ripple-effect::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: translate(-50%, -50%);
        transition: width 0.6s, height 0.6s;
      }

      .ripple-effect:active::before {
        width: 300px;
        height: 300px;
      }

      .shimmer {
        background: linear-gradient(
          to right,
          #f6f7f8 0%,
          #edeef1 20%,
          #f6f7f8 40%,
          #f6f7f8 100%
        );
        background-size: 800px 104px;
        animation: shimmer 1.5s linear infinite;
      }

      .slide-enter {
        transform: translateX(100%);
        opacity: 0;
      }

      .slide-enter-active {
        transform: translateX(0);
        opacity: 1;
        transition: all 0.3s ease-out;
      }

      .slide-exit {
        transform: translateX(0);
        opacity: 1;
      }

      .slide-exit-active {
        transform: translateX(-100%);
        opacity: 0;
        transition: all 0.3s ease-out;
      }

      .stagger-children > * {
        animation-delay: calc(var(--index, 0) * 0.1s);
      }

      /* Smooth scrolling */
      html {
        scroll-behavior: smooth;
      }

      /* Enhanced focus states */
      button:focus,
      input:focus,
      textarea:focus,
      select:focus {
        outline: 2px solid ${d.colors.primary[500]};
        outline-offset: 2px;
      }

      /* Loading states */
      .loading-pulse {
        animation: pulse 1.5s ease-in-out infinite;
      }

      /* Card hover effects */
      .card-hover {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .card-hover:hover {
        transform: translateY(-4px);
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      }

      /* Button press effects */
      .button-press {
        transition: all 0.15s ease;
      }

      .button-press:active {
        transform: scale(0.98);
      }

      /* Progress animations */
      @keyframes progress {
        0% {
          width: 0%;
        }
        100% {
          width: 100%;
        }
      }

      .progress-animate {
        animation: progress 1s ease-out forwards;
      }

      /* Notification slide-in */
      @keyframes notification-slide-in {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      .notification-enter {
        animation: notification-slide-in 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
      }

      /* Modal animations */
      @keyframes modal-fade-in {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      @keyframes modal-scale-in {
        from {
          opacity: 0;
          transform: scale(0.9) translateY(-20px);
        }
        to {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }

      .modal-backdrop {
        animation: modal-fade-in 0.3s ease-out;
      }

      .modal-content {
        animation: modal-scale-in 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      }

      /* Micro-interactions for form elements */
      .form-input-wrapper {
        position: relative;
      }

      .form-input-wrapper::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background: ${d.colors.primary[500]};
        transition: width 0.3s ease;
      }

      .form-input-wrapper:focus-within::after {
        width: 100%;
      }
    `}),Mr=({children:e})=>{const{token:t}=gt();return t?e:o.jsx(I1,{to:"/login"})},qw=()=>o.jsx(J1,{children:o.jsx(X1,{children:o.jsxs(V1,{children:[o.jsx(Vw,{}),o.jsx(tx,{}),o.jsx(Z1,{}),o.jsx(Hw,{}),o.jsxs(M1,{children:[o.jsx(Ze,{path:"/login",element:o.jsx(sx,{})}),o.jsx(Ze,{path:"/register",element:o.jsx(Dx,{})}),o.jsx(Ze,{path:"/forgot-password",element:o.jsx($x,{})}),o.jsx(Ze,{path:"/reset-password/:token",element:o.jsx(Bx,{})}),o.jsx(Ze,{path:"/auth/callback",element:o.jsx(Ux,{})}),o.jsx(Ze,{path:"/dashboard",element:o.jsx(Mr,{children:o.jsx(uv,{})})}),o.jsx(Ze,{path:"/search",element:o.jsx(Mr,{children:o.jsx(Kx,{})})}),o.jsx(Ze,{path:"/saved",element:o.jsx(Mr,{children:o.jsx(Gx,{})})}),o.jsx(Ze,{path:"/messages",element:o.jsx(Mr,{children:o.jsx(nv,{})})}),o.jsx(Ze,{path:"/profile",element:o.jsx(Mr,{children:o.jsx(Bw,{})})}),o.jsx(Ze,{path:"/status",element:o.jsx(Mr,{children:o.jsx(Uw,{})})}),o.jsx(Ze,{path:"/",element:o.jsx(Zd,{})}),o.jsx(Ze,{path:"/home",element:o.jsx(Zd,{})})]})]})})}),Qw=new aw({defaultOptions:{queries:{staleTime:1e3*60,refetchOnWindowFocus:!1,retry:1}}});tm(document.getElementById("root")).render(o.jsx(b.StrictMode,{children:o.jsx(lw,{client:Qw,children:o.jsx(Wx,{children:o.jsx(qw,{})})})}));
