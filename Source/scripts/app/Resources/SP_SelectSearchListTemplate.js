﻿-- =============================================
-- Author:		{{:author}}
-- Create date: 
-- Description:	Selects a list of all {{:TableName}} for the search criteria
-- =============================================
CREATE PROCEDURE [dbo].[Get{{:TableName}}ListSearch]
(
	@SearchValue Varchar(500)
)
AS
BEGIN
	SET NOCOUNT ON;

	SET @SearchValue = ISNULL(@SearchValue, '')

	SELECT
        {{for IdentityColumns}}[{{:IdentityColumn}}],
        {{/for}}{{for Columns}}[{{:ColumnName}}]{{:LineEnding}}
        {{/for}}
	FROM
        [{{:TableName}}]
	WHERE
		(
			ReferenceDescription Like '%' + @SearchValue + '%'
		)
	ORDER BY
		ReferenceDescription
END