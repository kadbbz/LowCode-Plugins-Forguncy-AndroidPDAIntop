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
    [Icon("pack://application:,,,/AndroidPDACommand;component/Resources/Icon_Info.png")]
    public class Set_Option_Menu : Command, IPropertySearchable, IForceGenerateCell
    {

     
        [FormulaProperty(true)]
        [DisplayName("菜单：是否显示【配置】")]
        public IFormulaReferObject ShouldShowSettings { get; set; }

        [FormulaProperty(true)]
        [DisplayName("菜单：【帮助】页面（留空表示隐藏该菜单）")]
        public IFormulaReferObject HelpUrl { get; set; }

        [FormulaProperty(true)]
        [DisplayName("菜单：【关于】页面（留空表示隐藏该菜单）")]
        public IFormulaReferObject AboutUrl { get; set; }

        public override string ToString()
        {
            return "HAC：配置APP菜单";
        }

        public override CommandScope GetCommandScope()
        {
            return CommandScope.All;
        }

        public IEnumerable<FindResultItem> EnumSearchableProperty(LocationIndicator location)
        {
            List<FindResultItem> result = new List<FindResultItem>();
            return result;
        }

        public IEnumerable<GenerateCellInfo> GetForceGenerateCells()
        {
            List<GenerateCellInfo> result = new List<GenerateCellInfo>();
            return result;
        }
    }
}
