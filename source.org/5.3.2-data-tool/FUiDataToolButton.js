//==========================================================
// <T>界面工具栏按键。</T>
//
//  hParent<TD>
//  hPanel<DIV>
// ┌---------------------------------------------┐
// │ hForm<TABLE>                                │
// │┌--------------┬----------------┐         │
// ││hIconPanel<TD>│ hLabelPanel<TD>│hLine<TR>│
// ││hIcon<IMG>    │                │         │
// │└--------------┴----------------┘         │
// └---------------------------------------------┘
//
// @class
// @author maocy
// @history 150121
//==========================================================
function FUiDataToolButton(o){
   o = RClass.inherits(this, o, FUiControl, MListenerClick);
   //..........................................................
   // @property
   o._icon            = RClass.register(o, new APtyString('_icon'));
   o._iconDisable     = RClass.register(o, new APtyString('_iconDisable'));
   o._hotkey          = RClass.register(o, new APtyString('_hotkey'));
   o._action          = RClass.register(o, new APtyString('_action'));
   //..........................................................
   // @style
   o._styleNormal     = RClass.register(o, new AStyle('_styleNormal', 'Normal'));
   o._styleHover      = RClass.register(o, new AStyle('_styleHover', 'Hover'));
   o._stylePress      = RClass.register(o, new AStyle('_stylePress', 'Press'));
   o._styleDisable    = RClass.register(o, new AStyle('_styleDisable', 'Disable'));
   o._styleIconPanel  = RClass.register(o, new AStyle('_styleIcon', 'Icon'));
   o._styleIcon       = RClass.register(o, new AStyle('_styleIcon', 'Icon'));
   o._styleLabelPanel = RClass.register(o, new AStyle('_styleLabel', 'Label'));
   //..........................................................
   // @attribute
   o._disabled        = false;
   //..........................................................
   // @html
   o._hIconPanel      = null;
   o._hIcon           = null;
   o._hLabelPanel     = null;
   //..........................................................
   // @event
   o.onBuildPanel     = FUiDataToolButton_onBuildPanel;
   o.onBuild          = FUiDataToolButton_onBuild;
   // @event
   o.onEnter          = FUiDataToolButton_onEnter;
   o.onLeave          = FUiDataToolButton_onLeave;
   o.onMouseDown      = RClass.register(o, new AEventMouseDown('onMouseDown'), FUiDataToolButton_onMouseDown);
   o.onMouseUp        = RClass.register(o, new AEventMouseDown('onMouseUp'), FUiDataToolButton_onMouseUp);
   //..........................................................
   // @method
   o.icon             = FUiDataToolButton_icon;
   o.setIcon          = FUiDataToolButton_setIcon;
   o.setLabel         = FUiDataToolButton_setLabel;
   o.setEnable        = FUiDataToolButton_setEnable;
   o.click            = FUiDataToolButton_click;
   o.dispose          = FUiDataToolButton_dispose;



   //o._type            = RClass.register(o, new APtyString('_type'));
   //o._dataAction      = RClass.register(o, new APtyString('_dataAction'));
   //o._service         = RClass.register(o, new APtyString('_service'));
   //o._target          = RClass.register(o, new APtyString('_target'));
   //o._page            = RClass.register(o, new APtyString('_page'));
   //o._method          = RClass.register(o, new APtyString('_method'));
   //o._attributes      = RClass.register(o, new APtyString('_attributes'));
   //..........................................................
   // @event
   //o.onButtonClick   = RClass.register(o, new AEventClick('onButtonClick'), FUiDataToolButton_onButtonClick);
   //..........................................................
   // @style
   //o._styleIconDisable   = RClass.register(o, new AStyle('_styleIconDisable', 'IconDisable'));
   //o._styleButton        = RClass.register(o, new AStyleIcon('_styleButton', 'Button'));
   //o._styleButtonDisable = RClass.register(o, new AStyleIcon('_styleButtonDisable', 'ButtonDisable'));
   //o._styleButtonHover   = RClass.register(o, new AStyleIcon('_styleButtonHover', 'ButtonHover'));
   //..........................................................
   // @html
   //o._hButton         = null;
   //o._hButtonLine     = null;
   //o._hButtonPanel    = null;
   //..........................................................
   // @event
   //o.onShowHint      = FUiDataToolButton_onShowHint;
   return o;
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FUiDataToolButton_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createDiv(p, o.styleName('Normal'));
}

