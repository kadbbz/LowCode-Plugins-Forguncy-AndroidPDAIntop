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
    [Icon("pack://application:,,,/AndroidPDACommand;component/Resources/Icon_Scan.png")]
    [Category("活字格安卓容器（HAC）")]
    [OrderWeight(1200)]
    public class Broadcast_Mode_ContinuousScanStart : BaseCommand
    {
        [FormulaProperty(true)]
        [DisplayName("目标单元格")]
        public object TargetCell { get; set; }

        public override string ToString()
        {
            return "开始监听扫码结果并填充到单元格";
        }
    }
}
