var sliderLX = document.getElementById("sliderlx")
var sliderLY = document.getElementById("sliderly")
var sliderLZ = document.getElementById("sliderlz")
var sliderPX = document.getElementById("sliderpx")
var sliderPY = document.getElementById("sliderpy")
var sliderPZ = document.getElementById("sliderpz")
var sliderA = document.getElementById("slidera")
var sliderB = document.getElementById("sliderb")
var sliderG = document.getElementById("sliderg")
var pantalla = document.getElementById("simulator")
var canvas = pantalla.getContext("2d")
var width = pantalla.width
var height = pantalla.height

var centroPantalla = {
	x: width / 2,
	y: height / 2,
	z: 0
}
var cuboide = {
	longX: 2,
	longY: 2,
	longZ: 2,
	centro: {
		x: 0,
		y: -4,
		z: 0
	},
	angulos: [0, 0, 0],
	colores: []
}
var camara = {
	centro: {
		x: 0,
		y: 0,
		z: 0
	},
	mira: {
		x: 0,
		y: -1,
		z: 0
	}
}

function crearVector(inicio, fin) {
	return {
		x: fin.x - inicio.x,
		y: fin.y - inicio.y,
		z: fin.z - inicio.z
	}
}

function productoPunto(a, b) {
	return a.x * b.x + a.y * b.y + a.z * b.z
}

function productoCruz(a, b) {
	return {
		x: a.y * b.z - a.z * b.y,
		y: a.z * b.x - a.x * b.z,
		z: a.x * b.y - a.y * b.x
	}
}

function escalar(v, t) {
	return {
		x: v.x * t,
		y: v.y * t,
		z: v.z * t
	}
}

function sumar(a, b) {
	return {
		x: a.x + b.x,
		y: a.y + b.y,
		z: a.z + b.z
	}
}

function normalizar(v) {
	var magnitud = Math.sqrt(productoPunto(v, v))
	return {
		x: v.x / magnitud,
		y: v.y / magnitud,
		z: v.z / magnitud
	}
}

function multiplicarMatriz(v, m) {
	return {
		x: v.x * m[0][0] + v.y * m[0][1] + v.z * m[0][2],
		y: v.x * m[1][0] + v.y * m[1][1] + v.z * m[1][2],
		z: v.x * m[2][0] + v.y * m[2][1] + v.z * m[2][2]
	}
}

function draw() {
	cuboide.longX = sliderLX.value / 5
	cuboide.longY = sliderLY.value / 5
	cuboide.longZ = sliderLZ.value / 5
	cuboide.centro.x = sliderPX.value / 10
	cuboide.centro.y = sliderPY.value / 10
	cuboide.centro.z = sliderPZ.value / 10
	cuboide.angulos = [sliderA.value / 100, sliderB.value / 100, sliderG.value / 100]
	canvas.fillStyle = "black"
	canvas.fillRect(0, 0, width, height)
	var puntos = []
	for(var i = 0; i < 8; i++) {
		var puntoActual = {
			x: 0,
			y: 0,
			z: 0
		}
		var digito = i
		if(digito % 2 == 0) {
			puntoActual.x -= cuboide.longX / 2
		} else {
			puntoActual.x += cuboide.longX / 2
		}
		digito = Math.floor(digito / 2)
		if(digito % 2 == 0) {
			puntoActual.y -= cuboide.longY / 2
		} else {
			puntoActual.y += cuboide.longY / 2
		}
		digito = Math.floor(digito / 2)
		if(digito % 2 == 0) {
			puntoActual.z -= cuboide.longZ / 2
		} else {
			puntoActual.z += cuboide.longZ / 2
		}
		puntos.push(puntoActual)
	}
	for(var i = 0; i < 8; i++) {
		var alfa = cuboide.angulos[0]
		var beta = cuboide.angulos[1]
		var gamma = cuboide.angulos[2]
		var matrizYaw = [
			[Math.cos(alfa), -Math.sin(alfa), 0],
			[Math.sin(alfa), Math.cos(alfa), 0],
			[0, 0, 1]
		]
		var matrizPitch = [
			[Math.cos(beta), 0, Math.sin(beta)],
			[0, 1, 0],
			[-Math.sin(beta), 0, Math.cos(beta)]
		]
		var matrizRoll = [
			[1, 0, 0],
			[0, Math.cos(gamma), -Math.sin(gamma)],
			[0, Math.sin(gamma), Math.cos(gamma)]
		]
		var puntoTransformado = multiplicarMatriz(puntos[i], matrizYaw)
		puntoTransformado = multiplicarMatriz(puntoTransformado, matrizPitch)
		puntoTransformado = multiplicarMatriz(puntoTransformado, matrizRoll)
		puntos[i] = sumar(cuboide.centro, puntoTransformado)
	}
	var indicesCara = [
		[1, 2, 4, 3],
		[1, 2, 6, 5],
		[1, 3, 7, 5],
		[2, 4, 8, 6],
		[3, 4, 8, 7],
		[5, 6, 8, 7]
	]
	var caras = []
	for(var i = 0; i < 6; i++) {
		var caraActual = []
		var distanciaCara = 0
		for(var j = 0; j < 4; j++) {
			var puntoActual = puntos[indicesCara[i][j] - 1]
			var vectorCamaraPunto = crearVector(camara.centro, puntoActual)
			var vectorMira = normalizar(crearVector(camara.centro, camara.mira))
			var distanciaLinea = 1 / productoPunto(vectorCamaraPunto, vectorMira)
			var puntoPlano = escalar(vectorCamaraPunto, distanciaLinea)
			var vectorMiraPunto = crearVector(camara.mira, puntoPlano)
			var vectorDeltaX = productoCruz(vectorMiraPunto, vectorMira)
			var deltaX = productoPunto(vectorDeltaX, {
				x: 0,
				y: 0,
				z: -1
			})
			var puntoPantalla = {
				x: deltaX,
				y: camara.mira.z - puntoPlano.z,
				z: 0
			}
			var puntoFinal = sumar(centroPantalla, escalar(puntoPantalla, 100))
			caraActual.push(puntoFinal)
			distanciaCara += productoPunto(vectorCamaraPunto, vectorCamaraPunto)
		}
		caras.push({
			cara: caraActual,
			distancia: distanciaCara,
			color: cuboide.colores[i]
		})
	}
	for(var i = 0; i < 6; i++) {
		var max = i
		for(var j = i; j < 6; j++) {
			if(caras[j].distancia > caras[max].distancia) {
				max = j
			}
		}
		var temp = caras[max]
		caras[max] = caras[i]
		caras[i] = temp
	}
	for(var i = 0; i < 6; i++) {
		var caraActual = caras[i].cara
		canvas.fillStyle = caras[i].color
		canvas.beginPath()
		canvas.moveTo(caraActual[0].x, caraActual[0].y)
		for(var j = 1; j < 4; j++) {
			canvas.lineTo(caraActual[j].x, caraActual[j].y)
		}
		canvas.fill()
	}
	requestAnimationFrame(draw)
}

for(var i = 0; i < 6; i++) {
	cuboide.colores.push("hsl(" + 60 * i + ", 100%, 50%)")
}

draw()