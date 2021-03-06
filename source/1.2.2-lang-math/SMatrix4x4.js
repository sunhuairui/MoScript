﻿//==========================================================
// <T>四维矩阵。</T>
//
// @struct
// @author maocy
// @version 141231
//==========================================================
function SMatrix4x4(){
   var o = this;
   //..........................................................
   // @attribute
   o._data           = new Array(16);
   //..........................................................
   // @method
   o.data            = SMatrix4x4_data;
   // @method
   o.isIdentityData  = SMatrix4x4_isIdentityData;
   o.identityData    = SMatrix4x4_identityData;
   // @method
   o.equalsData      = SMatrix4x4_equalsData;
   o.assignData      = SMatrix4x4_assignData;
   o.attachData      = SMatrix4x4_attachData;
   o.appendData      = SMatrix4x4_appendData;
   // @method
   o.translate       = SMatrix4x4_translate;
   o.rotationX       = SMatrix4x4_rotationX;
   o.rotationY       = SMatrix4x4_rotationY;
   o.rotationZ       = SMatrix4x4_rotationZ;
   o.rotation        = SMatrix4x4_rotation;
   o.scale           = SMatrix4x4_scale;
   // @method
   o.invert          = SMatrix4x4_invert;
   o.transform       = SMatrix4x4_transform;
   o.transformPoint3 = SMatrix4x4_transformPoint3;
   // @method
   o.buildQuaternion = SMatrix4x4_buildQuaternion;
   o.build           = SMatrix4x4_build;
   // @method
   o.writeData       = SMatrix4x4_writeData;
   // @method
   o.toString        = SMatrix4x4_toString;
   return o;
}

//============================================================
// <T>获得数据。</T>
//
// @method
// @return Float32Array 数据
//============================================================
function SMatrix4x4_data(){
   return this._data;
}

//============================================================
// <T>是否为单位化数据。</T>
//
// @method
// @return 是否单位化
//============================================================
function SMatrix4x4_isIdentityData(){
   var d = this._data;
   var v = RConst.identity4x4;
   for(var i = 0; i < 16; i++){
      if(d[i] != v[i]){
         return false;
      }
   }
   return true;
}

//============================================================
// <T>单位化处理。</T>
//
// @method
//============================================================
function SMatrix4x4_identityData(){
   var o = this;
   var d = o._data;
   var v = RConst.identity4x4;
   for(var i = 0; i < 16; i++){
      d[i] = v[i];
   }
   return o;
}

//============================================================
// <T>判断数据内容是否相等。</T>
//
// @method
// @param p:data:Array 数据
// @return Boolean 是否相等
//============================================================
function SMatrix4x4_equalsData(p){
   var d = this._data;
   for(var i = 0; i < 16; i++){
      if(d[i] != p[i]){
         return false;
      }
   }
   return true;
}

//============================================================
// <T>接收一个数据内容。</T>
//
// @method
// @param p:data:Array 数据
//============================================================
function SMatrix4x4_assignData(p){
   var d = this._data;
   for(var n = 0; n < 16; n++){
      d[n] = p[n];
   }
}

//============================================================
// <T>接收一个数据内容，返回是否修改。</T>
//
// @method
// @param p:data:Array 数据
//============================================================
function SMatrix4x4_attachData(p){
   var r = false;
   var d = this._data;
   for(var i = 0; i < 16; i++){
      var v = p[i];
      if(!r){
         if(d[i] != v){
            r = true;
         }
      }
      d[i] = v;
   }
   return r;
}

