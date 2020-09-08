var canvasElement = document.getElementById("simulator")
var canvas = canvasElement.getContext("2d")
var width = canvasElement.width
var height = canvasElement.height
var sliderTime = document.getElementById("sliderTime")
var timeIndicator = document.getElementById("time")
var curvatureIndicator = document.getElementById("curvature")
var radiusIndicator = document.getElementById("radius")

window.onload = function () {
    draw()
}

function draw() {
	time = parseFloat(sliderTime.value) / 1000 * 2 * Math.PI
	currX = 2 * Math.cos(time) * (1 - Math.cos(time))
	currY = 2 * Math.sin(time) * (1 - Math.cos(time))
	currDX = 2 * Math.sin(time) * (2 * Math.cos(time) - 1)
	currDY = 2 * Math.cos(time) * (1 - 2 * Math.cos(time)) + 2
	currDX2 = 2 * Math.cos(time) * (4 * Math.cos(time) - 1) - 4
	currDY2 = 2 * Math.sin(time) * (4 * Math.cos(time) - 1)
	curvature = (currDX * currDY2 - currDX2 * currDY) / Math.pow(currDX * currDX + currDY * currDY, 3 / 2)
	oscX = currX - currDY / (curvature * Math.sqrt(currDX * currDX + currDY * currDY))
	oscY = currY + currDX / (curvature * Math.sqrt(currDX * currDX + currDY * currDY))
	timeIndicator.textContent = sliderTime.value / 500 + " * Pi"
	curvatureIndicator.textContent = Math.abs(curvature).toFixed(4)
	radiusIndicator.textContent = Math.abs(1 / curvature).toFixed(4)
    canvas.fillStyle = "rgb(36, 36, 36)"
	canvas.fillRect(0, 0, width, height)
	canvas.fillStyle = "rgb(255, 255, 255)"
	canvas.strokeStyle = "rgb(200, 255, 200)"
    canvas.beginPath()
    canvas.moveTo(0, height / 2)
    canvas.lineTo(width, height / 2)
	canvas.stroke()
	canvas.beginPath()
    canvas.moveTo(width / 2, 0)
    canvas.lineTo(width / 2, height)
	canvas.stroke()
	canvas.strokeStyle = "rgb(255, 0, 255)"
	canvas.beginPath()
	canvas.moveTo(width / 2, height / 2)
    for(var t = 0; t < Math.PI * 2; t += 0.001) {
		var plotX = 2 * Math.cos(t) * (1 - Math.cos(t))
		var plotY = 2 * Math.sin(t) * (1 - Math.cos(t))
		canvas.lineTo(width / 2 + plotX * 50, height / 2 - plotY * 50)
	}
	canvas.stroke()
	canvas.fillRect(width / 2 + currX * 50 - 3, height / 2 - currY * 50 - 3, 6, 6)
	canvas.strokeStyle = "rgb(0, 255, 100)"
	canvas.beginPath()
	canvas.arc(width / 2 + oscX * 50, height / 2 - oscY * 50, 50 / Math.abs(curvature), 0, Math.PI * 2)
	canvas.stroke()
    requestAnimationFrame(draw)
}