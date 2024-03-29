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
    [Icon("pack://application:,,,/AndroidPDACommand;component/Resources/Icon_Phone.png")]
    [Category("活字格安卓容器（HAC）")]
    [OrderWeight(900)]
    public class Open_Builtin_Activity : BaseCommand
    {
        [DisplayName("目标页面")]
        public BuiltinPage TargetPage { get; set; }

        public override string ToString()
        {
            return "打开APP的内置页面";
        }

    }

    public enum BuiltinPage
    {
        配置,
        快速设置
    }
}
