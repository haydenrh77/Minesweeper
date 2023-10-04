I implemented my game by generating a 2d Array that holds the state of every square. The mines will be randomly generated each time. When you click on a square, it runs calculations to see if it is a mine and you lost or if it should be revealed. If it should be revealed then it runs checks to see if the squares around it should be revealed as well (if they are blank). You can right click a sqaure to flag/unflag it. The number of flags remaining is displayed above the game. You are able to choose the size of the grid and the number of mines. Flag all mines to win.

The Game grid on the grid.html page is an html table that uses CSS to be the correct size and it is generated using JavaScript (the generateGrid() function in the "model.js" and the gen() function in the "view.js").

On the grid.html page there are 2 text inputs that determine the size of the grid. There is a select to determine the number of mines. And there are two buttons, one creates the new grid with the specified size and mines, and the other loads the game.

You can left click on a square to reveal it, or right click to add/remove a flag.

The flags counter above the grid is dynamically modified during the game using innerHTML. The whole grid is modified when you change the size or load the page.

Clicking "Load Game" on the grid.html page uses XMLHttpRequest to load the JSON game data from "gameState.json" into the game. It displays the data on the grid.

There are audio tags that play background music when the game loads as well as when placing/removing flags or winning/losing.

There is also the smiley/frowny face that uses the canvas element to be drawn. If you lose it becomes a frowny face with x's for eyes. The text that appears next to it when you win or lose is also drawn using a canvas element.