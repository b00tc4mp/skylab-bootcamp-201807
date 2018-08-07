safeBox = (function setupSafebox () {
    var secretMessage;
    var pass = "123";
  
    return {
      /**
       * Keeps the secret safe
       *
       * @param {string} password The access password
       * @param {string} secret The secret to keep safe
       *
       * @throws {Error} If password is wrong
       */
      keep: function(password, secret) {
        // TODO
        if (typeof password !== "string" || password === "" || password !== pass) throw new Error("wrong password");
        pass = password;
        secretMessage = secret;
      },
  
      /**
       * Retrieves the secret
       *
       * @param {string} password The access password
       *
       * @returns {string} The secret
       *
       * @throws {Error} If wrong password
       */
      retrieve: function(password) {
        // TODO0
        if (typeof password !== "string" || password === "" || password !== pass) throw new Error("wrong password");
        return secretMessage;
      },
  
      /**
       * Updates the access password
       *
       * @param {string} password The current password
       * @param {string} newPassword The new password
       *
       * @throws {Error} If current and/or new password are wrong
       */
      updatePassword(password, newPassword) {
        // TODO
        if (typeof password !== "string" || password === "" || password !== pass) throw new Error("wrong password");
        if (typeof newPassword !== "string" || newPassword === "" ) throw new Error("wrong new password");
      pass = newPassword;
      }
    }
  
  })();