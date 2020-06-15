var canvasElement = document.getElementById("simulator")
var canvas = canvasElement.getContext("2d")
var width = canvasElement.width
var height = canvasElement.height
var sliderSigma = document.getElementById("slidersigma")
var sliderOmega = document.getElementById("slideromega")
var complexIndicator = document.getElementById("complex")
var root = {
	sigma: -1,
	omega: 1
}

window.onload = function () {
    draw()
}

function draw() {
	root.sigma = sliderSigma.value / 100
	root.omega = sliderOmega.value / 5
	if(root.omega < 0) {
		complexIndicator.textContent = root.sigma + " - j" + Math.abs(root.omega)
	} else {
		complexIndicator.textContent = root.sigma + " + j" + Math.abs(root.omega)
	}
    canvas.fillStyle = "rgb(36, 36, 36)"
	canvas.fillRect(0, 0, width, height)
	canvas.strokeStyle = "rgb(200, 255, 200)"
    canvas.beginPath()
    canvas.moveTo(0, height / 2)
    canvas.lineTo(width, height / 2)
	canvas.stroke()
	canvas.beginPath()
    canvas.moveTo(width / 4, 0)
    canvas.lineTo(width / 4, height)
    canvas.stroke()
	canvas.beginPath()
    canvas.moveTo(width / 2, 0)
    canvas.lineTo(width / 2, height)
	canvas.stroke()
	canvas.fillStyle = "rgb(255, 255, 255)"
	canvas.fillRect(root.sigma * 200 + width / 4 - 2, height / 2 + root.omega * 20 - 2, 4, 4)
	canvas.fillRect(root.sigma * 200 + width / 4 - 2, height / 2 - root.omega * 20 - 2, 4, 4)
	var plotX = 0
	canvas.lineWidth = 2
	canvas.beginPath()
	canvas.moveTo(width / 2, height / 2)
    for(var x = width / 2; x < width; x++) {
		var plotY = Math.cos(root.omega * plotX) * Math.exp(root.sigma * plotX)
		canvas.lineTo(x, height / 2 - plotY * 50)
		plotX += 0.01
	}
	canvas.stroke()
	plotX = 0
	canvas.strokeStyle = "rgb(100, 100, 100)"
	canvas.lineWidth = 1
	canvas.beginPath()
	canvas.moveTo(width / 2, height / 2)
    for(var x = width / 2; x < width; x++) {
		var plotY = Math.exp(root.sigma * plotX)
		canvas.lineTo(x, height / 2 - plotY * 50)
		plotX += 0.01
	}
	canvas.stroke()
	plotX = 0
	canvas.beginPath()
	canvas.moveTo(width / 2, height / 2)
    for(var x = width / 2; x < width; x++) {
		var plotY = -Math.exp(root.sigma * plotX)
		canvas.lineTo(x, height / 2 - plotY * 50)
		plotX += 0.01
	}
	canvas.stroke()
    requestAnimationFrame(draw)
}