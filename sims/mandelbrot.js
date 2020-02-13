var canvasElement = document.getElementById("simulator")
var canvas = canvasElement.getContext("2d")
var width = canvasElement.width
var height = canvasElement.height
var iterations = 1000
var startX = -3
var startY = -1
var size = 2

window.onload = function () {
    draw()
}

function nextValue(z, c) {
	return {
		x: z.x * z.x - z.y * z.y + c.x,
		y: 2 * z.x * z.y + c.y
	}
}

function complexAbs(z) {
	return Math.sqrt(z.x * z.x + z.y * z.y)
}

function draw() {
	var endY = startY + size
	var endX = (endY - startY) / height * width + startX
    canvas.fillStyle = "rgb(36, 36, 36)"
    canvas.fillRect(0, 0, width, height)
    for (var y = 0; y < height; y++) {
		for(var x = 0; x < width; x++) {
			canvas.fillStyle = "rgb(255, 255, 255)"
			var inSet = true
			var z = {
				x: 0,
				y: 0
			}
			var c = {
				x: (endX - startX) * x / width + startX,
				y: (endY - startY) * y / height + startY
			}
			for(var i = 0; i < iterations; i++) {
				z = nextValue(z, c)
				if(complexAbs(z) >= 2) {
					inSet = false
					break
				}
			}
			if(inSet) {
				canvas.fillRect(x, y, 1, 1)
			}
		}
    }
    //requestAnimationFrame(draw)
}