﻿//==========================================================
// <T>焦点获得事件描述类。</T>
//
// @event
// @param n:name:String 名称
// @author maocy
// @version 150119
//==========================================================
function AEventTouchStart(n){
   var o = this;
   AEvent.call(o, n, 'touchstart', 'ontouchstart');
   //..........................................................
   // @method
   o.attach = AEventTouchStart_attach;
   return o;
}

//==========================================================
// <T>接收事件信息。</T>
//
// @method
// @param e:event:Event 事件
// @param h:htmlEvent:HtmlEvent 页面事件
//==========================================================
function AEventTouchStart_attach(e, h){
}
