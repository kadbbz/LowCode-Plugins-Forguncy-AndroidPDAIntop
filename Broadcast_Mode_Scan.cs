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
    [OrderWeight(1202)]
    public class Broadcast_Mode_Scan : BaseCommand
    {
        [FormulaProperty(true)]
        [DisplayName("目标单元格")]
        public object TargetCell { get; set; }

        // 兼容旧版本
        [Browsable(false)]
        public object IsModalMode { get; set; }

        [BoolProperty]
        [DisplayName("是否为模态（弹出应用内置的扫码等待页面）")]
        public bool ShouldModalMode { get; set; } = false;

        public override string ToString()
        {
            return "单次扫码到单元格";
        }
    }
}
