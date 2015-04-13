-- =============================================
-- Author:		{{:author}}
-- Create date: 
-- Description:	Delete the specified {{:TableName}}
-- =============================================
CREATE PROCEDURE [dbo].[Delete{{:TableName}}]
(
	@{{:IdentityColumn}} {{:IdentitySQLDatType}}
)
AS
BEGIN
	SET NOCOUNT ON;

    DELETE FROM {{:TableName}}
    WHERE {{:IdentityColumn}} = @{{:IdentityColumn}}

END