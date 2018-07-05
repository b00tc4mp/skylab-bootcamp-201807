# BINGO

## Instructions

To initiate the **Bingo** game the user must execute the bingo.js file in the console.

## Usage

- Insert your name when asked.
- Get a card or ask for another one if you don't like it.
- Get a number from the roller, show an **X** if it matches with one number of your card.
- Confirm to get a new number from the roller and play a new round.
- LINE will be called when you achieved all the numbers from a line.
- The game will end when all numbers on your bingo card are marked as **X**.
- 
- Play a new game optionally.





Realiza un programa que simule un Bingo. Cuando se ejecute, pedirá el nombre del jugador y 
deberá guardarse. Durante el primer turno se mostrará un cartón con 15 números (excluyendo el 0 siempre),
 para pasar al siguiente turno el usuario deberá confirmar mediante confirm() visualizándose otro número,
  si coincide con alguno de los existentes en el cartón, cambiará por una "X" o un 0. 
  El cartón se mostrará, al final de cada turno, con los cambios efectuados, indicándole al usuario 
  qué número se ha encontrado. El programa deberá preguntar al usuario al inicio de cada turno si 
  desea continuar, en caso de que se continúe, seguirá el mismo patrón que hasta el momento.

Por supuesto, cuando todos los números de una misma linea estén en "X", mostrará un mensaje "LINEA!",
 pero la ejecución seguirá, el juego solo acabará cuando todos los números estén a "X".

Cuando el juego concluya, deberá decirle al usuario en cuantos turnos se ha completado el cartón.
 Por último, deberá preguntar si desea volver a jugar.