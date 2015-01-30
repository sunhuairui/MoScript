//==========================================================
// <T>场景控制台。</T>
//
// @console
// @author maocy
// @version 150106
//==========================================================
function FScene3dConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._scopeCd    = EScope.Local;
   // @attribute
   o._loadScenes = null;
   o._scenes     = null;
   // @attribute
   o._thread     = null;
   o._interval   = 100;
   //..........................................................
   // @event
   o.onProcess   = FScene3dConsole_onProcess;
   //..........................................................
   // @method
   o.construct   = FScene3dConsole_construct;
   o.scenes      = FScene3dConsole_scenes;
   o.alloc       = FScene3dConsole_alloc;
   return o;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
function FScene3dConsole_onProcess(){
   var o = this;
   var ms = o._loadScenes;
   ms.record();
   while(ms.next()){
      var m = ms.current();
      if(m.processLoad()){
         ms.removeCurrent();
      }
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FScene3dConsole_construct(){
   var o = this;
   // 设置属性
   o._loadScenes = new TLooper();
   o._scenes = new TDictionary();
   // 创建线程
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.lsnsProcess.register(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
}

//==========================================================
// <T>获得场景集合。</T>
//
// @method
// @return TDictionary 场景集合
//==========================================================
function FScene3dConsole_scenes(){
   return this._scenes;
}

//==========================================================
// <T>收集一个场景。</T>
//
// @method
// @param pc:content:FRenderContent 名称
// @param pn:name:String 名称
// @return FRenderModel 渲染模型
//==========================================================
function FScene3dConsole_alloc(pc, pn){
   var o = this;
   // 加载渲染对象
   var rsc = RConsole.find(FRs3SceneConsole);
   var rs = rsc.load(pn);
   // 加载模型
   var s = RClass.create(FScene3d);
   s._context = pc;
   s._name = pn;
   s._resource = rs;
   // 测试是否已加载
   if(rs.testReady()){
      s.load(rs);
   }else{
      // 增加加载中
      o._loadScenes.push(s);
   }
   return s;
}
