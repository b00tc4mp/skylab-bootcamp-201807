'use strict'
 
 module.exports = id => {
    if (id == null || id == false || typeof id !== "string") return false
    
    return /^\d+$/.test(id)
 }
 