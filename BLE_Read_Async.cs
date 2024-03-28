using GrapeCity.Forguncy.Commands;
using GrapeCity.Forguncy.Plugin;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;

namespace AndroidPDACommand
{
    [Icon("pack://application:,,,/AndroidPDACommand;component/Resources/Icon_Bluetooth.png")]
    [Category("活字格安卓容器（HAC）")]
    [OrderWeight(115)]
    public class BLE_Read_Async : BaseAsyncCommand
    {

        /// <summary>
        /// 在设计器中展示的插件名称
        /// </summary>
        /// <returns>易读的字符串</returns>
        public override string ToString()
        {
            return "从BLE设备读取数据"; // 命令列表中默认显示的名称
        }

        [FormulaProperty(false)]
        [DisplayName("设备MAC地址")]
        public object MacAddress { get; set; }

        [FormulaProperty(false)]
        [DisplayName("服务（4位数字，如180A）")]
        public object ServiceUUID { get; set; }

        [FormulaProperty(false)]
        [DisplayName("特征（4位数字，如1200）")]
        public object CharacteristicUUID { get; set; }


        [Browsable(false)]
        [ResultToProperty]
        public string SubCommandParam1 { get; set; } = "Data_In_BASE64";

        [Browsable(false)]
        [ResultToProperty]
        public string SubCommandParam2 { get; set; } = "Data_In_ByteArray";

    }
}
