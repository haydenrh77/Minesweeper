var grid = [
	["0","0","X","0","0","X","0","0","0","X"],
	["0","0","2","2","1","3","X","0","0","0"],
	["0","F","1","-","-","2","X","0","0","0"],
	["0","0","1","-","-","1","1","0","0","0"],
	["-","-","-","-","-","-","1","0","0","0"],
	["-","-","-","-","-","-","1","F","X","0"],
	["1","1","1","-","-","-","1","2","3","X"],
	["0","F","1","-","-","-","-","-","1","1"],
	["0","0","1","1","1","2","2","2","1","0"],
	["0","0","0","0","F","0","F","X","1","0"]
	];
var height = 10;
var width = 10;
var mines = 14;
var flags = mines;
var gameOver = false;

function getSpace(row, col) {
    return grid[row][col];
}
function getMines() {
    return mines;
}
function getWidth() {
    return width;
}
function getHeight() {
    return height;
}
function downFlag() {
    if (flags > 0) {
		flags--;
		document.getElementById('Flag').play();
		return true;
	}
	else { return false; }
}
function upFlag() {
    flags++;
	document.getElementById('Flag').play();
	return 0;
}
function getFlags() {
    return flags;
}

function generateGrid() {
	gameOver = false;
	document.getElementById('Music').play();
	draw();
	draw("smile");
	grid = undefined;
	var rowsTxt = document.getElementById("gridRows");
    height = parseInt(rowsTxt.value);
	var colsTxt = document.getElementById("gridCols");
    width = parseInt(colsTxt.value);
	var minesSelect = document.getElementById("mineChoice");
	mines = parseInt(minesSelect.value);
	if (mines > height * width) {
		console.log("Error, too many mines")
		mines = (height * width) - 1;
		var element = document.getElementById("mineChoice");
    	element.value = mines;
	}
	flags = mines;
	
	//create grid
	grid = new Array(height);
	for (var i = 0; i < grid.length; i++) { 
		grid[i] = new Array(width);
	}
	
	//initialize grid
	for (var i = 0; i < height; i++) { 
		for (var j = 0; j < width; j++) {
			grid[i][j] = 0;
		}
	}
	
	//add mines
	for (var i = 0; i < mines; i++) {
		var randH = Math.floor(Math.random() * height);
		var randW = Math.floor(Math.random() * width);
		if (grid[randH][randW] != "X") {
			grid[randH][randW] = "X";
		}
		else {
			i--;
		}
	}


	//fill in numbers
	
	for (var i = 0; i < height; i++) { 
		for (var j = 0; j < width; j++) {
			if (grid[i][j] == "X") {
				if ((i < height - 1) && (j < width - 1) && 	(grid[i+1][j+1] != "X")) { 	grid[i+1][j+1] 	+= 1; }
				if ((j < width - 1) && 						(grid[i][j+1] != "X")) { 	grid[i][j+1] 	+= 1; }
				if ((j < width - 1) && (i > 0) && 			(grid[i-1][j+1] != "X")) { 	grid[i-1][j+1] 	+= 1; }
				if ((i < height - 1) && 					(grid[i+1][j] != "X")) { 	grid[i+1][j] 	+= 1; }
				if ((i > 0) && 								(grid[i-1][j] != "X")) { 	grid[i-1][j] 	+= 1; }
				if ((i < height - 1) && (j > 0) && 			(grid[i+1][j-1] != "X")) { 	grid[i+1][j-1] 	+= 1; }
				if ((j > 0) && 								(grid[i][j-1] != "X")) { 	grid[i][j-1] 	+= 1; }
				if ((i > 0) && (j > 0) && 					(grid[i-1][j-1] != "X")) { 	grid[i-1][j-1] 	+= 1; }
			}
		}
	}
	
	gen(width,height);
}

function runChecks() {
	if (!gameOver){
		var col = this.cellIndex
		var row = this.parentNode.rowIndex;
		var cell = gridTable.rows[row].cells[col];
		var content = getSpace(row, col);
		if (!cell.innerHTML.includes("F.png")) {

			if (content == "X") {
				gameOver = true;
				document.getElementById('Explosion').play();
				document.getElementById('Music').pause();
				displayAll();
				draw("frown");
				draw("lose");
				document.getElementById('Lose').play();
			}
			else if (content == 0) {
				grid[row][col] = "-";
				uncoverBlanks(row, col);
			}
			else {
				display(row, col);
			}
			if (flags == 0) {
				checkWin();
			}
		}
	}
}

