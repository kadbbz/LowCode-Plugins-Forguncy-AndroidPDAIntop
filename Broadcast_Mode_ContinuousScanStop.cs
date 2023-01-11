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
    [Icon("pack://application:,,,/AndroidPDACommand;component/Resources/Icon_Scan.png")]
    [Category("活字格安卓容器（HAC）")]
    [OrderWeight(201)]
    public class Broadcast_Mode_ContinuousScanStop : Command
    {

        public override string ToString()
        {
            return "停止持续扫码";
        }

        public override CommandScope GetCommandScope()
        {
            return CommandScope.All;
        }
    }
}
