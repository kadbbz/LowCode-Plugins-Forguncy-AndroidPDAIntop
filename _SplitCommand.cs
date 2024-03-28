using GrapeCity.Forguncy.Plugin;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AndroidPDACommand
{
    [Category("活字格安卓容器（HAC）")]
    [OrderWeight(1000)]
    [Description("分割线以上的命令采用传统的“回调”方式，以下的命令则采用“单元格”作为中转。两者行为一致，请您根据自己的开发习惯自行选择。")]
    public class _SplitCommand:BaseCommand
    {
        public override string ToString()
        {
            return "--------分割线--------";
        }
    }
}
