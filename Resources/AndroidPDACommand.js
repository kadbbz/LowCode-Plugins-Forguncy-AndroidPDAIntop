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
            if (!isModal || isModal ===0 ) {
                window.pda.continuous_scan(cellInfo, 1); // 持续扫描，但仅接收1次
                console.log("启动单次扫描，非模态");
            } else {
                window.pda.modal_scan(cellInfo); // 模态扫描
                console.log("启动单次扫描，模态");
            }

        } else {
            alert("当前APP不支持该命令，您可以通过在葡萄城技术社区搜索“HAC”下载最新版APP，或访问以下地址获取并编译适配的Android APP。 项目地址： https://gitee.com/GrapeCity/huozige-hac-app ");
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
            alert("当前APP不支持该命令，您可以通过在葡萄城技术社区搜索“HAC”下载最新版APP，或访问以下地址获取并编译适配的Android APP。 项目地址：https://gitee.com/GrapeCity/huozige-hac-app ");
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
            alert("当前APP不支持该命令，您可以通过在葡萄城技术社区搜索“HAC”下载最新版APP，或访问以下地址获取并编译适配的Android APP。 项目地址： https://gitee.com/GrapeCity/huozige-hac-app ");
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
            alert("当前APP不支持该命令，您可以通过在葡萄城技术社区搜索“HAC”下载最新版APP，或访问以下地址获取并编译适配的Android APP。 项目地址： https://gitee.com/GrapeCity/huozige-hac-app ");
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
            alert("当前APP不支持该命令，您可以通过在葡萄城技术社区搜索“HAC”下载最新版APP，或访问以下地址获取并编译适配的Android APP。 项目地址： https://gitee.com/GrapeCity/huozige-hac-app ");
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
            alert("当前APP不支持该命令，您可以通过在葡萄城技术社区搜索“HAC”下载最新版APP，或访问以下地址获取并编译适配的Android APP。 项目地址： https://gitee.com/GrapeCity/huozige-hac-app ");
        }

    };

    return Get_ActionBar_Color_Command;
}(Forguncy.CommandBase));

// Key format is "Namespace.ClassName, AssemblyName"
Forguncy.CommandFactory.registerCommand("AndroidPDACommand.Get_ActionBar_Color, AndroidPDACommand", Get_ActionBar_Color_Command);