-- =============================================
-- Author:		Martin Ferrari
-- Create date: 10/6/2018
-- Description:	Add user
-- Modified:	
-- =============================================

use UserManagement
GO

CREATE PROCEDURE uspUpdateUser 
(
@Id int,
@Name varchar(50),
@LastName varchar(50),
@Email varchar(50),
@Password varchar(8)	
)
AS
BEGIN
	DECLARE @ErrNum int
	SET @ErrNum = 0
	BEGIN TRY	
		SET NOCOUNT ON;
		BEGIN TRANSACTION 

			update [User] 
			set [Name] = @Name, 
				LastName = @LastName, 
				Email = @Email, 
				[Password] = @Password
			where Id = @Id
		
		COMMIT TRANSACTION
	END TRY
	BEGIN CATCH
	  IF(@@trancount > 0)
		ROLLBACK TRANSACTION
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

