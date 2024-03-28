using GrapeCity.Forguncy.Commands;
using GrapeCity.Forguncy.Plugin;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;

namespace AndroidPDACommand
{
    [Icon("pack://application:,,,/AndroidPDACommand;component/Resources/Icon_File.png")]
    [Category("活字格安卓容器（HAC）")]
    [OrderWeight(170)]
    public class File_Load_Base64 : BaseCommand
    {

        /// <summary>
        /// 在设计器中展示的插件名称
        /// </summary>
        /// <returns>易读的字符串</returns>
        public override string ToString()
        {
            return "读取本地文件"; // 命令列表中默认显示的名称
        }

        [FormulaProperty(false)]
        [DisplayName("文件路径（Uri格式）")]
        [Description("留空则读取APP中上次操作（选取、下载等）过的文件")]
        public object FileUri { get; set; }


        [DisplayName("将Base64编码的文件内容（Object Url格式）保存到变量")]
        [Description("可直接用于存储到数据表中附件或图片类型的列，或使用img等标签在页面上呈现，形如data:image/jpg;base64,AA67..")]
        [SearchableProperty]
        [ResultToProperty]
        public string PName { get; set; } = "Object_Url";

    }
}
