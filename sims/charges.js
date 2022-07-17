function fixedUpdate() {
    for (var i = 0; i < charges.length; i++) {
        if (!charges[i].static) {
            var force = getForce(i)
            charges[i].velX += force.x * 100000
            charges[i].velY += force.y * 100000
            charges[i].x += charges[i].velX
            charges[i].y += charges[i].velY
        }
    }
}

function simDraw() {
    drawCharges()
    drawVoltmeters()
    var mouseMagnitude = Math.sqrt(mouseField.x * mouseField.x + mouseField.y * mouseField.y)
    fieldElement.textContent = mouseMagnitude.toFixed(2)
    potentialElement.textContent = getPotential(mouseX, mouseY).toFixed(2)
}

var chargeDiv = document.getElementById("chargeDiv")
var chargeButton = document.getElementById("chargebtn")
var chargeX = document.getElementById("chargex")
var chargeY = document.getElementById("chargey")
var chargeVal = document.getElementById("chargeval")
var voltmeterDiv = document.getElementById("voltmeterDiv")
var voltmeterButton = document.getElementById("meterbutton")
var voltxa = document.getElementById("voltxa")
var voltya = document.getElementById("voltya")
var voltxb = document.getElementById("voltxb")
var voltyb = document.getElementById("voltyb")
var fieldElement = document.getElementById("ef")
var potentialElement = document.getElementById("ep")
var chargeSize = 10

var charges = []
var chargeVals = []
var voltmeters = []
var voltmeterVals = []

chargeButton.addEventListener("click", function () {
    var q = createCharge(parseInt(chargeX.value), parseInt(chargeY.value), chargeVal.value * Math.pow(10, -6), true)
    var chargeInfo = document.createElement("span")
    var chargepos = document.createElement("p")
    var description = document.createElement("p")
    var statbutton = document.createElement("button")
    var delbutton = document.createElement("button")
    chargeInfo.classList.add("my-1")
    chargepos.classList.add("my-1")
    statbutton.classList.add("btn")
    statbutton.classList.add("btn-primary")
    statbutton.classList.add("mb-1")
    delbutton.classList.add("btn")
    delbutton.classList.add("btn-primary")
    delbutton.classList.add("mb-1")
    description.textContent = "Q: " + chargeVal.value + "x10^-6 C"
    statbutton.textContent = "Static"
    statbutton.addEventListener("click", function () {
        q.static = !q.static
        if (q.static) {
            statbutton.textContent = "Static"
        } else {
            statbutton.textContent = "Free"
        }
    })
    delbutton.textContent = "Remove"
    delbutton.addEventListener("click", function () {
        chargeDiv.removeChild(chargeInfo)
        chargeVals.splice(charges.indexOf(q), 1)
        charges.splice(charges.indexOf(q), 1)
    })
    chargeInfo.appendChild(chargepos)
    chargeInfo.appendChild(description)
    chargeInfo.appendChild(statbutton)
    chargeInfo.appendChild(delbutton)
    chargeInfo.classList.add("itemspan")
    chargeDiv.appendChild(chargeInfo)
    chargeVals.push(chargepos)
    chargeX.value = ""
    chargeY.value = ""
    chargeVal.value = ""
})

voltmeterButton.addEventListener("click", function () {
    var v = createVoltmeterBetween(voltxa.value, voltya.value, voltxb.value, voltyb.value)
    var voltmeterInfo = document.createElement("span")
    var description = document.createElement("p")
    var voltage = document.createElement("p")
    var delbutton = document.createElement("button")
    description.classList.add("my-1")
    voltage.classList.add("my-1")
    delbutton.classList.add("btn")
    delbutton.classList.add("btn-primary")
    delbutton.classList.add("mb-1")
    description.textContent = "X+: " + voltxa.value + ", Y+: " + voltya.value + ", X-: " + voltxb.value + ", Y-: " + voltyb.value
    delbutton.textContent = "Remove"
    delbutton.addEventListener("click", function () {
        voltmeterDiv.removeChild(voltmeterInfo)
        voltmeterVals.splice(voltmeters.indexOf(v), 1)
        voltmeters.splice(voltmeters.indexOf(v), 1)
    })
    voltmeterInfo.appendChild(description)
    voltmeterInfo.appendChild(voltage)
    voltmeterInfo.appendChild(delbutton)
    voltmeterInfo.classList.add("itemspan")
    voltmeterDiv.appendChild(voltmeterInfo)
    voltmeterVals.push(voltage)
    voltxa.value = ""
    voltya.value = ""
    voltxb.value = ""
    voltyb.value = ""
})

function createCharge(x, y, charge, static) {
    var charge = {
        x: x,
        y: y,
        velX: 0,
        velY: 0,
        charge: charge,
        static: static
    }
    charges.push(charge)
    return charges[charges.length - 1]
}

function createVoltmeterBetween(initX, initY, finalX, finalY) {
    var voltmeter = {
        xa: initX,
        ya: initY,
        xb: finalX,
        yb: finalY
    }
    voltmeters.push(voltmeter)
    return voltmeter
}

function drawCharges() {
    for (var i = 0; i < charges.length; i++) {
        if (charges[i].charge > 0) {
            canvas.fillStyle = "rgb(255, 0, 0)"
        } else {
            canvas.fillStyle = "rgb(0, 255, 0)"
        }
        canvas.beginPath()
        canvas.arc(charges[i].x, height - charges[i].y, chargeSize, 0, 2 * Math.PI)
        canvas.fill()
        chargeVals[i].textContent = "X: " + charges[i].x.toFixed(2) + ", Y: " + charges[i].y.toFixed(2)
    }
}

function drawVoltmeters() {
    for (var i = 0; i < voltmeters.length; i++) {
        canvas.fillStyle = "rgb(0, 127, 255)"
        canvas.beginPath()
        canvas.arc(voltmeters[i].xa, height - voltmeters[i].ya, chargeSize, 0, 2 * Math.PI)
        canvas.fill()
        canvas.beginPath()
        canvas.arc(voltmeters[i].xb, height - voltmeters[i].yb, chargeSize, 0, 2 * Math.PI)
        canvas.fill()
        voltmeterVals[i].textContent = "Voltage: " + getVoltageBetween(voltmeters[i].xa, voltmeters[i].ya, voltmeters[i].xb, voltmeters[i].yb).toFixed(2) + " V"
    }
}

function getForce(index) {
    var field = getField(charges[index].x, charges[index].y, index)
    return {
        x: field.x * charges[index].charge,
        y: field.y * charges[index].charge
    }
}

function getField(posX, posY, index = -1) {
    var sumX = 0
    var sumY = 0
    for (var i = 0; i < charges.length; i++) {
        if (i != index) {
            var dx = posX - charges[i].x
            var dy = posY - charges[i].y
            var distanceSqr = dx * dx + dy * dy
            var distance = Math.sqrt(distanceSqr)
            var magnitude = charges[i].charge / distanceSqr
            sumX += magnitude * dx / distance
            sumY += magnitude * dy / distance
        }
    }
    return {
        x: K * sumX,
        y: K * sumY
    }
}

function getPotential(posX, posY, index = -1) {
    var sum = 0
    for (var i = 0; i < charges.length; i++) {
        if (i != index) {
            var dx = posX - charges[i].x
            var dy = charges[i].y - posY
            var distance = Math.sqrt(dx * dx + dy * dy)
            sum += charges[i].charge / distance
        }
    }
    return K * sum
}

function getVoltageBetween(initX, initY, finalX, finalY, index = -1) {
    return getPotential(initX, initY, index) - getPotential(finalX, finalY, index)
}