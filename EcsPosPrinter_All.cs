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
    [OrderWeight(310)]
    public class EcsPosPrinter_All : Command
    {

        /// <summary>
        /// 在设计器中展示的插件名称
        /// </summary>
        /// <returns>易读的字符串</returns>
        public override string ToString()
        {
            if (Operation == SupportedOperations.GetAllPrinters && String.IsNullOrEmpty(OutParamaterName))
            {
                return "蓝牙打印（ECS/POS版）"; // 命令列表中默认显示的名称
            }
            else
            {
                return "蓝牙打印（ECS/POS版）：" + Operation.ToString();
            }
        }

        /// <summary>
        /// 插件类型：设置为服务端命令插件
        /// </summary>
        /// <returns>插件类型枚举</returns>
        public override CommandScope GetCommandScope()
        {
            return CommandScope.ClientSide;
        }


        private bool setPropertyVisiblity(string propertyName, bool N, bool O = true)
        {

            if (propertyName == nameof(PrinterName))
            {
                return N;
            }
            else if (propertyName == nameof(OutParamaterName))
            {
                return O;
            }
            else
            {
                return true; // 输出参数为常驻显示
            }
        }

        public override bool GetDesignerPropertyVisible(string propertyName, CommandScope commandScope)
        {
            switch (this.Operation)
            {
                case SupportedOperations.GetAllPrinters:
                    {
                        return propertyName == nameof(OutParamaterName) || propertyName == nameof(Operation);
                    }
                case SupportedOperations.Print:
                    {
                        return true;
                    }
                default:
                    {
                        return base.GetDesignerPropertyVisible(propertyName, commandScope);
                    }
            }

        }

        [OrderWeight(10)]
        [DisplayName("操作")]
        [ComboProperty]
        [SearchableProperty]
        public SupportedOperations Operation { get; set; }

        [OrderWeight(100)]
        [DisplayName("打印机名称（留空则使用默认打印机）")]
        [FormulaProperty]
        public object PrinterName { get; set; }

        [OrderWeight(110)]
        [DisplayName("打印机DPI")]
        [FormulaProperty]
        public object DPI { get; set; }

        [OrderWeight(111)]
        [DisplayName("打印宽度（mm）")]
        [FormulaProperty]
        public object Width { get; set; }

        [OrderWeight(112)]
        [DisplayName("每行的字符数")]
        [FormulaProperty]
        public object NbrCharactersPerLine { get; set; }

        [OrderWeight(113)]
        [DisplayName("打印指令")]
        [FormulaProperty]
        public object Commands { get; set; }

        [OrderWeight(999)]
        [DisplayName("将结果返回到变量")]
        [ResultToProperty]
        public String OutParamaterName { get; set; }

        public enum SupportedOperations
        {
            [Description("GetAllPrinters：返回所有已配对的打印机的名称列表，以逗号分割")]
            GetAllPrinters,
            [Description("Print：执行打印指令")]
            Print
        }
    }
}
