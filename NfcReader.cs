using GrapeCity.Forguncy.Commands;
using GrapeCity.Forguncy.Plugin;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;

namespace AndroidPDACommand
{
    [Icon("pack://application:,,,/AndroidPDACommand;component/Resources/Icon_Nfc.png")]
    [Category("活字格安卓容器（HAC）")]
    [OrderWeight(101)]
    public class NfcReader : Command
    {

        /// <summary>
        /// 在设计器中展示的插件名称
        /// </summary>
        /// <returns>易读的字符串</returns>
        public override string ToString()
        {
            return "读取NFC标签到单元格";
        }

        /// <summary>
        /// 插件类型：设置为服务端命令插件
        /// </summary>
        /// <returns>插件类型枚举</returns>
        public override CommandScope GetCommandScope()
        {
            return CommandScope.ClientSide;
        }
        [FormulaProperty(true)]
        [DisplayName("目标单元格（TAG ID，16进制）")]
        public object TagCell { get; set; }

    }
}
