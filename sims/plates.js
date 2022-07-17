function simDraw() {
    drawPlates()
    var mouseMagnitude = Math.sqrt(mouseField.x * mouseField.x + mouseField.y * mouseField.y)
    fieldElement.textContent = mouseMagnitude.toFixed(2)
}

var plateButton = document.getElementById("platebtn")
var plateX = document.getElementById("platex")
var plateVal = document.getElementById("density")
var fieldElement = document.getElementById("ef")
var plateSize = 10

var plates = []

plateButton.addEventListener("click", function () {
    var p = createPlate(plateX.value, plateVal.value * Math.pow(10, -11), true)
    var plateInfo = document.createElement("span")
    var description = document.createElement("p")
    var delbutton = document.createElement("button")
    description.classList.add("my-1")
    delbutton.classList.add("btn")
    delbutton.classList.add("btn-primary")
    delbutton.classList.add("mb-1")
    description.textContent = "X: " + plateX.value + ", Density: " + plateVal.value + "x10^-11 C/m"
    delbutton.textContent = "Remove"
    delbutton.addEventListener("click", function () {
        chargeDiv.removeChild(plateInfo)
        plates.splice(plates.indexOf(p), 1)
    })
    plateInfo.appendChild(description)
    plateInfo.appendChild(delbutton)
    plateInfo.classList.add("itemspan")
    chargeDiv.appendChild(plateInfo)
})

function createPlate(x, density) {
    var plate = {
        x: x,
        density: density
    }
    plates.push(plate)
    return plate
}

function drawPlates() {
    for (var i = 0; i < plates.length; i++) {
        if (plates[i].density > 0) {
            canvas.fillStyle = "rgb(255, 0, 0)"
        } else {
            canvas.fillStyle = "rgb(0, 255, 0)"
        }
        canvas.fillRect(plates[i].x - plateSize * 0.5, 0, plateSize, height)
    }
}

function getField(posX, posY) {
    var sum = 0
    for (var i = 0; i < plates.length; i++) {
        var distance = posX - plates[i].x
        if (distance > 0) {
            sum += plates[i].density
        } else {
            sum -= plates[i].density
        }
    }
    return {
        x: sum / (2 * eo),
        y: 0
    }
}