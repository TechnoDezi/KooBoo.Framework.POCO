using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace {{:namespace}}
{
    public interface I{{:TableName}}
    {
        #region Properties

        {{for Columns}}{{:DataType}} {{:ColumnName}} {{:"{"}} get; set; {{:"}"}} 
        {{/for}}
        #endregion

        void Select{{:TableName}}Details();
        List{{:"<"}}I{{:TableName}}{{:">"}} Select{{:TableName}}ListSearch(string searchValue);
        void InsertUpdate{{:TableName}}();
        void Delete{{:TableName}}();
    }
}