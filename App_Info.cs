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
    [OrderWeight(1901)]
    public class App_Info : BaseCommand
    {
        [FormulaProperty(true)]
        [DisplayName("目标单元格（版本）")]
        public object TargetCellVersion { get; set; }

        [FormulaProperty(true)]
        [DisplayName("目标单元格（包名）")]
        public object TargetCellPackage { get; set; }

        public override string ToString()
        {
            return "读取APP信息到单元格";
        }

    }
}
