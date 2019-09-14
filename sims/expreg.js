/* -----------------
 * User defined code
 * -----------------
 */

var a = (Math.random() + 0.01) * 20
var b = (Math.random() + 0.01) * 20

function initialize() {
    for (var i = 1; i < width; i += 10) {
        var y = 0.05 * Math.exp(0.01 * i) + 40 * (Math.random() - 0.5)
        if(!isNaN(y)) {
            addPoint(i, y)
        }
    }
}

var prevA = 0
var prevB = 0
var momentum = 1

function fixedUpdate() {
    var gradient = getGradient(a, b, 0.000000075, 0.000000032)
    a += gradient.a + prevA
    b += gradient.b + prevB
    prevA = (gradient.a + prevA) * momentum
    prevB = (gradient.a + prevB) * momentum
}

/* ---------
 * Main code
 * ---------
 */

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
    setInterval(fixedUpdate, 1000 / 10000)
    initialize()
    draw()
}

function addPoint(px, py) {
    points.push({
        x: px,
        y: py
    })
}

function getGradient(a, b, na, nb) {
    var da = 0
    var db = 0
    for (var i = 0; i < points.length; i++) {
        var delta = Math.log(a) + b * points[i].x - Math.log(points[i].y)
        if(isNaN(delta)) {
            delta = 0;
        }
        da -= delta / a
        db -= delta * points[i].x
    }
    return {
        a: da * na,
        b: db * nb,
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
    canvas.moveTo(0, height)
    for (var i = 1; i < width; i++) {
        canvas.lineTo(i, height - (a * Math.exp(b * i)))
    }
    canvas.stroke()
    aVal.textContent = a.toFixed(4)
    bVal.textContent = b.toFixed(2)
    requestAnimationFrame(draw)
}