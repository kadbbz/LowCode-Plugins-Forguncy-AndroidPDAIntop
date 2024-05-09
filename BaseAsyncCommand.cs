using GrapeCity.Forguncy.Commands;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AndroidPDACommand
{
    /// <summary>
    /// 异步操作的基类
    /// </summary>
    public abstract class BaseAsyncCommand: BaseCommand, ISubListCommand, IContainSubCommands
    {
        [Browsable(false)]
        [ResultToProperty]
        public string SubCommandParamIsSuccess { get; set; } = "IsSuccess";

        [Browsable(false)]
        [ResultToProperty]
        public string SubCommandParamErrorInfo { get; set; } = "Error";

        [Browsable(false)]
        public List<Command> CommandList { get; set; } = new List<Command>();

        public IEnumerable<List<Command>> EnumSubCommands()
        {
            yield return CommandList;
        }
    }
}
