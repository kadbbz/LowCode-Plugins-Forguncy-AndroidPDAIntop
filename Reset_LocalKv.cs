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
    [Icon("pack://application:,,,/AndroidPDACommand;component/Resources/Icon_Kv.png")]
    [Category("活字格安卓容器（HAC）")]
    [OrderWeight(402)]
    public class Reset_LocalKv : BaseCommand
    {
        [FormulaProperty]
        [DisplayName("键（大小写敏感）")]
        public object KeyString { get; set; }

        public override string ToString()
        {
            return "从离线存储中删除指定键值";
        }

    }
}
