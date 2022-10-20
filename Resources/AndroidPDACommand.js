
var ERROR_NOT_RUN_IN_HAC = "当前APP不支持该命令，这通常是因为APP版本过低。您可以通过在葡萄城技术社区搜索“HAC”下载最新版APP，或访问以下地址获取并编译适配的Android APP。 项目地址： https://gitee.com/GrapeCity/huozige-hac-app ";

var Android_PDA_Broadcast_Mode_Scan_Command = (function (_super) {
    __extends(Android_PDA_Broadcast_Mode_Scan_Command, _super);
    function Android_PDA_Broadcast_Mode_Scan_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Android_PDA_Broadcast_Mode_Scan_Command.prototype.execute = function () {

        // Get setings
        var param = this.CommandParam;
        var targetCellFormula = param.TargetCell;
        var cellLocation = this.getCellLocation(targetCellFormula);
        var cellInfo = JSON.stringify(cellLocation);
        var isModal = this.evaluateFormula(param.IsModalMode);

        if (window.pda) {
            if (!isModal || isModal === 0) {
                window.pda.continuous_scan(cellInfo, 1); // 持续扫描，但仅接收1次
                console.log("启动单次扫描，非模态");
            } else {
                window.pda.modal_scan(cellInfo); // 模态扫描
                console.log("启动单次扫描，模态");
            }

        } else {
            alert(ERROR_NOT_RUN_IN_HAC);
        }

    };

    return Android_PDA_Broadcast_Mode_Scan_Command;
}(Forguncy.CommandBase));

// Key format is "Namespace.ClassName, AssemblyName"
Forguncy.CommandFactory.registerCommand("AndroidPDACommand.Broadcast_Mode_Scan, AndroidPDACommand", Android_PDA_Broadcast_Mode_Scan_Command);


var Android_PDA_App_Info_Command = (function (_super) {
    __extends(Android_PDA_App_Info_Command, _super);
    function Android_PDA_App_Info_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Android_PDA_App_Info_Command.prototype.execute = function () {

        //// Get setings
        var param = this.CommandParam;
        var targetCellFormulaV = param.TargetCellVersion;
        var cellLocationV = this.getCellLocation(targetCellFormulaV);
        var cellInfoV = JSON.stringify(cellLocationV);

        var targetCellFormulaP = param.TargetCellPackage;
        var cellLocationP = this.getCellLocation(targetCellFormulaP);
        var cellInfoP = JSON.stringify(cellLocationP);

        if (window.app) {
            window.app.getVersion(cellInfoV);
            window.app.getPackageName(cellInfoP);

            console.log("从APP获取包名和版本信息");

        } else {
            alert(ERROR_NOT_RUN_IN_HAC);
        }

    };

    return Android_PDA_App_Info_Command;
}(Forguncy.CommandBase));

// Key format is "Namespace.ClassName, AssemblyName"
Forguncy.CommandFactory.registerCommand("AndroidPDACommand.App_Info, AndroidPDACommand", Android_PDA_App_Info_Command);

var Android_PDA_CScan_Start_Command = (function (_super) {
    __extends(Android_PDA_CScan_Start_Command, _super);
    function Android_PDA_CScan_Start_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Android_PDA_CScan_Start_Command.prototype.execute = function () {

        // Get setings
        var param = this.CommandParam;
        var targetCellFormula = param.TargetCell;
        var cellLocation = this.getCellLocation(targetCellFormula);
        var cellInfo = JSON.stringify(cellLocation);

        if (window.pda) {
            window.pda.continuous_scan(cellInfo, 0);
            console.log("启动持续扫描");
        } else {
            alert(ERROR_NOT_RUN_IN_HAC);
        }

    };


    return Android_PDA_CScan_Start_Command;
}(Forguncy.CommandBase));

// Key format is "Namespace.ClassName, AssemblyName"
Forguncy.CommandFactory.registerCommand("AndroidPDACommand.Broadcast_Mode_ContinuousScanStart, AndroidPDACommand", Android_PDA_CScan_Start_Command);

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
            alert(ERROR_NOT_RUN_IN_HAC);
        }

    };

    return Android_PDA_CScan_Stop_Command;
}(Forguncy.CommandBase));

