const model = tf.loadLayersModel('https://jamesscn.github.io/Simulations/sims/numbers.json').then(model => {
    loadedModel = model
});

var canvasElement = document.getElementById("simulator")
var canvas = canvasElement.getContext("2d")
var width = canvasElement.width
var height = canvasElement.height
var nVal = document.getElementById("nval")
var resetBtn = document.getElementById("reset")
var imageData = null
var mouseX = 0
var mouseY = 0
var prevMouseX = 0
var prevMouseY = 0
var mouseDown = false
var pencilX = [0, 0.3, 1, 0.7, 0]
var pencilY = [0, 0, 0.7, 1, 0.3]
var brushSize = 10
var loadedModel = null
var started = false

document.body.onmousedown = function () {
    mouseDown = true
    started = true
}

document.body.onmouseup = function () {
    mouseDown = false
}

window.onload = function () {
    window.addEventListener("mousemove", function (event) {
        var rect = canvasElement.getBoundingClientRect()
        mouseX = Math.floor(event.clientX - rect.left)
        mouseY = Math.floor(event.clientY - rect.top)
    })
    resetBtn.addEventListener("click", function() {
        clearCanvas()
        started = false
        nVal.textContent = "-"
    })
    clearCanvas()
    setInterval(function () {
        if(loadedModel != null) {
            pixels = new Array(784)
            for(var i = 0; i < 28; i++) {
                for(var j = 0; j < 28; j++) {
                    val = 0
                    for(var x = 0; x < width / 28; x++) {
                        for(var y = 0; y < height / 28; y++) {
                            if(imageData.data[((i * width / 28 + x) + (j * height / 28 + y) * width) * 4] > 0) {
                                val = 1
                                x = width / 28
                                y = height / 28
                            }
                        }
                    }
                    pixels[j * 28 + i] = val
                }
            }
            pixelTensor = tf.tensor4d(pixels, [1, 28, 28, 1])
            answers = loadedModel.predict(pixelTensor).arraySync()[0]
            var maxVal = 0
            var maxNum = 0
            for(var i = 0; i < 10; i++) {
                if(answers[i] > maxVal) {
                    maxVal = answers[i]
                    maxNum = i
                }
            }
            if(started) {
                nVal.textContent = maxNum
            }
        }
    }, 1000)
    draw()
}

function clearCanvas() {
    var pixels = []
    for (var i = 0; i < width * height * 4; i += 4) {
        pixels.push(0)
        pixels.push(0)
        pixels.push(0)
        pixels.push(255)
    }
    imageData = new ImageData(new Uint8ClampedArray(pixels), width, height)
    canvas.putImageData(imageData, 0, 0)
}

function draw() {
    if (mouseDown && mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
        var pixels = imageData.data
        var stepSize = Math.abs(mouseX - prevMouseX)
        if (Math.abs(mouseY - prevMouseY) > stepSize) {
            stepSize = Math.abs(mouseY - prevMouseY)
        }
        for (var t = 0; t <= 1; t += 1 / stepSize) {
            var currX = Math.round(prevMouseX + (mouseX - prevMouseX) * t)
            var currY = Math.round(prevMouseY + (mouseY - prevMouseY) * t)
            for (var i = -brushSize; i <= brushSize; i++) {
                for (var j = -brushSize; j <= brushSize; j++) {
                    pixels[4 * ((currY + j) * width + currX + i)] = 255
                    pixels[4 * ((currY + j) * width + currX + i) + 1] = 255
                    pixels[4 * ((currY + j) * width + currX + i) + 2] = 255
                }
            }
        }
    }
    canvas.putImageData(imageData, 0, 0)
    drawPencil(mouseX, mouseY, brushSize)
    prevMouseX = mouseX
    prevMouseY = mouseY
    requestAnimationFrame(draw)
}

function drawPencil(x, y, size) {
    size *= 15
    canvas.fillStyle = "rgb(255, 170, 109)"
    canvas.beginPath()
    canvas.moveTo(x + size * pencilX[0], y - size * pencilY[0])
    canvas.lineTo(x + size * pencilX[1], y - size * pencilY[1])
    canvas.lineTo(x + size * pencilX[4], y - size * pencilY[4])
    canvas.fill()

    canvas.fillStyle = "rgb(34, 145, 0)"
    canvas.beginPath()
    canvas.moveTo(x + size * pencilX[1], y - size * pencilY[1])
    canvas.lineTo(x + size * pencilX[2], y - size * pencilY[2])
    canvas.lineTo(x + size * pencilX[3], y - size * pencilY[3])
    canvas.lineTo(x + size * pencilX[4], y - size * pencilY[4])
    canvas.fill()

    size *= 0.2
    canvas.fillStyle = "rgb(255, 255, 255)"
    canvas.beginPath()
    canvas.moveTo(x + size * pencilX[0], y - size * pencilY[0])
    canvas.lineTo(x + size * pencilX[1], y - size * pencilY[1])
    canvas.lineTo(x + size * pencilX[4], y - size * pencilY[4])
    canvas.fill()
}