/*
    Functions:

    Initializes any variables for the simulation
    function initialize() {

    }

    Updates at a fixed rate of 30 frames per second
    function fixedUpdate() {

    }

    Draws items on top of the simulation
    function simDraw() {

    }

    Returns the vector field at any point
    function getField(x, y) {
        return {
            x: fieldX,
            y: fieldY
        }
    }
*/

function initialize() {}
function fixedUpdate() {}
function simDraw() {}
function getField(x, y) {
    return {
        x: 0,
        y: 0
    }
}

var canvasHolder = document.getElementById("simdiv")
var settingsHolder = document.getElementById("settings")
var widthIndicator = document.getElementById("maxWidth")
var heightIndicator = document.getElementById("maxHeight")
var information = document.getElementById("information")
var canvasElement = document.getElementById("simulator")
var canvas = canvasElement.getContext("2d")
var width = canvasElement.width
var height = canvasElement.height

const K = 8987551787.3681764
const eo = 8.85418782 * Math.pow(10, -12)
const arrowSize = 10
var mouseX = 0
var mouseY = 0
var mouseField = null

window.onload = function() {
    canvasElement.width = Math.trunc(canvasHolder.clientWidth)
	canvasElement.height = Math.trunc(settingsHolder.clientHeight)
    width = canvasElement.width
	height = canvasElement.height
    widthIndicator.textContent = width
    if(heightIndicator != null) {
        heightIndicator.textContent = height
    }
    var rect = canvasElement.getBoundingClientRect()
    canvasElement.addEventListener("mousemove", function (event) {
        mouseX = event.clientX - rect.left + window.pageXOffset
        mouseY = event.clientY - rect.top + window.pageYOffset
    })
    setInterval(fixedUpdate, 1000 / 30)
    initialize()
    draw()
}

function drawArrow(x, y) {
    var pointsX = [-0.5, 0, 0, 0.5, 0, 0, -0.5]
    var pointsY = [-0.2, -0.2, -0.5, 0, 0.5, 0.2, 0.2]
    var field = getField(x, height - y)
    var magnitude = Math.sqrt(field.x * field.x + field.y * field.y)
    var dir = Math.atan2(field.y, field.x)
    var length = Math.min(magnitude, 2.5)
    canvas.fillStyle = "hsl(" + Math.min(magnitude * 20, 180) + ", 100%, 50%)"
    canvas.beginPath()
    canvas.moveTo(x + pointsX[0] * arrowSize * length * Math.cos(dir) + pointsY[0] * arrowSize * Math.sin(dir), y - pointsX[0] * arrowSize * length * Math.sin(dir) + pointsY[0] * arrowSize * Math.cos(dir))
    for (var i = 1; i < pointsX.length; i++) {
        canvas.lineTo(x + pointsX[i] * arrowSize * length * Math.cos(dir) + pointsY[i] * arrowSize * Math.sin(dir), y - pointsX[i] * arrowSize * length * Math.sin(dir) + pointsY[i] * arrowSize * Math.cos(dir))
    }
    canvas.fill()
}

function drawField(sizeX, sizeY) {
    var sx = width / sizeX
    var sy = height / sizeY
    for (var i = 0.5; i < sizeX; i++) {
        for (var j = 0.5; j < sizeY; j++) {
            var x = sx * i
            var y = sy * j
            drawArrow(x, y)
        }
    }
}

function draw() {
    canvas.fillStyle = "rgb(36, 36, 36)"
    canvas.fillRect(0, 0, width, height)
    drawField(width / 40, height / 40)
    drawArrow(mouseX, mouseY)
    mouseField = getField(mouseX, height - mouseY)
    simDraw()
    requestAnimationFrame(draw)
}