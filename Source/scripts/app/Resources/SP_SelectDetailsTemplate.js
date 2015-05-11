-- =============================================
-- Author:		{{:author}}
-- Create date: 
-- Description:	Selects the details for the specified {{:TableName}}
-- =============================================
CREATE PROCEDURE [dbo].[Select{{:TableName}}Details]
(
    {{for IdentityColumns}}@{{:IdentityColumn}} {{:IdentitySQLDatType}}{{:LineEnding}}
    {{/for}}
)
AS
BEGIN
	SET NOCOUNT ON;

	SELECT
        {{for IdentityColumns}}[{{:IdentityColumn}}],
        {{/for}}{{for Columns}}[{{:ColumnName}}]{{:LineEnding}}
        {{/for}}
	FROM
        [{{:TableName}}]
	WHERE
		{{for IdentityColumns}}{{:IdentityColumn}} = @{{:IdentityColumn}}{{:AndLineEnding}}
        {{/for}}
END