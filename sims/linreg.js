/* -----------------
 * User defined code
 * -----------------
 */

var m = (Math.random() - 0.5) * 4
var b = (Math.random() - 0.5) * 200

function initialize() {
    for (var i = 0; i < width; i += 10) {
        addPoint(i, 0.3 * i + 40 * (Math.random() - 0.5))
    }
}

function fixedUpdate() {
    var gradient = getGradient(m, b, 0.000000001, 0.01)
    m += gradient.m
    b += gradient.b
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
var mVal = document.getElementById("mval")
var bVal = document.getElementById("bval")

var pointRadius = 2
var points = []

window.onload = function () {
    canvasElement.width = Math.trunc(canvasHolder.clientWidth)
	canvasElement.height = Math.trunc(settingsHolder.clientHeight)
	width = canvasElement.width
	height = canvasElement.height
    setInterval(fixedUpdate, 1000 / 30)
    initialize()
    draw()
}

function addPoint(px, py) {
    points.push({
        x: px,
        y: py
    })
}

function getGradient(m, b, n, nb) {
    var dm = 0
    var db = 0
    for (var i = 0; i < points.length; i++) {
        var delta = m * points[i].x + b - points[i].y
        dm -= delta * points[i].x
        db -= delta
    }
    return {
        m: dm * n,
        b: db * nb
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
    canvas.moveTo(0, height - b)
    canvas.lineTo(width, height - m * width - b)
    canvas.stroke()
    mVal.textContent = m.toFixed(2)
    bVal.textContent = b.toFixed(2)
    requestAnimationFrame(draw)
}