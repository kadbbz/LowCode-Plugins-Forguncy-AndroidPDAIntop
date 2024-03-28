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
    [OrderWeight(810)]
    public class Set_ActionBar_Color : BaseCommand
    {
        [FormulaProperty]
        [DisplayName("颜色（格式为FFFFFF，RGB）")]
        public object ColorString { get; set; }

        public override string ToString()
        {
            return "配置APP的ActionBar颜色";
        }

    }
}
