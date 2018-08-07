var safebox = function (newSecret) {
  var _secretObject = {"secret": "abcd"}
  return {referenceToSecretObject: _secretObject};

}();


console.log(safebox);
safebox.referenceToSecretObject.secret = "def";
console.log(safebox);