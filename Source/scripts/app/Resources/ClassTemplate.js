using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Data.SqlClient;
using KooBoo.Framework;
using KooBoo.Framework.Data;

namespace {{:namespace}}
{{:"{"}}
    public class {{:TableName}} {{if exportBase}}: {{:baseClass}}{{/if}}{{if exportInterface}} ,I{{:TableName}}{{/if}}
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
        public void GetDetails()
        {{:"{"}}
            try
            {{:"{"}}
                DataTable dt = sqlManager.ExcecuteDataTable("Get{{:TableName}}Details", CommandType.StoredProcedure, new List<SqlParameter>() {{:"{"}} 
                    {{for IdentityColumns}}SQL.SQLParameter("{{:IdentityColumn}}", {{:IdentityEnumType}}, {{:IdentityColumn}}){{:LineEnding}}
                    {{/for}}
                {{:"}"}});

                if (dt.Rows.Count > 0)
                {{:"{"}}
                    {{for Columns}}{{:ColumnName}} = dt.GetDataCellValue(0, "{{:ColumnName}}"){{if IsIntColumn}}.ToInt32(){{else IsDateTimeColumn}}.ToDateTime(){{else IsBoolColumn}}.ToBoolean(){{/if}};
                    {{/for}}
                {{:"}"}}
            {{:"}"}}
            catch (Exception ex)
            {{:"{"}}
                LogError(ex.Message, ex, "{{:namespace}}.{{:TableName}}.Select{{:TableName}}Details");
            {{:"}"}}
            finally
            {{:"{"}}
                sqlManager.CloseConnectionNoTransaction();
            {{:"}"}}
        {{:"}"}}

        {{:"/// <summary>"}}
        {{:"/// Selects a list of all "}}{{:TableName}} {{:"for the search criteria"}}
        {{:"/// </summary>"}}
        {{:"/// <returns></returns>"}}
        public List{{:"<"}}{{if exportInterface}}I{{/if}}{{:TableName}}{{:">"}} GetListSearch(string searchValue)
        {{:"{"}}
            List{{:"<"}}{{if exportInterface}}I{{/if}}{{:TableName}}{{:">"}} list = new List{{:"<"}}{{:TableName}}{{:">"}}();

            try
            {{:"{"}}
                DataTable dt = sqlManager.ExcecuteDataTable("Get{{:TableName}}ListSearch", CommandType.StoredProcedure, new List<SqlParameter>() {{:"{"}} 
                    SQL.SQLParameter("SearchValue", SqlDbType.VarChar, searchValue)
                {{:"}"}});

                if (dt.Rows.Count > 0)
                {{:"{"}}
                    list = (from d in dt.AsEnumerable()
                            select new {{:TableName}}
                            {{:"{"}}
                                {{for Columns}}{{:ColumnName}} = d.Field{{:"<"}}{{:DataType}}{{:">"}}("{{:ColumnName}}"),
                                {{/for}}
                            {{:"}"}}).ToList{{:"<"}}{{if exportInterface}}I{{/if}}{{:TableName}}{{:">"}}();
                {{:"}"}}
            {{:"}"}}
            catch (Exception ex)
            {{:"{"}}
                LogError(ex.Message, ex, "{{:namespace}}.{{:TableName}}.Select{{:TableName}}ListSearch");
            {{:"}"}}
            finally
            {{:"{"}}
                sqlManager.CloseConnectionNoTransaction();
            {{:"}"}}

            return list;
        {{:"}"}}

        #endregion

        #region Insert Update Methods

        {{:"/// <summary>"}}
        {{:"/// Inserts or updates the specified "}}{{:TableName}}
        {{:"/// </summary>"}}
        public void AddUpdate()
        {{:"{"}}
            try
            {{:"{"}}
                sqlManager.ExcecuteNonQuery("AddUpdate{{:TableName}}", CommandType.StoredProcedure, new List<SqlParameter>()
                {{:"{"}} 
                    {{for Columns}}SQL.SQLParameter("{{:ColumnName}}", {{:EnumDataType}}, {{:ColumnName}}),
                    {{/for}}{{for IdentityColumns}}SQL.SQLParameter("{{:IdentityColumn}}Out", {{:IdentityEnumType}}, 4, ParameterDirection.Output){{:LineEnding}}
                    {{/for}}
                {{:"}"}});

                //Set output values
                if (sqlManager.CurrentCommand != null)
                {{:"{"}}
                    {{for IdentityColumns}}
                        if (sqlManager.CurrentCommand.Parameters["{{:IdentityColumn}}Out"].Value != DBNull.Value)
                        {{:"{"}}
                            {{:IdentityColumn}} = ({{:IdentityType}})sqlManager.CurrentCommand.Parameters["{{:IdentityColumn}}Out"].Value;
                        {{:"}"}}
                    {{/for}}
                {{:"}"}}
            {{:"}"}}
            catch (Exception ex)
            {{:"{"}}
                LogError(ex.Message, ex, "{{:namespace}}.{{:TableName}}.InsertUpdate{{:TableName}}");
            {{:"}"}}
            finally
            {{:"{"}}
                sqlManager.CloseConnectionNoTransaction();
            {{:"}"}}
        {{:"}"}}

        #endregion

        #region Delete Methods

        {{:"/// <summary>"}}
        {{:"/// Deletes the specified "}}{{:TableName}}
        {{:"/// </summary>"}}
        public void Delete()
        {{:"{"}}
            try
            {{:"{"}}
                sqlManager.ExcecuteNonQuery("Delete{{:TableName}}", CommandType.StoredProcedure, new List<SqlParameter>() {{:"{"}} 
                    {{for IdentityColumns}}SQL.SQLParameter("{{:IdentityColumn}}", {{:IdentityEnumType}}, {{:IdentityColumn}}){{:LineEnding}}
                    {{/for}}
                {{:"}"}});
            {{:"}"}}
            catch (Exception ex)
            {{:"{"}}
                LogError(ex.Message, ex, "{{:namespace}}.{{:TableName}}.Delete{{:TableName}}");
            {{:"}"}}
            finally
            {{:"{"}}
                sqlManager.CloseConnectionNoTransaction();
            {{:"}"}}
        {{:"}"}}

        #endregion
    {{:"}"}}
{{:"}"}}