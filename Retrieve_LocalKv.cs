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
    [Icon("pack://application:,,,/AndroidPDACommand;component/Resources/Icon_Kv.png")]
    [Category("活字格安卓容器（HAC）")]
    [OrderWeight(404)]
    public class Retrieve_LocalKv : Command, IPropertySearchable, IForceGenerateCell
    {
        [FormulaProperty(true)]
        [DisplayName("目标单元格")]
        public object TargetCell { get; set; }

        [FormulaProperty(true)]
        [DisplayName("键（大小写敏感）")]
        public object KeyString { get; set; }

        public override string ToString()
        {
            if (KeyString == null)
            {
                return "从离线存储中读取到单元格"; // 命令列表中默认显示的名称
            }
            else
            {
                return "从离线存储中读取到单元格：" + KeyString.ToString();
            }
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
                Location = location.AppendProperty("键"),
                Value = KeyString?.ToString()
            });

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

            if (KeyString is IFormulaReferObject formulaReferObject)
            {
                var kString = formulaReferObject.GetGenerateCellInfo();
                if (kString != null)
                {
                    result.Add(kString);
                }
            }

            if (TargetCell is IFormulaReferObject formulaReferObject2)
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
