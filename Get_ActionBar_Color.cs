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
    [OrderWeight(811)]
    public class Get_ActionBar_Color : Command, IPropertySearchable, IForceGenerateCell
    {
        [FormulaProperty(true)]
        [DisplayName("目标单元格")]
        public object TargetCell { get; set; }

        public override string ToString()
        {
            return "读取ActionBar颜色到单元格";
        }

        public override CommandScope GetCommandScope()
        {
            return CommandScope.All;
        }

        public IEnumerable<FindResultItem> EnumSearchableProperty(LocationIndicator location)
        {
            List<FindResultItem> result = new List<FindResultItem>();
            result.Add(new FindResultItem()
            {
                Location = location.AppendProperty("目标单元格"),
                Value = TargetCell?.ToString()
            });
           
            return result ;
        }

        public IEnumerable<GenerateCellInfo> GetForceGenerateCells()
        {
            List<GenerateCellInfo> result = new List<GenerateCellInfo>();

            if (TargetCell is IFormulaReferObject formulaReferObject)
            {
                var cellInfo = formulaReferObject.GetGenerateCellInfo();
                if (cellInfo != null)
                {
                    result.Add(cellInfo);
                }
            }

            return result;
        }
    }
}
