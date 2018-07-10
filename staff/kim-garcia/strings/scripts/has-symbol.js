
// has symbol

function hasSymbol(string) {
    return /[^\w\sà-úÀ-Úä-üÄ-Üâ-ûñç]/.test(string); //excluye todo eso. Si no es algo de eso da true
}