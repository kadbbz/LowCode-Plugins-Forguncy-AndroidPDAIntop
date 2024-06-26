﻿
var ERROR_NOT_RUN_IN_HAC = "当前APP不支持该命令，这通常是因为APP版本过低。您可以通过在葡萄城技术社区搜索“HAC”下载最新版APP，或访问以下地址获取并编译适配的Android APP。 项目地址： https://gitee.com/low-code-dev-lab/huozige-hac-app ";

var HAC_CallFunctionOutOfHAC = function () {
    alert(ERROR_NOT_RUN_IN_HAC);
}

var HAC_GenerateCellInfo = function (context, formula) {
    var cellLocation = context.getCellLocation(formula);

    if (!cellLocation) {
        return null;
    }

    if (window.parent) {
        cellLocation.iFrameName = window.name;
    }
    return JSON.stringify(cellLocation);
};

var HAC_GenerateCallbackTicket = function (context, onSuccess) {
    if (!window.HAC) {
        HAC_CallFunctionOutOfHAC();
    } else {

        var ticket = {
            functionName: "hac_onetime_callback_" + new Date().valueOf().toString()
        };

        if (window.parent) {
            ticket.iFrameName = window.name;
        }

        window.HAC.registryCallback(ticket, onSuccess, function (error) {
            context.CommandExecutor.excuteCommand(context.CommandParam.CommandList, {
                runTimePageName: context.CommandExecutingInfo.runTimePageName,
                commandID: new Date().valueOf().toString(),
                initParams: {
                    "IsSuccess": false,
                    "Error": error
                },
                locationString: "执行异步操作时出错"
            });
        });

        return JSON.stringify(ticket);
    }
};

var HAC_ReturnToParam = function (OutParamaterName, data) {
    if (OutParamaterName && OutParamaterName != "") {
        Forguncy.CommandHelper.setVariableValue(OutParamaterName, data);
    } else {
        console.log("OutParamaterName was not set, the value is: " + JSON.stringify(data));
    }
};

var HAC_DothanPrinterOp = function (callback) {
    if (window.dothanPrinter) {
        var status = window.dothanPrinter.getStatus();
        if (status === 1 || status === 2) {
            callback(true);
        } else {
            callback(false, status);
        }
    } else {
        HAC_CallFunctionOutOfHAC();
        callback(false, -1);
    }
};


