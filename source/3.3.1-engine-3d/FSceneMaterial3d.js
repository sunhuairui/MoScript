 //==========================================================
// <T>场景。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FSceneMaterial3d(o){
   o = RClass.inherits(this, o, FG3dMaterial);
   //..........................................................
   // @attribute
   o._resource         = null;
   //..........................................................
   // @method
   o.loadSceneResource = FSceneMaterial3d_loadSceneResourcee
   return o;
}

//==========================================================
// <T>加载区域资源。</T>
//
// @method
// @param p:resource:FRs3SceneRegion 区域资源
//==========================================================
function FSceneMaterial3d_loadSceneResourcee(p){
   var o = this;
   o._resource = p;
   o._name = p.code();
   o._info.assign(p.info());
}
