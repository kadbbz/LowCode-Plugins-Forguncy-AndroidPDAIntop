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
    public class Upsert_LocalKv : Command, IPropertySearchable, IForceGenerateCell
    {
        [FormulaProperty(true)]
        [DisplayName("键（大小写敏感）")]
        public object KeyString { get; set; }

        [FormulaProperty(true)]
        [DisplayName("值")]
        public object ValueString { get; set; }

        public override string ToString()
        {
            return "HAC：存入离线存储";
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

            result.Add(new FindResultItem()
            {
                Location = location.AppendProperty("值"),
                Value = ValueString?.ToString()
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

            if (ValueString is IFormulaReferObject formulaReferObject2)
            {
                var vString = formulaReferObject2.GetGenerateCellInfo();
                if (vString != null)
                {
                    result.Add(vString);
                }
            }

            return result;
        }
    }
}