var Android_PDA_Broadcast_Mode_Scan_Command = (function (_super) {
    __extends(Android_PDA_Broadcast_Mode_Scan_Command, _super);
    function Android_PDA_Broadcast_Mode_Scan_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Android_PDA_Broadcast_Mode_Scan_Command.prototype.execute = function () {

        var param = this.CommandParam;
        var targetCellFormula = param.TargetCell;
        var cellInfo = HAC_GenerateCellInfo(this, targetCellFormula);

        var isModal = this.evaluateFormula(param.ShouldModalMode);

        if (window.pda) {
            if (!isModal || isModal === 0) {
                window.pda.continuous_scan(cellInfo, 1); // 持续扫描，但仅接收1次
                console.log("启动单次扫描，非模态");
            } else {
                window.pda.modal_scan(cellInfo); // 模态扫描
                console.log("启动单次扫描，模态");
            }

        } else {
            HAC_CallFunctionOutOfHAC();
        }

    };

    return Android_PDA_Broadcast_Mode_Scan_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.Broadcast_Mode_Scan, AndroidPDACommand", Android_PDA_Broadcast_Mode_Scan_Command);

var Broadcast_Mode_Scan_Async_Command = (function (_super) {
    __extends(Broadcast_Mode_Scan_Async_Command, _super);
    function Broadcast_Mode_Scan_Async_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Broadcast_Mode_Scan_Async_Command.prototype.execute = function () {

        var param = this.CommandParam;
        var isModal = this.evaluateFormula(param.ShouldModalMode);
        var me = this;

        var ticket = HAC_GenerateCallbackTicket(me, function (payload, payload2) {
            me.CommandExecutor.excuteCommand(me.CommandParam.CommandList, {
                runTimePageName: me.CommandExecutingInfo.runTimePageName,
                commandID: new Date().valueOf().toString(),
                initParams: {
                    "Result_Received": payload,
                    "IsSuccess": true,
                    "Error": ""
                },
                locationString: "执行window.pda.modal_scanAsync的回调"
            });
        });

        if (window.pda && window.pda.modal_scanAsync) {
            if (!isModal || isModal === 0) {
                window.pda.modal_scanAsync(ticket, 1);
            } else {
                window.pda.modal_scanAsync(ticket);
            }

        } else {
            HAC_CallFunctionOutOfHAC();
        }

    };

    return Broadcast_Mode_Scan_Async_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.Broadcast_Mode_Scan_Async, AndroidPDACommand", Broadcast_Mode_Scan_Async_Command);

var Android_PDA_App_Info_Command = (function (_super) {
    __extends(Android_PDA_App_Info_Command, _super);
    function Android_PDA_App_Info_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Android_PDA_App_Info_Command.prototype.execute = function () {

        var param = this.CommandParam;
        var targetCellFormulaV = param.TargetCellVersion;
        var cellInfoV = HAC_GenerateCellInfo(this, targetCellFormulaV);

        var targetCellFormulaP = param.TargetCellPackage;
        var cellInfoP = HAC_GenerateCellInfo(this, targetCellFormulaP);

        if (window.app) {
            window.app.getVersion(cellInfoV);
            window.app.getPackageName(cellInfoP);

            console.log("从APP获取包名和版本信息");

        } else {
            HAC_CallFunctionOutOfHAC();
        }

    };

    return Android_PDA_App_Info_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.App_Info, AndroidPDACommand", Android_PDA_App_Info_Command);

var Android_PDA_App_Info2_Command = (function (_super) {
    __extends(Android_PDA_App_Info2_Command, _super);
    function Android_PDA_App_Info2_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Android_PDA_App_Info2_Command.prototype.execute = function () {

        var param = this.CommandParam;
        var targetV = param.TargetVersion;

        var targetP = param.TargetName;

        if (window.app && window.app.getVersion2 && window.app.getPackageName2) {
            var v = window.app.getVersion2();
            var p = window.app.getPackageName2();

            HAC_ReturnToParam(targetV, v);
            HAC_ReturnToParam(targetP, p);

            console.log("从APP获取包名和版本信息");

        } else {
            HAC_CallFunctionOutOfHAC();
        }

    };

    return Android_PDA_App_Info2_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.App_Info2, AndroidPDACommand", Android_PDA_App_Info2_Command);

var Android_PDA_CScan_Start_Command = (function (_super) {
    __extends(Android_PDA_CScan_Start_Command, _super);
    function Android_PDA_CScan_Start_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Android_PDA_CScan_Start_Command.prototype.execute = function () {

        var param = this.CommandParam;
        var targetCellFormula = param.TargetCell;
        var cellInfo = HAC_GenerateCellInfo(this, targetCellFormula);

        if (window.pda) {
            window.pda.continuous_scan(cellInfo, 0);
            console.log("启动持续扫描");
        } else {
            HAC_CallFunctionOutOfHAC();
        }

    };


    return Android_PDA_CScan_Start_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.Broadcast_Mode_ContinuousScanStart, AndroidPDACommand", Android_PDA_CScan_Start_Command);

var Broadcast_Mode_ContinuousScanStart_Async_Command = (function (_super) {
    __extends(Broadcast_Mode_ContinuousScanStart_Async_Command, _super);
    function Broadcast_Mode_ContinuousScanStart_Async_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Broadcast_Mode_ContinuousScanStart_Async_Command.prototype.execute = function () {

        var me = this;

        var ticket = HAC_GenerateCallbackTicket(me, function (payload, payload2) {
            me.CommandExecutor.excuteCommand(me.CommandParam.CommandList, {
                runTimePageName: me.CommandExecutingInfo.runTimePageName,
                commandID: new Date().valueOf().toString(),
                initParams: {
                    "Totally_Received": payload,
                    "IsSuccess": true,
                    "Error": ""
                },
                locationString: "执行window.pda.continuous_scanAsync的回调"
            });
        });

        if (window.pda && window.pda.continuous_scanAsync) {
            window.pda.continuous_scanAsync(ticket, 0);
        } else {
            HAC_CallFunctionOutOfHAC();
        }

    };


    return Broadcast_Mode_ContinuousScanStart_Async_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.Broadcast_Mode_ContinuousScanStart_Async, AndroidPDACommand", Broadcast_Mode_ContinuousScanStart_Async_Command);

var Android_PDA_CScan_Stop_Command = (function (_super) {
    __extends(Android_PDA_CScan_Stop_Command, _super);
    function Android_PDA_CScan_Stop_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Android_PDA_CScan_Stop_Command.prototype.execute = function () {


        if (window.pda) {
            window.pda.continuous_scan_stop();
            console.log("停止持续扫描");
        } else {
            HAC_CallFunctionOutOfHAC();
        }

    };

    return Android_PDA_CScan_Stop_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.Broadcast_Mode_ContinuousScanStop, AndroidPDACommand", Android_PDA_CScan_Stop_Command);

var DialPhone_Command = (function (_super) {
    __extends(DialPhone_Command, _super);
    function DialPhone_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    DialPhone_Command.prototype.execute = function () {

        var param = this.CommandParam;
        var phone = this.evaluateFormula(param.PhoneNumber);

        phone = phone + "";

        if (window.app && window.app.dial) {
            window.app.dial(phone);
            console.log("拨打电话：" + phone);
        } else {
            HAC_CallFunctionOutOfHAC();
        }

    };

    return DialPhone_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.DialPhone, AndroidPDACommand", DialPhone_Command);

var Set_ActionBar_Color_Command = (function (_super) {
    __extends(Set_ActionBar_Color_Command, _super);
    function Set_ActionBar_Color_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Set_ActionBar_Color_Command.prototype.execute = function () {

        var param = this.CommandParam;
        var colorS = this.evaluateFormula(param.ColorString);

        if (window.app) {
            window.app.setActionBarColor(colorS);
            console.log("标题栏颜色设置完成：" + colorS);
        } else {
            HAC_CallFunctionOutOfHAC();
        }

    };

    return Set_ActionBar_Color_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.Set_ActionBar_Color, AndroidPDACommand", Set_ActionBar_Color_Command);

var Get_ActionBar_Color_Command = (function (_super) {
    __extends(Get_ActionBar_Color_Command, _super);
    function Get_ActionBar_Color_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Get_ActionBar_Color_Command.prototype.execute = function () {

        var param = this.CommandParam;
        var targetCellFormulaV = param.TargetCell;
        var cellInfoV = HAC_GenerateCellInfo(this, targetCellFormulaV);
        if (window.app) {
            window.app.getActionBarColor(cellInfoV);

            console.log("从App获取状态栏颜色");

        } else {
            HAC_CallFunctionOutOfHAC();
        }

    };

    return Get_ActionBar_Color_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.Get_ActionBar_Color, AndroidPDACommand", Get_ActionBar_Color_Command);

var Get_ActionBar_Color2_Command = (function (_super) {
    __extends(Get_ActionBar_Color2_Command, _super);
    function Get_ActionBar_Color2_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Get_ActionBar_Color2_Command.prototype.execute = function () {

        var params = this.CommandParam;
        var pName = params.OutParamaterName;

        if (window.app && window.app.getActionBarColor2) {
            var color = window.app.getActionBarColor2();

            HAC_ReturnToParam(pName, color);

        } else {
            HAC_CallFunctionOutOfHAC();
        }

    };

    return Get_ActionBar_Color2_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.Get_ActionBar_Color2, AndroidPDACommand", Get_ActionBar_Color2_Command);

var Get_Location_Command = (function (_super) {
    __extends(Get_Location_Command, _super);
    function Get_Location_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Get_Location_Command.prototype.execute = function () {

        var param = this.CommandParam;
        var cs = this.evaluateFormula(param.CoordinateSystem);
        var mode = "wgs84";
        switch (cs) {
            case SupportedType.BD09:
                { mode = "bd09"; break; }
            case SupportedType.GCJ02:
                { mode = "gcj02"; break; }
        }

        var latCellFormulaV = param.LatCell;
        var latCell = HAC_GenerateCellInfo(this, latCellFormulaV);

        var lonCellFormulaV = param.LonCell;
        var lonCell = HAC_GenerateCellInfo(this, lonCellFormulaV);

        var errCellFormulaV = param.ErrCell;
        var errCell = HAC_GenerateCellInfo(this, errCellFormulaV);

        if (window.geo) {
            window.geo.getLocation(mode, latCell, lonCell, errCell);

            console.log("获取地理位置");

        } else {
            HAC_CallFunctionOutOfHAC();
        }

    };

    var SupportedType = {
        WGS84: 0,
        GCJ02: 1,
        BD09: 3
    }

    return Get_Location_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.Get_Location, AndroidPDACommand", Get_Location_Command);

var Get_Location_Async_Command = (function (_super) {
    __extends(Get_Location_Async_Command, _super);
    function Get_Location_Async_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Get_Location_Async_Command.prototype.execute = function () {

        var param = this.CommandParam;
        var cs = this.evaluateFormula(param.CoordinateSystem);
        var mode = "wgs84";
        switch (cs) {
            case SupportedType.BD09:
                { mode = "bd09"; break; }
            case SupportedType.GCJ02:
                { mode = "gcj02"; break; }
        }

        var me = this;

        var ticket = HAC_GenerateCallbackTicket(me, function (payload, payload2) {
            me.CommandExecutor.excuteCommand(me.CommandParam.CommandList, {
                runTimePageName: me.CommandExecutingInfo.runTimePageName,
                commandID: new Date().valueOf().toString(),
                initParams: {
                    "Latitude": payload,
                    "Longitude": payload2,
                    "IsSuccess": true,
                    "Error": ""
                },
                locationString: "执行window.geo.getLocationAsync的回调"
            });
        });

        if (window.geo && window.geo.getLocationAsync) {
            window.geo.getLocationAsync(mode, ticket);

        } else {
            HAC_CallFunctionOutOfHAC();
        }

    };

    var SupportedType = {
        WGS84: 0,
        GCJ02: 1,
        BD09: 3
    }

    return Get_Location_Async_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.Get_Location_Async, AndroidPDACommand", Get_Location_Async_Command);

var Set_ActionBar_Style_Command = (function (_super) {
    __extends(Set_ActionBar_Style_Command, _super);
    function Set_ActionBar_Style_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Set_ActionBar_Style_Command.prototype.execute = function () {

        var param = this.CommandParam;
        var ssa = this.evaluateFormula(param.ShouldShowActionBar);
        var ac = this.evaluateFormula(param.ActionBarColor);
        var sss = this.evaluateFormula(param.ShouldShowSettings);
        var urla = this.evaluateFormula(param.AboutUrl);
        var urlh = this.evaluateFormula(param.HelpUrl);

        if (window.app) {

            window.app.toggleActionBar(ssa);
            console.log("配置ActionBar可见性：" + ssa);

            window.app.setActionBarColor(ac);
            console.log("配置ActionBar颜色：" + ac);

            window.app.toggleSettingMenu(sss);
            console.log("配置【设置】菜单可见性：" + sss);

            window.app.setHelpUrl(urlh);
            console.log("配置【帮助】菜单：" + urlh);

            window.app.setAboutUrl(urla);
            console.log("配置【关于】菜单：" + urla);

            window.app.restartApp();

        } else {
            HAC_CallFunctionOutOfHAC();
        }

    };

    return Set_ActionBar_Style_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.Set_ActionBar_Style, AndroidPDACommand", Set_ActionBar_Style_Command);

var Set_Scanner_Options_Command = (function (_super) {
    __extends(Set_Scanner_Options_Command, _super);
    function Set_Scanner_Options_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Set_Scanner_Options_Command.prototype.execute = function () {

        var param = this.CommandParam;
        var action = this.evaluateFormula(param.Action); // com.android.server.scan
        var extra = this.evaluateFormula(param.Extra); // scannerdata

        if (window.app) {
            window.app.setScannerOptions(action, extra);
            console.log("配置扫描头Action：" + action + " ，Extra：" + extra);

        } else {
            HAC_CallFunctionOutOfHAC();
        }

    };

    return Set_Scanner_Options_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.Set_Scanner_Options, AndroidPDACommand", Set_Scanner_Options_Command);

var Set_Option_Menu_Command = (function (_super) {
    __extends(Set_Option_Menu_Command, _super);
    function Set_Option_Menu_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Set_Option_Menu_Command.prototype.execute = function () {

        var param = this.CommandParam;

        var sss = this.evaluateFormula(param.ShouldShowSettings);
        var urla = this.evaluateFormula(param.AboutUrl);
        var urlh = this.evaluateFormula(param.HelpUrl);

        if (window.app) {

            window.app.toggleSettingMenu(sss);
            console.log("配置【设置】菜单可见性：" + sss);

            window.app.setHelpUrl(urlh);
            console.log("配置【帮助】菜单：" + urlh);

            window.app.setAboutUrl(urla);
            console.log("配置【关于】菜单：" + urla);

            window.app.restartApp();

        } else {
            HAC_CallFunctionOutOfHAC();
        }

    };

    return Set_Option_Menu_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.Set_Option_Menu, AndroidPDACommand", Set_Option_Menu_Command);

var Open_Builtin_Activity_Command = (function (_super) {
    __extends(Open_Builtin_Activity_Command, _super);
    function Open_Builtin_Activity_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Open_Builtin_Activity_Command.prototype.execute = function () {

        var param = this.CommandParam;

        if (window.app) {

            switch (param.TargetPage) {
                case BuiltinPage.配置:
                    {
                        window.app.openSettingPage();
                        console.log("打开配置页面");
                        break;
                    } case BuiltinPage.快速设置: {
                        window.app.openQuickConfigPage();
                        console.log("打开快速初始化页面");
                        break;
                    }
            }

        } else {
            HAC_CallFunctionOutOfHAC();
        }

    };

    var BuiltinPage = {
        配置: 0,
        快速设置: 1
    }

    return Open_Builtin_Activity_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.Open_Builtin_Activity, AndroidPDACommand", Open_Builtin_Activity_Command);

var CloseApp_Command = (function (_super) {
    __extends(CloseApp_Command, _super);
    function CloseApp_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    CloseApp_Command.prototype.execute = function () {

        var param = this.CommandParam;

        if (window.app && window.app.closeApp) {
            window.app.closeApp();
        } else {
            HAC_CallFunctionOutOfHAC();
        }

    };

    return CloseApp_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.CloseApp, AndroidPDACommand", CloseApp_Command);

var PDFPreview_Command = (function (_super) {
    __extends(PDFPreview_Command, _super);
    function PDFPreview_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    PDFPreview_Command.prototype.execute = function () {

        var param = this.CommandParam;
        var url = this.evaluateFormula(param.Url);
        var name = this.evaluateFormula(param.FileName);
        var pwd = this.evaluateFormula(param.Password);

        if (window.pdf) {
            window.pdf.preview(url, name, pwd);
        } else {
            HAC_CallFunctionOutOfHAC();
        }

    };

    return PDFPreview_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.PDFPreview, AndroidPDACommand", PDFPreview_Command);

var Upsert_LocalKv_Command = (function (_super) {
    __extends(Upsert_LocalKv_Command, _super);
    function Upsert_LocalKv_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Upsert_LocalKv_Command.prototype.execute = function () {

        var param = this.CommandParam;
        var key = this.evaluateFormula(param.KeyString);
        var value = this.evaluateFormula(param.ValueString);

        if (window.localKv) {
            window.localKv.upsert(key, value);
        } else {
            HAC_CallFunctionOutOfHAC();
        }

    };

    return Upsert_LocalKv_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.Upsert_LocalKv, AndroidPDACommand", Upsert_LocalKv_Command);

var Retrieve_LocalKv_Command = (function (_super) {
    __extends(Retrieve_LocalKv_Command, _super);
    function Retrieve_LocalKv_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Retrieve_LocalKv_Command.prototype.execute = function () {

        var param = this.CommandParam;
        var key = this.evaluateFormula(param.KeyString);
        var targetCellFormulaV = param.TargetCell;
        var cellInfoV = HAC_GenerateCellInfo(this, targetCellFormulaV);

        if (window.localKv) {
            window.localKv.retrieve(key, cellInfoV);
        } else {
            HAC_CallFunctionOutOfHAC();
        }

    };

    return Retrieve_LocalKv_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.Retrieve_LocalKv, AndroidPDACommand", Retrieve_LocalKv_Command);

var Retrieve_LocalKv_Command2 = (function (_super) {
    __extends(Retrieve_LocalKv_Command2, _super);
    function Retrieve_LocalKv_Command2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Retrieve_LocalKv_Command2.prototype.execute = function () {

        var param = this.CommandParam;
        var key = this.evaluateFormula(param.KeyString);
        var pName = param.OutParamaterName;

        if (window.localKv && window.localKv.retrieve2) {
            var value = window.localKv.retrieve2(key);
            HAC_ReturnToParam(pName, value);
        } else {
            HAC_CallFunctionOutOfHAC();
        }

    };

    return Retrieve_LocalKv_Command2;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.Retrieve_LocalKv2, AndroidPDACommand", Retrieve_LocalKv_Command2);

var Reset_LocalKv_Command = (function (_super) {
    __extends(Reset_LocalKv_Command, _super);
    function Reset_LocalKv_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Reset_LocalKv_Command.prototype.execute = function () {

        var param = this.CommandParam;
        var key = this.evaluateFormula(param.KeyString);

        if (window.localKv) {
            window.localKv.remove(key);
        } else {
            HAC_CallFunctionOutOfHAC();
        }

    };

    return Reset_LocalKv_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.Reset_LocalKv, AndroidPDACommand", Reset_LocalKv_Command);

var OpenDothanPrinter_Command = (function (_super) {
    __extends(OpenDothanPrinter_Command, _super);
    function OpenDothanPrinter_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    OpenDothanPrinter_Command.prototype.execute = function () {
        var params = this.CommandParam;
        var Operation = params.Operation;
        var pName = this.evaluateFormula(params.PrinterName);
        var OutParamaterName = params.OutParamaterName;

        var api = new LPAPI();

        switch (Operation) {
            case SupportedOperations.GetPrinterState: {

                if (window.dothanPrinter) {
                    var status = window.dothanPrinter.getStatus();
                    HAC_ReturnToParam(OutParamaterName, status);
                } else {
                    HAC_CallFunctionOutOfHAC();
                    HAC_ReturnToParam(OutParamaterName, false);
                }

                break;
            }
            case SupportedOperations.GetAllPrinters: {
                var printers = api.getAllPrinters();

                var array = printers.split(',');

                HAC_ReturnToParam(OutParamaterName, array);
                break;
            }
            case SupportedOperations.OpenPrinter: {
                var result = api.openPrinterSync(pName);
                console.log("[DothanPrinter] Connection to the printer openned and ready for use");
                HAC_ReturnToParam(OutParamaterName, result);
                break;
            }
            case SupportedOperations.ReopenPrinter: {
                var result = api.reopenPrinterSync();
                console.log("[DothanPrinter] Connection to the printer reopenned");
                HAC_ReturnToParam(OutParamaterName, result);
                break;
            }
            case SupportedOperations.ClosePrinter: {
                var result = api.closePrinter();
                console.log("[DothanPrinter] Connection to the printer closed");
                break;
            }
            case SupportedOperations.Cancel: {
                api.cancel();
                break;
            }
        }

    };

    var SupportedOperations = {
        GetPrinterState: 0,
        OpenPrinter: 1,
        ReopenPrinter: 2,
        GetAllPrinters: 3,
        Cancel: 4,
        ClosePrinter: 5
    }

    return OpenDothanPrinter_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.DothanPrinter_Device, AndroidPDACommand", OpenDothanPrinter_Command);

var JobDothanPrinter_Command = (function (_super) {
    __extends(JobDothanPrinter_Command, _super);
    function JobDothanPrinter_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    JobDothanPrinter_Command.prototype.execute = function () {
        var params = this.CommandParam;
        var Operation = params.Operation;
        var Width = parseFloat(this.evaluateFormula(params.Width));
        var Height = parseFloat(this.evaluateFormula(params.Height));
        var Orientation = this.evaluateFormula(params.Orientation);
        var OutParamaterName = params.OutParamaterName;

        var api = new LPAPI();

        switch (Operation) {
            case SupportedOperations.StartJob: {

                HAC_DothanPrinterOp(function (s, c) {
                    if (s) {
                        var result = api.startJob(Width, Height, Orientation);
                        console.log("[DothanPrinter] Job started");
                        HAC_ReturnToParam(OutParamaterName, result);
                    } else {
                        console.log("[DothanPrinter] The primary printer is not ready. The status is: " + c);
                        HAC_ReturnToParam(OutParamaterName, false);
                    }
                });

                break;
            }
            case SupportedOperations.CommitJob: {

                HAC_DothanPrinterOp(function (s, c) {
                    if (s) {
                        var result = api.commitJob();
                        console.log("[DothanPrinter] Job committed, ready for printing");
                        HAC_ReturnToParam(OutParamaterName, result);
                    } else {
                        console.log("[DothanPrinter] The primary printer is not ready. The status is: " + c);
                        HAC_ReturnToParam(OutParamaterName, false);
                    }
                });

                break;
            }
            case SupportedOperations.AbortJob: {

                HAC_DothanPrinterOp(function (s, c) {
                    if (s) {
                        var result = api.abortJob();

                        console.log("[DothanPrinter] Job aborted");

                        HAC_ReturnToParam(OutParamaterName, result);
                    } else {
                        console.log("[DothanPrinter] The primary printer is not ready. The status is: " + c);
                        HAC_ReturnToParam(OutParamaterName, false);
                    }
                });

                break;
            }
        }
    };

    var SupportedOperations = {
        StartJob: 0,
        CommitJob: 1,
        AbortJob: 2
    }

    return JobDothanPrinter_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.DothanPrinter_Job, AndroidPDACommand", JobDothanPrinter_Command);

var DothanPrinter_DrawContent_Command = (function (_super) {
    __extends(DothanPrinter_DrawContent_Command, _super);
    function DothanPrinter_DrawContent_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    DothanPrinter_DrawContent_Command.prototype.execute = function () {
        var params = this.CommandParam;
        var Operation = params.Operation;
        var Text = this.evaluateFormula(params.Text);
        var X = parseFloat(this.evaluateFormula(params.X));
        var Y = parseFloat(this.evaluateFormula(params.Y));
        var FontHeight = parseFloat(this.evaluateFormula(params.FontHeight));

        var FontStyle = this.evaluateFormula(params.FontStyle);
        var HorizonAlignment = params.HorizonAlignment;
        var VerticalAlignment = params.VerticalAlignment;

        var BarcodeType = params.BarcodeType;
        var W = parseFloat(this.evaluateFormula(params.Width));
        var H = parseFloat(this.evaluateFormula(params.Height));

        var Orientation = params.Orientation;
        var OutParamaterName = params.OutParamaterName;

        var api = new LPAPI();

        switch (Operation) {
            case SupportedOperations.Text: {

                HAC_DothanPrinterOp(function (s, c) {
                    if (s) {
                        api.setItemOrientation(Orientation);
                        api.setItemHorizontalAlignment(HorizonAlignment);
                        api.setItemVerticalAlignment(VerticalAlignment);

                        var result = api.drawText(Text, X, Y, 0, 0, FontHeight, FontStyle);

                        console.log("[DothanPrinter] Draw text: " + Text);

                        HAC_ReturnToParam(OutParamaterName, result);
                    } else {
                        console.log("[DothanPrinter] The primary printer is not ready. The status is: " + c);
                        HAC_ReturnToParam(OutParamaterName, false);
                    }
                });

                break;
            }
            case SupportedOperations.Barcode: {
                HAC_DothanPrinterOp(function (s, c) {
                    if (s) {
                        api.setItemOrientation(Orientation);
                        api.setItemHorizontalAlignment(3);
                        api.setItemVerticalAlignment(3);

                        var result = api.draw1DBarcode(Text, BarcodeType, X, Y, W, H, FontHeight);

                        console.log("[DothanPrinter] Draw Barcode: " + Text);

                        HAC_ReturnToParam(OutParamaterName, result);
                    } else {
                        console.log("[DothanPrinter] The primary printer is not ready. The status is: " + c);
                        HAC_ReturnToParam(OutParamaterName, false);
                    }
                });

                break;
            }
            case SupportedOperations.QRCode: {
                HAC_DothanPrinterOp(function (s, c) {
                    if (s) {
                        api.setItemOrientation(Orientation);

                        var result = api.draw2DQRCode(Text, X, Y, W);

                        console.log("[DothanPrinter] Draw QRCode: " + Text);

                        HAC_ReturnToParam(OutParamaterName, result);
                    } else {
                        console.log("[DothanPrinter] The primary printer is not ready. The status is: " + c);
                        HAC_ReturnToParam(OutParamaterName, false);
                    }
                });

                break;
            }
            case SupportedOperations.Pdf417: {
                HAC_DothanPrinterOp(function (s, c) {
                    if (s) {
                        api.setItemOrientation(Orientation);

                        var result = api.draw2DPdf417(Text, X, Y, W, H);

                        console.log("[DothanPrinter] Draw Pdf417: " + Text);

                        HAC_ReturnToParam(OutParamaterName, result);
                    } else {
                        console.log("[DothanPrinter] The primary printer is not ready. The status is: " + c);
                        HAC_ReturnToParam(OutParamaterName, false);
                    }
                });

                break;
            }
        }
    };

    var SupportedOperations = {
        Text: 0,
        Barcode: 1,
        QRCode: 2,
        Pdf417: 3
    }

    return DothanPrinter_DrawContent_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.DothanPrinter_DrawContent, AndroidPDACommand", DothanPrinter_DrawContent_Command);

var DothanPrinter_DrawShape_Command = (function (_super) {
    __extends(DothanPrinter_DrawShape_Command, _super);
    function DothanPrinter_DrawShape_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    DothanPrinter_DrawShape_Command.prototype.execute = function () {
        var params = this.CommandParam;
        var Operation = params.Operation;
        var X = parseFloat(this.evaluateFormula(params.X));
        var Y = parseFloat(this.evaluateFormula(params.Y));
        var X2 = parseFloat(this.evaluateFormula(params.X2));
        var Y2 = parseFloat(this.evaluateFormula(params.Y2));
        var LineWidth = parseFloat(this.evaluateFormula(params.LineWidth));
        var CornerWidth = parseFloat(this.evaluateFormula(params.CornerWidth));

        var LineType = params.LineType;
        var W = parseFloat(this.evaluateFormula(params.Width));
        var H = parseFloat(this.evaluateFormula(params.Height));

        var Orientation = params.Orientation;
        var OutParamaterName = params.OutParamaterName;

        var api = new LPAPI();

        switch (Operation) {
            case SupportedOperations.DrawLine: {

                HAC_DothanPrinterOp(function (s, c) {
                    if (s) {

                        var result;

                        switch (LineType) {
                            case SupportedLineType.Solid: {

                                result = api.drawLine(X, Y, X2, Y2, LineWidth);
                                break;
                            }
                            case SupportedLineType.Dot: {

                                // . . . .
                                result = api.drawDashLine2(X, Y, X2, Y2, LineWidth, LineWidth, LineWidth * 2);
                                break;
                            }
                            case SupportedLineType.Dash: {

                                // - - - -
                                result = api.drawDashLine2(X, Y, X2, Y2, LineWidth, LineWidth * 10, LineWidth * 10);
                                break;
                            }
                        }

                        console.log("[DothanPrinter] Draw line");

                        HAC_ReturnToParam(OutParamaterName, result);
                    } else {
                        console.log("[DothanPrinter] The primary printer is not ready. The status is: " + c);
                        HAC_ReturnToParam(OutParamaterName, false);
                    }
                });

                break;
            }
            case SupportedOperations.DrawRectangle: {
                HAC_DothanPrinterOp(function (s, c) {
                    if (s) {

                        var result = api.drawRectangle(X, Y, W, H, LineWidth);

                        console.log("[DothanPrinter] Draw Rectangle");

                        HAC_ReturnToParam(OutParamaterName, result);
                    } else {
                        console.log("[DothanPrinter] The primary printer is not ready. The status is: " + c);
                        HAC_ReturnToParam(OutParamaterName, false);
                    }
                });

                break;
            }
            case SupportedOperations.FillRectangle: {
                HAC_DothanPrinterOp(function (s, c) {
                    if (s) {

                        var result = api.fillRectangle(X, Y, W, H);

                        console.log("[DothanPrinter] Fill Rectangle");

                        HAC_ReturnToParam(OutParamaterName, result);
                    } else {
                        console.log("[DothanPrinter] The primary printer is not ready. The status is: " + c);
                        HAC_ReturnToParam(OutParamaterName, false);
                    }
                });

                break;
            }
            case SupportedOperations.DrawRoundRectangle: {
                HAC_DothanPrinterOp(function (s, c) {
                    if (s) {

                        var result = api.drawRoundRectangle(X, Y, W, H, CornerWidth, CornerWidth, LineWidth);

                        console.log("[DothanPrinter] Draw Round Rectangle");

                        HAC_ReturnToParam(OutParamaterName, result);
                    } else {
                        console.log("[DothanPrinter] The primary printer is not ready. The status is: " + c);
                        HAC_ReturnToParam(OutParamaterName, false);
                    }
                });

                break;
            }
            case SupportedOperations.FillRoundRectangle: {
                HAC_DothanPrinterOp(function (s, c) {
                    if (s) {

                        var result = api.fillRoundRectangle(X, Y, W, H, CornerWidth, CornerWidth);

                        console.log("[DothanPrinter] Fill Round Rectangle");

                        HAC_ReturnToParam(OutParamaterName, result);
                    } else {
                        console.log("[DothanPrinter] The primary printer is not ready. The status is: " + c);
                        HAC_ReturnToParam(OutParamaterName, false);
                    }
                });

                break;
            }
            case SupportedOperations.DrawEllipse: {
                HAC_DothanPrinterOp(function (s, c) {
                    if (s) {

                        var result = api.drawEllipse(X, Y, W, H, LineWidth);

                        console.log("[DothanPrinter] Draw Ellipse");

                        HAC_ReturnToParam(OutParamaterName, result);
                    } else {
                        console.log("[DothanPrinter] The primary printer is not ready. The status is: " + c);
                        HAC_ReturnToParam(OutParamaterName, false);
                    }
                });

                break;
            }
            case SupportedOperations.FillEllipse: {
                HAC_DothanPrinterOp(function (s, c) {
                    if (s) {

                        var result = api.fillEllipse(X, Y, W, H);

                        console.log("[DothanPrinter] Fill Ellipse");

                        HAC_ReturnToParam(OutParamaterName, result);
                    } else {
                        console.log("[DothanPrinter] The primary printer is not ready. The status is: " + c);
                        HAC_ReturnToParam(OutParamaterName, false);
                    }
                });

                break;
            }
        }
    };

    var SupportedOperations = {
        DrawLine: 0,
        DrawRectangle: 1,
        FillRectangle: 2,
        DrawRoundRectangle: 3,
        FillRoundRectangle: 4,
        DrawEllipse: 5,
        FillEllipse: 6
    };

    var SupportedLineType = {
        Solid: 0,
        Dot: 1,
        Dash: 2
    };

    return DothanPrinter_DrawShape_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.DothanPrinter_DrawShape, AndroidPDACommand", DothanPrinter_DrawShape_Command);

var NfcReader_Command = (function (_super) {
    __extends(NfcReader_Command, _super);
    function NfcReader_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    NfcReader_Command.prototype.execute = function () {
        var params = this.CommandParam;

        var TagCell = HAC_GenerateCellInfo(this, params.TagCell);

        if (window.nfc) {
            window.nfc.readTagId(TagCell);
        } else {
            HAC_CallFunctionOutOfHAC();
        }
    };

    return NfcReader_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.NfcReader, AndroidPDACommand", NfcReader_Command);

var NfcReader_Async_Command = (function (_super) {
    __extends(NfcReader_Async_Command, _super);
    function NfcReader_Async_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    NfcReader_Async_Command.prototype.execute = function () {

        var me = this;

        var ticket = HAC_GenerateCallbackTicket(me, function (payload, payload2) {
            me.CommandExecutor.excuteCommand(me.CommandParam.CommandList, {
                runTimePageName: me.CommandExecutingInfo.runTimePageName,
                commandID: new Date().valueOf().toString(),
                initParams: {
                    "NFC_Tag": payload,
                    "IsSuccess": true,
                    "Error": ""
                },
                locationString: "执行window.nfc.readTagIdAsync的回调"
            });
        });

        if (window.nfc && window.nfc.readTagIdAsync) {
            window.nfc.readTagIdAsync(ticket);
        } else {
            HAC_CallFunctionOutOfHAC();
        }
    };

    return NfcReader_Async_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.NfcReader_Async, AndroidPDACommand", NfcReader_Async_Command);

var JPush_Info_Command = (function (_super) {
    __extends(JPush_Info_Command, _super);
    function JPush_Info_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    JPush_Info_Command.prototype.execute = function () {
        var params = this.CommandParam;
        var pName = params.OutParamaterName;

        if (window.jpush) {
            var value = window.jpush.getRegistrationID();

            HAC_ReturnToParam(pName, value);
        } else {
            HAC_CallFunctionOutOfHAC();
            HAC_ReturnToParam(pName, "");
        }
    };

    return JPush_Info_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.JPush_Info, AndroidPDACommand", JPush_Info_Command);

var Device_Info_Command = (function (_super) {
    __extends(Device_Info_Command, _super);
    function Device_Info_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Device_Info_Command.prototype.execute = function () {
        var params = this.CommandParam;
        var pName = params.OutParamaterName;

        if (window.device) {
            var value = window.device.getSecureId();

            HAC_ReturnToParam(pName, value);
        } else {
            HAC_CallFunctionOutOfHAC();
            HAC_ReturnToParam(pName, "");
        }
    };

    return Device_Info_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.Device_Info, AndroidPDACommand", Device_Info_Command);

var BLE_Scan_Command = (function (_super) {
    __extends(BLE_Scan_Command, _super);
    function BLE_Scan_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    BLE_Scan_Command.prototype.execute = function () {
        var params = this.CommandParam;

        var TargetCell = HAC_GenerateCellInfo(this, params.TargetCell);
        var ErrorCell = HAC_GenerateCellInfo(this, params.ErrorCell);

        if (window.ble) {
            window.ble.scan(TargetCell, ErrorCell);
        } else {
            HAC_CallFunctionOutOfHAC();
        }
    };

    return BLE_Scan_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.BLE_Scan, AndroidPDACommand", BLE_Scan_Command);

var BLE_Scan_Async_Command = (function (_super) {
    __extends(BLE_Scan_Async_Command, _super);
    function BLE_Scan_Async_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    BLE_Scan_Async_Command.prototype.execute = function () {

        var me = this;
        var ticket = HAC_GenerateCallbackTicket(me, function (payload, payload2) {
            me.CommandExecutor.excuteCommand(me.CommandParam.CommandList, {
                runTimePageName: me.CommandExecutingInfo.runTimePageName,
                commandID: new Date().valueOf().toString(),
                initParams: {
                    "Device_List": payload,
                    "IsSuccess": true,
                    "Error": ""
                },
                locationString: "执行window.ble.scanAsync的回调"
            });
        });

        if (window.ble && window.ble.scanAsync) {
            window.ble.scanAsync(ticket);
        } else {
            HAC_CallFunctionOutOfHAC();
        }
    };

    return BLE_Scan_Async_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.BLE_Scan_Async, AndroidPDACommand", BLE_Scan_Async_Command);

var BLE_Read_Command = (function (_super) {
    __extends(BLE_Read_Command, _super);
    function BLE_Read_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    BLE_Read_Command.prototype.execute = function () {
        var params = this.CommandParam;
        var MAC = this.evaluateFormula(params.MacAddress);
        var Service = this.evaluateFormula(params.ServiceUUID);
        var Character = this.evaluateFormula(params.CharacteristicUUID);

        var TargetCell = HAC_GenerateCellInfo(this, params.TargetCell);
        var TargetRawCell = HAC_GenerateCellInfo(this, params.TargetRawCell);
        var ErrorCell = HAC_GenerateCellInfo(this, params.ErrorCell);

        if (window.ble) {
            window.ble.read(MAC, Service, Character, TargetCell, TargetRawCell, ErrorCell);
        } else {
            HAC_CallFunctionOutOfHAC();
        }
    };

    var SupportedReadMode = {
        Read: 0,
        Notify: 1,
        Indicate: 2
    }

    return BLE_Read_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.BLE_Read, AndroidPDACommand", BLE_Read_Command);

var BLE_Read_Async_Command = (function (_super) {
    __extends(BLE_Read_Async_Command, _super);
    function BLE_Read_Async_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    BLE_Read_Async_Command.prototype.execute = function () {
        var params = this.CommandParam;
        var MAC = this.evaluateFormula(params.MacAddress);
        var Service = this.evaluateFormula(params.ServiceUUID);
        var Character = this.evaluateFormula(params.CharacteristicUUID);

        var me = this;
        var ticket = HAC_GenerateCallbackTicket(me, function (payload, payload2) {
            me.CommandExecutor.excuteCommand(me.CommandParam.CommandList, {
                runTimePageName: me.CommandExecutingInfo.runTimePageName,
                commandID: new Date().valueOf().toString(),
                initParams: {
                    "Data_In_BASE64": payload,
                    "Data_In_ByteArray": payload2,
                    "IsSuccess": true,
                    "Error": ""
                },
                locationString: "执行window.ble.readAsync的回调"
            });
        });

        if (window.ble && window.ble.readAsync) {
            window.ble.readAsync(MAC, Service, Character, ticket);
        } else {
            HAC_CallFunctionOutOfHAC();
        }
    };

    var SupportedReadMode = {
        Read: 0,
        Notify: 1,
        Indicate: 2
    }

    return BLE_Read_Async_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.BLE_Read_Async, AndroidPDACommand", BLE_Read_Async_Command);

var BLE_Register_Command = (function (_super) {
    __extends(BLE_Register_Command, _super);
    function BLE_Register_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    BLE_Register_Command.prototype.execute = function () {
        var params = this.CommandParam;
        var MAC = this.evaluateFormula(params.MacAddress);
        var Service = this.evaluateFormula(params.ServiceUUID);
        var Character = this.evaluateFormula(params.CharacteristicUUID);

        var Mode = params.Mode;

        var TargetCell = HAC_GenerateCellInfo(this, params.TargetCell);
        var TargetRawCell = HAC_GenerateCellInfo(this, params.TargetRawCell);
        var ErrorCell = HAC_GenerateCellInfo(this, params.ErrorCell);

        if (window.ble) {
            switch (Mode) {
                case SupportedReadMode.Notify: {
                    window.ble.notify(MAC, Service, Character, TargetCell, TargetRawCell, ErrorCell);
                    break;
                }
                case SupportedReadMode.Indicate: {
                    window.ble.indicate(MAC, Service, Character, TargetCell, TargetRawCell, ErrorCell);
                    break;
                }
            }

        } else {
            HAC_CallFunctionOutOfHAC();
        }
    };

    var SupportedReadMode = {
        Notify: 0,
        Indicate: 1
    }

    return BLE_Register_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.BLE_Register, AndroidPDACommand", BLE_Register_Command);

var BLE_Register_Async_Command = (function (_super) {
    __extends(BLE_Register_Async_Command, _super);
    function BLE_Register_Async_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    BLE_Register_Async_Command.prototype.execute = function () {
        var params = this.CommandParam;
        var MAC = this.evaluateFormula(params.MacAddress);
        var Service = this.evaluateFormula(params.ServiceUUID);
        var Character = this.evaluateFormula(params.CharacteristicUUID);
        var Mode = params.Mode;

        var me = this;

        var ticket = HAC_GenerateCallbackTicket(me, function (payload, payload2) {
            me.CommandExecutor.excuteCommand(me.CommandParam.CommandList, {
                runTimePageName: me.CommandExecutingInfo.runTimePageName,
                commandID: new Date().valueOf().toString(),
                initParams: {
                    "Data_In_BASE64": payload,
                    "Data_In_ByteArray": payload2,
                    "IsSuccess": true,
                    "Error": ""
                },
                locationString: "执行window.ble.notifyAsync/indicateAsync的回调"
            });
        });

        if (window.ble && window.ble.notifyAsync && window.ble.indicateAsync) {
            switch (Mode) {
                case SupportedReadMode.Notify: {
                    window.ble.notifyAsync(MAC, Service, Character, ticket);
                    break;
                }
                case SupportedReadMode.Indicate: {
                    window.ble.indicateAsync(MAC, Service, Character, ticket);
                    break;
                }
            }

        } else {
            HAC_CallFunctionOutOfHAC();
        }
    };

    var SupportedReadMode = {
        Notify: 0,
        Indicate: 1
    }

    return BLE_Register_Async_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.BLE_Register_Async, AndroidPDACommand", BLE_Register_Async_Command);

var BLE_UR_Command = (function (_super) {
    __extends(BLE_UR_Command, _super);
    function BLE_UR_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    BLE_UR_Command.prototype.execute = function () {
        var params = this.CommandParam;
        var MAC = this.evaluateFormula(params.MacAddress);
        var Service = this.evaluateFormula(params.ServiceUUID);
        var Character = this.evaluateFormula(params.CharacteristicUUID);

        var Mode = params.Mode;

        if (window.ble) {
            switch (Mode) {
                case SupportedReadMode.Notify: {
                    window.ble.unregisterNotify(MAC, Service, Character);
                    break;
                }
                case SupportedReadMode.Indicate: {
                    window.ble.unregisterIndicate(MAC, Service, Character);
                    break;
                }
            }

        } else {
            HAC_CallFunctionOutOfHAC();
        }
    };

    var SupportedReadMode = {
        Notify: 0,
        Indicate: 1
    }

    return BLE_UR_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.BLE_Unregister, AndroidPDACommand", BLE_UR_Command);

var BLE_Write_Command = (function (_super) {
    __extends(BLE_Write_Command, _super);
    function BLE_Write_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    BLE_Write_Command.prototype.execute = function () {
        var params = this.CommandParam;
        var MAC = this.evaluateFormula(params.MacAddress);
        var Service = this.evaluateFormula(params.ServiceUUID);
        var Character = this.evaluateFormula(params.CharacteristicUUID);
        var Data = this.evaluateFormula(params.DataCell);

        var ErrorCell = HAC_GenerateCellInfo(this, params.ErrorCell);

        if (window.ble) {
            window.ble.write(MAC, Service, Character, Data, ErrorCell);
        } else {
            HAC_CallFunctionOutOfHAC();
        }
    };

    return BLE_Write_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.BLE_Write, AndroidPDACommand", BLE_Write_Command);

var BLE_Write_Async_Command = (function (_super) {
    __extends(BLE_Write_Async_Command, _super);
    function BLE_Write_Async_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    BLE_Write_Async_Command.prototype.execute = function () {
        var params = this.CommandParam;
        var MAC = this.evaluateFormula(params.MacAddress);
        var Service = this.evaluateFormula(params.ServiceUUID);
        var Character = this.evaluateFormula(params.CharacteristicUUID);
        var Data = this.evaluateFormula(params.DataCell);

        var me = this;

        var ticket = HAC_GenerateCallbackTicket(me, function (payload, payload2) {
            me.CommandExecutor.excuteCommand(me.CommandParam.CommandList, {
                runTimePageName: me.CommandExecutingInfo.runTimePageName,
                commandID: new Date().valueOf().toString(),
                initParams: {
                    "IsSuccess": true,
                    "Error": ""
                },
                locationString: "执行window.ble.writeAsync的回调"
            });
        });

        if (window.ble && window.ble.writeAsync) {
            window.ble.writeAsync(MAC, Service, Character, Data, ticket);
        } else {
            HAC_CallFunctionOutOfHAC();
        }
    };

    return BLE_Write_Async_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.BLE_Write_Async, AndroidPDACommand", BLE_Write_Async_Command);

var Camera_Take_Photo_Command = (function (_super) {
    __extends(Camera_Take_Photo_Command, _super);
    function Camera_Take_Photo_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Camera_Take_Photo_Command.prototype.execute = function () {
        var params = this.CommandParam;
        var isSnapshot = this.evaluateFormula(params.IsSnapshot);
        var TargetCell = HAC_GenerateCellInfo(this, params.TargetCell);

        if (window.camera) {
            window.camera.takePhoto(isSnapshot, TargetCell);
        } else {
            HAC_CallFunctionOutOfHAC();
        }
    };

    return Camera_Take_Photo_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.Camera_Take_Photo, AndroidPDACommand", Camera_Take_Photo_Command);

var Camera_Take_Photo_Async_Command = (function (_super) {
    __extends(Camera_Take_Photo_Async_Command, _super);
    function Camera_Take_Photo_Async_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Camera_Take_Photo_Async_Command.prototype.execute = function () {
        var params = this.CommandParam;
        var isSnapshot = this.evaluateFormula(params.IsSnapshot);
        var me = this;

        var ticket = HAC_GenerateCallbackTicket(me, function (payload, payload2) {
            me.CommandExecutor.excuteCommand(me.CommandParam.CommandList, {
                runTimePageName: me.CommandExecutingInfo.runTimePageName,
                commandID: new Date().valueOf().toString(),
                initParams: {
                    "File_Uri": payload,
                    "IsSuccess": true,
                    "Error": ""
                },
                locationString: "执行window.camera.takePhotoAsync的回调"
            });
        });

        if (window.camera && window.camera.takePhotoAsync) {
            window.camera.takePhotoAsync(isSnapshot, ticket);
        } else {
            HAC_CallFunctionOutOfHAC();
        }
    };

    return Camera_Take_Photo_Async_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.Camera_Take_Photo_Async, AndroidPDACommand", Camera_Take_Photo_Async_Command);

var Audio_Record_Command = (function (_super) {
    __extends(Audio_Record_Command, _super);
    function Audio_Record_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Audio_Record_Command.prototype.execute = function () {
        var params = this.CommandParam;
        var TargetCell = HAC_GenerateCellInfo(this, params.TargetCell);

        if (window.audio && window.audio.record) {
            window.audio.record(TargetCell);
        } else {
            HAC_CallFunctionOutOfHAC();
        }
    };

    return Audio_Record_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.Audio_Record, AndroidPDACommand", Audio_Record_Command);


var Audio_Record_Async_Command = (function (_super) {
    __extends(Audio_Record_Async_Command, _super);
    function Audio_Record_Async_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Audio_Record_Async_Command.prototype.execute = function () {
        var params = this.CommandParam;
        var me = this;

        var ticket = HAC_GenerateCallbackTicket(me, function (payload, payload2) {
            me.CommandExecutor.excuteCommand(me.CommandParam.CommandList, {
                runTimePageName: me.CommandExecutingInfo.runTimePageName,
                commandID: new Date().valueOf().toString(),
                initParams: {
                    "File_Uri": payload,
                    "IsSuccess": true,
                    "Error": ""
                },
                locationString: "执行window.audio.recordAsync的回调"
            });
        });

        if (window.audio && window.audio.recordAsync) {
            window.audio.recordAsync(ticket);
        } else {
            HAC_CallFunctionOutOfHAC();
        }
    };

    return Audio_Record_Async_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.Audio_Record_Async, AndroidPDACommand", Audio_Record_Async_Command);


var Camera_Take_Video_Command = (function (_super) {
    __extends(Camera_Take_Video_Command, _super);
    function Camera_Take_Video_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Camera_Take_Video_Command.prototype.execute = function () {
        var params = this.CommandParam;
        var isSnapshot = this.evaluateFormula(params.IsSnapshot);
        var TargetCell = HAC_GenerateCellInfo(this, params.TargetCell);

        if (window.camera) {
            window.camera.takeVideo(isSnapshot, TargetCell);
        } else {
            HAC_CallFunctionOutOfHAC();
        }
    };

    return Camera_Take_Video_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.Camera_Take_Video, AndroidPDACommand", Camera_Take_Video_Command);

var Camera_Take_Video_Async_Command = (function (_super) {
    __extends(Camera_Take_Video_Async_Command, _super);
    function Camera_Take_Video_Async_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Camera_Take_Video_Async_Command.prototype.execute = function () {
        var params = this.CommandParam;
        var isSnapshot = this.evaluateFormula(params.IsSnapshot);
        var me = this;
        var ticket = HAC_GenerateCallbackTicket(me, function (payload, payload2) {
            me.CommandExecutor.excuteCommand(me.CommandParam.CommandList, {
                runTimePageName: me.CommandExecutingInfo.runTimePageName,
                commandID: new Date().valueOf().toString(),
                initParams: {
                    "File_Uri": payload,
                    "IsSuccess": true,
                    "Error": ""
                },
                locationString: "执行window.camera.takeVideoAsync的回调"
            });
        });

        if (window.camera && window.camera.takeVideoAsync) {
            window.camera.takeVideoAsync(isSnapshot, ticket);
        } else {
            HAC_CallFunctionOutOfHAC();
        }
    };

    return Camera_Take_Video_Async_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.Camera_Take_Video_Async, AndroidPDACommand", Camera_Take_Video_Async_Command);

var File_Load_Base64_Command = (function (_super) {
    __extends(File_Load_Base64_Command, _super);
    function File_Load_Base64_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    File_Load_Base64_Command.prototype.execute = function () {
        var params = this.CommandParam;
        var FileUri = this.evaluateFormula(params.FileUri);
        var pName = params.PName;

        if (window.hac_file) {

            var objUrl;

            if (FileUri && FileUri.length) {
                objUrl = window.hac_file.loadFile(FileUri);
            } else {
                objUrl = window.hac_file.loadLatestFile();
            }

            HAC_ReturnToParam(pName, objUrl);
        } else {
            HAC_CallFunctionOutOfHAC();
        }
    };

    return File_Load_Base64_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.File_Load_Base64, AndroidPDACommand", File_Load_Base64_Command);

var File_Add_Watermark_Command = (function (_super) {
    __extends(File_Add_Watermark_Command, _super);
    function File_Add_Watermark_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    File_Add_Watermark_Command.prototype.execute = function () {
        var params = this.CommandParam;
        var FileUri = this.evaluateFormula(params.FileUri);
        var WMText = this.evaluateFormula(params.WMText);
        var WMColor = this.evaluateFormula(params.WMColor);
        var WMTileMode = params.WMTileMode;

        var TargetCell = HAC_GenerateCellInfo(this, params.TargetCell);

        if (window.hac_file) {
            window.hac_file.drawWatermarkForImage(FileUri, WMText, WMTileMode, WMColor, TargetCell);
        } else {
            HAC_CallFunctionOutOfHAC();
        }
    };

    return File_Add_Watermark_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.File_Add_Watermark, AndroidPDACommand", File_Add_Watermark_Command);

var File_Add_Watermark_Async_Command = (function (_super) {
    __extends(File_Add_Watermark_Async_Command, _super);
    function File_Add_Watermark_Async_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    File_Add_Watermark_Async_Command.prototype.execute = function () {
        var params = this.CommandParam;
        var FileUri = this.evaluateFormula(params.FileUri);
        var WMText = this.evaluateFormula(params.WMText);
        var WMColor = this.evaluateFormula(params.WMColor);
        var WMTileMode = params.WMTileMode;
        var me = this;

        var ticket = HAC_GenerateCallbackTicket(me, function (payload, payload2) {
            me.CommandExecutor.excuteCommand(me.CommandParam.CommandList, {
                runTimePageName: me.CommandExecutingInfo.runTimePageName,
                commandID: new Date().valueOf().toString(),
                initParams: {
                    "File_Uri": payload,
                    "IsSuccess": true,
                    "Error": ""
                },
                locationString: "执行window.hac_file.drawWatermarkForImageAsync的回调"
            });
        });

        if (window.hac_file && window.hac_file.drawWatermarkForImageAsync) {
            window.hac_file.drawWatermarkForImageAsync(FileUri, WMText, WMTileMode, WMColor, ticket);
        } else {
            HAC_CallFunctionOutOfHAC();
        }
    };

    return File_Add_Watermark_Async_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.File_Add_Watermark_Async, AndroidPDACommand", File_Add_Watermark_Async_Command);

var Set_Offline_Mode_Command = (function (_super) {
    __extends(Set_Offline_Mode_Command, _super);
    function Set_Offline_Mode_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Set_Offline_Mode_Command.prototype.execute = function () {
        var params = this.CommandParam;
        var IsOfflineMode = params.IsOfflineMode;

        if (window.app) {
            window.app.toggleOfflineMode(IsOfflineMode);
        } else {
            HAC_CallFunctionOutOfHAC();
        }
    };

    return Set_Offline_Mode_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.Set_Offline_Mode, AndroidPDACommand", Set_Offline_Mode_Command);

var Vibrate_Command = (function (_super) {
    __extends(Vibrate_Command, _super);
    function Vibrate_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Vibrate_Command.prototype.execute = function () {
        var params = this.CommandParam;
        var duration = this.evaluateFormula(params.Duration);

        if (window.app) {
            window.app.vibrate(duration);
        } else {
            HAC_CallFunctionOutOfHAC();
        }
    };

    return Vibrate_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.Vibrate, AndroidPDACommand", Vibrate_Command);

var Play_Ringtone_Command = (function (_super) {
    __extends(Play_Ringtone_Command, _super);
    function Play_Ringtone_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Play_Ringtone_Command.prototype.execute = function () {
        var params = this.CommandParam;
        var type = params.Type;

        if (window.app) {
            switch (type) {
                case SupportedRingtoneType.Alarm: {
                    window.app.playAlarm();
                    break;
                }
                case SupportedRingtoneType.Notification: {
                    window.app.playNotification();
                    break;
                }
                case SupportedRingtoneType.Ringtone: {
                    window.app.playRingtone();
                    break;
                }
            }
        } else {
            HAC_CallFunctionOutOfHAC();
        }
    };

    var SupportedRingtoneType = {
        Notification: 0,
        Alarm: 1,
        Ringtone: 2
    }

    return Play_Ringtone_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.PlayRingtone, AndroidPDACommand", Play_Ringtone_Command);

var ESCPrinter_Scan_Command = (function (_super) {
    __extends(ESCPrinter_Scan_Command, _super);
    function ESCPrinter_Scan_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    ESCPrinter_Scan_Command.prototype.execute = function () {
        var params = this.CommandParam;

        var TargetCell = HAC_GenerateCellInfo(this, params.TargetCell);

        if (window.escBtPrinter) {
            window.escBtPrinter.scan(TargetCell);
        } else {
            HAC_CallFunctionOutOfHAC();
        }
    };

    return ESCPrinter_Scan_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.ESCPrinter_Scan, AndroidPDACommand", ESCPrinter_Scan_Command);

var ESCPrinter_Scan_Async_Command = (function (_super) {
    __extends(ESCPrinter_Scan_Async_Command, _super);
    function ESCPrinter_Scan_Async_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    ESCPrinter_Scan_Async_Command.prototype.execute = function () {
        var me = this;
        var ticket = HAC_GenerateCallbackTicket(me, function (payload, payload2) {
            me.CommandExecutor.excuteCommand(me.CommandParam.CommandList, {
                runTimePageName: me.CommandExecutingInfo.runTimePageName,
                commandID: new Date().valueOf().toString(),
                initParams: {
                    "Printer_List": payload,
                    "IsSuccess": true,
                    "Error": ""
                },
                locationString: "执行window.escBtPrinter.scanAsync的回调"
            });
        });

        if (window.escBtPrinter && window.escBtPrinter.scanAsync) {
            window.escBtPrinter.scanAsync(ticket);
        } else {
            HAC_CallFunctionOutOfHAC();
        }
    };

    return ESCPrinter_Scan_Async_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.ESCPrinter_Scan_Async, AndroidPDACommand", ESCPrinter_Scan_Async_Command);

var ESCPrinter_Print_Command = (function (_super) {
    __extends(ESCPrinter_Print_Command, _super);
    function ESCPrinter_Print_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    ESCPrinter_Print_Command.prototype.execute = function () {
        var params = this.CommandParam;
        var macAddress = this.evaluateFormula(params.macAddress);
        var printerWidthMM = parseFloat(this.evaluateFormula(params.printerWidthMM));
        var printerDpi = parseInt(this.evaluateFormula(params.printerDpi));
        var printerNbrCharactersPerLine = parseInt(this.evaluateFormula(params.printerNbrCharactersPerLine));
        var template = this.evaluateFormula(params.template);

        if (window.escBtPrinter) {
            window.escBtPrinter.print(macAddress, printerDpi, printerWidthMM, printerNbrCharactersPerLine, template);
        } else {
            HAC_CallFunctionOutOfHAC();
        }
    };

    return ESCPrinter_Print_Command;
}(Forguncy.CommandBase));

Forguncy.CommandFactory.registerCommand("AndroidPDACommand.ESCPrinter_Print, AndroidPDACommand", ESCPrinter_Print_Command);