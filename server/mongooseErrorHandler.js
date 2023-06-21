function handleUniqueConstraintError(err) {
    if (err.code === 11000 && err.keyPattern && err.keyPattern.hasOwnProperty('username')) {
      var errorMessage = "This username is already taken!";
      console.error(errorMessage);
      return errorMessage;
    }else{
      return err.errorMessage;
    }
  }

export default handleUniqueConstraintError;