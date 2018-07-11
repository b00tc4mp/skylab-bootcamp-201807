safeBox = (function () {
  var _secret;
  var _password = "123";

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
      if (password !== _password) throw new Error("wrong password");
      _password = password;
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
    }
  }

})();

safeBox.setSecret("abc");
console.log(safeBox.getSecret());

