USE [UserManagement]
GO

/****** Object:  StoredProcedure [dbo].[uspGetTypes]    Script Date: 8/6/2018 13:19:49 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[uspGetUsersList] 
	-- Add the parameters for the stored procedure here
AS
BEGIN
	DECLARE @ErrNum int
	SET @ErrNum = 0
	BEGIN TRY
		
		SET NOCOUNT ON;

		Select Id, [Name], LastName, Email, [Password] from [User]
		
	END TRY
	BEGIN CATCH
	  -- Raise an error with the details of the exception
	  DECLARE @ErrMsg nvarchar(4000), @ErrSeverity int
	  SELECT @ErrMsg = ERROR_MESSAGE(),
			 @ErrSeverity = ERROR_SEVERITY(),
		 @ErrNum = @@ERROR

	  RAISERROR(@ErrMsg, @ErrSeverity, 1)
	END CATCH
	RETURN @ErrNum
END
GO