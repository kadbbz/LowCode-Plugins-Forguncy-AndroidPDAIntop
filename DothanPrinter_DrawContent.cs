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
    [OrderWeight(302)]
    public class DothanPrinter_DrawContent : BaseCommand
    {

        /// <summary>
        /// 在设计器中展示的插件名称
        /// </summary>
        /// <returns>易读的字符串</returns>
        public override string ToString()
        {
            if (Operation == SupportedOperations.Text && String.IsNullOrEmpty(OutParamaterName))
            {
                return "绘制蓝牙打印的内容（DothanTech版）"; // 命令列表中默认显示的名称
            }
            else
            {
                return "绘制蓝牙打印的内容（DothanTech版）：" + Operation.ToString();
            }
        }


        private bool setPropertyVisiblity(string propertyName, bool X, bool Y, bool O, bool FH, bool FS, bool HA, bool VA, bool BT, bool W, bool H)
        {

            if (propertyName == nameof(X))
            {
                return X;
            }
            else if (propertyName == nameof(Y))
            {
                return Y;
            }
            else if (propertyName == nameof(Orientation))
            {
                return O;
            }
            else if (propertyName == nameof(FontHeight))
            {
                return FH;
            }
            else if (propertyName == nameof(FontStyle))
            {
                return FS;
            }
            else if (propertyName == nameof(HorizonAlignment))
            {
                return HA;
            }
            else if (propertyName == nameof(VerticalAlignment))
            {
                return VA;
            }
            else if (propertyName == nameof(BarcodeType))
            {
                return BT;
            }
            else if (propertyName == nameof(Width))
            {
                return W;
            }
            else if (propertyName == nameof(Height))
            {
                return H;
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
                case SupportedOperations.Text:
                    {
                        return setPropertyVisiblity(propertyName, true, true, true, true, true, true, true, false, false, false);
                    }
                case SupportedOperations.Barcode:
                    {
                        return setPropertyVisiblity(propertyName, true, true, true, true, false, false, false, true, true, true);
                    }
                case SupportedOperations.QRCode:
                    {
                        return setPropertyVisiblity(propertyName, true, true, true, false, false, false, false, false, true, false);
                    }
                //case SupportedOperations.Pdf417:
                //    {
                //        return setPropertyVisiblity(propertyName, true, true, true, false, false, false, false, false, true, true);
                //    }
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
        [DisplayName("文字/内容")]
        [FormulaProperty]
        public object Text { get; set; }

        [OrderWeight(130)]
        [DisplayName("文字的高度（mm）")]
        [FormulaProperty]
        public object FontHeight { get; set; }

        [OrderWeight(130)]
        [ComboProperty]
        [DisplayName("文字的字体风格")]
        public SupportedFontStyle FontStyle { get; set; } = SupportedFontStyle.正常;

        [OrderWeight(130)]
        [ComboProperty]
        [DisplayName("水平对齐方式")]
        public SupportedAlignment HorizonAlignment { get; set; } = SupportedAlignment.LeftUp;

        [OrderWeight(130)]
        [ComboProperty]
        [DisplayName("垂直对齐方式")]
        public SupportedAlignment VerticalAlignment { get; set; } = SupportedAlignment.LeftUp;

        [OrderWeight(140)]
        [ComboProperty]
        [DisplayName("条码类型")]
        public SupportedBarcodeType BarcodeType { get; set; } = SupportedBarcodeType.AUTO;

        [OrderWeight(240)]
        [FormulaProperty]
        [DisplayName("宽度（mm）")]
        public object Width { get; set; }

        [OrderWeight(240)]
        [FormulaProperty]
        [DisplayName("高度（mm）")]
        public object Height { get; set; }

        [OrderWeight(500)]
        [ComboProperty]
        [DisplayName("旋转角度")]
        public SupportedOrientation Orientation { get; set; } = SupportedOrientation.d0;

        [OrderWeight(999)]
        [DisplayName("将结果返回到变量")]
        [ResultToProperty]
        public String OutParamaterName { get; set; }

        public enum SupportedOperations
        {
            [Description("Text：绘制文字")]
            Text,
            [Description("Barcode：绘制条形码")]
            Barcode,
            [Description("QRCode：绘制QR二维码")]
            QRCode
            // PDF417的打印有问题，暂不支持
            // [Description("Pdf417：绘制Pdf417条码")]
            // Pdf417
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

        public enum SupportedAlignment
        {
            [Description("水平靠左/垂直靠上")]
            LeftUp = 0,
            [Description("水平居中/垂直居中")]
            Center = 1,
            [Description("水平靠右/垂直靠下")]
            RightDown = 2,
            [Description("对象子元素的对齐方式与对象的对齐方式相同")]
            Inherited = 3
        }

        public enum SupportedFontStyle
        {
            正常 = 0,
            粗体 = 1,
            斜体 = 2,
            粗斜体 = 3,
            下划线 = 4,
            删除线 = 5
        }

        public enum SupportedBarcodeType
        {
            AUTO = 60,
            UPC_A = 20,
            UPC_E = 21,
            EAN13 = 22,
            EAN8 = 23,
            CODE39 = 24,
            ITF25 = 25,
            CODEBAR = 26,
            CODE93 = 27,
            CODE128 = 28,
            ISBN = 29,
            ECODE39 = 30
        }
    }
}
