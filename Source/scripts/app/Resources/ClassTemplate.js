﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Data.SqlClient;
using KooBoo.Framework;
using KooBoo.Framework.Data;

namespace {{:namespace}}
{{:"{"}}
    public class {{:TableName}} {{if exportBase}}: {{:baseClass}}{{/if}}
    {{:"{"}}
        #region Properties

        {{for Columns}}public {{:DataType}} {{:ColumnName}} {{:"{"}} get; set; {{:"}"}} 
        {{/for}}
        #endregion

        #region Select Methods
                    
        {{:"/// <summary>"}}
        {{:"/// Selects the details for the specified"}}{{:TableName}}
        {{:"/// </summary>"}}
        {{:"/// <returns></returns>"}}
        public void Select{{:TableName}}Details()
        {{:"{"}}
            DataTable dt = sqlManager.ExcecuteDataTable("Select{{:TableName}}Details", CommandType.StoredProcedure, new List<SqlParameter>() {{:"{"}} 
                SQL.SQLParameter("{{:IdentityColumn}}", {{:IdentityEnumType}}, {{:IdentityColumn}})
            {{:"}"}});

            if (dt.Rows.Count > 0)
            {{:"{"}}
                {{for Columns}}{{:ColumnName}} = dt.GetDataCellValue(0, "{{:ColumnName}}"){{if IsIntColumn}}.ToInt32(){{/if}};
                {{/for}}
            {{:"}"}}
        {{:"}"}}

        {{:"/// <summary>"}}
        {{:"/// Selects a list of all "}}{{:TableName}} {{:"for the search criteria"}}
        {{:"/// </summary>"}}
        {{:"/// <returns></returns>"}}
        public List{{:"<"}}{{:TableName}}{{:">"}} Select{{:TableName}}ListSearch(string searchValue)
        {{:"{"}}
            List{{:"<"}}{{:TableName}}{{:">"}} list = new List{{:"<"}}{{:TableName}}{{:">"}}();

            DataTable dt = sqlManager.ExcecuteDataTable("Select{{:TableName}}ListSearch", CommandType.StoredProcedure, new List<SqlParameter>() {{:"{"}} 
                SQL.SQLParameter("SearchValue", SqlDbType.VarChar, searchValue)
            {{:"}"}});

            if (dt.Rows.Count > 0)
            {{:"{"}}
                list = (from d in dt.AsEnumerable()
                        select new {{:TableName}}
                        {{:"{"}}
                            {{for Columns}}{{:ColumnName}} = d.Field{{:"<"}}{{:DataType}}{{:">"}}("{{:ColumnName}}"),
                            {{/for}}
                        {{:"}"}}).ToList{{:"<"}}{{:TableName}}{{:">"}}();
            {{:"}"}}

            return list;
        {{:"}"}}

        #endregion

        #region Insert Update Methods

        {{:"/// <summary>"}}
        {{:"/// Inserts or updates the specified "}}{{:TableName}}
        {{:"/// </summary>"}}
        public void InsertUpdate{{:TableName}}()
        {{:"{"}}
            sqlManager.ExcecuteNonQuery("InsertUpdate{{:TableName}}", CommandType.StoredProcedure, new List<SqlParameter>()
            {{:"{"}} 
                {{for Columns}}SQL.SQLParameter("{{:ColumnName}}", {{:EnumDataType}}, {{:ColumnName}}),
                {{/for}}SQL.SQLParameter("{{:IdentityColumn}}Out", {{:IdentityEnumType}}, 4, ParameterDirection.Output)
            {{:"}"}});

            //Set output values
            if (sqlManager.CurrentCommand != null)
            {{:"{"}}
                if (sqlManager.CurrentCommand.Parameters["{{:IdentityColumn}}Out"].Value != DBNull.Value)
                {{:"{"}}
                    {{:IdentityColumn}} = ({{:IdentityType}})sqlManager.CurrentCommand.Parameters["{{:IdentityColumn}}Out"].Value;
                {{:"}"}}
            {{:"}"}}
        {{:"}"}}

        #endregion

        #region Delete Methods

        {{:"/// <summary>"}}
        {{:"/// Deletes the specified "}}{{:TableName}}
        {{:"/// </summary>"}}
        public void Delete{{:TableName}}()
        {{:"{"}}
            sqlManager.ExcecuteNonQuery("Delete{{:TableName}}", CommandType.StoredProcedure, new List<SqlParameter>() {{:"{"}} 
                SQL.SQLParameter("{{:IdentityColumn}}", {{:IdentityEnumType}}, {{:IdentityColumn}})
            {{:"}"}});
        {{:"}"}}

        #endregion
    {{:"}"}}
{{:"}"}}