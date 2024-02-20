using GrapeCity.Forguncy.Commands;
using GrapeCity.Forguncy.Plugin;
using System.ComponentModel;

namespace AndroidPDACommand
{
    [Icon("pack://application:,,,/AndroidPDACommand;component/Resources/Icon_Phone.png")]
    [Category("活字格安卓容器（HAC）")]
    [OrderWeight(896)]
    public class PlayRingtone : Command
    {
        public override string ToString()
        {
            return "播放提示音";
        }

        [ComboProperty]
        [DisplayName("声音类型")]
        public SupportedRingtoneType Type { get; set; } = SupportedRingtoneType.Notification;

        public override CommandScope GetCommandScope()
        {
            return CommandScope.ClientSide;
        }

    }

    public enum SupportedRingtoneType {

        [Description("Notification：通知提示音（单次）")]
        Notification,
        [Description("Alarm：闹钟（持续5秒）")]
        Alarm,
        [Description("Ringtone：铃声（持续5秒）")]
        Ringtone
    }

}
