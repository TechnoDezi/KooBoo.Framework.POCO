-- =============================================
-- Author:		{{:author}}
-- Create date: 
-- Description:	Delete the specified {{:TableName}}
-- =============================================
CREATE PROCEDURE [dbo].[Delete{{:TableName}}]
(
    {{for IdentityColumns}}@{{:IdentityColumn}} {{:IdentitySQLDatType}}{{:LineEnding}}
    {{/for}}
)
AS
BEGIN
	SET NOCOUNT ON;

    DELETE FROM {{:TableName}}
    WHERE
        {{for IdentityColumns}}{{:IdentityColumn}} = @{{:IdentityColumn}}{{:AndLineEnding}}
        {{/for}}

END