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
    [OrderWeight(800)]
    public class Set_ActionBar_Style : Command, IPropertySearchable, IForceGenerateCell
    {

        [FormulaProperty(true)]
        [DisplayName("是否显示状态栏（ActionBar）")]
        public IFormulaReferObject ShouldShowActionBar { get; set; }

        [FormulaProperty(true)]
        [DisplayName("状态栏颜色（格式为FFFFFF，RGB）")]
        public object ActionBarColor { get; set; }

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
            return "配置APP的ActionBar";
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
