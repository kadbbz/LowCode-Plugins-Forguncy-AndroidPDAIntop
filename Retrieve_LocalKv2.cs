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
    public class Retrieve_LocalKv2 : Command, ISubListCommand, IContainSubCommands
    {
        [FormulaProperty(true)]
        [DisplayName("键（大小写敏感）")]
        [SearchableProperty]
        public object KeyString { get; set; }

        [ResultToProperty]
        [Browsable(false)]
        public string SubParam_LocalValue { get; set; } = "LocalValue";

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

        [Browsable(false)]
        public List<Command> CommandList { get; set; } = new List<Command>();

        public IEnumerable<List<Command>> EnumSubCommands()
        {
            yield return CommandList;
        }
    }
}
