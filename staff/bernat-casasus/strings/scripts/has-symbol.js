// has symbol

function hasSymbol(string) {
    return /[^\w\sà-úÀ-Úä-üÄ-Üâ-ûñç]/.test(string);
}
