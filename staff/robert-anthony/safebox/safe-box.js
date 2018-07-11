safeBox = (function setupSafebox () {
  var _secret;
  var _password = "123";

  return {

    failPassword: function(password) {
      return (typeof password !== "string" || password === "" || password !== _password);
    },
    failNewPassword: function(newPassword){
      return (typeof newPassword !== "string" || newPassword === "" );

    },

    WRONG_PASSWORD:"wrong password",
    WRONG_NEW_PASSWORD:"wrong new password",
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
      if (this.failPassword(password)) throw new Error(this.WRONG_PASSWORD);
      _password = password;
      _secret = secret;
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
      // TODO
      if (this.failPassword(password)) throw new Error(this.WRONG_PASSWORD);
      return _secret;
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
      if (this.failPassword(password)) throw new Error(this.WRONG_PASSWORD);
      if (this.failNewPassword(newPassword)) throw new Error(this.WRONG_NEW_PASSWORD);
    _password = newPassword;
    }
  }

})();

