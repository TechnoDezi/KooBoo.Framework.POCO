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
        public SqlDataManager sqlManager;
        public Error error {{:"{"}} get; set; {{:"}"}}

        public {{:baseClass}}()
        {{:"{"}}
            sqlManager = new SqlDataManager("DefaultConnection", null);
            error = new Error();
        {{:"}"}}

        public async Task LogError(string message, Exception exception, string logger)
        {{:"{"}}
            try
            {{:"{"}}
                error.Message = message;
                error.IsError = true;

                //Log entity errors here

            {{:"}"}}
            catch
            {{:"{"}}
                throw;
            {{:"}"}}
        {{:"}"}}
    {{:"}"}}
{{:"}"}}