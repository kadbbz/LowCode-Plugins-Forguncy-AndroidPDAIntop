using GrapeCity.Forguncy.Commands;
using GrapeCity.Forguncy.Plugin;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace AndroidPDACommand
{
    [Icon("pack://application:,,,/AndroidPDACommand;component/Resources/Icon_Location.png")]
    [Category("活字格安卓容器（HAC）")]
    [OrderWeight(1100)]
    public class Get_Location : BaseCommand
    {
        // 兼容旧版本
        [Browsable(false)]
        public object CS { get; set; }

        [ComboProperty]
        [DisplayName("坐标体系")]
        public SupportedCoordinateSystem CoordinateSystem { get; set; } = SupportedCoordinateSystem.BD09;

        [FormulaProperty(true)]
        [DisplayName("目标单元格（Latitude/纬度）")]
        public object LatCell { get; set; }

        [FormulaProperty(true)]
        [DisplayName("目标单元格（Longtitude/经度）")]
        public object LonCell { get; set; }

        [FormulaProperty(true)]
        [DisplayName("目标单元格（错误信息）")]
        public object ErrCell { get; set; }


        public override string ToString()
        {
            return "读取地理位置到单元格";
        }

        public enum SupportedCoordinateSystem
        {
            [Description("WGS84：GPS默认坐标")]
            WGS84=0,
            [Description("GCJ02：国标地图坐标")]
            GCJ02=1,
            [Description("BD09：百度地图专用坐标")]
            BD09=3
        }

    }
}
