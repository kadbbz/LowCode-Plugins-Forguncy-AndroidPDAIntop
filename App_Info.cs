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
    [Icon("pack://application:,,,/AndroidPDACommand;component/Resources/Icon_Phone.png")]
    [Category("活字格安卓容器（HAC）")]
    [OrderWeight(901)]
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
            return "读取APP信息到单元格";
        }

        public override CommandScope GetCommandScope()
        {
            return CommandScope.All;
        }

        public IEnumerable<FindResultItem> EnumSearchableProperty(LocationIndicator location)
        {
            List<FindResultItem> result = new List<FindResultItem>
            {
                new FindResultItem()
                {
                    Location = location.AppendProperty("目标单元格（版本）"),
                    Value = TargetCellVersion?.ToString()
                },
                new FindResultItem()
                {
                    Location = location.AppendProperty("目标单元格（包名）"),
                    Value = TargetCellPackage?.ToString()
                }
            };


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
