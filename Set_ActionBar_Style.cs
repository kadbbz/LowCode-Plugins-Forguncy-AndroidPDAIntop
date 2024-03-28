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
    public class Set_ActionBar_Style : BaseCommand
    {

        [FormulaProperty]
        [DisplayName("是否显示状态栏（ActionBar）")]
        public object ShouldShowActionBar { get; set; }

        [FormulaProperty]
        [DisplayName("状态栏颜色（格式为FFFFFF，RGB）")]
        public object ActionBarColor { get; set; }

        [FormulaProperty]
        [DisplayName("菜单：是否显示【配置】")]
        public object ShouldShowSettings { get; set; }

        [FormulaProperty]
        [DisplayName("菜单：【帮助】页面（留空表示隐藏该菜单）")]
        public object HelpUrl { get; set; }

        [FormulaProperty]
        [DisplayName("菜单：【关于】页面（留空表示隐藏该菜单）")]
        public object AboutUrl { get; set; }

        public override string ToString()
        {
            return "配置APP的ActionBar";
        }
    }
}