function uncoverBlanks(row,col) {
	display(row,col);
	if ((row < height - 1) && (col < width - 1)) {
		if (grid[row+1][col+1] == 0) {
			grid[row+1][col+1] 	= "-";
			display(row+1,col+1);
			uncoverBlanks(row+1,col+1);
		}
		if (grid[row+1][col+1] > 0) {
			display(row+1,col+1);
		}
	}
	if (col < width - 1) {
		if (grid[row][col+1] == 0) {
			grid[row][col+1] 	= "-";
			display(row,col+1);
			uncoverBlanks(row,col+1);
		}
		if (grid[row][col+1] > 0) {
			display(row,col+1);
		}
	}
	if ((col < width - 1) && (row > 0)) {
		if (grid[row-1][col+1] == 0) { 	
			grid[row-1][col+1] 	= "-";
			display(row-1,col+1);
			uncoverBlanks(row-1,col+1);
		}
		if (grid[row-1][col+1] > 0) {
			display(row-1,col+1);
		}
	}
	if (row < height - 1) {
		if (grid[row+1][col] == 0) { 		
			grid[row+1][col] 	= "-";
			display(row+1,col);
			uncoverBlanks(row+1,col);
		}
		if (grid[row+1][col] > 0) {
			display(row+1,col);
		}
	}
	if (row > 0) {
		if (grid[row-1][col] == 0) { 		
			grid[row-1][col] 	= "-";
			display(row-1,col);
			uncoverBlanks(row-1,col);
		}
		if (grid[row-1][col] > 0) {
			display(row-1,col);
		}
	}
	if ((row < height - 1) && (col > 0)) {
		if (grid[row+1][col-1] == 0) { 	
			grid[row+1][col-1] 	= "-";
			display(row+1,col-1);
			uncoverBlanks(row+1,col-1);
		}
		if (grid[row+1][col-1] > 0) {
			display(row+1,col-1);
		}
	}
	if (col > 0) {
		if (grid[row][col-1] == 0) { 		
			grid[row][col-1] 	= "-";
			display(row,col-1);
			uncoverBlanks(row,col-1);
		}
		if (grid[row][col-1] > 0) {
			display(row,col-1);
		}
	}
	if ((row > 0) && (col > 0)) {
		if (grid[row-1][col-1] == 0) { 	
			grid[row-1][col-1] 	= "-";
			display(row-1,col-1);
			uncoverBlanks(row-1,col-1);
		}
		if (grid[row-1][col-1] > 0) {
			display(row-1,col-+1);
		}
	}
}

function checkWin() {
	if (flags == 0) {
		var gTable = document.getElementById("gridTable");
		gameOver = true;
		for (var i = 0; i < height; i++) { 
			for (var j = 0; j < width; j++) {
				var cell = gTable.rows[i].cells[j];
				if (grid[i][j] == 'X'){
					if (!cell.innerHTML.includes("F.png")) {
						gameOver = false;
					}
				}
				if (cell.innerHTML.includes("0.png")) {
					gameOver = false;
				}
			}
		}
		if (gameOver) {
			document.getElementById('Win').play();
			draw("smile");
			draw("win");
		}
	}
}

function loadState() {
	var xmlrequest = new XMLHttpRequest();
    xmlrequest.open("GET", "gameState.json", false);
    xmlrequest.send(null);
	var jsonResponse = JSON.parse(xmlrequest.responseText);
	flags = jsonResponse["flags"];
	height = jsonResponse["height"];
	width = jsonResponse["width"];
	mines = jsonResponse["mines"];
	gameOver = jsonResponse["gameOver"] == "true";

	document.getElementById('Music').play();
	draw();
	draw("smile");

	grid = undefined;
	grid = new Array(height);
	for (var i = 0; i < height; i++) { 
		grid[i] = new Array(width);
	}
	for (var i = 0; i < height; i++) { 
		for (var j = 0; j < width; j++) {
			grid[i][j] = jsonResponse["grid"][i][j];
		}
	}
	var html = "";
	var simage = imgFolder + "/covered.png";
	
	html += "<table id=\"gridTable\">";
	for (var i = 0; i < height; i++) {
		html += "<tr>";
		for (var j = 0; j < width; j++) {
			html += "<td></td>";
		}
		html += "</tr>";
    }
    html += "</table>";
    var gDiv = document.getElementById("gridDiv");
    gDiv.innerHTML = html;
	
	var gTable = document.getElementById("gridTable");
	
    for (var i = 0; i < height; i++) {
		for (var j = 0; j < width; j++) {
			var content = getSpace(i, j);
			var cell = gTable.rows[i].cells[j];
			if (content == "X" || content == "1" || content == "2" || content == "3" || content == "4" || content == "5" || content == "6" || content == "7" || content == "8"){
				cell.innerHTML = "<img src=\"" + imgFolder + "/0.png" + "\">";
			}
			else if (content == "F"){
				cell.innerHTML = "<img src=\"" + imgFolder + "/" + content +".png" + "\">";
				grid[i][j] = "X";
			}
			else {
				cell.innerHTML = "<img src=\"" + imgFolder + "/" + content +".png" + "\">";
			}
		}
    }

	for (var i = 0; i < height; i++) {
		for (var j = 0; j < width; j++) {
			var content = getSpace(i, j);
			var cell = gTable.rows[i].cells[j];
			if (content == "-"){
				uncoverBlanks(i,j);
			}
		}
    }
	
	var cells = gridTable.getElementsByTagName("td");
	
	for (var i = 0; i < cells.length; i++) {
		cells[i].addEventListener("click", runChecks);
		cells[i].addEventListener('contextmenu', function(ev) {
			ev.preventDefault();
			addFlag(this);
			return false;
		}, false);
	}

	var fDiv = document.getElementById("flagsDiv");
	fDiv.innerHTML = "<b>Flags: " + getFlags() + "</b>";
}