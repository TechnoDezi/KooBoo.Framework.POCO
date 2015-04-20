-- =============================================
-- Author:		{{:author}}
-- Create date: 
-- Description:	Selects the details for the specified {{:TableName}}
-- =============================================
CREATE PROCEDURE [dbo].[Select{{:TableName}}Details]
(
	@{{:IdentityColumn}} {{:IdentitySQLDatType}}
)
AS
BEGIN
	SET NOCOUNT ON;

	SELECT
        {{:IdentityColumn}},
        {{for Columns}}{{:ColumnName}}{{:LineEnding}}
        {{/for}}
	FROM
        {{:TableName}}
	WHERE
		{{:IdentityColumn}} = @{{:IdentityColumn}}
END