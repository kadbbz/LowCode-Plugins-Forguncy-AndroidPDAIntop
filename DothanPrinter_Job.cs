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
    [OrderWeight(301)]
    public class DothanPrinter_Job : BaseCommand
    {

        /// <summary>
        /// 在设计器中展示的插件名称
        /// </summary>
        /// <returns>易读的字符串</returns>
        public override string ToString()
        {
            if (Operation == SupportedOperations.StartJob && String.IsNullOrEmpty(OutParamaterName))
            {
                return "管理蓝牙打印任务（DothanTech版）"; // 命令列表中默认显示的名称
            }
            else
            {
                return "管理蓝牙打印任务（DothanTech版）：" + Operation.ToString();
            }
        }

        private bool setPropertyVisiblity(string propertyName, bool W, bool H, bool O, bool Out = true)
        {

            if (propertyName == nameof(Width))
            {
                return W;
            }
            else if (propertyName == nameof(Height))
            {
                return H;
            }
            else if (propertyName == nameof(Orientation))
            {
                return O;
            }
            else if (propertyName == nameof(OutParamaterName))
            {
                return Out;
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
                case SupportedOperations.AbortJob:
                    {
                        return setPropertyVisiblity(propertyName, false, false, false);
                    }
                case SupportedOperations.CommitJob:
                    {
                        return setPropertyVisiblity(propertyName, false, false, false);
                    }
                case SupportedOperations.StartJob:
                    {
                        return setPropertyVisiblity(propertyName, true, true, true);
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
        [DisplayName("标签宽度（mm）")]
        [FormulaProperty]
        public object Width { get; set; }

        [OrderWeight(110)]
        [DisplayName("标签高度（mm）")]
        [FormulaProperty]
        public object Height { get; set; }

        [OrderWeight(120)]
        [ComboProperty]
        [DisplayName("旋转角度")]
        public SupportedOrientation Orientation { get; set; } = SupportedOrientation.d0;

        [OrderWeight(999)]
        [DisplayName("将结果返回到变量")]
        [ResultToProperty]
        public String OutParamaterName { get; set; }

        public enum SupportedOperations
        {
            [Description("StartJob：创建绘图任务")]
            StartJob,
            [Description("CommitJob：提交绘图任务并开始打印")]
            CommitJob,
            [Description("AbortJob：取消绘图任务")]
            AbortJob,
        }

        public enum SupportedOrientation
        {
            [Description("无旋转")]
            d0 = 0,
            [Description("顺时针旋转90度")]
            d90 = 90,
            [Description("顺时针旋转180度")]
            d180 = 180,
            [Description("顺时针旋转270度")]
            d270 = 270
        }
    }
}
