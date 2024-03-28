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
    [OrderWeight(117)]
    public class BLE_Register_Async : BaseAsyncCommand
    {

        /// <summary>
        /// 在设计器中展示的插件名称
        /// </summary>
        /// <returns>易读的字符串</returns>
        public override string ToString()
        {
            return "向BLE设备订阅数据通知"; // 命令列表中默认显示的名称
        }

        [FormulaProperty(false)]
        [DisplayName("设备MAC地址")]
        public object MacAddress { get; set; }

        [ComboProperty]
        [DisplayName("订阅模式")]
        public SupportedReadMode Mode { get; set; } = SupportedReadMode.Notify;

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


        public enum SupportedReadMode {

            [Description("Notify：当值发生变化时通知，无需应答")]
            Notify,
            [Description("Indicate：当值发生变化时通知，自动应答")]
            Indicate
        }
    }
}
