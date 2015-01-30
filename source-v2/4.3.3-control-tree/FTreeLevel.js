//==========================================================
// <T>树目录节点层次组件。</T>
//
// @component
// @author maocy
// @version 150119
//==========================================================
function FTreeLevel(o){
   o = RClass.inherits(this, o, FControl);
   //..........................................................
   // @property
   o._id        = RClass.register(o, new APtyString('_id'));
   o._color     = RClass.register(o, new APtyString('_color'));
   o._backColor = RClass.register(o, new APtyString('_backColor'));
   return o;
}
