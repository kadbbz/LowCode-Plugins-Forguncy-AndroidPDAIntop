﻿using GrapeCity.Forguncy.Commands;
using GrapeCity.Forguncy.Plugin;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;

namespace AndroidPDACommand
{
    [Icon("pack://application:,,,/AndroidPDACommand;component/Resources/Icon_Image.png")]
    [Category("活字格安卓容器（HAC）")]
    [OrderWeight(165)]
    public class File_Add_Watermark_Async : BaseAsyncCommand
    {

        /// <summary>
        /// 在设计器中展示的插件名称
        /// </summary>
        /// <returns>易读的字符串</returns>
        public override string ToString()
        {
            return "为图片添加水印"; // 命令列表中默认显示的名称
        }

        [FormulaProperty(false)]
        [DisplayName("文件路径（Uri格式）")]
        [Description("留空则读取APP中上次操作过的文件")]
        public object FileUri { get; set; }

        [FormulaProperty(false)]
        [DisplayName("水印文字")]
        public object WMText { get; set; }

        [FormulaProperty(false)]
        [DisplayName("水印颜色（如red、white等，留空使用浅灰色）")]
        public object WMColor { get; set; } 


        [DisplayName("是否为平铺模式")]
        public bool WMTileMode { get; set; } = false;

        [Browsable(false)]
        [ResultToProperty]
        public string SubCommandParam1 { get; set; } = "File_Uri";

    }
}
