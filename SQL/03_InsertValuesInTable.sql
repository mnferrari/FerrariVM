-- =============================================
-- Author:	Martin Ferrari
-- Create date: 8/6/2018
-- Description:	Adding users into table
-- =============================================

USE [UserManagement]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


BEGIN TRY	
	BEGIN TRANSACTION 
		
		Insert into [User] (Name, LastName, Email, Password)
		values	('Martin', 'Ferrari', 'mnferrari@gmail.com','1234'),
				('Gaston', 'Mansilla', 'gezem04@gmail.com','4321'),
				('Anabel', 'Leanza', 'anabel.leanza@gmail.com','1298')
		
	
	COMMIT TRANSACTION 
END TRY
BEGIN CATCH
  IF(@@trancount > 0)
	ROLLBACK TRANSACTION 
  -- Raise an error with the details of the exception
  DECLARE @ErrMsg nvarchar(4000), @ErrSeverity int
  SELECT @ErrMsg = ERROR_MESSAGE(),
		 @ErrSeverity = ERROR_SEVERITY()

  RAISERROR(@ErrMsg, @ErrSeverity, 1)
END CATCH