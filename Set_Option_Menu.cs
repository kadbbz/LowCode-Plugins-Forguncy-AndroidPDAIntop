﻿using GrapeCity.Forguncy.Commands;
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
    [OrderWeight(801)]
    public class Set_Option_Menu : BaseCommand
    {

     
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
            return "配置APP的菜单";
        }
    }
}
