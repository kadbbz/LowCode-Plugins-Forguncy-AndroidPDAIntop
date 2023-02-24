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
    [Icon("pack://application:,,,/AndroidPDACommand;component/Resources/Icon_Settings.png")]
    [Category("活字格安卓容器（HAC）")]
    [OrderWeight(810)]
    public class Set_ActionBar_Color : Command, IPropertySearchable, IForceGenerateCell
    {
        [FormulaProperty]
        [DisplayName("颜色（格式为FFFFFF，RGB）")]
        public object ColorString { get; set; }

        public override string ToString()
        {
            return "配置APP的ActionBar颜色";
        }

        public override CommandScope GetCommandScope()
        {
            return CommandScope.All;
        }

        public IEnumerable<FindResultItem> EnumSearchableProperty(LocationIndicator location)
        {
            yield return new FindResultItem()
            {
                Location = location.AppendProperty("颜色"),
                Value = ColorString?.ToString()
            };
        }

        public IEnumerable<GenerateCellInfo> GetForceGenerateCells()
        {
            if (ColorString is IFormulaReferObject formulaReferObject)
            {
                var colorString = formulaReferObject.GetGenerateCellInfo();
                if (colorString != null)
                {
                    yield return colorString;
                }
            }
        }
    }
}
