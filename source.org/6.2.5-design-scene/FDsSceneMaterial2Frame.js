//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsSceneMaterial2Frame(o){
   o = RClass.inherits(this, o, FUiForm);
   //..........................................................
   // @attribute
   o._scene                    = null;
   o._material                 = null;
   // @attribute
   o._controlGuid              = null;
   o._controlCode              = null;
   o._controlLabel             = null;
   o._controlOptionDouble      = null;
   o._controlDiffuseViewColor  = null;
   o._controlSpecularViewColor = null;
   o._controlSpecularViewBase  = null;
   o._controlSpecularViewLevel = null;
   //..........................................................
   // @event
   o.onBuilded                 = FDsSceneMaterial2Frame_onBuilded;
   o.onDataChanged             = FDsSceneMaterial2Frame_onDataChanged;
   //..........................................................
   // @method
   o.construct                 = FDsSceneMaterial2Frame_construct;
   // @method
   o.loadObject                = FDsSceneMaterial2Frame_loadObject;
   // @method
   o.dispose                   = FDsSceneMaterial2Frame_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsSceneMaterial2Frame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   // 关联对象
   o._controlOptionDouble.addDataChangedListener(o, o.onDataChanged);
   o._controlOptionView.addDataChangedListener(o, o.onDataChanged);
   o._controlOptionNormalInvert.addDataChangedListener(o, o.onDataChanged);
   o._controlOptionShadow.addDataChangedListener(o, o.onDataChanged);
   o._controlOptionShadowSelf.addDataChangedListener(o, o.onDataChanged);
   o._controlDiffuseViewColor.addDataChangedListener(o, o.onDataChanged);
   o._controlSpecularViewColor.addDataChangedListener(o, o.onDataChanged);
   o._controlSpecularViewBase.addDataChangedListener(o, o.onDataChanged);
   o._controlSpecularViewLevel.addDataChangedListener(o, o.onDataChanged);
}

//==========================================================
// <T>数据改变处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsSceneMaterial2Frame_onDataChanged(p){
   var o = this;
   var t = o._scene;
   var m = o._material;
   var mr = m.resource();
   var mi = mr.info();
   // 设置配置
   mi.optionDouble = o._controlOptionDouble.get();
   mi.optionView = o._controlOptionView.get();
   mi.optionNormalInvert = o._controlOptionNormalInvert.get();
   mi.optionShadow = o._controlOptionShadow.get();
   mi.optionShadowSelf = o._controlOptionShadowSelf.get();
   // 设置散射颜色
   var v = o._controlDiffuseViewColor.get();
   mi.diffuseViewColor.assign(v);
   // 设置高光颜色
   var v = o._controlSpecularViewColor.get();
   mi.specularViewColor.assign(v);
   mi.specularViewBase = o._controlSpecularViewBase.get();
   mi.specularViewLevel = o._controlSpecularViewLevel.get();
   // 重新加载资源
   m.reload();
   m._display.reloadResource();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsSceneMaterial2Frame_construct(){
   var o = this;
   // 父处理
   o.__base.FUiForm.construct.call(o);
}

//==========================================================
// <T>加载材质信息。</T>
//
// @method
// @param s:scene:FE3dScene 场景
// @param m:material:FRs3Material 材质
//==========================================================
function FDsSceneMaterial2Frame_loadObject(s, m){
   var o = this;
   o._scene = s;
   o._material = m;
   // 设置参数
   var mr = m.resource();
   var mi = mr.info();
   o._controlGuid.set(mr.guid());
   o._controlCode.set(mr.code());
   o._controlLabel.set(mr.label());
   // 设置配置
   o._controlOptionDouble.set(mi.optionDouble);
   o._controlOptionView.set(mi.optionView);
   o._controlOptionNormalInvert.set(mi.optionNormalInvert);
   o._controlOptionShadow.set(mi.optionShadow);
   o._controlOptionShadowSelf.set(mi.optionShadowSelf);
   // 设置颜色
   o._controlDiffuseViewColor.set(mi.diffuseViewColor);
   o._controlSpecularViewColor.set(mi.specularViewColor);
   o._controlSpecularViewBase.set(mi.specularViewBase);
   o._controlSpecularViewLevel.set(mi.specularViewLevel);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsSceneMaterial2Frame_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiForm.dispose.call(o);
}