const wrapper =
	document.querySelector(".wrapper");
var score =
	document.querySelector(".score");

var colors = [
	"#665b31",
	"#fb326b",
	"#be6f1f",
	"#bc234d",
	"#abcd23",
	"#444bbb",
	"#0076ff",
	"#ff7600",
	"#76ff00",
	"#bf7c48",
	"#cc7060",
	"#d176f0",
];
var colorOptions = [
	...colors,
	...colors,
];
var colorsLength = colorOptions.length;
var awaitingEndOfMove = false;
var activeTile = null;
var revealedCount = 0;

var seconds = 0;
var minutes = 0;
var hours = 0;

setInterval(() => {
	seconds++;
	if (seconds === 60) {
		seconds = 0;
		minutes++;
	}
	if (minutes === 60) {
		minutes = 0;
		hours++;
	}
	var timer =
		document.getElementById("timer");

	timer.innerHTML = `${hours
		.toString()
		.padStart(2, "0")}:${minutes
		.toString()
		.padStart(2, "0")}:${seconds
		.toString()
		.padStart(2, "0")}`;
}, 1000);

const buildMemory = color => {
	var box =
		document.createElement("div");
	box.classList.add("boxes");
	box.setAttribute("data-color", color);
	box.setAttribute(
		"data-revealed",
		"false"
	);

	box.addEventListener("click", () => {
		var revealed = box.getAttribute(
			"data-revealed"
		);
		if (
			awaitingEndOfMove ||
			revealed === "true" ||
			activeTile === box
		) {
			return;
		}
		box.style.background = color;
		if (!activeTile) {
			activeTile = box;

			return;
		}

		colorMatch =
			activeTile.getAttribute(
				"data-color"
			);

		if (colorMatch === color) {
			activeTile.setAttribute(
				"data-revealed",
				"true"
			);
			box.setAttribute(
				"data-revealed",
				"true"
			);
			awaitingEndOfMove = false;
			activeTile = null;
			revealedCount += 2;
			score.textContent =
				revealedCount.toString();
			if (
				revealedCount === colorsLength
			) {
				alert(
					`You win, refresh to start again and it took you ${timer.textContent} for	you to complete it`
				);
			}
			return;
		}

		awaitingEndOfMove = true;

		setTimeout(() => {
			box.style.background = null;
			activeTile.style.background =
				null;
			awaitingEndOfMove = false;
			activeTile = null;
		}, 1000);
	});

	return box;
};

for (var i = 0; i < colorsLength; i++) {
	var colorIndex = Math.floor(
		Math.random() * colorOptions.length
	);
	var color = colorOptions[colorIndex];
	var boxes = buildMemory(color);

	colorOptions.splice(colorIndex, 1);
	wrapper.appendChild(boxes);
}
