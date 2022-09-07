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
    [Icon("pack://application:,,,/AndroidPDACommand;component/Resources/Icon_Scan.png")]
    public class Broadcast_Mode_ContinuousScanStart : Command, IPropertySearchable, IForceGenerateCell
    {
        [FormulaProperty(true)]
        [DisplayName("目标单元格")]
        public object TargetCell { get; set; }

        public override string ToString()
        {
            return "开始持续扫码到单元格";
        }

        public override CommandScope GetCommandScope()
        {
            return CommandScope.All;
        }

        public IEnumerable<FindResultItem> EnumSearchableProperty(LocationIndicator location)
        {
            yield return new FindResultItem()
            {
                Location = location.AppendProperty("目标单元格"),
                Value = TargetCell?.ToString()
            };
        }

        public IEnumerable<GenerateCellInfo> GetForceGenerateCells()
        {
            if (TargetCell is IFormulaReferObject formulaReferObject)
            {
                var cellInfo = formulaReferObject.GetGenerateCellInfo();
                if (cellInfo != null)
                {
                    yield return cellInfo;
                }
            }
        }
    }
}
