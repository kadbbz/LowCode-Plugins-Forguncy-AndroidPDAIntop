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
    [OrderWeight(805)]
    public class Set_Scanner_Options : BaseCommand
    {
        [FormulaProperty]
        [DisplayName("广播名称（Action）")]
        public object Action { get; set; }

        [FormulaProperty]
        [DisplayName("广播键值（Extra）")]
        public object Extra { get; set; }

       
        public override string ToString()
        {
            return "配置扫描头参数";
        }
    }
}
