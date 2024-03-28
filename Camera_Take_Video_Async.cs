using GrapeCity.Forguncy.Commands;
using GrapeCity.Forguncy.Plugin;
using System.ComponentModel;

namespace AndroidPDACommand
{
    [Icon("pack://application:,,,/AndroidPDACommand;component/Resources/Icon_Camera.png")]
    [Category("活字格安卓容器（HAC）")]
    [OrderWeight(162)]
    public class Camera_Take_Video_Async : BaseAsyncCommand
    {

        /// <summary>
        /// 在设计器中展示的插件名称
        /// </summary>
        /// <returns>易读的字符串</returns>
        public override string ToString()
        {
            return "拍摄视频"; // 命令列表中默认显示的名称
        }

        [DisplayName("小尺寸")]
        public bool IsSnapshot { get; set; } = true;

        [Browsable(false)]
        [ResultToProperty]
        public string SubCommandParam1 { get; set; } = "File_Uri";
    }
}