//============================================================
// <T>追加一个数据内容。</T>
//
// @method
// @param p:data:Array 数据
//============================================================
function SMatrix4x4_appendData(p){
   var d = this._data;
   // 矩阵计算
   var v00 = (d[ 0] * p[0]) + (d[ 1] * p[4]) + (d[ 2] * p[ 8]) + (d[ 3] * p[12]);
   var v01 = (d[ 0] * p[1]) + (d[ 1] * p[5]) + (d[ 2] * p[ 9]) + (d[ 3] * p[13]);
   var v02 = (d[ 0] * p[2]) + (d[ 1] * p[6]) + (d[ 2] * p[10]) + (d[ 3] * p[14]);
   var v03 = (d[ 0] * p[3]) + (d[ 1] * p[7]) + (d[ 2] * p[11]) + (d[ 3] * p[15]);
   var v04 = (d[ 4] * p[0]) + (d[ 5] * p[4]) + (d[ 6] * p[ 8]) + (d[ 7] * p[12]);
   var v05 = (d[ 4] * p[1]) + (d[ 5] * p[5]) + (d[ 6] * p[ 9]) + (d[ 7] * p[13]);
   var v06 = (d[ 4] * p[2]) + (d[ 5] * p[6]) + (d[ 6] * p[10]) + (d[ 7] * p[14]);
   var v07 = (d[ 4] * p[3]) + (d[ 5] * p[7]) + (d[ 6] * p[11]) + (d[ 7] * p[15]);
   var v08 = (d[ 8] * p[0]) + (d[ 9] * p[4]) + (d[10] * p[ 8]) + (d[11] * p[12]);
   var v09 = (d[ 8] * p[1]) + (d[ 9] * p[5]) + (d[10] * p[ 9]) + (d[11] * p[13]);
   var v10 = (d[ 8] * p[2]) + (d[ 9] * p[6]) + (d[10] * p[10]) + (d[11] * p[14]);
   var v11 = (d[ 8] * p[3]) + (d[ 9] * p[7]) + (d[10] * p[11]) + (d[11] * p[15]);
   var v12 = (d[12] * p[0]) + (d[13] * p[4]) + (d[14] * p[ 8]) + (d[15] * p[12]);
   var v13 = (d[12] * p[1]) + (d[13] * p[5]) + (d[14] * p[ 9]) + (d[15] * p[13]);
   var v14 = (d[12] * p[2]) + (d[13] * p[6]) + (d[14] * p[10]) + (d[15] * p[14]);
   var v15 = (d[12] * p[3]) + (d[13] * p[7]) + (d[14] * p[11]) + (d[15] * p[15]);
   // 复制内容
   d[ 0] = v00;
   d[ 1] = v01;
   d[ 2] = v02;
   d[ 3] = v03;
   d[ 4] = v04;
   d[ 5] = v05;
   d[ 6] = v06;
   d[ 7] = v07;
   d[ 8] = v08;
   d[ 9] = v09;
   d[10] = v10;
   d[11] = v11;
   d[12] = v12;
   d[13] = v13;
   d[14] = v14;
   d[15] = v15;
}

//============================================================
// <T>平移内容。</T>
//
// @method
// @param x:Float X坐标
// @param y:Float Y坐标
// @param z:Float Z坐标
//============================================================
function SMatrix4x4_translate(x, y, z){
   var v = RArray.array16;
   v[ 0] = 1;
   v[ 1] = 0;
   v[ 2] = 0;
   v[ 3] = 0;
   v[ 4] = 0;
   v[ 5] = 1;
   v[ 6] = 0;
   v[ 7] = 0;
   v[ 8] = 0;
   v[ 9] = 0;
   v[10] = 1;
   v[11] = 0;
   v[12] = x;
   v[13] = y;
   v[14] = z;
   v[15] = 1;
   this.appendData(v);
}

//============================================================
// <T>X轴旋转内容。</T>
//  1    0   0 0
//  0  cos sin 0
//  0 -sin cos 0
//  0    0   0 1 
//
// @method
// @param p:value:Float 弧度
//============================================================
function SMatrix4x4_rotationX(p){
   // 计算旋转
   var rs = Math.sin(p);
   var rc = Math.cos(p);
   // 追加内容
   var v = RArray.array16;
   v[ 0] = 1;
   v[ 1] = 0;
   v[ 2] = 0;
   v[ 3] = 0;
   v[ 4] = 0;
   v[ 5] = rc;
   v[ 6] = rs;
   v[ 7] = 0;
   v[ 8] = 0;
   v[ 9] = -rs;
   v[10] = rc;
   v[11] = 0;
   v[12] = 0;
   v[13] = 0;
   v[14] = 0;
   v[15] = 1;
   this.appendData(v);
}

