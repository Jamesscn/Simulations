/* -----------------
 * User defined code
 * -----------------
 */


function initialize() {
    for (var i = 0; i < width; i += 1) {
        addPoint(i, f(i))
    }
}

function fixedUpdate() {
    x = newtonsMethod(x)
    xn = newtonsMethod(x)
    y = f(x)
}

/* ---------
 * Main code
 * ---------
 */

var canvasElement = document.getElementById("simulator")
var canvas = canvasElement.getContext("2d")
var width = canvasElement.width
var height = canvasElement.height
var xVal = document.getElementById("xval")
var yVal = document.getElementById("yval")
var xoVal = document.getElementById("xoval")
var yoVal = document.getElementById("yoval")

var x = 500
var xn = newtonsMethod(x)
var y = f(x)
var xo = 200 * (Math.log(10) + 1)
var yo = 0

var pointRadius = 4
var points = []

window.onload = function () {
    setInterval(fixedUpdate, 2000)
    initialize()
    draw()
}

function addPoint(px, py) {
    points.push({
        x: px,
        y: py
    })
}

function f(x) {
    return Math.exp(x / 100 - 2) - 100
}

function fp(x) {
    return Math.exp(x / 100 - 2) / 100
}

function newtonsMethod(x) {
    return x - f(x) / fp(x)
}

function draw() {
    canvas.fillStyle = "rgb(36, 36, 36)"
    canvas.fillRect(0, 0, width, height)
    canvas.strokeStyle = "rgb(200, 255, 200)"
    canvas.beginPath()
    canvas.moveTo(points[0].x, height / 2 - points[0].y)
    for (var i = 1; i < points.length; i++) {
        canvas.lineTo(points[i].x, height / 2 - points[i].y)
        canvas.stroke()
    }
    canvas.beginPath()
    canvas.moveTo(0, height / 2)
    canvas.lineTo(width, height / 2)
    canvas.stroke()
    canvas.fillStyle = "rgb(255, 255, 255)"
    canvas.beginPath()
    canvas.moveTo(0, height / 2 - (f(x) - fp(x) * x))
    canvas.lineTo(width, height / 2 - (fp(x) * width + f(x) - fp(x) * x))
    canvas.stroke()
    canvas.beginPath()
    canvas.moveTo(x, 0)
    canvas.lineTo(x, height)
    canvas.stroke()
    canvas.beginPath()
    canvas.arc(Math.round(x), height / 2, pointRadius, 0, 2 * Math.PI)
    canvas.fill()
    canvas.fillStyle = "rgb(255, 255, 0)"
    canvas.beginPath()
    canvas.arc(Math.round(xn), height / 2, pointRadius, 0, 2 * Math.PI)
    canvas.fill()
    canvas.fillStyle = "rgb(255, 0, 255)"
    canvas.beginPath()
    canvas.arc(Math.round(x), height / 2 - Math.round(y), pointRadius, 0, 2 * Math.PI)
    canvas.fill()
    xVal.textContent = x.toFixed(3)
    yVal.textContent = y.toFixed(3)
    xoVal.textContent = xo.toFixed(3)
    yoVal.textContent = yo.toFixed(3)
    requestAnimationFrame(draw)
}