//==========================================================
// <T>建立当前控件的显示框架。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FUiDataToolButton_onBuild(p){
   var o = this;
   o.__base.FUiControl.onBuild.call(o, p);
   // 设置面板
   var h = o._hPanel;
   o.attachEvent('onMouseDown', h);
   o.attachEvent('onMouseUp', h);
   // 建立表单
   var hf = o._hForm = RBuilder.appendTable(p);
   var hl = o._hLine = RBuilder.appendTableRow(hf);
   // 建立图标
   if(o._icon){
      var hl = o._hIconPanel = RBuilder.appendTableCell(hl);
      o._hIcon = RBuilder.appendIcon(hl, o.styleName('Icon'), o._icon);
   }
   // 建立标签
   if(o._label){
      var hl = o._hLabelPanel = RBuilder.appendTableCell(hl);
      o.setLabel(o._label);
   }
   // 建立热键
   //if(o._hotkey){
   //   //o._hLabel.innerHTML = '&nbsp;' + o.label+"("+o._hotkey+")";
   //   RConsole.find(FKeyConsole).register(o._hotkey, new TListener(o, o.onButtonClick));
   //
}

//==========================================================
// <T>鼠标进入处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FUiDataToolButton_onEnter(e){
   var o = this;
   //if(o._hotkey || o.hint){
   //   if(!o.hintBox){
   //      o.hintBox = RConsole.find(FHintConsole).find();
   //   }
   //   o.hintBox.linkControl(o);
   //   o.active = new TActive(o, o.onShowHint);
   //   o.active.count = 300;
   //   RConsole.find(FActiveConsole).push(o.active);
   //   //o.hintBox.show();
   //}
   if(!o._disabled){
      // 消息提示
      o._hPanel.className = o.styleName('Hover');
      //o._hButton.background = o.styleIconPath('ButtonHover', FUiDataToolButton);
   }
}

//==========================================================
// <T>鼠标离开处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FUiDataToolButton_onLeave(e){
   var o = this;
   //if(o.hintBox){
   //   o.hintBox.hide();
   //   o.hintBox = null;
   //}
   if(!o._disabled){
      o._hPanel.className = o.styleName('Normal');
      //o._hButton.background = o.styleIconPath('Button', FUiDataToolButton);
   }
}

//==========================================================
// <T>鼠标按下处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FUiDataToolButton_onMouseDown(){
   var o = this;
   //if(o.hintBox){
   //   o.hintBox.hide();
   //}
   if(!o._disabled){
      o._hPanel.className = this.styleName('Press');
      o.click();
   }
}

//==========================================================
// <T>鼠标抬起处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FUiDataToolButton_onMouseUp(h){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Hover');
   }
}

//==========================================================
// <T>获得图标。</T>
//
// @method
// @return String 图标
//==========================================================
function FUiDataToolButton_icon(){
   return this._icon;
}

//==========================================================
// <T>设置图标。</T>
//
// @method
// @param p:icon:String 图标
//==========================================================
function FUiDataToolButton_setIcon(p){
   this._icon = p;
}

//==========================================================
// <T>设置标签。</T>
//
// @method
// @param p:label:String 标签
//==========================================================
function FUiDataToolButton_setLabel(p){
   var o = this;
   var s = RString.nvl(p);
   o._label = s;
   if(o._hIcon){
      s = ' ' + o._label;
   }
   if(o._hLabel){
      o._hLabel.innerText = s;
   }
}