//============================================================
// <T>Y轴旋转内容。</T>
//  cos   0  sin  0
//  0     1    0  0
//  -sin  0  cos  0
//  0     0    0  1 
//
// @method
// @param p:value:Float 弧度
//============================================================
function SMatrix4x4_rotationY(p){
   // 计算旋转
   var rs = Math.sin(p);
   var rc = Math.cos(p);
   // 追加内容
   var v = RArray.array16;
   v[ 0] = rc;
   v[ 1] = 0;
   v[ 2] = rs;
   v[ 3] = 0;
   v[ 4] = 0;
   v[ 5] = 1;
   v[ 6] = 0;
   v[ 7] = 0;
   v[ 8] = -rs;
   v[ 9] = 0;
   v[10] = rc;
   v[11] = 0;
   v[12] = 0;
   v[13] = 0;
   v[14] = 0;
   v[15] = 1;
   this.appendData(v);
}

//============================================================
// <T>Z轴旋转内容。</T>
//  cos  sin  0 0
//  -sin cos  1 0
//  0      0  1 0
//  0      0  0 1 
//
// @method
// @param p:value:Float 弧度
//============================================================
function SMatrix4x4_rotationZ(p){
   // 计算旋转
   var rs = Math.sin(p);
   var rc = Math.cos(p);
   // 追加内容
   var v = RArray.array16;
   v[ 0] = rc;
   v[ 1] = rs;
   v[ 2] = 0;
   v[ 3] = 0;
   v[ 4] = -rs;
   v[ 5] = rc;
   v[ 6] = 1;
   v[ 7] = 0;
   v[ 8] = 0;
   v[ 9] = 0;
   v[10] = 1;
   v[11] = 0;
   v[12] = 0;
   v[13] = 0;
   v[14] = 0;
   v[15] = 1;
   this.appendData(v);
}

//============================================================
// <T>设置旋转内容。</T>
//  1    0   0 0
//  0  cos sin 0
//  0 -sin cos 0
//  0    0   0 1 
//
// @method
// @param x:Float X弧度
// @param y:Float Y弧度
// @param z:Float Z弧度
//============================================================
function SMatrix4x4_rotation(x, y, z){
   // 计算旋转
   var rsx = Math.sin(x);
   var rcx = Math.cos(x);
   var rsy = Math.sin(y);
   var rcy = Math.cos(y);
   var rsz = Math.sin(z);
   var rcz = Math.cos(z);
   // 追加内容
   var v = RArray.array16;
   v[ 0] = rcy * rcz;
   v[ 1] = rcy * rsz;
   v[ 2] = -rsy;
   v[ 3] = 0;
   v[ 4] = rsx * rsy * rcz - rcx * rsz;
   v[ 5] = rsx * rsy * rsz + rcx * rcz;
   v[ 6] = rsx * rcy;
   v[ 7] = 0;
   v[ 8] = rcx * rsy * rcz + rsx * rsz;
   v[ 9] = rcx * rsy * rsz - rsx * rcx;
   v[10] = rcx * rcy;
   v[11] = 0;
   v[12] = 0;
   v[13] = 0;
   v[14] = 0;
   v[15] = 1;
   this.appendData(v);
}

//============================================================
// <T>设置缩放内容。</T>
//
// @method
// @param x:Float X比例
// @param y:Float Y比例
// @param z:Float Z比例
//============================================================
function SMatrix4x4_scale(x, y, z){
   var v = RArray.array16;
   v[ 0] = x;
   v[ 1] = 0;
   v[ 2] = 0;
   v[ 3] = 0;
   v[ 4] = 0;
   v[ 5] = y;
   v[ 6] = 0;
   v[ 7] = 0;
   v[ 8] = 0;
   v[ 9] = 0;
   v[10] = z;
   v[11] = 0;
   v[12] = 0;
   v[13] = 0;
   v[14] = 0;
   v[15] = 1;
   this.appendData(v);
}

