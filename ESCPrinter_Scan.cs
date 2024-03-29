﻿using GrapeCity.Forguncy.Commands;
using GrapeCity.Forguncy.Plugin;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;

namespace AndroidPDACommand
{
    [Icon("pack://application:,,,/AndroidPDACommand;component/Resources/Icon_Printer.png")]
    [Category("活字格安卓容器（HAC）")]
    [OrderWeight(1290)]
    public class ESCPrinter_Scan : BaseCommand
    {

        /// <summary>
        /// 在设计器中展示的插件名称
        /// </summary>
        /// <returns>易读的字符串</returns>
        public override string ToString()
        {
            return "获取蓝牙打印机列表并填充到单元格（ESC通用版）";
        }

        [FormulaProperty(true)]
        [DisplayName("目标单元格：打印机列表（JSON格式的对象数组）")]
        [Description("形如：[{\"deviceName\":\"GP-M322-B982\",\"mac\":\"DC:1D:30:FB:B9:82\"}]")]
        public object TargetCell { get; set; }

    }
}
