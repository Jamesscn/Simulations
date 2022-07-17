/* -----------------
 * User defined code
 * -----------------
 */

var a = (Math.random() - 0.5) * 20
var b = (Math.random() - 0.5) * 20
var c = (Math.random() - 0.5) * 20

function initialize() {
    for (var i = 0; i < width; i += 10) {
        addPoint(i, 0.001 * (i - width / 2) * (i - width / 2) + 70 + 40 * (Math.random() - 0.5))
    }
}

var prevA = 0
var prevB = 0
var prevC = 0
var momentum = 1

function fixedUpdate() {
    var gradient = getGradient(a, b, c, 0.00000000000001, 0.00000001, 0.01)
    a += gradient.a + prevA
    b += gradient.b + prevB
    c += gradient.c + prevC
    prevA = (gradient.a + prevA) * momentum
    prevB = (gradient.a + prevB) * momentum
    prevC = (gradient.a + prevC) * momentum
}

/* ---------
 * Main code
 * ---------
 */

var canvasHolder = document.getElementById("simdiv")
var settingsHolder = document.getElementById("settings")
var canvasElement = document.getElementById("simulator")
var canvas = canvasElement.getContext("2d")
var width = canvasElement.width
var height = canvasElement.height
var aVal = document.getElementById("aval")
var bVal = document.getElementById("bval")
var cVal = document.getElementById("cval")

var pointRadius = 2
var points = []

window.onload = function () {
    canvasElement.width = Math.trunc(canvasHolder.clientWidth)
	canvasElement.height = Math.trunc(settingsHolder.clientHeight)
	width = canvasElement.width
	height = canvasElement.height
    setInterval(fixedUpdate, 1000 / 60)
    initialize()
    draw()
}

function addPoint(px, py) {
    points.push({
        x: px,
        y: py
    })
}

function getGradient(a, b, c, na, nb, nc) {
    var da = 0
    var db = 0
    var dc = 0
    for (var i = 0; i < points.length; i++) {
        var delta = a * points[i].x * points[i].x + b * points[i].x + c - points[i].y
        da -= delta * points[i].x * points[i].x
        db -= delta * points[i].x
        dc -= delta
    }
    return {
        a: da * na,
        b: db * nb,
        c: dc * nc
    }
}

function draw() {
    canvas.fillStyle = "rgb(36, 36, 36)"
    canvas.fillRect(0, 0, width, height)
    for (var i = 0; i < points.length; i++) {
        canvas.fillStyle = "rgb(255, 255, 255)"
        canvas.fillRect(points[i].x - pointRadius, height - points[i].y + pointRadius, 2 * pointRadius, 2 * pointRadius)
    }
    canvas.strokeStyle = "rgb(200, 255, 200)"
    canvas.beginPath()
    canvas.moveTo(0, height - c)
    for (var i = 1; i < width; i++) {
        canvas.lineTo(i, height - (a * i * i + b * i + c))
    }
    canvas.stroke()
    aVal.textContent = a.toFixed(4)
    bVal.textContent = b.toFixed(2)
    cVal.textContent = c.toFixed(2)
    requestAnimationFrame(draw)
}