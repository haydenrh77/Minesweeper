var imgFolder = "img";

function gen(width, height) {
    var html = "";
    var i = 0;
	var j = 0;
	var simage = imgFolder + "/covered.png";
	
	html += "<table id=\"gridTable\">";
	for (i = 0; i < height; i++) {
		html += "<tr>";
		for (j = 0; j < width; j++) {
			html += "<td></td>";
		}
		html += "</tr>";
    }
    html += "</table>";
    var gDiv = document.getElementById("gridDiv");
    gDiv.innerHTML = html;
	
	var gTable = document.getElementById("gridTable");
	
    for (i = 0; i < height; i++) {
		for (j = 0; j < width; j++) {
			simage = imgFolder + "/" + "0" +".png";
			var cell = gTable.rows[i].cells[j];
			cell.innerHTML = "<img src=\"" + simage + "\">";
		}
    }
	
	var cells = gridTable.getElementsByTagName("td");
	
	for (i = 0; i < cells.length; i ++) {
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

function displayAll(){
	height = getHeight();
	width = getWidth();
	for (i = 0; i < height; i++) {
		for (j = 0; j < width; j++) {
			uncoverBlanks(i,j);
			display(i,j);
		}
    }
}

function display(row,col){
	var gTable = document.getElementById("gridTable");
	var content = getSpace(row, col);
	var cell = gTable.rows[row].cells[col];
	cell.innerHTML = "<img src=\"" + imgFolder + "/" + content +".png" + "\">";
}

function addFlag(e) {
	if (!gameOver) {
		var col = e.cellIndex
		var row = e.parentNode.rowIndex;
		var gTable = document.getElementById("gridTable");
		var cell = gTable.rows[row].cells[col];

		var img;

		if (cell.innerHTML.includes("0.png")) {
			if (downFlag()) {
				img = "F";
				cell.innerHTML = "<img src=\"" + imgFolder + "/" + img + ".png" + "\">";
				var fDiv = document.getElementById("flagsDiv");
				fDiv.innerHTML = "<b>Flags: " + getFlags() + "</b>";
			}
		}
		else if (cell.innerHTML.includes("F.png")) {
			upFlag();
			img = "0";
			cell.innerHTML = "<img src=\"" + imgFolder + "/" + img + ".png" + "\">";
			var fDiv = document.getElementById("flagsDiv");
			fDiv.innerHTML = "<b>Flags: " + getFlags() + "</b>";
		}
		if (getFlags() == 0) {
			checkWin();
		}
	}
}

function draw(s) {
	var canvas = document.getElementById('smileyFace');
	var ctx = canvas.getContext('2d');
	if (s == "smile") {
		ctx.beginPath();
		ctx.arc(15, 15, 14, 0, Math.PI * 2, true);
		ctx.stroke();
		ctx.fillStyle = "yellow";
		ctx.fill();
		ctx.beginPath();
		ctx.moveTo(24, 18);
		ctx.arc(15, 15, 10, Math.PI * .15, Math.PI * .9, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(10, 10);
		ctx.arc(10, 10, 2, 0, Math.PI * 2, true);
		ctx.moveTo(22, 10);
		ctx.arc(22, 10, 2, 0, Math.PI * 2, true);
		ctx.fillStyle = "black";
		ctx.fill();
	}
	else if (s == "frown") {
		ctx.beginPath();
		ctx.arc(15, 15, 14, 0, Math.PI * 2, true);
		ctx.stroke();
		ctx.fillStyle = "yellow";
		ctx.fill();
		ctx.beginPath();
		ctx.moveTo(24, 22);
		ctx.arc(15, 27, 10, Math.PI * 1.84, Math.PI * 1.14, true);
		ctx.moveTo(12, 12);
		ctx.lineTo(6, 6);
		ctx.moveTo(12, 6);
		ctx.lineTo(6, 12);
		ctx.moveTo(24, 12);
		ctx.lineTo(18, 6);
		ctx.moveTo(24, 6);
		ctx.lineTo(18, 12);
		ctx.stroke();
	}
	else if (s == "win") {
		var canvas = document.getElementById("gameOver");
		var ctx = canvas.getContext("2d");
		ctx.font = "30px Helvetica";
		ctx.fillStyle = "green";
		ctx.textAlign = "right";
		ctx.fillText("You won!", canvas.width/2.5, canvas.height/1.2); 
	}
	else if (s == "lose") {
		var canvas = document.getElementById("gameOver");
		var ctx = canvas.getContext("2d");
		ctx.font = "30px Helvetica";
		ctx.fillStyle = "red";
		ctx.textAlign = "right";
		ctx.fillText("You lost, sorry...", canvas.width/1.5, canvas.height/1.2); 
	}
	else {
		var canvas = document.getElementById("smileyFace");
		var ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		var canvas = document.getElementById("gameOver");
		var ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
}