using GrapeCity.Forguncy.Commands;
using GrapeCity.Forguncy.Plugin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AndroidPDACommand
{
    /// <summary>
    /// 所有命令的基类，处理GetForceGenerateCells
    /// </summary>
    public class BaseCommand: Command,IForceGenerateCell
    {
        public override CommandScope GetCommandScope()
        {
            return CommandScope.ClientSide;
        }

        public IEnumerable<GenerateCellInfo> GetForceGenerateCells()
        {

            List<GenerateCellInfo> cells = new List<GenerateCellInfo>();
            var props = this.GetType().GetProperties();

            foreach (var prop in props) {
                foreach (var attr in prop.CustomAttributes) {
                    // 仅处理FormulaProperty
                    if (attr.AttributeType == typeof(FormulaPropertyAttribute)) {
                        
                        foreach (var arg in attr.ConstructorArguments) {

                            // 仅处理构造函数中onlySupportCell为true的
                            if ((bool)arg.Value == true) {

                                // 仅处理直接引用单元格的
                                if (prop.GetValue(this) is IFormulaReferObject formulaReferObject)
                                {
                                    var cellInfo = formulaReferObject.GetGenerateCellInfo();
                                    if (cellInfo != null)
                                    {
                                        cells.Add(cellInfo);
                                    }
                                }

                            }
                        }
                    }
                }
                
            }

            return cells;
        }
    }
}
