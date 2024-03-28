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
    [OrderWeight(303)]
    public class DothanPrinter_DrawShape : BaseCommand
    {

        /// <summary>
        /// 在设计器中展示的插件名称
        /// </summary>
        /// <returns>易读的字符串</returns>
        public override string ToString()
        {
            if (Operation == SupportedOperations.DrawLine && String.IsNullOrEmpty(OutParamaterName))
            {
                return "绘制蓝牙打印的图形（DothanTech版）"; // 命令列表中默认显示的名称
            }
            else
            {
                return "绘制蓝牙打印的图形（DothanTech版）：" + Operation.ToString();
            }
        }


        private bool setPropertyVisiblity(string propertyName, bool X, bool Y, bool X2, bool Y2, bool LW, bool LT, bool W, bool H, bool CW)
        {

            if (propertyName == nameof(X))
            {
                return X;
            }
            else if (propertyName == nameof(Y))
            {
                return Y;
            }
            else if (propertyName == nameof(X2))
            {
                return X2;
            }
            else if (propertyName == nameof(Y2))
            {
                return Y2;
            }
            else if (propertyName == nameof(LineWidth))
            {
                return LW;
            }
            else if (propertyName == nameof(LineType))
            {
                return LT;
            }
            else if (propertyName == nameof(Width))
            {
                return W;
            }
            else if (propertyName == nameof(Height))
            {
                return H;
            }
            else if (propertyName == nameof(CornerWidth))
            {
                return CW;
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
                case SupportedOperations.DrawLine:
                    {
                        return setPropertyVisiblity(propertyName, true, true, true, true, true, true, false, false, false);
                    }
                case SupportedOperations.DrawRectangle:
                    {
                        return setPropertyVisiblity(propertyName, true, true, false, false, true, false, true, true, false);
                    }
                case SupportedOperations.FillRectangle:
                    {
                        return setPropertyVisiblity(propertyName, true, true, false, false, false, false, true, true, false);
                    }
                case SupportedOperations.DrawRoundRectangle:
                    {
                        return setPropertyVisiblity(propertyName, true, true, false, false, true, false, true, true, true);
                    }
                case SupportedOperations.FillRoundRectangle:
                    {
                        return setPropertyVisiblity(propertyName, true, true, false, false, false, false, true, true, true);
                    }
                case SupportedOperations.DrawEllipse:
                    {
                        return setPropertyVisiblity(propertyName, true, true, false, false, true, false, true, true, false);
                    }
                case SupportedOperations.FillEllipse:
                    {
                        return setPropertyVisiblity(propertyName, true, true, false, false, false, false, true, true, false);
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
        [DisplayName("X坐标（mm）")]
        [FormulaProperty]
        public object X { get; set; }

        [OrderWeight(110)]
        [DisplayName("Y坐标（mm）")]
        [FormulaProperty]
        public object Y { get; set; }

        [OrderWeight(120)]
        [DisplayName("终点X坐标（mm）")]
        [FormulaProperty]
        public object X2 { get; set; }

        [OrderWeight(120)]
        [DisplayName("终点Y坐标（mm）")]
        [FormulaProperty]
        public object Y2 { get; set; }

        [OrderWeight(130)]
        [FormulaProperty]
        [DisplayName("线宽（mm）")]
        public object LineWidth { get; set; }

        [OrderWeight(130)]
        [DisplayName("实线/点划线")]
        [ComboProperty]
        [SearchableProperty]
        public SupportedLineType LineType { get; set; }

        [OrderWeight(140)]
        [FormulaProperty]
        [DisplayName("宽度（mm）")]
        public object Width { get; set; }

        [OrderWeight(141)]
        [FormulaProperty]
        [DisplayName("高度（mm）")]
        public object Height { get; set; }

        [OrderWeight(160)]
        [FormulaProperty]
        [DisplayName("圆角宽度（mm）")]
        public object CornerWidth { get; set; }

        [OrderWeight(999)]
        [DisplayName("将结果返回到变量")]
        [ResultToProperty]
        public String OutParamaterName { get; set; }

        public enum SupportedOperations
        {
            [Description("DrawLine：绘制直线/斜线")]
            DrawLine,
            [Description("DrawRectangle：绘制矩形")]
            DrawRectangle,
            [Description("FillRectangle：填充矩形")]
            FillRectangle,
            [Description("DrawRoundRectangle：绘制圆角矩形")]
            DrawRoundRectangle,
            [Description("FillRoundRectangle：绘制圆角矩形")]
            FillRoundRectangle,
            [Description("DrawEllipse：绘制圆形/椭圆形")]
            DrawEllipse,
            [Description("FillEllipse：绘制圆形/椭圆形")]
            FillEllipse
        }

        public enum SupportedLineType
        {
            [Description("实线")]
            Solid = 0,
            [Description("点划线（......）")]
            Dot = 1,
            [Description("点划线（- - - ）")]
            Dash = 2
        }
    }
}
