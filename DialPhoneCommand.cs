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
    public class DialPhone : Command
    {
        [FormulaProperty]
        [SearchableProperty]
        [DisplayName("电话号码")]
        public object PhoneNumber { get; set; }

        public override string ToString()
        {
            return "拨打电话";
        }

        public override CommandScope GetCommandScope()
        {
            return CommandScope.All;
        }
    }
}
