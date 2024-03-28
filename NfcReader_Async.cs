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
    public class NfcReader_Async : BaseAsyncCommand
    {

        /// <summary>
        /// 在设计器中展示的插件名称
        /// </summary>
        /// <returns>易读的字符串</returns>
        public override string ToString()
        {
            return "读取NFC标签";
        }

        [Browsable(false)]
        [ResultToProperty]
        public string SubCommandParam { get; set; } = "NFC_Tag";

    }
}
