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
    [OrderWeight(402)]
    public class Reset_LocalKv : Command, IPropertySearchable, IForceGenerateCell
    {
        [FormulaProperty]
        [DisplayName("键（大小写敏感）")]
        public object KeyString { get; set; }

        public override string ToString()
        {
            return "从离线存储中删除指定键值";
        }

        public override CommandScope GetCommandScope()
        {
            return CommandScope.All;
        }

        public IEnumerable<FindResultItem> EnumSearchableProperty(LocationIndicator location)
        {
            List<FindResultItem> result = new List<FindResultItem>();

            result.Add(new FindResultItem() { 
                Location = location.AppendProperty("键"),
                Value = KeyString?.ToString()
            });

            return result;
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

            return result;
        }
    }
}