// Key format is "Namespace.ClassName, AssemblyName"
Forguncy.CommandFactory.registerCommand("AndroidPDACommand.Broadcast_Mode_ContinuousScanStop, AndroidPDACommand", Android_PDA_CScan_Stop_Command);


var Set_ActionBar_Color_Command = (function (_super) {
    __extends(Set_ActionBar_Color_Command, _super);
    function Set_ActionBar_Color_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Set_ActionBar_Color_Command.prototype.execute = function () {

        // Get setings
        var param = this.CommandParam;
        var colorS = this.evaluateFormula(param.ColorString);

        if (window.app) {
            window.app.setActionBarColor(colorS);
            console.log("标题栏颜色设置完成：" + colorS);
        } else {
            alert(ERROR_NOT_RUN_IN_HAC);
        }

    };

    return Set_ActionBar_Color_Command;
}(Forguncy.CommandBase));

// Key format is "Namespace.ClassName, AssemblyName"
Forguncy.CommandFactory.registerCommand("AndroidPDACommand.Set_ActionBar_Color, AndroidPDACommand", Set_ActionBar_Color_Command);


var Get_ActionBar_Color_Command = (function (_super) {
    __extends(Get_ActionBar_Color_Command, _super);
    function Get_ActionBar_Color_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Get_ActionBar_Color_Command.prototype.execute = function () {

        //// Get setings
        var param = this.CommandParam;
        var targetCellFormulaV = param.TargetCell;
        var cellLocationV = this.getCellLocation(targetCellFormulaV);
        var cellInfoV = JSON.stringify(cellLocationV);

        if (window.app) {
            window.app.getActionBarColor(cellInfoV);

            console.log("从App获取状态栏颜色");

        } else {
            alert(ERROR_NOT_RUN_IN_HAC);
        }

    };

    return Get_ActionBar_Color_Command;
}(Forguncy.CommandBase));

// Key format is "Namespace.ClassName, AssemblyName"
Forguncy.CommandFactory.registerCommand("AndroidPDACommand.Get_ActionBar_Color, AndroidPDACommand", Get_ActionBar_Color_Command);


var Get_Location_Command = (function (_super) {
    __extends(Get_Location_Command, _super);
    function Get_Location_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Get_Location_Command.prototype.execute = function () {

        //// Get setings
        var param = this.CommandParam;
        var cs = this.evaluateFormula(param.CS);

        var latCellFormulaV = param.LatCell;
        var latCellV = this.getCellLocation(latCellFormulaV);
        var latCell = JSON.stringify(latCellV);

        var lonCellFormulaV = param.LonCell;
        var lonCellV = this.getCellLocation(lonCellFormulaV);
        var lonCell = JSON.stringify(lonCellV);

        var errCellFormulaV = param.ErrCell;
        var errCellV = this.getCellLocation(errCellFormulaV);
        var errCell = JSON.stringify(errCellV);

        if (window.geo) {
            window.geo.getLocation(cs, latCell, lonCell, errCell);

            console.log("获取地理位置");

        } else {
            alert(ERROR_NOT_RUN_IN_HAC);
        }

    };

    return Get_Location_Command;
}(Forguncy.CommandBase));

// Key format is "Namespace.ClassName, AssemblyName"
Forguncy.CommandFactory.registerCommand("AndroidPDACommand.Get_Location, AndroidPDACommand", Get_Location_Command);


var Set_ActionBar_Style_Command = (function (_super) {
    __extends(Set_ActionBar_Style_Command, _super);
    function Set_ActionBar_Style_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Set_ActionBar_Style_Command.prototype.execute = function () {

        //// Get setings
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
            alert(ERROR_NOT_RUN_IN_HAC);
        }

    };

    return Set_ActionBar_Style_Command;
}(Forguncy.CommandBase));

// Key format is "Namespace.ClassName, AssemblyName"
Forguncy.CommandFactory.registerCommand("AndroidPDACommand.Set_ActionBar_Style, AndroidPDACommand", Set_ActionBar_Style_Command);

