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

        if (window.pda) {
            window.pda.scan(cellInfo);
        } else {
            alert("当前APP不支持该命令，您可以通过访问以下地址获取并编译适配的Android APP。 项目地址： https://github.com/kadbbz/huozige_morden_android_lowcode_app ");
        }

    };

    Android_PDA_Broadcast_Mode_Scan_Command.prototype.GetQRCode = function (cellInfo, qrcode) {
        var cellLocation = JSON.parse(cellInfo);
        Forguncy.Page.getCellByLocation(cellLocation).setValue(qrcode);
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

        // Get setings
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
        } else {
            alert("当前APP不支持该命令，您可以通过访问以下地址获取并编译适配的Android APP。 项目地址： https://github.com/kadbbz/huozige_morden_android_lowcode_app ");
        }

    };

    return Android_PDA_App_Info_Command;
}(Forguncy.CommandBase));

// Key format is "Namespace.ClassName, AssemblyName"
Forguncy.CommandFactory.registerCommand("AndroidPDACommand.App_Info, AndroidPDACommand", Android_PDA_App_Info_Command);