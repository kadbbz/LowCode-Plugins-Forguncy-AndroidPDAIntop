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
    [Icon("pack://application:,,,/AndroidPDACommand;component/Resources/Icon_Settings.png")]
    [Category("活字格安卓容器（HAC）")]
    [OrderWeight(820)]
    public class Set_Offline_Mode : Command
    {

        [DisplayName("是否为离线模式")]
        [Description("离线模式下，页面导航功能将被禁用，避免误操作（当前活字格应用内的页面跳转不受限制）")]
        public bool IsOfflineMode { get; set; }


        public override string ToString()
        {
            return "设置离线模式";
        }

        public override CommandScope GetCommandScope()
        {
            return CommandScope.ClientSide;
        }

    }
}
