using GrapeCity.Forguncy.Commands;
using GrapeCity.Forguncy.Plugin;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using static AndroidPDACommand.BLE_Read;

namespace AndroidPDACommand
{
    [Icon("pack://application:,,,/AndroidPDACommand;component/Resources/Icon_Phone.png")]
    [Category("活字格安卓容器（HAC）")]
    [OrderWeight(895)]
    public class Vibrate : Command
    {
        public override string ToString()
        {
            return "震动提醒";
        }

        [FormulaProperty(false)]
        [SearchableProperty]
        [DisplayName("持续时间（秒）")]
        public object Duration { get; set; } = 1.0;

        public override CommandScope GetCommandScope()
        {
            return CommandScope.ClientSide;
        }

    }

}
