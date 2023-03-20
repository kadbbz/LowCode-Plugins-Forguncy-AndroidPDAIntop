using GrapeCity.Forguncy.Commands;
using GrapeCity.Forguncy.Plugin;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace AndroidPDACommand
{
    [Icon("pack://application:,,,/AndroidPDACommand;component/Resources/Icon_PDF.png")]
    [Category("活字格安卓容器（HAC）")]
    [OrderWeight(750)]
    public class PDFPreview : Command
    {
        [FormulaProperty(false)]
        [DisplayName("PDF文件的URL地址")]
        public object Url { get; set; }

        [FormulaProperty(false)]
        [DisplayName("保存到【下载】文件夹中的PDF文件名")]
        public object FileName { get; set; } = "temp_"+DateTime.Now.ToString("yyyyMMddHHmmss")+".pdf";


        [FormulaProperty(false)]
        [DisplayName("PDF文件的密码")]
        public object Password { get; set; }

        public override string ToString()
        {
            return "预览PDF文件";
        }

        public override CommandScope GetCommandScope()
        {
            return CommandScope.All;
        }

    }
}
