/*function insertForm(){
var p = document.getElementById("form");
p.insertAdjacentHTML("afterbegin","<div>Hi</div>");
}*/



function insertForm() {
  document.getElementById("insertAfterHere").insertAdjacentHTML("afterend", "<form id='hiddenForm' onsubmit='hideForm();return false;'>"
  	+"<label for='fname'>First Name</label>"
  	+"<input type='text' id='name1stPlayer' value=''>"
  	+"<input type='submit' value='Submit'></form>");
  document.getElementById("toHide").style.display = "none";
  var name1stPlayer = document.getElementById("name1stPlayer").value;
  document.getElementById("namePlayer1").innerHTML = name1stPlayer;
}

function hideForm(){
	document.getElementById("hiddenForm").style.display = "none";
}

/*
'<form action="add.php" method="post" onSubmit="track(\'P1\');">'+
'<input type="hidden" name="add" value="true"> '+
'<input type="hidden" name="item" value="P1"> '+
'<input type="hidden" name="pID" value="3"> '+
'<input type="hidden" name="qty" value="1"> '+      
'<input name="image" type="image" onMouseOver="this.src=\'/img/shop/r_addbasket.png\'" '+
'onMouseOut="this.src=\'/img/shop/addbasket.png\'" '+
'value="Add to Basket" src="/img/shop/addbasket.png" alt="AddtoBasket"></form>';
*/