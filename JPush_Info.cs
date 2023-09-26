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
    [OrderWeight(910)]
    public class JPush_Info : Command
    {
        [DisplayName("将RegId标识返回到变量")]
        [Description("APP启动时将自动向极光后台服务注册，获取唯一标识registration_id。建议您在进入业务模块时，获取RegId后将其与用户或设备（以SSAID为标识）的关联关系保存到数据库中，需要推送消息时，您需要提供RegId。")]
        [SearchableProperty]
        [ResultToProperty]
        public string OutParamaterName { get; set; } 


        public override string ToString()
        {
            if (string.IsNullOrEmpty(OutParamaterName)) {
                return "读取极光推送RegId";
            } else {
                return "读取极光推送RegId：" + OutParamaterName.ToString();
            }
            
        }

        public override CommandScope GetCommandScope()
        {
            return CommandScope.All;
        }

    }
}
