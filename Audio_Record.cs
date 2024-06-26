﻿using GrapeCity.Forguncy.Commands;
using GrapeCity.Forguncy.Plugin;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;

namespace AndroidPDACommand
{
    [Icon("pack://application:,,,/AndroidPDACommand;component/Resources/Icon_Recorder.png")]
    [Category("活字格安卓容器（HAC）")]
    [OrderWeight(1164)]
    public class Audio_Record : BaseCommand
    {

        /// <summary>
        /// 在设计器中展示的插件名称
        /// </summary>
        /// <returns>易读的字符串</returns>
        public override string ToString()
        {
            return "录制音频并将文件路径填充到单元格"; // 命令列表中默认显示的名称
        }


        [FormulaProperty(true)]
        [DisplayName("目标单元格：MP3的文件路径（Uri格式）")]
        public object TargetCell { get; set; }

    }
}
