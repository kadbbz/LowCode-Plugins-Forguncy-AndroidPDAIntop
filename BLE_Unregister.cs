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
    [OrderWeight(118)]
    public class BLE_Unregister : Command
    {

        /// <summary>
        /// 在设计器中展示的插件名称
        /// </summary>
        /// <returns>易读的字符串</returns>
        public override string ToString()
        {
            return "取消对BLE设备的订阅"; // 命令列表中默认显示的名称
        }

        /// <summary>
        /// 插件类型：设置为服务端命令插件
        /// </summary>
        /// <returns>插件类型枚举</returns>
        public override CommandScope GetCommandScope()
        {
            return CommandScope.ClientSide;
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

        public enum SupportedReadMode {

            [Description("Notify：当值发生变化时通知，无需应答")]
            Notify,
            [Description("Indicate：当值发生变化时通知，自动应答")]
            Indicate
        }
    }
}