//==========================================================
// <T>设置控件的可操作和禁止。</T>
//
// @method
// @param p:enable:Boolean 是否可操作
//==========================================================
function FUiDataToolButton_setEnable(p){
   var o = this;
   o.__base.FUiControl.oeEnable.call(o, e);
   o._disabled = !e.enable;
   // 设置图标
   if(e.enable && o._icon){
      var is = RRes._iconPath(o._icon);
      if(o._hIcon.src != is){
         o._hIcon.src = is;
      }
   }else if(!e.enable && o._iconDisable){
      var is = RRes._iconPath(o._iconDisable);
      if(o._hIcon.src != is){
         o._hIcon.src = is;
      }
   }
   // 设置图标样式
   var css = o.styleName(e.enable ? 'Icon' : 'IconDisable');
   if(o._hIcon.className != css){
      o._hIcon.className = css;
   }
   // 设置按键样式
   var css = o.styleName(e.enable ? 'Button' : 'Disable');
   if(o._hPanel.className != css){
      o._hPanel.className = css;
   }
   // 设置按键样式
   var ci = o.styleIconPath(e.enable ? 'Button' : 'ButtonDisable');
   if(o._hButton.background != ci){
      o._hButton.background = ci;
   }
   return EEventStatus.Stop;
}

//==========================================================
// <T>点击处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FUiDataToolButton_click(){
   var o = this;
   RLogger.debug(o, 'Mouse button click. (label={1})' + o._label);
   //if(o.isVisible() && !o._disabled && (EAction.Design != o.inAction)){
      // 存储当前焦点对象，强制失去焦点
      //alert('o._disabled='+o._disabled);
      //var fc = RConsole.find(FFocusConsole);
      //fc.storeFocus();
      //fc.blur();
      // 执行监听信息
      o.processClickListener(o);
      // 执行按键操作
      //if(o._action){
      //   eval(o._action);
      //}
      //if(o._service){
      //   // 分解service
      //   var servs = RString.splitTwo(o._service, '@');
      //   // 找到表单对象
      //   var f = RConsole.find(FFocusConsole).findClass(MDataset);
      //   // 构建处理事件对象
      //   var arg = new TDatasetServiceArg(f.name, o._dataAction);
      //   arg.callback = new TInvoke(f, f.onDsProcess);
      //   arg.rows = f.getCurrentRows();
      //   RConsole.find(FFormConsole).process(arg);
      //}
      //if(o._page || o._method){
         //var form = RHtml.form(o._hButton);
         //var p = RPage.parse(o._page);
         //if(o._method){
         //   p._action = o._method;
         //}
         //p.split(o._attributes);
         //
         //var f = RConsole.find(FFocusConsole).findClass(MDataset);
         //if(f){
            //var as = new TAttributes();
            //f.saveValue(as);
            //p.attrs().set('form_pack', as.pack());
            //if(form && form.form_pack){
            //   form.form_pack.value = as.pack();
            //}
         //}
         //p.post(form, o._target);
         /*for(var n = 0;n < p._attributes.count; n++){
            if(RStr.contains(p._attributes.value(n),'$')){
               var v = RStr.removeChars(p._attributes.value(n),'$');
               v = RStr.removeChars(v,'{');
               v = RStr.removeChars(v,'}');
               var f = RConsole.find(FFocusConsole).findClass(MDataset);
               debugger
               var ctl = f.controls.get(v);
               if(RClass.checkClass(ctl,MEditValue)){
                  p.attribues.setValue(n,ctl.get());
               }
            }
         }*/
      //}
      //o.processClick();
   //}
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FUiDataToolButton_dispose(){
   var o = this;
   o._hButton = null;
   o._hButtonLine = null;
   o._hButtonPanel = null;
   // 释放属性
   o._hIcon = null;
   o._hText = null;
   // 父处理
   o.__base.FUiControl.dispose.call(o);
}


/**************************************************************
 * 相应点击事件
 *
 * @method
 * @see FUiDataToolButton_onClick
 **************************************************************/
function FUiDataToolButton_onShowHint(a){
   var o = this;
   a.status = EActive.Finish;
   if(o.hintBox){
      o.hintBox.show();
   }
}