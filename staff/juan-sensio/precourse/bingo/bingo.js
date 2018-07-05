// bingo
function bingo() {

	// cartón
	var Board = function() {
		
		this.board = [];
		this.size = [0, 0];
		this.range = [0, 0];
		this.cnt = 0;
		this.completed = false;
		this.linea = false;

		this.init = function(boardSize, boardRange) {
			if(verbose)
				console.log("inicializando cartón.")
			this.size = boardSize;
			this.range = boardRange;
			
			var nums = [];
			var cnt = 0;
			for (var i = this.range[0]; i <= this.range[1]; i++) {
				nums.push(i);
				cnt++;
			}

			if(cnt < this.size[0]*this.size[1])
				alert("El rango es menor que el tamaño del cartón !");
			else {
				for (var i = 0; i < this.size[0]; i++) {
					var line = [];
					for (var j = 0; j < this.size[1]; j++) {
						//line.push(Math.floor(Math.random()*(this.range[1] - this.range[0]) + this.range[0]));	
						var id = Math.floor(Math.random()*nums.length);
						line.push(nums[id]);
						nums.splice(id,1);
					}
					this.board.push(line);
				}
				if(verbose) {
					console.log("Cartón inicializado.");
					console.log(this.board);
				}
			}
		}
		this.check = function(num) {
			var lineaCnt;
			for (var i = 0; i < this.size[0]; i++) {
				lineaCnt = 0;
				for (var j = 0; j < this.size[1]; j++) {
					if(num == this.board[i][j]) {
						console.log("Tienes el número "+num+" !!!");
						this.board[i][j] = "X";
						this.cnt++;
					}		
					if (this.board[i][j] == "X")
						lineaCnt++;
				}	
				if(!this.linea && lineaCnt == this.size[1]) {
					console.log("Linea !!!");
					this.linea = true;
				}
			}
			
			if(this.cnt == this.size[0]*this.size[1]) {
				this.completed = true;
				console.log("BINGO !!!")
			}
		}
		this.print = function() {
			console.log(" CARTÓN ")
			for (var i = 0; i < this.size[0]; i++) {
				var line = "|";
				for (var j = 0; j < this.size[1]; j++) {
					line += "| "+this.board[i][j]+" ";
				}
				console.log(line + "||")
			}
		}
	} 

	// game manager
	var Manager = function() {

		this.score = [];
		this.init = function() {
			this.it = 0;
			this.endTurn = false;
			this.gameOver = false;
			this.name = "Unknown";
			this.range = [0, 0];
			this.nums = [];
		}
		this.play = function(board, range) {
			this.range = range;
			for (var i = this.range[0]; i <= this.range[1]; i++) 
				this.nums.push(i);
			while(!this.endTurn) 
				this.endTurn = this.turn(board);
			console.log("Has terminado en "+this.it+" turnos");
			this.setScore();
			this.gameOver = this.newGame();
		}
		this.turn = function(board) {
			// ask for new turn
			var newTurn = confirm("Jugar otro turno ?");
			if(!newTurn)
				return true;
			this.it++;
			// generate number
			//var num = Math.floor(Math.random()*(board.range[1] - board.range[0]) + board.range[0]);
			var id = Math.floor(Math.random()*this.nums.length);
			var num = this.nums[id];
			this.nums.splice(id,1);
			console.log("Turno: "+this.it+", Número: "+num);
			// check if num is in board
			board.check(num);
			// print board
			board.print();
			// return if board is completed (end game) or not (continue game)
			return board.completed;
		}
		this.greet = function() {
			this.init();
			this.name = prompt(" BINGO \n Por favor, introduce tu nombre. ");
			console.log(" Bienvenido, " + this.name + "!");
		}
		this.newGame = function() {
			var oneMoreTime = prompt(" BINGO \n Quieres jugar otra partida ? (y/n) ");
			if(oneMoreTime == "n")
				return true;
			return false;
		}
		this.setScore = function() {
			console.log("Tabla de resultados:");
			this.score.push({Turnos: this.it, Nombre: this.name});
			this.score.sort(function(a, b) {
				return a.Turnos - b.Turnos;
			});
			console.table(this.score);
		}
	}

	var verbose = false;
	// tamaño del cartón (Vertical x Horizontal)
	var boardSize = [3, 5];
	// rango de números en el juego
	var rangeNum = [1, 25];

	var manager = new Manager();
	while(!manager.gameOver) {
		manager.greet();
		var board = createBoard(boardSize, rangeNum);
		manager.play(board, rangeNum);
	}
	console.log("Adiós !")

	function createBoard(size, range) {
		var board;
		while(true) {
			board = new Board();
			board.init(size, range);
			board.print();
			var ok = prompt("Quieres cambiar el cartón ? (y/n)");
			if (ok == "n")
				break;
		}
		return board;
	}
}

