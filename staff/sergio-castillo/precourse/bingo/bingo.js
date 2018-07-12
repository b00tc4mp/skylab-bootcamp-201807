function bingo(){
	var card =[3,12,45,60,72,7,25,34,53,69,13,27,39,58,81];
	var number;
	var count=0;
	var line=0;
	function namePlayers (){
		return prompt ("Introduce your user name");
	}
	function generateRandom(){
		return (Math.random()*90).toFixed();
	}
	/*function newCard(arguments){
		for (var i=0;i<15;i++){
			arguments.push (generateRandom());
		}
		return arguments;
	}*/
	function checkCard(){
		for (var i=0; i<card.length;i++){
			if (card[i]===parseInt(number)){
				console.log ("You have a match with this number!: ");
				count=count+1;
				card[i]="X";		
				console.log(card.slice(0,5)+("\n")+card.slice(5,10)+("\n")+card.slice(10));
			}
		}
	}
	function checkLine(){
		if ((card[0]==="X")&&(card[1]==="X")&&(card[2]==="X")&&(card[3]==="X")&&(card[4]==="X")){
			line=line+1;
		}else if ((card[5]==="X")&&(card[6]==="X")&&(card[7]==="X")&&(card[8]==="X")&&(card[9]==="X")){
			line=line+1;
		}else if ((card[10]==="X")&&(card[11]==="X")&&(card[12]==="X")&&(card[13]==="X")&&(card[14]==="X")){
			line=line+1;
		}
	}
	function startPlay(){
		var user= namePlayers();
		console.log ("Welcome to your first bingo "+user);
		console.log ("This is your bingo card: ");
		console.log(card.slice(0,5)+("\n")+card.slice(5,10)+("\n")+card.slice(10));
		while (count<15){
			if (confirm("Do you want to play a new turn?")===true){
				number = generateRandom();
				console.log("The new number is: "+number);
				checkCard();
				checkLine();
				if (line===1){
					console.log ("You have a LINE!");
				}
			}else{
				return alert ("Your game is over");
			}
		}
		console.log ("YOU WIN! CONGRATULATIONS!");
		
	}
	startPlay();
}
bingo();


