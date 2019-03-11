sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History",
	"sap/ui/Device"
], function(BaseController, MessageBox, Utilities, History,Device) {
	"use strict";

	return BaseController.extend("com.sap.build.standard.untitledPrototype.controller.Master", {
		handleRouteMatched: function(oEvent) {
			var sAppId = "App5c7ce01e913b4901185b8d84";

			var oParams = {};

			if (oEvent.mParameters.data.context) {
				this.sContext = oEvent.mParameters.data.context;

			} else {
				if (this.getOwnerComponent().getComponentData()) {
					var patternConvert = function(oParam) {
						if (Object.keys(oParam).length !== 0) {
							for (var prop in oParam) {
								if (prop !== "sourcePrototype") {
									return prop + "(" + oParam[prop][0] + ")";
								}
							}
						}
					};

					this.sContext = patternConvert(this.getOwnerComponent().getComponentData().startupParameters);

				}
			}

			var oPath;

			if (this.sContext) {
				oPath = {
					path: "/" + this.sContext,
					parameters: oParams
				};
				this.getView().bindObject(oPath);
			}

		},
		_onObjectListItemPress: function(oEvent) {
			var oItem=oEvent.getParameter("listItem") || oEvent.getSource();
			this._showDetail(oItem);
		},
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("Master").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));

		},
		_showDetail:function(oItem){
			// console.log("log this");
			// console.log(this);
			var bReplace=!Device.system.phone;
			this.getOwnerComponent().getRouter().navTo("Detail",{
				objectId:oItem.getBindingContext().getProperty("ID")
			},bReplace);
		},
		
		onExit: function() {

			// to destroy templates for bound aggregations when templateShareable is true on exit to prevent duplicateId issue
			var aControls = [{
				"controlId": "sap_m_Page_0-content-sap_m_ObjectList-1551687929528",
				"groups": ["items"]
			}];
			for (var i = 0; i < aControls.length; i++) {
				var oControl = this.getView().byId(aControls[i].controlId);
				if (oControl) {
					for (var j = 0; j < aControls[i].groups.length; j++) {
						var sAggregationName = aControls[i].groups[j];
						var oBindingInfo = oControl.getBindingInfo(sAggregationName);
						if (oBindingInfo) {
							var oTemplate = oBindingInfo.template;
							oTemplate.destroy();
						}
					}
				}
			}

		}
	});
}, /* bExport= */ true);