//============================================================
// <T>计算逆矩阵。</T>
//
// @method
// @return Boolean 是否成功
//============================================================
function SMatrix4x4_invert(){
   var o = this;
   var d = o._data;
   var v = RArray.array16;
   // 计算矩阵
   v[ 0] =  (d[ 5] * d[10] * d[15]) - (d[ 5] * d[11] * d[14]) - (d[ 9] * d[ 6] * d[15]) + (d[ 9] * d[ 7] * d[14]) + (d[13] * d[ 6] * d[11]) - (d[13] * d[ 7] * d[10]);
   v[ 4] = -(d[ 4] * d[10] * d[15]) + (d[ 4] * d[11] * d[14]) + (d[ 8] * d[ 6] * d[15]) - (d[ 8] * d[ 7] * d[14]) - (d[12] * d[ 6] * d[11]) + (d[12] * d[ 7] * d[10]);
   v[ 8] =  (d[ 4] * d[ 9] * d[15]) - (d[ 4] * d[11] * d[13]) - (d[ 8] * d[ 5] * d[15]) + (d[ 8] * d[ 7] * d[13]) + (d[12] * d[ 5] * d[11]) - (d[12] * d[ 7] * d[ 9]);
   v[12] = -(d[ 4] * d[ 9] * d[14]) + (d[ 4] * d[10] * d[13]) + (d[ 8] * d[ 5] * d[14]) - (d[ 8] * d[ 6] * d[13]) - (d[12] * d[ 5] * d[10]) + (d[12] * d[ 6] * d[ 9]);
   v[ 1] = -(d[ 1] * d[10] * d[15]) + (d[ 1] * d[11] * d[14]) + (d[ 9] * d[ 2] * d[15]) - (d[ 9] * d[ 3] * d[14]) - (d[13] * d[ 2] * d[11]) + (d[13] * d[ 3] * d[10]);
   v[ 5] =  (d[ 0] * d[10] * d[15]) - (d[ 0] * d[11] * d[14]) - (d[ 8] * d[ 2] * d[15]) + (d[ 8] * d[ 3] * d[14]) + (d[12] * d[ 2] * d[11]) - (d[12] * d[ 3] * d[10]);
   v[ 9] = -(d[ 0] * d[ 9] * d[15]) + (d[ 0] * d[11] * d[13]) + (d[ 8] * d[ 1] * d[15]) - (d[ 8] * d[ 3] * d[13]) - (d[12] * d[ 1] * d[11]) + (d[12] * d[ 3] * d[ 9]);
   v[13] =  (d[ 0] * d[ 9] * d[14]) - (d[ 0] * d[10] * d[13]) - (d[ 8] * d[ 1] * d[14]) + (d[ 8] * d[ 2] * d[13]) + (d[12] * d[ 1] * d[10]) - (d[12] * d[ 2] * d[ 9]);
   v[ 2] =  (d[ 1] * d[ 6] * d[15]) - (d[ 1] * d[ 7] * d[14]) - (d[ 5] * d[ 2] * d[15]) + (d[ 5] * d[ 3] * d[14]) + (d[13] * d[ 2] * d[ 7]) - (d[13] * d[ 3] * d[ 6]);
   v[ 6] = -(d[ 0] * d[ 6] * d[15]) + (d[ 0] * d[ 7] * d[14]) + (d[ 4] * d[ 2] * d[15]) - (d[ 4] * d[ 3] * d[14]) - (d[12] * d[ 2] * d[ 7]) + (d[12] * d[ 3] * d[ 6]);
   v[10] =  (d[ 0] * d[ 5] * d[15]) - (d[ 0] * d[ 7] * d[13]) - (d[ 4] * d[ 1] * d[15]) + (d[ 4] * d[ 3] * d[13]) + (d[12] * d[ 1] * d[ 7]) - (d[12] * d[ 3] * d[ 5]);
   v[14] = -(d[ 0] * d[ 5] * d[14]) + (d[ 0] * d[ 6] * d[13]) + (d[ 4] * d[ 1] * d[14]) - (d[ 4] * d[ 2] * d[13]) - (d[12] * d[ 1] * d[ 6]) + (d[12] * d[ 2] * d[ 5]);
   v[ 3] = -(d[ 1] * d[ 6] * d[11]) + (d[ 1] * d[ 7] * d[10]) + (d[ 5] * d[ 2] * d[11]) - (d[ 5] * d[ 3] * d[10]) - (d[ 9] * d[ 2] * d[ 7]) + (d[ 9] * d[ 3] * d[ 6]);
   v[ 7] =  (d[ 0] * d[ 6] * d[11]) - (d[ 0] * d[ 7] * d[10]) - (d[ 4] * d[ 2] * d[11]) + (d[ 4] * d[ 3] * d[10]) + (d[ 8] * d[ 2] * d[ 7]) - (d[ 8] * d[ 3] * d[ 6]);
   v[11] = -(d[ 0] * d[ 5] * d[11]) + (d[ 0] * d[ 7] * d[ 9]) + (d[ 4] * d[ 1] * d[11]) - (d[ 4] * d[ 3] * d[ 9]) - (d[ 8] * d[ 1] * d[ 7]) + (d[ 8] * d[ 3] * d[ 5]);
   v[15] =  (d[ 0] * d[ 5] * d[10]) - (d[ 0] * d[ 6] * d[ 9]) - (d[ 4] * d[ 1] * d[10]) + (d[ 4] * d[ 2] * d[ 9]) + (d[ 8] * d[ 1] * d[ 6]) - (d[ 8] * d[ 2] * d[ 5]);
   // 计算内容
   var r = d[ 0] * v[ 0] + d[ 1] * v[ 4] + d[ 2] * v[ 8] + d[ 3] * v[12];
   if(r == 0){
     return false;
   }
   r = 1 / r;
   // 设置内容
   for(var i = 0; i < 16; i++){
      d[i] = v[i] * r;
   }
   return true;
}