var Set_Scanner_Options_Command = (function (_super) {
    __extends(Set_Scanner_Options_Command, _super);
    function Set_Scanner_Options_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Set_Scanner_Options_Command.prototype.execute = function () {

        //// Get setings
        var param = this.CommandParam;
        var action = this.evaluateFormula(param.Action); // com.android.server.scan
        var extra = this.evaluateFormula(param.Extra); // scannerdata

        if (window.app) {
            window.app.setScannerOptions(action, extra);
            console.log("配置扫描头Action：" + action + " ，Extra：" + extra);

        } else {
            alert(ERROR_NOT_RUN_IN_HAC);
        }

    };

    return Set_Scanner_Options_Command;
}(Forguncy.CommandBase));

// Key format is "Namespace.ClassName, AssemblyName"
Forguncy.CommandFactory.registerCommand("AndroidPDACommand.Set_Scanner_Options, AndroidPDACommand", Set_Scanner_Options_Command);


var Set_Option_Menu_Command = (function (_super) {
    __extends(Set_Option_Menu_Command, _super);
    function Set_Option_Menu_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Set_Option_Menu_Command.prototype.execute = function () {

        //// Get setings
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
            alert(ERROR_NOT_RUN_IN_HAC);
        }

    };

    return Set_Option_Menu_Command;
}(Forguncy.CommandBase));

// Key format is "Namespace.ClassName, AssemblyName"
Forguncy.CommandFactory.registerCommand("AndroidPDACommand.Set_Option_Menu, AndroidPDACommand", Set_Option_Menu_Command);


var Open_Builtin_Activity_Command = (function (_super) {
    __extends(Open_Builtin_Activity_Command, _super);
    function Open_Builtin_Activity_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Open_Builtin_Activity_Command.prototype.execute = function () {

        //// Get setings
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
            alert(ERROR_NOT_RUN_IN_HAC);
        }

    };

    return Open_Builtin_Activity_Command;
}(Forguncy.CommandBase));

var BuiltinPage = {
    配置: 0,
    快速设置: 1
}

// Key format is "Namespace.ClassName, AssemblyName"
Forguncy.CommandFactory.registerCommand("AndroidPDACommand.Open_Builtin_Activity, AndroidPDACommand", Open_Builtin_Activity_Command);


var Upsert_LocalKv_Command = (function (_super) {
    __extends(Upsert_LocalKv_Command, _super);
    function Upsert_LocalKv_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Upsert_LocalKv_Command.prototype.execute = function () {

        // Get setings
        var param = this.CommandParam;
        var key = this.evaluateFormula(param.KeyString);
        var value = this.evaluateFormula(param.ValueString);

        if (window.localKv) {
            window.localKv.upsert(key,value);
        } else {
            alert(ERROR_NOT_RUN_IN_HAC);
        }

    };

    return Upsert_LocalKv_Command;
}(Forguncy.CommandBase));

// Key format is "Namespace.ClassName, AssemblyName"
Forguncy.CommandFactory.registerCommand("AndroidPDACommand.Upsert_LocalKv, AndroidPDACommand", Upsert_LocalKv_Command);


var Retrieve_LocalKv_Command = (function (_super) {
    __extends(Retrieve_LocalKv_Command, _super);
    function Retrieve_LocalKv_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Retrieve_LocalKv_Command.prototype.execute = function () {

        // Get setings
        var param = this.CommandParam;
        var key = this.evaluateFormula(param.KeyString);
        var targetCellFormulaV = param.TargetCell;
        var cellLocationV = this.getCellLocation(targetCellFormulaV);
        var cellInfoV = JSON.stringify(cellLocationV);

        if (window.localKv) {
            window.localKv.retrieve(key, cellInfoV);
        } else {
            alert(ERROR_NOT_RUN_IN_HAC);
        }

    };

    return Retrieve_LocalKv_Command;
}(Forguncy.CommandBase));

// Key format is "Namespace.ClassName, AssemblyName"
Forguncy.CommandFactory.registerCommand("AndroidPDACommand.Retrieve_LocalKv, AndroidPDACommand", Retrieve_LocalKv_Command);
