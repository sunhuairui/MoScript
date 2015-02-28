// ============================================================
// FUiListView
// ============================================================
function FUiListView(o){
   o = RClass.inherits(this, o, FContainer, MShadow);
   // Attribute
   o.type           = null;
   o.lovControl     = null;
   o.listView       = null;
   // Html
   o.hForm          = null;
   o.hMessages      = null;
   // Html Event
   o.ohClearClick   = FUiListView_ohClearClick;
   o.ohCloseClick   = FUiListView_ohCloseClick;
   o.ohResetClick   = FUiListView_ohResetClick;
   o.ohLoaded       = FUiListView_ohLoaded;
   // Process
   o.oeBuild        = FUiListView_oeBuild;
   // Event
   o.onBuildPanel   = FUiListView_onBuildPanel;
   o.onBuildFields  = FUiListView_onBuildFields;
   o.onBuildButton  = FUiListView_onBuildButton;
   o.onBuildData    = FUiListView_onBuildData;
   o.onKeyDown      = FUiListView_onKeyDown;
   // Method
   o.buildField     = FUiListView_buildField;
   o.linkLovControl = FUiListView_linkLovControl;
   o.isBuilded      = FUiListView_isBuilded;
   o.show           = FUiListView_show;
   o.hide           = FUiListView_hide;
   o.doSearch       = FUiListView_doSearch;
   o.selectRow      = FUiListView_selectRow;
   o.dispose        = FUiListView_dispose;
   return o;
}
// ------------------------------------------------------------
function FUiListView_ohCloseClick(){
   this.hide();
}
// ------------------------------------------------------------
function FUiListView_ohClearClick(){
   var o = this;
   var cs = o.fieldsPanel.components;
   if(cs){
      for(var n=0; n<cs.count; n++){
         cs.value(n).clearSearch();
      }
   }
}
// ------------------------------------------------------------
function FUiListView_ohResetClick(){
}
// ------------------------------------------------------------
function FUiListView_ohLoaded(){
   this.lovControl.onBuildData(this.document.root());
}
// ------------------------------------------------------------
function FUiListView_oeBuild(event){
   var o = this;
   o.base.FContainer.oeBuild.call(o, event);
   // Form (2colx1row)
   var hTab = RBuilder.appendTable(o.hPanel);
   hTab.width = '100%';
   hTab.height = '100%';
   var hRow = hTab.insertRow();
   var h = o.hTitlePanel = hRow.insertCell();
   h.className = o.style('TitlePanel');
   RBuilder.appendIcon(h, 'tool.search');
   RBuilder.appendText(h, '&nbsp;List of View');
   h.colSpan = 2;
   // Body row
   hRow = hTab.insertRow();
   // Message Panel
   var h = o.hFieldsPanel = hRow.insertCell();
   h.className = o.style('FieldsPanel');
   //o.onBuildFields();
   // Button Panel
   var h = o.hButtonPanel = hRow.insertCell();
   h.className = o.style('ButtonPanel');
   o.onBuildButton();
   return EEventStatus.Stop;
}
// ------------------------------------------------------------
function FUiListView_onBuildPanel(){
   var o = this;
   o.hPanel = RBuilder.append(null, 'DIV');
   o.hPanel.style.zIndex = ELayer.Message;
}
// ------------------------------------------------------------
function FUiListView_onBuildFields(){
   return;
   var o = this;
   var hTab = o.hFieldsTab = RBuilder.appendTable(o.hFieldsPanel, null, 10, 10);
   hTab.width = '100%';
   //hTab.height = '100%';
   // Message Caption
   var hRow = hTab.insertRow();
   var hCel = hRow.insertCell();
   hCel.className = this.style('Title');
   hCel.innerText = 'Message:';
   // Messages
   var hRow = hTab.insertRow();
   var hCel = hRow.insertCell();
   hCel.className = this.style('Message');
   o.hMessages = RBuilder.appendTable(hCel);
   o.hMessages.width = '100%';
   // Description Caption
   var hRow = hTab.insertRow();
   var hCel = hRow.insertCell();
   hCel.className = this.style('Title');
   hCel.innerText = 'Description:';
   // Description
   var hRow = hTab.insertRow();
   var hCel = hRow.insertCell();
   hCel.className = this.style('Description');
}
// ------------------------------------------------------------
function FUiListView_onBuildButton(){
   var o = this;
   // Button Panel
   var hBtnTab = RBuilder.appendTable(o.hButtonPanel, null, 0, 0, 6);
   var hRow = hBtnTab.insertRow();
   var hCel = hRow.insertCell();
   // Button - Search
   var b = o.btnSelect = RClass.create(FButton);
   b.label = 'Select'
   b.width = '100%';
   b.addClickListener(o, o.selectRow);
   b.build(hBtnTab.insertRow().insertCell());
   // Button - Close
   var b = o.btnClose = RClass.create(FButton);
   b.label = 'Close';
   b.width = '100%';
   b.addClickListener(o, o.ohCloseClick);
   b.build(hBtnTab.insertRow().insertCell());
   // Button - Refresh
   var b = o.btnRefresh = RClass.create(FButton);
   b.label = 'Refresh';
   b.width = '100%';
   b.addClickListener(o, o.ohClearClick);
   b.build(hBtnTab.insertRow().insertCell());
   // End line
   var hRow = hBtnTab.insertRow();
   var hCel = hRow.insertCell();
   hCel.innerHTML = '&nbsp;';
}
// ------------------------------------------------------------
// control
function FUiListView_buildField(c){
   var o = this;
   var hCell = o.hFieldsTab.insertRow().insertCell();
   hCell.innerText = c.label;

   o.fieldsPanel = RControl.create(FPanel);
   o.fieldsPanel.build();
   o.fieldsPanel.setPanel(hCel);
}
// ------------------------------------------------------------
function FUiListView_linkLovControl(ctl){
   var o = this;
   o.lovControl = ctl;
   o.lovRefer = ctl.lovRefer;
   // Build values
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('action', 'dsPicker');
   RConsole.find('FEnvConsole').build(root);
   var dn = root.create('Control');
   dn.set('lov_refer', ctl.lovRefer);
   dn.set('lov_where', ctl.lovWhere);
   dn.set('lov_order', ctl.lovOrder);
   RLog.info(o, 'Send lov request (service={1},node={2})', ctl.lovRefer, root.dump());
   // Build connection
   var e = new TEvent(o, EXmlEvent.Send);
   e.url = RService.url(ctl.lovService);
   e.document = doc;
   e.lovControl = o;
   e.onLoad = o.ohLoaded;
   RConsole.find(FXmlConsole).process(e);
}
// ------------------------------------------------------------
function FUiListView_onBuildData(config){
   var o = this;
   var v = o.listView = RControl.fromNode(config, o.hFieldsPanel);
   v.hPanel.height = '100%';
   v.resize();
   v.addDblClickListener(o, o.selectRow);
   v.addSelectListener(o, o.selectRow);
   v.addKeyDownListener(o, o.onKeyDown);
   o.show();
}
// ------------------------------------------------------------
function FUiListView_onKeyDown(sender, e){
   if(EKey.Esc == e.keyCode){
      this.hide();
   }
}
// ------------------------------------------------------------
function FUiListView_show(){
   var o = this;
   if(!o.isVisible()){
      o.base.FContainer.show.call(o);
      RWindow.setEnable(false);
      RWindow.moveCenter(o.hPanel);
      o.base.MShadow.show.call(o, true);
      o.focus();
      o.listView.focus();
   }
}
// ------------------------------------------------------------
function FUiListView_hide(){
   var o = this;
   if(o.isVisible()){
      o.base.FContainer.hide.call(o);
      o.base.MShadow.hide.call(o);
      RWindow.setEnable(true);
      o.lovControl.focus();
   }
}
// ------------------------------------------------------------
function FUiListView_doSearch(){
   var o = this;
   var cs = o.fieldsPanel.components;
   if(cs){
      var sn = new TNode('Search');
      for(var n=0; n<cs.count; n++){
         cs.value(n).saveSearch(sn);
      }
      RLog.debug(o, 'Search value {1}', sn.dump());
   }
   o.hide();
}
// ------------------------------------------------------------
function FUiListView_selectRow(table, row){
   var o = this;
   var fields = o.lovControl.lovFields;
   var dsCtl = o.lovControl.topControl(MDataset);
   if(dsCtl && fields){
      if(!row){
         row = o.listView.selectRow;
      }
      if(row){
         var flds = RString.splitTwo(fields, ',');
         for(var n=0; n<flds.length; n++){
            var v = RString.splitTwo(flds[n], ' ');
            dsCtl.dsSet(RString.nvl(v[1], v[0]), row.get(v[0]));
         }
         dsCtl.loadValue(dsCtl.dsCurrent());
      }
   }
   o.hide();
}
// ------------------------------------------------------------
function FUiListView_isBuilded(){
   return (null != this.listView);
}
// ------------------------------------------------------------
function FUiListView_dispose(){
   var o = this;
   o.base.FContainer.dispose.call(o);
   RMemory.freeHtml(o.hEdit);
   RMemory.freeHtml(o.hButton);
   RMemory.freeHtml(o.hText);
   RMemory.freeHtml(o.userSrc);
   RMemory.freeHtml(o.femaleSrc);
   RMemory.freeHtml(o.errorSrc);
   RMemory.freeHtml(o.orgSrc);
   RMemory.freeHtml(o.dutySrc);
   RMemory.freeHtml(o.roleSrc);
   RMemory.freeHtml(o.userUk);
   o.hEdit = null;
   o.hButton = null;
   o.hText = null;
   o.userSrc = null;
   o.femaleSrc = null;
   o.errorSrc = null;
   o.orgSrc = null;
   o.dutySrc = null;
   o.roleSrc = null;
   o.userUk = null;
}
// ------------------------------------------------------------