//==========================================================
// <T>变换顶点数据。</T>
//
// @method
// @param po:outputData:Array 输出数据
// @param poi:outputIndex:Integer 输出位置
// @param pi:inputData:Array 输入数据
// @param pii:inputIndex:Integer 输入位置
// @param pc:count:Integer 个数
//==========================================================
function SMatrix4x4_transform(po, poi, pi, pii, pc){
   var d = this._data;
   for(var i = 0; i < pc; i++){
      var x = pi[pii++];
      var y = pi[pii++];
      var z = pi[pii++];
      po[poi++] = (x * d[ 0]) + (y * d[ 4]) +(z * d[ 8]) + d[12];
      po[poi++] = (x * d[ 1]) + (y * d[ 5]) +(z * d[ 9]) + d[13];
      po[poi++] = (x * d[ 2]) + (y * d[ 6]) +(z * d[10]) + d[14];
   }
}

//==========================================================
// <T>变换顶点数据。</T>
//
// @method
// @param pi:inputPoint:SPoint3 输入顶点
// @param po:inputPoint:SPoint3 输出顶点
//==========================================================
function SMatrix4x4_transformPoint3(pi, po){
   var d = this._data;
   var x = (pi.x * d[ 0]) + (pi.y * d[ 4]) +(pi.z * d[ 8]) + d[12];
   var y = (pi.x * d[ 1]) + (pi.y * d[ 5]) +(pi.z * d[ 9]) + d[13];
   var z = (pi.x * d[ 2]) + (pi.y * d[ 6]) +(pi.z * d[10]) + d[14];
   var r = null;
   if(po){
      r = po;
   }else{
      r = new SPoint3();
   }
   r.set(x, y, z);
   return r;
}

