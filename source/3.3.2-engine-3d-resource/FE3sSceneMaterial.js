//==========================================================
// <T>资源场景材质。</T>
//
// @author maocy
// @history 150115
//==========================================================
function FE3sSceneMaterial(o){
   o = RClass.inherits(this, o, FE3sObject);
   //..........................................................
   // @attribute 属性
   o._groupGuid          = null;
   // @attribute 设置
   o._info               = null;
   // @attribute 高度
   o._heightDepth        = null;
   // @attribute 表面
   o._surfaceRate        = null;
   o._surfaceReflect     = null;
   o._surfaceBright      = null;
   o._surfaceBrightLevel = null;
   o._surfaceCoarse      = null;
   o._surfaceCoarseLevel = null;
   o._surfaceMerge       = null;
   o._surfacePower       = null;
   //..........................................................
   // @method
   o.construct           = FE3sSceneMaterial_construct;
   // @method
   o.groupGuid           = FE3sSceneMaterial_groupGuid;
   o.info                = FE3sSceneMaterial_info;
   // @method
   o.unserialize         = FE3sSceneMaterial_unserialize;
   o.saveConfig          = FE3sSceneMaterial_saveConfig;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3sSceneMaterial_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._info = new SE3sMaterialInfo();
}

//==========================================================
// <T>获得分组唯一编号。</T>
//
// @method
// @return String 分组唯一编号
//==========================================================
function FE3sSceneMaterial_groupGuid(){
   return this._groupGuid;
}

//==========================================================
// <T>获得信息。</T>
//
// @method
// @return SE3sMaterialInfo 信息
//==========================================================
function FE3sSceneMaterial_info(){
   return this._info;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FE3sSceneMaterial_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   // 读取属性
   o._groupGuid = p.readString();
   // 读取设置
   o._info.unserialize(p);
   o._textureCount = p.readInt16();
}

//==========================================================
// <T>数据内容存储到配置节点中。</T>
//
// @method
// @param p:config:TXmlNode 配置节点
//==========================================================
function FE3sSceneMaterial_saveConfig(p){
   var o = this;
   o.__base.FE3sObject.saveConfig.call(o, p);
   // 存储属性
   p.set('group_guid', o._groupGuid);
   // 存储材质
   o._info.saveConfig(p);
}
