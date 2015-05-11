-- =============================================
-- Author:		{{:author}}
-- Create date: 
-- Description:	Inserts or updates a {{:TableName}}
-- =============================================
CREATE PROCEDURE [dbo].[InsertUpdate{{:TableName}}]
(
    {{for IdentityColumns}}@{{:IdentityColumn}} {{:IdentitySQLDatType}},
    {{/for}}{{for Columns}}@{{:ColumnName}} {{:SQLDatType}},
    {{/for}}{{for IdentityColumns}}@{{:IdentityColumn}}Out {{:IdentitySQLDatType}} Output{{:LineEnding}}
    {{/for}}
)
AS
BEGIN
	SET NOCOUNT ON;

--Check to insert
IF(@{{:IdentityColumn}} = 0)
BEGIN
		
INSERT INTO [dbo].[{{:TableName}}]
(
    {{for Columns}}[{{:ColumnName}}]{{:LineEnding}}
    {{/for}}
)
VALUES 
(
    {{for Columns}}@{{:ColumnName}}{{:LineEnding}}
    {{/for}}
)

SET @{{:IdentityColumn}}Out = SCOPE_IDENTITY()

END
ELSE
BEGIN
		
UPDATE [dbo].[{{:TableName}}]
SET 
    {{for Columns}}[{{:ColumnName}}] = @{{:ColumnName}}{{:LineEnding}}
    {{/for}}
WHERE
    {{for IdentityColumns}}{{:IdentityColumn}} = @{{:IdentityColumn}}{{:AndLineEnding}}
    {{/for}}

{{for IdentityColumns}}SET @{{:IdentityColumn}}Out = @{{:IdentityColumn}}
{{/for}}
END
END