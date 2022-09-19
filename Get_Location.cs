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
    [Icon("pack://application:,,,/AndroidPDACommand;component/Resources/Icon_Location.png")]
    public class Get_Location : Command, IPropertySearchable, IForceGenerateCell
    {

        [FormulaProperty(true)]
        [DisplayName("坐标体系：支持WGS84、GCJ02、BD09")]
        public object CS { get; set; }

        [FormulaProperty(true)]
        [DisplayName("目标单元格（Latitude/纬度）")]
        public object LatCell { get; set; }

        [FormulaProperty(true)]
        [DisplayName("目标单元格（Longtitude/经度）")]
        public object LonCell { get; set; }

        [FormulaProperty(true)]
        [DisplayName("目标单元格（错误信息）")]
        public object ErrCell { get; set; }


        public override string ToString()
        {
            return "获取地理位置";
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
                Location = location.AppendProperty("目标单元格（Latitude/纬度）"),
                Value = LatCell?.ToString()
            });

            result.Add(new FindResultItem()
            {
                Location = location.AppendProperty("目标单元格（Longtitude/经度）"),
                Value = LonCell?.ToString()
            });

            result.Add(new FindResultItem()
            {
                Location = location.AppendProperty("目标单元格（错误信息）"),
                Value = ErrCell?.ToString()
            });

            return result ;
        }

        public IEnumerable<GenerateCellInfo> GetForceGenerateCells()
        {
            List<GenerateCellInfo> result = new List<GenerateCellInfo>();

            if (LatCell is IFormulaReferObject formulaReferObject2)
            {
                var cellInfo = formulaReferObject2.GetGenerateCellInfo();
                if (cellInfo != null)
                {
                    result.Add(cellInfo);
                }
            }

            if (LonCell is IFormulaReferObject formulaReferObject3)
            {
                var cellInfo = formulaReferObject3.GetGenerateCellInfo();
                if (cellInfo != null)
                {
                    result.Add(cellInfo);
                }
            }

            if (ErrCell is IFormulaReferObject formulaReferObject4)
            {
                var cellInfo = formulaReferObject4.GetGenerateCellInfo();
                if (cellInfo != null)
                {
                    result.Add(cellInfo);
                }
            }

            return result;
        }
    }
}
