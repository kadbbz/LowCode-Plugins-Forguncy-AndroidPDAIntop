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
    [Icon("pack://application:,,,/AndroidPDACommand;component/Resources/Icon_Kv.png")]
    [Category("活字格安卓容器（HAC）")]
    [OrderWeight(1404)]
    public class Retrieve_LocalKv : BaseCommand
    {
        [FormulaProperty(true)]
        [DisplayName("目标单元格")]
        public object TargetCell { get; set; }

        [FormulaProperty]
        [DisplayName("键（大小写敏感）")]
        public object KeyString { get; set; }

        public override string ToString()
        {
            if (KeyString == null)
            {
                return "从离线存储中读取值到单元格"; // 命令列表中默认显示的名称
            }
            else
            {
                return "从离线存储中读取值到单元格：" + KeyString.ToString();
            }
        }
    }
}
