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
    [OrderWeight(811)]
    public class Get_ActionBar_Color2 : BaseCommand
    {

        public override string ToString()
        {
            return "读取ActionBar颜色";
        }

        [DisplayName("将颜色返回到变量")]
        [Description("形如：0x1111FF")]
        [SearchableProperty]
        [ResultToProperty]
        public string OutParamaterName { get; set; } = "Color";
    }
}
