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
    [OrderWeight(100)]
    public class Get_Location_Async : BaseAsyncCommand
    {

        [ComboProperty]
        [DisplayName("坐标体系")]
        public SupportedType CoordinateSystem { get; set; } = SupportedType.BD09;


        public override string ToString()
        {
            return "读取地理位置";
        }

        [Browsable(false)]
        [ResultToProperty]
        public string SubCommandParam1 { get; set; } = "Latitude";

        [Browsable(false)]
        [ResultToProperty]
        public string SubCommandParam2 { get; set; } = "Longitude";


        public enum SupportedType
        {
            [Description("WGS84：GPS默认坐标")]
            WGS84,
            [Description("GCJ02：国标地图坐标")]
            GCJ02,
            [Description("BD09：百度地图专用坐标")]
            BD09
        }

    }
}
