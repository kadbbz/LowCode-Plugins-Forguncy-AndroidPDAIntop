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
    [OrderWeight(400)]
    public class Retrieve_LocalKv2 : Command
    {
        [FormulaProperty(true)]
        [DisplayName("键（大小写敏感）")]
        [SearchableProperty]
        public object KeyString { get; set; }

        [OrderWeight(999)]
        [DisplayName("将结果返回到变量")]
        [ResultToProperty]
        public string OutParamaterName { get; set; }

        public override string ToString()
        {
            if (KeyString == null)
            {
                return "从离线存储中读取"; // 命令列表中默认显示的名称
            }
            else
            {
                return "从离线存储中读取：" + KeyString.ToString();
            }
        }

        public override CommandScope GetCommandScope()
        {
            return CommandScope.All;
        }
    }
}
