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
    public class BLE_Read : Command
    {

        /// <summary>
        /// 在设计器中展示的插件名称
        /// </summary>
        /// <returns>易读的字符串</returns>
        public override string ToString()
        {
            return "从BLE设备读取数据"; // 命令列表中默认显示的名称
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
        [DisplayName("数据读取模式")]
        public SupportedReadMode Mode { get; set; } = SupportedReadMode.Read;

        [FormulaProperty(false)]
        [DisplayName("服务（4位数字，如180A）")]
        public object ServiceUUID { get; set; }

        [FormulaProperty(false)]
        [DisplayName("特征（4位数字，如1200）")]
        public object CharacteristicUUID { get; set; }

        [FormulaProperty(true)]
        [DisplayName("目标单元格：数据（BASE64加密）")]
        public object TargetCell { get; set; }

        [FormulaProperty(true)]
        [DisplayName("目标单元格：错误信息")]
        public object ErrorCell { get; set; }

        public enum SupportedReadMode {

            [Description("Read：读取当前值")]
            Read,
            [Description("Notify：当值发生变化时通知，无需应答")]
            Notify,
            [Description("Indicate：当值发生变化时通知，自动应答")]
            Indicate
        }
    }
}
