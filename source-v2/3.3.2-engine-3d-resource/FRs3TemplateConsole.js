//==========================================================
// <T>资源模板管理器。</T>
//
// @author maocy
// @history 150108
//==========================================================
function FRs3TemplateConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._templates = null;
   o._dataUrl  = '/cloud.content.template.wv'
   //..........................................................
   // @method
   o.construct = FRs3TemplateConsole_construct;
   o.load      = FRs3TemplateConsole_load;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FRs3TemplateConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._templates = new TDictionary();
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FRs3TemplateConsole_load(c, v){
   var o = this;
   var s = o._templates;
   var t = s.get(c);
   if(t == null){
      // 生成地址
      var u = RBrowser.hostPath(o._dataUrl + '?code=' + c + '&version=' + RString.nvl(v) + '&date=' + RDate.format());
      // 创建主题
      t = RClass.create(FRs3Template);
      t.load(u);
      s.set(c, t);
   }
   return t;
}