//============================================================
// <T>构建一个矩阵。</T>
//
// @method
// @param t:translation:SPoint3 位移
// @param r:quaternion:SQuaternion 旋转
// @param s:scale:SVector3 缩放
//============================================================
function SMatrix4x4_build(t, r, s){
   var d = this._data;
   var x2 = r.x * r.x;
   var y2 = r.y * r.y;
   var z2 = r.z * r.z;
   var xy = r.x * r.y;
   var xz = r.x * r.z;
   var yz = r.y * r.z;
   var wx = r.w * r.x;
   var wy = r.w * r.y;
   var wz = r.w * r.z;
   d[ 0] = (1 - 2 * (y2 + z2)) * s.x;
   d[ 1] = 2 * (xy - wz) * s.x;
   d[ 2] = 2 * (xz + wy) * s.x;
   d[ 3] = 0;
   d[ 4] = 2 * (xy + wz) * s.y;
   d[ 5] = (1 - 2 * (x2 + z2)) * s.y;
   d[ 6] = 2 * (yz - wx) * s.y;
   d[ 7] = 0;
   d[ 8] = 2 * (xz - wy) * s.z;
   d[ 9] = 2 * (yz + wx) * s.z;
   d[10] = (1 - 2 * (x2 + y2)) * s.z;
   d[11] = 0;
   d[12] = t.x;
   d[13] = t.y;
   d[14] = t.z;
   d[15] = 1;
}

//============================================================
// <T>构建一个矩阵。</T>
//
// @method
// @param t:translation:SPoint3 位移
// @param r:quaternion:SQuaternion 旋转
// @param s:scale:SVector3 缩放
//============================================================
function SMatrix4x4_buildQuaternion(r){
   var d = this._data;
   var x2 = r.x * r.x;
   var y2 = r.y * r.y;
   var z2 = r.z * r.z;
   var xy = r.x * r.y;
   var xz = r.x * r.z;
   var yz = r.y * r.z;
   var wx = r.w * r.x;
   var wy = r.w * r.y;
   var wz = r.w * r.z;
   d[ 0] = 1 - 2 * (y2 + z2);
   d[ 1] = 2 * (xy - wz);
   d[ 2] = 2 * (xz + wy);
   d[ 3] = 0;
   d[ 4] = 2 * (xy + wz);
   d[ 5] = 1 - 2 * (x2 + z2);
   d[ 6] = 2 * (yz - wx);
   d[ 7] = 0;
   d[ 8] = 2 * (xz - wy);
   d[ 9] = 2 * (yz + wx);
   d[10] = 1 - 2 * (x2 + y2);
   d[11] = 0;
   d[12] = 0;
   d[13] = 0;
   d[14] = 0;
   d[15] = 1;
}

//==========================================================
// <T>写入数据。</T>
//
// @method
// @param d:data:Array 数组
// @param i:offset:Integer 索引位置
//==========================================================
function SMatrix4x4_writeData(d, i){
   var o = this;
   var pd = o._data;
   d[i++] = pd[ 0];
   d[i++] = pd[ 4];
   d[i++] = pd[ 8];
   d[i++] = pd[12];
   d[i++] = pd[ 1];
   d[i++] = pd[ 5];
   d[i++] = pd[ 9];
   d[i++] = pd[13];
   d[i++] = pd[ 2];
   d[i++] = pd[ 6];
   d[i++] = pd[10];
   d[i++] = pd[14];
   d[i++] = pd[ 3];
   d[i++] = pd[ 7];
   d[i++] = pd[11];
   d[i++] = pd[15];
}

//==========================================================
// <T>获得字符串。</T>
//
// @method
// @return String 字符串
//==========================================================
function SMatrix4x4_toString(){
   var d = this._data;
   var r = new TString();
   for(var y = 0; y < 4; y++){
      if(y > 0){
         r.append('|');
      }
      for(var x = 0; x < 4; x++){
         var i = y * 4 + x;
         var v = d[i];
         if(x > 0){
            r.append(',');
         }
         r.append(RFloat.format(v, 0, null, 3, null));
      }
   }
   return r.flush();
}
