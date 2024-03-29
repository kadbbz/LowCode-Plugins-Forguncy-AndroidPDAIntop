﻿using GrapeCity.Forguncy.Commands;
using GrapeCity.Forguncy.Plugin;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;

namespace AndroidPDACommand
{
    [Icon("pack://application:,,,/AndroidPDACommand;component/Resources/Icon_Bluetooth.png")]
    [Category("活字格安卓容器（HAC）")]
    [OrderWeight(1110)]
    public class BLE_Scan : BaseCommand
    {

        /// <summary>
        /// 在设计器中展示的插件名称
        /// </summary>
        /// <returns>易读的字符串</returns>
        public override string ToString()
        {
            return "扫描BLE设备/标签并填充到单元格"; // 命令列表中默认显示的名称
        }

        [FormulaProperty(true)]
        [DisplayName("目标单元格：设备列表（JSON格式的对象数组）")]
        public object TargetCell { get; set; }

        [FormulaProperty(true)]
        [DisplayName("目标单元格：错误信息")]
        public object ErrorCell { get; set; }
    }
}
