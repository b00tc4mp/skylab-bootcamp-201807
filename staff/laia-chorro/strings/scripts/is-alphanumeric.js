function isAlphaNumeric(string) {
    var regexAlphaNumeric = /[A-Za-z0-9à-úçñ'·ý]/; // Any alphanumeric symbol including accents

    return string && string.match(regexAlphaNumeric);
}