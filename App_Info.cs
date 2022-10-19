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
    [Icon("pack://application:,,,/AndroidPDACommand;component/Resources/Icon_Info.png")]
    public class App_Info : Command, IPropertySearchable, IForceGenerateCell
    {
        [FormulaProperty(true)]
        [DisplayName("目标单元格（版本）")]
        public object TargetCellVersion { get; set; }

        [FormulaProperty(true)]
        [DisplayName("目标单元格（包名）")]
        public object TargetCellPackage { get; set; }

        public override string ToString()
        {
            return "HAC：获取APP信息";
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
                Location = location.AppendProperty("目标单元格（版本）"),
                Value = TargetCellVersion?.ToString()
            });
            result.Add(new FindResultItem()
            {
                Location = location.AppendProperty("目标单元格（包名）"),
                Value = TargetCellPackage?.ToString()
            });


            return result ;
        }

        public IEnumerable<GenerateCellInfo> GetForceGenerateCells()
        {
            List<GenerateCellInfo> result = new List<GenerateCellInfo>();

            if (TargetCellVersion is IFormulaReferObject formulaReferObject)
            {
                var cellInfo = formulaReferObject.GetGenerateCellInfo();
                if (cellInfo != null)
                {
                    result.Add(cellInfo);
                }
            }

            if (TargetCellPackage is IFormulaReferObject formulaReferObject2)
            {
                var cellInfo = formulaReferObject2.GetGenerateCellInfo();
                if (cellInfo != null)
                {
                    result.Add(cellInfo);
                }
            }

            return result;
        }
    }
}
