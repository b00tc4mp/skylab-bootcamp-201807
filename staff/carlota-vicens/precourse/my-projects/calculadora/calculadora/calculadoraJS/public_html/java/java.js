/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function c(val)
{
    document.getElementById("d").value = val;
}
function v(val)
{
    document.getElementById("d").value += val;
}
function e()
{
    try
    {
        c(eval(document.getElementById("d").value))
    } catch (e) {
        c('Error')
    }
}
