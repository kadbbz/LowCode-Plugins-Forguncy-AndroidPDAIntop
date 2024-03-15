using GrapeCity.Forguncy.Commands;
using GrapeCity.Forguncy.Plugin;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;

namespace AndroidPDACommand
{
    [Icon("pack://application:,,,/AndroidPDACommand;component/Resources/Icon_Printer.png")]
    [Category("活字格安卓容器（HAC）")]
    [OrderWeight(291)]
    public class ESCPrinter_Print : Command
    {

        /// <summary>
        /// 在设计器中展示的插件名称
        /// </summary>
        /// <returns>易读的字符串</returns>
        public override string ToString()
        {
            return "执行蓝牙打印任务（ESC通用版）";
        }

        [OrderWeight(1)]
        [DisplayName("打印机的MAC地址（留空则使用默认打印机）")]
        [FormulaProperty(false)]
        public object macAddress { get; set; }

        [OrderWeight(2)]
        [DisplayName("纸张宽度（毫米）")]
        [FormulaProperty(false)]
        public object printerWidthMM { get; set; }

        [OrderWeight(3)]
        [DisplayName("打印机DPI")]
        [FormulaProperty(false)]
        public object printerDpi { get; set; } = 203;

        [OrderWeight(4)]
        [DisplayName("每行字数")]
        [FormulaProperty(false)]
        public object printerNbrCharactersPerLine { get; set; } = 32;

        [OrderWeight(5)]
        [DisplayName("需打印的文字模板")]
        [Description("了解文字模板的定义规则，请在Github上搜索 DantSu/ESCPOS-ThermalPrinter-Android")]
        [FormulaProperty(false)]
        public object template { get; set; }

        /// <summary>
        /// 插件类型：设置为服务端命令插件
        /// </summary>
        /// <returns>插件类型枚举</returns>
        public override CommandScope GetCommandScope()
        {
            return CommandScope.ClientSide;
        }       

    }
}
