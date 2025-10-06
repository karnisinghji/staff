var Aa=(e,t,n)=>{if(!t.has(e))throw TypeError("Cannot "+n)};var j=(e,t,n)=>(Aa(e,t,"read from private field"),n?n.call(e):t.get(e)),F=(e,t,n)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,n)},A=(e,t,n,r)=>(Aa(e,t,"write to private field"),r?r.call(e,n):t.set(e,n),n);var Qi=(e,t,n,r)=>({set _(s){A(e,t,s,n)},get _(){return j(e,t,r)}}),q=(e,t,n)=>(Aa(e,t,"access private method"),n);function T0(e,t){for(var n=0;n<t.length;n++){const r=t[n];if(typeof r!="string"&&!Array.isArray(r)){for(const s in r)if(s!=="default"&&!(s in e)){const i=Object.getOwnPropertyDescriptor(r,s);i&&Object.defineProperty(e,s,i.get?i:{enumerable:!0,get:()=>r[s]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();function N0(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var sp={exports:{}},ca={},ip={exports:{}},Q={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ai=Symbol.for("react.element"),R0=Symbol.for("react.portal"),P0=Symbol.for("react.fragment"),z0=Symbol.for("react.strict_mode"),L0=Symbol.for("react.profiler"),O0=Symbol.for("react.provider"),I0=Symbol.for("react.context"),A0=Symbol.for("react.forward_ref"),M0=Symbol.for("react.suspense"),F0=Symbol.for("react.memo"),D0=Symbol.for("react.lazy"),Qu=Symbol.iterator;function $0(e){return e===null||typeof e!="object"?null:(e=Qu&&e[Qu]||e["@@iterator"],typeof e=="function"?e:null)}var op={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},ap=Object.assign,lp={};function Ss(e,t,n){this.props=e,this.context=t,this.refs=lp,this.updater=n||op}Ss.prototype.isReactComponent={};Ss.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Ss.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function cp(){}cp.prototype=Ss.prototype;function Oc(e,t,n){this.props=e,this.context=t,this.refs=lp,this.updater=n||op}var Ic=Oc.prototype=new cp;Ic.constructor=Oc;ap(Ic,Ss.prototype);Ic.isPureReactComponent=!0;var Ku=Array.isArray,up=Object.prototype.hasOwnProperty,Ac={current:null},dp={key:!0,ref:!0,__self:!0,__source:!0};function fp(e,t,n){var r,s={},i=null,a=null;if(t!=null)for(r in t.ref!==void 0&&(a=t.ref),t.key!==void 0&&(i=""+t.key),t)up.call(t,r)&&!dp.hasOwnProperty(r)&&(s[r]=t[r]);var l=arguments.length-2;if(l===1)s.children=n;else if(1<l){for(var c=Array(l),u=0;u<l;u++)c[u]=arguments[u+2];s.children=c}if(e&&e.defaultProps)for(r in l=e.defaultProps,l)s[r]===void 0&&(s[r]=l[r]);return{$$typeof:Ai,type:e,key:i,ref:a,props:s,_owner:Ac.current}}function B0(e,t){return{$$typeof:Ai,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Mc(e){return typeof e=="object"&&e!==null&&e.$$typeof===Ai}function U0(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Yu=/\/+/g;function Ma(e,t){return typeof e=="object"&&e!==null&&e.key!=null?U0(""+e.key):t.toString(36)}function mo(e,t,n,r,s){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var a=!1;if(e===null)a=!0;else switch(i){case"string":case"number":a=!0;break;case"object":switch(e.$$typeof){case Ai:case R0:a=!0}}if(a)return a=e,s=s(a),e=r===""?"."+Ma(a,0):r,Ku(s)?(n="",e!=null&&(n=e.replace(Yu,"$&/")+"/"),mo(s,t,n,"",function(u){return u})):s!=null&&(Mc(s)&&(s=B0(s,n+(!s.key||a&&a.key===s.key?"":(""+s.key).replace(Yu,"$&/")+"/")+e)),t.push(s)),1;if(a=0,r=r===""?".":r+":",Ku(e))for(var l=0;l<e.length;l++){i=e[l];var c=r+Ma(i,l);a+=mo(i,t,n,c,s)}else if(c=$0(e),typeof c=="function")for(e=c.call(e),l=0;!(i=e.next()).done;)i=i.value,c=r+Ma(i,l++),a+=mo(i,t,n,c,s);else if(i==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return a}function Ki(e,t,n){if(e==null)return e;var r=[],s=0;return mo(e,r,"","",function(i){return t.call(n,i,s++)}),r}function W0(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Ye={current:null},go={transition:null},H0={ReactCurrentDispatcher:Ye,ReactCurrentBatchConfig:go,ReactCurrentOwner:Ac};function pp(){throw Error("act(...) is not supported in production builds of React.")}Q.Children={map:Ki,forEach:function(e,t,n){Ki(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Ki(e,function(){t++}),t},toArray:function(e){return Ki(e,function(t){return t})||[]},only:function(e){if(!Mc(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};Q.Component=Ss;Q.Fragment=P0;Q.Profiler=L0;Q.PureComponent=Oc;Q.StrictMode=z0;Q.Suspense=M0;Q.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=H0;Q.act=pp;Q.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=ap({},e.props),s=e.key,i=e.ref,a=e._owner;if(t!=null){if(t.ref!==void 0&&(i=t.ref,a=Ac.current),t.key!==void 0&&(s=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(c in t)up.call(t,c)&&!dp.hasOwnProperty(c)&&(r[c]=t[c]===void 0&&l!==void 0?l[c]:t[c])}var c=arguments.length-2;if(c===1)r.children=n;else if(1<c){l=Array(c);for(var u=0;u<c;u++)l[u]=arguments[u+2];r.children=l}return{$$typeof:Ai,type:e.type,key:s,ref:i,props:r,_owner:a}};Q.createContext=function(e){return e={$$typeof:I0,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:O0,_context:e},e.Consumer=e};Q.createElement=fp;Q.createFactory=function(e){var t=fp.bind(null,e);return t.type=e,t};Q.createRef=function(){return{current:null}};Q.forwardRef=function(e){return{$$typeof:A0,render:e}};Q.isValidElement=Mc;Q.lazy=function(e){return{$$typeof:D0,_payload:{_status:-1,_result:e},_init:W0}};Q.memo=function(e,t){return{$$typeof:F0,type:e,compare:t===void 0?null:t}};Q.startTransition=function(e){var t=go.transition;go.transition={};try{e()}finally{go.transition=t}};Q.unstable_act=pp;Q.useCallback=function(e,t){return Ye.current.useCallback(e,t)};Q.useContext=function(e){return Ye.current.useContext(e)};Q.useDebugValue=function(){};Q.useDeferredValue=function(e){return Ye.current.useDeferredValue(e)};Q.useEffect=function(e,t){return Ye.current.useEffect(e,t)};Q.useId=function(){return Ye.current.useId()};Q.useImperativeHandle=function(e,t,n){return Ye.current.useImperativeHandle(e,t,n)};Q.useInsertionEffect=function(e,t){return Ye.current.useInsertionEffect(e,t)};Q.useLayoutEffect=function(e,t){return Ye.current.useLayoutEffect(e,t)};Q.useMemo=function(e,t){return Ye.current.useMemo(e,t)};Q.useReducer=function(e,t,n){return Ye.current.useReducer(e,t,n)};Q.useRef=function(e){return Ye.current.useRef(e)};Q.useState=function(e){return Ye.current.useState(e)};Q.useSyncExternalStore=function(e,t,n){return Ye.current.useSyncExternalStore(e,t,n)};Q.useTransition=function(){return Ye.current.useTransition()};Q.version="18.3.1";ip.exports=Q;var w=ip.exports;const te=N0(w),V0=T0({__proto__:null,default:te},[w]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var q0=w,Q0=Symbol.for("react.element"),K0=Symbol.for("react.fragment"),Y0=Object.prototype.hasOwnProperty,J0=q0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,X0={key:!0,ref:!0,__self:!0,__source:!0};function hp(e,t,n){var r,s={},i=null,a=null;n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(a=t.ref);for(r in t)Y0.call(t,r)&&!X0.hasOwnProperty(r)&&(s[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)s[r]===void 0&&(s[r]=t[r]);return{$$typeof:Q0,type:e,key:i,ref:a,props:s,_owner:J0.current}}ca.Fragment=K0;ca.jsx=hp;ca.jsxs=hp;sp.exports=ca;var o=sp.exports,mp={exports:{}},ft={},gp={exports:{}},yp={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(O,W){var H=O.length;O.push(W);e:for(;0<H;){var Y=H-1>>>1,G=O[Y];if(0<s(G,W))O[Y]=W,O[H]=G,H=Y;else break e}}function n(O){return O.length===0?null:O[0]}function r(O){if(O.length===0)return null;var W=O[0],H=O.pop();if(H!==W){O[0]=H;e:for(var Y=0,G=O.length,Ae=G>>>1;Y<Ae;){var Ce=2*(Y+1)-1,$t=O[Ce],at=Ce+1,gn=O[at];if(0>s($t,H))at<G&&0>s(gn,$t)?(O[Y]=gn,O[at]=H,Y=at):(O[Y]=$t,O[Ce]=H,Y=Ce);else if(at<G&&0>s(gn,H))O[Y]=gn,O[at]=H,Y=at;else break e}}return W}function s(O,W){var H=O.sortIndex-W.sortIndex;return H!==0?H:O.id-W.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;e.unstable_now=function(){return i.now()}}else{var a=Date,l=a.now();e.unstable_now=function(){return a.now()-l}}var c=[],u=[],p=1,m=null,g=3,b=!1,x=!1,v=!1,k=typeof setTimeout=="function"?setTimeout:null,y=typeof clearTimeout=="function"?clearTimeout:null,d=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function h(O){for(var W=n(u);W!==null;){if(W.callback===null)r(u);else if(W.startTime<=O)r(u),W.sortIndex=W.expirationTime,t(c,W);else break;W=n(u)}}function S(O){if(v=!1,h(O),!x)if(n(c)!==null)x=!0,ne(E);else{var W=n(u);W!==null&&pe(S,W.startTime-O)}}function E(O,W){x=!1,v&&(v=!1,y(N),N=-1),b=!0;var H=g;try{for(h(W),m=n(c);m!==null&&(!(m.expirationTime>W)||O&&!U());){var Y=m.callback;if(typeof Y=="function"){m.callback=null,g=m.priorityLevel;var G=Y(m.expirationTime<=W);W=e.unstable_now(),typeof G=="function"?m.callback=G:m===n(c)&&r(c),h(W)}else r(c);m=n(c)}if(m!==null)var Ae=!0;else{var Ce=n(u);Ce!==null&&pe(S,Ce.startTime-W),Ae=!1}return Ae}finally{m=null,g=H,b=!1}}var R=!1,_=null,N=-1,C=5,P=-1;function U(){return!(e.unstable_now()-P<C)}function J(){if(_!==null){var O=e.unstable_now();P=O;var W=!0;try{W=_(!0,O)}finally{W?ee():(R=!1,_=null)}}else R=!1}var ee;if(typeof d=="function")ee=function(){d(J)};else if(typeof MessageChannel<"u"){var ge=new MessageChannel,ye=ge.port2;ge.port1.onmessage=J,ee=function(){ye.postMessage(null)}}else ee=function(){k(J,0)};function ne(O){_=O,R||(R=!0,ee())}function pe(O,W){N=k(function(){O(e.unstable_now())},W)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(O){O.callback=null},e.unstable_continueExecution=function(){x||b||(x=!0,ne(E))},e.unstable_forceFrameRate=function(O){0>O||125<O?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):C=0<O?Math.floor(1e3/O):5},e.unstable_getCurrentPriorityLevel=function(){return g},e.unstable_getFirstCallbackNode=function(){return n(c)},e.unstable_next=function(O){switch(g){case 1:case 2:case 3:var W=3;break;default:W=g}var H=g;g=W;try{return O()}finally{g=H}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(O,W){switch(O){case 1:case 2:case 3:case 4:case 5:break;default:O=3}var H=g;g=O;try{return W()}finally{g=H}},e.unstable_scheduleCallback=function(O,W,H){var Y=e.unstable_now();switch(typeof H=="object"&&H!==null?(H=H.delay,H=typeof H=="number"&&0<H?Y+H:Y):H=Y,O){case 1:var G=-1;break;case 2:G=250;break;case 5:G=1073741823;break;case 4:G=1e4;break;default:G=5e3}return G=H+G,O={id:p++,callback:W,priorityLevel:O,startTime:H,expirationTime:G,sortIndex:-1},H>Y?(O.sortIndex=H,t(u,O),n(c)===null&&O===n(u)&&(v?(y(N),N=-1):v=!0,pe(S,H-Y))):(O.sortIndex=G,t(c,O),x||b||(x=!0,ne(E))),O},e.unstable_shouldYield=U,e.unstable_wrapCallback=function(O){var W=g;return function(){var H=g;g=W;try{return O.apply(this,arguments)}finally{g=H}}}})(yp);gp.exports=yp;var G0=gp.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Z0=w,dt=G0;function L(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var xp=new Set,ti={};function Nr(e,t){hs(e,t),hs(e+"Capture",t)}function hs(e,t){for(ti[e]=t,e=0;e<t.length;e++)xp.add(t[e])}var ln=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),pl=Object.prototype.hasOwnProperty,eg=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Ju={},Xu={};function tg(e){return pl.call(Xu,e)?!0:pl.call(Ju,e)?!1:eg.test(e)?Xu[e]=!0:(Ju[e]=!0,!1)}function ng(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function rg(e,t,n,r){if(t===null||typeof t>"u"||ng(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Je(e,t,n,r,s,i,a){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=s,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=a}var Ie={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){Ie[e]=new Je(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];Ie[t]=new Je(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){Ie[e]=new Je(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){Ie[e]=new Je(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){Ie[e]=new Je(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){Ie[e]=new Je(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){Ie[e]=new Je(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){Ie[e]=new Je(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){Ie[e]=new Je(e,5,!1,e.toLowerCase(),null,!1,!1)});var Fc=/[\-:]([a-z])/g;function Dc(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Fc,Dc);Ie[t]=new Je(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Fc,Dc);Ie[t]=new Je(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Fc,Dc);Ie[t]=new Je(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){Ie[e]=new Je(e,1,!1,e.toLowerCase(),null,!1,!1)});Ie.xlinkHref=new Je("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){Ie[e]=new Je(e,1,!1,e.toLowerCase(),null,!0,!0)});function $c(e,t,n,r){var s=Ie.hasOwnProperty(t)?Ie[t]:null;(s!==null?s.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(rg(t,n,s,r)&&(n=null),r||s===null?tg(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):s.mustUseProperty?e[s.propertyName]=n===null?s.type===3?!1:"":n:(t=s.attributeName,r=s.attributeNamespace,n===null?e.removeAttribute(t):(s=s.type,n=s===3||s===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var pn=Z0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Yi=Symbol.for("react.element"),Mr=Symbol.for("react.portal"),Fr=Symbol.for("react.fragment"),Bc=Symbol.for("react.strict_mode"),hl=Symbol.for("react.profiler"),vp=Symbol.for("react.provider"),bp=Symbol.for("react.context"),Uc=Symbol.for("react.forward_ref"),ml=Symbol.for("react.suspense"),gl=Symbol.for("react.suspense_list"),Wc=Symbol.for("react.memo"),bn=Symbol.for("react.lazy"),wp=Symbol.for("react.offscreen"),Gu=Symbol.iterator;function zs(e){return e===null||typeof e!="object"?null:(e=Gu&&e[Gu]||e["@@iterator"],typeof e=="function"?e:null)}var ue=Object.assign,Fa;function Bs(e){if(Fa===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Fa=t&&t[1]||""}return`
`+Fa+e}var Da=!1;function $a(e,t){if(!e||Da)return"";Da=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(u){var r=u}Reflect.construct(e,[],t)}else{try{t.call()}catch(u){r=u}e.call(t.prototype)}else{try{throw Error()}catch(u){r=u}e()}}catch(u){if(u&&r&&typeof u.stack=="string"){for(var s=u.stack.split(`
`),i=r.stack.split(`
`),a=s.length-1,l=i.length-1;1<=a&&0<=l&&s[a]!==i[l];)l--;for(;1<=a&&0<=l;a--,l--)if(s[a]!==i[l]){if(a!==1||l!==1)do if(a--,l--,0>l||s[a]!==i[l]){var c=`
`+s[a].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=a&&0<=l);break}}}finally{Da=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Bs(e):""}function sg(e){switch(e.tag){case 5:return Bs(e.type);case 16:return Bs("Lazy");case 13:return Bs("Suspense");case 19:return Bs("SuspenseList");case 0:case 2:case 15:return e=$a(e.type,!1),e;case 11:return e=$a(e.type.render,!1),e;case 1:return e=$a(e.type,!0),e;default:return""}}function yl(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Fr:return"Fragment";case Mr:return"Portal";case hl:return"Profiler";case Bc:return"StrictMode";case ml:return"Suspense";case gl:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case bp:return(e.displayName||"Context")+".Consumer";case vp:return(e._context.displayName||"Context")+".Provider";case Uc:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Wc:return t=e.displayName||null,t!==null?t:yl(e.type)||"Memo";case bn:t=e._payload,e=e._init;try{return yl(e(t))}catch{}}return null}function ig(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return yl(t);case 8:return t===Bc?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Qn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Sp(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function og(e){var t=Sp(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var s=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return s.call(this)},set:function(a){r=""+a,i.call(this,a)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(a){r=""+a},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Ji(e){e._valueTracker||(e._valueTracker=og(e))}function kp(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Sp(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function zo(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function xl(e,t){var n=t.checked;return ue({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Zu(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Qn(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function jp(e,t){t=t.checked,t!=null&&$c(e,"checked",t,!1)}function vl(e,t){jp(e,t);var n=Qn(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?bl(e,t.type,n):t.hasOwnProperty("defaultValue")&&bl(e,t.type,Qn(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function ed(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function bl(e,t,n){(t!=="number"||zo(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Us=Array.isArray;function Yr(e,t,n,r){if(e=e.options,t){t={};for(var s=0;s<n.length;s++)t["$"+n[s]]=!0;for(n=0;n<e.length;n++)s=t.hasOwnProperty("$"+e[n].value),e[n].selected!==s&&(e[n].selected=s),s&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Qn(n),t=null,s=0;s<e.length;s++){if(e[s].value===n){e[s].selected=!0,r&&(e[s].defaultSelected=!0);return}t!==null||e[s].disabled||(t=e[s])}t!==null&&(t.selected=!0)}}function wl(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(L(91));return ue({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function td(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(L(92));if(Us(n)){if(1<n.length)throw Error(L(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Qn(n)}}function Cp(e,t){var n=Qn(t.value),r=Qn(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function nd(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Ep(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Sl(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Ep(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Xi,_p=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,s){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,s)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Xi=Xi||document.createElement("div"),Xi.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Xi.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function ni(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var qs={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},ag=["Webkit","ms","Moz","O"];Object.keys(qs).forEach(function(e){ag.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),qs[t]=qs[e]})});function Tp(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||qs.hasOwnProperty(e)&&qs[e]?(""+t).trim():t+"px"}function Np(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,s=Tp(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,s):e[n]=s}}var lg=ue({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function kl(e,t){if(t){if(lg[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(L(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(L(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(L(61))}if(t.style!=null&&typeof t.style!="object")throw Error(L(62))}}function jl(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Cl=null;function Hc(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var El=null,Jr=null,Xr=null;function rd(e){if(e=Di(e)){if(typeof El!="function")throw Error(L(280));var t=e.stateNode;t&&(t=ha(t),El(e.stateNode,e.type,t))}}function Rp(e){Jr?Xr?Xr.push(e):Xr=[e]:Jr=e}function Pp(){if(Jr){var e=Jr,t=Xr;if(Xr=Jr=null,rd(e),t)for(e=0;e<t.length;e++)rd(t[e])}}function zp(e,t){return e(t)}function Lp(){}var Ba=!1;function Op(e,t,n){if(Ba)return e(t,n);Ba=!0;try{return zp(e,t,n)}finally{Ba=!1,(Jr!==null||Xr!==null)&&(Lp(),Pp())}}function ri(e,t){var n=e.stateNode;if(n===null)return null;var r=ha(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(L(231,t,typeof n));return n}var _l=!1;if(ln)try{var Ls={};Object.defineProperty(Ls,"passive",{get:function(){_l=!0}}),window.addEventListener("test",Ls,Ls),window.removeEventListener("test",Ls,Ls)}catch{_l=!1}function cg(e,t,n,r,s,i,a,l,c){var u=Array.prototype.slice.call(arguments,3);try{t.apply(n,u)}catch(p){this.onError(p)}}var Qs=!1,Lo=null,Oo=!1,Tl=null,ug={onError:function(e){Qs=!0,Lo=e}};function dg(e,t,n,r,s,i,a,l,c){Qs=!1,Lo=null,cg.apply(ug,arguments)}function fg(e,t,n,r,s,i,a,l,c){if(dg.apply(this,arguments),Qs){if(Qs){var u=Lo;Qs=!1,Lo=null}else throw Error(L(198));Oo||(Oo=!0,Tl=u)}}function Rr(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Ip(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function sd(e){if(Rr(e)!==e)throw Error(L(188))}function pg(e){var t=e.alternate;if(!t){if(t=Rr(e),t===null)throw Error(L(188));return t!==e?null:e}for(var n=e,r=t;;){var s=n.return;if(s===null)break;var i=s.alternate;if(i===null){if(r=s.return,r!==null){n=r;continue}break}if(s.child===i.child){for(i=s.child;i;){if(i===n)return sd(s),e;if(i===r)return sd(s),t;i=i.sibling}throw Error(L(188))}if(n.return!==r.return)n=s,r=i;else{for(var a=!1,l=s.child;l;){if(l===n){a=!0,n=s,r=i;break}if(l===r){a=!0,r=s,n=i;break}l=l.sibling}if(!a){for(l=i.child;l;){if(l===n){a=!0,n=i,r=s;break}if(l===r){a=!0,r=i,n=s;break}l=l.sibling}if(!a)throw Error(L(189))}}if(n.alternate!==r)throw Error(L(190))}if(n.tag!==3)throw Error(L(188));return n.stateNode.current===n?e:t}function Ap(e){return e=pg(e),e!==null?Mp(e):null}function Mp(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Mp(e);if(t!==null)return t;e=e.sibling}return null}var Fp=dt.unstable_scheduleCallback,id=dt.unstable_cancelCallback,hg=dt.unstable_shouldYield,mg=dt.unstable_requestPaint,he=dt.unstable_now,gg=dt.unstable_getCurrentPriorityLevel,Vc=dt.unstable_ImmediatePriority,Dp=dt.unstable_UserBlockingPriority,Io=dt.unstable_NormalPriority,yg=dt.unstable_LowPriority,$p=dt.unstable_IdlePriority,ua=null,Kt=null;function xg(e){if(Kt&&typeof Kt.onCommitFiberRoot=="function")try{Kt.onCommitFiberRoot(ua,e,void 0,(e.current.flags&128)===128)}catch{}}var Ot=Math.clz32?Math.clz32:wg,vg=Math.log,bg=Math.LN2;function wg(e){return e>>>=0,e===0?32:31-(vg(e)/bg|0)|0}var Gi=64,Zi=4194304;function Ws(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Ao(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,s=e.suspendedLanes,i=e.pingedLanes,a=n&268435455;if(a!==0){var l=a&~s;l!==0?r=Ws(l):(i&=a,i!==0&&(r=Ws(i)))}else a=n&~s,a!==0?r=Ws(a):i!==0&&(r=Ws(i));if(r===0)return 0;if(t!==0&&t!==r&&!(t&s)&&(s=r&-r,i=t&-t,s>=i||s===16&&(i&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Ot(t),s=1<<n,r|=e[n],t&=~s;return r}function Sg(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function kg(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,s=e.expirationTimes,i=e.pendingLanes;0<i;){var a=31-Ot(i),l=1<<a,c=s[a];c===-1?(!(l&n)||l&r)&&(s[a]=Sg(l,t)):c<=t&&(e.expiredLanes|=l),i&=~l}}function Nl(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Bp(){var e=Gi;return Gi<<=1,!(Gi&4194240)&&(Gi=64),e}function Ua(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Mi(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Ot(t),e[t]=n}function jg(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var s=31-Ot(n),i=1<<s;t[s]=0,r[s]=-1,e[s]=-1,n&=~i}}function qc(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Ot(n),s=1<<r;s&t|e[r]&t&&(e[r]|=t),n&=~s}}var Z=0;function Up(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Wp,Qc,Hp,Vp,qp,Rl=!1,eo=[],Mn=null,Fn=null,Dn=null,si=new Map,ii=new Map,Sn=[],Cg="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function od(e,t){switch(e){case"focusin":case"focusout":Mn=null;break;case"dragenter":case"dragleave":Fn=null;break;case"mouseover":case"mouseout":Dn=null;break;case"pointerover":case"pointerout":si.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":ii.delete(t.pointerId)}}function Os(e,t,n,r,s,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[s]},t!==null&&(t=Di(t),t!==null&&Qc(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,s!==null&&t.indexOf(s)===-1&&t.push(s),e)}function Eg(e,t,n,r,s){switch(t){case"focusin":return Mn=Os(Mn,e,t,n,r,s),!0;case"dragenter":return Fn=Os(Fn,e,t,n,r,s),!0;case"mouseover":return Dn=Os(Dn,e,t,n,r,s),!0;case"pointerover":var i=s.pointerId;return si.set(i,Os(si.get(i)||null,e,t,n,r,s)),!0;case"gotpointercapture":return i=s.pointerId,ii.set(i,Os(ii.get(i)||null,e,t,n,r,s)),!0}return!1}function Qp(e){var t=tr(e.target);if(t!==null){var n=Rr(t);if(n!==null){if(t=n.tag,t===13){if(t=Ip(n),t!==null){e.blockedOn=t,qp(e.priority,function(){Hp(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function yo(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Pl(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Cl=r,n.target.dispatchEvent(r),Cl=null}else return t=Di(n),t!==null&&Qc(t),e.blockedOn=n,!1;t.shift()}return!0}function ad(e,t,n){yo(e)&&n.delete(t)}function _g(){Rl=!1,Mn!==null&&yo(Mn)&&(Mn=null),Fn!==null&&yo(Fn)&&(Fn=null),Dn!==null&&yo(Dn)&&(Dn=null),si.forEach(ad),ii.forEach(ad)}function Is(e,t){e.blockedOn===t&&(e.blockedOn=null,Rl||(Rl=!0,dt.unstable_scheduleCallback(dt.unstable_NormalPriority,_g)))}function oi(e){function t(s){return Is(s,e)}if(0<eo.length){Is(eo[0],e);for(var n=1;n<eo.length;n++){var r=eo[n];r.blockedOn===e&&(r.blockedOn=null)}}for(Mn!==null&&Is(Mn,e),Fn!==null&&Is(Fn,e),Dn!==null&&Is(Dn,e),si.forEach(t),ii.forEach(t),n=0;n<Sn.length;n++)r=Sn[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<Sn.length&&(n=Sn[0],n.blockedOn===null);)Qp(n),n.blockedOn===null&&Sn.shift()}var Gr=pn.ReactCurrentBatchConfig,Mo=!0;function Tg(e,t,n,r){var s=Z,i=Gr.transition;Gr.transition=null;try{Z=1,Kc(e,t,n,r)}finally{Z=s,Gr.transition=i}}function Ng(e,t,n,r){var s=Z,i=Gr.transition;Gr.transition=null;try{Z=4,Kc(e,t,n,r)}finally{Z=s,Gr.transition=i}}function Kc(e,t,n,r){if(Mo){var s=Pl(e,t,n,r);if(s===null)Ga(e,t,r,Fo,n),od(e,r);else if(Eg(s,e,t,n,r))r.stopPropagation();else if(od(e,r),t&4&&-1<Cg.indexOf(e)){for(;s!==null;){var i=Di(s);if(i!==null&&Wp(i),i=Pl(e,t,n,r),i===null&&Ga(e,t,r,Fo,n),i===s)break;s=i}s!==null&&r.stopPropagation()}else Ga(e,t,r,null,n)}}var Fo=null;function Pl(e,t,n,r){if(Fo=null,e=Hc(r),e=tr(e),e!==null)if(t=Rr(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Ip(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Fo=e,null}function Kp(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(gg()){case Vc:return 1;case Dp:return 4;case Io:case yg:return 16;case $p:return 536870912;default:return 16}default:return 16}}var On=null,Yc=null,xo=null;function Yp(){if(xo)return xo;var e,t=Yc,n=t.length,r,s="value"in On?On.value:On.textContent,i=s.length;for(e=0;e<n&&t[e]===s[e];e++);var a=n-e;for(r=1;r<=a&&t[n-r]===s[i-r];r++);return xo=s.slice(e,1<r?1-r:void 0)}function vo(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function to(){return!0}function ld(){return!1}function pt(e){function t(n,r,s,i,a){this._reactName=n,this._targetInst=s,this.type=r,this.nativeEvent=i,this.target=a,this.currentTarget=null;for(var l in e)e.hasOwnProperty(l)&&(n=e[l],this[l]=n?n(i):i[l]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?to:ld,this.isPropagationStopped=ld,this}return ue(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=to)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=to)},persist:function(){},isPersistent:to}),t}var ks={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Jc=pt(ks),Fi=ue({},ks,{view:0,detail:0}),Rg=pt(Fi),Wa,Ha,As,da=ue({},Fi,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Xc,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==As&&(As&&e.type==="mousemove"?(Wa=e.screenX-As.screenX,Ha=e.screenY-As.screenY):Ha=Wa=0,As=e),Wa)},movementY:function(e){return"movementY"in e?e.movementY:Ha}}),cd=pt(da),Pg=ue({},da,{dataTransfer:0}),zg=pt(Pg),Lg=ue({},Fi,{relatedTarget:0}),Va=pt(Lg),Og=ue({},ks,{animationName:0,elapsedTime:0,pseudoElement:0}),Ig=pt(Og),Ag=ue({},ks,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Mg=pt(Ag),Fg=ue({},ks,{data:0}),ud=pt(Fg),Dg={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},$g={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Bg={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Ug(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Bg[e])?!!t[e]:!1}function Xc(){return Ug}var Wg=ue({},Fi,{key:function(e){if(e.key){var t=Dg[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=vo(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?$g[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Xc,charCode:function(e){return e.type==="keypress"?vo(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?vo(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Hg=pt(Wg),Vg=ue({},da,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),dd=pt(Vg),qg=ue({},Fi,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Xc}),Qg=pt(qg),Kg=ue({},ks,{propertyName:0,elapsedTime:0,pseudoElement:0}),Yg=pt(Kg),Jg=ue({},da,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Xg=pt(Jg),Gg=[9,13,27,32],Gc=ln&&"CompositionEvent"in window,Ks=null;ln&&"documentMode"in document&&(Ks=document.documentMode);var Zg=ln&&"TextEvent"in window&&!Ks,Jp=ln&&(!Gc||Ks&&8<Ks&&11>=Ks),fd=String.fromCharCode(32),pd=!1;function Xp(e,t){switch(e){case"keyup":return Gg.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Gp(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Dr=!1;function ey(e,t){switch(e){case"compositionend":return Gp(t);case"keypress":return t.which!==32?null:(pd=!0,fd);case"textInput":return e=t.data,e===fd&&pd?null:e;default:return null}}function ty(e,t){if(Dr)return e==="compositionend"||!Gc&&Xp(e,t)?(e=Yp(),xo=Yc=On=null,Dr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Jp&&t.locale!=="ko"?null:t.data;default:return null}}var ny={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function hd(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!ny[e.type]:t==="textarea"}function Zp(e,t,n,r){Rp(r),t=Do(t,"onChange"),0<t.length&&(n=new Jc("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Ys=null,ai=null;function ry(e){uh(e,0)}function fa(e){var t=Ur(e);if(kp(t))return e}function sy(e,t){if(e==="change")return t}var eh=!1;if(ln){var qa;if(ln){var Qa="oninput"in document;if(!Qa){var md=document.createElement("div");md.setAttribute("oninput","return;"),Qa=typeof md.oninput=="function"}qa=Qa}else qa=!1;eh=qa&&(!document.documentMode||9<document.documentMode)}function gd(){Ys&&(Ys.detachEvent("onpropertychange",th),ai=Ys=null)}function th(e){if(e.propertyName==="value"&&fa(ai)){var t=[];Zp(t,ai,e,Hc(e)),Op(ry,t)}}function iy(e,t,n){e==="focusin"?(gd(),Ys=t,ai=n,Ys.attachEvent("onpropertychange",th)):e==="focusout"&&gd()}function oy(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return fa(ai)}function ay(e,t){if(e==="click")return fa(t)}function ly(e,t){if(e==="input"||e==="change")return fa(t)}function cy(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Ft=typeof Object.is=="function"?Object.is:cy;function li(e,t){if(Ft(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var s=n[r];if(!pl.call(t,s)||!Ft(e[s],t[s]))return!1}return!0}function yd(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function xd(e,t){var n=yd(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=yd(n)}}function nh(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?nh(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function rh(){for(var e=window,t=zo();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=zo(e.document)}return t}function Zc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function uy(e){var t=rh(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&nh(n.ownerDocument.documentElement,n)){if(r!==null&&Zc(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var s=n.textContent.length,i=Math.min(r.start,s);r=r.end===void 0?i:Math.min(r.end,s),!e.extend&&i>r&&(s=r,r=i,i=s),s=xd(n,i);var a=xd(n,r);s&&a&&(e.rangeCount!==1||e.anchorNode!==s.node||e.anchorOffset!==s.offset||e.focusNode!==a.node||e.focusOffset!==a.offset)&&(t=t.createRange(),t.setStart(s.node,s.offset),e.removeAllRanges(),i>r?(e.addRange(t),e.extend(a.node,a.offset)):(t.setEnd(a.node,a.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var dy=ln&&"documentMode"in document&&11>=document.documentMode,$r=null,zl=null,Js=null,Ll=!1;function vd(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Ll||$r==null||$r!==zo(r)||(r=$r,"selectionStart"in r&&Zc(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Js&&li(Js,r)||(Js=r,r=Do(zl,"onSelect"),0<r.length&&(t=new Jc("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=$r)))}function no(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Br={animationend:no("Animation","AnimationEnd"),animationiteration:no("Animation","AnimationIteration"),animationstart:no("Animation","AnimationStart"),transitionend:no("Transition","TransitionEnd")},Ka={},sh={};ln&&(sh=document.createElement("div").style,"AnimationEvent"in window||(delete Br.animationend.animation,delete Br.animationiteration.animation,delete Br.animationstart.animation),"TransitionEvent"in window||delete Br.transitionend.transition);function pa(e){if(Ka[e])return Ka[e];if(!Br[e])return e;var t=Br[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in sh)return Ka[e]=t[n];return e}var ih=pa("animationend"),oh=pa("animationiteration"),ah=pa("animationstart"),lh=pa("transitionend"),ch=new Map,bd="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Yn(e,t){ch.set(e,t),Nr(t,[e])}for(var Ya=0;Ya<bd.length;Ya++){var Ja=bd[Ya],fy=Ja.toLowerCase(),py=Ja[0].toUpperCase()+Ja.slice(1);Yn(fy,"on"+py)}Yn(ih,"onAnimationEnd");Yn(oh,"onAnimationIteration");Yn(ah,"onAnimationStart");Yn("dblclick","onDoubleClick");Yn("focusin","onFocus");Yn("focusout","onBlur");Yn(lh,"onTransitionEnd");hs("onMouseEnter",["mouseout","mouseover"]);hs("onMouseLeave",["mouseout","mouseover"]);hs("onPointerEnter",["pointerout","pointerover"]);hs("onPointerLeave",["pointerout","pointerover"]);Nr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Nr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Nr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Nr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Nr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Nr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Hs="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),hy=new Set("cancel close invalid load scroll toggle".split(" ").concat(Hs));function wd(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,fg(r,t,void 0,e),e.currentTarget=null}function uh(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],s=r.event;r=r.listeners;e:{var i=void 0;if(t)for(var a=r.length-1;0<=a;a--){var l=r[a],c=l.instance,u=l.currentTarget;if(l=l.listener,c!==i&&s.isPropagationStopped())break e;wd(s,l,u),i=c}else for(a=0;a<r.length;a++){if(l=r[a],c=l.instance,u=l.currentTarget,l=l.listener,c!==i&&s.isPropagationStopped())break e;wd(s,l,u),i=c}}}if(Oo)throw e=Tl,Oo=!1,Tl=null,e}function se(e,t){var n=t[Fl];n===void 0&&(n=t[Fl]=new Set);var r=e+"__bubble";n.has(r)||(dh(t,e,2,!1),n.add(r))}function Xa(e,t,n){var r=0;t&&(r|=4),dh(n,e,r,t)}var ro="_reactListening"+Math.random().toString(36).slice(2);function ci(e){if(!e[ro]){e[ro]=!0,xp.forEach(function(n){n!=="selectionchange"&&(hy.has(n)||Xa(n,!1,e),Xa(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[ro]||(t[ro]=!0,Xa("selectionchange",!1,t))}}function dh(e,t,n,r){switch(Kp(t)){case 1:var s=Tg;break;case 4:s=Ng;break;default:s=Kc}n=s.bind(null,t,n,e),s=void 0,!_l||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(s=!0),r?s!==void 0?e.addEventListener(t,n,{capture:!0,passive:s}):e.addEventListener(t,n,!0):s!==void 0?e.addEventListener(t,n,{passive:s}):e.addEventListener(t,n,!1)}function Ga(e,t,n,r,s){var i=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var a=r.tag;if(a===3||a===4){var l=r.stateNode.containerInfo;if(l===s||l.nodeType===8&&l.parentNode===s)break;if(a===4)for(a=r.return;a!==null;){var c=a.tag;if((c===3||c===4)&&(c=a.stateNode.containerInfo,c===s||c.nodeType===8&&c.parentNode===s))return;a=a.return}for(;l!==null;){if(a=tr(l),a===null)return;if(c=a.tag,c===5||c===6){r=i=a;continue e}l=l.parentNode}}r=r.return}Op(function(){var u=i,p=Hc(n),m=[];e:{var g=ch.get(e);if(g!==void 0){var b=Jc,x=e;switch(e){case"keypress":if(vo(n)===0)break e;case"keydown":case"keyup":b=Hg;break;case"focusin":x="focus",b=Va;break;case"focusout":x="blur",b=Va;break;case"beforeblur":case"afterblur":b=Va;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":b=cd;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":b=zg;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":b=Qg;break;case ih:case oh:case ah:b=Ig;break;case lh:b=Yg;break;case"scroll":b=Rg;break;case"wheel":b=Xg;break;case"copy":case"cut":case"paste":b=Mg;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":b=dd}var v=(t&4)!==0,k=!v&&e==="scroll",y=v?g!==null?g+"Capture":null:g;v=[];for(var d=u,h;d!==null;){h=d;var S=h.stateNode;if(h.tag===5&&S!==null&&(h=S,y!==null&&(S=ri(d,y),S!=null&&v.push(ui(d,S,h)))),k)break;d=d.return}0<v.length&&(g=new b(g,x,null,n,p),m.push({event:g,listeners:v}))}}if(!(t&7)){e:{if(g=e==="mouseover"||e==="pointerover",b=e==="mouseout"||e==="pointerout",g&&n!==Cl&&(x=n.relatedTarget||n.fromElement)&&(tr(x)||x[cn]))break e;if((b||g)&&(g=p.window===p?p:(g=p.ownerDocument)?g.defaultView||g.parentWindow:window,b?(x=n.relatedTarget||n.toElement,b=u,x=x?tr(x):null,x!==null&&(k=Rr(x),x!==k||x.tag!==5&&x.tag!==6)&&(x=null)):(b=null,x=u),b!==x)){if(v=cd,S="onMouseLeave",y="onMouseEnter",d="mouse",(e==="pointerout"||e==="pointerover")&&(v=dd,S="onPointerLeave",y="onPointerEnter",d="pointer"),k=b==null?g:Ur(b),h=x==null?g:Ur(x),g=new v(S,d+"leave",b,n,p),g.target=k,g.relatedTarget=h,S=null,tr(p)===u&&(v=new v(y,d+"enter",x,n,p),v.target=h,v.relatedTarget=k,S=v),k=S,b&&x)t:{for(v=b,y=x,d=0,h=v;h;h=Or(h))d++;for(h=0,S=y;S;S=Or(S))h++;for(;0<d-h;)v=Or(v),d--;for(;0<h-d;)y=Or(y),h--;for(;d--;){if(v===y||y!==null&&v===y.alternate)break t;v=Or(v),y=Or(y)}v=null}else v=null;b!==null&&Sd(m,g,b,v,!1),x!==null&&k!==null&&Sd(m,k,x,v,!0)}}e:{if(g=u?Ur(u):window,b=g.nodeName&&g.nodeName.toLowerCase(),b==="select"||b==="input"&&g.type==="file")var E=sy;else if(hd(g))if(eh)E=ly;else{E=oy;var R=iy}else(b=g.nodeName)&&b.toLowerCase()==="input"&&(g.type==="checkbox"||g.type==="radio")&&(E=ay);if(E&&(E=E(e,u))){Zp(m,E,n,p);break e}R&&R(e,g,u),e==="focusout"&&(R=g._wrapperState)&&R.controlled&&g.type==="number"&&bl(g,"number",g.value)}switch(R=u?Ur(u):window,e){case"focusin":(hd(R)||R.contentEditable==="true")&&($r=R,zl=u,Js=null);break;case"focusout":Js=zl=$r=null;break;case"mousedown":Ll=!0;break;case"contextmenu":case"mouseup":case"dragend":Ll=!1,vd(m,n,p);break;case"selectionchange":if(dy)break;case"keydown":case"keyup":vd(m,n,p)}var _;if(Gc)e:{switch(e){case"compositionstart":var N="onCompositionStart";break e;case"compositionend":N="onCompositionEnd";break e;case"compositionupdate":N="onCompositionUpdate";break e}N=void 0}else Dr?Xp(e,n)&&(N="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(N="onCompositionStart");N&&(Jp&&n.locale!=="ko"&&(Dr||N!=="onCompositionStart"?N==="onCompositionEnd"&&Dr&&(_=Yp()):(On=p,Yc="value"in On?On.value:On.textContent,Dr=!0)),R=Do(u,N),0<R.length&&(N=new ud(N,e,null,n,p),m.push({event:N,listeners:R}),_?N.data=_:(_=Gp(n),_!==null&&(N.data=_)))),(_=Zg?ey(e,n):ty(e,n))&&(u=Do(u,"onBeforeInput"),0<u.length&&(p=new ud("onBeforeInput","beforeinput",null,n,p),m.push({event:p,listeners:u}),p.data=_))}uh(m,t)})}function ui(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Do(e,t){for(var n=t+"Capture",r=[];e!==null;){var s=e,i=s.stateNode;s.tag===5&&i!==null&&(s=i,i=ri(e,n),i!=null&&r.unshift(ui(e,i,s)),i=ri(e,t),i!=null&&r.push(ui(e,i,s))),e=e.return}return r}function Or(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Sd(e,t,n,r,s){for(var i=t._reactName,a=[];n!==null&&n!==r;){var l=n,c=l.alternate,u=l.stateNode;if(c!==null&&c===r)break;l.tag===5&&u!==null&&(l=u,s?(c=ri(n,i),c!=null&&a.unshift(ui(n,c,l))):s||(c=ri(n,i),c!=null&&a.push(ui(n,c,l)))),n=n.return}a.length!==0&&e.push({event:t,listeners:a})}var my=/\r\n?/g,gy=/\u0000|\uFFFD/g;function kd(e){return(typeof e=="string"?e:""+e).replace(my,`
`).replace(gy,"")}function so(e,t,n){if(t=kd(t),kd(e)!==t&&n)throw Error(L(425))}function $o(){}var Ol=null,Il=null;function Al(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Ml=typeof setTimeout=="function"?setTimeout:void 0,yy=typeof clearTimeout=="function"?clearTimeout:void 0,jd=typeof Promise=="function"?Promise:void 0,xy=typeof queueMicrotask=="function"?queueMicrotask:typeof jd<"u"?function(e){return jd.resolve(null).then(e).catch(vy)}:Ml;function vy(e){setTimeout(function(){throw e})}function Za(e,t){var n=t,r=0;do{var s=n.nextSibling;if(e.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"){if(r===0){e.removeChild(s),oi(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=s}while(n);oi(t)}function $n(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Cd(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var js=Math.random().toString(36).slice(2),Qt="__reactFiber$"+js,di="__reactProps$"+js,cn="__reactContainer$"+js,Fl="__reactEvents$"+js,by="__reactListeners$"+js,wy="__reactHandles$"+js;function tr(e){var t=e[Qt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[cn]||n[Qt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Cd(e);e!==null;){if(n=e[Qt])return n;e=Cd(e)}return t}e=n,n=e.parentNode}return null}function Di(e){return e=e[Qt]||e[cn],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Ur(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(L(33))}function ha(e){return e[di]||null}var Dl=[],Wr=-1;function Jn(e){return{current:e}}function ie(e){0>Wr||(e.current=Dl[Wr],Dl[Wr]=null,Wr--)}function re(e,t){Wr++,Dl[Wr]=e.current,e.current=t}var Kn={},Ue=Jn(Kn),rt=Jn(!1),br=Kn;function ms(e,t){var n=e.type.contextTypes;if(!n)return Kn;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var s={},i;for(i in n)s[i]=t[i];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=s),s}function st(e){return e=e.childContextTypes,e!=null}function Bo(){ie(rt),ie(Ue)}function Ed(e,t,n){if(Ue.current!==Kn)throw Error(L(168));re(Ue,t),re(rt,n)}function fh(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var s in r)if(!(s in t))throw Error(L(108,ig(e)||"Unknown",s));return ue({},n,r)}function Uo(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Kn,br=Ue.current,re(Ue,e),re(rt,rt.current),!0}function _d(e,t,n){var r=e.stateNode;if(!r)throw Error(L(169));n?(e=fh(e,t,br),r.__reactInternalMemoizedMergedChildContext=e,ie(rt),ie(Ue),re(Ue,e)):ie(rt),re(rt,n)}var Zt=null,ma=!1,el=!1;function ph(e){Zt===null?Zt=[e]:Zt.push(e)}function Sy(e){ma=!0,ph(e)}function Xn(){if(!el&&Zt!==null){el=!0;var e=0,t=Z;try{var n=Zt;for(Z=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}Zt=null,ma=!1}catch(s){throw Zt!==null&&(Zt=Zt.slice(e+1)),Fp(Vc,Xn),s}finally{Z=t,el=!1}}return null}var Hr=[],Vr=0,Wo=null,Ho=0,xt=[],vt=0,wr=null,sn=1,on="";function Zn(e,t){Hr[Vr++]=Ho,Hr[Vr++]=Wo,Wo=e,Ho=t}function hh(e,t,n){xt[vt++]=sn,xt[vt++]=on,xt[vt++]=wr,wr=e;var r=sn;e=on;var s=32-Ot(r)-1;r&=~(1<<s),n+=1;var i=32-Ot(t)+s;if(30<i){var a=s-s%5;i=(r&(1<<a)-1).toString(32),r>>=a,s-=a,sn=1<<32-Ot(t)+s|n<<s|r,on=i+e}else sn=1<<i|n<<s|r,on=e}function eu(e){e.return!==null&&(Zn(e,1),hh(e,1,0))}function tu(e){for(;e===Wo;)Wo=Hr[--Vr],Hr[Vr]=null,Ho=Hr[--Vr],Hr[Vr]=null;for(;e===wr;)wr=xt[--vt],xt[vt]=null,on=xt[--vt],xt[vt]=null,sn=xt[--vt],xt[vt]=null}var ut=null,ct=null,ae=!1,Lt=null;function mh(e,t){var n=bt(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Td(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,ut=e,ct=$n(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,ut=e,ct=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=wr!==null?{id:sn,overflow:on}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=bt(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,ut=e,ct=null,!0):!1;default:return!1}}function $l(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Bl(e){if(ae){var t=ct;if(t){var n=t;if(!Td(e,t)){if($l(e))throw Error(L(418));t=$n(n.nextSibling);var r=ut;t&&Td(e,t)?mh(r,n):(e.flags=e.flags&-4097|2,ae=!1,ut=e)}}else{if($l(e))throw Error(L(418));e.flags=e.flags&-4097|2,ae=!1,ut=e}}}function Nd(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;ut=e}function io(e){if(e!==ut)return!1;if(!ae)return Nd(e),ae=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Al(e.type,e.memoizedProps)),t&&(t=ct)){if($l(e))throw gh(),Error(L(418));for(;t;)mh(e,t),t=$n(t.nextSibling)}if(Nd(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(L(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){ct=$n(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}ct=null}}else ct=ut?$n(e.stateNode.nextSibling):null;return!0}function gh(){for(var e=ct;e;)e=$n(e.nextSibling)}function gs(){ct=ut=null,ae=!1}function nu(e){Lt===null?Lt=[e]:Lt.push(e)}var ky=pn.ReactCurrentBatchConfig;function Ms(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(L(309));var r=n.stateNode}if(!r)throw Error(L(147,e));var s=r,i=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===i?t.ref:(t=function(a){var l=s.refs;a===null?delete l[i]:l[i]=a},t._stringRef=i,t)}if(typeof e!="string")throw Error(L(284));if(!n._owner)throw Error(L(290,e))}return e}function oo(e,t){throw e=Object.prototype.toString.call(t),Error(L(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Rd(e){var t=e._init;return t(e._payload)}function yh(e){function t(y,d){if(e){var h=y.deletions;h===null?(y.deletions=[d],y.flags|=16):h.push(d)}}function n(y,d){if(!e)return null;for(;d!==null;)t(y,d),d=d.sibling;return null}function r(y,d){for(y=new Map;d!==null;)d.key!==null?y.set(d.key,d):y.set(d.index,d),d=d.sibling;return y}function s(y,d){return y=Hn(y,d),y.index=0,y.sibling=null,y}function i(y,d,h){return y.index=h,e?(h=y.alternate,h!==null?(h=h.index,h<d?(y.flags|=2,d):h):(y.flags|=2,d)):(y.flags|=1048576,d)}function a(y){return e&&y.alternate===null&&(y.flags|=2),y}function l(y,d,h,S){return d===null||d.tag!==6?(d=al(h,y.mode,S),d.return=y,d):(d=s(d,h),d.return=y,d)}function c(y,d,h,S){var E=h.type;return E===Fr?p(y,d,h.props.children,S,h.key):d!==null&&(d.elementType===E||typeof E=="object"&&E!==null&&E.$$typeof===bn&&Rd(E)===d.type)?(S=s(d,h.props),S.ref=Ms(y,d,h),S.return=y,S):(S=Eo(h.type,h.key,h.props,null,y.mode,S),S.ref=Ms(y,d,h),S.return=y,S)}function u(y,d,h,S){return d===null||d.tag!==4||d.stateNode.containerInfo!==h.containerInfo||d.stateNode.implementation!==h.implementation?(d=ll(h,y.mode,S),d.return=y,d):(d=s(d,h.children||[]),d.return=y,d)}function p(y,d,h,S,E){return d===null||d.tag!==7?(d=yr(h,y.mode,S,E),d.return=y,d):(d=s(d,h),d.return=y,d)}function m(y,d,h){if(typeof d=="string"&&d!==""||typeof d=="number")return d=al(""+d,y.mode,h),d.return=y,d;if(typeof d=="object"&&d!==null){switch(d.$$typeof){case Yi:return h=Eo(d.type,d.key,d.props,null,y.mode,h),h.ref=Ms(y,null,d),h.return=y,h;case Mr:return d=ll(d,y.mode,h),d.return=y,d;case bn:var S=d._init;return m(y,S(d._payload),h)}if(Us(d)||zs(d))return d=yr(d,y.mode,h,null),d.return=y,d;oo(y,d)}return null}function g(y,d,h,S){var E=d!==null?d.key:null;if(typeof h=="string"&&h!==""||typeof h=="number")return E!==null?null:l(y,d,""+h,S);if(typeof h=="object"&&h!==null){switch(h.$$typeof){case Yi:return h.key===E?c(y,d,h,S):null;case Mr:return h.key===E?u(y,d,h,S):null;case bn:return E=h._init,g(y,d,E(h._payload),S)}if(Us(h)||zs(h))return E!==null?null:p(y,d,h,S,null);oo(y,h)}return null}function b(y,d,h,S,E){if(typeof S=="string"&&S!==""||typeof S=="number")return y=y.get(h)||null,l(d,y,""+S,E);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case Yi:return y=y.get(S.key===null?h:S.key)||null,c(d,y,S,E);case Mr:return y=y.get(S.key===null?h:S.key)||null,u(d,y,S,E);case bn:var R=S._init;return b(y,d,h,R(S._payload),E)}if(Us(S)||zs(S))return y=y.get(h)||null,p(d,y,S,E,null);oo(d,S)}return null}function x(y,d,h,S){for(var E=null,R=null,_=d,N=d=0,C=null;_!==null&&N<h.length;N++){_.index>N?(C=_,_=null):C=_.sibling;var P=g(y,_,h[N],S);if(P===null){_===null&&(_=C);break}e&&_&&P.alternate===null&&t(y,_),d=i(P,d,N),R===null?E=P:R.sibling=P,R=P,_=C}if(N===h.length)return n(y,_),ae&&Zn(y,N),E;if(_===null){for(;N<h.length;N++)_=m(y,h[N],S),_!==null&&(d=i(_,d,N),R===null?E=_:R.sibling=_,R=_);return ae&&Zn(y,N),E}for(_=r(y,_);N<h.length;N++)C=b(_,y,N,h[N],S),C!==null&&(e&&C.alternate!==null&&_.delete(C.key===null?N:C.key),d=i(C,d,N),R===null?E=C:R.sibling=C,R=C);return e&&_.forEach(function(U){return t(y,U)}),ae&&Zn(y,N),E}function v(y,d,h,S){var E=zs(h);if(typeof E!="function")throw Error(L(150));if(h=E.call(h),h==null)throw Error(L(151));for(var R=E=null,_=d,N=d=0,C=null,P=h.next();_!==null&&!P.done;N++,P=h.next()){_.index>N?(C=_,_=null):C=_.sibling;var U=g(y,_,P.value,S);if(U===null){_===null&&(_=C);break}e&&_&&U.alternate===null&&t(y,_),d=i(U,d,N),R===null?E=U:R.sibling=U,R=U,_=C}if(P.done)return n(y,_),ae&&Zn(y,N),E;if(_===null){for(;!P.done;N++,P=h.next())P=m(y,P.value,S),P!==null&&(d=i(P,d,N),R===null?E=P:R.sibling=P,R=P);return ae&&Zn(y,N),E}for(_=r(y,_);!P.done;N++,P=h.next())P=b(_,y,N,P.value,S),P!==null&&(e&&P.alternate!==null&&_.delete(P.key===null?N:P.key),d=i(P,d,N),R===null?E=P:R.sibling=P,R=P);return e&&_.forEach(function(J){return t(y,J)}),ae&&Zn(y,N),E}function k(y,d,h,S){if(typeof h=="object"&&h!==null&&h.type===Fr&&h.key===null&&(h=h.props.children),typeof h=="object"&&h!==null){switch(h.$$typeof){case Yi:e:{for(var E=h.key,R=d;R!==null;){if(R.key===E){if(E=h.type,E===Fr){if(R.tag===7){n(y,R.sibling),d=s(R,h.props.children),d.return=y,y=d;break e}}else if(R.elementType===E||typeof E=="object"&&E!==null&&E.$$typeof===bn&&Rd(E)===R.type){n(y,R.sibling),d=s(R,h.props),d.ref=Ms(y,R,h),d.return=y,y=d;break e}n(y,R);break}else t(y,R);R=R.sibling}h.type===Fr?(d=yr(h.props.children,y.mode,S,h.key),d.return=y,y=d):(S=Eo(h.type,h.key,h.props,null,y.mode,S),S.ref=Ms(y,d,h),S.return=y,y=S)}return a(y);case Mr:e:{for(R=h.key;d!==null;){if(d.key===R)if(d.tag===4&&d.stateNode.containerInfo===h.containerInfo&&d.stateNode.implementation===h.implementation){n(y,d.sibling),d=s(d,h.children||[]),d.return=y,y=d;break e}else{n(y,d);break}else t(y,d);d=d.sibling}d=ll(h,y.mode,S),d.return=y,y=d}return a(y);case bn:return R=h._init,k(y,d,R(h._payload),S)}if(Us(h))return x(y,d,h,S);if(zs(h))return v(y,d,h,S);oo(y,h)}return typeof h=="string"&&h!==""||typeof h=="number"?(h=""+h,d!==null&&d.tag===6?(n(y,d.sibling),d=s(d,h),d.return=y,y=d):(n(y,d),d=al(h,y.mode,S),d.return=y,y=d),a(y)):n(y,d)}return k}var ys=yh(!0),xh=yh(!1),Vo=Jn(null),qo=null,qr=null,ru=null;function su(){ru=qr=qo=null}function iu(e){var t=Vo.current;ie(Vo),e._currentValue=t}function Ul(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Zr(e,t){qo=e,ru=qr=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(nt=!0),e.firstContext=null)}function St(e){var t=e._currentValue;if(ru!==e)if(e={context:e,memoizedValue:t,next:null},qr===null){if(qo===null)throw Error(L(308));qr=e,qo.dependencies={lanes:0,firstContext:e}}else qr=qr.next=e;return t}var nr=null;function ou(e){nr===null?nr=[e]:nr.push(e)}function vh(e,t,n,r){var s=t.interleaved;return s===null?(n.next=n,ou(t)):(n.next=s.next,s.next=n),t.interleaved=n,un(e,r)}function un(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var wn=!1;function au(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function bh(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function an(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Bn(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,X&2){var s=r.pending;return s===null?t.next=t:(t.next=s.next,s.next=t),r.pending=t,un(e,n)}return s=r.interleaved,s===null?(t.next=t,ou(r)):(t.next=s.next,s.next=t),r.interleaved=t,un(e,n)}function bo(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,qc(e,n)}}function Pd(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var s=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?s=i=a:i=i.next=a,n=n.next}while(n!==null);i===null?s=i=t:i=i.next=t}else s=i=t;n={baseState:r.baseState,firstBaseUpdate:s,lastBaseUpdate:i,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Qo(e,t,n,r){var s=e.updateQueue;wn=!1;var i=s.firstBaseUpdate,a=s.lastBaseUpdate,l=s.shared.pending;if(l!==null){s.shared.pending=null;var c=l,u=c.next;c.next=null,a===null?i=u:a.next=u,a=c;var p=e.alternate;p!==null&&(p=p.updateQueue,l=p.lastBaseUpdate,l!==a&&(l===null?p.firstBaseUpdate=u:l.next=u,p.lastBaseUpdate=c))}if(i!==null){var m=s.baseState;a=0,p=u=c=null,l=i;do{var g=l.lane,b=l.eventTime;if((r&g)===g){p!==null&&(p=p.next={eventTime:b,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var x=e,v=l;switch(g=t,b=n,v.tag){case 1:if(x=v.payload,typeof x=="function"){m=x.call(b,m,g);break e}m=x;break e;case 3:x.flags=x.flags&-65537|128;case 0:if(x=v.payload,g=typeof x=="function"?x.call(b,m,g):x,g==null)break e;m=ue({},m,g);break e;case 2:wn=!0}}l.callback!==null&&l.lane!==0&&(e.flags|=64,g=s.effects,g===null?s.effects=[l]:g.push(l))}else b={eventTime:b,lane:g,tag:l.tag,payload:l.payload,callback:l.callback,next:null},p===null?(u=p=b,c=m):p=p.next=b,a|=g;if(l=l.next,l===null){if(l=s.shared.pending,l===null)break;g=l,l=g.next,g.next=null,s.lastBaseUpdate=g,s.shared.pending=null}}while(1);if(p===null&&(c=m),s.baseState=c,s.firstBaseUpdate=u,s.lastBaseUpdate=p,t=s.shared.interleaved,t!==null){s=t;do a|=s.lane,s=s.next;while(s!==t)}else i===null&&(s.shared.lanes=0);kr|=a,e.lanes=a,e.memoizedState=m}}function zd(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],s=r.callback;if(s!==null){if(r.callback=null,r=n,typeof s!="function")throw Error(L(191,s));s.call(r)}}}var $i={},Yt=Jn($i),fi=Jn($i),pi=Jn($i);function rr(e){if(e===$i)throw Error(L(174));return e}function lu(e,t){switch(re(pi,t),re(fi,e),re(Yt,$i),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Sl(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Sl(t,e)}ie(Yt),re(Yt,t)}function xs(){ie(Yt),ie(fi),ie(pi)}function wh(e){rr(pi.current);var t=rr(Yt.current),n=Sl(t,e.type);t!==n&&(re(fi,e),re(Yt,n))}function cu(e){fi.current===e&&(ie(Yt),ie(fi))}var le=Jn(0);function Ko(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var tl=[];function uu(){for(var e=0;e<tl.length;e++)tl[e]._workInProgressVersionPrimary=null;tl.length=0}var wo=pn.ReactCurrentDispatcher,nl=pn.ReactCurrentBatchConfig,Sr=0,ce=null,Se=null,Te=null,Yo=!1,Xs=!1,hi=0,jy=0;function Fe(){throw Error(L(321))}function du(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Ft(e[n],t[n]))return!1;return!0}function fu(e,t,n,r,s,i){if(Sr=i,ce=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,wo.current=e===null||e.memoizedState===null?Ty:Ny,e=n(r,s),Xs){i=0;do{if(Xs=!1,hi=0,25<=i)throw Error(L(301));i+=1,Te=Se=null,t.updateQueue=null,wo.current=Ry,e=n(r,s)}while(Xs)}if(wo.current=Jo,t=Se!==null&&Se.next!==null,Sr=0,Te=Se=ce=null,Yo=!1,t)throw Error(L(300));return e}function pu(){var e=hi!==0;return hi=0,e}function Wt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Te===null?ce.memoizedState=Te=e:Te=Te.next=e,Te}function kt(){if(Se===null){var e=ce.alternate;e=e!==null?e.memoizedState:null}else e=Se.next;var t=Te===null?ce.memoizedState:Te.next;if(t!==null)Te=t,Se=e;else{if(e===null)throw Error(L(310));Se=e,e={memoizedState:Se.memoizedState,baseState:Se.baseState,baseQueue:Se.baseQueue,queue:Se.queue,next:null},Te===null?ce.memoizedState=Te=e:Te=Te.next=e}return Te}function mi(e,t){return typeof t=="function"?t(e):t}function rl(e){var t=kt(),n=t.queue;if(n===null)throw Error(L(311));n.lastRenderedReducer=e;var r=Se,s=r.baseQueue,i=n.pending;if(i!==null){if(s!==null){var a=s.next;s.next=i.next,i.next=a}r.baseQueue=s=i,n.pending=null}if(s!==null){i=s.next,r=r.baseState;var l=a=null,c=null,u=i;do{var p=u.lane;if((Sr&p)===p)c!==null&&(c=c.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:e(r,u.action);else{var m={lane:p,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};c===null?(l=c=m,a=r):c=c.next=m,ce.lanes|=p,kr|=p}u=u.next}while(u!==null&&u!==i);c===null?a=r:c.next=l,Ft(r,t.memoizedState)||(nt=!0),t.memoizedState=r,t.baseState=a,t.baseQueue=c,n.lastRenderedState=r}if(e=n.interleaved,e!==null){s=e;do i=s.lane,ce.lanes|=i,kr|=i,s=s.next;while(s!==e)}else s===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function sl(e){var t=kt(),n=t.queue;if(n===null)throw Error(L(311));n.lastRenderedReducer=e;var r=n.dispatch,s=n.pending,i=t.memoizedState;if(s!==null){n.pending=null;var a=s=s.next;do i=e(i,a.action),a=a.next;while(a!==s);Ft(i,t.memoizedState)||(nt=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,r]}function Sh(){}function kh(e,t){var n=ce,r=kt(),s=t(),i=!Ft(r.memoizedState,s);if(i&&(r.memoizedState=s,nt=!0),r=r.queue,hu(Eh.bind(null,n,r,e),[e]),r.getSnapshot!==t||i||Te!==null&&Te.memoizedState.tag&1){if(n.flags|=2048,gi(9,Ch.bind(null,n,r,s,t),void 0,null),Ne===null)throw Error(L(349));Sr&30||jh(n,t,s)}return s}function jh(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=ce.updateQueue,t===null?(t={lastEffect:null,stores:null},ce.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Ch(e,t,n,r){t.value=n,t.getSnapshot=r,_h(t)&&Th(e)}function Eh(e,t,n){return n(function(){_h(t)&&Th(e)})}function _h(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Ft(e,n)}catch{return!0}}function Th(e){var t=un(e,1);t!==null&&It(t,e,1,-1)}function Ld(e){var t=Wt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:mi,lastRenderedState:e},t.queue=e,e=e.dispatch=_y.bind(null,ce,e),[t.memoizedState,e]}function gi(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=ce.updateQueue,t===null?(t={lastEffect:null,stores:null},ce.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Nh(){return kt().memoizedState}function So(e,t,n,r){var s=Wt();ce.flags|=e,s.memoizedState=gi(1|t,n,void 0,r===void 0?null:r)}function ga(e,t,n,r){var s=kt();r=r===void 0?null:r;var i=void 0;if(Se!==null){var a=Se.memoizedState;if(i=a.destroy,r!==null&&du(r,a.deps)){s.memoizedState=gi(t,n,i,r);return}}ce.flags|=e,s.memoizedState=gi(1|t,n,i,r)}function Od(e,t){return So(8390656,8,e,t)}function hu(e,t){return ga(2048,8,e,t)}function Rh(e,t){return ga(4,2,e,t)}function Ph(e,t){return ga(4,4,e,t)}function zh(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Lh(e,t,n){return n=n!=null?n.concat([e]):null,ga(4,4,zh.bind(null,t,e),n)}function mu(){}function Oh(e,t){var n=kt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&du(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Ih(e,t){var n=kt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&du(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Ah(e,t,n){return Sr&21?(Ft(n,t)||(n=Bp(),ce.lanes|=n,kr|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,nt=!0),e.memoizedState=n)}function Cy(e,t){var n=Z;Z=n!==0&&4>n?n:4,e(!0);var r=nl.transition;nl.transition={};try{e(!1),t()}finally{Z=n,nl.transition=r}}function Mh(){return kt().memoizedState}function Ey(e,t,n){var r=Wn(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Fh(e))Dh(t,n);else if(n=vh(e,t,n,r),n!==null){var s=Ke();It(n,e,r,s),$h(n,t,r)}}function _y(e,t,n){var r=Wn(e),s={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Fh(e))Dh(t,s);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var a=t.lastRenderedState,l=i(a,n);if(s.hasEagerState=!0,s.eagerState=l,Ft(l,a)){var c=t.interleaved;c===null?(s.next=s,ou(t)):(s.next=c.next,c.next=s),t.interleaved=s;return}}catch{}finally{}n=vh(e,t,s,r),n!==null&&(s=Ke(),It(n,e,r,s),$h(n,t,r))}}function Fh(e){var t=e.alternate;return e===ce||t!==null&&t===ce}function Dh(e,t){Xs=Yo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function $h(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,qc(e,n)}}var Jo={readContext:St,useCallback:Fe,useContext:Fe,useEffect:Fe,useImperativeHandle:Fe,useInsertionEffect:Fe,useLayoutEffect:Fe,useMemo:Fe,useReducer:Fe,useRef:Fe,useState:Fe,useDebugValue:Fe,useDeferredValue:Fe,useTransition:Fe,useMutableSource:Fe,useSyncExternalStore:Fe,useId:Fe,unstable_isNewReconciler:!1},Ty={readContext:St,useCallback:function(e,t){return Wt().memoizedState=[e,t===void 0?null:t],e},useContext:St,useEffect:Od,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,So(4194308,4,zh.bind(null,t,e),n)},useLayoutEffect:function(e,t){return So(4194308,4,e,t)},useInsertionEffect:function(e,t){return So(4,2,e,t)},useMemo:function(e,t){var n=Wt();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Wt();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Ey.bind(null,ce,e),[r.memoizedState,e]},useRef:function(e){var t=Wt();return e={current:e},t.memoizedState=e},useState:Ld,useDebugValue:mu,useDeferredValue:function(e){return Wt().memoizedState=e},useTransition:function(){var e=Ld(!1),t=e[0];return e=Cy.bind(null,e[1]),Wt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=ce,s=Wt();if(ae){if(n===void 0)throw Error(L(407));n=n()}else{if(n=t(),Ne===null)throw Error(L(349));Sr&30||jh(r,t,n)}s.memoizedState=n;var i={value:n,getSnapshot:t};return s.queue=i,Od(Eh.bind(null,r,i,e),[e]),r.flags|=2048,gi(9,Ch.bind(null,r,i,n,t),void 0,null),n},useId:function(){var e=Wt(),t=Ne.identifierPrefix;if(ae){var n=on,r=sn;n=(r&~(1<<32-Ot(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=hi++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=jy++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Ny={readContext:St,useCallback:Oh,useContext:St,useEffect:hu,useImperativeHandle:Lh,useInsertionEffect:Rh,useLayoutEffect:Ph,useMemo:Ih,useReducer:rl,useRef:Nh,useState:function(){return rl(mi)},useDebugValue:mu,useDeferredValue:function(e){var t=kt();return Ah(t,Se.memoizedState,e)},useTransition:function(){var e=rl(mi)[0],t=kt().memoizedState;return[e,t]},useMutableSource:Sh,useSyncExternalStore:kh,useId:Mh,unstable_isNewReconciler:!1},Ry={readContext:St,useCallback:Oh,useContext:St,useEffect:hu,useImperativeHandle:Lh,useInsertionEffect:Rh,useLayoutEffect:Ph,useMemo:Ih,useReducer:sl,useRef:Nh,useState:function(){return sl(mi)},useDebugValue:mu,useDeferredValue:function(e){var t=kt();return Se===null?t.memoizedState=e:Ah(t,Se.memoizedState,e)},useTransition:function(){var e=sl(mi)[0],t=kt().memoizedState;return[e,t]},useMutableSource:Sh,useSyncExternalStore:kh,useId:Mh,unstable_isNewReconciler:!1};function Tt(e,t){if(e&&e.defaultProps){t=ue({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Wl(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:ue({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var ya={isMounted:function(e){return(e=e._reactInternals)?Rr(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Ke(),s=Wn(e),i=an(r,s);i.payload=t,n!=null&&(i.callback=n),t=Bn(e,i,s),t!==null&&(It(t,e,s,r),bo(t,e,s))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Ke(),s=Wn(e),i=an(r,s);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=Bn(e,i,s),t!==null&&(It(t,e,s,r),bo(t,e,s))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Ke(),r=Wn(e),s=an(n,r);s.tag=2,t!=null&&(s.callback=t),t=Bn(e,s,r),t!==null&&(It(t,e,r,n),bo(t,e,r))}};function Id(e,t,n,r,s,i,a){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,i,a):t.prototype&&t.prototype.isPureReactComponent?!li(n,r)||!li(s,i):!0}function Bh(e,t,n){var r=!1,s=Kn,i=t.contextType;return typeof i=="object"&&i!==null?i=St(i):(s=st(t)?br:Ue.current,r=t.contextTypes,i=(r=r!=null)?ms(e,s):Kn),t=new t(n,i),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=ya,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=s,e.__reactInternalMemoizedMaskedChildContext=i),t}function Ad(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&ya.enqueueReplaceState(t,t.state,null)}function Hl(e,t,n,r){var s=e.stateNode;s.props=n,s.state=e.memoizedState,s.refs={},au(e);var i=t.contextType;typeof i=="object"&&i!==null?s.context=St(i):(i=st(t)?br:Ue.current,s.context=ms(e,i)),s.state=e.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(Wl(e,t,i,n),s.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(t=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),t!==s.state&&ya.enqueueReplaceState(s,s.state,null),Qo(e,n,s,r),s.state=e.memoizedState),typeof s.componentDidMount=="function"&&(e.flags|=4194308)}function vs(e,t){try{var n="",r=t;do n+=sg(r),r=r.return;while(r);var s=n}catch(i){s=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:t,stack:s,digest:null}}function il(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Vl(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Py=typeof WeakMap=="function"?WeakMap:Map;function Uh(e,t,n){n=an(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Go||(Go=!0,tc=r),Vl(e,t)},n}function Wh(e,t,n){n=an(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var s=t.value;n.payload=function(){return r(s)},n.callback=function(){Vl(e,t)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){Vl(e,t),typeof r!="function"&&(Un===null?Un=new Set([this]):Un.add(this));var a=t.stack;this.componentDidCatch(t.value,{componentStack:a!==null?a:""})}),n}function Md(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Py;var s=new Set;r.set(t,s)}else s=r.get(t),s===void 0&&(s=new Set,r.set(t,s));s.has(n)||(s.add(n),e=Vy.bind(null,e,t,n),t.then(e,e))}function Fd(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Dd(e,t,n,r,s){return e.mode&1?(e.flags|=65536,e.lanes=s,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=an(-1,1),t.tag=2,Bn(n,t,1))),n.lanes|=1),e)}var zy=pn.ReactCurrentOwner,nt=!1;function Ve(e,t,n,r){t.child=e===null?xh(t,null,n,r):ys(t,e.child,n,r)}function $d(e,t,n,r,s){n=n.render;var i=t.ref;return Zr(t,s),r=fu(e,t,n,r,i,s),n=pu(),e!==null&&!nt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,dn(e,t,s)):(ae&&n&&eu(t),t.flags|=1,Ve(e,t,r,s),t.child)}function Bd(e,t,n,r,s){if(e===null){var i=n.type;return typeof i=="function"&&!ku(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=i,Hh(e,t,i,r,s)):(e=Eo(n.type,null,r,t,t.mode,s),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!(e.lanes&s)){var a=i.memoizedProps;if(n=n.compare,n=n!==null?n:li,n(a,r)&&e.ref===t.ref)return dn(e,t,s)}return t.flags|=1,e=Hn(i,r),e.ref=t.ref,e.return=t,t.child=e}function Hh(e,t,n,r,s){if(e!==null){var i=e.memoizedProps;if(li(i,r)&&e.ref===t.ref)if(nt=!1,t.pendingProps=r=i,(e.lanes&s)!==0)e.flags&131072&&(nt=!0);else return t.lanes=e.lanes,dn(e,t,s)}return ql(e,t,n,r,s)}function Vh(e,t,n){var r=t.pendingProps,s=r.children,i=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},re(Kr,lt),lt|=n;else{if(!(n&1073741824))return e=i!==null?i.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,re(Kr,lt),lt|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:n,re(Kr,lt),lt|=r}else i!==null?(r=i.baseLanes|n,t.memoizedState=null):r=n,re(Kr,lt),lt|=r;return Ve(e,t,s,n),t.child}function qh(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function ql(e,t,n,r,s){var i=st(n)?br:Ue.current;return i=ms(t,i),Zr(t,s),n=fu(e,t,n,r,i,s),r=pu(),e!==null&&!nt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,dn(e,t,s)):(ae&&r&&eu(t),t.flags|=1,Ve(e,t,n,s),t.child)}function Ud(e,t,n,r,s){if(st(n)){var i=!0;Uo(t)}else i=!1;if(Zr(t,s),t.stateNode===null)ko(e,t),Bh(t,n,r),Hl(t,n,r,s),r=!0;else if(e===null){var a=t.stateNode,l=t.memoizedProps;a.props=l;var c=a.context,u=n.contextType;typeof u=="object"&&u!==null?u=St(u):(u=st(n)?br:Ue.current,u=ms(t,u));var p=n.getDerivedStateFromProps,m=typeof p=="function"||typeof a.getSnapshotBeforeUpdate=="function";m||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(l!==r||c!==u)&&Ad(t,a,r,u),wn=!1;var g=t.memoizedState;a.state=g,Qo(t,r,a,s),c=t.memoizedState,l!==r||g!==c||rt.current||wn?(typeof p=="function"&&(Wl(t,n,p,r),c=t.memoizedState),(l=wn||Id(t,n,l,r,g,c,u))?(m||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(t.flags|=4194308)):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=c),a.props=r,a.state=c,a.context=u,r=l):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,bh(e,t),l=t.memoizedProps,u=t.type===t.elementType?l:Tt(t.type,l),a.props=u,m=t.pendingProps,g=a.context,c=n.contextType,typeof c=="object"&&c!==null?c=St(c):(c=st(n)?br:Ue.current,c=ms(t,c));var b=n.getDerivedStateFromProps;(p=typeof b=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(l!==m||g!==c)&&Ad(t,a,r,c),wn=!1,g=t.memoizedState,a.state=g,Qo(t,r,a,s);var x=t.memoizedState;l!==m||g!==x||rt.current||wn?(typeof b=="function"&&(Wl(t,n,b,r),x=t.memoizedState),(u=wn||Id(t,n,u,r,g,x,c)||!1)?(p||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(r,x,c),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(r,x,c)),typeof a.componentDidUpdate=="function"&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof a.componentDidUpdate!="function"||l===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=x),a.props=r,a.state=x,a.context=c,r=u):(typeof a.componentDidUpdate!="function"||l===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),r=!1)}return Ql(e,t,n,r,i,s)}function Ql(e,t,n,r,s,i){qh(e,t);var a=(t.flags&128)!==0;if(!r&&!a)return s&&_d(t,n,!1),dn(e,t,i);r=t.stateNode,zy.current=t;var l=a&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&a?(t.child=ys(t,e.child,null,i),t.child=ys(t,null,l,i)):Ve(e,t,l,i),t.memoizedState=r.state,s&&_d(t,n,!0),t.child}function Qh(e){var t=e.stateNode;t.pendingContext?Ed(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Ed(e,t.context,!1),lu(e,t.containerInfo)}function Wd(e,t,n,r,s){return gs(),nu(s),t.flags|=256,Ve(e,t,n,r),t.child}var Kl={dehydrated:null,treeContext:null,retryLane:0};function Yl(e){return{baseLanes:e,cachePool:null,transitions:null}}function Kh(e,t,n){var r=t.pendingProps,s=le.current,i=!1,a=(t.flags&128)!==0,l;if((l=a)||(l=e!==null&&e.memoizedState===null?!1:(s&2)!==0),l?(i=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(s|=1),re(le,s&1),e===null)return Bl(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(a=r.children,e=r.fallback,i?(r=t.mode,i=t.child,a={mode:"hidden",children:a},!(r&1)&&i!==null?(i.childLanes=0,i.pendingProps=a):i=ba(a,r,0,null),e=yr(e,r,n,null),i.return=t,e.return=t,i.sibling=e,t.child=i,t.child.memoizedState=Yl(n),t.memoizedState=Kl,e):gu(t,a));if(s=e.memoizedState,s!==null&&(l=s.dehydrated,l!==null))return Ly(e,t,a,r,l,s,n);if(i){i=r.fallback,a=t.mode,s=e.child,l=s.sibling;var c={mode:"hidden",children:r.children};return!(a&1)&&t.child!==s?(r=t.child,r.childLanes=0,r.pendingProps=c,t.deletions=null):(r=Hn(s,c),r.subtreeFlags=s.subtreeFlags&14680064),l!==null?i=Hn(l,i):(i=yr(i,a,n,null),i.flags|=2),i.return=t,r.return=t,r.sibling=i,t.child=r,r=i,i=t.child,a=e.child.memoizedState,a=a===null?Yl(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},i.memoizedState=a,i.childLanes=e.childLanes&~n,t.memoizedState=Kl,r}return i=e.child,e=i.sibling,r=Hn(i,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function gu(e,t){return t=ba({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function ao(e,t,n,r){return r!==null&&nu(r),ys(t,e.child,null,n),e=gu(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Ly(e,t,n,r,s,i,a){if(n)return t.flags&256?(t.flags&=-257,r=il(Error(L(422))),ao(e,t,a,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(i=r.fallback,s=t.mode,r=ba({mode:"visible",children:r.children},s,0,null),i=yr(i,s,a,null),i.flags|=2,r.return=t,i.return=t,r.sibling=i,t.child=r,t.mode&1&&ys(t,e.child,null,a),t.child.memoizedState=Yl(a),t.memoizedState=Kl,i);if(!(t.mode&1))return ao(e,t,a,null);if(s.data==="$!"){if(r=s.nextSibling&&s.nextSibling.dataset,r)var l=r.dgst;return r=l,i=Error(L(419)),r=il(i,r,void 0),ao(e,t,a,r)}if(l=(a&e.childLanes)!==0,nt||l){if(r=Ne,r!==null){switch(a&-a){case 4:s=2;break;case 16:s=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:s=32;break;case 536870912:s=268435456;break;default:s=0}s=s&(r.suspendedLanes|a)?0:s,s!==0&&s!==i.retryLane&&(i.retryLane=s,un(e,s),It(r,e,s,-1))}return Su(),r=il(Error(L(421))),ao(e,t,a,r)}return s.data==="$?"?(t.flags|=128,t.child=e.child,t=qy.bind(null,e),s._reactRetry=t,null):(e=i.treeContext,ct=$n(s.nextSibling),ut=t,ae=!0,Lt=null,e!==null&&(xt[vt++]=sn,xt[vt++]=on,xt[vt++]=wr,sn=e.id,on=e.overflow,wr=t),t=gu(t,r.children),t.flags|=4096,t)}function Hd(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Ul(e.return,t,n)}function ol(e,t,n,r,s){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:s}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=s)}function Yh(e,t,n){var r=t.pendingProps,s=r.revealOrder,i=r.tail;if(Ve(e,t,r.children,n),r=le.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Hd(e,n,t);else if(e.tag===19)Hd(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(re(le,r),!(t.mode&1))t.memoizedState=null;else switch(s){case"forwards":for(n=t.child,s=null;n!==null;)e=n.alternate,e!==null&&Ko(e)===null&&(s=n),n=n.sibling;n=s,n===null?(s=t.child,t.child=null):(s=n.sibling,n.sibling=null),ol(t,!1,s,n,i);break;case"backwards":for(n=null,s=t.child,t.child=null;s!==null;){if(e=s.alternate,e!==null&&Ko(e)===null){t.child=s;break}e=s.sibling,s.sibling=n,n=s,s=e}ol(t,!0,n,null,i);break;case"together":ol(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function ko(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function dn(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),kr|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(L(153));if(t.child!==null){for(e=t.child,n=Hn(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Hn(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Oy(e,t,n){switch(t.tag){case 3:Qh(t),gs();break;case 5:wh(t);break;case 1:st(t.type)&&Uo(t);break;case 4:lu(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,s=t.memoizedProps.value;re(Vo,r._currentValue),r._currentValue=s;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(re(le,le.current&1),t.flags|=128,null):n&t.child.childLanes?Kh(e,t,n):(re(le,le.current&1),e=dn(e,t,n),e!==null?e.sibling:null);re(le,le.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return Yh(e,t,n);t.flags|=128}if(s=t.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),re(le,le.current),r)break;return null;case 22:case 23:return t.lanes=0,Vh(e,t,n)}return dn(e,t,n)}var Jh,Jl,Xh,Gh;Jh=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Jl=function(){};Xh=function(e,t,n,r){var s=e.memoizedProps;if(s!==r){e=t.stateNode,rr(Yt.current);var i=null;switch(n){case"input":s=xl(e,s),r=xl(e,r),i=[];break;case"select":s=ue({},s,{value:void 0}),r=ue({},r,{value:void 0}),i=[];break;case"textarea":s=wl(e,s),r=wl(e,r),i=[];break;default:typeof s.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=$o)}kl(n,r);var a;n=null;for(u in s)if(!r.hasOwnProperty(u)&&s.hasOwnProperty(u)&&s[u]!=null)if(u==="style"){var l=s[u];for(a in l)l.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(ti.hasOwnProperty(u)?i||(i=[]):(i=i||[]).push(u,null));for(u in r){var c=r[u];if(l=s!=null?s[u]:void 0,r.hasOwnProperty(u)&&c!==l&&(c!=null||l!=null))if(u==="style")if(l){for(a in l)!l.hasOwnProperty(a)||c&&c.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in c)c.hasOwnProperty(a)&&l[a]!==c[a]&&(n||(n={}),n[a]=c[a])}else n||(i||(i=[]),i.push(u,n)),n=c;else u==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,l=l?l.__html:void 0,c!=null&&l!==c&&(i=i||[]).push(u,c)):u==="children"?typeof c!="string"&&typeof c!="number"||(i=i||[]).push(u,""+c):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(ti.hasOwnProperty(u)?(c!=null&&u==="onScroll"&&se("scroll",e),i||l===c||(i=[])):(i=i||[]).push(u,c))}n&&(i=i||[]).push("style",n);var u=i;(t.updateQueue=u)&&(t.flags|=4)}};Gh=function(e,t,n,r){n!==r&&(t.flags|=4)};function Fs(e,t){if(!ae)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function De(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var s=e.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags&14680064,r|=s.flags&14680064,s.return=e,s=s.sibling;else for(s=e.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags,r|=s.flags,s.return=e,s=s.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Iy(e,t,n){var r=t.pendingProps;switch(tu(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return De(t),null;case 1:return st(t.type)&&Bo(),De(t),null;case 3:return r=t.stateNode,xs(),ie(rt),ie(Ue),uu(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(io(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Lt!==null&&(sc(Lt),Lt=null))),Jl(e,t),De(t),null;case 5:cu(t);var s=rr(pi.current);if(n=t.type,e!==null&&t.stateNode!=null)Xh(e,t,n,r,s),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(L(166));return De(t),null}if(e=rr(Yt.current),io(t)){r=t.stateNode,n=t.type;var i=t.memoizedProps;switch(r[Qt]=t,r[di]=i,e=(t.mode&1)!==0,n){case"dialog":se("cancel",r),se("close",r);break;case"iframe":case"object":case"embed":se("load",r);break;case"video":case"audio":for(s=0;s<Hs.length;s++)se(Hs[s],r);break;case"source":se("error",r);break;case"img":case"image":case"link":se("error",r),se("load",r);break;case"details":se("toggle",r);break;case"input":Zu(r,i),se("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},se("invalid",r);break;case"textarea":td(r,i),se("invalid",r)}kl(n,i),s=null;for(var a in i)if(i.hasOwnProperty(a)){var l=i[a];a==="children"?typeof l=="string"?r.textContent!==l&&(i.suppressHydrationWarning!==!0&&so(r.textContent,l,e),s=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(i.suppressHydrationWarning!==!0&&so(r.textContent,l,e),s=["children",""+l]):ti.hasOwnProperty(a)&&l!=null&&a==="onScroll"&&se("scroll",r)}switch(n){case"input":Ji(r),ed(r,i,!0);break;case"textarea":Ji(r),nd(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=$o)}r=s,t.updateQueue=r,r!==null&&(t.flags|=4)}else{a=s.nodeType===9?s:s.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Ep(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=a.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=a.createElement(n,{is:r.is}):(e=a.createElement(n),n==="select"&&(a=e,r.multiple?a.multiple=!0:r.size&&(a.size=r.size))):e=a.createElementNS(e,n),e[Qt]=t,e[di]=r,Jh(e,t,!1,!1),t.stateNode=e;e:{switch(a=jl(n,r),n){case"dialog":se("cancel",e),se("close",e),s=r;break;case"iframe":case"object":case"embed":se("load",e),s=r;break;case"video":case"audio":for(s=0;s<Hs.length;s++)se(Hs[s],e);s=r;break;case"source":se("error",e),s=r;break;case"img":case"image":case"link":se("error",e),se("load",e),s=r;break;case"details":se("toggle",e),s=r;break;case"input":Zu(e,r),s=xl(e,r),se("invalid",e);break;case"option":s=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},s=ue({},r,{value:void 0}),se("invalid",e);break;case"textarea":td(e,r),s=wl(e,r),se("invalid",e);break;default:s=r}kl(n,s),l=s;for(i in l)if(l.hasOwnProperty(i)){var c=l[i];i==="style"?Np(e,c):i==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&_p(e,c)):i==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&ni(e,c):typeof c=="number"&&ni(e,""+c):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(ti.hasOwnProperty(i)?c!=null&&i==="onScroll"&&se("scroll",e):c!=null&&$c(e,i,c,a))}switch(n){case"input":Ji(e),ed(e,r,!1);break;case"textarea":Ji(e),nd(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Qn(r.value));break;case"select":e.multiple=!!r.multiple,i=r.value,i!=null?Yr(e,!!r.multiple,i,!1):r.defaultValue!=null&&Yr(e,!!r.multiple,r.defaultValue,!0);break;default:typeof s.onClick=="function"&&(e.onclick=$o)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return De(t),null;case 6:if(e&&t.stateNode!=null)Gh(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(L(166));if(n=rr(pi.current),rr(Yt.current),io(t)){if(r=t.stateNode,n=t.memoizedProps,r[Qt]=t,(i=r.nodeValue!==n)&&(e=ut,e!==null))switch(e.tag){case 3:so(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&so(r.nodeValue,n,(e.mode&1)!==0)}i&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Qt]=t,t.stateNode=r}return De(t),null;case 13:if(ie(le),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(ae&&ct!==null&&t.mode&1&&!(t.flags&128))gh(),gs(),t.flags|=98560,i=!1;else if(i=io(t),r!==null&&r.dehydrated!==null){if(e===null){if(!i)throw Error(L(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(L(317));i[Qt]=t}else gs(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;De(t),i=!1}else Lt!==null&&(sc(Lt),Lt=null),i=!0;if(!i)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||le.current&1?je===0&&(je=3):Su())),t.updateQueue!==null&&(t.flags|=4),De(t),null);case 4:return xs(),Jl(e,t),e===null&&ci(t.stateNode.containerInfo),De(t),null;case 10:return iu(t.type._context),De(t),null;case 17:return st(t.type)&&Bo(),De(t),null;case 19:if(ie(le),i=t.memoizedState,i===null)return De(t),null;if(r=(t.flags&128)!==0,a=i.rendering,a===null)if(r)Fs(i,!1);else{if(je!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(a=Ko(e),a!==null){for(t.flags|=128,Fs(i,!1),r=a.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)i=n,e=r,i.flags&=14680066,a=i.alternate,a===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=a.childLanes,i.lanes=a.lanes,i.child=a.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=a.memoizedProps,i.memoizedState=a.memoizedState,i.updateQueue=a.updateQueue,i.type=a.type,e=a.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return re(le,le.current&1|2),t.child}e=e.sibling}i.tail!==null&&he()>bs&&(t.flags|=128,r=!0,Fs(i,!1),t.lanes=4194304)}else{if(!r)if(e=Ko(a),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Fs(i,!0),i.tail===null&&i.tailMode==="hidden"&&!a.alternate&&!ae)return De(t),null}else 2*he()-i.renderingStartTime>bs&&n!==1073741824&&(t.flags|=128,r=!0,Fs(i,!1),t.lanes=4194304);i.isBackwards?(a.sibling=t.child,t.child=a):(n=i.last,n!==null?n.sibling=a:t.child=a,i.last=a)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=he(),t.sibling=null,n=le.current,re(le,r?n&1|2:n&1),t):(De(t),null);case 22:case 23:return wu(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?lt&1073741824&&(De(t),t.subtreeFlags&6&&(t.flags|=8192)):De(t),null;case 24:return null;case 25:return null}throw Error(L(156,t.tag))}function Ay(e,t){switch(tu(t),t.tag){case 1:return st(t.type)&&Bo(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return xs(),ie(rt),ie(Ue),uu(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return cu(t),null;case 13:if(ie(le),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(L(340));gs()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return ie(le),null;case 4:return xs(),null;case 10:return iu(t.type._context),null;case 22:case 23:return wu(),null;case 24:return null;default:return null}}var lo=!1,$e=!1,My=typeof WeakSet=="function"?WeakSet:Set,M=null;function Qr(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){fe(e,t,r)}else n.current=null}function Xl(e,t,n){try{n()}catch(r){fe(e,t,r)}}var Vd=!1;function Fy(e,t){if(Ol=Mo,e=rh(),Zc(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var s=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var a=0,l=-1,c=-1,u=0,p=0,m=e,g=null;t:for(;;){for(var b;m!==n||s!==0&&m.nodeType!==3||(l=a+s),m!==i||r!==0&&m.nodeType!==3||(c=a+r),m.nodeType===3&&(a+=m.nodeValue.length),(b=m.firstChild)!==null;)g=m,m=b;for(;;){if(m===e)break t;if(g===n&&++u===s&&(l=a),g===i&&++p===r&&(c=a),(b=m.nextSibling)!==null)break;m=g,g=m.parentNode}m=b}n=l===-1||c===-1?null:{start:l,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(Il={focusedElem:e,selectionRange:n},Mo=!1,M=t;M!==null;)if(t=M,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,M=e;else for(;M!==null;){t=M;try{var x=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(x!==null){var v=x.memoizedProps,k=x.memoizedState,y=t.stateNode,d=y.getSnapshotBeforeUpdate(t.elementType===t.type?v:Tt(t.type,v),k);y.__reactInternalSnapshotBeforeUpdate=d}break;case 3:var h=t.stateNode.containerInfo;h.nodeType===1?h.textContent="":h.nodeType===9&&h.documentElement&&h.removeChild(h.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(L(163))}}catch(S){fe(t,t.return,S)}if(e=t.sibling,e!==null){e.return=t.return,M=e;break}M=t.return}return x=Vd,Vd=!1,x}function Gs(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var s=r=r.next;do{if((s.tag&e)===e){var i=s.destroy;s.destroy=void 0,i!==void 0&&Xl(t,n,i)}s=s.next}while(s!==r)}}function xa(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Gl(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Zh(e){var t=e.alternate;t!==null&&(e.alternate=null,Zh(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Qt],delete t[di],delete t[Fl],delete t[by],delete t[wy])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function em(e){return e.tag===5||e.tag===3||e.tag===4}function qd(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||em(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Zl(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=$o));else if(r!==4&&(e=e.child,e!==null))for(Zl(e,t,n),e=e.sibling;e!==null;)Zl(e,t,n),e=e.sibling}function ec(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(ec(e,t,n),e=e.sibling;e!==null;)ec(e,t,n),e=e.sibling}var Le=null,Pt=!1;function xn(e,t,n){for(n=n.child;n!==null;)tm(e,t,n),n=n.sibling}function tm(e,t,n){if(Kt&&typeof Kt.onCommitFiberUnmount=="function")try{Kt.onCommitFiberUnmount(ua,n)}catch{}switch(n.tag){case 5:$e||Qr(n,t);case 6:var r=Le,s=Pt;Le=null,xn(e,t,n),Le=r,Pt=s,Le!==null&&(Pt?(e=Le,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Le.removeChild(n.stateNode));break;case 18:Le!==null&&(Pt?(e=Le,n=n.stateNode,e.nodeType===8?Za(e.parentNode,n):e.nodeType===1&&Za(e,n),oi(e)):Za(Le,n.stateNode));break;case 4:r=Le,s=Pt,Le=n.stateNode.containerInfo,Pt=!0,xn(e,t,n),Le=r,Pt=s;break;case 0:case 11:case 14:case 15:if(!$e&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){s=r=r.next;do{var i=s,a=i.destroy;i=i.tag,a!==void 0&&(i&2||i&4)&&Xl(n,t,a),s=s.next}while(s!==r)}xn(e,t,n);break;case 1:if(!$e&&(Qr(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){fe(n,t,l)}xn(e,t,n);break;case 21:xn(e,t,n);break;case 22:n.mode&1?($e=(r=$e)||n.memoizedState!==null,xn(e,t,n),$e=r):xn(e,t,n);break;default:xn(e,t,n)}}function Qd(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new My),t.forEach(function(r){var s=Qy.bind(null,e,r);n.has(r)||(n.add(r),r.then(s,s))})}}function _t(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var s=n[r];try{var i=e,a=t,l=a;e:for(;l!==null;){switch(l.tag){case 5:Le=l.stateNode,Pt=!1;break e;case 3:Le=l.stateNode.containerInfo,Pt=!0;break e;case 4:Le=l.stateNode.containerInfo,Pt=!0;break e}l=l.return}if(Le===null)throw Error(L(160));tm(i,a,s),Le=null,Pt=!1;var c=s.alternate;c!==null&&(c.return=null),s.return=null}catch(u){fe(s,t,u)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)nm(t,e),t=t.sibling}function nm(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(_t(t,e),Bt(e),r&4){try{Gs(3,e,e.return),xa(3,e)}catch(v){fe(e,e.return,v)}try{Gs(5,e,e.return)}catch(v){fe(e,e.return,v)}}break;case 1:_t(t,e),Bt(e),r&512&&n!==null&&Qr(n,n.return);break;case 5:if(_t(t,e),Bt(e),r&512&&n!==null&&Qr(n,n.return),e.flags&32){var s=e.stateNode;try{ni(s,"")}catch(v){fe(e,e.return,v)}}if(r&4&&(s=e.stateNode,s!=null)){var i=e.memoizedProps,a=n!==null?n.memoizedProps:i,l=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{l==="input"&&i.type==="radio"&&i.name!=null&&jp(s,i),jl(l,a);var u=jl(l,i);for(a=0;a<c.length;a+=2){var p=c[a],m=c[a+1];p==="style"?Np(s,m):p==="dangerouslySetInnerHTML"?_p(s,m):p==="children"?ni(s,m):$c(s,p,m,u)}switch(l){case"input":vl(s,i);break;case"textarea":Cp(s,i);break;case"select":var g=s._wrapperState.wasMultiple;s._wrapperState.wasMultiple=!!i.multiple;var b=i.value;b!=null?Yr(s,!!i.multiple,b,!1):g!==!!i.multiple&&(i.defaultValue!=null?Yr(s,!!i.multiple,i.defaultValue,!0):Yr(s,!!i.multiple,i.multiple?[]:"",!1))}s[di]=i}catch(v){fe(e,e.return,v)}}break;case 6:if(_t(t,e),Bt(e),r&4){if(e.stateNode===null)throw Error(L(162));s=e.stateNode,i=e.memoizedProps;try{s.nodeValue=i}catch(v){fe(e,e.return,v)}}break;case 3:if(_t(t,e),Bt(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{oi(t.containerInfo)}catch(v){fe(e,e.return,v)}break;case 4:_t(t,e),Bt(e);break;case 13:_t(t,e),Bt(e),s=e.child,s.flags&8192&&(i=s.memoizedState!==null,s.stateNode.isHidden=i,!i||s.alternate!==null&&s.alternate.memoizedState!==null||(vu=he())),r&4&&Qd(e);break;case 22:if(p=n!==null&&n.memoizedState!==null,e.mode&1?($e=(u=$e)||p,_t(t,e),$e=u):_t(t,e),Bt(e),r&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!p&&e.mode&1)for(M=e,p=e.child;p!==null;){for(m=M=p;M!==null;){switch(g=M,b=g.child,g.tag){case 0:case 11:case 14:case 15:Gs(4,g,g.return);break;case 1:Qr(g,g.return);var x=g.stateNode;if(typeof x.componentWillUnmount=="function"){r=g,n=g.return;try{t=r,x.props=t.memoizedProps,x.state=t.memoizedState,x.componentWillUnmount()}catch(v){fe(r,n,v)}}break;case 5:Qr(g,g.return);break;case 22:if(g.memoizedState!==null){Yd(m);continue}}b!==null?(b.return=g,M=b):Yd(m)}p=p.sibling}e:for(p=null,m=e;;){if(m.tag===5){if(p===null){p=m;try{s=m.stateNode,u?(i=s.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(l=m.stateNode,c=m.memoizedProps.style,a=c!=null&&c.hasOwnProperty("display")?c.display:null,l.style.display=Tp("display",a))}catch(v){fe(e,e.return,v)}}}else if(m.tag===6){if(p===null)try{m.stateNode.nodeValue=u?"":m.memoizedProps}catch(v){fe(e,e.return,v)}}else if((m.tag!==22&&m.tag!==23||m.memoizedState===null||m===e)&&m.child!==null){m.child.return=m,m=m.child;continue}if(m===e)break e;for(;m.sibling===null;){if(m.return===null||m.return===e)break e;p===m&&(p=null),m=m.return}p===m&&(p=null),m.sibling.return=m.return,m=m.sibling}}break;case 19:_t(t,e),Bt(e),r&4&&Qd(e);break;case 21:break;default:_t(t,e),Bt(e)}}function Bt(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(em(n)){var r=n;break e}n=n.return}throw Error(L(160))}switch(r.tag){case 5:var s=r.stateNode;r.flags&32&&(ni(s,""),r.flags&=-33);var i=qd(e);ec(e,i,s);break;case 3:case 4:var a=r.stateNode.containerInfo,l=qd(e);Zl(e,l,a);break;default:throw Error(L(161))}}catch(c){fe(e,e.return,c)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Dy(e,t,n){M=e,rm(e)}function rm(e,t,n){for(var r=(e.mode&1)!==0;M!==null;){var s=M,i=s.child;if(s.tag===22&&r){var a=s.memoizedState!==null||lo;if(!a){var l=s.alternate,c=l!==null&&l.memoizedState!==null||$e;l=lo;var u=$e;if(lo=a,($e=c)&&!u)for(M=s;M!==null;)a=M,c=a.child,a.tag===22&&a.memoizedState!==null?Jd(s):c!==null?(c.return=a,M=c):Jd(s);for(;i!==null;)M=i,rm(i),i=i.sibling;M=s,lo=l,$e=u}Kd(e)}else s.subtreeFlags&8772&&i!==null?(i.return=s,M=i):Kd(e)}}function Kd(e){for(;M!==null;){var t=M;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:$e||xa(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!$e)if(n===null)r.componentDidMount();else{var s=t.elementType===t.type?n.memoizedProps:Tt(t.type,n.memoizedProps);r.componentDidUpdate(s,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=t.updateQueue;i!==null&&zd(t,i,r);break;case 3:var a=t.updateQueue;if(a!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}zd(t,a,n)}break;case 5:var l=t.stateNode;if(n===null&&t.flags&4){n=l;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var u=t.alternate;if(u!==null){var p=u.memoizedState;if(p!==null){var m=p.dehydrated;m!==null&&oi(m)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(L(163))}$e||t.flags&512&&Gl(t)}catch(g){fe(t,t.return,g)}}if(t===e){M=null;break}if(n=t.sibling,n!==null){n.return=t.return,M=n;break}M=t.return}}function Yd(e){for(;M!==null;){var t=M;if(t===e){M=null;break}var n=t.sibling;if(n!==null){n.return=t.return,M=n;break}M=t.return}}function Jd(e){for(;M!==null;){var t=M;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{xa(4,t)}catch(c){fe(t,n,c)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var s=t.return;try{r.componentDidMount()}catch(c){fe(t,s,c)}}var i=t.return;try{Gl(t)}catch(c){fe(t,i,c)}break;case 5:var a=t.return;try{Gl(t)}catch(c){fe(t,a,c)}}}catch(c){fe(t,t.return,c)}if(t===e){M=null;break}var l=t.sibling;if(l!==null){l.return=t.return,M=l;break}M=t.return}}var $y=Math.ceil,Xo=pn.ReactCurrentDispatcher,yu=pn.ReactCurrentOwner,wt=pn.ReactCurrentBatchConfig,X=0,Ne=null,ve=null,Oe=0,lt=0,Kr=Jn(0),je=0,yi=null,kr=0,va=0,xu=0,Zs=null,tt=null,vu=0,bs=1/0,Gt=null,Go=!1,tc=null,Un=null,co=!1,In=null,Zo=0,ei=0,nc=null,jo=-1,Co=0;function Ke(){return X&6?he():jo!==-1?jo:jo=he()}function Wn(e){return e.mode&1?X&2&&Oe!==0?Oe&-Oe:ky.transition!==null?(Co===0&&(Co=Bp()),Co):(e=Z,e!==0||(e=window.event,e=e===void 0?16:Kp(e.type)),e):1}function It(e,t,n,r){if(50<ei)throw ei=0,nc=null,Error(L(185));Mi(e,n,r),(!(X&2)||e!==Ne)&&(e===Ne&&(!(X&2)&&(va|=n),je===4&&kn(e,Oe)),it(e,r),n===1&&X===0&&!(t.mode&1)&&(bs=he()+500,ma&&Xn()))}function it(e,t){var n=e.callbackNode;kg(e,t);var r=Ao(e,e===Ne?Oe:0);if(r===0)n!==null&&id(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&id(n),t===1)e.tag===0?Sy(Xd.bind(null,e)):ph(Xd.bind(null,e)),xy(function(){!(X&6)&&Xn()}),n=null;else{switch(Up(r)){case 1:n=Vc;break;case 4:n=Dp;break;case 16:n=Io;break;case 536870912:n=$p;break;default:n=Io}n=dm(n,sm.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function sm(e,t){if(jo=-1,Co=0,X&6)throw Error(L(327));var n=e.callbackNode;if(es()&&e.callbackNode!==n)return null;var r=Ao(e,e===Ne?Oe:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=ea(e,r);else{t=r;var s=X;X|=2;var i=om();(Ne!==e||Oe!==t)&&(Gt=null,bs=he()+500,gr(e,t));do try{Wy();break}catch(l){im(e,l)}while(1);su(),Xo.current=i,X=s,ve!==null?t=0:(Ne=null,Oe=0,t=je)}if(t!==0){if(t===2&&(s=Nl(e),s!==0&&(r=s,t=rc(e,s))),t===1)throw n=yi,gr(e,0),kn(e,r),it(e,he()),n;if(t===6)kn(e,r);else{if(s=e.current.alternate,!(r&30)&&!By(s)&&(t=ea(e,r),t===2&&(i=Nl(e),i!==0&&(r=i,t=rc(e,i))),t===1))throw n=yi,gr(e,0),kn(e,r),it(e,he()),n;switch(e.finishedWork=s,e.finishedLanes=r,t){case 0:case 1:throw Error(L(345));case 2:er(e,tt,Gt);break;case 3:if(kn(e,r),(r&130023424)===r&&(t=vu+500-he(),10<t)){if(Ao(e,0)!==0)break;if(s=e.suspendedLanes,(s&r)!==r){Ke(),e.pingedLanes|=e.suspendedLanes&s;break}e.timeoutHandle=Ml(er.bind(null,e,tt,Gt),t);break}er(e,tt,Gt);break;case 4:if(kn(e,r),(r&4194240)===r)break;for(t=e.eventTimes,s=-1;0<r;){var a=31-Ot(r);i=1<<a,a=t[a],a>s&&(s=a),r&=~i}if(r=s,r=he()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*$y(r/1960))-r,10<r){e.timeoutHandle=Ml(er.bind(null,e,tt,Gt),r);break}er(e,tt,Gt);break;case 5:er(e,tt,Gt);break;default:throw Error(L(329))}}}return it(e,he()),e.callbackNode===n?sm.bind(null,e):null}function rc(e,t){var n=Zs;return e.current.memoizedState.isDehydrated&&(gr(e,t).flags|=256),e=ea(e,t),e!==2&&(t=tt,tt=n,t!==null&&sc(t)),e}function sc(e){tt===null?tt=e:tt.push.apply(tt,e)}function By(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var s=n[r],i=s.getSnapshot;s=s.value;try{if(!Ft(i(),s))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function kn(e,t){for(t&=~xu,t&=~va,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Ot(t),r=1<<n;e[n]=-1,t&=~r}}function Xd(e){if(X&6)throw Error(L(327));es();var t=Ao(e,0);if(!(t&1))return it(e,he()),null;var n=ea(e,t);if(e.tag!==0&&n===2){var r=Nl(e);r!==0&&(t=r,n=rc(e,r))}if(n===1)throw n=yi,gr(e,0),kn(e,t),it(e,he()),n;if(n===6)throw Error(L(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,er(e,tt,Gt),it(e,he()),null}function bu(e,t){var n=X;X|=1;try{return e(t)}finally{X=n,X===0&&(bs=he()+500,ma&&Xn())}}function jr(e){In!==null&&In.tag===0&&!(X&6)&&es();var t=X;X|=1;var n=wt.transition,r=Z;try{if(wt.transition=null,Z=1,e)return e()}finally{Z=r,wt.transition=n,X=t,!(X&6)&&Xn()}}function wu(){lt=Kr.current,ie(Kr)}function gr(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,yy(n)),ve!==null)for(n=ve.return;n!==null;){var r=n;switch(tu(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Bo();break;case 3:xs(),ie(rt),ie(Ue),uu();break;case 5:cu(r);break;case 4:xs();break;case 13:ie(le);break;case 19:ie(le);break;case 10:iu(r.type._context);break;case 22:case 23:wu()}n=n.return}if(Ne=e,ve=e=Hn(e.current,null),Oe=lt=t,je=0,yi=null,xu=va=kr=0,tt=Zs=null,nr!==null){for(t=0;t<nr.length;t++)if(n=nr[t],r=n.interleaved,r!==null){n.interleaved=null;var s=r.next,i=n.pending;if(i!==null){var a=i.next;i.next=s,r.next=a}n.pending=r}nr=null}return e}function im(e,t){do{var n=ve;try{if(su(),wo.current=Jo,Yo){for(var r=ce.memoizedState;r!==null;){var s=r.queue;s!==null&&(s.pending=null),r=r.next}Yo=!1}if(Sr=0,Te=Se=ce=null,Xs=!1,hi=0,yu.current=null,n===null||n.return===null){je=1,yi=t,ve=null;break}e:{var i=e,a=n.return,l=n,c=t;if(t=Oe,l.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var u=c,p=l,m=p.tag;if(!(p.mode&1)&&(m===0||m===11||m===15)){var g=p.alternate;g?(p.updateQueue=g.updateQueue,p.memoizedState=g.memoizedState,p.lanes=g.lanes):(p.updateQueue=null,p.memoizedState=null)}var b=Fd(a);if(b!==null){b.flags&=-257,Dd(b,a,l,i,t),b.mode&1&&Md(i,u,t),t=b,c=u;var x=t.updateQueue;if(x===null){var v=new Set;v.add(c),t.updateQueue=v}else x.add(c);break e}else{if(!(t&1)){Md(i,u,t),Su();break e}c=Error(L(426))}}else if(ae&&l.mode&1){var k=Fd(a);if(k!==null){!(k.flags&65536)&&(k.flags|=256),Dd(k,a,l,i,t),nu(vs(c,l));break e}}i=c=vs(c,l),je!==4&&(je=2),Zs===null?Zs=[i]:Zs.push(i),i=a;do{switch(i.tag){case 3:i.flags|=65536,t&=-t,i.lanes|=t;var y=Uh(i,c,t);Pd(i,y);break e;case 1:l=c;var d=i.type,h=i.stateNode;if(!(i.flags&128)&&(typeof d.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&(Un===null||!Un.has(h)))){i.flags|=65536,t&=-t,i.lanes|=t;var S=Wh(i,l,t);Pd(i,S);break e}}i=i.return}while(i!==null)}lm(n)}catch(E){t=E,ve===n&&n!==null&&(ve=n=n.return);continue}break}while(1)}function om(){var e=Xo.current;return Xo.current=Jo,e===null?Jo:e}function Su(){(je===0||je===3||je===2)&&(je=4),Ne===null||!(kr&268435455)&&!(va&268435455)||kn(Ne,Oe)}function ea(e,t){var n=X;X|=2;var r=om();(Ne!==e||Oe!==t)&&(Gt=null,gr(e,t));do try{Uy();break}catch(s){im(e,s)}while(1);if(su(),X=n,Xo.current=r,ve!==null)throw Error(L(261));return Ne=null,Oe=0,je}function Uy(){for(;ve!==null;)am(ve)}function Wy(){for(;ve!==null&&!hg();)am(ve)}function am(e){var t=um(e.alternate,e,lt);e.memoizedProps=e.pendingProps,t===null?lm(e):ve=t,yu.current=null}function lm(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=Ay(n,t),n!==null){n.flags&=32767,ve=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{je=6,ve=null;return}}else if(n=Iy(n,t,lt),n!==null){ve=n;return}if(t=t.sibling,t!==null){ve=t;return}ve=t=e}while(t!==null);je===0&&(je=5)}function er(e,t,n){var r=Z,s=wt.transition;try{wt.transition=null,Z=1,Hy(e,t,n,r)}finally{wt.transition=s,Z=r}return null}function Hy(e,t,n,r){do es();while(In!==null);if(X&6)throw Error(L(327));n=e.finishedWork;var s=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(L(177));e.callbackNode=null,e.callbackPriority=0;var i=n.lanes|n.childLanes;if(jg(e,i),e===Ne&&(ve=Ne=null,Oe=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||co||(co=!0,dm(Io,function(){return es(),null})),i=(n.flags&15990)!==0,n.subtreeFlags&15990||i){i=wt.transition,wt.transition=null;var a=Z;Z=1;var l=X;X|=4,yu.current=null,Fy(e,n),nm(n,e),uy(Il),Mo=!!Ol,Il=Ol=null,e.current=n,Dy(n),mg(),X=l,Z=a,wt.transition=i}else e.current=n;if(co&&(co=!1,In=e,Zo=s),i=e.pendingLanes,i===0&&(Un=null),xg(n.stateNode),it(e,he()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)s=t[n],r(s.value,{componentStack:s.stack,digest:s.digest});if(Go)throw Go=!1,e=tc,tc=null,e;return Zo&1&&e.tag!==0&&es(),i=e.pendingLanes,i&1?e===nc?ei++:(ei=0,nc=e):ei=0,Xn(),null}function es(){if(In!==null){var e=Up(Zo),t=wt.transition,n=Z;try{if(wt.transition=null,Z=16>e?16:e,In===null)var r=!1;else{if(e=In,In=null,Zo=0,X&6)throw Error(L(331));var s=X;for(X|=4,M=e.current;M!==null;){var i=M,a=i.child;if(M.flags&16){var l=i.deletions;if(l!==null){for(var c=0;c<l.length;c++){var u=l[c];for(M=u;M!==null;){var p=M;switch(p.tag){case 0:case 11:case 15:Gs(8,p,i)}var m=p.child;if(m!==null)m.return=p,M=m;else for(;M!==null;){p=M;var g=p.sibling,b=p.return;if(Zh(p),p===u){M=null;break}if(g!==null){g.return=b,M=g;break}M=b}}}var x=i.alternate;if(x!==null){var v=x.child;if(v!==null){x.child=null;do{var k=v.sibling;v.sibling=null,v=k}while(v!==null)}}M=i}}if(i.subtreeFlags&2064&&a!==null)a.return=i,M=a;else e:for(;M!==null;){if(i=M,i.flags&2048)switch(i.tag){case 0:case 11:case 15:Gs(9,i,i.return)}var y=i.sibling;if(y!==null){y.return=i.return,M=y;break e}M=i.return}}var d=e.current;for(M=d;M!==null;){a=M;var h=a.child;if(a.subtreeFlags&2064&&h!==null)h.return=a,M=h;else e:for(a=d;M!==null;){if(l=M,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:xa(9,l)}}catch(E){fe(l,l.return,E)}if(l===a){M=null;break e}var S=l.sibling;if(S!==null){S.return=l.return,M=S;break e}M=l.return}}if(X=s,Xn(),Kt&&typeof Kt.onPostCommitFiberRoot=="function")try{Kt.onPostCommitFiberRoot(ua,e)}catch{}r=!0}return r}finally{Z=n,wt.transition=t}}return!1}function Gd(e,t,n){t=vs(n,t),t=Uh(e,t,1),e=Bn(e,t,1),t=Ke(),e!==null&&(Mi(e,1,t),it(e,t))}function fe(e,t,n){if(e.tag===3)Gd(e,e,n);else for(;t!==null;){if(t.tag===3){Gd(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Un===null||!Un.has(r))){e=vs(n,e),e=Wh(t,e,1),t=Bn(t,e,1),e=Ke(),t!==null&&(Mi(t,1,e),it(t,e));break}}t=t.return}}function Vy(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=Ke(),e.pingedLanes|=e.suspendedLanes&n,Ne===e&&(Oe&n)===n&&(je===4||je===3&&(Oe&130023424)===Oe&&500>he()-vu?gr(e,0):xu|=n),it(e,t)}function cm(e,t){t===0&&(e.mode&1?(t=Zi,Zi<<=1,!(Zi&130023424)&&(Zi=4194304)):t=1);var n=Ke();e=un(e,t),e!==null&&(Mi(e,t,n),it(e,n))}function qy(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),cm(e,n)}function Qy(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,s=e.memoizedState;s!==null&&(n=s.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(L(314))}r!==null&&r.delete(t),cm(e,n)}var um;um=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||rt.current)nt=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return nt=!1,Oy(e,t,n);nt=!!(e.flags&131072)}else nt=!1,ae&&t.flags&1048576&&hh(t,Ho,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;ko(e,t),e=t.pendingProps;var s=ms(t,Ue.current);Zr(t,n),s=fu(null,t,r,e,s,n);var i=pu();return t.flags|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,st(r)?(i=!0,Uo(t)):i=!1,t.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,au(t),s.updater=ya,t.stateNode=s,s._reactInternals=t,Hl(t,r,e,n),t=Ql(null,t,r,!0,i,n)):(t.tag=0,ae&&i&&eu(t),Ve(null,t,s,n),t=t.child),t;case 16:r=t.elementType;e:{switch(ko(e,t),e=t.pendingProps,s=r._init,r=s(r._payload),t.type=r,s=t.tag=Yy(r),e=Tt(r,e),s){case 0:t=ql(null,t,r,e,n);break e;case 1:t=Ud(null,t,r,e,n);break e;case 11:t=$d(null,t,r,e,n);break e;case 14:t=Bd(null,t,r,Tt(r.type,e),n);break e}throw Error(L(306,r,""))}return t;case 0:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:Tt(r,s),ql(e,t,r,s,n);case 1:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:Tt(r,s),Ud(e,t,r,s,n);case 3:e:{if(Qh(t),e===null)throw Error(L(387));r=t.pendingProps,i=t.memoizedState,s=i.element,bh(e,t),Qo(t,r,null,n);var a=t.memoizedState;if(r=a.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){s=vs(Error(L(423)),t),t=Wd(e,t,r,n,s);break e}else if(r!==s){s=vs(Error(L(424)),t),t=Wd(e,t,r,n,s);break e}else for(ct=$n(t.stateNode.containerInfo.firstChild),ut=t,ae=!0,Lt=null,n=xh(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(gs(),r===s){t=dn(e,t,n);break e}Ve(e,t,r,n)}t=t.child}return t;case 5:return wh(t),e===null&&Bl(t),r=t.type,s=t.pendingProps,i=e!==null?e.memoizedProps:null,a=s.children,Al(r,s)?a=null:i!==null&&Al(r,i)&&(t.flags|=32),qh(e,t),Ve(e,t,a,n),t.child;case 6:return e===null&&Bl(t),null;case 13:return Kh(e,t,n);case 4:return lu(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=ys(t,null,r,n):Ve(e,t,r,n),t.child;case 11:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:Tt(r,s),$d(e,t,r,s,n);case 7:return Ve(e,t,t.pendingProps,n),t.child;case 8:return Ve(e,t,t.pendingProps.children,n),t.child;case 12:return Ve(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,s=t.pendingProps,i=t.memoizedProps,a=s.value,re(Vo,r._currentValue),r._currentValue=a,i!==null)if(Ft(i.value,a)){if(i.children===s.children&&!rt.current){t=dn(e,t,n);break e}}else for(i=t.child,i!==null&&(i.return=t);i!==null;){var l=i.dependencies;if(l!==null){a=i.child;for(var c=l.firstContext;c!==null;){if(c.context===r){if(i.tag===1){c=an(-1,n&-n),c.tag=2;var u=i.updateQueue;if(u!==null){u=u.shared;var p=u.pending;p===null?c.next=c:(c.next=p.next,p.next=c),u.pending=c}}i.lanes|=n,c=i.alternate,c!==null&&(c.lanes|=n),Ul(i.return,n,t),l.lanes|=n;break}c=c.next}}else if(i.tag===10)a=i.type===t.type?null:i.child;else if(i.tag===18){if(a=i.return,a===null)throw Error(L(341));a.lanes|=n,l=a.alternate,l!==null&&(l.lanes|=n),Ul(a,n,t),a=i.sibling}else a=i.child;if(a!==null)a.return=i;else for(a=i;a!==null;){if(a===t){a=null;break}if(i=a.sibling,i!==null){i.return=a.return,a=i;break}a=a.return}i=a}Ve(e,t,s.children,n),t=t.child}return t;case 9:return s=t.type,r=t.pendingProps.children,Zr(t,n),s=St(s),r=r(s),t.flags|=1,Ve(e,t,r,n),t.child;case 14:return r=t.type,s=Tt(r,t.pendingProps),s=Tt(r.type,s),Bd(e,t,r,s,n);case 15:return Hh(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:Tt(r,s),ko(e,t),t.tag=1,st(r)?(e=!0,Uo(t)):e=!1,Zr(t,n),Bh(t,r,s),Hl(t,r,s,n),Ql(null,t,r,!0,e,n);case 19:return Yh(e,t,n);case 22:return Vh(e,t,n)}throw Error(L(156,t.tag))};function dm(e,t){return Fp(e,t)}function Ky(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function bt(e,t,n,r){return new Ky(e,t,n,r)}function ku(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Yy(e){if(typeof e=="function")return ku(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Uc)return 11;if(e===Wc)return 14}return 2}function Hn(e,t){var n=e.alternate;return n===null?(n=bt(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Eo(e,t,n,r,s,i){var a=2;if(r=e,typeof e=="function")ku(e)&&(a=1);else if(typeof e=="string")a=5;else e:switch(e){case Fr:return yr(n.children,s,i,t);case Bc:a=8,s|=8;break;case hl:return e=bt(12,n,t,s|2),e.elementType=hl,e.lanes=i,e;case ml:return e=bt(13,n,t,s),e.elementType=ml,e.lanes=i,e;case gl:return e=bt(19,n,t,s),e.elementType=gl,e.lanes=i,e;case wp:return ba(n,s,i,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case vp:a=10;break e;case bp:a=9;break e;case Uc:a=11;break e;case Wc:a=14;break e;case bn:a=16,r=null;break e}throw Error(L(130,e==null?e:typeof e,""))}return t=bt(a,n,t,s),t.elementType=e,t.type=r,t.lanes=i,t}function yr(e,t,n,r){return e=bt(7,e,r,t),e.lanes=n,e}function ba(e,t,n,r){return e=bt(22,e,r,t),e.elementType=wp,e.lanes=n,e.stateNode={isHidden:!1},e}function al(e,t,n){return e=bt(6,e,null,t),e.lanes=n,e}function ll(e,t,n){return t=bt(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Jy(e,t,n,r,s){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Ua(0),this.expirationTimes=Ua(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ua(0),this.identifierPrefix=r,this.onRecoverableError=s,this.mutableSourceEagerHydrationData=null}function ju(e,t,n,r,s,i,a,l,c){return e=new Jy(e,t,n,l,c),t===1?(t=1,i===!0&&(t|=8)):t=0,i=bt(3,null,null,t),e.current=i,i.stateNode=e,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},au(i),e}function Xy(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Mr,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function fm(e){if(!e)return Kn;e=e._reactInternals;e:{if(Rr(e)!==e||e.tag!==1)throw Error(L(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(st(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(L(171))}if(e.tag===1){var n=e.type;if(st(n))return fh(e,n,t)}return t}function pm(e,t,n,r,s,i,a,l,c){return e=ju(n,r,!0,e,s,i,a,l,c),e.context=fm(null),n=e.current,r=Ke(),s=Wn(n),i=an(r,s),i.callback=t??null,Bn(n,i,s),e.current.lanes=s,Mi(e,s,r),it(e,r),e}function wa(e,t,n,r){var s=t.current,i=Ke(),a=Wn(s);return n=fm(n),t.context===null?t.context=n:t.pendingContext=n,t=an(i,a),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=Bn(s,t,a),e!==null&&(It(e,s,a,i),bo(e,s,a)),a}function ta(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Zd(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Cu(e,t){Zd(e,t),(e=e.alternate)&&Zd(e,t)}function Gy(){return null}var hm=typeof reportError=="function"?reportError:function(e){console.error(e)};function Eu(e){this._internalRoot=e}Sa.prototype.render=Eu.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(L(409));wa(e,t,null,null)};Sa.prototype.unmount=Eu.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;jr(function(){wa(null,e,null,null)}),t[cn]=null}};function Sa(e){this._internalRoot=e}Sa.prototype.unstable_scheduleHydration=function(e){if(e){var t=Vp();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Sn.length&&t!==0&&t<Sn[n].priority;n++);Sn.splice(n,0,e),n===0&&Qp(e)}};function _u(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function ka(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function ef(){}function Zy(e,t,n,r,s){if(s){if(typeof r=="function"){var i=r;r=function(){var u=ta(a);i.call(u)}}var a=pm(t,r,e,0,null,!1,!1,"",ef);return e._reactRootContainer=a,e[cn]=a.current,ci(e.nodeType===8?e.parentNode:e),jr(),a}for(;s=e.lastChild;)e.removeChild(s);if(typeof r=="function"){var l=r;r=function(){var u=ta(c);l.call(u)}}var c=ju(e,0,!1,null,null,!1,!1,"",ef);return e._reactRootContainer=c,e[cn]=c.current,ci(e.nodeType===8?e.parentNode:e),jr(function(){wa(t,c,n,r)}),c}function ja(e,t,n,r,s){var i=n._reactRootContainer;if(i){var a=i;if(typeof s=="function"){var l=s;s=function(){var c=ta(a);l.call(c)}}wa(t,a,e,s)}else a=Zy(n,t,e,s,r);return ta(a)}Wp=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Ws(t.pendingLanes);n!==0&&(qc(t,n|1),it(t,he()),!(X&6)&&(bs=he()+500,Xn()))}break;case 13:jr(function(){var r=un(e,1);if(r!==null){var s=Ke();It(r,e,1,s)}}),Cu(e,1)}};Qc=function(e){if(e.tag===13){var t=un(e,134217728);if(t!==null){var n=Ke();It(t,e,134217728,n)}Cu(e,134217728)}};Hp=function(e){if(e.tag===13){var t=Wn(e),n=un(e,t);if(n!==null){var r=Ke();It(n,e,t,r)}Cu(e,t)}};Vp=function(){return Z};qp=function(e,t){var n=Z;try{return Z=e,t()}finally{Z=n}};El=function(e,t,n){switch(t){case"input":if(vl(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var s=ha(r);if(!s)throw Error(L(90));kp(r),vl(r,s)}}}break;case"textarea":Cp(e,n);break;case"select":t=n.value,t!=null&&Yr(e,!!n.multiple,t,!1)}};zp=bu;Lp=jr;var e1={usingClientEntryPoint:!1,Events:[Di,Ur,ha,Rp,Pp,bu]},Ds={findFiberByHostInstance:tr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},t1={bundleType:Ds.bundleType,version:Ds.version,rendererPackageName:Ds.rendererPackageName,rendererConfig:Ds.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:pn.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Ap(e),e===null?null:e.stateNode},findFiberByHostInstance:Ds.findFiberByHostInstance||Gy,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var uo=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!uo.isDisabled&&uo.supportsFiber)try{ua=uo.inject(t1),Kt=uo}catch{}}ft.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=e1;ft.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!_u(t))throw Error(L(200));return Xy(e,t,null,n)};ft.createRoot=function(e,t){if(!_u(e))throw Error(L(299));var n=!1,r="",s=hm;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(s=t.onRecoverableError)),t=ju(e,1,!1,null,null,n,!1,r,s),e[cn]=t.current,ci(e.nodeType===8?e.parentNode:e),new Eu(t)};ft.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(L(188)):(e=Object.keys(e).join(","),Error(L(268,e)));return e=Ap(t),e=e===null?null:e.stateNode,e};ft.flushSync=function(e){return jr(e)};ft.hydrate=function(e,t,n){if(!ka(t))throw Error(L(200));return ja(null,e,t,!0,n)};ft.hydrateRoot=function(e,t,n){if(!_u(e))throw Error(L(405));var r=n!=null&&n.hydratedSources||null,s=!1,i="",a=hm;if(n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),t=pm(t,null,e,1,n??null,s,!1,i,a),e[cn]=t.current,ci(e),r)for(e=0;e<r.length;e++)n=r[e],s=n._getVersion,s=s(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,s]:t.mutableSourceEagerHydrationData.push(n,s);return new Sa(t)};ft.render=function(e,t,n){if(!ka(t))throw Error(L(200));return ja(null,e,t,!1,n)};ft.unmountComponentAtNode=function(e){if(!ka(e))throw Error(L(40));return e._reactRootContainer?(jr(function(){ja(null,null,e,!1,function(){e._reactRootContainer=null,e[cn]=null})}),!0):!1};ft.unstable_batchedUpdates=bu;ft.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!ka(n))throw Error(L(200));if(e==null||e._reactInternals===void 0)throw Error(L(38));return ja(e,t,n,!1,r)};ft.version="18.3.1-next-f1338f8080-20240426";function mm(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(mm)}catch(e){console.error(e)}}mm(),mp.exports=ft;var n1=mp.exports,gm,tf=n1;gm=tf.createRoot,tf.hydrateRoot;/**
 * @remix-run/router v1.23.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function xi(){return xi=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},xi.apply(this,arguments)}var An;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(An||(An={}));const nf="popstate";function r1(e){e===void 0&&(e={});function t(r,s){let{pathname:i,search:a,hash:l}=r.location;return ic("",{pathname:i,search:a,hash:l},s.state&&s.state.usr||null,s.state&&s.state.key||"default")}function n(r,s){return typeof s=="string"?s:na(s)}return i1(t,n,null,e)}function me(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function ym(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function s1(){return Math.random().toString(36).substr(2,8)}function rf(e,t){return{usr:e.state,key:e.key,idx:t}}function ic(e,t,n,r){return n===void 0&&(n=null),xi({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?Cs(t):t,{state:n,key:t&&t.key||r||s1()})}function na(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&n!=="?"&&(t+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(t+=r.charAt(0)==="#"?r:"#"+r),t}function Cs(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function i1(e,t,n,r){r===void 0&&(r={});let{window:s=document.defaultView,v5Compat:i=!1}=r,a=s.history,l=An.Pop,c=null,u=p();u==null&&(u=0,a.replaceState(xi({},a.state,{idx:u}),""));function p(){return(a.state||{idx:null}).idx}function m(){l=An.Pop;let k=p(),y=k==null?null:k-u;u=k,c&&c({action:l,location:v.location,delta:y})}function g(k,y){l=An.Push;let d=ic(v.location,k,y);n&&n(d,k),u=p()+1;let h=rf(d,u),S=v.createHref(d);try{a.pushState(h,"",S)}catch(E){if(E instanceof DOMException&&E.name==="DataCloneError")throw E;s.location.assign(S)}i&&c&&c({action:l,location:v.location,delta:1})}function b(k,y){l=An.Replace;let d=ic(v.location,k,y);n&&n(d,k),u=p();let h=rf(d,u),S=v.createHref(d);a.replaceState(h,"",S),i&&c&&c({action:l,location:v.location,delta:0})}function x(k){let y=s.location.origin!=="null"?s.location.origin:s.location.href,d=typeof k=="string"?k:na(k);return d=d.replace(/ $/,"%20"),me(y,"No window.location.(origin|href) available to create URL for href: "+d),new URL(d,y)}let v={get action(){return l},get location(){return e(s,a)},listen(k){if(c)throw new Error("A history only accepts one active listener");return s.addEventListener(nf,m),c=k,()=>{s.removeEventListener(nf,m),c=null}},createHref(k){return t(s,k)},createURL:x,encodeLocation(k){let y=x(k);return{pathname:y.pathname,search:y.search,hash:y.hash}},push:g,replace:b,go(k){return a.go(k)}};return v}var sf;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(sf||(sf={}));function o1(e,t,n){return n===void 0&&(n="/"),a1(e,t,n,!1)}function a1(e,t,n,r){let s=typeof t=="string"?Cs(t):t,i=Tu(s.pathname||"/",n);if(i==null)return null;let a=xm(e);l1(a);let l=null;for(let c=0;l==null&&c<a.length;++c){let u=v1(i);l=y1(a[c],u,r)}return l}function xm(e,t,n,r){t===void 0&&(t=[]),n===void 0&&(n=[]),r===void 0&&(r="");let s=(i,a,l)=>{let c={relativePath:l===void 0?i.path||"":l,caseSensitive:i.caseSensitive===!0,childrenIndex:a,route:i};c.relativePath.startsWith("/")&&(me(c.relativePath.startsWith(r),'Absolute route path "'+c.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),c.relativePath=c.relativePath.slice(r.length));let u=Vn([r,c.relativePath]),p=n.concat(c);i.children&&i.children.length>0&&(me(i.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+u+'".')),xm(i.children,t,p,u)),!(i.path==null&&!i.index)&&t.push({path:u,score:m1(u,i.index),routesMeta:p})};return e.forEach((i,a)=>{var l;if(i.path===""||!((l=i.path)!=null&&l.includes("?")))s(i,a);else for(let c of vm(i.path))s(i,a,c)}),t}function vm(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,s=n.endsWith("?"),i=n.replace(/\?$/,"");if(r.length===0)return s?[i,""]:[i];let a=vm(r.join("/")),l=[];return l.push(...a.map(c=>c===""?i:[i,c].join("/"))),s&&l.push(...a),l.map(c=>e.startsWith("/")&&c===""?"/":c)}function l1(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:g1(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}const c1=/^:[\w-]+$/,u1=3,d1=2,f1=1,p1=10,h1=-2,of=e=>e==="*";function m1(e,t){let n=e.split("/"),r=n.length;return n.some(of)&&(r+=h1),t&&(r+=d1),n.filter(s=>!of(s)).reduce((s,i)=>s+(c1.test(i)?u1:i===""?f1:p1),r)}function g1(e,t){return e.length===t.length&&e.slice(0,-1).every((r,s)=>r===t[s])?e[e.length-1]-t[t.length-1]:0}function y1(e,t,n){n===void 0&&(n=!1);let{routesMeta:r}=e,s={},i="/",a=[];for(let l=0;l<r.length;++l){let c=r[l],u=l===r.length-1,p=i==="/"?t:t.slice(i.length)||"/",m=af({path:c.relativePath,caseSensitive:c.caseSensitive,end:u},p),g=c.route;if(!m&&u&&n&&!r[r.length-1].route.index&&(m=af({path:c.relativePath,caseSensitive:c.caseSensitive,end:!1},p)),!m)return null;Object.assign(s,m.params),a.push({params:s,pathname:Vn([i,m.pathname]),pathnameBase:k1(Vn([i,m.pathnameBase])),route:g}),m.pathnameBase!=="/"&&(i=Vn([i,m.pathnameBase]))}return a}function af(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=x1(e.path,e.caseSensitive,e.end),s=t.match(n);if(!s)return null;let i=s[0],a=i.replace(/(.)\/+$/,"$1"),l=s.slice(1);return{params:r.reduce((u,p,m)=>{let{paramName:g,isOptional:b}=p;if(g==="*"){let v=l[m]||"";a=i.slice(0,i.length-v.length).replace(/(.)\/+$/,"$1")}const x=l[m];return b&&!x?u[g]=void 0:u[g]=(x||"").replace(/%2F/g,"/"),u},{}),pathname:i,pathnameBase:a,pattern:e}}function x1(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),ym(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let r=[],s="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(a,l,c)=>(r.push({paramName:l,isOptional:c!=null}),c?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(r.push({paramName:"*"}),s+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?s+="\\/*$":e!==""&&e!=="/"&&(s+="(?:(?=\\/|$))"),[new RegExp(s,t?void 0:"i"),r]}function v1(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return ym(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function Tu(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}function b1(e,t){t===void 0&&(t="/");let{pathname:n,search:r="",hash:s=""}=typeof e=="string"?Cs(e):e;return{pathname:n?n.startsWith("/")?n:w1(n,t):t,search:j1(r),hash:C1(s)}}function w1(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(s=>{s===".."?n.length>1&&n.pop():s!=="."&&n.push(s)}),n.length>1?n.join("/"):"/"}function cl(e,t,n,r){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function S1(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function Nu(e,t){let n=S1(e);return t?n.map((r,s)=>s===n.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}function Ru(e,t,n,r){r===void 0&&(r=!1);let s;typeof e=="string"?s=Cs(e):(s=xi({},e),me(!s.pathname||!s.pathname.includes("?"),cl("?","pathname","search",s)),me(!s.pathname||!s.pathname.includes("#"),cl("#","pathname","hash",s)),me(!s.search||!s.search.includes("#"),cl("#","search","hash",s)));let i=e===""||s.pathname==="",a=i?"/":s.pathname,l;if(a==null)l=n;else{let m=t.length-1;if(!r&&a.startsWith("..")){let g=a.split("/");for(;g[0]==="..";)g.shift(),m-=1;s.pathname=g.join("/")}l=m>=0?t[m]:"/"}let c=b1(s,l),u=a&&a!=="/"&&a.endsWith("/"),p=(i||a===".")&&n.endsWith("/");return!c.pathname.endsWith("/")&&(u||p)&&(c.pathname+="/"),c}const Vn=e=>e.join("/").replace(/\/\/+/g,"/"),k1=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),j1=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,C1=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function E1(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const bm=["post","put","patch","delete"];new Set(bm);const _1=["get",...bm];new Set(_1);/**
 * React Router v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function vi(){return vi=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},vi.apply(this,arguments)}const Pu=w.createContext(null),T1=w.createContext(null),Gn=w.createContext(null),Ca=w.createContext(null),hn=w.createContext({outlet:null,matches:[],isDataRoute:!1}),wm=w.createContext(null);function N1(e,t){let{relative:n}=t===void 0?{}:t;Es()||me(!1);let{basename:r,navigator:s}=w.useContext(Gn),{hash:i,pathname:a,search:l}=km(e,{relative:n}),c=a;return r!=="/"&&(c=a==="/"?r:Vn([r,a])),s.createHref({pathname:c,search:l,hash:i})}function Es(){return w.useContext(Ca)!=null}function _s(){return Es()||me(!1),w.useContext(Ca).location}function Sm(e){w.useContext(Gn).static||w.useLayoutEffect(e)}function Pr(){let{isDataRoute:e}=w.useContext(hn);return e?W1():R1()}function R1(){Es()||me(!1);let e=w.useContext(Pu),{basename:t,future:n,navigator:r}=w.useContext(Gn),{matches:s}=w.useContext(hn),{pathname:i}=_s(),a=JSON.stringify(Nu(s,n.v7_relativeSplatPath)),l=w.useRef(!1);return Sm(()=>{l.current=!0}),w.useCallback(function(u,p){if(p===void 0&&(p={}),!l.current)return;if(typeof u=="number"){r.go(u);return}let m=Ru(u,JSON.parse(a),i,p.relative==="path");e==null&&t!=="/"&&(m.pathname=m.pathname==="/"?t:Vn([t,m.pathname])),(p.replace?r.replace:r.push)(m,p.state,p)},[t,r,a,i,e])}function P1(){let{matches:e}=w.useContext(hn),t=e[e.length-1];return t?t.params:{}}function km(e,t){let{relative:n}=t===void 0?{}:t,{future:r}=w.useContext(Gn),{matches:s}=w.useContext(hn),{pathname:i}=_s(),a=JSON.stringify(Nu(s,r.v7_relativeSplatPath));return w.useMemo(()=>Ru(e,JSON.parse(a),i,n==="path"),[e,a,i,n])}function z1(e,t){return L1(e,t)}function L1(e,t,n,r){Es()||me(!1);let{navigator:s}=w.useContext(Gn),{matches:i}=w.useContext(hn),a=i[i.length-1],l=a?a.params:{};a&&a.pathname;let c=a?a.pathnameBase:"/";a&&a.route;let u=_s(),p;if(t){var m;let k=typeof t=="string"?Cs(t):t;c==="/"||(m=k.pathname)!=null&&m.startsWith(c)||me(!1),p=k}else p=u;let g=p.pathname||"/",b=g;if(c!=="/"){let k=c.replace(/^\//,"").split("/");b="/"+g.replace(/^\//,"").split("/").slice(k.length).join("/")}let x=o1(e,{pathname:b}),v=F1(x&&x.map(k=>Object.assign({},k,{params:Object.assign({},l,k.params),pathname:Vn([c,s.encodeLocation?s.encodeLocation(k.pathname).pathname:k.pathname]),pathnameBase:k.pathnameBase==="/"?c:Vn([c,s.encodeLocation?s.encodeLocation(k.pathnameBase).pathname:k.pathnameBase])})),i,n,r);return t&&v?w.createElement(Ca.Provider,{value:{location:vi({pathname:"/",search:"",hash:"",state:null,key:"default"},p),navigationType:An.Pop}},v):v}function O1(){let e=U1(),t=E1(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,s={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"},i=null;return w.createElement(w.Fragment,null,w.createElement("h2",null,"Unexpected Application Error!"),w.createElement("h3",{style:{fontStyle:"italic"}},t),n?w.createElement("pre",{style:s},n):null,i)}const I1=w.createElement(O1,null);class A1 extends w.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,n){return n.location!==t.location||n.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:n.error,location:n.location,revalidation:t.revalidation||n.revalidation}}componentDidCatch(t,n){console.error("React Router caught the following error during render",t,n)}render(){return this.state.error!==void 0?w.createElement(hn.Provider,{value:this.props.routeContext},w.createElement(wm.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function M1(e){let{routeContext:t,match:n,children:r}=e,s=w.useContext(Pu);return s&&s.static&&s.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(s.staticContext._deepestRenderedBoundaryId=n.route.id),w.createElement(hn.Provider,{value:t},r)}function F1(e,t,n,r){var s;if(t===void 0&&(t=[]),n===void 0&&(n=null),r===void 0&&(r=null),e==null){var i;if(!n)return null;if(n.errors)e=n.matches;else if((i=r)!=null&&i.v7_partialHydration&&t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let a=e,l=(s=n)==null?void 0:s.errors;if(l!=null){let p=a.findIndex(m=>m.route.id&&(l==null?void 0:l[m.route.id])!==void 0);p>=0||me(!1),a=a.slice(0,Math.min(a.length,p+1))}let c=!1,u=-1;if(n&&r&&r.v7_partialHydration)for(let p=0;p<a.length;p++){let m=a[p];if((m.route.HydrateFallback||m.route.hydrateFallbackElement)&&(u=p),m.route.id){let{loaderData:g,errors:b}=n,x=m.route.loader&&g[m.route.id]===void 0&&(!b||b[m.route.id]===void 0);if(m.route.lazy||x){c=!0,u>=0?a=a.slice(0,u+1):a=[a[0]];break}}}return a.reduceRight((p,m,g)=>{let b,x=!1,v=null,k=null;n&&(b=l&&m.route.id?l[m.route.id]:void 0,v=m.route.errorElement||I1,c&&(u<0&&g===0?(H1("route-fallback",!1),x=!0,k=null):u===g&&(x=!0,k=m.route.hydrateFallbackElement||null)));let y=t.concat(a.slice(0,g+1)),d=()=>{let h;return b?h=v:x?h=k:m.route.Component?h=w.createElement(m.route.Component,null):m.route.element?h=m.route.element:h=p,w.createElement(M1,{match:m,routeContext:{outlet:p,matches:y,isDataRoute:n!=null},children:h})};return n&&(m.route.ErrorBoundary||m.route.errorElement||g===0)?w.createElement(A1,{location:n.location,revalidation:n.revalidation,component:v,error:b,children:d(),routeContext:{outlet:null,matches:y,isDataRoute:!0}}):d()},null)}var jm=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(jm||{}),ra=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(ra||{});function D1(e){let t=w.useContext(Pu);return t||me(!1),t}function $1(e){let t=w.useContext(T1);return t||me(!1),t}function B1(e){let t=w.useContext(hn);return t||me(!1),t}function Cm(e){let t=B1(),n=t.matches[t.matches.length-1];return n.route.id||me(!1),n.route.id}function U1(){var e;let t=w.useContext(wm),n=$1(ra.UseRouteError),r=Cm(ra.UseRouteError);return t!==void 0?t:(e=n.errors)==null?void 0:e[r]}function W1(){let{router:e}=D1(jm.UseNavigateStable),t=Cm(ra.UseNavigateStable),n=w.useRef(!1);return Sm(()=>{n.current=!0}),w.useCallback(function(s,i){i===void 0&&(i={}),n.current&&(typeof s=="number"?e.navigate(s):e.navigate(s,vi({fromRouteId:t},i)))},[e,t])}const lf={};function H1(e,t,n){!t&&!lf[e]&&(lf[e]=!0)}function V1(e,t){e==null||e.v7_startTransition,(e==null?void 0:e.v7_relativeSplatPath)===void 0&&(!t||t.v7_relativeSplatPath),t&&(t.v7_fetcherPersist,t.v7_normalizeFormMethod,t.v7_partialHydration,t.v7_skipActionErrorRevalidation)}function q1(e){let{to:t,replace:n,state:r,relative:s}=e;Es()||me(!1);let{future:i,static:a}=w.useContext(Gn),{matches:l}=w.useContext(hn),{pathname:c}=_s(),u=Pr(),p=Ru(t,Nu(l,i.v7_relativeSplatPath),c,s==="path"),m=JSON.stringify(p);return w.useEffect(()=>u(JSON.parse(m),{replace:n,state:r,relative:s}),[u,m,s,n,r]),null}function Ge(e){me(!1)}function Q1(e){let{basename:t="/",children:n=null,location:r,navigationType:s=An.Pop,navigator:i,static:a=!1,future:l}=e;Es()&&me(!1);let c=t.replace(/^\/*/,"/"),u=w.useMemo(()=>({basename:c,navigator:i,static:a,future:vi({v7_relativeSplatPath:!1},l)}),[c,l,i,a]);typeof r=="string"&&(r=Cs(r));let{pathname:p="/",search:m="",hash:g="",state:b=null,key:x="default"}=r,v=w.useMemo(()=>{let k=Tu(p,c);return k==null?null:{location:{pathname:k,search:m,hash:g,state:b,key:x},navigationType:s}},[c,p,m,g,b,x,s]);return v==null?null:w.createElement(Gn.Provider,{value:u},w.createElement(Ca.Provider,{children:n,value:v}))}function K1(e){let{children:t,location:n}=e;return z1(oc(t),n)}new Promise(()=>{});function oc(e,t){t===void 0&&(t=[]);let n=[];return w.Children.forEach(e,(r,s)=>{if(!w.isValidElement(r))return;let i=[...t,s];if(r.type===w.Fragment){n.push.apply(n,oc(r.props.children,i));return}r.type!==Ge&&me(!1),!r.props.index||!r.props.children||me(!1);let a={id:r.props.id||i.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(a.children=oc(r.props.children,i)),n.push(a)}),n}/**
 * React Router DOM v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function ac(){return ac=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},ac.apply(this,arguments)}function Y1(e,t){if(e==null)return{};var n={},r=Object.keys(e),s,i;for(i=0;i<r.length;i++)s=r[i],!(t.indexOf(s)>=0)&&(n[s]=e[s]);return n}function J1(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function X1(e,t){return e.button===0&&(!t||t==="_self")&&!J1(e)}function lc(e){return e===void 0&&(e=""),new URLSearchParams(typeof e=="string"||Array.isArray(e)||e instanceof URLSearchParams?e:Object.keys(e).reduce((t,n)=>{let r=e[n];return t.concat(Array.isArray(r)?r.map(s=>[n,s]):[[n,r]])},[]))}function G1(e,t){let n=lc(e);return t&&t.forEach((r,s)=>{n.has(s)||t.getAll(s).forEach(i=>{n.append(s,i)})}),n}const Z1=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],ex="6";try{window.__reactRouterVersion=ex}catch{}const tx="startTransition",cf=V0[tx];function nx(e){let{basename:t,children:n,future:r,window:s}=e,i=w.useRef();i.current==null&&(i.current=r1({window:s,v5Compat:!0}));let a=i.current,[l,c]=w.useState({action:a.action,location:a.location}),{v7_startTransition:u}=r||{},p=w.useCallback(m=>{u&&cf?cf(()=>c(m)):c(m)},[c,u]);return w.useLayoutEffect(()=>a.listen(p),[a,p]),w.useEffect(()=>V1(r),[r]),w.createElement(Q1,{basename:t,children:n,location:l.location,navigationType:l.action,navigator:a,future:r})}const rx=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",sx=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,we=w.forwardRef(function(t,n){let{onClick:r,relative:s,reloadDocument:i,replace:a,state:l,target:c,to:u,preventScrollReset:p,viewTransition:m}=t,g=Y1(t,Z1),{basename:b}=w.useContext(Gn),x,v=!1;if(typeof u=="string"&&sx.test(u)&&(x=u,rx))try{let h=new URL(window.location.href),S=u.startsWith("//")?new URL(h.protocol+u):new URL(u),E=Tu(S.pathname,b);S.origin===h.origin&&E!=null?u=E+S.search+S.hash:v=!0}catch{}let k=N1(u,{relative:s}),y=ix(u,{replace:a,state:l,target:c,preventScrollReset:p,relative:s,viewTransition:m});function d(h){r&&r(h),h.defaultPrevented||y(h)}return w.createElement("a",ac({},g,{href:x||k,onClick:v||i?r:d,ref:n,target:c}))});var uf;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(uf||(uf={}));var df;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(df||(df={}));function ix(e,t){let{target:n,replace:r,state:s,preventScrollReset:i,relative:a,viewTransition:l}=t===void 0?{}:t,c=Pr(),u=_s(),p=km(e,{relative:a});return w.useCallback(m=>{if(X1(m,n)){m.preventDefault();let g=r!==void 0?r:na(u)===na(p);c(e,{replace:g,state:s,preventScrollReset:i,relative:a,viewTransition:l})}},[u,c,p,r,s,n,e,i,a,l])}function ox(e){let t=w.useRef(lc(e)),n=w.useRef(!1),r=_s(),s=w.useMemo(()=>G1(r.search,n.current?null:t.current),[r.search]),i=Pr(),a=w.useCallback((l,c)=>{const u=lc(typeof l=="function"?l(s):l);n.current=!0,i("?"+u,c)},[i,s]);return[s,a]}const Em=w.createContext(void 0),ax=({children:e})=>{const[t,n]=w.useState(()=>localStorage.getItem("token")),[r,s]=w.useState(()=>{const l=localStorage.getItem("user");return l?JSON.parse(l):null});te.useEffect(()=>{if(t)try{const l=JSON.parse(atob(t.split(".")[1]));if(l.exp){const c=l.exp*1e3,u=Date.now();if(c<u)a();else{const p=setTimeout(()=>a(),c-u);return()=>clearTimeout(p)}}}catch{a()}},[t,a]);const i=w.useCallback((l,c)=>{n(l),s(c),localStorage.setItem("token",l),localStorage.setItem("user",JSON.stringify(c))},[]),a=w.useCallback(()=>{n(null),s(null),localStorage.removeItem("token"),localStorage.removeItem("user")},[]);return o.jsx(Em.Provider,{value:{token:t,user:r,login:i,logout:a},children:e})},ht=()=>{const e=w.useContext(Em);if(!e)throw new Error("useAuth must be used within AuthProvider");return e},_m=w.createContext(void 0),lx=({children:e})=>{const[t,n]=w.useState([]);w.useEffect(()=>{const i=new WebSocket("ws://localhost:3005/ws");return i.onmessage=a=>{const l=JSON.parse(a.data);n(c=>[...c,{id:Date.now().toString(),message:l.message,type:l.type||"info"}])},()=>i.close()},[]);const r=(i,a="info")=>{n(l=>[...l,{id:Date.now().toString(),message:i,type:a}])},s=i=>{n(a=>a.filter(l=>l.id!==i))};return o.jsx(_m.Provider,{value:{notifications:t,addNotification:r,removeNotification:s},children:e})},cx=()=>{const e=w.useContext(_m);if(!e)throw new Error("useNotifications must be used within NotificationProvider");return e},ux=()=>{const{notifications:e,removeNotification:t}=cx();return o.jsxs(o.Fragment,{children:[o.jsx("style",{children:`
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
      `}),o.jsx("div",{className:"notif-list",children:e.map(n=>o.jsxs("div",{className:"notif-item","data-type":n.type||"info",children:[o.jsx("span",{children:n.message}),o.jsx("button",{className:"notif-dismiss",onClick:()=>t(n.id),children:"Dismiss"})]},n.id))})]})},dx=()=>{const{token:e}=ht(),[t,n]=w.useState(!1),[r,s]=w.useState([]),[i,a]=w.useState(0),[l,c]=w.useState(!1),u=w.useRef(null);w.useEffect(()=>{const x=v=>{u.current&&!u.current.contains(v.target)&&n(!1)};return document.addEventListener("mousedown",x),()=>document.removeEventListener("mousedown",x)},[]);const p=w.useCallback(async()=>{if(e)try{const x=await fetch("http://localhost:3003/api/matching/team-requests/received",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(x.ok){const v=await x.json();if(v.success&&v.data&&v.data.requests){const k=v.data.requests;a(k.length),s(k.slice(0,5))}else a(0),s([])}}catch(x){console.error("Error fetching team requests:",x),a(0),s([])}},[e]);w.useEffect(()=>{p();const x=setInterval(p,3e4);return()=>clearInterval(x)},[p]);const m=w.useCallback(async x=>{if(e){c(!0);try{(await fetch(`http://localhost:3003/api/matching/team-requests/${x}`,{method:"PUT",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({status:"accepted"})})).ok&&await p()}catch(v){console.error("Error accepting request:",v)}finally{c(!1)}}},[e,p]),g=w.useCallback(async x=>{if(e){c(!0);try{(await fetch(`http://localhost:3003/api/matching/team-requests/${x}`,{method:"PUT",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({status:"rejected"})})).ok&&await p()}catch(v){console.error("Error rejecting request:",v)}finally{c(!1)}}},[e,p]),b=w.useCallback(x=>{const v=new Date(x),y=(new Date().getTime()-v.getTime())/(1e3*60*60);return y<1?"Just now":y<24?`${Math.floor(y)}h ago`:`${Math.floor(y/24)}d ago`},[]);return e?o.jsxs(o.Fragment,{children:[o.jsx("style",{children:`
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
      `}),o.jsxs("div",{className:"notification-bell",ref:u,children:[o.jsxs("div",{onClick:()=>n(!t),children:[o.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"#1976d2",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[o.jsx("path",{d:"M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"}),o.jsx("path",{d:"M13.73 21a2 2 0 0 1-3.46 0"})]}),i>0&&o.jsx("span",{className:"notification-badge",children:i>9?"9+":i})]}),t&&o.jsxs("div",{className:"notification-dropdown",children:[o.jsxs("div",{className:"notification-header",children:["Team Requests (",i,")"]}),o.jsx("div",{className:"notification-list",children:!r||r.length===0?o.jsx("div",{className:"empty-state",children:o.jsx("p",{children:"No pending team requests"})}):r.map(x=>o.jsxs("div",{className:"notification-item",children:[o.jsxs("div",{className:"sender-info",children:[o.jsx("span",{className:"sender-name",children:x.sender_name}),x.sender_company&&o.jsxs("span",{className:"sender-company",children:["• ",x.sender_company]}),o.jsx("span",{className:"request-time",children:b(x.created_at)})]}),x.message&&o.jsxs("div",{className:"request-message",children:['"',x.message,'"']}),x.match_context&&o.jsx("div",{className:"request-message",children:o.jsxs("small",{children:[x.match_context.skill&&`Skill: ${x.match_context.skill}`,x.match_context.distance&&` • ${x.match_context.distance}km away`]})}),o.jsxs("div",{className:"request-actions",children:[o.jsx("button",{className:"btn-accept",onClick:()=>m(x.id),disabled:l,children:"Accept"}),o.jsx("button",{className:"btn-reject",onClick:()=>g(x.id),disabled:l,children:"Reject"})]})]},x.id))}),i>5&&o.jsx("div",{className:"view-all",children:o.jsx("a",{href:"/dashboard",onClick:()=>n(!1),children:"View all requests"})})]})]})]}):null},fx=()=>{const{token:e,logout:t}=ht(),[n,r]=w.useState(!1),s=()=>{r(!n)};return o.jsxs(o.Fragment,{children:[o.jsx("style",{children:`
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
      `}),o.jsxs("nav",{className:"navbar",children:[o.jsx("div",{className:"navbar-brand",children:o.jsx(we,{to:"/","aria-label":"Home",children:o.jsxs("svg",{width:"28",height:"28",viewBox:"0 0 24 24",fill:"none",stroke:"#1976d2",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[o.jsx("path",{d:"M3 9.5L12 3l9 6.5V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.5z"}),o.jsx("path",{d:"M9 22V12h6v10"})]})})}),o.jsx("button",{className:"mobile-menu-toggle",onClick:s,"aria-label":"Toggle mobile menu",children:o.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[o.jsx("line",{x1:"3",y1:"6",x2:"21",y2:"6"}),o.jsx("line",{x1:"3",y1:"12",x2:"21",y2:"12"}),o.jsx("line",{x1:"3",y1:"18",x2:"21",y2:"18"})]})}),e?o.jsxs("div",{className:"navbar-menu authenticated",children:[o.jsxs("div",{className:"navbar-links",children:[o.jsx(we,{to:"/dashboard",children:"Dashboard"}),o.jsx(we,{to:"/search",children:"Search"}),o.jsx(we,{to:"/saved",children:"My Team"}),o.jsx(we,{to:"/status",children:"Status"}),o.jsx(we,{to:"/profile",children:"Profile"})]}),o.jsxs("div",{className:"navbar-actions",children:[o.jsx(dx,{}),o.jsx("button",{onClick:t,children:"Logout"})]})]}):o.jsx("div",{className:"navbar-menu unauthenticated",children:o.jsxs("div",{className:"navbar-links",children:[o.jsx(we,{to:"/login",children:"Login"}),o.jsx(we,{to:"/register",children:"Register"})]})}),o.jsx("div",{className:`mobile-menu ${n?"open":""}`,children:e?o.jsxs(o.Fragment,{children:[o.jsx(we,{to:"/dashboard",onClick:()=>r(!1),children:"Dashboard"}),o.jsx(we,{to:"/search",onClick:()=>r(!1),children:"Search"}),o.jsx(we,{to:"/saved",onClick:()=>r(!1),children:"My Team"}),o.jsx(we,{to:"/status",onClick:()=>r(!1),children:"Status"}),o.jsx(we,{to:"/profile",onClick:()=>r(!1),children:"Profile"}),o.jsx("button",{onClick:()=>{t(),r(!1)},children:"Logout"})]}):o.jsxs(o.Fragment,{children:[o.jsx(we,{to:"/login",onClick:()=>r(!1),children:"Login"}),o.jsx(we,{to:"/register",onClick:()=>r(!1),children:"Register"})]})})]})]})},px=!1,hx=!0,At={AUTH_SERVICE:"https://simple-auth-service-production.up.railway.app",USER_SERVICE:"https://user-service-production.up.railway.app",MATCHING_SERVICE:"https://matching-service-production.up.railway.app",COMMUNICATION_SERVICE:"https://communication-service-production.up.railway.app",NOTIFICATION_SERVICE:"https://notification-service-production.up.railway.app"},mx=!1,xr=async(e,t={})=>fetch(e,t);console.log("API Config:",{isDevelopment:px,isProduction:hx,API_CONFIG:At,DEMO_MODE:mx});const gx=()=>{const{login:e,token:t}=ht(),n=Pr();w.useEffect(()=>{t&&n("/dashboard")},[t,n]),w.useEffect(()=>{t&&n("/dashboard")},[]);const[r,s]=w.useState(""),[i,a]=w.useState(""),[l,c]=w.useState(!1),[u,p]=w.useState(""),[m,g]=w.useState(!1),[b,x]=w.useState(!1),v=async k=>{k.preventDefault(),p(""),x(!0);const y={email:r,password:i};try{const d=await xr(`${At.AUTH_SERVICE}/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(y)}),h=await d.json();if(d.ok&&h.accessToken)try{e(h.accessToken,h.user),g(!0)}catch{p("There was a problem saving your login. Please try again."),x(!1);return}else h.error&&typeof h.error=="string"&&h.error.toLowerCase().includes("invalid")?p("Invalid username or password. Please try again."):h.error&&typeof h.error=="object"&&h.error.message?p(h.error.message):h.error?p(typeof h.error=="string"?h.error:"Login failed. Please try again."):p("Login failed. Please try again.")}catch{p("Network error")}finally{x(!1)}};return o.jsxs(o.Fragment,{children:[o.jsx("style",{children:`
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
      `}),o.jsx("div",{className:"login-bg",children:o.jsxs("form",{className:"login-form",onSubmit:v,"aria-label":"Login form",tabIndex:0,children:[o.jsx("h2",{id:"login-title",children:"Login"}),m&&o.jsxs("div",{className:"success-bar",role:"status","aria-live":"polite",children:["Login successful!",o.jsx("button",{className:"close-btn",onClick:()=>g(!1),"aria-label":"Close success message",children:"×"})]}),o.jsx("label",{htmlFor:"login-username",style:{display:"none"},children:"Username"}),o.jsx("input",{id:"login-username",type:"text",placeholder:"Username (email or mobile)",value:r,onChange:k=>s(k.target.value),required:!0,"aria-label":"Username",autoComplete:"username"}),o.jsx("label",{htmlFor:"login-password",style:{display:"none"},children:"Password"}),o.jsx("input",{id:"login-password",type:"password",placeholder:"Password",value:i,onChange:k=>a(k.target.value),required:!0,"aria-label":"Password",autoComplete:"current-password"}),o.jsxs("div",{className:"login-options-row",children:[o.jsxs("label",{className:"remember-me",children:[o.jsx("input",{type:"checkbox",checked:l,onChange:k=>c(k.target.checked)}),"Remember me"]}),o.jsx("a",{href:"/forgot-password",className:"forgot-password-link",children:"Forgot password?"})]}),o.jsx("button",{type:"submit",disabled:b,"aria-busy":b,"aria-label":"Login",children:b?"Logging in...":"Login"}),u&&o.jsx("div",{className:"error",role:"alert",children:u})]})}),o.jsx("style",{children:`
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
      `})]})};function Tm(e){var t,n,r="";if(typeof e=="string"||typeof e=="number")r+=e;else if(typeof e=="object")if(Array.isArray(e)){var s=e.length;for(t=0;t<s;t++)e[t]&&(n=Tm(e[t]))&&(r&&(r+=" "),r+=n)}else for(n in e)e[n]&&(r&&(r+=" "),r+=n);return r}function vr(){for(var e,t,n=0,r="",s=arguments.length;n<s;n++)(e=arguments[n])&&(t=Tm(e))&&(r&&(r+=" "),r+=t);return r}function yx(e){if(!e||typeof document>"u")return;let t=document.head||document.getElementsByTagName("head")[0],n=document.createElement("style");n.type="text/css",t.firstChild?t.insertBefore(n,t.firstChild):t.appendChild(n),n.styleSheet?n.styleSheet.cssText=e:n.appendChild(document.createTextNode(e))}yx(`:root{--toastify-color-light: #fff;--toastify-color-dark: #121212;--toastify-color-info: #3498db;--toastify-color-success: #07bc0c;--toastify-color-warning: #f1c40f;--toastify-color-error: hsl(6, 78%, 57%);--toastify-color-transparent: rgba(255, 255, 255, .7);--toastify-icon-color-info: var(--toastify-color-info);--toastify-icon-color-success: var(--toastify-color-success);--toastify-icon-color-warning: var(--toastify-color-warning);--toastify-icon-color-error: var(--toastify-color-error);--toastify-container-width: fit-content;--toastify-toast-width: 320px;--toastify-toast-offset: 16px;--toastify-toast-top: max(var(--toastify-toast-offset), env(safe-area-inset-top));--toastify-toast-right: max(var(--toastify-toast-offset), env(safe-area-inset-right));--toastify-toast-left: max(var(--toastify-toast-offset), env(safe-area-inset-left));--toastify-toast-bottom: max(var(--toastify-toast-offset), env(safe-area-inset-bottom));--toastify-toast-background: #fff;--toastify-toast-padding: 14px;--toastify-toast-min-height: 64px;--toastify-toast-max-height: 800px;--toastify-toast-bd-radius: 6px;--toastify-toast-shadow: 0px 4px 12px rgba(0, 0, 0, .1);--toastify-font-family: sans-serif;--toastify-z-index: 9999;--toastify-text-color-light: #757575;--toastify-text-color-dark: #fff;--toastify-text-color-info: #fff;--toastify-text-color-success: #fff;--toastify-text-color-warning: #fff;--toastify-text-color-error: #fff;--toastify-spinner-color: #616161;--toastify-spinner-color-empty-area: #e0e0e0;--toastify-color-progress-light: linear-gradient(to right, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55);--toastify-color-progress-dark: #bb86fc;--toastify-color-progress-info: var(--toastify-color-info);--toastify-color-progress-success: var(--toastify-color-success);--toastify-color-progress-warning: var(--toastify-color-warning);--toastify-color-progress-error: var(--toastify-color-error);--toastify-color-progress-bgo: .2}.Toastify__toast-container{z-index:var(--toastify-z-index);-webkit-transform:translate3d(0,0,var(--toastify-z-index));position:fixed;width:var(--toastify-container-width);box-sizing:border-box;color:#fff;display:flex;flex-direction:column}.Toastify__toast-container--top-left{top:var(--toastify-toast-top);left:var(--toastify-toast-left)}.Toastify__toast-container--top-center{top:var(--toastify-toast-top);left:50%;transform:translate(-50%);align-items:center}.Toastify__toast-container--top-right{top:var(--toastify-toast-top);right:var(--toastify-toast-right);align-items:end}.Toastify__toast-container--bottom-left{bottom:var(--toastify-toast-bottom);left:var(--toastify-toast-left)}.Toastify__toast-container--bottom-center{bottom:var(--toastify-toast-bottom);left:50%;transform:translate(-50%);align-items:center}.Toastify__toast-container--bottom-right{bottom:var(--toastify-toast-bottom);right:var(--toastify-toast-right);align-items:end}.Toastify__toast{--y: 0;position:relative;touch-action:none;width:var(--toastify-toast-width);min-height:var(--toastify-toast-min-height);box-sizing:border-box;margin-bottom:1rem;padding:var(--toastify-toast-padding);border-radius:var(--toastify-toast-bd-radius);box-shadow:var(--toastify-toast-shadow);max-height:var(--toastify-toast-max-height);font-family:var(--toastify-font-family);z-index:0;display:flex;flex:1 auto;align-items:center;word-break:break-word}@media only screen and (max-width: 480px){.Toastify__toast-container{width:100vw;left:env(safe-area-inset-left);margin:0}.Toastify__toast-container--top-left,.Toastify__toast-container--top-center,.Toastify__toast-container--top-right{top:env(safe-area-inset-top);transform:translate(0)}.Toastify__toast-container--bottom-left,.Toastify__toast-container--bottom-center,.Toastify__toast-container--bottom-right{bottom:env(safe-area-inset-bottom);transform:translate(0)}.Toastify__toast-container--rtl{right:env(safe-area-inset-right);left:initial}.Toastify__toast{--toastify-toast-width: 100%;margin-bottom:0;border-radius:0}}.Toastify__toast-container[data-stacked=true]{width:var(--toastify-toast-width)}.Toastify__toast--stacked{position:absolute;width:100%;transform:translate3d(0,var(--y),0) scale(var(--s));transition:transform .3s}.Toastify__toast--stacked[data-collapsed] .Toastify__toast-body,.Toastify__toast--stacked[data-collapsed] .Toastify__close-button{transition:opacity .1s}.Toastify__toast--stacked[data-collapsed=false]{overflow:visible}.Toastify__toast--stacked[data-collapsed=true]:not(:last-child)>*{opacity:0}.Toastify__toast--stacked:after{content:"";position:absolute;left:0;right:0;height:calc(var(--g) * 1px);bottom:100%}.Toastify__toast--stacked[data-pos=top]{top:0}.Toastify__toast--stacked[data-pos=bot]{bottom:0}.Toastify__toast--stacked[data-pos=bot].Toastify__toast--stacked:before{transform-origin:top}.Toastify__toast--stacked[data-pos=top].Toastify__toast--stacked:before{transform-origin:bottom}.Toastify__toast--stacked:before{content:"";position:absolute;left:0;right:0;bottom:0;height:100%;transform:scaleY(3);z-index:-1}.Toastify__toast--rtl{direction:rtl}.Toastify__toast--close-on-click{cursor:pointer}.Toastify__toast-icon{margin-inline-end:10px;width:22px;flex-shrink:0;display:flex}.Toastify--animate{animation-fill-mode:both;animation-duration:.5s}.Toastify--animate-icon{animation-fill-mode:both;animation-duration:.3s}.Toastify__toast-theme--dark{background:var(--toastify-color-dark);color:var(--toastify-text-color-dark)}.Toastify__toast-theme--light,.Toastify__toast-theme--colored.Toastify__toast--default{background:var(--toastify-color-light);color:var(--toastify-text-color-light)}.Toastify__toast-theme--colored.Toastify__toast--info{color:var(--toastify-text-color-info);background:var(--toastify-color-info)}.Toastify__toast-theme--colored.Toastify__toast--success{color:var(--toastify-text-color-success);background:var(--toastify-color-success)}.Toastify__toast-theme--colored.Toastify__toast--warning{color:var(--toastify-text-color-warning);background:var(--toastify-color-warning)}.Toastify__toast-theme--colored.Toastify__toast--error{color:var(--toastify-text-color-error);background:var(--toastify-color-error)}.Toastify__progress-bar-theme--light{background:var(--toastify-color-progress-light)}.Toastify__progress-bar-theme--dark{background:var(--toastify-color-progress-dark)}.Toastify__progress-bar--info{background:var(--toastify-color-progress-info)}.Toastify__progress-bar--success{background:var(--toastify-color-progress-success)}.Toastify__progress-bar--warning{background:var(--toastify-color-progress-warning)}.Toastify__progress-bar--error{background:var(--toastify-color-progress-error)}.Toastify__progress-bar-theme--colored.Toastify__progress-bar--info,.Toastify__progress-bar-theme--colored.Toastify__progress-bar--success,.Toastify__progress-bar-theme--colored.Toastify__progress-bar--warning,.Toastify__progress-bar-theme--colored.Toastify__progress-bar--error{background:var(--toastify-color-transparent)}.Toastify__close-button{color:#fff;position:absolute;top:6px;right:6px;background:transparent;outline:none;border:none;padding:0;cursor:pointer;opacity:.7;transition:.3s ease;z-index:1}.Toastify__toast--rtl .Toastify__close-button{left:6px;right:unset}.Toastify__close-button--light{color:#000;opacity:.3}.Toastify__close-button>svg{fill:currentColor;height:16px;width:14px}.Toastify__close-button:hover,.Toastify__close-button:focus{opacity:1}@keyframes Toastify__trackProgress{0%{transform:scaleX(1)}to{transform:scaleX(0)}}.Toastify__progress-bar{position:absolute;bottom:0;left:0;width:100%;height:100%;z-index:1;opacity:.7;transform-origin:left}.Toastify__progress-bar--animated{animation:Toastify__trackProgress linear 1 forwards}.Toastify__progress-bar--controlled{transition:transform .2s}.Toastify__progress-bar--rtl{right:0;left:initial;transform-origin:right;border-bottom-left-radius:initial}.Toastify__progress-bar--wrp{position:absolute;overflow:hidden;bottom:0;left:0;width:100%;height:5px;border-bottom-left-radius:var(--toastify-toast-bd-radius);border-bottom-right-radius:var(--toastify-toast-bd-radius)}.Toastify__progress-bar--wrp[data-hidden=true]{opacity:0}.Toastify__progress-bar--bg{opacity:var(--toastify-color-progress-bgo);width:100%;height:100%}.Toastify__spinner{width:20px;height:20px;box-sizing:border-box;border:2px solid;border-radius:100%;border-color:var(--toastify-spinner-color-empty-area);border-right-color:var(--toastify-spinner-color);animation:Toastify__spin .65s linear infinite}@keyframes Toastify__bounceInRight{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(3000px,0,0)}60%{opacity:1;transform:translate3d(-25px,0,0)}75%{transform:translate3d(10px,0,0)}90%{transform:translate3d(-5px,0,0)}to{transform:none}}@keyframes Toastify__bounceOutRight{20%{opacity:1;transform:translate3d(-20px,var(--y),0)}to{opacity:0;transform:translate3d(2000px,var(--y),0)}}@keyframes Toastify__bounceInLeft{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(-3000px,0,0)}60%{opacity:1;transform:translate3d(25px,0,0)}75%{transform:translate3d(-10px,0,0)}90%{transform:translate3d(5px,0,0)}to{transform:none}}@keyframes Toastify__bounceOutLeft{20%{opacity:1;transform:translate3d(20px,var(--y),0)}to{opacity:0;transform:translate3d(-2000px,var(--y),0)}}@keyframes Toastify__bounceInUp{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(0,3000px,0)}60%{opacity:1;transform:translate3d(0,-20px,0)}75%{transform:translate3d(0,10px,0)}90%{transform:translate3d(0,-5px,0)}to{transform:translateZ(0)}}@keyframes Toastify__bounceOutUp{20%{transform:translate3d(0,calc(var(--y) - 10px),0)}40%,45%{opacity:1;transform:translate3d(0,calc(var(--y) + 20px),0)}to{opacity:0;transform:translate3d(0,-2000px,0)}}@keyframes Toastify__bounceInDown{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(0,-3000px,0)}60%{opacity:1;transform:translate3d(0,25px,0)}75%{transform:translate3d(0,-10px,0)}90%{transform:translate3d(0,5px,0)}to{transform:none}}@keyframes Toastify__bounceOutDown{20%{transform:translate3d(0,calc(var(--y) - 10px),0)}40%,45%{opacity:1;transform:translate3d(0,calc(var(--y) + 20px),0)}to{opacity:0;transform:translate3d(0,2000px,0)}}.Toastify__bounce-enter--top-left,.Toastify__bounce-enter--bottom-left{animation-name:Toastify__bounceInLeft}.Toastify__bounce-enter--top-right,.Toastify__bounce-enter--bottom-right{animation-name:Toastify__bounceInRight}.Toastify__bounce-enter--top-center{animation-name:Toastify__bounceInDown}.Toastify__bounce-enter--bottom-center{animation-name:Toastify__bounceInUp}.Toastify__bounce-exit--top-left,.Toastify__bounce-exit--bottom-left{animation-name:Toastify__bounceOutLeft}.Toastify__bounce-exit--top-right,.Toastify__bounce-exit--bottom-right{animation-name:Toastify__bounceOutRight}.Toastify__bounce-exit--top-center{animation-name:Toastify__bounceOutUp}.Toastify__bounce-exit--bottom-center{animation-name:Toastify__bounceOutDown}@keyframes Toastify__zoomIn{0%{opacity:0;transform:scale3d(.3,.3,.3)}50%{opacity:1}}@keyframes Toastify__zoomOut{0%{opacity:1}50%{opacity:0;transform:translate3d(0,var(--y),0) scale3d(.3,.3,.3)}to{opacity:0}}.Toastify__zoom-enter{animation-name:Toastify__zoomIn}.Toastify__zoom-exit{animation-name:Toastify__zoomOut}@keyframes Toastify__flipIn{0%{transform:perspective(400px) rotateX(90deg);animation-timing-function:ease-in;opacity:0}40%{transform:perspective(400px) rotateX(-20deg);animation-timing-function:ease-in}60%{transform:perspective(400px) rotateX(10deg);opacity:1}80%{transform:perspective(400px) rotateX(-5deg)}to{transform:perspective(400px)}}@keyframes Toastify__flipOut{0%{transform:translate3d(0,var(--y),0) perspective(400px)}30%{transform:translate3d(0,var(--y),0) perspective(400px) rotateX(-20deg);opacity:1}to{transform:translate3d(0,var(--y),0) perspective(400px) rotateX(90deg);opacity:0}}.Toastify__flip-enter{animation-name:Toastify__flipIn}.Toastify__flip-exit{animation-name:Toastify__flipOut}@keyframes Toastify__slideInRight{0%{transform:translate3d(110%,0,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideInLeft{0%{transform:translate3d(-110%,0,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideInUp{0%{transform:translate3d(0,110%,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideInDown{0%{transform:translate3d(0,-110%,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideOutRight{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(110%,var(--y),0)}}@keyframes Toastify__slideOutLeft{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(-110%,var(--y),0)}}@keyframes Toastify__slideOutDown{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(0,500px,0)}}@keyframes Toastify__slideOutUp{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(0,-500px,0)}}.Toastify__slide-enter--top-left,.Toastify__slide-enter--bottom-left{animation-name:Toastify__slideInLeft}.Toastify__slide-enter--top-right,.Toastify__slide-enter--bottom-right{animation-name:Toastify__slideInRight}.Toastify__slide-enter--top-center{animation-name:Toastify__slideInDown}.Toastify__slide-enter--bottom-center{animation-name:Toastify__slideInUp}.Toastify__slide-exit--top-left,.Toastify__slide-exit--bottom-left{animation-name:Toastify__slideOutLeft;animation-timing-function:ease-in;animation-duration:.3s}.Toastify__slide-exit--top-right,.Toastify__slide-exit--bottom-right{animation-name:Toastify__slideOutRight;animation-timing-function:ease-in;animation-duration:.3s}.Toastify__slide-exit--top-center{animation-name:Toastify__slideOutUp;animation-timing-function:ease-in;animation-duration:.3s}.Toastify__slide-exit--bottom-center{animation-name:Toastify__slideOutDown;animation-timing-function:ease-in;animation-duration:.3s}@keyframes Toastify__spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}
`);var Bi=e=>typeof e=="number"&&!isNaN(e),Cr=e=>typeof e=="string",fn=e=>typeof e=="function",xx=e=>Cr(e)||Bi(e),cc=e=>Cr(e)||fn(e)?e:null,vx=(e,t)=>e===!1||Bi(e)&&e>0?e:t,uc=e=>w.isValidElement(e)||Cr(e)||fn(e)||Bi(e);function bx(e,t,n=300){let{scrollHeight:r,style:s}=e;requestAnimationFrame(()=>{s.minHeight="initial",s.height=r+"px",s.transition=`all ${n}ms`,requestAnimationFrame(()=>{s.height="0",s.padding="0",s.margin="0",setTimeout(t,n)})})}function wx({enter:e,exit:t,appendPosition:n=!1,collapse:r=!0,collapseDuration:s=300}){return function({children:i,position:a,preventExitTransition:l,done:c,nodeRef:u,isIn:p,playToast:m}){let g=n?`${e}--${a}`:e,b=n?`${t}--${a}`:t,x=w.useRef(0);return w.useLayoutEffect(()=>{let v=u.current,k=g.split(" "),y=d=>{d.target===u.current&&(m(),v.removeEventListener("animationend",y),v.removeEventListener("animationcancel",y),x.current===0&&d.type!=="animationcancel"&&v.classList.remove(...k))};v.classList.add(...k),v.addEventListener("animationend",y),v.addEventListener("animationcancel",y)},[]),w.useEffect(()=>{let v=u.current,k=()=>{v.removeEventListener("animationend",k),r?bx(v,c,s):c()};p||(l?k():(x.current=1,v.className+=` ${b}`,v.addEventListener("animationend",k)))},[p]),te.createElement(te.Fragment,null,i)}}function ff(e,t){return{content:Nm(e.content,e.props),containerId:e.props.containerId,id:e.props.toastId,theme:e.props.theme,type:e.props.type,data:e.props.data||{},isLoading:e.props.isLoading,icon:e.props.icon,reason:e.removalReason,status:t}}function Nm(e,t,n=!1){return w.isValidElement(e)&&!Cr(e.type)?w.cloneElement(e,{closeToast:t.closeToast,toastProps:t,data:t.data,isPaused:n}):fn(e)?e({closeToast:t.closeToast,toastProps:t,data:t.data,isPaused:n}):e}function Sx({closeToast:e,theme:t,ariaLabel:n="close"}){return te.createElement("button",{className:`Toastify__close-button Toastify__close-button--${t}`,type:"button",onClick:r=>{r.stopPropagation(),e(!0)},"aria-label":n},te.createElement("svg",{"aria-hidden":"true",viewBox:"0 0 14 16"},te.createElement("path",{fillRule:"evenodd",d:"M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"})))}function kx({delay:e,isRunning:t,closeToast:n,type:r="default",hide:s,className:i,controlledProgress:a,progress:l,rtl:c,isIn:u,theme:p}){let m=s||a&&l===0,g={animationDuration:`${e}ms`,animationPlayState:t?"running":"paused"};a&&(g.transform=`scaleX(${l})`);let b=vr("Toastify__progress-bar",a?"Toastify__progress-bar--controlled":"Toastify__progress-bar--animated",`Toastify__progress-bar-theme--${p}`,`Toastify__progress-bar--${r}`,{"Toastify__progress-bar--rtl":c}),x=fn(i)?i({rtl:c,type:r,defaultClassName:b}):vr(b,i),v={[a&&l>=1?"onTransitionEnd":"onAnimationEnd"]:a&&l<1?null:()=>{u&&n()}};return te.createElement("div",{className:"Toastify__progress-bar--wrp","data-hidden":m},te.createElement("div",{className:`Toastify__progress-bar--bg Toastify__progress-bar-theme--${p} Toastify__progress-bar--${r}`}),te.createElement("div",{role:"progressbar","aria-hidden":m?"true":"false","aria-label":"notification timer",className:x,style:g,...v}))}var jx=1,Rm=()=>`${jx++}`;function Cx(e,t,n){let r=1,s=0,i=[],a=[],l=t,c=new Map,u=new Set,p=d=>(u.add(d),()=>u.delete(d)),m=()=>{a=Array.from(c.values()),u.forEach(d=>d())},g=({containerId:d,toastId:h,updateId:S})=>{let E=d?d!==e:e!==1,R=c.has(h)&&S==null;return E||R},b=(d,h)=>{c.forEach(S=>{var E;(h==null||h===S.props.toastId)&&((E=S.toggle)==null||E.call(S,d))})},x=d=>{var h,S;(S=(h=d.props)==null?void 0:h.onClose)==null||S.call(h,d.removalReason),d.isActive=!1},v=d=>{if(d==null)c.forEach(x);else{let h=c.get(d);h&&x(h)}m()},k=()=>{s-=i.length,i=[]},y=d=>{var h,S;let{toastId:E,updateId:R}=d.props,_=R==null;d.staleId&&c.delete(d.staleId),d.isActive=!0,c.set(E,d),m(),n(ff(d,_?"added":"updated")),_&&((S=(h=d.props).onOpen)==null||S.call(h))};return{id:e,props:l,observe:p,toggle:b,removeToast:v,toasts:c,clearQueue:k,buildToast:(d,h)=>{if(g(h))return;let{toastId:S,updateId:E,data:R,staleId:_,delay:N}=h,C=E==null;C&&s++;let P={...l,style:l.toastStyle,key:r++,...Object.fromEntries(Object.entries(h).filter(([J,ee])=>ee!=null)),toastId:S,updateId:E,data:R,isIn:!1,className:cc(h.className||l.toastClassName),progressClassName:cc(h.progressClassName||l.progressClassName),autoClose:h.isLoading?!1:vx(h.autoClose,l.autoClose),closeToast(J){c.get(S).removalReason=J,v(S)},deleteToast(){let J=c.get(S);if(J!=null){if(n(ff(J,"removed")),c.delete(S),s--,s<0&&(s=0),i.length>0){y(i.shift());return}m()}}};P.closeButton=l.closeButton,h.closeButton===!1||uc(h.closeButton)?P.closeButton=h.closeButton:h.closeButton===!0&&(P.closeButton=uc(l.closeButton)?l.closeButton:!0);let U={content:d,props:P,staleId:_};l.limit&&l.limit>0&&s>l.limit&&C?i.push(U):Bi(N)?setTimeout(()=>{y(U)},N):y(U)},setProps(d){l=d},setToggle:(d,h)=>{let S=c.get(d);S&&(S.toggle=h)},isToastActive:d=>{var h;return(h=c.get(d))==null?void 0:h.isActive},getSnapshot:()=>a}}var Qe=new Map,bi=[],dc=new Set,Ex=e=>dc.forEach(t=>t(e)),Pm=()=>Qe.size>0;function _x(){bi.forEach(e=>Lm(e.content,e.options)),bi=[]}var Tx=(e,{containerId:t})=>{var n;return(n=Qe.get(t||1))==null?void 0:n.toasts.get(e)};function zm(e,t){var n;if(t)return!!((n=Qe.get(t))!=null&&n.isToastActive(e));let r=!1;return Qe.forEach(s=>{s.isToastActive(e)&&(r=!0)}),r}function Nx(e){if(!Pm()){bi=bi.filter(t=>e!=null&&t.options.toastId!==e);return}if(e==null||xx(e))Qe.forEach(t=>{t.removeToast(e)});else if(e&&("containerId"in e||"id"in e)){let t=Qe.get(e.containerId);t?t.removeToast(e.id):Qe.forEach(n=>{n.removeToast(e.id)})}}var Rx=(e={})=>{Qe.forEach(t=>{t.props.limit&&(!e.containerId||t.id===e.containerId)&&t.clearQueue()})};function Lm(e,t){uc(e)&&(Pm()||bi.push({content:e,options:t}),Qe.forEach(n=>{n.buildToast(e,t)}))}function Px(e){var t;(t=Qe.get(e.containerId||1))==null||t.setToggle(e.id,e.fn)}function Om(e,t){Qe.forEach(n=>{(t==null||!(t!=null&&t.containerId)||(t==null?void 0:t.containerId)===n.id)&&n.toggle(e,t==null?void 0:t.id)})}function zx(e){let t=e.containerId||1;return{subscribe(n){let r=Cx(t,e,Ex);Qe.set(t,r);let s=r.observe(n);return _x(),()=>{s(),Qe.delete(t)}},setProps(n){var r;(r=Qe.get(t))==null||r.setProps(n)},getSnapshot(){var n;return(n=Qe.get(t))==null?void 0:n.getSnapshot()}}}function Lx(e){return dc.add(e),()=>{dc.delete(e)}}function Ox(e){return e&&(Cr(e.toastId)||Bi(e.toastId))?e.toastId:Rm()}function Ui(e,t){return Lm(e,t),t.toastId}function Ea(e,t){return{...t,type:t&&t.type||e,toastId:Ox(t)}}function _a(e){return(t,n)=>Ui(t,Ea(e,n))}function $(e,t){return Ui(e,Ea("default",t))}$.loading=(e,t)=>Ui(e,Ea("default",{isLoading:!0,autoClose:!1,closeOnClick:!1,closeButton:!1,draggable:!1,...t}));function Ix(e,{pending:t,error:n,success:r},s){let i;t&&(i=Cr(t)?$.loading(t,s):$.loading(t.render,{...s,...t}));let a={isLoading:null,autoClose:null,closeOnClick:null,closeButton:null,draggable:null},l=(u,p,m)=>{if(p==null){$.dismiss(i);return}let g={type:u,...a,...s,data:m},b=Cr(p)?{render:p}:p;return i?$.update(i,{...g,...b}):$(b.render,{...g,...b}),m},c=fn(e)?e():e;return c.then(u=>l("success",r,u)).catch(u=>l("error",n,u)),c}$.promise=Ix;$.success=_a("success");$.info=_a("info");$.error=_a("error");$.warning=_a("warning");$.warn=$.warning;$.dark=(e,t)=>Ui(e,Ea("default",{theme:"dark",...t}));function Ax(e){Nx(e)}$.dismiss=Ax;$.clearWaitingQueue=Rx;$.isActive=zm;$.update=(e,t={})=>{let n=Tx(e,t);if(n){let{props:r,content:s}=n,i={delay:100,...r,...t,toastId:t.toastId||e,updateId:Rm()};i.toastId!==e&&(i.staleId=e);let a=i.render||s;delete i.render,Ui(a,i)}};$.done=e=>{$.update(e,{progress:1})};$.onChange=Lx;$.play=e=>Om(!0,e);$.pause=e=>Om(!1,e);function Mx(e){var t;let{subscribe:n,getSnapshot:r,setProps:s}=w.useRef(zx(e)).current;s(e);let i=(t=w.useSyncExternalStore(n,r,r))==null?void 0:t.slice();function a(l){if(!i)return[];let c=new Map;return e.newestOnTop&&i.reverse(),i.forEach(u=>{let{position:p}=u.props;c.has(p)||c.set(p,[]),c.get(p).push(u)}),Array.from(c,u=>l(u[0],u[1]))}return{getToastToRender:a,isToastActive:zm,count:i==null?void 0:i.length}}function Fx(e){let[t,n]=w.useState(!1),[r,s]=w.useState(!1),i=w.useRef(null),a=w.useRef({start:0,delta:0,removalDistance:0,canCloseOnClick:!0,canDrag:!1,didMove:!1}).current,{autoClose:l,pauseOnHover:c,closeToast:u,onClick:p,closeOnClick:m}=e;Px({id:e.toastId,containerId:e.containerId,fn:n}),w.useEffect(()=>{if(e.pauseOnFocusLoss)return g(),()=>{b()}},[e.pauseOnFocusLoss]);function g(){document.hasFocus()||y(),window.addEventListener("focus",k),window.addEventListener("blur",y)}function b(){window.removeEventListener("focus",k),window.removeEventListener("blur",y)}function x(_){if(e.draggable===!0||e.draggable===_.pointerType){d();let N=i.current;a.canCloseOnClick=!0,a.canDrag=!0,N.style.transition="none",e.draggableDirection==="x"?(a.start=_.clientX,a.removalDistance=N.offsetWidth*(e.draggablePercent/100)):(a.start=_.clientY,a.removalDistance=N.offsetHeight*(e.draggablePercent===80?e.draggablePercent*1.5:e.draggablePercent)/100)}}function v(_){let{top:N,bottom:C,left:P,right:U}=i.current.getBoundingClientRect();_.nativeEvent.type!=="touchend"&&e.pauseOnHover&&_.clientX>=P&&_.clientX<=U&&_.clientY>=N&&_.clientY<=C?y():k()}function k(){n(!0)}function y(){n(!1)}function d(){a.didMove=!1,document.addEventListener("pointermove",S),document.addEventListener("pointerup",E)}function h(){document.removeEventListener("pointermove",S),document.removeEventListener("pointerup",E)}function S(_){let N=i.current;if(a.canDrag&&N){a.didMove=!0,t&&y(),e.draggableDirection==="x"?a.delta=_.clientX-a.start:a.delta=_.clientY-a.start,a.start!==_.clientX&&(a.canCloseOnClick=!1);let C=e.draggableDirection==="x"?`${a.delta}px, var(--y)`:`0, calc(${a.delta}px + var(--y))`;N.style.transform=`translate3d(${C},0)`,N.style.opacity=`${1-Math.abs(a.delta/a.removalDistance)}`}}function E(){h();let _=i.current;if(a.canDrag&&a.didMove&&_){if(a.canDrag=!1,Math.abs(a.delta)>a.removalDistance){s(!0),e.closeToast(!0),e.collapseAll();return}_.style.transition="transform 0.2s, opacity 0.2s",_.style.removeProperty("transform"),_.style.removeProperty("opacity")}}let R={onPointerDown:x,onPointerUp:v};return l&&c&&(R.onMouseEnter=y,e.stacked||(R.onMouseLeave=k)),m&&(R.onClick=_=>{p&&p(_),a.canCloseOnClick&&u(!0)}),{playToast:k,pauseToast:y,isRunning:t,preventExitTransition:r,toastRef:i,eventHandlers:R}}var Dx=typeof window<"u"?w.useLayoutEffect:w.useEffect,Ta=({theme:e,type:t,isLoading:n,...r})=>te.createElement("svg",{viewBox:"0 0 24 24",width:"100%",height:"100%",fill:e==="colored"?"currentColor":`var(--toastify-icon-color-${t})`,...r});function $x(e){return te.createElement(Ta,{...e},te.createElement("path",{d:"M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"}))}function Bx(e){return te.createElement(Ta,{...e},te.createElement("path",{d:"M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"}))}function Ux(e){return te.createElement(Ta,{...e},te.createElement("path",{d:"M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"}))}function Wx(e){return te.createElement(Ta,{...e},te.createElement("path",{d:"M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"}))}function Hx(){return te.createElement("div",{className:"Toastify__spinner"})}var fc={info:Bx,warning:$x,success:Ux,error:Wx,spinner:Hx},Vx=e=>e in fc;function qx({theme:e,type:t,isLoading:n,icon:r}){let s=null,i={theme:e,type:t};return r===!1||(fn(r)?s=r({...i,isLoading:n}):w.isValidElement(r)?s=w.cloneElement(r,i):n?s=fc.spinner():Vx(t)&&(s=fc[t](i))),s}var Qx=e=>{let{isRunning:t,preventExitTransition:n,toastRef:r,eventHandlers:s,playToast:i}=Fx(e),{closeButton:a,children:l,autoClose:c,onClick:u,type:p,hideProgressBar:m,closeToast:g,transition:b,position:x,className:v,style:k,progressClassName:y,updateId:d,role:h,progress:S,rtl:E,toastId:R,deleteToast:_,isIn:N,isLoading:C,closeOnClick:P,theme:U,ariaLabel:J}=e,ee=vr("Toastify__toast",`Toastify__toast-theme--${U}`,`Toastify__toast--${p}`,{"Toastify__toast--rtl":E},{"Toastify__toast--close-on-click":P}),ge=fn(v)?v({rtl:E,position:x,type:p,defaultClassName:ee}):vr(ee,v),ye=qx(e),ne=!!S||!c,pe={closeToast:g,type:p,theme:U},O=null;return a===!1||(fn(a)?O=a(pe):w.isValidElement(a)?O=w.cloneElement(a,pe):O=Sx(pe)),te.createElement(b,{isIn:N,done:_,position:x,preventExitTransition:n,nodeRef:r,playToast:i},te.createElement("div",{id:R,tabIndex:0,onClick:u,"data-in":N,className:ge,...s,style:k,ref:r,...N&&{role:h,"aria-label":J}},ye!=null&&te.createElement("div",{className:vr("Toastify__toast-icon",{"Toastify--animate-icon Toastify__zoom-enter":!C})},ye),Nm(l,e,!t),O,!e.customProgressBar&&te.createElement(kx,{...d&&!ne?{key:`p-${d}`}:{},rtl:E,theme:U,delay:c,isRunning:t,isIn:N,closeToast:g,hide:m,type:p,className:y,controlledProgress:ne,progress:S||0})))},Kx=(e,t=!1)=>({enter:`Toastify--animate Toastify__${e}-enter`,exit:`Toastify--animate Toastify__${e}-exit`,appendPosition:t}),Yx=wx(Kx("bounce",!0)),Jx={position:"top-right",transition:Yx,autoClose:5e3,closeButton:!0,pauseOnHover:!0,pauseOnFocusLoss:!0,draggable:"touch",draggablePercent:80,draggableDirection:"x",role:"alert",theme:"light","aria-label":"Notifications Alt+T",hotKeys:e=>e.altKey&&e.code==="KeyT"};function zu(e){let t={...Jx,...e},n=e.stacked,[r,s]=w.useState(!0),i=w.useRef(null),{getToastToRender:a,isToastActive:l,count:c}=Mx(t),{className:u,style:p,rtl:m,containerId:g,hotKeys:b}=t;function x(k){let y=vr("Toastify__toast-container",`Toastify__toast-container--${k}`,{"Toastify__toast-container--rtl":m});return fn(u)?u({position:k,rtl:m,defaultClassName:y}):vr(y,cc(u))}function v(){n&&(s(!0),$.play())}return Dx(()=>{var k;if(n){let y=i.current.querySelectorAll('[data-in="true"]'),d=12,h=(k=t.position)==null?void 0:k.includes("top"),S=0,E=0;Array.from(y).reverse().forEach((R,_)=>{let N=R;N.classList.add("Toastify__toast--stacked"),_>0&&(N.dataset.collapsed=`${r}`),N.dataset.pos||(N.dataset.pos=h?"top":"bot");let C=S*(r?.2:1)+(r?0:d*_);N.style.setProperty("--y",`${h?C:C*-1}px`),N.style.setProperty("--g",`${d}`),N.style.setProperty("--s",`${1-(r?E:0)}`),S+=N.offsetHeight,E+=.025})}},[r,c,n]),w.useEffect(()=>{function k(y){var d;let h=i.current;b(y)&&((d=h.querySelector('[tabIndex="0"]'))==null||d.focus(),s(!1),$.pause()),y.key==="Escape"&&(document.activeElement===h||h!=null&&h.contains(document.activeElement))&&(s(!0),$.play())}return document.addEventListener("keydown",k),()=>{document.removeEventListener("keydown",k)}},[b]),te.createElement("section",{ref:i,className:"Toastify",id:g,onMouseEnter:()=>{n&&(s(!1),$.pause())},onMouseLeave:v,"aria-live":"polite","aria-atomic":"false","aria-relevant":"additions text","aria-label":t["aria-label"]},a((k,y)=>{let d=y.length?{...p}:{...p,pointerEvents:"none"};return te.createElement("div",{tabIndex:-1,className:x(k),"data-stacked":n,style:d,key:`c-${k}`},y.map(({content:h,props:S})=>te.createElement(Qx,{...S,stacked:n,collapseAll:v,isIn:l(S.toastId,S.containerId),key:`t-${S.key}`},h)))}))}const Xx=()=>{const{token:e}=ht(),t=Pr();w.useEffect(()=>{e&&t("/dashboard")},[e,t]);const[n,r]=w.useState(""),[s,i]=w.useState(""),[a,l]=w.useState("contractor"),[c,u]=w.useState(""),[p,m]=w.useState(!1),g=async b=>{var k,y;b.preventDefault(),u(""),m(!1);const x=/^[^@\s]+@[^@\s]+\.[^@\s]+$/,v=/^[1-9][0-9]{9,14}$/;if(!n){u("Please provide your email or mobile number.");return}if(!x.test(n)&&!v.test(n)){u("Please enter a valid email or mobile number.");return}try{let d={username:n,password:s,role:a};console.log("Register payload:",d);const h=await xr(`${At.AUTH_SERVICE}/signup`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(d)}),S=await h.json();if(h.ok)m(!0),$.success("Registration successful! Redirecting to login...",{position:"top-right",autoClose:3e3}),setTimeout(()=>m(!1),3e3);else{const E=(k=S.error)==null?void 0:k.code,R=((y=S.error)==null?void 0:y.message)||S.message||"Registration failed";E==="EMAIL_TAKEN"?(u("This email is already registered. Please use a different email or login."),$.error("This email is already registered!",{position:"top-right",autoClose:5e3})):E==="PHONE_TAKEN"?(u("This phone number is already registered. Please use a different phone number or login."),$.error("This phone number is already registered!",{position:"top-right",autoClose:5e3})):E==="USERNAME_TAKEN"?(u(R),$.error(R,{position:"top-right",autoClose:5e3})):E==="DUPLICATE_USER"?(u("This email or phone number is already registered."),$.error("This email or phone number is already registered!",{position:"top-right",autoClose:5e3})):(u(R),$.error(R,{position:"top-right",autoClose:5e3}))}}catch{u("Network error"),$.error("Network error. Please check your connection and try again.",{position:"top-right",autoClose:5e3})}};return o.jsxs(o.Fragment,{children:[o.jsx(zu,{}),o.jsx("style",{children:`
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
      `}),o.jsxs("div",{className:"register-split-bg",children:[o.jsx("div",{className:"register-left",children:o.jsxs("form",{className:"register-form",onSubmit:g,children:[o.jsx("h2",{children:"Register"}),o.jsx("input",{type:"text",placeholder:"Email or Mobile Number",value:n,onChange:b=>r(b.target.value),required:!0}),o.jsx("input",{type:"password",placeholder:"Password",value:s,onChange:b=>i(b.target.value),required:!0}),o.jsxs("select",{value:a,onChange:b=>l(b.target.value),required:!0,children:[o.jsx("option",{value:"contractor",children:"Contractor"}),o.jsx("option",{value:"worker",children:"Worker"})]}),o.jsx("button",{type:"submit",children:"Register"}),o.jsx("div",{className:"divider",children:o.jsx("span",{children:"OR"})}),o.jsxs("button",{type:"button",className:"social-btn google-btn",onClick:()=>window.location.href="http://localhost:3001/api/auth/google",children:[o.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 18 18",xmlns:"http://www.w3.org/2000/svg",children:[o.jsx("path",{d:"M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z",fill:"#4285F4"}),o.jsx("path",{d:"M9.003 18c2.43 0 4.467-.806 5.956-2.18L12.05 13.56c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z",fill:"#34A853"}),o.jsx("path",{d:"M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z",fill:"#FBBC05"}),o.jsx("path",{d:"M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.426 0 9.003 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z",fill:"#EA4335"})]}),"Continue with Google"]}),o.jsxs("button",{type:"button",className:"social-btn facebook-btn",onClick:()=>window.location.href="http://localhost:3001/api/auth/facebook",children:[o.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"#1877F2",xmlns:"http://www.w3.org/2000/svg",children:o.jsx("path",{d:"M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"})}),"Continue with Facebook"]}),o.jsxs("button",{type:"button",className:"social-btn twitter-btn",onClick:()=>window.location.href="http://localhost:3001/api/auth/twitter",children:[o.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg",children:o.jsx("path",{d:"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"})}),"Continue with X"]}),p&&o.jsxs("div",{className:"success-bar",children:["Registration successful!",o.jsx("button",{className:"close-btn",onClick:()=>m(!1),children:"×"})]}),c&&o.jsx("div",{className:"error",children:c}),o.jsx("style",{children:`
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
      `})]})}),o.jsxs("div",{className:"register-right",children:[o.jsx("h2",{style:{color:"#6d4c41"},children:"Connecting People. Creating Success."}),o.jsx("p",{style:{maxWidth:"340px",fontSize:"1.1rem",marginTop:"1rem",color:"#3e2723"},children:"Welcome! Our platform helps rural helpers and masons find work and connect with contractors. Simple, secure, and made for you."}),o.jsx("img",{src:"https://images.pexels.com/photos/34003193/pexels-photo-34003193.jpeg",alt:"Rural workers with wheelbarrow",style:{width:"90%",maxWidth:"320px",borderRadius:"12px",marginTop:"1.5rem",boxShadow:"0 2px 12px rgba(0,0,0,0.12)"}}),o.jsx("img",{src:"https://images.pexels.com/photos/4509092/pexels-photo-4509092.jpeg",alt:"Mason laying bricks in rural area",style:{width:"90%",maxWidth:"320px",borderRadius:"12px",marginTop:"1.5rem",boxShadow:"0 2px 12px rgba(0,0,0,0.12)"}})]})]})]})},Gx=()=>{const[e,t]=w.useState(""),[n,r]=w.useState(!1),[s,i]=w.useState(""),[a,l]=w.useState(!1),c=async u=>{u.preventDefault(),i(""),l(!0);try{(await fetch(`${At.AUTH_SERVICE}/forgot-password`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e})})).ok?r(!0):i("Failed to send reset link. Please try again.")}catch{i("Network error. Please try again.")}finally{l(!1)}};return o.jsx("div",{className:"forgot-password-bg",style:{minHeight:"100vh",display:"flex",justifyContent:"center",alignItems:"center",background:"#f5f7fa"},children:o.jsxs("form",{className:"forgot-password-form",onSubmit:c,style:{background:"#fff",padding:"2.5rem",borderRadius:"16px",boxShadow:"0 4px 32px rgba(0,0,0,0.10)",maxWidth:"420px",width:"100%"},children:[o.jsx("h2",{style:{textAlign:"center",color:"#1976d2",fontWeight:700},children:"Forgot Password"}),n?o.jsx("div",{style:{color:"#43a047",textAlign:"center",margin:"1rem 0"},children:"If an account exists for this email, a reset link has been sent."}):o.jsxs(o.Fragment,{children:[o.jsx("label",{htmlFor:"forgot-email",style:{display:"none"},children:"Email"}),o.jsx("input",{id:"forgot-email",type:"email",placeholder:"Enter your email",value:e,onChange:u=>t(u.target.value),required:!0,style:{padding:"1rem",borderRadius:"10px",border:"1px solid #bbb",fontSize:"1.1rem",background:"#f7f9fc",width:"100%",marginBottom:"1rem"},autoComplete:"email"}),o.jsx("button",{type:"submit",disabled:a,style:{padding:"1rem",borderRadius:"10px",border:"none",background:"#1976d2",color:"#fff",fontWeight:700,fontSize:"1.1rem",width:"100%",cursor:"pointer"},children:a?"Sending...":"Send Reset Link"}),s&&o.jsx("div",{style:{color:"red",textAlign:"center",marginTop:"1rem"},children:s})]})]})})},Zx=()=>{const{token:e}=P1(),t=Pr(),[n,r]=w.useState(""),[s,i]=w.useState(""),[a,l]=w.useState(!1),[c,u]=w.useState(""),[p,m]=w.useState(!1),[g,b]=w.useState(!0),[x,v]=w.useState(!1);w.useEffect(()=>{(async()=>{if(!e){u("Invalid reset link"),b(!1);return}try{const h=await(await fetch(`${At.AUTH_SERVICE}/validate-reset-token/${e}`)).json();h.success&&h.valid?v(!0):u(h.message||"This password reset link is invalid or has expired")}catch{u("Failed to validate reset link")}finally{b(!1)}})()},[e]);const k=async y=>{if(y.preventDefault(),u(""),n.length<6){u("Password must be at least 6 characters long");return}if(n!==s){u("Passwords do not match");return}l(!0);try{const h=await(await fetch(`${At.AUTH_SERVICE}/reset-password`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:e,newPassword:n})})).json();h.success?(m(!0),setTimeout(()=>{t("/login")},3e3)):u(h.message||"Failed to reset password")}catch{u("Network error. Please try again.")}finally{l(!1)}};return g?o.jsx("div",{className:"min-h-screen flex items-center justify-center bg-gray-50",children:o.jsxs("div",{className:"text-center",children:[o.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"}),o.jsx("p",{className:"mt-4 text-gray-600",children:"Validating reset link..."})]})}):x?p?o.jsx("div",{className:"min-h-screen flex items-center justify-center bg-gray-50",children:o.jsx("div",{className:"max-w-md w-full bg-white rounded-lg shadow-md p-8",children:o.jsxs("div",{className:"text-center",children:[o.jsx("svg",{className:"mx-auto h-12 w-12 text-green-500",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:o.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 13l4 4L19 7"})}),o.jsx("h2",{className:"mt-4 text-2xl font-bold text-gray-900",children:"Password Reset Successful!"}),o.jsx("p",{className:"mt-2 text-gray-600",children:"Your password has been successfully reset. Redirecting to login..."})]})})}):o.jsx("div",{className:"min-h-screen flex items-center justify-center bg-gray-50",children:o.jsxs("div",{className:"max-w-md w-full bg-white rounded-lg shadow-md p-8",children:[o.jsxs("div",{className:"text-center mb-8",children:[o.jsx("h2",{className:"text-3xl font-bold text-gray-900",children:"Reset Your Password"}),o.jsx("p",{className:"mt-2 text-gray-600",children:"Enter your new password below"})]}),o.jsxs("form",{onSubmit:k,className:"space-y-6",children:[c&&o.jsx("div",{className:"bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md",children:c}),o.jsxs("div",{children:[o.jsx("label",{htmlFor:"password",className:"block text-sm font-medium text-gray-700 mb-2",children:"New Password"}),o.jsx("input",{id:"password",type:"password",value:n,onChange:y=>r(y.target.value),required:!0,className:"w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent",placeholder:"Enter new password",minLength:6}),o.jsx("p",{className:"mt-1 text-xs text-gray-500",children:"Minimum 6 characters"})]}),o.jsxs("div",{children:[o.jsx("label",{htmlFor:"confirmPassword",className:"block text-sm font-medium text-gray-700 mb-2",children:"Confirm Password"}),o.jsx("input",{id:"confirmPassword",type:"password",value:s,onChange:y=>i(y.target.value),required:!0,className:"w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent",placeholder:"Confirm new password",minLength:6})]}),o.jsx("button",{type:"submit",disabled:a,className:"w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",children:a?"Resetting Password...":"Reset Password"})]}),o.jsx("div",{className:"mt-6 text-center",children:o.jsx(we,{to:"/login",className:"text-sm text-blue-600 hover:text-blue-700",children:"Back to Login"})})]})}):o.jsx("div",{className:"min-h-screen flex items-center justify-center bg-gray-50",children:o.jsx("div",{className:"max-w-md w-full bg-white rounded-lg shadow-md p-8",children:o.jsxs("div",{className:"text-center",children:[o.jsx("svg",{className:"mx-auto h-12 w-12 text-red-500",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:o.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})}),o.jsx("h2",{className:"mt-4 text-2xl font-bold text-gray-900",children:"Invalid Reset Link"}),o.jsx("p",{className:"mt-2 text-gray-600",children:c}),o.jsx(we,{to:"/forgot-password",className:"mt-6 inline-block text-blue-600 hover:text-blue-700 font-medium",children:"Request a new reset link"})]})})})},ev=()=>{const[e]=ox(),t=Pr(),{login:n}=ht(),[r,s]=w.useState("");return w.useEffect(()=>{(async()=>{const a=e.get("access_token"),l=e.get("refresh_token"),c=e.get("user_id"),u=e.get("error");if(u){s(`OAuth authentication failed: ${u}`),setTimeout(()=>t("/register"),3e3);return}if(!a||!l||!c){s("Missing authentication tokens. Please try again."),setTimeout(()=>t("/register"),3e3);return}try{localStorage.setItem("refreshToken",l),n(a,{id:c}),t("/dashboard")}catch(p){console.error("OAuth callback error:",p),s("Failed to complete authentication. Please try again."),setTimeout(()=>t("/register"),3e3)}})()},[e,t,n]),o.jsx("div",{style:{minHeight:"100vh",display:"flex",justifyContent:"center",alignItems:"center",background:"#f7f4e9",padding:"2rem"},children:o.jsxs("div",{style:{background:"#fff",padding:"3rem",borderRadius:"16px",boxShadow:"0 4px 32px rgba(0,0,0,0.1)",textAlign:"center",maxWidth:"500px"},children:[r?o.jsxs(o.Fragment,{children:[o.jsx("div",{style:{fontSize:"3rem",color:"#d32f2f",marginBottom:"1rem"},children:"❌"}),o.jsx("h2",{style:{color:"#d32f2f",marginBottom:"1rem"},children:"Authentication Failed"}),o.jsx("p",{style:{color:"#666",marginBottom:"1.5rem"},children:r}),o.jsx("p",{style:{color:"#999",fontSize:"0.9rem"},children:"Redirecting to registration page..."})]}):o.jsxs(o.Fragment,{children:[o.jsx("div",{style:{width:"60px",height:"60px",border:"4px solid #43a047",borderTop:"4px solid transparent",borderRadius:"50%",animation:"spin 1s linear infinite",margin:"0 auto 1.5rem"}}),o.jsx("h2",{style:{color:"#43a047",marginBottom:"1rem"},children:"Completing Sign In..."}),o.jsx("p",{style:{color:"#666"},children:"Please wait while we set up your account."})]}),o.jsx("style",{children:`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `})]})})},Im=w.createContext(void 0),Lu=()=>{const e=w.useContext(Im);if(!e)throw new Error("useToast must be used within a ToastProvider");return e},tv=({children:e})=>{const[t,n]=w.useState([]),r=w.useCallback(u=>{const p=Math.random().toString(36).substr(2,9),m={...u,id:p};n(g=>[...g,m]),setTimeout(()=>{s(p)},u.duration||5e3)},[]),s=w.useCallback(u=>{n(p=>p.filter(m=>m.id!==u))},[]),i=w.useCallback((u,p)=>{r({type:"success",title:u,message:p})},[r]),a=w.useCallback((u,p)=>{r({type:"error",title:u,message:p,duration:7e3})},[r]),l=w.useCallback((u,p)=>{r({type:"warning",title:u,message:p})},[r]),c=w.useCallback((u,p)=>{r({type:"info",title:u,message:p})},[r]);return o.jsx(Im.Provider,{value:{toasts:t,addToast:r,removeToast:s,success:i,error:a,warning:l,info:c},children:e})},f={colors:{primary:{50:"#eff6ff",100:"#dbeafe",200:"#bfdbfe",300:"#93c5fd",400:"#60a5fa",500:"#3b82f6",600:"#1976d2",700:"#1565c0",800:"#1e40af",900:"#1e3a8a"},secondary:{50:"#fefdf8",100:"#fef7cd",200:"#fef08a",300:"#fde047",400:"#facc15",500:"#f5ecd6",600:"#e9d8a6",700:"#ca8a04",800:"#a16207",900:"#854d0e"},success:{50:"#f0fdf4",100:"#dcfce7",200:"#bbf7d0",300:"#86efac",400:"#4ade80",500:"#10b981",600:"#059669",700:"#047857",800:"#065f46",900:"#064e3b"},warning:{50:"#fffbeb",100:"#fef3c7",200:"#fde68a",300:"#fcd34d",400:"#fbbf24",500:"#f59e0b",600:"#d97706",700:"#b45309",800:"#92400e",900:"#78350f"},danger:{50:"#fef2f2",100:"#fee2e2",200:"#fecaca",300:"#fca5a5",400:"#f87171",500:"#ef4444",600:"#dc2626",700:"#b91c1c",800:"#991b1b",900:"#7f1d1d"},neutral:{50:"#f9fafb",100:"#f3f4f6",200:"#e5e7eb",300:"#d1d5db",400:"#9ca3af",500:"#6b7280",600:"#4b5563",700:"#374151",800:"#1f2937",900:"#111827"}},spacing:{xs:"0.25rem",sm:"0.5rem",md:"1rem",lg:"1.5rem",xl:"2rem","2xl":"3rem","3xl":"4rem"},borderRadius:{sm:"4px",md:"8px",lg:"12px",xl:"16px",full:"9999px"},shadows:{sm:"0 1px 2px 0 rgba(0, 0, 0, 0.05)",md:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",lg:"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",xl:"0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"},typography:{fontFamily:{sans:["-apple-system","BlinkMacSystemFont","Segoe UI","Roboto","Helvetica Neue","Arial","sans-serif"],mono:["Monaco","Consolas","Liberation Mono","Courier New","monospace"]},fontSize:{xs:"0.75rem",sm:"0.875rem",base:"1rem",lg:"1.125rem",xl:"1.25rem","2xl":"1.5rem","3xl":"1.875rem","4xl":"2.25rem"},fontWeight:{normal:400,medium:500,semibold:600,bold:700},lineHeight:{tight:1.25,normal:1.5,relaxed:1.75}},transitions:{fast:"150ms ease-in-out",normal:"250ms ease-in-out",slow:"350ms ease-in-out"},breakpoints:{sm:"640px",md:"768px",lg:"1024px",xl:"1280px"}},zt=({width:e="100%",height:t="1rem",borderRadius:n=f.borderRadius.sm,className:r=""})=>{const s={display:"inline-block",width:e,height:t,borderRadius:n,backgroundColor:f.colors.neutral[200],position:"relative",overflow:"hidden",animation:"skeleton-loading 1.5s ease-in-out infinite"};return o.jsxs(o.Fragment,{children:[o.jsx("style",{children:`
          @keyframes skeleton-loading {
            0% {
              background-color: ${f.colors.neutral[200]};
            }
            50% {
              background-color: ${f.colors.neutral[300]};
            }
            100% {
              background-color: ${f.colors.neutral[200]};
            }
          }
        `}),o.jsx("div",{className:r,style:s})]})},pc=()=>o.jsxs("div",{style:{padding:f.spacing.lg,border:`1px solid ${f.colors.neutral[200]}`,borderRadius:f.borderRadius.lg,backgroundColor:"white",boxShadow:f.shadows.sm},children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:f.spacing.md,marginBottom:f.spacing.md},children:[o.jsx(zt,{width:"48px",height:"48px",borderRadius:"50%"}),o.jsxs("div",{style:{flex:1},children:[o.jsx(zt,{width:"60%",height:"1.25rem"}),o.jsx("div",{style:{marginTop:f.spacing.xs},children:o.jsx(zt,{width:"40%",height:"1rem"})})]})]}),o.jsx("div",{style:{marginBottom:f.spacing.sm},children:o.jsx(zt,{width:"100%",height:"1rem"})}),o.jsx("div",{style:{marginBottom:f.spacing.sm},children:o.jsx(zt,{width:"80%",height:"1rem"})}),o.jsxs("div",{style:{display:"flex",gap:f.spacing.sm,marginTop:f.spacing.md},children:[o.jsx(zt,{width:"80px",height:"32px",borderRadius:f.borderRadius.sm}),o.jsx(zt,{width:"80px",height:"32px",borderRadius:f.borderRadius.sm})]})]}),nv=()=>o.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))",gap:f.spacing.lg},children:Array.from({length:4}).map((e,t)=>o.jsxs("div",{style:{padding:f.spacing.lg,border:`1px solid ${f.colors.neutral[200]}`,borderRadius:f.borderRadius.lg,backgroundColor:"white",boxShadow:f.shadows.sm},children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:f.spacing.md},children:[o.jsx(zt,{width:"60%",height:"1rem"}),o.jsx(zt,{width:"24px",height:"24px",borderRadius:"50%"})]}),o.jsx(zt,{width:"40%",height:"2rem"}),o.jsx("div",{style:{marginTop:f.spacing.sm},children:o.jsx(zt,{width:"80%",height:"0.875rem"})})]},t))}),rv=({size:e="md",color:t=f.colors.primary[500]})=>{const n={sm:"16px",md:"24px",lg:"32px"},r={width:n[e],height:n[e],border:`2px solid ${f.colors.neutral[200]}`,borderTop:`2px solid ${t}`,borderRadius:"50%",animation:"spin 1s linear infinite"};return o.jsxs(o.Fragment,{children:[o.jsx("style",{children:`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}),o.jsx("div",{style:r})]})},wi=({isLoading:e,children:t,onClick:n,disabled:r=!1,variant:s="primary",size:i="md"})=>{const a=()=>{const l={display:"inline-flex",alignItems:"center",justifyContent:"center",gap:f.spacing.sm,border:"none",borderRadius:f.borderRadius.md,cursor:e||r?"not-allowed":"pointer",fontSize:f.typography.fontSize.sm,fontWeight:f.typography.fontWeight.medium,transition:"all 0.2s ease-in-out",opacity:e||r?.6:1},c={sm:{padding:`${f.spacing.xs} ${f.spacing.sm}`,fontSize:f.typography.fontSize.xs},md:{padding:`${f.spacing.sm} ${f.spacing.md}`,fontSize:f.typography.fontSize.sm},lg:{padding:`${f.spacing.md} ${f.spacing.lg}`,fontSize:f.typography.fontSize.base}},u={primary:{backgroundColor:f.colors.primary[500],color:"white"},secondary:{backgroundColor:f.colors.neutral[500],color:"white"},outline:{backgroundColor:"transparent",color:f.colors.primary[500],border:`1px solid ${f.colors.primary[500]}`}};return{...l,...c[i],...u[s]}};return o.jsxs("button",{style:a(),onClick:n,disabled:e||r,children:[e&&o.jsx(rv,{size:"sm",color:"currentColor"}),t]})},pf=({label:e,isActive:t,onClick:n,color:r=f.colors.primary[500]})=>o.jsxs("button",{onClick:n,style:{padding:`${f.spacing.xs} ${f.spacing.sm}`,borderRadius:f.borderRadius.full,border:`2px solid ${t?r:f.colors.neutral[300]}`,backgroundColor:t?r:"white",color:t?"white":f.colors.neutral[700],fontSize:f.typography.fontSize.sm,fontWeight:f.typography.fontWeight.medium,cursor:"pointer",transition:"all 0.2s ease-in-out",display:"flex",alignItems:"center",gap:f.spacing.xs},onMouseEnter:s=>{t||(s.currentTarget.style.borderColor=r,s.currentTarget.style.backgroundColor=`${r}10`)},onMouseLeave:s=>{t||(s.currentTarget.style.borderColor=f.colors.neutral[300],s.currentTarget.style.backgroundColor="white")},children:[e,t&&o.jsx("svg",{width:"16",height:"16",fill:"currentColor",viewBox:"0 0 20 20",children:o.jsx("path",{fillRule:"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",clipRule:"evenodd"})})]}),sv=({match:e,onContact:t,onTeamRequest:n,isLoading:r=!1})=>{var s,i,a;return o.jsxs("div",{style:{backgroundColor:"white",borderRadius:f.borderRadius.lg,border:`1px solid ${f.colors.neutral[200]}`,boxShadow:f.shadows.sm,padding:f.spacing.lg,transition:"all 0.2s ease-in-out"},onMouseEnter:l=>{l.currentTarget.style.boxShadow=f.shadows.md,l.currentTarget.style.transform="translateY(-2px)"},onMouseLeave:l=>{l.currentTarget.style.boxShadow=f.shadows.sm,l.currentTarget.style.transform="translateY(0)"},children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:f.spacing.md,marginBottom:f.spacing.md},children:[o.jsx("div",{style:{width:"48px",height:"48px",borderRadius:"50%",backgroundColor:f.colors.primary[100],display:"flex",alignItems:"center",justifyContent:"center",fontSize:f.typography.fontSize.xl,fontWeight:f.typography.fontWeight.bold,color:f.colors.primary[600]},children:((i=(s=e.name||e.id)==null?void 0:s.charAt(0))==null?void 0:i.toUpperCase())||"?"}),o.jsxs("div",{style:{flex:1},children:[o.jsx("div",{style:{fontSize:f.typography.fontSize.lg,fontWeight:f.typography.fontWeight.semibold,color:f.colors.neutral[900],marginBottom:f.spacing.xs},children:e.name||`Worker ${((a=e.id)==null?void 0:a.slice(-6))||"Unknown"}`}),o.jsx("div",{style:{fontSize:f.typography.fontSize.sm,color:f.colors.neutral[600]},children:e.company||"Individual Contractor"})]}),e.score&&o.jsxs("div",{style:{position:"absolute",top:f.spacing.sm,right:f.spacing.sm,backgroundColor:f.colors.success[100],color:f.colors.success[700],padding:`${f.spacing.xs} ${f.spacing.sm}`,borderRadius:f.borderRadius.full,fontSize:f.typography.fontSize.xs,fontWeight:f.typography.fontWeight.medium},children:[Math.round(e.score*100),"% match"]})]}),e.skills&&Array.isArray(e.skills)&&e.skills.length>0&&o.jsxs("div",{style:{marginBottom:f.spacing.md},children:[o.jsx("div",{style:{fontSize:f.typography.fontSize.sm,fontWeight:f.typography.fontWeight.medium,color:f.colors.neutral[700],marginBottom:f.spacing.xs},children:"Skills"}),o.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:f.spacing.xs},children:[e.skills.slice(0,4).map((l,c)=>o.jsx("span",{style:{padding:`${f.spacing.xs} ${f.spacing.sm}`,backgroundColor:f.colors.primary[50],color:f.colors.primary[700],borderRadius:f.borderRadius.sm,fontSize:f.typography.fontSize.xs,fontWeight:f.typography.fontWeight.medium},children:l.trim()},c)),e.skills.length>4&&o.jsxs("span",{style:{padding:`${f.spacing.xs} ${f.spacing.sm}`,backgroundColor:f.colors.neutral[100],color:f.colors.neutral[600],borderRadius:f.borderRadius.sm,fontSize:f.typography.fontSize.xs},children:["+",e.skills.length-4," more"]})]})]}),o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:f.spacing.md,marginBottom:f.spacing.md,fontSize:f.typography.fontSize.sm,color:f.colors.neutral[600]},children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:f.spacing.xs},children:[o.jsx("svg",{width:"16",height:"16",fill:"currentColor",viewBox:"0 0 20 20",children:o.jsx("path",{fillRule:"evenodd",d:"M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z",clipRule:"evenodd"})}),e.location||"Location not specified"]}),e.distanceKm&&o.jsxs("span",{style:{color:f.colors.neutral[500],fontSize:f.typography.fontSize.sm},children:[Math.round(e.distanceKm)," km away"]})]}),e.bio&&o.jsx("div",{style:{marginBottom:f.spacing.md,fontSize:f.typography.fontSize.sm,color:f.colors.neutral[700],lineHeight:"1.5",display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical",overflow:"hidden"},children:e.bio}),o.jsx("div",{style:{display:"flex",alignItems:"center",gap:f.spacing.md,marginBottom:f.spacing.lg,fontSize:f.typography.fontSize.sm,color:f.colors.neutral[600]},children:e.rating!=null&&!isNaN(Number(e.rating))&&o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:f.spacing.xs},children:[o.jsx("div",{style:{display:"flex",gap:"1px"},children:[...Array(5)].map((l,c)=>o.jsx("svg",{width:"16",height:"16",fill:c<Math.floor(Number(e.rating))?f.colors.warning[400]:f.colors.neutral[300],viewBox:"0 0 20 20",children:o.jsx("path",{d:"M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"})},c))}),o.jsx("span",{children:Number(e.rating).toFixed(1)}),e.review_count&&o.jsxs("span",{children:["(",e.review_count," reviews)"]})]})}),o.jsxs("div",{style:{display:"flex",gap:f.spacing.sm,justifyContent:"flex-end"},children:[o.jsx(wi,{isLoading:r,variant:"outline",size:"sm",onClick:t,children:"Contact"}),o.jsx(wi,{isLoading:r,variant:"primary",size:"sm",onClick:n,children:"Send Team Request"})]})]})},iv=({currentPage:e,totalPages:t,onPageChange:n})=>{const r=()=>{const a=[],l=[];for(let c=Math.max(2,e-2);c<=Math.min(t-1,e+2);c++)a.push(c);return e-2>2?l.push(1,"..."):l.push(1),l.push(...a),e+2<t-1?l.push("...",t):t>1&&l.push(t),l};if(t<=1)return null;const s=r();return o.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:f.spacing.xs,marginTop:f.spacing.xl},children:[o.jsx("button",{onClick:()=>n(e-1),disabled:e===1,style:{padding:`${f.spacing.sm} ${f.spacing.sm}`,border:`1px solid ${f.colors.neutral[300]}`,borderRadius:f.borderRadius.sm,backgroundColor:"white",color:e===1?f.colors.neutral[400]:f.colors.neutral[700],cursor:e===1?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center"},children:o.jsx("svg",{width:"16",height:"16",fill:"currentColor",viewBox:"0 0 20 20",children:o.jsx("path",{fillRule:"evenodd",d:"M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",clipRule:"evenodd"})})}),s.map((i,a)=>o.jsx("button",{onClick:()=>typeof i=="number"?n(i):void 0,disabled:typeof i!="number",style:{padding:`${f.spacing.sm} ${f.spacing.md}`,border:`1px solid ${e===i?f.colors.primary[500]:f.colors.neutral[300]}`,borderRadius:f.borderRadius.sm,backgroundColor:e===i?f.colors.primary[500]:"white",color:e===i?"white":f.colors.neutral[700],cursor:typeof i=="number"?"pointer":"default",fontSize:f.typography.fontSize.sm,fontWeight:f.typography.fontWeight.medium,minWidth:"40px"},children:i},a)),o.jsx("button",{onClick:()=>n(e+1),disabled:e===t,style:{padding:`${f.spacing.sm} ${f.spacing.sm}`,border:`1px solid ${f.colors.neutral[300]}`,borderRadius:f.borderRadius.sm,backgroundColor:"white",color:e===t?f.colors.neutral[400]:f.colors.neutral[700],cursor:e===t?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center"},children:o.jsx("svg",{width:"16",height:"16",fill:"currentColor",viewBox:"0 0 20 20",children:o.jsx("path",{fillRule:"evenodd",d:"M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z",clipRule:"evenodd"})})})]})},ov=()=>{const{token:e,user:t}=ht(),{success:n,error:r}=Lu(),[s,i]=w.useState(""),[a,l]=w.useState(""),[c,u]=w.useState(50),[p,m]=w.useState(""),[g,b]=w.useState(""),[x,v]=w.useState([]),[k,y]=w.useState(!1),[d,h]=w.useState(!1),[S,E]=w.useState(1),[R,_]=w.useState(1),[N,C]=w.useState(0),[P,U]=w.useState([]),[J,ee]=w.useState("relevance"),[ge,ye]=w.useState(null),[ne,pe]=w.useState([]),[O,W]=w.useState(!0),H=[{value:"beginner",label:"Beginner (0-2 years)"},{value:"intermediate",label:"Intermediate (2-5 years)"},{value:"expert",label:"Expert (5+ years)"}],Y=[{value:"low",label:"Low Priority"},{value:"medium",label:"Medium Priority"},{value:"high",label:"High Priority"}],G=[{value:"relevance",label:"Best Match"},{value:"distance",label:"Nearest First"},{value:"rating",label:"Highest Rated"},{value:"recent",label:"Recently Active"}];w.useEffect(()=>{e&&(async()=>{try{W(!0);const Re=await xr(`${At.USER_SERVICE}/skills`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(Re.ok){const yn=await Re.json();yn.success&&Array.isArray(yn.data)?pe(yn.data):(console.error("Invalid skills data format:",yn),pe([]))}else console.error("Failed to fetch skills:",Re.status),pe([])}catch(Re){console.error("Error fetching skills:",Re),pe([])}finally{W(!1)}})()},[e]);const Ae=async(B=1)=>{if(e){y(!0),E(B);try{const yn=(t==null?void 0:t.role)==="contractor"?"find-workers":"find-contractors",Ps={skillType:s||void 0,location:a||void 0,maxDistance:c>0?c:void 0,limit:12,...p&&{experienceLevel:p},...g&&{urgency:g},...B>1&&{offset:(B-1)*12}},zr=await fetch(`${MATCHING_BASE}/${yn}`,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify(Ps)});if(zr.ok){const jt=await zr.json();if(jt.success)v(jt.data.matches||[]),_(jt.data.totalPages||1),C(jt.data.total||0),h(!0),B===1&&n("Search completed",`Found ${jt.data.total||0} matches`);else throw new Error(jt.message||"Search failed")}else throw new Error("Search request failed")}catch(Re){console.error("Search error:",Re),r("Search failed","Please try again"),v([])}finally{y(!1)}}},Ce=async B=>{if(e){ye(`team-${B.id}`);try{if((await fetch(`${MATCHING_BASE}/team-requests`,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({recipient_id:B.id,message:`Hi ${B.name||"there"}, I'd like to invite you to join my team. Your skills in ${s} would be a great fit for our project.`})})).ok)n("Team request sent",`Invitation sent to ${B.name||"worker"}`);else throw new Error("Failed to send team request")}catch(Re){console.error("Team request error:",Re),r("Failed to send request","Please try again")}finally{ye(null)}}},$t=async B=>{ye(`contact-${B.id}`),setTimeout(()=>{n("Contact initiated",`You can now message ${B.name}`),ye(null)},1e3)},at=()=>{i(""),m(""),b(""),U([])},gn=s||p||g||P.length>0;return o.jsxs("div",{style:{maxWidth:"1400px",margin:"0 auto",padding:f.spacing.xl,backgroundColor:f.colors.neutral[50],minHeight:"100vh"},children:[o.jsxs("div",{style:{textAlign:"center",marginBottom:f.spacing.xl},children:[o.jsx("h1",{style:{fontSize:f.typography.fontSize["4xl"],fontWeight:f.typography.fontWeight.bold,color:f.colors.neutral[900],marginBottom:f.spacing.sm},children:"Find Your Perfect Team Match"}),o.jsx("p",{style:{fontSize:f.typography.fontSize.lg,color:f.colors.neutral[600]},children:"Discover talented contractors and workers for your projects"})]}),o.jsxs("div",{style:{backgroundColor:"white",borderRadius:f.borderRadius.lg,padding:f.spacing.xl,boxShadow:f.shadows.sm,border:`1px solid ${f.colors.neutral[200]}`,marginBottom:f.spacing.xl},children:[o.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))",gap:f.spacing.lg,marginBottom:f.spacing.lg},children:[o.jsxs("div",{children:[o.jsx("label",{style:{display:"block",fontSize:f.typography.fontSize.sm,fontWeight:f.typography.fontWeight.medium,color:f.colors.neutral[700],marginBottom:f.spacing.xs},children:"Skills Required"}),o.jsxs("select",{value:s,onChange:B=>i(B.target.value),disabled:O,style:{width:"100%",padding:f.spacing.sm,border:`1px solid ${f.colors.neutral[300]}`,borderRadius:f.borderRadius.md,fontSize:f.typography.fontSize.sm,backgroundColor:O?f.colors.neutral[100]:"white",cursor:O?"wait":"pointer"},children:[o.jsx("option",{value:"",children:O?"Loading skills...":"Select a skill..."}),ne.map(B=>o.jsx("option",{value:B,children:B},B))]})]}),o.jsxs("div",{children:[o.jsx("label",{style:{display:"block",fontSize:f.typography.fontSize.sm,fontWeight:f.typography.fontWeight.medium,color:f.colors.neutral[700],marginBottom:f.spacing.xs},children:"Location"}),o.jsx("input",{type:"text",value:a,onChange:B=>l(B.target.value),placeholder:"Enter city, state, or zip code",style:{width:"100%",padding:f.spacing.sm,border:`1px solid ${f.colors.neutral[300]}`,borderRadius:f.borderRadius.md,fontSize:f.typography.fontSize.sm}})]}),o.jsxs("div",{children:[o.jsxs("label",{style:{display:"block",fontSize:f.typography.fontSize.sm,fontWeight:f.typography.fontWeight.medium,color:f.colors.neutral[700],marginBottom:f.spacing.xs},children:["Max Distance: ",c," km"]}),o.jsx("input",{type:"range",min:"5",max:"200",value:c,onChange:B=>u(Number(B.target.value)),style:{width:"100%",height:"6px",borderRadius:"3px",backgroundColor:f.colors.neutral[200],outline:"none",cursor:"pointer"}})]})]}),o.jsxs("div",{style:{marginBottom:f.spacing.lg},children:[o.jsx("div",{style:{fontSize:f.typography.fontSize.sm,fontWeight:f.typography.fontWeight.medium,color:f.colors.neutral[700],marginBottom:f.spacing.sm},children:"Experience Level"}),o.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:f.spacing.sm,marginBottom:f.spacing.md},children:H.map(B=>o.jsx(pf,{label:B.label,value:B.value,isActive:p===B.value,onClick:()=>m(p===B.value?"":B.value),color:f.colors.success[500]},B.value))}),o.jsx("div",{style:{fontSize:f.typography.fontSize.sm,fontWeight:f.typography.fontWeight.medium,color:f.colors.neutral[700],marginBottom:f.spacing.sm},children:"Project Urgency"}),o.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:f.spacing.sm},children:Y.map(B=>o.jsx(pf,{label:B.label,value:B.value,isActive:g===B.value,onClick:()=>b(g===B.value?"":B.value),color:f.colors.warning[500]},B.value))})]}),o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:f.spacing.md,justifyContent:"space-between",flexWrap:"wrap"},children:[o.jsxs("div",{style:{display:"flex",gap:f.spacing.sm},children:[o.jsxs(wi,{isLoading:k,variant:"primary",onClick:()=>Ae(1),disabled:!s,children:[o.jsx("svg",{width:"16",height:"16",fill:"currentColor",viewBox:"0 0 20 20",children:o.jsx("path",{fillRule:"evenodd",d:"M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",clipRule:"evenodd"})}),"Search Matches"]}),gn&&o.jsxs("button",{onClick:at,style:{padding:`${f.spacing.sm} ${f.spacing.md}`,border:`1px solid ${f.colors.neutral[300]}`,borderRadius:f.borderRadius.md,backgroundColor:"white",color:f.colors.neutral[600],fontSize:f.typography.fontSize.sm,cursor:"pointer",display:"flex",alignItems:"center",gap:f.spacing.xs},children:[o.jsx("svg",{width:"16",height:"16",fill:"currentColor",viewBox:"0 0 20 20",children:o.jsx("path",{fillRule:"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",clipRule:"evenodd"})}),"Clear Filters"]})]}),d&&o.jsx("select",{value:J,onChange:B=>{ee(B.target.value),Ae(1)},style:{padding:f.spacing.sm,border:`1px solid ${f.colors.neutral[300]}`,borderRadius:f.borderRadius.md,fontSize:f.typography.fontSize.sm,backgroundColor:"white"},children:G.map(B=>o.jsx("option",{value:B.value,children:B.label},B.value))})]})]}),d&&o.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:f.spacing.lg},children:[o.jsx("div",{style:{fontSize:f.typography.fontSize.lg,fontWeight:f.typography.fontWeight.medium,color:f.colors.neutral[900]},children:k?"Searching...":`${N} matches found`}),R>1&&o.jsxs("div",{style:{fontSize:f.typography.fontSize.sm,color:f.colors.neutral[600]},children:["Page ",S," of ",R]})]}),k&&o.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(400px, 1fr))",gap:f.spacing.lg},children:Array.from({length:6}).map((B,Re)=>o.jsx(pc,{},Re))}),!k&&d&&o.jsxs(o.Fragment,{children:[x.length===0?o.jsxs("div",{style:{textAlign:"center",padding:f.spacing["2xl"],backgroundColor:"white",borderRadius:f.borderRadius.lg,border:`1px solid ${f.colors.neutral[200]}`},children:[o.jsx("svg",{width:"64",height:"64",fill:f.colors.neutral[400],viewBox:"0 0 20 20",style:{margin:"0 auto",marginBottom:f.spacing.lg},children:o.jsx("path",{fillRule:"evenodd",d:"M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",clipRule:"evenodd"})}),o.jsx("h3",{style:{fontSize:f.typography.fontSize.xl,fontWeight:f.typography.fontWeight.semibold,color:f.colors.neutral[900],marginBottom:f.spacing.sm},children:"No matches found"}),o.jsx("p",{style:{fontSize:f.typography.fontSize.base,color:f.colors.neutral[600],marginBottom:f.spacing.lg},children:"Try adjusting your search criteria or expanding your location range."}),o.jsx("button",{onClick:at,style:{padding:`${f.spacing.sm} ${f.spacing.lg}`,backgroundColor:f.colors.primary[500],color:"white",border:"none",borderRadius:f.borderRadius.md,fontSize:f.typography.fontSize.sm,fontWeight:f.typography.fontWeight.medium,cursor:"pointer"},children:"Clear All Filters"})]}):o.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(400px, 1fr))",gap:f.spacing.lg},children:x.map((B,Re)=>o.jsx(sv,{match:B,onContact:()=>$t(B),onTeamRequest:()=>Ce(B),isLoading:ge===`team-${B.id}`||ge===`contact-${B.id}`},B.user_id||Re))}),o.jsx(iv,{currentPage:S,totalPages:R,onPageChange:Ae})]}),!d&&!k&&o.jsxs("div",{style:{textAlign:"center",padding:f.spacing["2xl"],backgroundColor:"white",borderRadius:f.borderRadius.lg,border:`1px solid ${f.colors.neutral[200]}`},children:[o.jsx("svg",{width:"80",height:"80",fill:f.colors.primary[400],viewBox:"0 0 20 20",style:{margin:"0 auto",marginBottom:f.spacing.lg},children:o.jsx("path",{d:"M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"})}),o.jsx("h3",{style:{fontSize:f.typography.fontSize["2xl"],fontWeight:f.typography.fontWeight.semibold,color:f.colors.neutral[900],marginBottom:f.spacing.sm},children:"Ready to find your next team member?"}),o.jsx("p",{style:{fontSize:f.typography.fontSize.lg,color:f.colors.neutral[600]},children:"Enter your requirements above and start searching for the perfect match."})]})]})},mt=({width:e="100%",height:t="20px",borderRadius:n="4px",className:r=""})=>o.jsx("div",{className:`skeleton ${r}`,style:{width:e,height:t,borderRadius:n,background:"linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",backgroundSize:"200% 100%",animation:"skeleton-loading 1.5s infinite"}}),Am=({showActions:e=!0})=>o.jsxs("div",{style:{padding:"20px",background:"#fff",borderRadius:"12px",boxShadow:"0 2px 8px rgba(0,0,0,0.08)",marginBottom:"16px"},children:[o.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"16px"},children:[o.jsxs("div",{style:{flex:1},children:[o.jsx(mt,{height:"24px",width:"70%"}),o.jsx("div",{style:{marginTop:"8px"},children:o.jsx(mt,{height:"16px",width:"50%"})})]}),o.jsx("div",{children:o.jsx(mt,{height:"32px",width:"80px",borderRadius:"20px"})})]}),o.jsxs("div",{style:{marginBottom:"12px"},children:[o.jsx(mt,{height:"16px",width:"40%"}),o.jsxs("div",{style:{marginTop:"8px",display:"flex",gap:"8px"},children:[o.jsx(mt,{height:"24px",width:"60px",borderRadius:"12px"}),o.jsx(mt,{height:"24px",width:"80px",borderRadius:"12px"}),o.jsx(mt,{height:"24px",width:"70px",borderRadius:"12px"})]})]}),o.jsxs("div",{style:{marginBottom:"12px"},children:[o.jsx(mt,{height:"16px",width:"30%"}),o.jsx("div",{style:{marginTop:"4px"},children:o.jsx(mt,{height:"16px",width:"60%"})})]}),o.jsx(mt,{height:"14px",width:"45%"}),e&&o.jsxs("div",{style:{marginTop:"16px",display:"flex",gap:"12px"},children:[o.jsx(mt,{height:"36px",width:"120px",borderRadius:"6px"}),o.jsx(mt,{height:"36px",width:"100px",borderRadius:"6px"})]})]}),Mm=()=>o.jsx("style",{children:`
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
  `}),av=({isOpen:e,onClose:t,contactName:n,contactEmail:r,contactPhone:s,onCall:i,onMessage:a})=>e?o.jsx("div",{style:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0, 0, 0, 0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1e3},onClick:t,children:o.jsxs("div",{style:{backgroundColor:"white",borderRadius:"12px",padding:"2rem",maxWidth:"400px",width:"90%",boxShadow:"0 10px 40px rgba(0, 0, 0, 0.2)",position:"relative"},onClick:l=>l.stopPropagation(),children:[o.jsx("button",{onClick:t,style:{position:"absolute",top:"1rem",right:"1rem",background:"none",border:"none",fontSize:"1.5rem",cursor:"pointer",color:"#666",padding:"0.25rem"},children:"×"}),o.jsxs("div",{style:{marginBottom:"1.5rem"},children:[o.jsxs("h3",{style:{margin:"0 0 0.5rem 0",color:"#1976d2",fontSize:"1.3rem"},children:["Contact ",n]}),o.jsx("p",{style:{margin:0,color:"#666",fontSize:"0.9rem"},children:"Choose how you'd like to contact this person:"})]}),o.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[o.jsxs("button",{onClick:i,disabled:!s,style:{display:"flex",alignItems:"center",padding:"1rem",background:s?"#4caf50":"#f5f5f5",color:s?"white":"#999",border:"none",borderRadius:"8px",cursor:s?"pointer":"not-allowed",fontSize:"1rem",transition:"all 0.2s"},children:[o.jsx("span",{style:{fontSize:"1.5rem",marginRight:"1rem"},children:"📞"}),o.jsxs("div",{style:{textAlign:"left",flex:1},children:[o.jsx("div",{style:{fontWeight:"bold"},children:"Call"}),o.jsx("div",{style:{fontSize:"0.85rem",opacity:.8},children:s||"Phone number not available"})]})]}),o.jsxs("button",{onClick:a,style:{display:"flex",alignItems:"center",padding:"1rem",background:"#1976d2",color:"white",border:"none",borderRadius:"8px",cursor:"pointer",fontSize:"1rem",transition:"all 0.2s"},children:[o.jsx("span",{style:{fontSize:"1.5rem",marginRight:"1rem"},children:"💬"}),o.jsxs("div",{style:{textAlign:"left",flex:1},children:[o.jsx("div",{style:{fontWeight:"bold"},children:"Send Message"}),o.jsx("div",{style:{fontSize:"0.85rem",opacity:.8},children:"Send a message via the platform"})]})]}),o.jsxs("button",{onClick:()=>window.open(`mailto:${r}`,"_blank"),style:{display:"flex",alignItems:"center",padding:"1rem",background:"#ff9800",color:"white",border:"none",borderRadius:"8px",cursor:"pointer",fontSize:"1rem",transition:"all 0.2s"},children:[o.jsx("span",{style:{fontSize:"1.5rem",marginRight:"1rem"},children:"📧"}),o.jsxs("div",{style:{textAlign:"left",flex:1},children:[o.jsx("div",{style:{fontWeight:"bold"},children:"Email"}),o.jsx("div",{style:{fontSize:"0.85rem",opacity:.8},children:r})]})]})]}),o.jsx("div",{style:{marginTop:"1.5rem",textAlign:"center"},children:o.jsx("button",{onClick:t,style:{background:"#f5f5f5",color:"#666",border:"none",borderRadius:"6px",padding:"0.5rem 1.5rem",cursor:"pointer",fontSize:"0.9rem"},children:"Cancel"})})]})}):null,hf="/api/matching",lv=({showContactButton:e=!0})=>{const{token:t}=ht(),[n,r]=w.useState([]),[s,i]=w.useState(!1),[a,l]=w.useState(""),[c,u]=w.useState(null),[p,m]=w.useState(""),[g,b]=w.useState(""),[x,v]=w.useState(!1),[k,y]=w.useState(!1),[d,h]=w.useState(null),S=()=>{t&&(i(!0),l(""),fetch(`${hf}/contractor-requirements`,{headers:{Authorization:`Bearer ${t}`}}).then(C=>C.json()).then(C=>{C.success&&Array.isArray(C.data)?r(C.data):l(C.message||"Failed to fetch requirements")}).catch(()=>l("Network error")).finally(()=>i(!1)))};w.useEffect(()=>{S()},[t]);const E=async C=>{if(!p.trim()){alert("Please enter a message");return}v(!0);try{const U=await(await fetch(`${hf}/contact-contractor`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({contractorId:C,message:p})})).json();U.success?(b("✅ Message sent successfully!"),m(""),u(null),setTimeout(()=>b(""),5e3)):alert(`Failed to send message: ${U.message}`)}catch{alert("Network error sending message")}finally{v(!1)}},R=()=>{d!=null&&d.contractor_phone?window.open(`tel:${d.contractor_phone}`,"_self"):alert("Phone number not available for this contractor"),y(!1)},_=()=>{y(!1),d&&u(d.id)},N=()=>{y(!1),h(null)};return o.jsxs("div",{style:{margin:"2rem 0"},children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",marginBottom:"1rem",padding:"1rem",background:"linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",borderRadius:"12px",color:"white"},children:[o.jsx("div",{style:{marginRight:"0.5rem",fontSize:"1.5em"},children:"💼"}),o.jsxs("div",{children:[o.jsx("h3",{style:{margin:0,fontSize:"1.2em"},children:"Available Work Opportunities"}),o.jsx("p",{style:{margin:"4px 0 0 0",fontSize:"0.9em",opacity:.9},children:"Contractors are looking for workers like you!"})]})]}),s&&o.jsxs("div",{children:[o.jsx(Mm,{}),[1,2,3].map(C=>o.jsx(Am,{showActions:!0},C))]}),a&&o.jsxs("div",{style:{color:"#d32f2f",background:"#ffebee",padding:"1rem",borderRadius:"8px",marginBottom:"1rem",border:"1px solid #ffcdd2",textAlign:"center"},children:[o.jsxs("div",{style:{marginBottom:"1rem"},children:["❌ ",a]}),o.jsx("button",{onClick:S,style:{background:"#1976d2",color:"white",border:"none",borderRadius:"6px",padding:"8px 16px",cursor:"pointer",fontSize:"14px"},children:"🔄 Try Again"})]}),!s&&n.length===0&&!a&&o.jsxs("div",{style:{textAlign:"center",padding:"3rem 1rem",background:"#f8f9fa",borderRadius:"12px",color:"#666"},children:[o.jsx("div",{style:{fontSize:"3em",marginBottom:"1rem"},children:"📋"}),o.jsx("h4",{style:{margin:"0 0 0.5rem 0"},children:"No opportunities available right now"}),o.jsx("p",{style:{margin:0,fontSize:"0.9em"},children:"Check back later or update your profile to get matched with contractors!"})]}),o.jsx("ul",{style:{listStyle:"none",padding:0},children:n.map(C=>{var P;return o.jsxs("li",{style:{background:"#f7f9fc",marginBottom:16,padding:20,borderRadius:12,boxShadow:"0 2px 8px rgba(0,0,0,0.08)",border:"1px solid #e3f2fd"},children:[o.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12},children:[o.jsxs("div",{children:[o.jsxs("div",{style:{fontSize:"1.1em",fontWeight:"bold",color:"#1976d2",marginBottom:4},children:[C.contractor_name||((P=C.contractor_email)==null?void 0:P.split("@")[0])||"Contractor"," is looking for workers"]}),o.jsx("div",{style:{fontSize:"0.9em",color:"#666"},children:C.contractor_email||`ID: ${C.contractor_id.substring(0,8)}...`})]}),o.jsxs("div",{style:{background:"#1976d2",color:"white",padding:"4px 12px",borderRadius:"20px",fontSize:"0.9em",fontWeight:"bold"},children:[C.required_workers," worker",C.required_workers!==1?"s":""," needed"]})]}),C.skills&&C.skills.length>0&&o.jsxs("div",{style:{marginBottom:8},children:[o.jsx("strong",{style:{color:"#333"},children:"Skills Required:"}),o.jsx("div",{style:{marginTop:4},children:C.skills.map(U=>o.jsx("span",{style:{display:"inline-block",background:"#e8f5e8",color:"#2e7d32",padding:"2px 8px",borderRadius:"12px",fontSize:"0.85em",marginRight:6,marginBottom:4},children:U},U))})]}),C.location&&o.jsxs("div",{style:{marginBottom:8},children:[o.jsx("strong",{style:{color:"#333"},children:"📍 Location:"})," ",C.location]}),C.notes&&o.jsxs("div",{style:{marginBottom:8},children:[o.jsx("strong",{style:{color:"#333"},children:"📝 Additional Notes:"}),o.jsx("div",{style:{marginTop:4,padding:"8px 12px",background:"#f5f5f5",borderRadius:"6px",fontSize:"0.9em",fontStyle:"italic"},children:C.notes})]}),o.jsxs("div",{style:{fontSize:"0.8em",color:"#888",marginTop:8,marginBottom:12},children:["🕒 Posted: ",C.created_at?new Date(C.created_at).toLocaleString():"N/A"]}),e&&o.jsx("div",{style:{marginTop:8},children:o.jsx("button",{onClick:()=>{h(C),y(!0)},style:{background:"#1976d2",color:"white",border:"none",borderRadius:6,padding:"6px 16px",cursor:"pointer",display:"flex",alignItems:"center",gap:"6px"},children:"📞 Contact"})})]},C.id)})}),g&&o.jsx("div",{style:{color:"#2e7d32",background:"#e8f5e8",padding:"1rem",borderRadius:"8px",marginTop:"1rem",border:"1px solid #c8e6c9",textAlign:"center",fontSize:"1.1em"},children:g}),o.jsx(av,{isOpen:k,onClose:N,contactName:(d==null?void 0:d.contractor_name)||"Contractor",contactEmail:(d==null?void 0:d.contractor_email)||"",contactPhone:d==null?void 0:d.contractor_phone,onCall:R,onMessage:_}),c&&o.jsx("div",{style:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0, 0, 0, 0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1e3},onClick:()=>u(null),children:o.jsxs("div",{style:{backgroundColor:"white",borderRadius:"12px",padding:"2rem",maxWidth:"500px",width:"90%",boxShadow:"0 10px 40px rgba(0, 0, 0, 0.2)"},onClick:C=>C.stopPropagation(),children:[o.jsx("h3",{style:{margin:"0 0 1rem 0",color:"#1976d2"},children:"Send Message"}),o.jsx("textarea",{value:p,onChange:C=>m(C.target.value),placeholder:"Enter your message to the contractor...",rows:4,style:{width:"100%",marginBottom:"1rem",padding:"0.75rem",border:"1px solid #ddd",borderRadius:"8px",fontSize:"14px",resize:"vertical"}}),o.jsxs("div",{style:{display:"flex",gap:"1rem",justifyContent:"flex-end"},children:[o.jsx("button",{onClick:()=>u(null),style:{background:"#f5f5f5",color:"#666",border:"none",borderRadius:"6px",padding:"0.75rem 1.5rem",cursor:"pointer"},children:"Cancel"}),o.jsx("button",{onClick:()=>d&&E(d.contractor_id),disabled:x||!p.trim(),style:{background:x||!p.trim()?"#ccc":"#1976d2",color:"white",border:"none",borderRadius:"6px",padding:"0.75rem 1.5rem",cursor:x||!p.trim()?"not-allowed":"pointer"},children:x?"Sending...":"Send Message"})]})]})})]})},cv="/api/matching/my-team",uv=()=>{const{token:e}=ht(),[t,n]=w.useState([]),[r,s]=w.useState(""),[i,a]=w.useState(!1),[l,c]=w.useState("all"),u=async()=>{if(s(""),a(!0),!e){s("Please log in to view your team members"),a(!1);return}try{const g=await fetch(cv,{credentials:"include",headers:e?{Authorization:`Bearer ${e}`}:{}});if(!g.ok)throw new Error(`HTTP ${g.status}: ${g.statusText}`);const b=await g.json();if(console.log("MyTeamPage: Response data:",b),b.success&&Array.isArray(b.data))n(b.data);else if(b.data&&Array.isArray(b.data))n(b.data);else if(Array.isArray(b))n(b);else if(b.message&&(b.message.includes("Found")&&b.message.includes("team member")||b.message.includes("No team members")||b.message.includes("empty")))n([]);else{if(b.message&&(b.message.includes("error")||b.message.includes("failed")||b.message.includes("unauthorized")))throw new Error(b.message);console.warn("MyTeamPage: Unknown response format:",b),n([])}}catch(g){console.error("MyTeamPage: Network/Fetch Error:",g);const b=g instanceof Error?g.message:"Unknown error";s(`Network error: ${b}. Please check if backend services are running.`)}finally{a(!1)}};w.useEffect(()=>{console.log("MyTeamPage: useEffect running, token exists:",!!e),u()},[e]);const p=t.filter(g=>l==="all"?!0:l==="available"?g.isAvailable===!0:l==="busy"?g.isAvailable===!1||g.isAvailable===null||g.isAvailable===void 0:!0),m=g=>g===!0?o.jsx("span",{style:{display:"inline-block",padding:"0.2rem 0.6rem",borderRadius:"12px",fontSize:"0.85rem",fontWeight:"600",background:"#4caf50",color:"white",marginLeft:"0.5rem"},children:"Available"}):g===!1?o.jsx("span",{style:{display:"inline-block",padding:"0.2rem 0.6rem",borderRadius:"12px",fontSize:"0.85rem",fontWeight:"600",background:"#f44336",color:"white",marginLeft:"0.5rem"},children:"Busy"}):o.jsx("span",{style:{display:"inline-block",padding:"0.2rem 0.6rem",borderRadius:"12px",fontSize:"0.85rem",fontWeight:"600",background:"#9e9e9e",color:"white",marginLeft:"0.5rem"},children:"N/A"});return o.jsxs(o.Fragment,{children:[o.jsx("style",{children:`
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
      `}),o.jsx("div",{className:"myteam-bg",children:o.jsxs("div",{className:"myteam-container",children:[o.jsx("div",{className:"myteam-header",children:"My Team"}),r&&o.jsxs("div",{style:{background:"#ffebee",color:"#d32f2f",padding:"1rem",borderRadius:"8px",textAlign:"center",marginBottom:"1rem",border:"1px solid #ffcdd2"},children:[o.jsxs("div",{style:{marginBottom:"1rem"},children:["❌ ",r]}),o.jsx("button",{onClick:u,style:{background:"#1976d2",color:"white",border:"none",borderRadius:"6px",padding:"8px 16px",cursor:"pointer",fontSize:"14px"},children:"🔄 Try Again"})]}),o.jsxs("div",{className:"filter-buttons",children:[o.jsxs("button",{className:`filter-btn ${l==="all"?"active":""}`,onClick:()=>c("all"),children:["All (",t.length,")"]}),o.jsxs("button",{className:`filter-btn ${l==="available"?"active":""}`,onClick:()=>c("available"),children:["Available (",t.filter(g=>g.isAvailable===!0).length,")"]}),o.jsxs("button",{className:`filter-btn ${l==="busy"?"active":""}`,onClick:()=>c("busy"),children:["Busy (",t.filter(g=>g.isAvailable===!1||g.isAvailable===null||g.isAvailable===void 0).length,")"]})]}),o.jsxs("ul",{className:"myteam-list",children:[i&&o.jsxs(o.Fragment,{children:[o.jsx(Mm,{}),[1,2,3,4].map(g=>o.jsx("li",{style:{listStyle:"none"},children:o.jsx(Am,{showActions:!1})},g))]}),!i&&p.length===0&&!r&&o.jsx("li",{style:{textAlign:"center",color:"#888",justifyContent:"center"},children:l==="all"?"No team members found.":`No ${l} team members found.`}),!i&&p.map((g,b)=>o.jsxs("li",{children:[o.jsxs("div",{children:[o.jsx("strong",{children:g.name}),g.profile_info&&o.jsxs(o.Fragment,{children:[" — ",g.profile_info]}),o.jsxs("div",{style:{fontSize:"0.85em",color:"#666",marginTop:"4px"},children:[g.role," • ",g.location," • Rating: ",g.rating||"N/A"]})]}),m(g.isAvailable)]},g.team_member_record_id||b))]}),o.jsx(lv,{showContactButton:!0})]})})]})},Fm=w.createContext(void 0),dv=({children:e})=>{const[t,n]=w.useState([]);w.useEffect(()=>{const s=new WebSocket("ws://localhost:3004/ws");return s.onmessage=i=>{const a=JSON.parse(i.data);n(l=>[...l,a])},()=>s.close()},[]);const r=(s,i)=>{const a=new WebSocket("ws://localhost:3004/ws");a.onopen=()=>{a.send(JSON.stringify({to:s,content:i})),a.close()}};return o.jsx(Fm.Provider,{value:{messages:t,sendMessage:r},children:e})},Dm=()=>{const e=w.useContext(Fm);if(!e)throw new Error("useMessages must be used within MessageProvider");return e},fv=()=>{const{messages:e}=Dm();return o.jsxs(o.Fragment,{children:[o.jsx("style",{children:`
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
      `}),o.jsxs("div",{className:"msg-list-container",children:[o.jsx("div",{className:"msg-list-header",children:"Messages"}),o.jsx("ul",{className:"msg-list-ul",children:e.map((t,n)=>o.jsxs("li",{className:"msg-list-li",children:[o.jsxs("span",{className:"msg-list-from",children:[t.from,":"]}),o.jsx("span",{className:"msg-list-content",children:t.content}),o.jsx("div",{className:"msg-list-timestamp",children:new Date(t.timestamp).toLocaleString()})]},t.id||n))})]})]})},pv=()=>{const{sendMessage:e}=Dm(),[t,n]=w.useState(""),[r,s]=w.useState(""),i=a=>{a.preventDefault(),t&&r&&(e(t,r),s(""))};return o.jsxs(o.Fragment,{children:[o.jsx("style",{children:`
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
      `}),o.jsxs("form",{className:"msg-input-form",onSubmit:i,children:[o.jsx("input",{type:"text",placeholder:"Recipient",value:t,onChange:a=>n(a.target.value),required:!0,style:{flex:1}}),o.jsx("input",{type:"text",placeholder:"Message",value:r,onChange:a=>s(a.target.value),required:!0,style:{flex:2}}),o.jsx("button",{type:"submit",children:"Send"})]})]})},hv=()=>o.jsx(dv,{children:o.jsxs("div",{style:{minHeight:"100vh",background:"#f5f7fa",paddingBottom:"2rem"},children:[o.jsx(fv,{}),o.jsx(pv,{})]})}),mv="_homeRoot_1w478_1",gv="_leftSection_1w478_12",yv="_buttonRow_1w478_29",xv="_rightSection_1w478_34",vv="_fortImage_1w478_50",Ir={homeRoot:mv,leftSection:gv,buttonRow:yv,rightSection:xv,fortImage:vv},mf=()=>o.jsxs("div",{className:Ir.homeRoot,children:[o.jsxs("div",{className:Ir.leftSection,children:[o.jsxs("div",{style:{background:"#f5ecd6",borderRadius:12,padding:"1.2rem 1.5rem",marginBottom:28,boxShadow:"0 2px 8px #e9d8a633",textAlign:"center"},children:[o.jsxs("h1",{style:{fontSize:"2.4rem",fontWeight:700,marginBottom:16,color:"#222",lineHeight:1.2},children:["Connecting People.",o.jsx("br",{}),"Creating Success."]}),o.jsx("p",{style:{fontSize:"1.15rem",color:"#555",marginBottom:0},children:"Welcome! Find the best matches for your needs, chat in real time, and manage your saved connections."})]}),o.jsxs("div",{className:Ir.buttonRow,children:[o.jsx(we,{to:"/search",children:o.jsx("button",{style:{padding:"0.85rem 2.2rem",fontSize:"1.08rem",borderRadius:10,border:"none",background:"#c97d60",color:"#fff",fontWeight:600,boxShadow:"0 2px 8px #c97d6022",cursor:"pointer",transition:"background 0.2s"},children:"Find Matches"})}),o.jsx(we,{to:"/messages",children:o.jsx("button",{style:{padding:"0.85rem 2.2rem",fontSize:"1.08rem",borderRadius:10,border:"none",background:"#a5a58d",color:"#fff",fontWeight:600,boxShadow:"0 2px 8px #a5a58d22",cursor:"pointer",transition:"background 0.2s"},children:"Messages"})})]})]}),o.jsxs("div",{className:Ir.rightSection,children:[o.jsx("img",{src:"/staff/images/fort1.png",alt:"Fort 1",className:Ir.fortImage}),o.jsx("img",{src:"/staff/images/fort2.png",alt:"Fort 2",className:Ir.fortImage})]})]}),fo=({title:e,value:t,icon:n,trend:r,color:s})=>o.jsxs("div",{style:{padding:f.spacing.lg,backgroundColor:"white",borderRadius:f.borderRadius.lg,boxShadow:f.shadows.sm,border:`1px solid ${f.colors.neutral[200]}`,position:"relative",overflow:"hidden"},children:[o.jsx("div",{style:{position:"absolute",top:0,left:0,width:"4px",height:"100%",backgroundColor:s}}),o.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:f.spacing.sm},children:[o.jsx("div",{style:{color:f.colors.neutral[600],fontSize:f.typography.fontSize.sm,fontWeight:f.typography.fontWeight.medium},children:e}),o.jsx("div",{style:{color:s,opacity:.8},children:n})]}),o.jsx("div",{style:{fontSize:f.typography.fontSize["3xl"],fontWeight:f.typography.fontWeight.bold,color:f.colors.neutral[900],marginBottom:f.spacing.xs},children:t}),r&&o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:f.spacing.xs,fontSize:f.typography.fontSize.sm,color:r.isPositive?f.colors.success[600]:f.colors.danger[600]},children:[o.jsx("span",{children:r.isPositive?"↗":"↘"}),o.jsxs("span",{children:[Math.abs(r.value),"% vs last month"]})]})]}),bv=({title:e,description:t,icon:n,onClick:r,color:s})=>o.jsx("div",{onClick:r,style:{padding:f.spacing.lg,backgroundColor:"white",borderRadius:f.borderRadius.lg,boxShadow:f.shadows.sm,border:`1px solid ${f.colors.neutral[200]}`,cursor:"pointer",transition:"all 0.2s ease-in-out"},onMouseEnter:i=>{i.currentTarget.style.boxShadow=f.shadows.md,i.currentTarget.style.transform="translateY(-2px)"},onMouseLeave:i=>{i.currentTarget.style.boxShadow=f.shadows.sm,i.currentTarget.style.transform="translateY(0)"},children:o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:f.spacing.md,marginBottom:f.spacing.sm},children:[o.jsx("div",{style:{width:"48px",height:"48px",borderRadius:f.borderRadius.lg,backgroundColor:`${s}20`,display:"flex",alignItems:"center",justifyContent:"center",color:s},children:n}),o.jsxs("div",{children:[o.jsx("div",{style:{fontSize:f.typography.fontSize.lg,fontWeight:f.typography.fontWeight.semibold,color:f.colors.neutral[900],marginBottom:f.spacing.xs},children:e}),o.jsx("div",{style:{fontSize:f.typography.fontSize.sm,color:f.colors.neutral[600]},children:t})]})]})}),wv=({type:e,title:t,description:n,time:r,avatar:s})=>{const i=()=>{switch(e){case"request":return f.colors.warning[500];case"connection":return f.colors.success[500];case"message":return f.colors.primary[500];default:return f.colors.neutral[500]}},a=()=>{switch(e){case"request":return o.jsx("svg",{width:"16",height:"16",fill:"currentColor",viewBox:"0 0 20 20",children:o.jsx("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z",clipRule:"evenodd"})});case"connection":return o.jsx("svg",{width:"16",height:"16",fill:"currentColor",viewBox:"0 0 20 20",children:o.jsx("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",clipRule:"evenodd"})});case"message":return o.jsxs("svg",{width:"16",height:"16",fill:"currentColor",viewBox:"0 0 20 20",children:[o.jsx("path",{d:"M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"}),o.jsx("path",{d:"M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"})]});default:return null}};return o.jsxs("div",{style:{display:"flex",gap:f.spacing.md,padding:f.spacing.md,borderBottom:`1px solid ${f.colors.neutral[100]}`},children:[o.jsx("div",{style:{width:"32px",height:"32px",borderRadius:"50%",backgroundColor:s?"transparent":`${i()}20`,display:"flex",alignItems:"center",justifyContent:"center",color:i(),flexShrink:0,backgroundImage:s?`url(${s})`:void 0,backgroundSize:"cover",backgroundPosition:"center"},children:!s&&a()}),o.jsxs("div",{style:{flex:1},children:[o.jsx("div",{style:{fontSize:f.typography.fontSize.sm,fontWeight:f.typography.fontWeight.medium,color:f.colors.neutral[900],marginBottom:f.spacing.xs},children:t}),o.jsx("div",{style:{fontSize:f.typography.fontSize.sm,color:f.colors.neutral[600],marginBottom:f.spacing.xs},children:n}),o.jsx("div",{style:{fontSize:f.typography.fontSize.xs,color:f.colors.neutral[500]},children:r})]})]})},Sv=()=>{const{token:e}=ht(),{error:t,success:n}=Lu(),[r,s]=w.useState([]),[i,a]=w.useState([]),[l,c]=w.useState({totalConnections:0,pendingRequests:0,activeProjects:0,profileViews:0}),[u,p]=w.useState(!0),[m,g]=w.useState(null),b=w.useCallback(async()=>{if(e)try{p(!0);const d=await xr(`${At.MATCHING_SERVICE}/team-requests/received`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}),h=await xr(`${At.MATCHING_SERVICE}/my-team`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(d.ok){const S=await d.json();S.success&&S.data&&S.data.requests?s(S.data.requests):s([])}if(h.ok){const S=await h.json();S.success&&S.data&&S.data.teamMembers?a(S.data.teamMembers):a([])}c({totalConnections:i.length,pendingRequests:r.length,activeProjects:Math.floor(Math.random()*5)+1,profileViews:Math.floor(Math.random()*100)+50})}catch(d){console.error("Error fetching dashboard data:",d),t("Failed to load dashboard data","Please try refreshing the page"),s([]),a([])}finally{p(!1)}},[e,r.length,i.length,t]);w.useEffect(()=>{b()},[b]);const x=async(d,h)=>{if(e){g(d);try{if((await xr(`${At.MATCHING_SERVICE}/team-requests/${d}`,{method:"PUT",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({status:h})})).ok)n(`Request ${h}`,`Team request has been ${h} successfully`),await b();else throw new Error(`Failed to ${h} request`)}catch(S){console.error(`Error ${h} request:`,S),t(`Failed to ${h} request`,"Please try again")}finally{g(null)}}},v=d=>new Date(d).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),k=[{title:"Find Matches",description:"Discover new team members",icon:o.jsx("svg",{width:"24",height:"24",fill:"currentColor",viewBox:"0 0 20 20",children:o.jsx("path",{fillRule:"evenodd",d:"M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",clipRule:"evenodd"})}),onClick:()=>window.location.href="/search",color:f.colors.primary[500]},{title:"Send Invitation",description:"Invite someone to join your team",icon:o.jsx("svg",{width:"24",height:"24",fill:"currentColor",viewBox:"0 0 20 20",children:o.jsx("path",{d:"M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"})}),onClick:()=>window.location.href="/profile",color:f.colors.success[500]},{title:"View Messages",description:"Check your conversations",icon:o.jsxs("svg",{width:"24",height:"24",fill:"currentColor",viewBox:"0 0 20 20",children:[o.jsx("path",{d:"M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"}),o.jsx("path",{d:"M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"})]}),onClick:()=>window.location.href="/messages",color:f.colors.warning[500]},{title:"Update Profile",description:"Keep your profile current",icon:o.jsx("svg",{width:"24",height:"24",fill:"currentColor",viewBox:"0 0 20 20",children:o.jsx("path",{fillRule:"evenodd",d:"M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z",clipRule:"evenodd"})}),onClick:()=>window.location.href="/profile",color:f.colors.primary[600]}],y=[{type:"connection",title:"New team member added",description:"John Doe joined your team",time:"2 hours ago"},{type:"request",title:"Team request received",description:"Jane Smith wants to join your project",time:"4 hours ago"},{type:"message",title:"New message",description:"You have 3 unread messages",time:"6 hours ago"}];return u?o.jsxs("div",{style:{maxWidth:"1200px",margin:"0 auto",padding:f.spacing.xl,backgroundColor:f.colors.neutral[50],minHeight:"100vh"},children:[o.jsx("div",{style:{marginBottom:f.spacing.xl},children:o.jsx(nv,{})}),o.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:f.spacing.lg},children:[o.jsx(pc,{}),o.jsx(pc,{})]})]}):o.jsxs("div",{style:{maxWidth:"1200px",margin:"0 auto",padding:f.spacing.xl,backgroundColor:f.colors.neutral[50],minHeight:"100vh"},children:[o.jsxs("div",{style:{textAlign:"center",marginBottom:f.spacing.xl},children:[o.jsx("h1",{style:{fontSize:f.typography.fontSize["4xl"],fontWeight:f.typography.fontWeight.bold,color:f.colors.neutral[900],marginBottom:f.spacing.sm},children:"Welcome to Your Dashboard"}),o.jsx("p",{style:{fontSize:f.typography.fontSize.lg,color:f.colors.neutral[600]},children:"Manage your team connections and track your progress"})]}),o.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))",gap:f.spacing.lg,marginBottom:f.spacing.xl},children:[o.jsx(fo,{title:"Total Connections",value:l.totalConnections,icon:o.jsx("svg",{width:"24",height:"24",fill:"currentColor",viewBox:"0 0 20 20",children:o.jsx("path",{d:"M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"})}),trend:{value:15,isPositive:!0},color:f.colors.primary[500]}),o.jsx(fo,{title:"Pending Requests",value:l.pendingRequests,icon:o.jsx("svg",{width:"24",height:"24",fill:"currentColor",viewBox:"0 0 20 20",children:o.jsx("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z",clipRule:"evenodd"})}),color:l.pendingRequests>0?f.colors.warning[500]:f.colors.success[500]}),o.jsx(fo,{title:"Active Projects",value:l.activeProjects,icon:o.jsx("svg",{width:"24",height:"24",fill:"currentColor",viewBox:"0 0 20 20",children:o.jsx("path",{d:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"})}),trend:{value:8,isPositive:!0},color:f.colors.success[500]}),o.jsx(fo,{title:"Profile Views",value:l.profileViews,icon:o.jsxs("svg",{width:"24",height:"24",fill:"currentColor",viewBox:"0 0 20 20",children:[o.jsx("path",{d:"M10 12a2 2 0 100-4 2 2 0 000 4z"}),o.jsx("path",{fillRule:"evenodd",d:"M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z",clipRule:"evenodd"})]}),trend:{value:23,isPositive:!0},color:f.colors.primary[600]})]}),o.jsxs("div",{style:{marginBottom:f.spacing.xl},children:[o.jsx("h2",{style:{fontSize:f.typography.fontSize["2xl"],fontWeight:f.typography.fontWeight.semibold,color:f.colors.neutral[900],marginBottom:f.spacing.lg},children:"Quick Actions"}),o.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:f.spacing.lg},children:k.map((d,h)=>o.jsx(bv,{...d},h))})]}),o.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(400px, 1fr))",gap:f.spacing.xl},children:[o.jsxs("div",{style:{backgroundColor:"white",borderRadius:f.borderRadius.lg,boxShadow:f.shadows.sm,border:`1px solid ${f.colors.neutral[200]}`},children:[o.jsx("div",{style:{padding:f.spacing.lg,borderBottom:`1px solid ${f.colors.neutral[200]}`},children:o.jsxs("h3",{style:{fontSize:f.typography.fontSize.xl,fontWeight:f.typography.fontWeight.semibold,color:f.colors.neutral[900]},children:["Pending Team Requests (",r.length,")"]})}),o.jsx("div",{style:{maxHeight:"400px",overflowY:"auto"},children:r.length===0?o.jsxs("div",{style:{padding:f.spacing.xl,textAlign:"center",color:f.colors.neutral[500]},children:[o.jsx("svg",{width:"48",height:"48",fill:"currentColor",viewBox:"0 0 20 20",style:{margin:"0 auto",marginBottom:f.spacing.md,opacity:.5},children:o.jsx("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",clipRule:"evenodd"})}),o.jsx("p",{children:"No pending requests"})]}):r.map(d=>o.jsxs("div",{style:{padding:f.spacing.lg,borderBottom:`1px solid ${f.colors.neutral[100]}`},children:[o.jsx("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:f.spacing.sm},children:o.jsxs("div",{children:[o.jsx("div",{style:{fontSize:f.typography.fontSize.lg,fontWeight:f.typography.fontWeight.semibold,color:f.colors.neutral[900],marginBottom:f.spacing.xs},children:d.sender_name}),d.sender_company&&o.jsx("div",{style:{fontSize:f.typography.fontSize.sm,color:f.colors.neutral[600],marginBottom:f.spacing.xs},children:d.sender_company}),o.jsx("div",{style:{fontSize:f.typography.fontSize.xs,color:f.colors.neutral[500]},children:v(d.created_at)})]})}),o.jsx("div",{style:{fontSize:f.typography.fontSize.sm,color:f.colors.neutral[700],marginBottom:f.spacing.md,padding:f.spacing.sm,backgroundColor:f.colors.neutral[50],borderRadius:f.borderRadius.sm,borderLeft:`3px solid ${f.colors.primary[500]}`},children:d.message}),o.jsxs("div",{style:{display:"flex",gap:f.spacing.sm},children:[o.jsx(wi,{isLoading:m===d.id,variant:"primary",size:"sm",onClick:()=>x(d.id,"accepted"),children:"Accept"}),o.jsx(wi,{isLoading:m===d.id,variant:"outline",size:"sm",onClick:()=>x(d.id,"rejected"),children:"Decline"})]})]},d.id))})]}),o.jsxs("div",{style:{backgroundColor:"white",borderRadius:f.borderRadius.lg,boxShadow:f.shadows.sm,border:`1px solid ${f.colors.neutral[200]}`},children:[o.jsx("div",{style:{padding:f.spacing.lg,borderBottom:`1px solid ${f.colors.neutral[200]}`},children:o.jsx("h3",{style:{fontSize:f.typography.fontSize.xl,fontWeight:f.typography.fontWeight.semibold,color:f.colors.neutral[900]},children:"Recent Activity"})}),o.jsx("div",{style:{maxHeight:"400px",overflowY:"auto"},children:y.map((d,h)=>o.jsx(wv,{...d},h))})]})]})]})};function $m(e,t){return function(){return e.apply(t,arguments)}}const{toString:kv}=Object.prototype,{getPrototypeOf:Ou}=Object,{iterator:Na,toStringTag:Bm}=Symbol,Ra=(e=>t=>{const n=kv.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),Dt=e=>(e=e.toLowerCase(),t=>Ra(t)===e),Pa=e=>t=>typeof t===e,{isArray:Ts}=Array,ws=Pa("undefined");function Wi(e){return e!==null&&!ws(e)&&e.constructor!==null&&!ws(e.constructor)&&ot(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const Um=Dt("ArrayBuffer");function jv(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&Um(e.buffer),t}const Cv=Pa("string"),ot=Pa("function"),Wm=Pa("number"),Hi=e=>e!==null&&typeof e=="object",Ev=e=>e===!0||e===!1,_o=e=>{if(Ra(e)!=="object")return!1;const t=Ou(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Bm in e)&&!(Na in e)},_v=e=>{if(!Hi(e)||Wi(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},Tv=Dt("Date"),Nv=Dt("File"),Rv=Dt("Blob"),Pv=Dt("FileList"),zv=e=>Hi(e)&&ot(e.pipe),Lv=e=>{let t;return e&&(typeof FormData=="function"&&e instanceof FormData||ot(e.append)&&((t=Ra(e))==="formdata"||t==="object"&&ot(e.toString)&&e.toString()==="[object FormData]"))},Ov=Dt("URLSearchParams"),[Iv,Av,Mv,Fv]=["ReadableStream","Request","Response","Headers"].map(Dt),Dv=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function Vi(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let r,s;if(typeof e!="object"&&(e=[e]),Ts(e))for(r=0,s=e.length;r<s;r++)t.call(null,e[r],r,e);else{if(Wi(e))return;const i=n?Object.getOwnPropertyNames(e):Object.keys(e),a=i.length;let l;for(r=0;r<a;r++)l=i[r],t.call(null,e[l],l,e)}}function Hm(e,t){if(Wi(e))return null;t=t.toLowerCase();const n=Object.keys(e);let r=n.length,s;for(;r-- >0;)if(s=n[r],t===s.toLowerCase())return s;return null}const sr=(()=>typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global)(),Vm=e=>!ws(e)&&e!==sr;function hc(){const{caseless:e,skipUndefined:t}=Vm(this)&&this||{},n={},r=(s,i)=>{const a=e&&Hm(n,i)||i;_o(n[a])&&_o(s)?n[a]=hc(n[a],s):_o(s)?n[a]=hc({},s):Ts(s)?n[a]=s.slice():(!t||!ws(s))&&(n[a]=s)};for(let s=0,i=arguments.length;s<i;s++)arguments[s]&&Vi(arguments[s],r);return n}const $v=(e,t,n,{allOwnKeys:r}={})=>(Vi(t,(s,i)=>{n&&ot(s)?e[i]=$m(s,n):e[i]=s},{allOwnKeys:r}),e),Bv=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),Uv=(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},Wv=(e,t,n,r)=>{let s,i,a;const l={};if(t=t||{},e==null)return t;do{for(s=Object.getOwnPropertyNames(e),i=s.length;i-- >0;)a=s[i],(!r||r(a,e,t))&&!l[a]&&(t[a]=e[a],l[a]=!0);e=n!==!1&&Ou(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},Hv=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const r=e.indexOf(t,n);return r!==-1&&r===n},Vv=e=>{if(!e)return null;if(Ts(e))return e;let t=e.length;if(!Wm(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},qv=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&Ou(Uint8Array)),Qv=(e,t)=>{const r=(e&&e[Na]).call(e);let s;for(;(s=r.next())&&!s.done;){const i=s.value;t.call(e,i[0],i[1])}},Kv=(e,t)=>{let n;const r=[];for(;(n=e.exec(t))!==null;)r.push(n);return r},Yv=Dt("HTMLFormElement"),Jv=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,r,s){return r.toUpperCase()+s}),gf=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),Xv=Dt("RegExp"),qm=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),r={};Vi(n,(s,i)=>{let a;(a=t(s,i,e))!==!1&&(r[i]=a||s)}),Object.defineProperties(e,r)},Gv=e=>{qm(e,(t,n)=>{if(ot(e)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const r=e[n];if(ot(r)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},Zv=(e,t)=>{const n={},r=s=>{s.forEach(i=>{n[i]=!0})};return Ts(e)?r(e):r(String(e).split(t)),n},eb=()=>{},tb=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function nb(e){return!!(e&&ot(e.append)&&e[Bm]==="FormData"&&e[Na])}const rb=e=>{const t=new Array(10),n=(r,s)=>{if(Hi(r)){if(t.indexOf(r)>=0)return;if(Wi(r))return r;if(!("toJSON"in r)){t[s]=r;const i=Ts(r)?[]:{};return Vi(r,(a,l)=>{const c=n(a,s+1);!ws(c)&&(i[l]=c)}),t[s]=void 0,i}}return r};return n(e,0)},sb=Dt("AsyncFunction"),ib=e=>e&&(Hi(e)||ot(e))&&ot(e.then)&&ot(e.catch),Qm=((e,t)=>e?setImmediate:t?((n,r)=>(sr.addEventListener("message",({source:s,data:i})=>{s===sr&&i===n&&r.length&&r.shift()()},!1),s=>{r.push(s),sr.postMessage(n,"*")}))(`axios@${Math.random()}`,[]):n=>setTimeout(n))(typeof setImmediate=="function",ot(sr.postMessage)),ob=typeof queueMicrotask<"u"?queueMicrotask.bind(sr):typeof process<"u"&&process.nextTick||Qm,ab=e=>e!=null&&ot(e[Na]),T={isArray:Ts,isArrayBuffer:Um,isBuffer:Wi,isFormData:Lv,isArrayBufferView:jv,isString:Cv,isNumber:Wm,isBoolean:Ev,isObject:Hi,isPlainObject:_o,isEmptyObject:_v,isReadableStream:Iv,isRequest:Av,isResponse:Mv,isHeaders:Fv,isUndefined:ws,isDate:Tv,isFile:Nv,isBlob:Rv,isRegExp:Xv,isFunction:ot,isStream:zv,isURLSearchParams:Ov,isTypedArray:qv,isFileList:Pv,forEach:Vi,merge:hc,extend:$v,trim:Dv,stripBOM:Bv,inherits:Uv,toFlatObject:Wv,kindOf:Ra,kindOfTest:Dt,endsWith:Hv,toArray:Vv,forEachEntry:Qv,matchAll:Kv,isHTMLForm:Yv,hasOwnProperty:gf,hasOwnProp:gf,reduceDescriptors:qm,freezeMethods:Gv,toObjectSet:Zv,toCamelCase:Jv,noop:eb,toFiniteNumber:tb,findKey:Hm,global:sr,isContextDefined:Vm,isSpecCompliantForm:nb,toJSONObject:rb,isAsyncFn:sb,isThenable:ib,setImmediate:Qm,asap:ob,isIterable:ab};function V(e,t,n,r,s){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=e,this.name="AxiosError",t&&(this.code=t),n&&(this.config=n),r&&(this.request=r),s&&(this.response=s,this.status=s.status?s.status:null)}T.inherits(V,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:T.toJSONObject(this.config),code:this.code,status:this.status}}});const Km=V.prototype,Ym={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(e=>{Ym[e]={value:e}});Object.defineProperties(V,Ym);Object.defineProperty(Km,"isAxiosError",{value:!0});V.from=(e,t,n,r,s,i)=>{const a=Object.create(Km);T.toFlatObject(e,a,function(p){return p!==Error.prototype},u=>u!=="isAxiosError");const l=e&&e.message?e.message:"Error",c=t==null&&e?e.code:t;return V.call(a,l,c,n,r,s),e&&a.cause==null&&Object.defineProperty(a,"cause",{value:e,configurable:!0}),a.name=e&&e.name||"Error",i&&Object.assign(a,i),a};const lb=null;function mc(e){return T.isPlainObject(e)||T.isArray(e)}function Jm(e){return T.endsWith(e,"[]")?e.slice(0,-2):e}function yf(e,t,n){return e?e.concat(t).map(function(s,i){return s=Jm(s),!n&&i?"["+s+"]":s}).join(n?".":""):t}function cb(e){return T.isArray(e)&&!e.some(mc)}const ub=T.toFlatObject(T,{},null,function(t){return/^is[A-Z]/.test(t)});function za(e,t,n){if(!T.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,n=T.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(v,k){return!T.isUndefined(k[v])});const r=n.metaTokens,s=n.visitor||p,i=n.dots,a=n.indexes,c=(n.Blob||typeof Blob<"u"&&Blob)&&T.isSpecCompliantForm(t);if(!T.isFunction(s))throw new TypeError("visitor must be a function");function u(x){if(x===null)return"";if(T.isDate(x))return x.toISOString();if(T.isBoolean(x))return x.toString();if(!c&&T.isBlob(x))throw new V("Blob is not supported. Use a Buffer instead.");return T.isArrayBuffer(x)||T.isTypedArray(x)?c&&typeof Blob=="function"?new Blob([x]):Buffer.from(x):x}function p(x,v,k){let y=x;if(x&&!k&&typeof x=="object"){if(T.endsWith(v,"{}"))v=r?v:v.slice(0,-2),x=JSON.stringify(x);else if(T.isArray(x)&&cb(x)||(T.isFileList(x)||T.endsWith(v,"[]"))&&(y=T.toArray(x)))return v=Jm(v),y.forEach(function(h,S){!(T.isUndefined(h)||h===null)&&t.append(a===!0?yf([v],S,i):a===null?v:v+"[]",u(h))}),!1}return mc(x)?!0:(t.append(yf(k,v,i),u(x)),!1)}const m=[],g=Object.assign(ub,{defaultVisitor:p,convertValue:u,isVisitable:mc});function b(x,v){if(!T.isUndefined(x)){if(m.indexOf(x)!==-1)throw Error("Circular reference detected in "+v.join("."));m.push(x),T.forEach(x,function(y,d){(!(T.isUndefined(y)||y===null)&&s.call(t,y,T.isString(d)?d.trim():d,v,g))===!0&&b(y,v?v.concat(d):[d])}),m.pop()}}if(!T.isObject(e))throw new TypeError("data must be an object");return b(e),t}function xf(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(r){return t[r]})}function Iu(e,t){this._pairs=[],e&&za(e,this,t)}const Xm=Iu.prototype;Xm.append=function(t,n){this._pairs.push([t,n])};Xm.toString=function(t){const n=t?function(r){return t.call(this,r,xf)}:xf;return this._pairs.map(function(s){return n(s[0])+"="+n(s[1])},"").join("&")};function db(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function Gm(e,t,n){if(!t)return e;const r=n&&n.encode||db;T.isFunction(n)&&(n={serialize:n});const s=n&&n.serialize;let i;if(s?i=s(t,n):i=T.isURLSearchParams(t)?t.toString():new Iu(t,n).toString(r),i){const a=e.indexOf("#");a!==-1&&(e=e.slice(0,a)),e+=(e.indexOf("?")===-1?"?":"&")+i}return e}class fb{constructor(){this.handlers=[]}use(t,n,r){return this.handlers.push({fulfilled:t,rejected:n,synchronous:r?r.synchronous:!1,runWhen:r?r.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){T.forEach(this.handlers,function(r){r!==null&&t(r)})}}const vf=fb,Zm={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},pb=typeof URLSearchParams<"u"?URLSearchParams:Iu,hb=typeof FormData<"u"?FormData:null,mb=typeof Blob<"u"?Blob:null,gb={isBrowser:!0,classes:{URLSearchParams:pb,FormData:hb,Blob:mb},protocols:["http","https","file","blob","url","data"]},Au=typeof window<"u"&&typeof document<"u",gc=typeof navigator=="object"&&navigator||void 0,yb=Au&&(!gc||["ReactNative","NativeScript","NS"].indexOf(gc.product)<0),xb=(()=>typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function")(),vb=Au&&window.location.href||"http://localhost",bb=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:Au,hasStandardBrowserEnv:yb,hasStandardBrowserWebWorkerEnv:xb,navigator:gc,origin:vb},Symbol.toStringTag,{value:"Module"})),Be={...bb,...gb};function wb(e,t){return za(e,new Be.classes.URLSearchParams,{visitor:function(n,r,s,i){return Be.isNode&&T.isBuffer(n)?(this.append(r,n.toString("base64")),!1):i.defaultVisitor.apply(this,arguments)},...t})}function Sb(e){return T.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function kb(e){const t={},n=Object.keys(e);let r;const s=n.length;let i;for(r=0;r<s;r++)i=n[r],t[i]=e[i];return t}function e0(e){function t(n,r,s,i){let a=n[i++];if(a==="__proto__")return!0;const l=Number.isFinite(+a),c=i>=n.length;return a=!a&&T.isArray(s)?s.length:a,c?(T.hasOwnProp(s,a)?s[a]=[s[a],r]:s[a]=r,!l):((!s[a]||!T.isObject(s[a]))&&(s[a]=[]),t(n,r,s[a],i)&&T.isArray(s[a])&&(s[a]=kb(s[a])),!l)}if(T.isFormData(e)&&T.isFunction(e.entries)){const n={};return T.forEachEntry(e,(r,s)=>{t(Sb(r),s,n,0)}),n}return null}function jb(e,t,n){if(T.isString(e))try{return(t||JSON.parse)(e),T.trim(e)}catch(r){if(r.name!=="SyntaxError")throw r}return(n||JSON.stringify)(e)}const Mu={transitional:Zm,adapter:["xhr","http","fetch"],transformRequest:[function(t,n){const r=n.getContentType()||"",s=r.indexOf("application/json")>-1,i=T.isObject(t);if(i&&T.isHTMLForm(t)&&(t=new FormData(t)),T.isFormData(t))return s?JSON.stringify(e0(t)):t;if(T.isArrayBuffer(t)||T.isBuffer(t)||T.isStream(t)||T.isFile(t)||T.isBlob(t)||T.isReadableStream(t))return t;if(T.isArrayBufferView(t))return t.buffer;if(T.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let l;if(i){if(r.indexOf("application/x-www-form-urlencoded")>-1)return wb(t,this.formSerializer).toString();if((l=T.isFileList(t))||r.indexOf("multipart/form-data")>-1){const c=this.env&&this.env.FormData;return za(l?{"files[]":t}:t,c&&new c,this.formSerializer)}}return i||s?(n.setContentType("application/json",!1),jb(t)):t}],transformResponse:[function(t){const n=this.transitional||Mu.transitional,r=n&&n.forcedJSONParsing,s=this.responseType==="json";if(T.isResponse(t)||T.isReadableStream(t))return t;if(t&&T.isString(t)&&(r&&!this.responseType||s)){const a=!(n&&n.silentJSONParsing)&&s;try{return JSON.parse(t,this.parseReviver)}catch(l){if(a)throw l.name==="SyntaxError"?V.from(l,V.ERR_BAD_RESPONSE,this,null,this.response):l}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:Be.classes.FormData,Blob:Be.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};T.forEach(["delete","get","head","post","put","patch"],e=>{Mu.headers[e]={}});const Fu=Mu,Cb=T.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),Eb=e=>{const t={};let n,r,s;return e&&e.split(`
`).forEach(function(a){s=a.indexOf(":"),n=a.substring(0,s).trim().toLowerCase(),r=a.substring(s+1).trim(),!(!n||t[n]&&Cb[n])&&(n==="set-cookie"?t[n]?t[n].push(r):t[n]=[r]:t[n]=t[n]?t[n]+", "+r:r)}),t},bf=Symbol("internals");function $s(e){return e&&String(e).trim().toLowerCase()}function To(e){return e===!1||e==null?e:T.isArray(e)?e.map(To):String(e)}function _b(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}const Tb=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function ul(e,t,n,r,s){if(T.isFunction(r))return r.call(this,t,n);if(s&&(t=n),!!T.isString(t)){if(T.isString(r))return t.indexOf(r)!==-1;if(T.isRegExp(r))return r.test(t)}}function Nb(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,r)=>n.toUpperCase()+r)}function Rb(e,t){const n=T.toCamelCase(" "+t);["get","set","has"].forEach(r=>{Object.defineProperty(e,r+n,{value:function(s,i,a){return this[r].call(this,t,s,i,a)},configurable:!0})})}class La{constructor(t){t&&this.set(t)}set(t,n,r){const s=this;function i(l,c,u){const p=$s(c);if(!p)throw new Error("header name must be a non-empty string");const m=T.findKey(s,p);(!m||s[m]===void 0||u===!0||u===void 0&&s[m]!==!1)&&(s[m||c]=To(l))}const a=(l,c)=>T.forEach(l,(u,p)=>i(u,p,c));if(T.isPlainObject(t)||t instanceof this.constructor)a(t,n);else if(T.isString(t)&&(t=t.trim())&&!Tb(t))a(Eb(t),n);else if(T.isObject(t)&&T.isIterable(t)){let l={},c,u;for(const p of t){if(!T.isArray(p))throw TypeError("Object iterator must return a key-value pair");l[u=p[0]]=(c=l[u])?T.isArray(c)?[...c,p[1]]:[c,p[1]]:p[1]}a(l,n)}else t!=null&&i(n,t,r);return this}get(t,n){if(t=$s(t),t){const r=T.findKey(this,t);if(r){const s=this[r];if(!n)return s;if(n===!0)return _b(s);if(T.isFunction(n))return n.call(this,s,r);if(T.isRegExp(n))return n.exec(s);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=$s(t),t){const r=T.findKey(this,t);return!!(r&&this[r]!==void 0&&(!n||ul(this,this[r],r,n)))}return!1}delete(t,n){const r=this;let s=!1;function i(a){if(a=$s(a),a){const l=T.findKey(r,a);l&&(!n||ul(r,r[l],l,n))&&(delete r[l],s=!0)}}return T.isArray(t)?t.forEach(i):i(t),s}clear(t){const n=Object.keys(this);let r=n.length,s=!1;for(;r--;){const i=n[r];(!t||ul(this,this[i],i,t,!0))&&(delete this[i],s=!0)}return s}normalize(t){const n=this,r={};return T.forEach(this,(s,i)=>{const a=T.findKey(r,i);if(a){n[a]=To(s),delete n[i];return}const l=t?Nb(i):String(i).trim();l!==i&&delete n[i],n[l]=To(s),r[l]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return T.forEach(this,(r,s)=>{r!=null&&r!==!1&&(n[s]=t&&T.isArray(r)?r.join(", "):r)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...n){const r=new this(t);return n.forEach(s=>r.set(s)),r}static accessor(t){const r=(this[bf]=this[bf]={accessors:{}}).accessors,s=this.prototype;function i(a){const l=$s(a);r[l]||(Rb(s,a),r[l]=!0)}return T.isArray(t)?t.forEach(i):i(t),this}}La.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);T.reduceDescriptors(La.prototype,({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(r){this[n]=r}}});T.freezeMethods(La);const Mt=La;function dl(e,t){const n=this||Fu,r=t||n,s=Mt.from(r.headers);let i=r.data;return T.forEach(e,function(l){i=l.call(n,i,s.normalize(),t?t.status:void 0)}),s.normalize(),i}function t0(e){return!!(e&&e.__CANCEL__)}function Ns(e,t,n){V.call(this,e??"canceled",V.ERR_CANCELED,t,n),this.name="CanceledError"}T.inherits(Ns,V,{__CANCEL__:!0});function n0(e,t,n){const r=n.config.validateStatus;!n.status||!r||r(n.status)?e(n):t(new V("Request failed with status code "+n.status,[V.ERR_BAD_REQUEST,V.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}function Pb(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function zb(e,t){e=e||10;const n=new Array(e),r=new Array(e);let s=0,i=0,a;return t=t!==void 0?t:1e3,function(c){const u=Date.now(),p=r[i];a||(a=u),n[s]=c,r[s]=u;let m=i,g=0;for(;m!==s;)g+=n[m++],m=m%e;if(s=(s+1)%e,s===i&&(i=(i+1)%e),u-a<t)return;const b=p&&u-p;return b?Math.round(g*1e3/b):void 0}}function Lb(e,t){let n=0,r=1e3/t,s,i;const a=(u,p=Date.now())=>{n=p,s=null,i&&(clearTimeout(i),i=null),e(...u)};return[(...u)=>{const p=Date.now(),m=p-n;m>=r?a(u,p):(s=u,i||(i=setTimeout(()=>{i=null,a(s)},r-m)))},()=>s&&a(s)]}const sa=(e,t,n=3)=>{let r=0;const s=zb(50,250);return Lb(i=>{const a=i.loaded,l=i.lengthComputable?i.total:void 0,c=a-r,u=s(c),p=a<=l;r=a;const m={loaded:a,total:l,progress:l?a/l:void 0,bytes:c,rate:u||void 0,estimated:u&&l&&p?(l-a)/u:void 0,event:i,lengthComputable:l!=null,[t?"download":"upload"]:!0};e(m)},n)},wf=(e,t)=>{const n=e!=null;return[r=>t[0]({lengthComputable:n,total:e,loaded:r}),t[1]]},Sf=e=>(...t)=>T.asap(()=>e(...t)),Ob=Be.hasStandardBrowserEnv?((e,t)=>n=>(n=new URL(n,Be.origin),e.protocol===n.protocol&&e.host===n.host&&(t||e.port===n.port)))(new URL(Be.origin),Be.navigator&&/(msie|trident)/i.test(Be.navigator.userAgent)):()=>!0,Ib=Be.hasStandardBrowserEnv?{write(e,t,n,r,s,i){const a=[e+"="+encodeURIComponent(t)];T.isNumber(n)&&a.push("expires="+new Date(n).toGMTString()),T.isString(r)&&a.push("path="+r),T.isString(s)&&a.push("domain="+s),i===!0&&a.push("secure"),document.cookie=a.join("; ")},read(e){const t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove(e){this.write(e,"",Date.now()-864e5)}}:{write(){},read(){return null},remove(){}};function Ab(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function Mb(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}function r0(e,t,n){let r=!Ab(t);return e&&(r||n==!1)?Mb(e,t):t}const kf=e=>e instanceof Mt?{...e}:e;function Er(e,t){t=t||{};const n={};function r(u,p,m,g){return T.isPlainObject(u)&&T.isPlainObject(p)?T.merge.call({caseless:g},u,p):T.isPlainObject(p)?T.merge({},p):T.isArray(p)?p.slice():p}function s(u,p,m,g){if(T.isUndefined(p)){if(!T.isUndefined(u))return r(void 0,u,m,g)}else return r(u,p,m,g)}function i(u,p){if(!T.isUndefined(p))return r(void 0,p)}function a(u,p){if(T.isUndefined(p)){if(!T.isUndefined(u))return r(void 0,u)}else return r(void 0,p)}function l(u,p,m){if(m in t)return r(u,p);if(m in e)return r(void 0,u)}const c={url:i,method:i,data:i,baseURL:a,transformRequest:a,transformResponse:a,paramsSerializer:a,timeout:a,timeoutMessage:a,withCredentials:a,withXSRFToken:a,adapter:a,responseType:a,xsrfCookieName:a,xsrfHeaderName:a,onUploadProgress:a,onDownloadProgress:a,decompress:a,maxContentLength:a,maxBodyLength:a,beforeRedirect:a,transport:a,httpAgent:a,httpsAgent:a,cancelToken:a,socketPath:a,responseEncoding:a,validateStatus:l,headers:(u,p,m)=>s(kf(u),kf(p),m,!0)};return T.forEach(Object.keys({...e,...t}),function(p){const m=c[p]||s,g=m(e[p],t[p],p);T.isUndefined(g)&&m!==l||(n[p]=g)}),n}const s0=e=>{const t=Er({},e);let{data:n,withXSRFToken:r,xsrfHeaderName:s,xsrfCookieName:i,headers:a,auth:l}=t;if(t.headers=a=Mt.from(a),t.url=Gm(r0(t.baseURL,t.url,t.allowAbsoluteUrls),e.params,e.paramsSerializer),l&&a.set("Authorization","Basic "+btoa((l.username||"")+":"+(l.password?unescape(encodeURIComponent(l.password)):""))),T.isFormData(n)){if(Be.hasStandardBrowserEnv||Be.hasStandardBrowserWebWorkerEnv)a.setContentType(void 0);else if(T.isFunction(n.getHeaders)){const c=n.getHeaders(),u=["content-type","content-length"];Object.entries(c).forEach(([p,m])=>{u.includes(p.toLowerCase())&&a.set(p,m)})}}if(Be.hasStandardBrowserEnv&&(r&&T.isFunction(r)&&(r=r(t)),r||r!==!1&&Ob(t.url))){const c=s&&i&&Ib.read(i);c&&a.set(s,c)}return t},Fb=typeof XMLHttpRequest<"u",Db=Fb&&function(e){return new Promise(function(n,r){const s=s0(e);let i=s.data;const a=Mt.from(s.headers).normalize();let{responseType:l,onUploadProgress:c,onDownloadProgress:u}=s,p,m,g,b,x;function v(){b&&b(),x&&x(),s.cancelToken&&s.cancelToken.unsubscribe(p),s.signal&&s.signal.removeEventListener("abort",p)}let k=new XMLHttpRequest;k.open(s.method.toUpperCase(),s.url,!0),k.timeout=s.timeout;function y(){if(!k)return;const h=Mt.from("getAllResponseHeaders"in k&&k.getAllResponseHeaders()),E={data:!l||l==="text"||l==="json"?k.responseText:k.response,status:k.status,statusText:k.statusText,headers:h,config:e,request:k};n0(function(_){n(_),v()},function(_){r(_),v()},E),k=null}"onloadend"in k?k.onloadend=y:k.onreadystatechange=function(){!k||k.readyState!==4||k.status===0&&!(k.responseURL&&k.responseURL.indexOf("file:")===0)||setTimeout(y)},k.onabort=function(){k&&(r(new V("Request aborted",V.ECONNABORTED,e,k)),k=null)},k.onerror=function(S){const E=S&&S.message?S.message:"Network Error",R=new V(E,V.ERR_NETWORK,e,k);R.event=S||null,r(R),k=null},k.ontimeout=function(){let S=s.timeout?"timeout of "+s.timeout+"ms exceeded":"timeout exceeded";const E=s.transitional||Zm;s.timeoutErrorMessage&&(S=s.timeoutErrorMessage),r(new V(S,E.clarifyTimeoutError?V.ETIMEDOUT:V.ECONNABORTED,e,k)),k=null},i===void 0&&a.setContentType(null),"setRequestHeader"in k&&T.forEach(a.toJSON(),function(S,E){k.setRequestHeader(E,S)}),T.isUndefined(s.withCredentials)||(k.withCredentials=!!s.withCredentials),l&&l!=="json"&&(k.responseType=s.responseType),u&&([g,x]=sa(u,!0),k.addEventListener("progress",g)),c&&k.upload&&([m,b]=sa(c),k.upload.addEventListener("progress",m),k.upload.addEventListener("loadend",b)),(s.cancelToken||s.signal)&&(p=h=>{k&&(r(!h||h.type?new Ns(null,e,k):h),k.abort(),k=null)},s.cancelToken&&s.cancelToken.subscribe(p),s.signal&&(s.signal.aborted?p():s.signal.addEventListener("abort",p)));const d=Pb(s.url);if(d&&Be.protocols.indexOf(d)===-1){r(new V("Unsupported protocol "+d+":",V.ERR_BAD_REQUEST,e));return}k.send(i||null)})},$b=(e,t)=>{const{length:n}=e=e?e.filter(Boolean):[];if(t||n){let r=new AbortController,s;const i=function(u){if(!s){s=!0,l();const p=u instanceof Error?u:this.reason;r.abort(p instanceof V?p:new Ns(p instanceof Error?p.message:p))}};let a=t&&setTimeout(()=>{a=null,i(new V(`timeout ${t} of ms exceeded`,V.ETIMEDOUT))},t);const l=()=>{e&&(a&&clearTimeout(a),a=null,e.forEach(u=>{u.unsubscribe?u.unsubscribe(i):u.removeEventListener("abort",i)}),e=null)};e.forEach(u=>u.addEventListener("abort",i));const{signal:c}=r;return c.unsubscribe=()=>T.asap(l),c}},Bb=$b,Ub=function*(e,t){let n=e.byteLength;if(!t||n<t){yield e;return}let r=0,s;for(;r<n;)s=r+t,yield e.slice(r,s),r=s},Wb=async function*(e,t){for await(const n of Hb(e))yield*Ub(n,t)},Hb=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}const t=e.getReader();try{for(;;){const{done:n,value:r}=await t.read();if(n)break;yield r}}finally{await t.cancel()}},jf=(e,t,n,r)=>{const s=Wb(e,t);let i=0,a,l=c=>{a||(a=!0,r&&r(c))};return new ReadableStream({async pull(c){try{const{done:u,value:p}=await s.next();if(u){l(),c.close();return}let m=p.byteLength;if(n){let g=i+=m;n(g)}c.enqueue(new Uint8Array(p))}catch(u){throw l(u),u}},cancel(c){return l(c),s.return()}},{highWaterMark:2})},Cf=64*1024,{isFunction:po}=T,Vb=(({Request:e,Response:t})=>({Request:e,Response:t}))(T.global),{ReadableStream:Ef,TextEncoder:_f}=T.global,Tf=(e,...t)=>{try{return!!e(...t)}catch{return!1}},qb=e=>{e=T.merge.call({skipUndefined:!0},Vb,e);const{fetch:t,Request:n,Response:r}=e,s=t?po(t):typeof fetch=="function",i=po(n),a=po(r);if(!s)return!1;const l=s&&po(Ef),c=s&&(typeof _f=="function"?(x=>v=>x.encode(v))(new _f):async x=>new Uint8Array(await new n(x).arrayBuffer())),u=i&&l&&Tf(()=>{let x=!1;const v=new n(Be.origin,{body:new Ef,method:"POST",get duplex(){return x=!0,"half"}}).headers.has("Content-Type");return x&&!v}),p=a&&l&&Tf(()=>T.isReadableStream(new r("").body)),m={stream:p&&(x=>x.body)};s&&["text","arrayBuffer","blob","formData","stream"].forEach(x=>{!m[x]&&(m[x]=(v,k)=>{let y=v&&v[x];if(y)return y.call(v);throw new V(`Response type '${x}' is not supported`,V.ERR_NOT_SUPPORT,k)})});const g=async x=>{if(x==null)return 0;if(T.isBlob(x))return x.size;if(T.isSpecCompliantForm(x))return(await new n(Be.origin,{method:"POST",body:x}).arrayBuffer()).byteLength;if(T.isArrayBufferView(x)||T.isArrayBuffer(x))return x.byteLength;if(T.isURLSearchParams(x)&&(x=x+""),T.isString(x))return(await c(x)).byteLength},b=async(x,v)=>{const k=T.toFiniteNumber(x.getContentLength());return k??g(v)};return async x=>{let{url:v,method:k,data:y,signal:d,cancelToken:h,timeout:S,onDownloadProgress:E,onUploadProgress:R,responseType:_,headers:N,withCredentials:C="same-origin",fetchOptions:P}=s0(x),U=t||fetch;_=_?(_+"").toLowerCase():"text";let J=Bb([d,h&&h.toAbortSignal()],S),ee=null;const ge=J&&J.unsubscribe&&(()=>{J.unsubscribe()});let ye;try{if(R&&u&&k!=="get"&&k!=="head"&&(ye=await b(N,y))!==0){let Y=new n(v,{method:"POST",body:y,duplex:"half"}),G;if(T.isFormData(y)&&(G=Y.headers.get("content-type"))&&N.setContentType(G),Y.body){const[Ae,Ce]=wf(ye,sa(Sf(R)));y=jf(Y.body,Cf,Ae,Ce)}}T.isString(C)||(C=C?"include":"omit");const ne=i&&"credentials"in n.prototype,pe={...P,signal:J,method:k.toUpperCase(),headers:N.normalize().toJSON(),body:y,duplex:"half",credentials:ne?C:void 0};ee=i&&new n(v,pe);let O=await(i?U(ee,P):U(v,pe));const W=p&&(_==="stream"||_==="response");if(p&&(E||W&&ge)){const Y={};["status","statusText","headers"].forEach($t=>{Y[$t]=O[$t]});const G=T.toFiniteNumber(O.headers.get("content-length")),[Ae,Ce]=E&&wf(G,sa(Sf(E),!0))||[];O=new r(jf(O.body,Cf,Ae,()=>{Ce&&Ce(),ge&&ge()}),Y)}_=_||"text";let H=await m[T.findKey(m,_)||"text"](O,x);return!W&&ge&&ge(),await new Promise((Y,G)=>{n0(Y,G,{data:H,headers:Mt.from(O.headers),status:O.status,statusText:O.statusText,config:x,request:ee})})}catch(ne){throw ge&&ge(),ne&&ne.name==="TypeError"&&/Load failed|fetch/i.test(ne.message)?Object.assign(new V("Network Error",V.ERR_NETWORK,x,ee),{cause:ne.cause||ne}):V.from(ne,ne&&ne.code,x,ee)}}},Qb=new Map,i0=e=>{let t=e?e.env:{};const{fetch:n,Request:r,Response:s}=t,i=[r,s,n];let a=i.length,l=a,c,u,p=Qb;for(;l--;)c=i[l],u=p.get(c),u===void 0&&p.set(c,u=l?new Map:qb(t)),p=u;return u};i0();const yc={http:lb,xhr:Db,fetch:{get:i0}};T.forEach(yc,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const Nf=e=>`- ${e}`,Kb=e=>T.isFunction(e)||e===null||e===!1,o0={getAdapter:(e,t)=>{e=T.isArray(e)?e:[e];const{length:n}=e;let r,s;const i={};for(let a=0;a<n;a++){r=e[a];let l;if(s=r,!Kb(r)&&(s=yc[(l=String(r)).toLowerCase()],s===void 0))throw new V(`Unknown adapter '${l}'`);if(s&&(T.isFunction(s)||(s=s.get(t))))break;i[l||"#"+a]=s}if(!s){const a=Object.entries(i).map(([c,u])=>`adapter ${c} `+(u===!1?"is not supported by the environment":"is not available in the build"));let l=n?a.length>1?`since :
`+a.map(Nf).join(`
`):" "+Nf(a[0]):"as no adapter specified";throw new V("There is no suitable adapter to dispatch the request "+l,"ERR_NOT_SUPPORT")}return s},adapters:yc};function fl(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new Ns(null,e)}function Rf(e){return fl(e),e.headers=Mt.from(e.headers),e.data=dl.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),o0.getAdapter(e.adapter||Fu.adapter,e)(e).then(function(r){return fl(e),r.data=dl.call(e,e.transformResponse,r),r.headers=Mt.from(r.headers),r},function(r){return t0(r)||(fl(e),r&&r.response&&(r.response.data=dl.call(e,e.transformResponse,r.response),r.response.headers=Mt.from(r.response.headers))),Promise.reject(r)})}const a0="1.12.2",Oa={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{Oa[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}});const Pf={};Oa.transitional=function(t,n,r){function s(i,a){return"[Axios v"+a0+"] Transitional option '"+i+"'"+a+(r?". "+r:"")}return(i,a,l)=>{if(t===!1)throw new V(s(a," has been removed"+(n?" in "+n:"")),V.ERR_DEPRECATED);return n&&!Pf[a]&&(Pf[a]=!0,console.warn(s(a," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(i,a,l):!0}};Oa.spelling=function(t){return(n,r)=>(console.warn(`${r} is likely a misspelling of ${t}`),!0)};function Yb(e,t,n){if(typeof e!="object")throw new V("options must be an object",V.ERR_BAD_OPTION_VALUE);const r=Object.keys(e);let s=r.length;for(;s-- >0;){const i=r[s],a=t[i];if(a){const l=e[i],c=l===void 0||a(l,i,e);if(c!==!0)throw new V("option "+i+" must be "+c,V.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new V("Unknown option "+i,V.ERR_BAD_OPTION)}}const No={assertOptions:Yb,validators:Oa},Ut=No.validators;class ia{constructor(t){this.defaults=t||{},this.interceptors={request:new vf,response:new vf}}async request(t,n){try{return await this._request(t,n)}catch(r){if(r instanceof Error){let s={};Error.captureStackTrace?Error.captureStackTrace(s):s=new Error;const i=s.stack?s.stack.replace(/^.+\n/,""):"";try{r.stack?i&&!String(r.stack).endsWith(i.replace(/^.+\n.+\n/,""))&&(r.stack+=`
`+i):r.stack=i}catch{}}throw r}}_request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=Er(this.defaults,n);const{transitional:r,paramsSerializer:s,headers:i}=n;r!==void 0&&No.assertOptions(r,{silentJSONParsing:Ut.transitional(Ut.boolean),forcedJSONParsing:Ut.transitional(Ut.boolean),clarifyTimeoutError:Ut.transitional(Ut.boolean)},!1),s!=null&&(T.isFunction(s)?n.paramsSerializer={serialize:s}:No.assertOptions(s,{encode:Ut.function,serialize:Ut.function},!0)),n.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?n.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:n.allowAbsoluteUrls=!0),No.assertOptions(n,{baseUrl:Ut.spelling("baseURL"),withXsrfToken:Ut.spelling("withXSRFToken")},!0),n.method=(n.method||this.defaults.method||"get").toLowerCase();let a=i&&T.merge(i.common,i[n.method]);i&&T.forEach(["delete","get","head","post","put","patch","common"],x=>{delete i[x]}),n.headers=Mt.concat(a,i);const l=[];let c=!0;this.interceptors.request.forEach(function(v){typeof v.runWhen=="function"&&v.runWhen(n)===!1||(c=c&&v.synchronous,l.unshift(v.fulfilled,v.rejected))});const u=[];this.interceptors.response.forEach(function(v){u.push(v.fulfilled,v.rejected)});let p,m=0,g;if(!c){const x=[Rf.bind(this),void 0];for(x.unshift(...l),x.push(...u),g=x.length,p=Promise.resolve(n);m<g;)p=p.then(x[m++],x[m++]);return p}g=l.length;let b=n;for(;m<g;){const x=l[m++],v=l[m++];try{b=x(b)}catch(k){v.call(this,k);break}}try{p=Rf.call(this,b)}catch(x){return Promise.reject(x)}for(m=0,g=u.length;m<g;)p=p.then(u[m++],u[m++]);return p}getUri(t){t=Er(this.defaults,t);const n=r0(t.baseURL,t.url,t.allowAbsoluteUrls);return Gm(n,t.params,t.paramsSerializer)}}T.forEach(["delete","get","head","options"],function(t){ia.prototype[t]=function(n,r){return this.request(Er(r||{},{method:t,url:n,data:(r||{}).data}))}});T.forEach(["post","put","patch"],function(t){function n(r){return function(i,a,l){return this.request(Er(l||{},{method:t,headers:r?{"Content-Type":"multipart/form-data"}:{},url:i,data:a}))}}ia.prototype[t]=n(),ia.prototype[t+"Form"]=n(!0)});const Ro=ia;class Du{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(i){n=i});const r=this;this.promise.then(s=>{if(!r._listeners)return;let i=r._listeners.length;for(;i-- >0;)r._listeners[i](s);r._listeners=null}),this.promise.then=s=>{let i;const a=new Promise(l=>{r.subscribe(l),i=l}).then(s);return a.cancel=function(){r.unsubscribe(i)},a},t(function(i,a,l){r.reason||(r.reason=new Ns(i,a,l),n(r.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}toAbortSignal(){const t=new AbortController,n=r=>{t.abort(r)};return this.subscribe(n),t.signal.unsubscribe=()=>this.unsubscribe(n),t.signal}static source(){let t;return{token:new Du(function(s){t=s}),cancel:t}}}const Jb=Du;function Xb(e){return function(n){return e.apply(null,n)}}function Gb(e){return T.isObject(e)&&e.isAxiosError===!0}const xc={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(xc).forEach(([e,t])=>{xc[t]=e});const Zb=xc;function l0(e){const t=new Ro(e),n=$m(Ro.prototype.request,t);return T.extend(n,Ro.prototype,t,{allOwnKeys:!0}),T.extend(n,t,null,{allOwnKeys:!0}),n.create=function(s){return l0(Er(e,s))},n}const be=l0(Fu);be.Axios=Ro;be.CanceledError=Ns;be.CancelToken=Jb;be.isCancel=t0;be.VERSION=a0;be.toFormData=za;be.AxiosError=V;be.Cancel=be.CanceledError;be.all=function(t){return Promise.all(t)};be.spread=Xb;be.isAxiosError=Gb;be.mergeConfig=Er;be.AxiosHeaders=Mt;be.formToJSON=e=>e0(T.isHTMLForm(e)?new FormData(e):e);be.getAdapter=o0.getAdapter;be.HttpStatusCode=Zb;be.default=be;const jn=be;var Rs=class{constructor(){this.listeners=new Set,this.subscribe=this.subscribe.bind(this)}subscribe(e){return this.listeners.add(e),this.onSubscribe(),()=>{this.listeners.delete(e),this.onUnsubscribe()}}hasListeners(){return this.listeners.size>0}onSubscribe(){}onUnsubscribe(){}},e2={setTimeout:(e,t)=>setTimeout(e,t),clearTimeout:e=>clearTimeout(e),setInterval:(e,t)=>setInterval(e,t),clearInterval:e=>clearInterval(e)},Cn,Lc,Qf,t2=(Qf=class{constructor(){F(this,Cn,e2);F(this,Lc,!1)}setTimeoutProvider(e){A(this,Cn,e)}setTimeout(e,t){return j(this,Cn).setTimeout(e,t)}clearTimeout(e){j(this,Cn).clearTimeout(e)}setInterval(e,t){return j(this,Cn).setInterval(e,t)}clearInterval(e){j(this,Cn).clearInterval(e)}},Cn=new WeakMap,Lc=new WeakMap,Qf),ir=new t2;function n2(e){setTimeout(e,0)}var _r=typeof window>"u"||"Deno"in globalThis;function qe(){}function r2(e,t){return typeof e=="function"?e(t):e}function vc(e){return typeof e=="number"&&e>=0&&e!==1/0}function c0(e,t){return Math.max(e+(t||0)-Date.now(),0)}function qn(e,t){return typeof e=="function"?e(t):e}function yt(e,t){return typeof e=="function"?e(t):e}function zf(e,t){const{type:n="all",exact:r,fetchStatus:s,predicate:i,queryKey:a,stale:l}=e;if(a){if(r){if(t.queryHash!==$u(a,t.options))return!1}else if(!Si(t.queryKey,a))return!1}if(n!=="all"){const c=t.isActive();if(n==="active"&&!c||n==="inactive"&&c)return!1}return!(typeof l=="boolean"&&t.isStale()!==l||s&&s!==t.state.fetchStatus||i&&!i(t))}function Lf(e,t){const{exact:n,status:r,predicate:s,mutationKey:i}=e;if(i){if(!t.options.mutationKey)return!1;if(n){if(Tr(t.options.mutationKey)!==Tr(i))return!1}else if(!Si(t.options.mutationKey,i))return!1}return!(r&&t.state.status!==r||s&&!s(t))}function $u(e,t){return((t==null?void 0:t.queryKeyHashFn)||Tr)(e)}function Tr(e){return JSON.stringify(e,(t,n)=>bc(n)?Object.keys(n).sort().reduce((r,s)=>(r[s]=n[s],r),{}):n)}function Si(e,t){return e===t?!0:typeof e!=typeof t?!1:e&&t&&typeof e=="object"&&typeof t=="object"?Object.keys(t).every(n=>Si(e[n],t[n])):!1}var s2=Object.prototype.hasOwnProperty;function u0(e,t){if(e===t)return e;const n=Of(e)&&Of(t);if(!n&&!(bc(e)&&bc(t)))return t;const s=(n?e:Object.keys(e)).length,i=n?t:Object.keys(t),a=i.length,l=n?new Array(a):{};let c=0;for(let u=0;u<a;u++){const p=n?u:i[u],m=e[p],g=t[p];if(m===g){l[p]=m,(n?u<s:s2.call(e,p))&&c++;continue}if(m===null||g===null||typeof m!="object"||typeof g!="object"){l[p]=g;continue}const b=u0(m,g);l[p]=b,b===m&&c++}return s===a&&c===s?e:l}function oa(e,t){if(!t||Object.keys(e).length!==Object.keys(t).length)return!1;for(const n in e)if(e[n]!==t[n])return!1;return!0}function Of(e){return Array.isArray(e)&&e.length===Object.keys(e).length}function bc(e){if(!If(e))return!1;const t=e.constructor;if(t===void 0)return!0;const n=t.prototype;return!(!If(n)||!n.hasOwnProperty("isPrototypeOf")||Object.getPrototypeOf(e)!==Object.prototype)}function If(e){return Object.prototype.toString.call(e)==="[object Object]"}function i2(e){return new Promise(t=>{ir.setTimeout(t,e)})}function wc(e,t,n){return typeof n.structuralSharing=="function"?n.structuralSharing(e,t):n.structuralSharing!==!1?u0(e,t):t}function o2(e,t,n=0){const r=[...e,t];return n&&r.length>n?r.slice(1):r}function a2(e,t,n=0){const r=[t,...e];return n&&r.length>n?r.slice(0,-1):r}var Bu=Symbol();function d0(e,t){return!e.queryFn&&(t!=null&&t.initialPromise)?()=>t.initialPromise:!e.queryFn||e.queryFn===Bu?()=>Promise.reject(new Error(`Missing queryFn: '${e.queryHash}'`)):e.queryFn}function f0(e,t){return typeof e=="function"?e(...t):!!e}var or,En,ts,Kf,l2=(Kf=class extends Rs{constructor(){super();F(this,or,void 0);F(this,En,void 0);F(this,ts,void 0);A(this,ts,t=>{if(!_r&&window.addEventListener){const n=()=>t();return window.addEventListener("visibilitychange",n,!1),()=>{window.removeEventListener("visibilitychange",n)}}})}onSubscribe(){j(this,En)||this.setEventListener(j(this,ts))}onUnsubscribe(){var t;this.hasListeners()||((t=j(this,En))==null||t.call(this),A(this,En,void 0))}setEventListener(t){var n;A(this,ts,t),(n=j(this,En))==null||n.call(this),A(this,En,t(r=>{typeof r=="boolean"?this.setFocused(r):this.onFocus()}))}setFocused(t){j(this,or)!==t&&(A(this,or,t),this.onFocus())}onFocus(){const t=this.isFocused();this.listeners.forEach(n=>{n(t)})}isFocused(){var t;return typeof j(this,or)=="boolean"?j(this,or):((t=globalThis.document)==null?void 0:t.visibilityState)!=="hidden"}},or=new WeakMap,En=new WeakMap,ts=new WeakMap,Kf),Uu=new l2;function Sc(){let e,t;const n=new Promise((s,i)=>{e=s,t=i});n.status="pending",n.catch(()=>{});function r(s){Object.assign(n,s),delete n.resolve,delete n.reject}return n.resolve=s=>{r({status:"fulfilled",value:s}),e(s)},n.reject=s=>{r({status:"rejected",reason:s}),t(s)},n}var c2=n2;function u2(){let e=[],t=0,n=l=>{l()},r=l=>{l()},s=c2;const i=l=>{t?e.push(l):s(()=>{n(l)})},a=()=>{const l=e;e=[],l.length&&s(()=>{r(()=>{l.forEach(c=>{n(c)})})})};return{batch:l=>{let c;t++;try{c=l()}finally{t--,t||a()}return c},batchCalls:l=>(...c)=>{i(()=>{l(...c)})},schedule:i,setNotifyFunction:l=>{n=l},setBatchNotifyFunction:l=>{r=l},setScheduler:l=>{s=l}}}var ke=u2(),ns,_n,rs,Yf,d2=(Yf=class extends Rs{constructor(){super();F(this,ns,!0);F(this,_n,void 0);F(this,rs,void 0);A(this,rs,t=>{if(!_r&&window.addEventListener){const n=()=>t(!0),r=()=>t(!1);return window.addEventListener("online",n,!1),window.addEventListener("offline",r,!1),()=>{window.removeEventListener("online",n),window.removeEventListener("offline",r)}}})}onSubscribe(){j(this,_n)||this.setEventListener(j(this,rs))}onUnsubscribe(){var t;this.hasListeners()||((t=j(this,_n))==null||t.call(this),A(this,_n,void 0))}setEventListener(t){var n;A(this,rs,t),(n=j(this,_n))==null||n.call(this),A(this,_n,t(this.setOnline.bind(this)))}setOnline(t){j(this,ns)!==t&&(A(this,ns,t),this.listeners.forEach(r=>{r(t)}))}isOnline(){return j(this,ns)}},ns=new WeakMap,_n=new WeakMap,rs=new WeakMap,Yf),aa=new d2;function f2(e){return Math.min(1e3*2**e,3e4)}function p0(e){return(e??"online")==="online"?aa.isOnline():!0}var kc=class extends Error{constructor(e){super("CancelledError"),this.revert=e==null?void 0:e.revert,this.silent=e==null?void 0:e.silent}};function h0(e){let t=!1,n=0,r;const s=Sc(),i=()=>s.status!=="pending",a=v=>{var k;if(!i()){const y=new kc(v);g(y),(k=e.onCancel)==null||k.call(e,y)}},l=()=>{t=!0},c=()=>{t=!1},u=()=>Uu.isFocused()&&(e.networkMode==="always"||aa.isOnline())&&e.canRun(),p=()=>p0(e.networkMode)&&e.canRun(),m=v=>{i()||(r==null||r(),s.resolve(v))},g=v=>{i()||(r==null||r(),s.reject(v))},b=()=>new Promise(v=>{var k;r=y=>{(i()||u())&&v(y)},(k=e.onPause)==null||k.call(e)}).then(()=>{var v;r=void 0,i()||(v=e.onContinue)==null||v.call(e)}),x=()=>{if(i())return;let v;const k=n===0?e.initialPromise:void 0;try{v=k??e.fn()}catch(y){v=Promise.reject(y)}Promise.resolve(v).then(m).catch(y=>{var R;if(i())return;const d=e.retry??(_r?0:3),h=e.retryDelay??f2,S=typeof h=="function"?h(n,y):h,E=d===!0||typeof d=="number"&&n<d||typeof d=="function"&&d(n,y);if(t||!E){g(y);return}n++,(R=e.onFail)==null||R.call(e,n,y),i2(S).then(()=>u()?void 0:b()).then(()=>{t?g(y):x()})})};return{promise:s,status:()=>s.status,cancel:a,continue:()=>(r==null||r(),s),cancelRetry:l,continueRetry:c,canStart:p,start:()=>(p()?x():b().then(x),s)}}var ar,Jf,m0=(Jf=class{constructor(){F(this,ar,void 0)}destroy(){this.clearGcTimeout()}scheduleGc(){this.clearGcTimeout(),vc(this.gcTime)&&A(this,ar,ir.setTimeout(()=>{this.optionalRemove()},this.gcTime))}updateGcTime(e){this.gcTime=Math.max(this.gcTime||0,e??(_r?1/0:5*60*1e3))}clearGcTimeout(){j(this,ar)&&(ir.clearTimeout(j(this,ar)),A(this,ar,void 0))}},ar=new WeakMap,Jf),lr,ss,gt,cr,_e,ki,ur,Nt,Xt,Xf,p2=(Xf=class extends m0{constructor(t){super();F(this,Nt);F(this,lr,void 0);F(this,ss,void 0);F(this,gt,void 0);F(this,cr,void 0);F(this,_e,void 0);F(this,ki,void 0);F(this,ur,void 0);A(this,ur,!1),A(this,ki,t.defaultOptions),this.setOptions(t.options),this.observers=[],A(this,cr,t.client),A(this,gt,j(this,cr).getQueryCache()),this.queryKey=t.queryKey,this.queryHash=t.queryHash,A(this,lr,Af(this.options)),this.state=t.state??j(this,lr),this.scheduleGc()}get meta(){return this.options.meta}get promise(){var t;return(t=j(this,_e))==null?void 0:t.promise}setOptions(t){if(this.options={...j(this,ki),...t},this.updateGcTime(this.options.gcTime),this.state&&this.state.data===void 0){const n=Af(this.options);n.data!==void 0&&(this.setData(n.data,{updatedAt:n.dataUpdatedAt,manual:!0}),A(this,lr,n))}}optionalRemove(){!this.observers.length&&this.state.fetchStatus==="idle"&&j(this,gt).remove(this)}setData(t,n){const r=wc(this.state.data,t,this.options);return q(this,Nt,Xt).call(this,{data:r,type:"success",dataUpdatedAt:n==null?void 0:n.updatedAt,manual:n==null?void 0:n.manual}),r}setState(t,n){q(this,Nt,Xt).call(this,{type:"setState",state:t,setStateOptions:n})}cancel(t){var r,s;const n=(r=j(this,_e))==null?void 0:r.promise;return(s=j(this,_e))==null||s.cancel(t),n?n.then(qe).catch(qe):Promise.resolve()}destroy(){super.destroy(),this.cancel({silent:!0})}reset(){this.destroy(),this.setState(j(this,lr))}isActive(){return this.observers.some(t=>yt(t.options.enabled,this)!==!1)}isDisabled(){return this.getObserversCount()>0?!this.isActive():this.options.queryFn===Bu||this.state.dataUpdateCount+this.state.errorUpdateCount===0}isStatic(){return this.getObserversCount()>0?this.observers.some(t=>qn(t.options.staleTime,this)==="static"):!1}isStale(){return this.getObserversCount()>0?this.observers.some(t=>t.getCurrentResult().isStale):this.state.data===void 0||this.state.isInvalidated}isStaleByTime(t=0){return this.state.data===void 0?!0:t==="static"?!1:this.state.isInvalidated?!0:!c0(this.state.dataUpdatedAt,t)}onFocus(){var n;const t=this.observers.find(r=>r.shouldFetchOnWindowFocus());t==null||t.refetch({cancelRefetch:!1}),(n=j(this,_e))==null||n.continue()}onOnline(){var n;const t=this.observers.find(r=>r.shouldFetchOnReconnect());t==null||t.refetch({cancelRefetch:!1}),(n=j(this,_e))==null||n.continue()}addObserver(t){this.observers.includes(t)||(this.observers.push(t),this.clearGcTimeout(),j(this,gt).notify({type:"observerAdded",query:this,observer:t}))}removeObserver(t){this.observers.includes(t)&&(this.observers=this.observers.filter(n=>n!==t),this.observers.length||(j(this,_e)&&(j(this,ur)?j(this,_e).cancel({revert:!0}):j(this,_e).cancelRetry()),this.scheduleGc()),j(this,gt).notify({type:"observerRemoved",query:this,observer:t}))}getObserversCount(){return this.observers.length}invalidate(){this.state.isInvalidated||q(this,Nt,Xt).call(this,{type:"invalidate"})}async fetch(t,n){var c,u,p,m,g,b,x,v,k,y,d,h;if(this.state.fetchStatus!=="idle"&&((c=j(this,_e))==null?void 0:c.status())!=="rejected"){if(this.state.data!==void 0&&(n!=null&&n.cancelRefetch))this.cancel({silent:!0});else if(j(this,_e))return j(this,_e).continueRetry(),j(this,_e).promise}if(t&&this.setOptions(t),!this.options.queryFn){const S=this.observers.find(E=>E.options.queryFn);S&&this.setOptions(S.options)}const r=new AbortController,s=S=>{Object.defineProperty(S,"signal",{enumerable:!0,get:()=>(A(this,ur,!0),r.signal)})},i=()=>{const S=d0(this.options,n),R=(()=>{const _={client:j(this,cr),queryKey:this.queryKey,meta:this.meta};return s(_),_})();return A(this,ur,!1),this.options.persister?this.options.persister(S,R,this):S(R)},l=(()=>{const S={fetchOptions:n,options:this.options,queryKey:this.queryKey,client:j(this,cr),state:this.state,fetchFn:i};return s(S),S})();(u=this.options.behavior)==null||u.onFetch(l,this),A(this,ss,this.state),(this.state.fetchStatus==="idle"||this.state.fetchMeta!==((p=l.fetchOptions)==null?void 0:p.meta))&&q(this,Nt,Xt).call(this,{type:"fetch",meta:(m=l.fetchOptions)==null?void 0:m.meta}),A(this,_e,h0({initialPromise:n==null?void 0:n.initialPromise,fn:l.fetchFn,onCancel:S=>{S instanceof kc&&S.revert&&this.setState({...j(this,ss),fetchStatus:"idle"}),r.abort()},onFail:(S,E)=>{q(this,Nt,Xt).call(this,{type:"failed",failureCount:S,error:E})},onPause:()=>{q(this,Nt,Xt).call(this,{type:"pause"})},onContinue:()=>{q(this,Nt,Xt).call(this,{type:"continue"})},retry:l.options.retry,retryDelay:l.options.retryDelay,networkMode:l.options.networkMode,canRun:()=>!0}));try{const S=await j(this,_e).start();if(S===void 0)throw new Error(`${this.queryHash} data is undefined`);return this.setData(S),(b=(g=j(this,gt).config).onSuccess)==null||b.call(g,S,this),(v=(x=j(this,gt).config).onSettled)==null||v.call(x,S,this.state.error,this),S}catch(S){if(S instanceof kc){if(S.silent)return j(this,_e).promise;if(S.revert){if(this.state.data===void 0)throw S;return this.state.data}}throw q(this,Nt,Xt).call(this,{type:"error",error:S}),(y=(k=j(this,gt).config).onError)==null||y.call(k,S,this),(h=(d=j(this,gt).config).onSettled)==null||h.call(d,this.state.data,S,this),S}finally{this.scheduleGc()}}},lr=new WeakMap,ss=new WeakMap,gt=new WeakMap,cr=new WeakMap,_e=new WeakMap,ki=new WeakMap,ur=new WeakMap,Nt=new WeakSet,Xt=function(t){const n=r=>{switch(t.type){case"failed":return{...r,fetchFailureCount:t.failureCount,fetchFailureReason:t.error};case"pause":return{...r,fetchStatus:"paused"};case"continue":return{...r,fetchStatus:"fetching"};case"fetch":return{...r,...g0(r.data,this.options),fetchMeta:t.meta??null};case"success":const s={...r,data:t.data,dataUpdateCount:r.dataUpdateCount+1,dataUpdatedAt:t.dataUpdatedAt??Date.now(),error:null,isInvalidated:!1,status:"success",...!t.manual&&{fetchStatus:"idle",fetchFailureCount:0,fetchFailureReason:null}};return A(this,ss,t.manual?s:void 0),s;case"error":const i=t.error;return{...r,error:i,errorUpdateCount:r.errorUpdateCount+1,errorUpdatedAt:Date.now(),fetchFailureCount:r.fetchFailureCount+1,fetchFailureReason:i,fetchStatus:"idle",status:"error"};case"invalidate":return{...r,isInvalidated:!0};case"setState":return{...r,...t.state}}};this.state=n(this.state),ke.batch(()=>{this.observers.forEach(r=>{r.onQueryUpdate()}),j(this,gt).notify({query:this,type:"updated",action:t})})},Xf);function g0(e,t){return{fetchFailureCount:0,fetchFailureReason:null,fetchStatus:p0(t.networkMode)?"fetching":"paused",...e===void 0&&{error:null,status:"pending"}}}function Af(e){const t=typeof e.initialData=="function"?e.initialData():e.initialData,n=t!==void 0,r=n?typeof e.initialDataUpdatedAt=="function"?e.initialDataUpdatedAt():e.initialDataUpdatedAt:0;return{data:t,dataUpdateCount:0,dataUpdatedAt:n?r??Date.now():0,error:null,errorUpdateCount:0,errorUpdatedAt:0,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:null,isInvalidated:!1,status:n?"success":"pending",fetchStatus:"idle"}}var Ze,K,ji,We,dr,is,en,Tn,Ci,os,as,fr,pr,Nn,ls,hr,Vs,Ei,jc,_i,Cc,Ti,Ec,Ni,_c,Ri,Tc,Pi,Nc,zi,Rc,la,y0,Gf,h2=(Gf=class extends Rs{constructor(t,n){super();F(this,hr);F(this,Ei);F(this,_i);F(this,Ti);F(this,Ni);F(this,Ri);F(this,Pi);F(this,zi);F(this,la);F(this,Ze,void 0);F(this,K,void 0);F(this,ji,void 0);F(this,We,void 0);F(this,dr,void 0);F(this,is,void 0);F(this,en,void 0);F(this,Tn,void 0);F(this,Ci,void 0);F(this,os,void 0);F(this,as,void 0);F(this,fr,void 0);F(this,pr,void 0);F(this,Nn,void 0);F(this,ls,new Set);this.options=n,A(this,Ze,t),A(this,Tn,null),A(this,en,Sc()),this.bindMethods(),this.setOptions(n)}bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.size===1&&(j(this,K).addObserver(this),Mf(j(this,K),this.options)?q(this,hr,Vs).call(this):this.updateResult(),q(this,Ni,_c).call(this))}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return Pc(j(this,K),this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return Pc(j(this,K),this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,q(this,Ri,Tc).call(this),q(this,Pi,Nc).call(this),j(this,K).removeObserver(this)}setOptions(t){const n=this.options,r=j(this,K);if(this.options=j(this,Ze).defaultQueryOptions(t),this.options.enabled!==void 0&&typeof this.options.enabled!="boolean"&&typeof this.options.enabled!="function"&&typeof yt(this.options.enabled,j(this,K))!="boolean")throw new Error("Expected enabled to be a boolean or a callback that returns a boolean");q(this,zi,Rc).call(this),j(this,K).setOptions(this.options),n._defaulted&&!oa(this.options,n)&&j(this,Ze).getQueryCache().notify({type:"observerOptionsUpdated",query:j(this,K),observer:this});const s=this.hasListeners();s&&Ff(j(this,K),r,this.options,n)&&q(this,hr,Vs).call(this),this.updateResult(),s&&(j(this,K)!==r||yt(this.options.enabled,j(this,K))!==yt(n.enabled,j(this,K))||qn(this.options.staleTime,j(this,K))!==qn(n.staleTime,j(this,K)))&&q(this,Ei,jc).call(this);const i=q(this,_i,Cc).call(this);s&&(j(this,K)!==r||yt(this.options.enabled,j(this,K))!==yt(n.enabled,j(this,K))||i!==j(this,Nn))&&q(this,Ti,Ec).call(this,i)}getOptimisticResult(t){const n=j(this,Ze).getQueryCache().build(j(this,Ze),t),r=this.createResult(n,t);return g2(this,r)&&(A(this,We,r),A(this,is,this.options),A(this,dr,j(this,K).state)),r}getCurrentResult(){return j(this,We)}trackResult(t,n){return new Proxy(t,{get:(r,s)=>(this.trackProp(s),n==null||n(s),s==="promise"&&!this.options.experimental_prefetchInRender&&j(this,en).status==="pending"&&j(this,en).reject(new Error("experimental_prefetchInRender feature flag is not enabled")),Reflect.get(r,s))})}trackProp(t){j(this,ls).add(t)}getCurrentQuery(){return j(this,K)}refetch({...t}={}){return this.fetch({...t})}fetchOptimistic(t){const n=j(this,Ze).defaultQueryOptions(t),r=j(this,Ze).getQueryCache().build(j(this,Ze),n);return r.fetch().then(()=>this.createResult(r,n))}fetch(t){return q(this,hr,Vs).call(this,{...t,cancelRefetch:t.cancelRefetch??!0}).then(()=>(this.updateResult(),j(this,We)))}createResult(t,n){var C;const r=j(this,K),s=this.options,i=j(this,We),a=j(this,dr),l=j(this,is),u=t!==r?t.state:j(this,ji),{state:p}=t;let m={...p},g=!1,b;if(n._optimisticResults){const P=this.hasListeners(),U=!P&&Mf(t,n),J=P&&Ff(t,r,n,s);(U||J)&&(m={...m,...g0(p.data,t.options)}),n._optimisticResults==="isRestoring"&&(m.fetchStatus="idle")}let{error:x,errorUpdatedAt:v,status:k}=m;b=m.data;let y=!1;if(n.placeholderData!==void 0&&b===void 0&&k==="pending"){let P;i!=null&&i.isPlaceholderData&&n.placeholderData===(l==null?void 0:l.placeholderData)?(P=i.data,y=!0):P=typeof n.placeholderData=="function"?n.placeholderData((C=j(this,as))==null?void 0:C.state.data,j(this,as)):n.placeholderData,P!==void 0&&(k="success",b=wc(i==null?void 0:i.data,P,n),g=!0)}if(n.select&&b!==void 0&&!y)if(i&&b===(a==null?void 0:a.data)&&n.select===j(this,Ci))b=j(this,os);else try{A(this,Ci,n.select),b=n.select(b),b=wc(i==null?void 0:i.data,b,n),A(this,os,b),A(this,Tn,null)}catch(P){A(this,Tn,P)}j(this,Tn)&&(x=j(this,Tn),b=j(this,os),v=Date.now(),k="error");const d=m.fetchStatus==="fetching",h=k==="pending",S=k==="error",E=h&&d,R=b!==void 0,N={status:k,fetchStatus:m.fetchStatus,isPending:h,isSuccess:k==="success",isError:S,isInitialLoading:E,isLoading:E,data:b,dataUpdatedAt:m.dataUpdatedAt,error:x,errorUpdatedAt:v,failureCount:m.fetchFailureCount,failureReason:m.fetchFailureReason,errorUpdateCount:m.errorUpdateCount,isFetched:m.dataUpdateCount>0||m.errorUpdateCount>0,isFetchedAfterMount:m.dataUpdateCount>u.dataUpdateCount||m.errorUpdateCount>u.errorUpdateCount,isFetching:d,isRefetching:d&&!h,isLoadingError:S&&!R,isPaused:m.fetchStatus==="paused",isPlaceholderData:g,isRefetchError:S&&R,isStale:Wu(t,n),refetch:this.refetch,promise:j(this,en),isEnabled:yt(n.enabled,t)!==!1};if(this.options.experimental_prefetchInRender){const P=ee=>{N.status==="error"?ee.reject(N.error):N.data!==void 0&&ee.resolve(N.data)},U=()=>{const ee=A(this,en,N.promise=Sc());P(ee)},J=j(this,en);switch(J.status){case"pending":t.queryHash===r.queryHash&&P(J);break;case"fulfilled":(N.status==="error"||N.data!==J.value)&&U();break;case"rejected":(N.status!=="error"||N.error!==J.reason)&&U();break}}return N}updateResult(){const t=j(this,We),n=this.createResult(j(this,K),this.options);if(A(this,dr,j(this,K).state),A(this,is,this.options),j(this,dr).data!==void 0&&A(this,as,j(this,K)),oa(n,t))return;A(this,We,n);const r=()=>{if(!t)return!0;const{notifyOnChangeProps:s}=this.options,i=typeof s=="function"?s():s;if(i==="all"||!i&&!j(this,ls).size)return!0;const a=new Set(i??j(this,ls));return this.options.throwOnError&&a.add("error"),Object.keys(j(this,We)).some(l=>{const c=l;return j(this,We)[c]!==t[c]&&a.has(c)})};q(this,la,y0).call(this,{listeners:r()})}onQueryUpdate(){this.updateResult(),this.hasListeners()&&q(this,Ni,_c).call(this)}},Ze=new WeakMap,K=new WeakMap,ji=new WeakMap,We=new WeakMap,dr=new WeakMap,is=new WeakMap,en=new WeakMap,Tn=new WeakMap,Ci=new WeakMap,os=new WeakMap,as=new WeakMap,fr=new WeakMap,pr=new WeakMap,Nn=new WeakMap,ls=new WeakMap,hr=new WeakSet,Vs=function(t){q(this,zi,Rc).call(this);let n=j(this,K).fetch(this.options,t);return t!=null&&t.throwOnError||(n=n.catch(qe)),n},Ei=new WeakSet,jc=function(){q(this,Ri,Tc).call(this);const t=qn(this.options.staleTime,j(this,K));if(_r||j(this,We).isStale||!vc(t))return;const r=c0(j(this,We).dataUpdatedAt,t)+1;A(this,fr,ir.setTimeout(()=>{j(this,We).isStale||this.updateResult()},r))},_i=new WeakSet,Cc=function(){return(typeof this.options.refetchInterval=="function"?this.options.refetchInterval(j(this,K)):this.options.refetchInterval)??!1},Ti=new WeakSet,Ec=function(t){q(this,Pi,Nc).call(this),A(this,Nn,t),!(_r||yt(this.options.enabled,j(this,K))===!1||!vc(j(this,Nn))||j(this,Nn)===0)&&A(this,pr,ir.setInterval(()=>{(this.options.refetchIntervalInBackground||Uu.isFocused())&&q(this,hr,Vs).call(this)},j(this,Nn)))},Ni=new WeakSet,_c=function(){q(this,Ei,jc).call(this),q(this,Ti,Ec).call(this,q(this,_i,Cc).call(this))},Ri=new WeakSet,Tc=function(){j(this,fr)&&(ir.clearTimeout(j(this,fr)),A(this,fr,void 0))},Pi=new WeakSet,Nc=function(){j(this,pr)&&(ir.clearInterval(j(this,pr)),A(this,pr,void 0))},zi=new WeakSet,Rc=function(){const t=j(this,Ze).getQueryCache().build(j(this,Ze),this.options);if(t===j(this,K))return;const n=j(this,K);A(this,K,t),A(this,ji,t.state),this.hasListeners()&&(n==null||n.removeObserver(this),t.addObserver(this))},la=new WeakSet,y0=function(t){ke.batch(()=>{t.listeners&&this.listeners.forEach(n=>{n(j(this,We))}),j(this,Ze).getQueryCache().notify({query:j(this,K),type:"observerResultsUpdated"})})},Gf);function m2(e,t){return yt(t.enabled,e)!==!1&&e.state.data===void 0&&!(e.state.status==="error"&&t.retryOnMount===!1)}function Mf(e,t){return m2(e,t)||e.state.data!==void 0&&Pc(e,t,t.refetchOnMount)}function Pc(e,t,n){if(yt(t.enabled,e)!==!1&&qn(t.staleTime,e)!=="static"){const r=typeof n=="function"?n(e):n;return r==="always"||r!==!1&&Wu(e,t)}return!1}function Ff(e,t,n,r){return(e!==t||yt(r.enabled,e)===!1)&&(!n.suspense||e.state.status!=="error")&&Wu(e,n)}function Wu(e,t){return yt(t.enabled,e)!==!1&&e.isStaleByTime(qn(t.staleTime,e))}function g2(e,t){return!oa(e.getCurrentResult(),t)}function Df(e){return{onFetch:(t,n)=>{var p,m,g,b,x;const r=t.options,s=(g=(m=(p=t.fetchOptions)==null?void 0:p.meta)==null?void 0:m.fetchMore)==null?void 0:g.direction,i=((b=t.state.data)==null?void 0:b.pages)||[],a=((x=t.state.data)==null?void 0:x.pageParams)||[];let l={pages:[],pageParams:[]},c=0;const u=async()=>{let v=!1;const k=h=>{Object.defineProperty(h,"signal",{enumerable:!0,get:()=>(t.signal.aborted?v=!0:t.signal.addEventListener("abort",()=>{v=!0}),t.signal)})},y=d0(t.options,t.fetchOptions),d=async(h,S,E)=>{if(v)return Promise.reject();if(S==null&&h.pages.length)return Promise.resolve(h);const _=(()=>{const U={client:t.client,queryKey:t.queryKey,pageParam:S,direction:E?"backward":"forward",meta:t.options.meta};return k(U),U})(),N=await y(_),{maxPages:C}=t.options,P=E?a2:o2;return{pages:P(h.pages,N,C),pageParams:P(h.pageParams,S,C)}};if(s&&i.length){const h=s==="backward",S=h?y2:$f,E={pages:i,pageParams:a},R=S(r,E);l=await d(E,R,h)}else{const h=e??i.length;do{const S=c===0?a[0]??r.initialPageParam:$f(r,l);if(c>0&&S==null)break;l=await d(l,S),c++}while(c<h)}return l};t.options.persister?t.fetchFn=()=>{var v,k;return(k=(v=t.options).persister)==null?void 0:k.call(v,u,{client:t.client,queryKey:t.queryKey,meta:t.options.meta,signal:t.signal},n)}:t.fetchFn=u}}}function $f(e,{pages:t,pageParams:n}){const r=t.length-1;return t.length>0?e.getNextPageParam(t[r],t,n[r],n):void 0}function y2(e,{pages:t,pageParams:n}){var r;return t.length>0?(r=e.getPreviousPageParam)==null?void 0:r.call(e,t[0],t,n[0],n):void 0}var Li,Ht,He,mr,Vt,vn,Zf,x2=(Zf=class extends m0{constructor(t){super();F(this,Vt);F(this,Li,void 0);F(this,Ht,void 0);F(this,He,void 0);F(this,mr,void 0);A(this,Li,t.client),this.mutationId=t.mutationId,A(this,He,t.mutationCache),A(this,Ht,[]),this.state=t.state||x0(),this.setOptions(t.options),this.scheduleGc()}setOptions(t){this.options=t,this.updateGcTime(this.options.gcTime)}get meta(){return this.options.meta}addObserver(t){j(this,Ht).includes(t)||(j(this,Ht).push(t),this.clearGcTimeout(),j(this,He).notify({type:"observerAdded",mutation:this,observer:t}))}removeObserver(t){A(this,Ht,j(this,Ht).filter(n=>n!==t)),this.scheduleGc(),j(this,He).notify({type:"observerRemoved",mutation:this,observer:t})}optionalRemove(){j(this,Ht).length||(this.state.status==="pending"?this.scheduleGc():j(this,He).remove(this))}continue(){var t;return((t=j(this,mr))==null?void 0:t.continue())??this.execute(this.state.variables)}async execute(t){var a,l,c,u,p,m,g,b,x,v,k,y,d,h,S,E,R,_,N,C;const n=()=>{q(this,Vt,vn).call(this,{type:"continue"})},r={client:j(this,Li),meta:this.options.meta,mutationKey:this.options.mutationKey};A(this,mr,h0({fn:()=>this.options.mutationFn?this.options.mutationFn(t,r):Promise.reject(new Error("No mutationFn found")),onFail:(P,U)=>{q(this,Vt,vn).call(this,{type:"failed",failureCount:P,error:U})},onPause:()=>{q(this,Vt,vn).call(this,{type:"pause"})},onContinue:n,retry:this.options.retry??0,retryDelay:this.options.retryDelay,networkMode:this.options.networkMode,canRun:()=>j(this,He).canRun(this)}));const s=this.state.status==="pending",i=!j(this,mr).canStart();try{if(s)n();else{q(this,Vt,vn).call(this,{type:"pending",variables:t,isPaused:i}),await((l=(a=j(this,He).config).onMutate)==null?void 0:l.call(a,t,this,r));const U=await((u=(c=this.options).onMutate)==null?void 0:u.call(c,t,r));U!==this.state.context&&q(this,Vt,vn).call(this,{type:"pending",context:U,variables:t,isPaused:i})}const P=await j(this,mr).start();return await((m=(p=j(this,He).config).onSuccess)==null?void 0:m.call(p,P,t,this.state.context,this,r)),await((b=(g=this.options).onSuccess)==null?void 0:b.call(g,P,t,this.state.context,r)),await((v=(x=j(this,He).config).onSettled)==null?void 0:v.call(x,P,null,this.state.variables,this.state.context,this,r)),await((y=(k=this.options).onSettled)==null?void 0:y.call(k,P,null,t,this.state.context,r)),q(this,Vt,vn).call(this,{type:"success",data:P}),P}catch(P){try{throw await((h=(d=j(this,He).config).onError)==null?void 0:h.call(d,P,t,this.state.context,this,r)),await((E=(S=this.options).onError)==null?void 0:E.call(S,P,t,this.state.context,r)),await((_=(R=j(this,He).config).onSettled)==null?void 0:_.call(R,void 0,P,this.state.variables,this.state.context,this,r)),await((C=(N=this.options).onSettled)==null?void 0:C.call(N,void 0,P,t,this.state.context,r)),P}finally{q(this,Vt,vn).call(this,{type:"error",error:P})}}finally{j(this,He).runNext(this)}}},Li=new WeakMap,Ht=new WeakMap,He=new WeakMap,mr=new WeakMap,Vt=new WeakSet,vn=function(t){const n=r=>{switch(t.type){case"failed":return{...r,failureCount:t.failureCount,failureReason:t.error};case"pause":return{...r,isPaused:!0};case"continue":return{...r,isPaused:!1};case"pending":return{...r,context:t.context,data:void 0,failureCount:0,failureReason:null,error:null,isPaused:t.isPaused,status:"pending",variables:t.variables,submittedAt:Date.now()};case"success":return{...r,data:t.data,failureCount:0,failureReason:null,error:null,status:"success",isPaused:!1};case"error":return{...r,data:void 0,error:t.error,failureCount:r.failureCount+1,failureReason:t.error,isPaused:!1,status:"error"}}};this.state=n(this.state),ke.batch(()=>{j(this,Ht).forEach(r=>{r.onMutationUpdate(t)}),j(this,He).notify({mutation:this,type:"updated",action:t})})},Zf);function x0(){return{context:void 0,data:void 0,error:null,failureCount:0,failureReason:null,isPaused:!1,status:"idle",variables:void 0,submittedAt:0}}var tn,Rt,Oi,ep,v2=(ep=class extends Rs{constructor(t={}){super();F(this,tn,void 0);F(this,Rt,void 0);F(this,Oi,void 0);this.config=t,A(this,tn,new Set),A(this,Rt,new Map),A(this,Oi,0)}build(t,n,r){const s=new x2({client:t,mutationCache:this,mutationId:++Qi(this,Oi)._,options:t.defaultMutationOptions(n),state:r});return this.add(s),s}add(t){j(this,tn).add(t);const n=ho(t);if(typeof n=="string"){const r=j(this,Rt).get(n);r?r.push(t):j(this,Rt).set(n,[t])}this.notify({type:"added",mutation:t})}remove(t){if(j(this,tn).delete(t)){const n=ho(t);if(typeof n=="string"){const r=j(this,Rt).get(n);if(r)if(r.length>1){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}else r[0]===t&&j(this,Rt).delete(n)}}this.notify({type:"removed",mutation:t})}canRun(t){const n=ho(t);if(typeof n=="string"){const r=j(this,Rt).get(n),s=r==null?void 0:r.find(i=>i.state.status==="pending");return!s||s===t}else return!0}runNext(t){var r;const n=ho(t);if(typeof n=="string"){const s=(r=j(this,Rt).get(n))==null?void 0:r.find(i=>i!==t&&i.state.isPaused);return(s==null?void 0:s.continue())??Promise.resolve()}else return Promise.resolve()}clear(){ke.batch(()=>{j(this,tn).forEach(t=>{this.notify({type:"removed",mutation:t})}),j(this,tn).clear(),j(this,Rt).clear()})}getAll(){return Array.from(j(this,tn))}find(t){const n={exact:!0,...t};return this.getAll().find(r=>Lf(n,r))}findAll(t={}){return this.getAll().filter(n=>Lf(t,n))}notify(t){ke.batch(()=>{this.listeners.forEach(n=>{n(t)})})}resumePausedMutations(){const t=this.getAll().filter(n=>n.state.isPaused);return ke.batch(()=>Promise.all(t.map(n=>n.continue().catch(qe))))}},tn=new WeakMap,Rt=new WeakMap,Oi=new WeakMap,ep);function ho(e){var t;return(t=e.options.scope)==null?void 0:t.id}var nn,Rn,et,rn,cs,Po,Ii,zc,tp,b2=(tp=class extends Rs{constructor(n,r){super();F(this,cs);F(this,Ii);F(this,nn,void 0);F(this,Rn,void 0);F(this,et,void 0);F(this,rn,void 0);A(this,nn,n),this.setOptions(r),this.bindMethods(),q(this,cs,Po).call(this)}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(n){var s;const r=this.options;this.options=j(this,nn).defaultMutationOptions(n),oa(this.options,r)||j(this,nn).getMutationCache().notify({type:"observerOptionsUpdated",mutation:j(this,et),observer:this}),r!=null&&r.mutationKey&&this.options.mutationKey&&Tr(r.mutationKey)!==Tr(this.options.mutationKey)?this.reset():((s=j(this,et))==null?void 0:s.state.status)==="pending"&&j(this,et).setOptions(this.options)}onUnsubscribe(){var n;this.hasListeners()||(n=j(this,et))==null||n.removeObserver(this)}onMutationUpdate(n){q(this,cs,Po).call(this),q(this,Ii,zc).call(this,n)}getCurrentResult(){return j(this,Rn)}reset(){var n;(n=j(this,et))==null||n.removeObserver(this),A(this,et,void 0),q(this,cs,Po).call(this),q(this,Ii,zc).call(this)}mutate(n,r){var s;return A(this,rn,r),(s=j(this,et))==null||s.removeObserver(this),A(this,et,j(this,nn).getMutationCache().build(j(this,nn),this.options)),j(this,et).addObserver(this),j(this,et).execute(n)}},nn=new WeakMap,Rn=new WeakMap,et=new WeakMap,rn=new WeakMap,cs=new WeakSet,Po=function(){var r;const n=((r=j(this,et))==null?void 0:r.state)??x0();A(this,Rn,{...n,isPending:n.status==="pending",isSuccess:n.status==="success",isError:n.status==="error",isIdle:n.status==="idle",mutate:this.mutate,reset:this.reset})},Ii=new WeakSet,zc=function(n){ke.batch(()=>{var r,s,i,a,l,c,u,p;if(j(this,rn)&&this.hasListeners()){const m=j(this,Rn).variables,g=j(this,Rn).context,b={client:j(this,nn),meta:this.options.meta,mutationKey:this.options.mutationKey};(n==null?void 0:n.type)==="success"?((s=(r=j(this,rn)).onSuccess)==null||s.call(r,n.data,m,g,b),(a=(i=j(this,rn)).onSettled)==null||a.call(i,n.data,null,m,g,b)):(n==null?void 0:n.type)==="error"&&((c=(l=j(this,rn)).onError)==null||c.call(l,n.error,m,g,b),(p=(u=j(this,rn)).onSettled)==null||p.call(u,void 0,n.error,m,g,b))}this.listeners.forEach(m=>{m(j(this,Rn))})})},tp),qt,np,w2=(np=class extends Rs{constructor(t={}){super();F(this,qt,void 0);this.config=t,A(this,qt,new Map)}build(t,n,r){const s=n.queryKey,i=n.queryHash??$u(s,n);let a=this.get(i);return a||(a=new p2({client:t,queryKey:s,queryHash:i,options:t.defaultQueryOptions(n),state:r,defaultOptions:t.getQueryDefaults(s)}),this.add(a)),a}add(t){j(this,qt).has(t.queryHash)||(j(this,qt).set(t.queryHash,t),this.notify({type:"added",query:t}))}remove(t){const n=j(this,qt).get(t.queryHash);n&&(t.destroy(),n===t&&j(this,qt).delete(t.queryHash),this.notify({type:"removed",query:t}))}clear(){ke.batch(()=>{this.getAll().forEach(t=>{this.remove(t)})})}get(t){return j(this,qt).get(t)}getAll(){return[...j(this,qt).values()]}find(t){const n={exact:!0,...t};return this.getAll().find(r=>zf(n,r))}findAll(t={}){const n=this.getAll();return Object.keys(t).length>0?n.filter(r=>zf(t,r)):n}notify(t){ke.batch(()=>{this.listeners.forEach(n=>{n(t)})})}onFocus(){ke.batch(()=>{this.getAll().forEach(t=>{t.onFocus()})})}onOnline(){ke.batch(()=>{this.getAll().forEach(t=>{t.onOnline()})})}},qt=new WeakMap,np),de,Pn,zn,us,ds,Ln,fs,ps,rp,S2=(rp=class{constructor(e={}){F(this,de,void 0);F(this,Pn,void 0);F(this,zn,void 0);F(this,us,void 0);F(this,ds,void 0);F(this,Ln,void 0);F(this,fs,void 0);F(this,ps,void 0);A(this,de,e.queryCache||new w2),A(this,Pn,e.mutationCache||new v2),A(this,zn,e.defaultOptions||{}),A(this,us,new Map),A(this,ds,new Map),A(this,Ln,0)}mount(){Qi(this,Ln)._++,j(this,Ln)===1&&(A(this,fs,Uu.subscribe(async e=>{e&&(await this.resumePausedMutations(),j(this,de).onFocus())})),A(this,ps,aa.subscribe(async e=>{e&&(await this.resumePausedMutations(),j(this,de).onOnline())})))}unmount(){var e,t;Qi(this,Ln)._--,j(this,Ln)===0&&((e=j(this,fs))==null||e.call(this),A(this,fs,void 0),(t=j(this,ps))==null||t.call(this),A(this,ps,void 0))}isFetching(e){return j(this,de).findAll({...e,fetchStatus:"fetching"}).length}isMutating(e){return j(this,Pn).findAll({...e,status:"pending"}).length}getQueryData(e){var n;const t=this.defaultQueryOptions({queryKey:e});return(n=j(this,de).get(t.queryHash))==null?void 0:n.state.data}ensureQueryData(e){const t=this.defaultQueryOptions(e),n=j(this,de).build(this,t),r=n.state.data;return r===void 0?this.fetchQuery(e):(e.revalidateIfStale&&n.isStaleByTime(qn(t.staleTime,n))&&this.prefetchQuery(t),Promise.resolve(r))}getQueriesData(e){return j(this,de).findAll(e).map(({queryKey:t,state:n})=>{const r=n.data;return[t,r]})}setQueryData(e,t,n){const r=this.defaultQueryOptions({queryKey:e}),s=j(this,de).get(r.queryHash),i=s==null?void 0:s.state.data,a=r2(t,i);if(a!==void 0)return j(this,de).build(this,r).setData(a,{...n,manual:!0})}setQueriesData(e,t,n){return ke.batch(()=>j(this,de).findAll(e).map(({queryKey:r})=>[r,this.setQueryData(r,t,n)]))}getQueryState(e){var n;const t=this.defaultQueryOptions({queryKey:e});return(n=j(this,de).get(t.queryHash))==null?void 0:n.state}removeQueries(e){const t=j(this,de);ke.batch(()=>{t.findAll(e).forEach(n=>{t.remove(n)})})}resetQueries(e,t){const n=j(this,de);return ke.batch(()=>(n.findAll(e).forEach(r=>{r.reset()}),this.refetchQueries({type:"active",...e},t)))}cancelQueries(e,t={}){const n={revert:!0,...t},r=ke.batch(()=>j(this,de).findAll(e).map(s=>s.cancel(n)));return Promise.all(r).then(qe).catch(qe)}invalidateQueries(e,t={}){return ke.batch(()=>(j(this,de).findAll(e).forEach(n=>{n.invalidate()}),(e==null?void 0:e.refetchType)==="none"?Promise.resolve():this.refetchQueries({...e,type:(e==null?void 0:e.refetchType)??(e==null?void 0:e.type)??"active"},t)))}refetchQueries(e,t={}){const n={...t,cancelRefetch:t.cancelRefetch??!0},r=ke.batch(()=>j(this,de).findAll(e).filter(s=>!s.isDisabled()&&!s.isStatic()).map(s=>{let i=s.fetch(void 0,n);return n.throwOnError||(i=i.catch(qe)),s.state.fetchStatus==="paused"?Promise.resolve():i}));return Promise.all(r).then(qe)}fetchQuery(e){const t=this.defaultQueryOptions(e);t.retry===void 0&&(t.retry=!1);const n=j(this,de).build(this,t);return n.isStaleByTime(qn(t.staleTime,n))?n.fetch(t):Promise.resolve(n.state.data)}prefetchQuery(e){return this.fetchQuery(e).then(qe).catch(qe)}fetchInfiniteQuery(e){return e.behavior=Df(e.pages),this.fetchQuery(e)}prefetchInfiniteQuery(e){return this.fetchInfiniteQuery(e).then(qe).catch(qe)}ensureInfiniteQueryData(e){return e.behavior=Df(e.pages),this.ensureQueryData(e)}resumePausedMutations(){return aa.isOnline()?j(this,Pn).resumePausedMutations():Promise.resolve()}getQueryCache(){return j(this,de)}getMutationCache(){return j(this,Pn)}getDefaultOptions(){return j(this,zn)}setDefaultOptions(e){A(this,zn,e)}setQueryDefaults(e,t){j(this,us).set(Tr(e),{queryKey:e,defaultOptions:t})}getQueryDefaults(e){const t=[...j(this,us).values()],n={};return t.forEach(r=>{Si(e,r.queryKey)&&Object.assign(n,r.defaultOptions)}),n}setMutationDefaults(e,t){j(this,ds).set(Tr(e),{mutationKey:e,defaultOptions:t})}getMutationDefaults(e){const t=[...j(this,ds).values()],n={};return t.forEach(r=>{Si(e,r.mutationKey)&&Object.assign(n,r.defaultOptions)}),n}defaultQueryOptions(e){if(e._defaulted)return e;const t={...j(this,zn).queries,...this.getQueryDefaults(e.queryKey),...e,_defaulted:!0};return t.queryHash||(t.queryHash=$u(t.queryKey,t)),t.refetchOnReconnect===void 0&&(t.refetchOnReconnect=t.networkMode!=="always"),t.throwOnError===void 0&&(t.throwOnError=!!t.suspense),!t.networkMode&&t.persister&&(t.networkMode="offlineFirst"),t.queryFn===Bu&&(t.enabled=!1),t}defaultMutationOptions(e){return e!=null&&e._defaulted?e:{...j(this,zn).mutations,...(e==null?void 0:e.mutationKey)&&this.getMutationDefaults(e.mutationKey),...e,_defaulted:!0}}clear(){j(this,de).clear(),j(this,Pn).clear()}},de=new WeakMap,Pn=new WeakMap,zn=new WeakMap,us=new WeakMap,ds=new WeakMap,Ln=new WeakMap,fs=new WeakMap,ps=new WeakMap,rp),v0=w.createContext(void 0),Ia=e=>{const t=w.useContext(v0);if(e)return e;if(!t)throw new Error("No QueryClient set, use QueryClientProvider to set one");return t},k2=({client:e,children:t})=>(w.useEffect(()=>(e.mount(),()=>{e.unmount()}),[e]),o.jsx(v0.Provider,{value:e,children:t})),b0=w.createContext(!1),j2=()=>w.useContext(b0);b0.Provider;function C2(){let e=!1;return{clearReset:()=>{e=!1},reset:()=>{e=!0},isReset:()=>e}}var E2=w.createContext(C2()),_2=()=>w.useContext(E2),T2=(e,t)=>{(e.suspense||e.throwOnError||e.experimental_prefetchInRender)&&(t.isReset()||(e.retryOnMount=!1))},N2=e=>{w.useEffect(()=>{e.clearReset()},[e])},R2=({result:e,errorResetBoundary:t,throwOnError:n,query:r,suspense:s})=>e.isError&&!t.isReset()&&!e.isFetching&&r&&(s&&e.data===void 0||f0(n,[e.error,r])),P2=e=>{if(e.suspense){const n=s=>s==="static"?s:Math.max(s??1e3,1e3),r=e.staleTime;e.staleTime=typeof r=="function"?(...s)=>n(r(...s)):n(r),typeof e.gcTime=="number"&&(e.gcTime=Math.max(e.gcTime,1e3))}},z2=(e,t)=>e.isLoading&&e.isFetching&&!t,L2=(e,t)=>(e==null?void 0:e.suspense)&&t.isPending,Bf=(e,t,n)=>t.fetchOptimistic(e).catch(()=>{n.clearReset()});function O2(e,t,n){var m,g,b,x,v;const r=j2(),s=_2(),i=Ia(n),a=i.defaultQueryOptions(e);(g=(m=i.getDefaultOptions().queries)==null?void 0:m._experimental_beforeQuery)==null||g.call(m,a),a._optimisticResults=r?"isRestoring":"optimistic",P2(a),T2(a,s),N2(s);const l=!i.getQueryCache().get(a.queryHash),[c]=w.useState(()=>new t(i,a)),u=c.getOptimisticResult(a),p=!r&&e.subscribed!==!1;if(w.useSyncExternalStore(w.useCallback(k=>{const y=p?c.subscribe(ke.batchCalls(k)):qe;return c.updateResult(),y},[c,p]),()=>c.getCurrentResult(),()=>c.getCurrentResult()),w.useEffect(()=>{c.setOptions(a)},[a,c]),L2(a,u))throw Bf(a,c,s);if(R2({result:u,errorResetBoundary:s,throwOnError:a.throwOnError,query:i.getQueryCache().get(a.queryHash),suspense:a.suspense}))throw u.error;if((x=(b=i.getDefaultOptions().queries)==null?void 0:b._experimental_afterQuery)==null||x.call(b,a,u),a.experimental_prefetchInRender&&!_r&&z2(u,r)){const k=l?Bf(a,c,s):(v=i.getQueryCache().get(a.queryHash))==null?void 0:v.promise;k==null||k.catch(qe).finally(()=>{c.updateResult()})}return a.notifyOnChangeProps?u:c.trackResult(u)}function w0(e,t){return O2(e,h2,t)}function S0(e,t){const n=Ia(t),[r]=w.useState(()=>new b2(n,e));w.useEffect(()=>{r.setOptions(e)},[r,e]);const s=w.useSyncExternalStore(w.useCallback(a=>r.subscribe(ke.batchCalls(a)),[r]),()=>r.getCurrentResult(),()=>r.getCurrentResult()),i=w.useCallback((a,l)=>{r.mutate(a,l).catch(qe)},[r]);if(s.error&&f0(r.options.throwOnError,[s.error]))throw s.error;return{...s,mutate:i,mutateAsync:s.mutate}}const I2=({skills:e,onSkillsChange:t,availableSkills:n,placeholder:r="Add skills...",maxSkills:s=10})=>{const[i,a]=w.useState(""),[l,c]=w.useState(!1),[u,p]=w.useState(-1),m=w.useRef(null),g=w.useRef(null),b=n.filter(d=>d.toLowerCase().includes(i.toLowerCase())&&!e.includes(d)).slice(0,8);w.useEffect(()=>{const d=h=>{g.current&&!g.current.contains(h.target)&&c(!1)};return document.addEventListener("mousedown",d),()=>document.removeEventListener("mousedown",d)},[]);const x=d=>{d.trim()&&!e.includes(d.trim())&&e.length<s&&(t([...e,d.trim()]),a(""),c(!1),p(-1))},v=d=>{t(e.filter(h=>h!==d))},k=d=>{d.key==="Enter"?(d.preventDefault(),u>=0&&b[u]?x(b[u]):i.trim()&&x(i.trim())):d.key==="ArrowDown"?(d.preventDefault(),p(h=>h<b.length-1?h+1:0)):d.key==="ArrowUp"?(d.preventDefault(),p(h=>h>0?h-1:b.length-1)):d.key==="Backspace"&&!i&&e.length>0?v(e[e.length-1]):d.key==="Escape"&&(c(!1),p(-1))},y=d=>{const h=d.target.value;a(h),c(h.length>0),p(-1)};return o.jsxs(o.Fragment,{children:[o.jsx("style",{children:`
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
      `}),o.jsxs("div",{className:"skills-container",ref:g,children:[o.jsxs("div",{className:"skills-input-wrapper",children:[e.map((d,h)=>o.jsxs("div",{className:"skill-tag",children:[d,o.jsx("button",{type:"button",className:"skill-tag-remove",onClick:()=>v(d),title:`Remove ${d}`,children:"×"})]},h)),o.jsx("input",{ref:m,type:"text",className:"skills-input",value:i,onChange:y,onKeyDown:k,onFocus:()=>i&&c(!0),placeholder:e.length===0?r:"",disabled:e.length>=s})]}),l&&b.length>0&&o.jsx("div",{className:"skills-suggestions",children:b.map((d,h)=>o.jsx("div",{className:`suggestion-item ${h===u?"highlighted":""}`,onClick:()=>x(d),children:d},d))}),o.jsxs("div",{className:`skills-counter ${e.length===s?"error":e.length>=s*.8?"warning":""}`,children:[e.length,"/",s," skills"]})]})]})},A2=({profileId:e,userName:t,isPublic:n,onPrivacyChange:r})=>{const[s,i]=w.useState(!1),[a,l]=w.useState(!1),c=`${window.location.origin}/public-profile/${e}`,u={name:t,profileUrl:c,timestamp:new Date().toISOString()},p=async v=>{try{await navigator.clipboard.writeText(v),i(!0),$.success("Copied to clipboard!"),setTimeout(()=>i(!1),2e3)}catch{$.error("Failed to copy to clipboard")}},m=()=>{const v=encodeURIComponent(`Check out ${t}'s professional profile`),k=encodeURIComponent(`Hi!

I'd like to share my professional profile with you:
${c}

Best regards,
${t}`);window.open(`mailto:?subject=${v}&body=${k}`,"_blank")},g=()=>{const v=encodeURIComponent(c),k=encodeURIComponent(`Check out my professional profile: ${t}`);window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${v}&text=${k}`,"_blank")},b=()=>{const v=encodeURIComponent(`Check out my professional profile: ${c}`);window.open(`https://wa.me/?text=${v}`,"_blank")},x=async()=>{l(!0);try{await new Promise(h=>setTimeout(h,2e3));const v=`
        Professional Profile - ${t}
        Generated on: ${new Date().toLocaleDateString()}
        Profile URL: ${c}
        
        This is a simplified version of the profile.
        For the full interactive experience, visit: ${c}
      `,k=new Blob([v],{type:"text/plain"}),y=URL.createObjectURL(k),d=document.createElement("a");d.href=y,d.download=`${t.replace(/\s+/g,"_")}_profile.txt`,document.body.appendChild(d),d.click(),document.body.removeChild(d),URL.revokeObjectURL(y),$.success("Profile exported successfully!")}catch{$.error("Failed to generate profile export")}finally{l(!1)}};return o.jsxs(o.Fragment,{children:[o.jsx("style",{children:`
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
      `}),o.jsxs("div",{className:"sharing-container",children:[o.jsxs("div",{className:"sharing-header",children:[o.jsx("div",{className:"sharing-title",children:"🔗 Profile Sharing & Privacy"}),o.jsxs("div",{className:"privacy-toggle",children:[o.jsx("span",{style:{fontSize:"0.9em",color:"#718096"},children:n?"Public":"Private"}),o.jsx("div",{className:`toggle-switch ${n?"active":""}`,onClick:()=>r(!n),children:o.jsx("div",{className:"toggle-slider"})})]})]}),n&&o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"url-section",children:[o.jsx("div",{style:{marginBottom:"0.5rem",fontSize:"0.9em",color:"#718096"},children:"Public Profile URL:"}),o.jsxs("div",{className:"url-input-group",children:[o.jsx("input",{type:"text",className:"url-input",value:c,readOnly:!0}),o.jsx("button",{className:`copy-button ${s?"copied":""}`,onClick:()=>p(c),children:s?"✓ Copied":"📋 Copy"})]})]}),o.jsx("div",{style:{marginBottom:"1rem",fontSize:"0.9em",color:"#718096"},children:"Share your profile:"}),o.jsxs("div",{className:"sharing-options",children:[o.jsx("button",{className:"share-button linkedin",onClick:g,children:"💼 LinkedIn"}),o.jsx("button",{className:"share-button whatsapp",onClick:b,children:"💬 WhatsApp"}),o.jsx("button",{className:"share-button email",onClick:m,children:"✉️ Email"}),o.jsx("button",{className:"share-button",onClick:()=>p(JSON.stringify(u,null,2)),children:"📄 Copy Data"})]})]}),o.jsx("div",{className:"export-section",children:o.jsx("button",{className:"export-button",onClick:x,disabled:a,children:a?"⏳ Generating...":"📥 Export Profile"})}),o.jsxs("div",{className:"privacy-info",children:[o.jsx("strong",{children:"Privacy Info:"})," ",n?"Your profile is visible to anyone with the link. You can disable public access anytime.":"Your profile is private and only visible to you when logged in."]})]})]})},M2=({userRole:e,portfolioItems:t,certifications:n,onPortfolioUpdate:r})=>{const[s,i]=w.useState("portfolio"),[a,l]=w.useState(!1);w.useState(null);const c=[{id:"1",title:"Modern Kitchen Renovation",description:"Complete kitchen renovation including custom cabinets, granite countertops, and modern appliances.",imageUrl:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",tags:["Kitchen","Renovation","Carpentry"],completedDate:"2024-08-15"},{id:"2",title:"Bathroom Remodel",description:"Luxury bathroom remodel with heated floors, rain shower, and custom tile work.",imageUrl:"https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400",tags:["Bathroom","Plumbing","Tiling"],completedDate:"2024-06-20"}],u=[{id:"1",name:"Licensed General Contractor",issuer:"State Licensing Board",issueDate:"2020-03-15",expiryDate:"2025-03-15",credentialId:"GC-2020-12345"},{id:"2",name:"OSHA 30-Hour Construction Safety",issuer:"OSHA Training Institute",issueDate:"2023-01-10",credentialId:"OSHA-30-67890"}],p=b=>{r(t.filter(x=>x.id!==b)),$.success("Portfolio item removed")},m=t.length>0?t:c,g=n.length>0?n:u;return o.jsxs(o.Fragment,{children:[o.jsx("style",{children:`
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
      `}),o.jsxs("div",{className:"portfolio-container",children:[o.jsxs("div",{className:"portfolio-tabs",children:[o.jsxs("button",{className:`portfolio-tab ${s==="portfolio"?"active":""}`,onClick:()=>i("portfolio"),children:["📁 ",e==="contractor"?"Projects":"Portfolio"]}),o.jsx("button",{className:`portfolio-tab ${s==="certifications"?"active":""}`,onClick:()=>i("certifications"),children:"🏆 Certifications"}),o.jsx("button",{className:`portfolio-tab ${s==="social"?"active":""}`,onClick:()=>i("social"),children:"🔗 Links"})]}),s==="portfolio"&&o.jsxs("div",{children:[o.jsxs("button",{className:"add-button",onClick:()=>l(!0),children:["➕ Add ",e==="contractor"?"Project":"Portfolio Item"]}),m.length>0?o.jsx("div",{className:"portfolio-grid",children:m.map(b=>o.jsxs("div",{className:"portfolio-card",children:[o.jsx("div",{className:"portfolio-image",style:{backgroundImage:b.imageUrl?`url(${b.imageUrl})`:"none"},children:!b.imageUrl&&"🖼️"}),o.jsxs("div",{className:"portfolio-content",children:[o.jsx("div",{className:"portfolio-title",children:b.title}),o.jsx("div",{className:"portfolio-description",children:b.description}),b.tags.length>0&&o.jsx("div",{className:"portfolio-tags",children:b.tags.map((x,v)=>o.jsx("span",{className:"portfolio-tag",children:x},v))}),b.completedDate&&o.jsxs("div",{className:"portfolio-date",children:["📅 Completed: ",new Date(b.completedDate).toLocaleDateString()]}),o.jsxs("div",{className:"portfolio-actions",children:[b.projectUrl&&o.jsx("button",{className:"action-button primary",onClick:()=>window.open(b.projectUrl,"_blank"),children:"🔗 View"}),o.jsx("button",{className:"action-button danger",onClick:()=>p(b.id),children:"🗑️ Remove"})]})]})]},b.id))}):o.jsxs("div",{className:"empty-state",children:[o.jsx("div",{className:"empty-state-icon",children:"📁"}),o.jsxs("h3",{children:["No ",e==="contractor"?"projects":"portfolio items"," yet"]}),o.jsxs("p",{children:["Showcase your work by adding your first ",e==="contractor"?"project":"portfolio item","!"]})]})]}),s==="certifications"&&o.jsxs("div",{children:[o.jsx("button",{className:"add-button",children:"➕ Add Certification"}),g.length>0?o.jsx("div",{className:"certification-list",children:g.map(b=>o.jsxs("div",{className:"certification-card",children:[o.jsx("div",{className:"certification-header",children:o.jsxs("div",{children:[o.jsx("div",{className:"certification-name",children:b.name}),o.jsx("div",{className:"certification-issuer",children:b.issuer})]})}),o.jsxs("div",{className:"certification-details",children:[o.jsxs("div",{className:"certification-detail",children:[o.jsx("div",{className:"certification-detail-label",children:"Issue Date"}),o.jsx("div",{className:"certification-detail-value",children:new Date(b.issueDate).toLocaleDateString()})]}),b.expiryDate&&o.jsxs("div",{className:"certification-detail",children:[o.jsx("div",{className:"certification-detail-label",children:"Expires"}),o.jsx("div",{className:"certification-detail-value",children:new Date(b.expiryDate).toLocaleDateString()})]}),b.credentialId&&o.jsxs("div",{className:"certification-detail",children:[o.jsx("div",{className:"certification-detail-label",children:"Credential ID"}),o.jsx("div",{className:"certification-detail-value",children:b.credentialId})]})]})]},b.id))}):o.jsxs("div",{className:"empty-state",children:[o.jsx("div",{className:"empty-state-icon",children:"🏆"}),o.jsx("h3",{children:"No certifications added"}),o.jsx("p",{children:"Add your professional certifications and licenses to build trust with clients."})]})]}),s==="social"&&o.jsxs("div",{children:[o.jsx("button",{className:"add-button",children:"➕ Add Social Link"}),o.jsxs("div",{className:"social-links",children:[o.jsxs("div",{className:"social-link-card",children:[o.jsx("div",{className:"social-icon linkedin",children:"💼"}),o.jsxs("div",{children:[o.jsx("div",{style:{fontWeight:"600",color:"#2d3748"},children:"LinkedIn"}),o.jsx("div",{style:{color:"#718096",fontSize:"0.9em"},children:"Connect professionally"})]})]}),o.jsxs("div",{className:"social-link-card",children:[o.jsx("div",{className:"social-icon website",children:"🌐"}),o.jsxs("div",{children:[o.jsx("div",{style:{fontWeight:"600",color:"#2d3748"},children:"Website"}),o.jsx("div",{style:{color:"#718096",fontSize:"0.9em"},children:"Your professional website"})]})]}),o.jsxs("div",{className:"social-link-card",children:[o.jsx("div",{className:"social-icon github",children:"🔧"}),o.jsxs("div",{children:[o.jsx("div",{style:{fontWeight:"600",color:"#2d3748"},children:"Portfolio"}),o.jsx("div",{style:{color:"#718096",fontSize:"0.9em"},children:"Showcase your work"})]})]})]})]})]})]})},F2=({location:e,address:t,onLocationChange:n,onAddressChange:r,disabled:s=!1})=>{const[i,a]=w.useState(!1),[l,c]=w.useState(!0),u=async(m,g)=>{try{const b=await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${m}&lon=${g}&zoom=18&addressdetails=1`);if(!b.ok)throw new Error("Geocoding service unavailable");const x=await b.json();if(x.error)throw new Error(x.error);const v=x.address||{};return{street:`${v.house_number||""} ${v.road||""}`.trim(),city:v.city||v.town||v.village||"",state:v.state||v.province||"",country:v.country||"",postalCode:v.postcode||"",formattedAddress:x.display_name||""}}catch(b){throw console.error("Reverse geocoding failed:",b),new Error("Unable to get address for this location")}},p=async()=>{if(!navigator.geolocation){$.error("Geolocation is not supported by your browser");return}a(!0);try{const m=await new Promise((x,v)=>{navigator.geolocation.getCurrentPosition(x,v,{enableHighAccuracy:!0,timeout:1e4,maximumAge:6e4})}),{latitude:g,longitude:b}=m.coords;try{const x=await u(g,b),v=[x.city,x.state,x.country].filter(Boolean).join(", "),k=[x.street,x.city,x.state,x.postalCode,x.country].filter(Boolean).join(", ");n(v||`${g.toFixed(4)}, ${b.toFixed(4)}`),r(k||x.formattedAddress||"");const y=v||`${g.toFixed(4)}, ${b.toFixed(4)}`;$.success(`📍 Location detected: ${y}`,{autoClose:4e3,position:"top-right"}),c(!1)}catch{const v=`${g.toFixed(4)}, ${b.toFixed(4)}`;n(v),$.warning("Location detected, but unable to get address details. You can edit manually.")}}catch(m){let g="Unable to detect location";m.code===1?g="Location access denied. Please enable location permissions.":m.code===2?g="Location unavailable. Please check your GPS settings.":m.code===3&&(g="Location request timed out. Please try again."),$.error(g)}finally{a(!1)}};return o.jsxs(o.Fragment,{children:[o.jsx("style",{children:`
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
      `}),o.jsxs("div",{className:"location-selector",children:[o.jsxs("div",{className:"location-detection",children:[o.jsxs("div",{className:"location-info",children:[o.jsx("div",{className:"location-info-title",children:"📍 Use Current Location"}),o.jsx("div",{children:"Automatically detect and fill your location details using GPS"})]}),o.jsx("button",{type:"button",className:`detect-btn ${i?"detecting":""}`,onClick:p,disabled:s||i,children:i?o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"spinner",children:"🔄"}),"Detecting..."]}):o.jsxs(o.Fragment,{children:[o.jsx("span",{children:"📡"}),"Use Current Location"]})})]}),o.jsx("div",{className:"location-divider",children:"OR enter manually"}),l&&o.jsxs("div",{className:"manual-entry",children:[o.jsxs("div",{className:"form-group",children:[o.jsx("label",{className:"form-label",children:"Location/City"}),o.jsx("input",{type:"text",className:"form-input",value:e,onChange:m=>n(m.target.value),placeholder:"Enter your city, state, country",disabled:s})]}),o.jsxs("div",{className:"form-group",children:[o.jsx("label",{className:"form-label",children:"Full Address"}),o.jsx("textarea",{className:"form-input",value:t,onChange:m=>r(m.target.value),placeholder:"Enter your complete address",disabled:s,rows:3,style:{resize:"vertical",minHeight:"80px"}})]})]}),!l&&o.jsx("button",{type:"button",className:"toggle-manual",onClick:()=>c(!0),children:"✏️ Edit address manually"})]})]})};function D2(e,t){const[n,r]=w.useState({isComplete:!1,isFirstLogin:!1,missingFields:[],completionPercentage:0,isLocked:!1});return w.useEffect(()=>{if(!e||!t){r({isComplete:!1,isFirstLogin:!1,missingFields:[],completionPercentage:0,isLocked:!1});return}const s=$2(t.username||""),a=[{key:"email",label:"Email",value:e.email,required:s!=="email"},{key:"phone",label:"Phone Number",value:e.phone,required:s!=="phone"},{key:"location",label:"Location",value:e.location,required:!0},{key:"address",label:"Address",value:e.address,required:!0},{key:"skillType",label:"Primary Skill",value:e.skillType,required:!0},{key:"name",label:"Display Name",value:e.name,required:!0}].filter(v=>v.required),l=a.filter(v=>!v.value||v.value.toString().trim()==="").map(v=>v.label),c=a.length-l.length,u=Math.round(c/a.length*100),p=l.length===0,m=s!=="email",g=s!=="phone",b=!e.profileCompletedAt&&(m&&!e.email||g&&!e.phone||!e.location||!e.skillType),x=!!e.profileLockedAt||p&&!!e.profileCompletedAt;r({isComplete:p,isFirstLogin:b,missingFields:l,completionPercentage:u,isLocked:x})},[e,t]),n}function $2(e){if(!e)return"unknown";const t=e.trim();return/^\+?\d{7,15}$/.test(t)?"phone":/^\S+@\S+\.\S+$/.test(t)||t.includes("@")?"email":"unknown"}function ze(e,t){return!e||!["email","phone"].includes(t)?!1:!!e.profileLockedAt||!!e.profileCompletedAt&&!!e.email&&!!e.phone}function B2(e){const t={isValid:!0,errors:[],warnings:[],infos:[]};return e.required&&(!e.value||e.value.toString().trim()==="")?(t.isValid=!1,t.errors.push(`${e.fieldName} is required`),t):(!e.value||e.value.toString().trim()===""||e.rules.forEach(n=>{if(!n.rule(e.value))switch(n.severity){case"error":t.isValid=!1,t.errors.push(n.message);break;case"warning":t.warnings.push(n.message);break;case"info":t.infos.push(n.message);break}}),t)}const U2=({validation:e,showSuccess:t=!0})=>e.errors.length>0?o.jsxs("div",{style:{color:"#e53e3e",fontSize:"0.8em",marginTop:"0.25rem",display:"flex",alignItems:"center",gap:"0.25rem"},children:[o.jsx("span",{children:"❌"}),o.jsx("div",{children:e.errors.map((n,r)=>o.jsx("div",{children:n},r))})]}):e.warnings.length>0?o.jsxs("div",{style:{color:"#d69e2e",fontSize:"0.8em",marginTop:"0.25rem",display:"flex",alignItems:"center",gap:"0.25rem"},children:[o.jsx("span",{children:"⚠️"}),o.jsx("div",{children:e.warnings.map((n,r)=>o.jsx("div",{children:n},r))})]}):e.infos.length>0?o.jsxs("div",{style:{color:"#3182ce",fontSize:"0.8em",marginTop:"0.25rem",display:"flex",alignItems:"center",gap:"0.25rem"},children:[o.jsx("span",{children:"ℹ️"}),o.jsx("div",{children:e.infos.map((n,r)=>o.jsx("div",{children:n},r))})]}):t&&e.isValid?o.jsxs("div",{style:{color:"#38a169",fontSize:"0.8em",marginTop:"0.25rem",display:"flex",alignItems:"center",gap:"0.25rem"},children:[o.jsx("span",{children:"✅"}),o.jsx("span",{children:"Looks good!"})]}):null,Uf={email:{rule:e=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e),message:"Please enter a valid email address",severity:"error"},phone:{rule:e=>/^\+?[1-9]\d{1,14}$/.test(e.replace(/[\s-()]/g,"")),message:"Please enter a valid phone number",severity:"error"},url:{rule:e=>{try{return new URL(e),!0}catch{return!1}},message:"Please enter a valid URL",severity:"error"},minLength:e=>({rule:t=>t.length>=e,message:`Must be at least ${e} characters`,severity:"error"}),maxLength:e=>({rule:t=>t.length<=e,message:`Must be no more than ${e} characters`,severity:"error"}),minValue:e=>({rule:t=>t>=e,message:`Must be at least ${e}`,severity:"error"}),maxValue:e=>({rule:t=>t<=e,message:`Must be no more than ${e}`,severity:"error"}),strongPassword:{rule:e=>e.length>=8&&/[A-Z]/.test(e)&&/[a-z]/.test(e)&&/\d/.test(e),message:"Password must be at least 8 characters with uppercase, lowercase, and numbers",severity:"error"},noSpaces:{rule:e=>!e.includes(" "),message:"Cannot contain spaces",severity:"error"},alphanumeric:{rule:e=>/^[a-zA-Z0-9]+$/.test(e),message:"Only letters and numbers allowed",severity:"error"},professionalEmail:{rule:e=>{const t=e.split("@")[1];return t?!["gmail.com","yahoo.com","hotmail.com","outlook.com"].includes(t.toLowerCase()):!1},message:"Consider using a professional email address",severity:"warning"},hourlyRateRange:{rule:e=>e>=10&&e<=500,message:"Hourly rate should typically be between $10-$500",severity:"warning"},experienceYears:{rule:e=>e<=50,message:"Experience years seems unusually high",severity:"warning"},futureDate:{rule:e=>new Date(e)>new Date,message:"Date should be in the future",severity:"error"},pastDate:{rule:e=>new Date(e)<new Date,message:"Date should be in the past",severity:"error"},linkedInProfile:{rule:e=>e.includes("linkedin.com/in/"),message:"Should be a LinkedIn profile URL",severity:"error"},goodDescription:{rule:e=>e.split(" ").length>=10,message:"A more detailed description would be helpful",severity:"info"}},W2=({message:e,show:t})=>t?o.jsxs(o.Fragment,{children:[o.jsx("style",{children:`
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
      `}),o.jsx("div",{className:"success-backdrop",children:o.jsxs("div",{className:"success-animation",children:[o.jsx("div",{className:"success-icon",children:"🎉"}),o.jsx("div",{className:"success-message",children:e}),o.jsx("div",{style:{color:"#718096",fontSize:"0.9em"},children:"Your changes have been saved successfully!"})]})})]}):null;var H2={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const V2=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),q2=(e,t)=>{const n=w.forwardRef(({color:r="currentColor",size:s=24,strokeWidth:i=2,absoluteStrokeWidth:a,children:l,...c},u)=>w.createElement("svg",{ref:u,...H2,width:s,height:s,stroke:r,strokeWidth:a?Number(i)*24/Number(s):i,className:`lucide lucide-${V2(e)}`,...c},[...t.map(([p,m])=>w.createElement(p,m)),...(Array.isArray(l)?l:[l])||[]]));return n.displayName=`${e}`,n};var mn=q2;const Q2=mn("Calendar",[["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",ry:"2",key:"eu3xkr"}],["line",{x1:"16",x2:"16",y1:"2",y2:"6",key:"m3sa8f"}],["line",{x1:"8",x2:"8",y1:"2",y2:"6",key:"18kwsl"}],["line",{x1:"3",x2:"21",y1:"10",y2:"10",key:"xt86sb"}]]),K2=mn("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]),Wf=mn("Eye",[["path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z",key:"rwhkz3"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]),Y2=mn("MessageCircle",[["path",{d:"m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z",key:"v2veuj"}]]),J2=mn("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]),X2=mn("Share",[["path",{d:"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8",key:"1b2hhj"}],["polyline",{points:"16 6 12 2 8 6",key:"m901s6"}],["line",{x1:"12",x2:"12",y1:"2",y2:"15",key:"1p0rca"}]]),Hf=mn("TrendingUp",[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]]),Vf=mn("UserCheck",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["polyline",{points:"16 11 18 13 22 9",key:"1pwet4"}]]),qf=mn("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]),G2=()=>{const{token:e}=ht(),[t,n]=w.useState([]),[r,s]=w.useState(null),[i,a]=w.useState(!0),[l,c]=w.useState(!1),[u,p]=w.useState(!1),[m,g]=w.useState({customMessage:"Hey! I'd love for you to join this amazing platform. It's perfect for connecting contractors and workers. Check it out!"}),b=async()=>{if(!e){a(!1);return}try{const h=await fetch("/api/invitations",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(h.ok){const S=await h.json();n(S.data.invitations),s(S.data.stats)}}catch(h){console.error("Error fetching invitations:",h)}finally{a(!1)}},x=async()=>{if(!e){alert("Please log in to create invitations");return}p(!0);try{const h=await fetch("/api/invitations",{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({invitationType:"general",customMessage:m.customMessage})});if(h.ok){const S=await h.json(),{invitationLink:E,shareLinks:R}=S.data;v(E,R),b(),g({customMessage:"Hey! I'd love for you to join this amazing platform. It's perfect for connecting contractors and workers. Check it out!"}),c(!1)}else alert("Failed to create invitation. Please try again.")}catch(h){console.error("Error creating invitation:",h),alert("Error creating invitation. Please try again.")}finally{p(!1)}},v=(h,S)=>{const E=`${m.customMessage}

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
            <a href="${S.whatsapp}" target="_blank" class="flex flex-col items-center p-3 bg-green-500 text-white rounded hover:bg-green-600">
              <svg class="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 2.079.549 4.088 1.595 5.872L0 24l6.257-1.611c1.724.957 3.67 1.466 5.76 1.466 6.621 0 11.988-5.367 11.988-11.988C23.971 5.346 18.637.001 12.017.001zM18.476 16.641c-.295.827-1.455 1.511-2.389 1.701-.642.131-1.48.193-4.318-1.012-3.604-1.532-5.918-5.17-6.096-5.412-.177-.241-1.455-1.933-1.455-3.688s.916-2.616 1.241-2.975c.326-.359.712-.449 1.012-.449.295 0 .594.006.85.015.273.01.64-.103.998 1.012.366 1.139 1.262 3.076 1.375 3.297.113.221.189.482.038.772-.15.295-.225.482-.449.741-.225.259-.472.577-.675.772-.225.221-.459.459-.197.9.262.441 1.166 1.93 2.505 3.125 1.723 1.54 3.174 2.018 3.628 2.244.455.225.719.189.984-.113.266-.302 1.139-1.329 1.442-1.785.304-.455.607-.378.026.227-.38.604-1.513 2.244-2.389 2.714z"/>
              </svg>
              <span class="text-xs">WhatsApp</span>
            </a>
            <a href="${S.email}" target="_blank" class="flex flex-col items-center p-3 bg-blue-500 text-white rounded hover:bg-blue-600">
              <svg class="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <span class="text-xs">Email</span>
            </a>
            <a href="${S.sms}" target="_blank" class="flex flex-col items-center p-3 bg-gray-500 text-white rounded hover:bg-gray-600">
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
    `,document.body.appendChild(R)},k=h=>{navigator.clipboard.writeText(h)},y=h=>new Date(h).toLocaleDateString(),d=h=>{switch(h){case"sent":return"bg-yellow-100 text-yellow-800";case"clicked":return"bg-blue-100 text-blue-800";case"registered":return"bg-green-100 text-green-800";case"expired":return"bg-red-100 text-red-800";default:return"bg-gray-100 text-gray-800"}};return w.useEffect(()=>{b()},[]),i?o.jsx("div",{className:"flex items-center justify-center p-8",children:o.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"})}):o.jsxs("div",{className:"max-w-6xl mx-auto p-6",children:[o.jsxs("div",{className:"bg-white rounded-lg shadow-sm border",children:[o.jsx("div",{className:"border-b p-6",children:o.jsxs("div",{className:"flex items-center justify-between",children:[o.jsxs("div",{children:[o.jsxs("h2",{className:"text-2xl font-semibold text-gray-900 flex items-center",children:[o.jsx(qf,{className:"mr-3 text-blue-600",size:28}),"Invite Friends"]}),o.jsx("p",{className:"text-gray-600 mt-1",children:"Grow our community by inviting friends and colleagues"})]}),o.jsxs("button",{onClick:()=>c(!0),className:"bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2",children:[o.jsx(J2,{size:16}),o.jsx("span",{children:"Create Invitation Message"})]})]})}),r&&o.jsx("div",{className:"p-6 border-b bg-gray-50",children:o.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-5 gap-4",children:[o.jsxs("div",{className:"text-center",children:[o.jsx("div",{className:"flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-2",children:o.jsx(X2,{className:"text-blue-600",size:20})}),o.jsx("div",{className:"text-2xl font-semibold text-gray-900",children:r.totalSent}),o.jsx("div",{className:"text-sm text-gray-600",children:"Sent"})]}),o.jsxs("div",{className:"text-center",children:[o.jsx("div",{className:"flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-2",children:o.jsx(Wf,{className:"text-purple-600",size:20})}),o.jsx("div",{className:"text-2xl font-semibold text-gray-900",children:r.totalClicked}),o.jsx("div",{className:"text-sm text-gray-600",children:"Clicked"})]}),o.jsxs("div",{className:"text-center",children:[o.jsx("div",{className:"flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-2",children:o.jsx(Vf,{className:"text-green-600",size:20})}),o.jsx("div",{className:"text-2xl font-semibold text-gray-900",children:r.totalRegistered}),o.jsx("div",{className:"text-sm text-gray-600",children:"Joined"})]}),o.jsxs("div",{className:"text-center",children:[o.jsx("div",{className:"flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mx-auto mb-2",children:o.jsx(Hf,{className:"text-orange-600",size:20})}),o.jsxs("div",{className:"text-2xl font-semibold text-gray-900",children:[r.clickRate.toFixed(1),"%"]}),o.jsx("div",{className:"text-sm text-gray-600",children:"Click Rate"})]}),o.jsxs("div",{className:"text-center",children:[o.jsx("div",{className:"flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mx-auto mb-2",children:o.jsx(Hf,{className:"text-indigo-600",size:20})}),o.jsxs("div",{className:"text-2xl font-semibold text-gray-900",children:[r.conversionRate.toFixed(1),"%"]}),o.jsx("div",{className:"text-sm text-gray-600",children:"Conversion"})]})]})}),o.jsxs("div",{className:"p-6",children:[o.jsx("h3",{className:"text-lg font-medium text-gray-900 mb-4",children:"Your Invitations"}),t.length===0?o.jsxs("div",{className:"text-center py-8",children:[o.jsx(qf,{className:"mx-auto h-12 w-12 text-gray-400"}),o.jsx("h3",{className:"mt-2 text-sm font-medium text-gray-900",children:"No invitations yet"}),o.jsx("p",{className:"mt-1 text-sm text-gray-500",children:"Start by creating your first invitation"})]}):o.jsx("div",{className:"space-y-4",children:t.map(h=>o.jsx("div",{className:"border rounded-lg p-4 hover:bg-gray-50 transition-colors",children:o.jsxs("div",{className:"flex items-center justify-between",children:[o.jsxs("div",{className:"flex-1",children:[o.jsxs("div",{className:"flex items-center space-x-3",children:[o.jsx("div",{className:`px-2 py-1 rounded-full text-xs font-medium ${d(h.status)}`,children:h.status.charAt(0).toUpperCase()+h.status.slice(1)}),o.jsx("span",{className:"text-sm text-gray-500 capitalize",children:h.type}),h.recipientName&&o.jsxs("span",{className:"text-sm text-gray-700",children:["→ ",h.recipientName]})]}),o.jsxs("div",{className:"mt-2 flex items-center space-x-4 text-sm text-gray-500",children:[o.jsxs("span",{className:"flex items-center",children:[o.jsx(Q2,{className:"mr-1",size:14}),y(h.createdAt)]}),o.jsxs("span",{className:"flex items-center",children:[o.jsx(Wf,{className:"mr-1",size:14}),h.clicksCount," clicks"]}),h.registeredAt&&o.jsxs("span",{className:"flex items-center text-green-600",children:[o.jsx(Vf,{className:"mr-1",size:14}),"Joined ",y(h.registeredAt)]})]})]}),o.jsxs("div",{className:"flex items-center space-x-2",children:[o.jsx("button",{onClick:()=>{const S=`${window.location.origin}/register?invite=${h.code}`;k(S)},className:"p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded",title:"Copy link",children:o.jsx(K2,{size:16})}),o.jsx("button",{onClick:()=>{const S=`${window.location.origin}/register?invite=${h.code}`,E=`https://wa.me/?text=${encodeURIComponent(`Join our platform! ${S}`)}`;window.open(E,"_blank")},className:"p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded",title:"Share on WhatsApp",children:o.jsx(Y2,{size:16})})]})]})},h.id))})]})]}),l&&o.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",children:o.jsxs("div",{className:"bg-white rounded-lg p-6 max-w-md w-full mx-4",children:[o.jsx("h3",{className:"text-lg font-semibold mb-4",children:"Create Invitation Message"}),o.jsx("div",{className:"space-y-4",children:o.jsxs("div",{children:[o.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Write your invitation message"}),o.jsx("textarea",{value:m.customMessage,onChange:h=>g({...m,customMessage:h.target.value}),className:"w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500",rows:4,placeholder:"Write your personal invitation message here..."}),o.jsx("p",{className:"text-sm text-gray-500 mt-1",children:"Write a personal message to invite someone. The invitation link will be automatically added to your message."})]})}),o.jsxs("div",{className:"flex space-x-3 mt-6",children:[o.jsx("button",{onClick:()=>c(!1),className:"flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300",disabled:u,children:"Cancel"}),o.jsx("button",{onClick:x,className:"flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50",disabled:u,children:u?"Creating...":"Generate Message & Link"})]})]})})]})};function Z2(e,t){return e?/^\+?\d{7,15}$/.test(e.trim())?"phone":/^\S+@\S+\.\S+$/.test(e.trim())?"email":t!=null&&t.provider||t!=null&&t.oauth_provider?"oauth":"email":t!=null&&t.email?"email":t!=null&&t.phone?"phone":"unknown"}function ew(e,t){return e&&e.trim()?e.trim().split(" ").map(n=>n[0]).join("").toUpperCase().slice(0,2):t?t.split("@")[0].slice(0,2).toUpperCase():"U"}function tw(e,t){const n=["#FF6B6B","#4ECDC4","#45B7D1","#96CEB4","#FECA57","#FF9FF3","#54A0FF","#5F27CD","#00D2D3","#FF9F43","#10AC84","#EE5A6F","#60A3BC","#778CA3","#F8B500"],r=e||t||"default";let s=0;for(let i=0;i<r.length;i++)s=r.charCodeAt(i)+((s<<5)-s);return n[Math.abs(s)%n.length]}const nw=()=>{var Vu,qu;const{user:e,token:t}=ht(),n=Z2((e==null?void 0:e.username)||"",e),r=((Vu=e==null?void 0:e.roles)==null?void 0:Vu.includes("admin"))||(e==null?void 0:e.role)==="admin",s=w.useRef(null),i=I=>I==="email"&&n==="email"||I==="phone"&&n==="phone",[a,l]=w.useState([{value:"",label:"Select skill type"}]),[c,u]=w.useState(!1),[p,m]=w.useState(""),[g,b]=w.useState({}),[x,v]=w.useState("basic"),[k,y]=w.useState("idle"),[d,h]=w.useState(null),[S,E]=w.useState(!1),R={email:n==="email"&&(e==null?void 0:e.username)||"",phone:n==="phone"&&(e==null?void 0:e.username)||"",role:(e==null?void 0:e.role)||void 0,name:"",location:"",address:"",avatar:null,skillType:"",experienceYears:null,hourlyRate:null,availability:"",description:"",isAvailable:null,rating:null,completedJobs:null,skills:[],certifications:[],portfolioLinks:[],companyName:"",companyDescription:"",verificationStatus:null,totalJobsPosted:null,companyWebsite:"",companySize:"",establishedYear:null},[_,N]=w.useState(R),[C,P]=w.useState(R),[U,J]=w.useState(!0),[ee,ge]=w.useState(!1),[ye,ne]=w.useState(""),[pe,O]=w.useState(null),[W,H]=w.useState([]),[Y,G]=w.useState(!1),[Ae,Ce]=w.useState({projects:[],certifications:[],socialLinks:[]}),[$t,at]=w.useState([]),gn=D2(_,e);w.useEffect(()=>{},[gn.isFirstLogin,U,_,e]),w.useEffect(()=>{t&&(async()=>{try{const D=await(await xr(`${At.USER_SERVICE}/skills`,{headers:t?{Authorization:`Bearer ${t}`}:{}})).json(),oe=(D==null?void 0:D.skills)||(D==null?void 0:D.data)||[];at(Array.isArray(oe)?oe:[])}catch(z){console.log("Failed to load skills:",z),at(["JavaScript","Python","React","Node.js","CSS","HTML","TypeScript","Vue.js","Angular","PHP"])}})()},[t]);const B=(I,z,D)=>{let oe="";return z&&(oe=z.skillType||z.skill_type||z.skilltype||z.SkillType||z.SKILL_TYPE||"",!oe&&z.skills&&Array.isArray(z.skills)&&z.skills.length>0&&(oe=z.skills[0])),{id:I.id,name:I.name??null,email:I.email??(n==="email"?I.username:null),phone:I.phone??(n==="phone"?I.username:null),role:I.role,location:I.location??null,address:I.address??null,avatar:I.avatar??null,skillType:oe||null,experienceYears:((z==null?void 0:z.experienceYears)||(z==null?void 0:z.experience_years))??null,hourlyRate:((z==null?void 0:z.hourlyRate)||(z==null?void 0:z.hourly_rate))??null,availability:(z==null?void 0:z.availability)??null,description:(z==null?void 0:z.description)??null,isAvailable:(z==null?void 0:z.isAvailable)??(z==null?void 0:z.is_available)??null,rating:((z==null?void 0:z.rating)||(D==null?void 0:D.rating))??null,completedJobs:(z==null?void 0:z.completed_jobs)??null,skills:(z==null?void 0:z.skills)||[],certifications:(z==null?void 0:z.certifications)||[],portfolioLinks:(z==null?void 0:z.portfolio_links)||[],companyName:((D==null?void 0:D.companyName)||(D==null?void 0:D.company_name))??null,companyDescription:((D==null?void 0:D.companyDescription)||(D==null?void 0:D.company_description))??null,verificationStatus:(D==null?void 0:D.verification_status)??null,totalJobsPosted:(D==null?void 0:D.total_jobs_posted)??null,companyWebsite:(D==null?void 0:D.company_website)??null,companySize:(D==null?void 0:D.company_size)??null,establishedYear:(D==null?void 0:D.established_year)??null}},Re=w.useCallback(async()=>{var z;return t?(z=(await jn.get("http://localhost:3002/api/users/profile",{withCredentials:!0,headers:{Authorization:`Bearer ${t}`}})).data)==null?void 0:z.data:null},[t]),yn=Ia(),{data:Ps,isLoading:zr,error:jt}=w0({queryKey:["profile"],queryFn:Re,enabled:!!t,staleTime:1e3*60});w.useEffect(()=>{if(Ps){const I=Ps,z=I.user||{},D=z.role==="worker"&&(I.workerProfile||I.profile)||void 0,oe=z.role==="contractor"&&(I.contractorProfile||I.profile)||void 0,Me=B(z,D,oe);N(Me);const xe={...Me};if(xe.phone===null&&(xe.phone=""),xe.email===null&&(xe.email=""),xe.name===null&&(xe.name=""),xe.location===null&&(xe.location=""),xe.address===null&&(xe.address=""),P(Jt=>({...Jt,...xe})),I.meta&&(typeof I.meta.completeness=="number"&&O(I.meta.completeness),Array.isArray(I.meta.completenessBreakdown))){const Jt=I.meta.completenessBreakdown.filter(Lr=>!Lr.present).map(Lr=>Lr.field);H(Jt)}J(!1)}else zr||J(!1)},[Ps,zr]);const Hu=w.useCallback(async()=>{var I;u(!0),m("");try{const D=((I=(await jn.get("http://localhost:3002/api/users/skills")).data)==null?void 0:I.data)||[],oe=[{value:"",label:"Select skill type"},...D.map(Me=>({value:Me,label:Me.charAt(0).toUpperCase()+Me.slice(1)}))];l(oe)}catch{m("Failed to load skills")}finally{u(!1)}},[]);w.useEffect(()=>{Hu()},[Hu]);const k0=async I=>{var D;const z=(D=I.target.files)==null?void 0:D[0];if(z){if(z.size>5*1024*1024){$.error("File size must be less than 5MB");return}if(!z.type.startsWith("image/")){$.error("Please select an image file");return}try{E(!0);const oe=new FileReader;oe.onload=xe=>{var Jt;h((Jt=xe.target)==null?void 0:Jt.result)},oe.readAsDataURL(z),new FormData().append("avatar",z),setTimeout(()=>{P(xe=>({...xe,avatar:URL.createObjectURL(z)})),$.success("Avatar uploaded successfully!"),E(!1)},1500)}catch{$.error("Failed to upload avatar"),E(!1),h(null)}}},j0=I=>I&&I.startsWith("+91")?I.slice(3):I||"";function Ct(I){const{name:z,value:D}=I.target;if(z==="phone"){const Me=D.replace(/\D/g,"").slice(0,10),xe=Me?`+91${Me}`:"";P({...C,[z]:xe})}else P({...C,[z]:D});b({...g,[z]:""}),y("saving")}const C0=()=>{const I={};if(r){const Me=C.email||"";Me.trim()?/^\S+@\S+\.\S+$/.test(Me)||(I.email="Invalid email address."):I.email="Email is required."}const z=C.phone||"";return z&&(/^\+91[6-9]\d{9}$/.test(z)||(I.phone="Phone number must be in format +91xxxxxxxxxx (10 digits starting with 6-9)")),(C.location||"").trim()||(I.location="Location is required."),(C.address||"").trim()||(I.address="Address is required."),_.role==="worker"&&!C.skillType&&(I.skillType="Skill type is required."),I},qi=S0({mutationFn:async I=>{const{userPayload:z,workerPayload:D,contractorPayload:oe}=I;return Object.keys(z).length>0&&await jn.put("http://localhost:3002/api/users/profile",z,{withCredentials:!0,headers:t?{Authorization:`Bearer ${t}`}:{}}),_.role==="worker"&&D&&Object.keys(D).length>0&&await jn.put("http://localhost:3002/api/users/worker-profile",D,{withCredentials:!0,headers:t?{Authorization:`Bearer ${t}`}:{}}),_.role==="contractor"&&oe&&Object.keys(oe).length>0&&await jn.put("http://localhost:3002/api/users/contractor-profile",oe,{withCredentials:!0,headers:t?{Authorization:`Bearer ${t}`}:{}}),!0},onError:(I,z,D)=>{$.error("Failed to update profile."),y("error")},onSuccess:async()=>{await yn.invalidateQueries({queryKey:["profile"]}),$.success("Profile updated successfully!"),y("saved"),G(!0),setTimeout(()=>{y("idle"),G(!1)},3e3)}}),E0=async I=>{var D,oe,Me,xe,Jt,Lr;I.preventDefault(),ne("");const z=C0();if(b(z),!(Object.keys(z).length>0))try{const Pe={name:C.name,phone:C.phone,location:C.location,address:C.address};r&&(Pe.email=C.email),Object.keys(Pe).forEach(Ee=>{(Pe[Ee]===void 0||Pe[Ee]===""||Pe[Ee]===null)&&delete Pe[Ee]});let Et,Xe;_.role==="worker"&&(Et={skillType:C.skillType,experienceYears:C.experienceYears,availability:C.availability,description:C.description,isAvailable:C.isAvailable,skills:C.skills,certifications:C.certifications,portfolioLinks:C.portfolioLinks},Object.keys(Et).forEach(Ee=>{(Et[Ee]===void 0||Et[Ee]===null||Et[Ee]==="")&&delete Et[Ee]}),Object.keys(Et).length===0&&(Et=void 0)),_.role==="contractor"&&(Xe={companyName:C.companyName,companyDescription:C.companyDescription,companyWebsite:C.companyWebsite,companySize:C.companySize,establishedYear:C.establishedYear},Object.keys(Xe).forEach(Ee=>{(Xe[Ee]===void 0||Xe[Ee]===null||Xe[Ee]==="")&&delete Xe[Ee]}),Object.keys(Xe).length===0&&(Xe=void 0)),await qi.mutateAsync({userPayload:Pe,workerPayload:Et,contractorPayload:Xe}),ge(!0),setTimeout(()=>ge(!1),2e3)}catch(Pe){const Et=(oe=(D=Pe==null?void 0:Pe.response)==null?void 0:D.data)==null?void 0:oe.code,Xe=((xe=(Me=Pe==null?void 0:Pe.response)==null?void 0:Me.data)==null?void 0:xe.message)||((Lr=(Jt=Pe==null?void 0:Pe.response)==null?void 0:Jt.data)==null?void 0:Lr.error)||"";Et==="CONFLICT"||Xe.toLowerCase().includes("email")?(b(Ee=>({...Ee,email:"This email is already in use by another account."})),ne("This email is already in use by another account."),$.error("This email is already in use by another account.")):Xe.toLowerCase().includes("phone")?(b(Ee=>({...Ee,phone:"This phone number is already in use by another account."})),ne("This phone number is already in use by another account."),$.error("This phone number is already in use by another account.")):(ne(Xe||"Failed to update profile."),$.error(Xe||"Failed to update profile."))}},_0=I=>Array.from({length:5},(z,D)=>o.jsx("span",{style:{color:D<I?"#FFD700":"#DDD",fontSize:"1.2em"},children:"★"},D));return U||zr?o.jsxs("div",{style:{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)"},children:[o.jsxs("div",{style:{textAlign:"center",color:"white"},children:[o.jsx("div",{style:{width:"60px",height:"60px",border:"4px solid rgba(255,255,255,0.3)",borderTop:"4px solid white",borderRadius:"50%",animation:"spin 1s linear infinite",margin:"0 auto 1rem"}}),o.jsx("div",{children:"Loading your profile..."})]}),o.jsx("style",{children:`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `})]}):o.jsxs(o.Fragment,{children:[o.jsx(zu,{position:"top-right",autoClose:3e3,hideProgressBar:!1,newestOnTop:!0,closeOnClick:!0,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0}),o.jsx("style",{children:`
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
      `}),o.jsx("div",{className:"enhanced-profile",children:o.jsxs("div",{className:"profile-container",children:[o.jsxs("div",{className:"profile-sidebar",children:[o.jsxs("div",{className:"avatar-section",children:[o.jsxs("div",{className:"avatar-wrapper",children:[o.jsxs("div",{className:"avatar",style:{backgroundImage:C.avatar?`url(${C.avatar})`:"none",backgroundSize:"cover",backgroundPosition:"center",backgroundColor:C.avatar?"transparent":tw(C.name,e==null?void 0:e.username)},onClick:()=>{var I;return(I=s.current)==null?void 0:I.click()},children:[!C.avatar&&ew(C.name,e==null?void 0:e.username),o.jsx("div",{className:"avatar-upload-overlay",children:S?"⏳":"📷 Upload"})]}),o.jsx("input",{ref:s,type:"file",accept:"image/*",onChange:k0,style:{display:"none"}})]}),o.jsx("div",{className:"profile-name",children:C.name||(e==null?void 0:e.username)||"User"}),C.role&&o.jsx("div",{className:"profile-role",children:C.role}),C.rating&&o.jsxs("div",{style:{margin:"1rem 0"},children:[_0(C.rating),o.jsxs("div",{style:{fontSize:"0.8em",color:"#718096",marginTop:"0.25rem"},children:[C.rating,"/5 Rating"]})]})]}),pe!==null&&o.jsxs("div",{className:"completeness-card",children:[o.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"0.5rem"},children:[o.jsx("span",{style:{fontWeight:"600",color:"#2d3748"},children:"Profile Completeness"}),o.jsxs("span",{style:{fontWeight:"700",color:"#667eea"},children:[pe,"%"]})]}),o.jsx("div",{className:"completeness-bar",children:o.jsx("div",{className:"completeness-fill",style:{width:`${pe}%`}})}),W.length>0&&o.jsxs("div",{style:{fontSize:"0.8em",color:"#718096",marginTop:"0.5rem"},children:["Missing: ",W.join(", ")]})]}),o.jsxs("div",{className:"stats-grid",children:[C.role==="worker"&&o.jsx(o.Fragment,{children:o.jsxs("div",{className:"stat-card",children:[o.jsx("div",{className:"stat-number",children:C.completedJobs||0}),o.jsx("div",{className:"stat-label",children:"Jobs Done"})]})}),C.role==="contractor"&&o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"stat-card",children:[o.jsx("div",{className:"stat-number",children:C.totalJobsPosted||0}),o.jsx("div",{className:"stat-label",children:"Jobs Posted"})]}),o.jsxs("div",{className:"stat-card",children:[o.jsx("div",{className:"stat-number",children:C.establishedYear||"N/A"}),o.jsx("div",{className:"stat-label",children:"Established"})]})]})]}),o.jsxs("div",{className:"sidebar-section",children:[o.jsx("h4",{className:"sidebar-section-title",children:"📞 Contact Info"}),o.jsxs("div",{className:"sidebar-details",children:[C.email&&o.jsxs("div",{className:"detail-item",children:[o.jsx("span",{className:"detail-label",children:"Email:"}),o.jsx("span",{className:"detail-value",children:C.email}),i("email")&&o.jsx("span",{className:"registration-badge",children:"📧"})]}),C.phone&&o.jsxs("div",{className:"detail-item",children:[o.jsx("span",{className:"detail-label",children:"Phone:"}),o.jsx("span",{className:"detail-value",children:C.phone}),i("phone")&&o.jsx("span",{className:"registration-badge",children:"📱"})]}),C.location&&o.jsxs("div",{className:"detail-item",children:[o.jsx("span",{className:"detail-label",children:"Location:"}),o.jsx("span",{className:"detail-value",children:C.location})]}),C.address&&o.jsxs("div",{className:"detail-item",children:[o.jsx("span",{className:"detail-label",children:"Address:"}),o.jsx("span",{className:"detail-value",children:C.address})]})]})]}),(C.skillType||((qu=C.skills)==null?void 0:qu.length)||C.experienceYears)&&o.jsxs("div",{className:"sidebar-section",children:[o.jsx("h4",{className:"sidebar-section-title",children:"💼 Professional"}),o.jsxs("div",{className:"sidebar-details",children:[C.skillType&&o.jsxs("div",{className:"detail-item",children:[o.jsx("span",{className:"detail-label",children:"Primary Skill:"}),o.jsx("span",{className:"detail-value skill-badge",children:C.skillType})]}),C.experienceYears&&o.jsxs("div",{className:"detail-item",children:[o.jsx("span",{className:"detail-label",children:"Experience:"}),o.jsxs("span",{className:"detail-value",children:[C.experienceYears," years"]})]}),C.skills&&C.skills.length>0&&o.jsxs("div",{className:"detail-item",children:[o.jsx("span",{className:"detail-label",children:"Skills:"}),o.jsxs("div",{className:"skills-list",children:[C.skills.slice(0,3).map(I=>o.jsx("span",{className:"skill-tag-mini",children:I},I)),C.skills.length>3&&o.jsxs("span",{className:"skill-more",children:["+",C.skills.length-3," more"]})]})]})]})]}),o.jsxs("div",{className:"sidebar-section",children:[o.jsx("h4",{className:"sidebar-section-title",children:"🔐 Account"}),o.jsxs("div",{className:"sidebar-details",children:[o.jsxs("div",{className:"detail-item",children:[o.jsx("span",{className:"detail-label",children:"Registration:"}),o.jsxs("span",{className:"detail-value",children:[n==="email"&&"Email based",n==="phone"&&"Phone based",n==="oauth"&&"OAuth based",n==="unknown"&&"Standard account"]})]}),_.profileCompletedAt&&o.jsxs("div",{className:"detail-item",children:[o.jsx("span",{className:"detail-label",children:"Completed:"}),o.jsx("span",{className:"detail-value",children:new Date(_.profileCompletedAt).toLocaleDateString()})]}),_.profileLockedAt&&o.jsxs("div",{className:"detail-item",children:[o.jsx("span",{className:"detail-label",children:"Secured:"}),o.jsx("span",{className:"detail-value",children:"🔒 Locked"})]})]})]}),r&&o.jsx("div",{style:{background:"linear-gradient(135deg, #ffd700 0%, #ff8c00 100%)",color:"#333",padding:"0.5rem 1rem",borderRadius:"8px",textAlign:"center",fontWeight:"700",marginTop:"1rem"},children:"🔒 ADMIN ACCESS"})]}),o.jsxs("div",{className:"profile-main",children:[o.jsxs("div",{className:"section-tabs",children:[o.jsx("button",{className:`tab-button ${x==="basic"?"active":""}`,onClick:()=>v("basic"),children:"Basic Info"}),o.jsx("button",{className:`tab-button ${x==="professional"?"active":""}`,onClick:()=>v("professional"),children:"Professional"}),o.jsx("button",{className:`tab-button ${x==="portfolio"?"active":""}`,onClick:()=>v("portfolio"),children:"Portfolio"}),o.jsx("button",{className:`tab-button ${x==="sharing"?"active":""}`,onClick:()=>v("sharing"),children:"Sharing"}),o.jsx("button",{className:`tab-button ${x==="invitations"?"active":""}`,onClick:()=>v("invitations"),children:"🎯 Invitations"})]}),o.jsxs("form",{onSubmit:E0,children:[x==="basic"&&o.jsxs("div",{className:"form-grid",children:[o.jsxs("div",{className:"form-group",children:[o.jsxs("label",{className:"form-label",children:["Display Name",C.name&&o.jsx("span",{style:{color:"#38b2ac",fontSize:"0.8em"},children:" (pre-filled)"}),ze(_,"name")&&!r&&o.jsx("span",{style:{color:"#718096",fontSize:"0.8em"},children:" (locked)"})]}),o.jsx("input",{className:"form-input",name:"name",value:C.name||"",onChange:Ct,disabled:!!(C.name&&ze(_,"name")&&!r),style:{opacity:C.name&&ze(_,"name")&&!r?.6:1},placeholder:C.name?"Display name is set":"Your display name"}),C.name&&ze(_,"name")&&!r&&o.jsx("small",{style:{color:"#38b2ac"},children:"This field is locked for security."})]}),o.jsxs("div",{className:"form-group",children:[o.jsxs("label",{className:"form-label",children:["Email",i("email")&&o.jsx("span",{style:{color:"#38b2ac",fontSize:"0.8em"},children:" (registration method)"}),ze(_,"email")&&!r&&!i("email")&&o.jsx("span",{style:{color:"#718096",fontSize:"0.8em"},children:" (locked)"})]}),o.jsx("input",{className:"form-input",name:"email",type:"email",value:C.email||"",onChange:Ct,disabled:i("email")||ze(_,"email")&&!r,style:{opacity:i("email")||ze(_,"email")&&!r?.6:1},placeholder:i("email")?"Registration email (cannot be changed)":ze(_,"email")&&!r?"Email locked for security":"Enter your email"}),g.email&&o.jsx("div",{className:"form-error",children:g.email}),r&&C.email&&o.jsx(U2,{validation:B2({fieldName:"Email",value:C.email,rules:[Uf.email,Uf.professionalEmail],required:!0})})]}),o.jsxs("div",{className:"form-group",children:[o.jsxs("label",{className:"form-label",children:["Phone",i("phone")&&o.jsx("span",{style:{color:"#38b2ac",fontSize:"0.8em"},children:" (registration method)"}),ze(_,"phone")&&!r&&!i("phone")&&o.jsx("span",{style:{color:"#718096",fontSize:"0.8em"},children:" (locked)"})]}),o.jsxs("div",{className:"phone-input-container",style:{display:"flex",alignItems:"center",border:"1px solid #e2e8f0",borderRadius:"6px",padding:"0",backgroundColor:"white",opacity:i("phone")||ze(_,"phone")&&!r?.6:1},children:[o.jsx("div",{className:"country-code",style:{padding:"12px 16px",backgroundColor:"#f7fafc",border:"none",borderRight:"1px solid #e2e8f0",color:"#4a5568",fontWeight:"500",fontSize:"16px",minWidth:"60px",textAlign:"center"},children:"+91"}),o.jsx("input",{className:"form-input",name:"phone",value:j0(C.phone||""),onChange:Ct,disabled:i("phone")||ze(_,"phone")&&!r,style:{border:"none",borderRadius:"0 6px 6px 0",flex:1,margin:0,padding:"12px 16px",fontSize:"16px"},placeholder:i("phone")?"Registration number (cannot be changed)":ze(_,"phone")&&!r?"Number locked for security":"Enter your 10-digit mobile number",maxLength:10,type:"tel"})]}),g.phone&&o.jsx("div",{className:"form-error",children:g.phone})]}),o.jsxs("div",{className:"form-group full-width",children:[o.jsxs("label",{className:"form-label",children:["Location & Address",(C.location||C.address)&&o.jsx("span",{style:{color:"#38b2ac",fontSize:"0.8em"},children:" (pre-filled)"}),ze(_,"location")&&!r&&o.jsx("span",{style:{color:"#718096",fontSize:"0.8em"},children:" (locked)"})]}),o.jsx(F2,{location:C.location||"",address:C.address||"",onLocationChange:I=>{ze(_,"location")&&!r||P(z=>({...z,location:I}))},onAddressChange:I=>{ze(_,"address")&&!r||P(z=>({...z,address:I}))},disabled:qi.isPending||ze(_,"location")&&!r}),ze(_,"location")&&!r&&(C.location||C.address)&&o.jsx("small",{style:{color:"#38b2ac"},children:"Location information is locked for security."}),(g.location||g.address)&&o.jsx("div",{className:"form-error",children:g.location||g.address})]}),C.role==="worker"&&o.jsxs("div",{className:"form-group",children:[o.jsx("label",{className:"form-label",children:"Primary Skill"}),o.jsx("select",{className:"form-input",name:"skillType",value:C.skillType||"",onChange:Ct,required:!0,children:a.map(I=>o.jsx("option",{value:I.value,disabled:I.value==="",children:I.label},I.value))}),g.skillType&&o.jsx("div",{className:"form-error",children:g.skillType})]})]}),x==="professional"&&o.jsxs("div",{className:"form-grid",children:[C.role==="worker"&&o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"form-group",children:[o.jsx("label",{className:"form-label",children:"Experience (Years)"}),o.jsx("input",{className:"form-input",name:"experienceYears",type:"number",value:C.experienceYears??"",onChange:Ct,min:0,placeholder:"Years of experience"})]}),o.jsxs("div",{className:"form-group full-width",children:[o.jsx("label",{className:"form-label",children:"Skills"}),o.jsx(I2,{skills:C.skills||[],onSkillsChange:I=>P(z=>({...z,skills:I})),availableSkills:$t,placeholder:"Add your skills..."})]}),o.jsxs("div",{className:"form-group full-width",children:[o.jsx("label",{className:"form-label",children:"Professional Description"}),o.jsx("textarea",{className:"form-input form-textarea",name:"description",value:C.description||"",onChange:Ct,placeholder:"Describe your skills, experience, and what makes you unique..."})]})]}),C.role==="contractor"&&o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"form-group",children:[o.jsx("label",{className:"form-label",children:"Company Name"}),o.jsx("input",{className:"form-input",name:"companyName",value:C.companyName||"",onChange:Ct,placeholder:"Your company name"})]}),o.jsxs("div",{className:"form-group",children:[o.jsx("label",{className:"form-label",children:"Company Website"}),o.jsx("input",{className:"form-input",name:"companyWebsite",type:"url",value:C.companyWebsite||"",onChange:Ct,placeholder:"https://www.yourcompany.com"})]}),o.jsxs("div",{className:"form-group",children:[o.jsx("label",{className:"form-label",children:"Company Size"}),o.jsxs("select",{className:"form-input",name:"companySize",value:C.companySize||"",onChange:Ct,children:[o.jsx("option",{value:"",children:"Select company size..."}),o.jsx("option",{value:"1-10",children:"1-10 employees"}),o.jsx("option",{value:"11-50",children:"11-50 employees"}),o.jsx("option",{value:"51-200",children:"51-200 employees"}),o.jsx("option",{value:"201-500",children:"201-500 employees"}),o.jsx("option",{value:"500+",children:"500+ employees"})]})]}),o.jsxs("div",{className:"form-group",children:[o.jsx("label",{className:"form-label",children:"Established Year"}),o.jsx("input",{className:"form-input",name:"establishedYear",type:"number",value:C.establishedYear??"",onChange:Ct,min:1900,max:new Date().getFullYear(),placeholder:"Year established"})]}),o.jsxs("div",{className:"form-group full-width",children:[o.jsx("label",{className:"form-label",children:"Company Description"}),o.jsx("textarea",{className:"form-input form-textarea",name:"companyDescription",value:C.companyDescription||"",onChange:Ct,placeholder:"Describe your company, services, and values..."})]})]})]}),x==="portfolio"&&o.jsx(M2,{userRole:C.role||"worker",portfolioItems:Ae.projects,certifications:Ae.certifications,socialLinks:Ae.socialLinks,onPortfolioUpdate:I=>Ce(z=>({...z,projects:I})),onCertificationsUpdate:I=>Ce(z=>({...z,certifications:I})),onSocialLinksUpdate:I=>Ce(z=>({...z,socialLinks:I}))}),x==="sharing"&&o.jsx(A2,{profileId:(e==null?void 0:e.id)||"",userName:C.name||(e==null?void 0:e.username)||"User",isPublic:!1,onPrivacyChange:I=>{console.log("Privacy changed:",I),$.info(`Profile is now ${I?"public":"private"}`)}}),x==="invitations"&&o.jsx("div",{style:{marginTop:"1rem"},children:o.jsx(G2,{})}),o.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"2rem",paddingTop:"2rem",borderTop:"2px solid #e2e8f0"},children:[o.jsx("button",{type:"submit",className:"save-button",disabled:qi.isPending,children:qi.isPending?"💾 Saving...":"💾 Save Profile"}),o.jsxs("div",{className:"auto-save-indicator",children:[k==="saving"&&o.jsx(o.Fragment,{children:"⏳ Saving..."}),k==="saved"&&o.jsx(o.Fragment,{children:"✅ Saved"}),k==="error"&&o.jsx(o.Fragment,{children:"❌ Error saving"})]})]})]}),(ye||jt)&&o.jsx("div",{style:{background:"#fed7d7",border:"1px solid #feb2b2",color:"#c53030",padding:"1rem",borderRadius:"8px",marginTop:"1rem"},children:ye||(jt==null?void 0:jt.message)}),ee&&o.jsx("div",{style:{background:"#c6f6d5",border:"1px solid #9ae6b4",color:"#2f855a",padding:"1rem",borderRadius:"8px",marginTop:"1rem"},children:"✅ Profile updated successfully!"})]})]})}),o.jsx(W2,{message:"Profile Updated Successfully!",show:Y})]})},rw=()=>{var E,R,_;const{user:e,token:t}=ht(),n=Ia(),[r,s]=w.useState(!1),[i,a]=w.useState(""),[l,c]=w.useState(""),[u,p]=w.useState(!1),[m,g]=w.useState(""),[b,x]=w.useState(""),{data:v,isLoading:k}=w0({queryKey:["profile"],queryFn:async()=>{var C;return t?(C=(await jn.get("http://localhost:3002/api/users/profile",{withCredentials:!0,headers:{Authorization:`Bearer ${t}`}})).data)==null?void 0:C.data:null},enabled:!!t}),y=S0({mutationFn:async N=>(await jn.put("http://localhost:3002/api/users/worker-profile",{isAvailable:N},{withCredentials:!0,headers:t?{Authorization:`Bearer ${t}`}:{}}),N),onSuccess:N=>{n.invalidateQueries({queryKey:["profile"]}),$.success(N?"✅ You are now visible in My Team section!":"⏸️ You are now hidden from My Team section")},onError:()=>{$.error("Failed to update availability status"),s(!r)}});w.useEffect(()=>{if(v&&v.user.role==="worker"&&v.workerProfile){const N=v.workerProfile.isAvailable??v.workerProfile.is_available??!1;s(N)}},[v]),w.useEffect(()=>{var P,U;let N;const C=((P=v==null?void 0:v.workerProfile)==null?void 0:P.availabilityExpiresAt)??((U=v==null?void 0:v.workerProfile)==null?void 0:U.availability_expires_at);if(r&&C){const J=()=>{const ee=new Date(C).getTime(),ge=new Date().getTime(),ye=ee-ge;if(ye>0){const ne=Math.floor(ye/36e5),pe=Math.floor(ye%(1e3*60*60)/(1e3*60)),O=Math.floor(ye%(1e3*60)/1e3);a(`${ne}h ${pe}m ${O}s`)}else a("Expired"),n.invalidateQueries({queryKey:["profile"]})};J(),N=setInterval(J,1e3)}else a("");return()=>{N&&clearInterval(N)}},[r,(E=v==null?void 0:v.workerProfile)==null?void 0:E.availabilityExpiresAt,n]);const d=()=>{const N=!r;s(N),y.mutate(N)};if(!e||!t)return o.jsx("div",{style:{padding:"2rem",textAlign:"center"},children:o.jsx("p",{children:"Please log in to manage your status."})});if(k)return o.jsx("div",{style:{padding:"2rem",textAlign:"center"},children:o.jsx("p",{children:"Loading your profile..."})});const h=((R=v==null?void 0:v.user)==null?void 0:R.role)||(e==null?void 0:e.role)||((_=e==null?void 0:e.roles)==null?void 0:_[0]),S=async N=>{N.preventDefault(),p(!0),g(""),x("");try{await jn.post("http://localhost:3003/api/matching/contractor-requirements",{requiredWorkers:Number(l)},{withCredentials:!0,headers:t?{Authorization:`Bearer ${t}`}:{}}),g("Requirement submitted successfully!"),c("")}catch{x("Failed to submit requirement.")}finally{p(!1)}};return h!=="worker"?o.jsxs("div",{style:{padding:"2rem",textAlign:"center"},children:[o.jsx("h2",{children:"Status Management"}),o.jsx("p",{style:{color:"#666",marginTop:"1rem"},children:"As a contractor, you can specify how many workers you require."}),o.jsxs("form",{onSubmit:S,style:{marginTop:"2rem"},children:[o.jsx("label",{htmlFor:"requiredWorkers",style:{fontWeight:500,fontSize:"16px"},children:"Number of workers required:"}),o.jsx("input",{id:"requiredWorkers",type:"number",min:1,value:l,onChange:N=>c(N.target.value===""?"":Number(N.target.value)),style:{marginLeft:"1rem",padding:"0.5rem",fontSize:"16px",width:"80px"},required:!0}),o.jsx("button",{type:"submit",disabled:u||l==="",style:{marginLeft:"1rem",padding:"0.5rem 1.5rem",fontSize:"16px",background:"#2196F3",color:"white",border:"none",borderRadius:"6px",cursor:"pointer"},children:u?"Submitting...":"Submit"})]}),m&&o.jsx("div",{style:{color:"green",marginTop:"1rem"},children:m}),b&&o.jsx("div",{style:{color:"red",marginTop:"1rem"},children:b})]}):o.jsxs("div",{style:{maxWidth:"600px",margin:"2rem auto",padding:"2rem",background:"#fff",borderRadius:"16px",boxShadow:"0 4px 20px rgba(0,0,0,0.08)"},children:[o.jsx(zu,{position:"top-right",autoClose:3e3}),o.jsx("style",{children:`
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
      `}),o.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"},children:[o.jsxs("div",{children:[o.jsx("h2",{style:{margin:0,color:"#333"},children:"Work Status"}),o.jsx("p",{style:{color:"#666",fontSize:"14px",margin:"0.25rem 0 0 0"},children:'Control your visibility in the "My Team" section'})]}),o.jsx("button",{onClick:()=>n.invalidateQueries({queryKey:["profile"]}),style:{padding:"0.5rem 1rem",background:"#2196F3",color:"white",border:"none",borderRadius:"6px",cursor:"pointer",fontSize:"14px"},children:"🔄 Refresh"})]}),k?o.jsx("div",{style:{textAlign:"center",padding:"2rem"},children:o.jsx("p",{children:"Loading status..."})}):o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:`status-card ${r?"available":"busy"}`,children:[o.jsx("div",{style:{fontSize:"48px",marginBottom:"1rem"},children:r?"✅":"⏸️"}),o.jsx("h3",{style:{margin:"0 0 0.5rem 0",fontSize:"24px"},children:r?"Available for Work":"Not Available / Busy"}),o.jsx("p",{style:{margin:"0 0 0.5rem 0",opacity:.9,fontSize:"14px"},children:r?"You are visible to contractors in My Team section":"You are hidden from My Team section"}),r&&i&&o.jsxs("div",{style:{marginTop:"1rem",padding:"0.5rem 1rem",background:"rgba(255, 255, 255, 0.2)",borderRadius:"20px",fontSize:"16px",fontWeight:"bold"},children:["⏰ Auto-unavailable in: ",i]})]}),o.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"1.5rem",background:"#fafafa",borderRadius:"8px",marginBottom:"1.5rem"},children:[o.jsxs("div",{children:[o.jsx("h4",{style:{margin:"0 0 0.25rem 0",color:"#333"},children:"Availability Status"}),o.jsx("p",{style:{margin:0,fontSize:"13px",color:"#666"},children:"Toggle to change your status"})]}),o.jsxs("label",{className:"toggle-switch",children:[o.jsx("input",{type:"checkbox",checked:r,onChange:d,disabled:y.isPending}),o.jsx("span",{className:"slider"})]})]}),o.jsxs("div",{className:"info-box",children:[o.jsx("h4",{style:{marginTop:0,color:"#1976d2"},children:"ℹ️ How it works"}),o.jsxs("ul",{style:{margin:0,paddingLeft:"1.5rem",fontSize:"14px",lineHeight:"1.8",color:"#555"},children:[o.jsxs("li",{children:[o.jsx("strong",{children:"Available:"}),' Contractors can see your profile in their "My Team" section and can contact you for work opportunities.']}),o.jsxs("li",{children:[o.jsx("strong",{children:"Not Available/Busy:"}),` Your profile is hidden from "My Team" listings. You won't receive new work requests.`]}),o.jsx("li",{children:"You can change your status anytime based on your availability."})]})]}),y.isPending&&o.jsx("div",{style:{textAlign:"center",color:"#666",fontSize:"14px",marginTop:"1rem"},children:"Updating status..."})]})]})},sw=({toast:e,onRemove:t})=>{const[n,r]=w.useState(!1),s=()=>{r(!0),setTimeout(()=>t(e.id),300)};w.useEffect(()=>{const l=setTimeout(()=>{s()},e.duration||5e3);return()=>clearTimeout(l)},[e.duration]);const i=()=>{const l={position:"relative",display:"flex",alignItems:"flex-start",gap:f.spacing.sm,padding:f.spacing.lg,marginBottom:f.spacing.sm,borderRadius:f.borderRadius.lg,boxShadow:f.shadows.lg,transform:n?"translateX(100%)":"translateX(0)",opacity:n?0:1,transition:"all 0.3s ease-in-out",maxWidth:"400px",cursor:"pointer"},c={success:{backgroundColor:f.colors.success[50],borderLeft:`4px solid ${f.colors.success[500]}`,color:f.colors.success[800]},error:{backgroundColor:f.colors.danger[50],borderLeft:`4px solid ${f.colors.danger[500]}`,color:f.colors.danger[800]},warning:{backgroundColor:f.colors.warning[50],borderLeft:`4px solid ${f.colors.warning[500]}`,color:f.colors.warning[800]},info:{backgroundColor:f.colors.primary[50],borderLeft:`4px solid ${f.colors.primary[500]}`,color:f.colors.primary[800]}};return{...l,...c[e.type]}},a=()=>{const l={width:"20px",height:"20px",flexShrink:0,marginTop:"2px"};switch(e.type){case"success":return o.jsx("svg",{style:l,fill:"currentColor",viewBox:"0 0 20 20",children:o.jsx("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",clipRule:"evenodd"})});case"error":return o.jsx("svg",{style:l,fill:"currentColor",viewBox:"0 0 20 20",children:o.jsx("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",clipRule:"evenodd"})});case"warning":return o.jsx("svg",{style:l,fill:"currentColor",viewBox:"0 0 20 20",children:o.jsx("path",{fillRule:"evenodd",d:"M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z",clipRule:"evenodd"})});case"info":return o.jsx("svg",{style:l,fill:"currentColor",viewBox:"0 0 20 20",children:o.jsx("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",clipRule:"evenodd"})});default:return null}};return o.jsxs("div",{style:i(),onClick:s,children:[a(),o.jsxs("div",{style:{flex:1},children:[o.jsx("div",{style:{fontWeight:f.typography.fontWeight.semibold,marginBottom:f.spacing.xs},children:e.title}),e.message&&o.jsx("div",{style:{fontSize:f.typography.fontSize.sm,opacity:.8},children:e.message}),e.action&&o.jsx("button",{onClick:l=>{l.stopPropagation(),e.action.onClick(),s()},style:{marginTop:f.spacing.sm,padding:`${f.spacing.xs} ${f.spacing.sm}`,backgroundColor:"transparent",border:"1px solid currentColor",borderRadius:f.borderRadius.sm,color:"inherit",fontSize:f.typography.fontSize.sm,cursor:"pointer",fontWeight:f.typography.fontWeight.medium},children:e.action.label})]}),o.jsx("button",{onClick:l=>{l.stopPropagation(),s()},style:{backgroundColor:"transparent",border:"none",cursor:"pointer",padding:f.spacing.xs,color:"inherit",opacity:.6},children:o.jsx("svg",{width:"16",height:"16",fill:"currentColor",viewBox:"0 0 20 20",children:o.jsx("path",{fillRule:"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",clipRule:"evenodd"})})})]})},iw=()=>{const{toasts:e,removeToast:t}=Lu();return e.length===0?null:o.jsx("div",{style:{position:"fixed",top:f.spacing.lg,right:f.spacing.lg,zIndex:1e3,pointerEvents:"none"},children:o.jsx("div",{style:{pointerEvents:"auto"},children:e.map(n=>o.jsx(sw,{toast:n,onRemove:t},n.id))})})},ow=()=>o.jsx("style",{children:`
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
          box-shadow: 0 0 5px ${f.colors.primary[500]};
        }
        50% {
          box-shadow: 0 0 20px ${f.colors.primary[500]}, 0 0 30px ${f.colors.primary[500]};
        }
        100% {
          box-shadow: 0 0 5px ${f.colors.primary[500]};
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
        box-shadow: 0 0 20px ${f.colors.primary[500]}40;
      }

      .focus-ring:focus {
        outline: 2px solid ${f.colors.primary[500]};
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
        outline: 2px solid ${f.colors.primary[500]};
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
        background: ${f.colors.primary[500]};
        transition: width 0.3s ease;
      }

      .form-input-wrapper:focus-within::after {
        width: 100%;
      }
    `}),Ar=({children:e})=>{const{token:t}=ht();return t?e:o.jsx(q1,{to:"/login"})},aw=()=>o.jsx(ax,{children:o.jsx(lx,{children:o.jsxs(nx,{basename:"/staff/",children:[o.jsx(ow,{}),o.jsx(fx,{}),o.jsx(ux,{}),o.jsx(iw,{}),o.jsxs(K1,{children:[o.jsx(Ge,{path:"/login",element:o.jsx(gx,{})}),o.jsx(Ge,{path:"/register",element:o.jsx(Xx,{})}),o.jsx(Ge,{path:"/forgot-password",element:o.jsx(Gx,{})}),o.jsx(Ge,{path:"/reset-password/:token",element:o.jsx(Zx,{})}),o.jsx(Ge,{path:"/auth/callback",element:o.jsx(ev,{})}),o.jsx(Ge,{path:"/dashboard",element:o.jsx(Ar,{children:o.jsx(Sv,{})})}),o.jsx(Ge,{path:"/search",element:o.jsx(Ar,{children:o.jsx(ov,{})})}),o.jsx(Ge,{path:"/saved",element:o.jsx(Ar,{children:o.jsx(uv,{})})}),o.jsx(Ge,{path:"/messages",element:o.jsx(Ar,{children:o.jsx(hv,{})})}),o.jsx(Ge,{path:"/profile",element:o.jsx(Ar,{children:o.jsx(nw,{})})}),o.jsx(Ge,{path:"/status",element:o.jsx(Ar,{children:o.jsx(rw,{})})}),o.jsx(Ge,{path:"/",element:o.jsx(mf,{})}),o.jsx(Ge,{path:"/home",element:o.jsx(mf,{})})]})]})})});(function(){const e=sessionStorage.getItem("redirect");sessionStorage.removeItem("redirect"),e&&e!==location.pathname&&history.replaceState(null,"",e)})();const lw=new S2({defaultOptions:{queries:{staleTime:1e3*60,refetchOnWindowFocus:!1,retry:1}}});gm(document.getElementById("root")).render(o.jsx(w.StrictMode,{children:o.jsx(k2,{client:lw,children:o.jsx(tv,{children:o.jsx(aw,{})})})}));
//# sourceMappingURL=index-a14ffd93.js.map
