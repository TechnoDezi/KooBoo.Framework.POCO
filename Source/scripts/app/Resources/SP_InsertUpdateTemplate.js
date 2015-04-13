-- =============================================
-- Author:		{{:author}}
-- Create date: 
-- Description:	Inserts or updates a {{:TableName}}
-- =============================================
CREATE PROCEDURE [dbo].[InsertUpdate{{:TableName}}]
(
{{for Columns}}@{{:ColumnName}} {{:SQLDatType}},
{{/for}}@{{:IdentityColumn}}Out {{:IdentitySQLDatType}} Output
)
AS
BEGIN
	SET NOCOUNT ON;

--Check to insert
IF(@{{:IdentityColumn}} = 0)
BEGIN
		
INSERT INTO [dbo].[{{:TableName}}]
(
    {{for Columns}}[{{:ColumnName}}],
    {{/for}}
)
VALUES 
(
    {{for Columns}}@{{:ColumnName}},
    {{/for}}
)

SET @{{:IdentityColumn}}Out = SCOPE_IDENTITY()

END
ELSE
BEGIN
		
UPDATE [dbo].[{{:TableName}}]
SET 
    {{for Columns}}[{{:ColumnName}}] = @{{:ColumnName}},
    {{/for}}
WHERE
    {{:IdentityColumn}} = @{{:IdentityColumn}}

SET @{{:IdentityColumn}}Out = @{{:IdentityColumn}}
END
END