safeBox = (function () {
  var secret;

  return {
    setSecret: function (newSecret) {
    secret = newSecret;
    },
    getSecret: function(){
      return secret;
    }
  }

})();

safeBox.setSecret("abc");
console.log(safeBox.getSecret());