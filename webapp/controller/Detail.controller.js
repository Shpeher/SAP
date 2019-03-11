sap.ui.define([
	"sap/ui/core/mvc/Controller",
	 "sap/ui/model/odata/v2/ODataModel",
	 'sap/m/Button',
	 'sap/m/Dialog',
	 'sap/m/MessageToast',
	 'sap/m/Text',
	'sap/ui/test/matchers/I18NText'
],function (Controller,ODataModel,Button,Dialog,MessageToast,Text,i18n) {
	"use strict";

	var CController = Controller.extend("com.sap.build.standard.untitledPrototype.controller.Detail", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.sap.build.standard.untitledPrototype.view.Detail
		 */
		onInit: function () {
				this.getOwnerComponent().getRouter().getRoute("Detail").attachPatternMatched(this._onObjectMatched,this);

		},
		_onObjectMatched: function(oEvent) {
			var oView=this.getView();
			var oModel=oView.getModel();
			var oArgs=oEvent.getParameter("arguments");
			oModel.metadataLoaded().then(function(){
				oView.bindElement({
					path:oModel.createKey("/ItemSet",{"ID":oArgs.objectId})
				});
			});
		},
		_onSavePress: function () {
				var oView=this.getView();
				var dialog = new Dialog({
				title: 'Confirm',
				type: 'Message',
				content: new Text({ text: 'Are you sure to save item??' }),
				beginButton: new Button({
					text: 'Submit',
					press: function (oEvent) {
						//var oView=CController.getView();
						var oModel=oView.getModel();
						var ID=oView.byId("ID").getText();
						var SUM=oView.byId("SUM").getValue();
						var description=oView.byId("description").getValue();
						var sPath=oModel.createKey("/ItemSet",{"ID":ID});
						oModel.update(sPath,{"SUM":SUM,"description":description} );        
						oModel.submitChanges();
						MessageToast.show('Save successful!');
						dialog.close();
					}
				}),
				endButton: new Button({
					text: 'Cancel',
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});

			dialog.open();
		},
		_onDeletePress: function(oEvent){
			var oView=this.getView();
			var dialog = new Dialog({
				title: 'Confirm',
				type: 'Message',
				content: new Text({ text: 'Are you sure to delete item?' }),
				beginButton: new Button({
					text: 'Submit',
					press: function (oEvent) {
						var oModel=oView.getModel();
						var ID=oView.byId("ID").getText();
						var sPath=oModel.createKey("/ItemSet",{"ID":ID});
						oModel.remove(sPath,{"ID":ID});        
						oModel.submitChanges();
						MessageToast.show('Delete successful!');
						dialog.close();
					}
				}),
				endButton: new Button({
					text: 'Cancel',
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});

			dialog.open();
		}
		// _OnSave:function (oEvent)
		// {
		// 	var oView=this.getView();
		// 	var oModel=oView.getModel();
		// 	var ID=oView.byId("ID").getText();
		// 	var SUM=oView.byId("SUM").getValue();
		// 	var description=oView.byId("description").getValue();
		// 	var sPath=oModel.createKey("/ItemSet",{"ID":ID});
		// 	oModel.update(sPath,{"SUM":SUM,"description":description} ).then(function() {                
		// 	oModel.submitChanges();
		// 	});
		// },
		// _onDelete: function(oEvent){
		// 	var oView=this.getView();
		// 	var oModel=oView.getModel();
		// 	var ID=oView.byId("ID").getText();
		// 	var sPath=oModel.createKey("/ItemSet",{"ID":ID});
		// 	oModel.remove(sPath,{"ID":ID});        
		// 	oModel.submitChanges();
		// }

	});
	return CController;

});