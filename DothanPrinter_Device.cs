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
    [OrderWeight(300)]
    public class DothanPrinter_Device : BaseCommand
    {

        /// <summary>
        /// 在设计器中展示的插件名称
        /// </summary>
        /// <returns>易读的字符串</returns>
        public override string ToString()
        {
            if (Operation == SupportedOperations.GetPrinterState && String.IsNullOrEmpty(OutParamaterName))
            {
                return "管理蓝牙打印机设备（DothanTech版）"; // 命令列表中默认显示的名称
            }
            else
            {
                return "管理蓝牙打印机设备（DothanTech版）：" + Operation.ToString();
            }
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
                case SupportedOperations.Cancel:
                    {
                        return setPropertyVisiblity(propertyName, false, false);
                    }
                case SupportedOperations.ReopenPrinter:
                    {
                        return setPropertyVisiblity(propertyName, false);
                    }
                case SupportedOperations.GetAllPrinters:
                    {
                        return setPropertyVisiblity(propertyName, false);
                    }
                case SupportedOperations.ClosePrinter:
                    {
                        return setPropertyVisiblity(propertyName, false, false);
                    }
                case SupportedOperations.OpenPrinter:
                    {
                        return setPropertyVisiblity(propertyName, true);
                    }
                case SupportedOperations.GetPrinterState:
                    {
                        return setPropertyVisiblity(propertyName, false);
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

        [OrderWeight(999)]
        [DisplayName("将结果返回到变量")]
        [ResultToProperty]
        public String OutParamaterName { get; set; }

        public enum SupportedOperations
        {
            [Description("GetPrinterState：获取打印机状态")]
            GetPrinterState,
            [Description("OpenPrinter：连接打印机")]
            OpenPrinter,
            [Description("ReopenPrinter：连接上次连接过的打印机")]
            ReopenPrinter,
            [Description("GetAllPrinters：返回所有已配对的打印机的名称列表，以逗号分割")]
            GetAllPrinters,
            [Description("Cancel：强制取消所有已提交（CommitJob）打印任务")]
            Cancel,
            [Description("ClosePrinter：强制终止当前打印任务并断开与打印机的连接")]
            ClosePrinter
        }
    }
}
