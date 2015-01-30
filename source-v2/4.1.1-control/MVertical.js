//==========================================================
// <T>纵向部署控件。</T>
//
// @class
// @author maocy
// @version 150123
//==========================================================
function MVertical(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @method
   o.setVisible = MHorizontal_setVisible;
   return o;
}

//==========================================================
// <T>设置控件的隐藏和显示。</T>
//
// @method
// @param p:visible:Boolean 是否可见
//==========================================================
function MHorizontal_setVisible(p){
   var o = this;
   // 布局行
   var h = o.hPanelLine;
   if(h){
      RHtml.displaySet(h, p);
   }
}
