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
    [Icon("pack://application:,,,/AndroidPDACommand;component/Resources/Icon_Phone.png")]
    [Category("活字格安卓容器（HAC）")]
    [OrderWeight(902)]
    public class Device_Info : Command
    {
        [DisplayName("将唯一标识返回到变量")]
        [Description("Android 6开始逐渐收紧对网卡Mac地址的读取，推荐采用SSAID作为设备的唯一标识。")]
        [SearchableProperty]
        [ResultToProperty]
        public string OutParamaterName { get; set; } 


        public override string ToString()
        {
            if (string.IsNullOrEmpty(OutParamaterName)) {
                return "读取设备唯一标识";
            } else {
                return "读取设备唯一标识：" + OutParamaterName.ToString();
            }
            
        }

        public override CommandScope GetCommandScope()
        {
            return CommandScope.All;
        }

    }
}
