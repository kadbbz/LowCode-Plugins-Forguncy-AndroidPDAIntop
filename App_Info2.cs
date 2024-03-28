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
    [OrderWeight(901)]
    public class App_Info2 : BaseCommand
    {
        [ResultToProperty]
        [DisplayName("读取版本号到变量")]
        public string TargetVersion { get; set; } = "AppVersion";

        [ResultToProperty]
        [DisplayName("读取包名到变量")]
        public string TargetName { get; set; } = "PackageName";

        public override string ToString()
        {
            return "读取APP信息";
        }

    }
}
