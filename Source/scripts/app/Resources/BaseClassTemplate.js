using KooBoo.Framework.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace {{:namespace}}
{{:"{"}}
    public abstract class {{:baseClass}}
    {{:"{"}}
        internal string _connectionString;
        internal SqlDataManager sqlManager;

        public {{:baseClass}}()
        {{:"{"}}
            _connectionString = ((KooBoo.Framework.Models.AppTenant)System.Web.HttpContext.Current.Session["CurrentTenant"]).ConnectionString;

            sqlManager = new SqlDataManager(null, _connectionString);
        {{:"}"}}
    {{:"}"}}
{{:"}"}}