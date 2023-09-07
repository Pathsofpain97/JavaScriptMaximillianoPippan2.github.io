const carrito = { cuentaTotal: 0, hamburguesas: [], mensajeHamburguesas: "", mensajePedidos: "" }
const hamburguesas = []
let nombre;

class Hamburguesas {
    constructor(nombre, precio) {
        this.nombre = nombre
        this.precio = parseFloat(precio)
        this.id = hamburguesas.length + 1
        this.fecha = new Date()
    }

    pushearHamburguesa() {
        hamburguesas.push(this)
    }

    cambiarPrecio(nuevoPrecio) {
        this.precio = parseFloat(nuevoPrecio)
    }
    cambiarNombre(nuevoNombre) {
        this.nombre = nuevoNombre
    }
}

const hamburguesasIniciales = [
    { nombre: "Smash One", precio: 500 },
    { nombre: "Smash Bacon", precio: 530 },
    { nombre: "Smash BBQ", precio: 580 },
    { nombre: "Smash BBQ Triple", precio: 790 },
]

function crearHamburguesasDesdeArray(arrayHamburguesas) {
    arrayHamburguesas.forEach((hamburguesa) => {
        const nuevoHamburguesa = new Hamburguesas(hamburguesa.nombre, hamburguesa.precio);
        hamburguesas.push(nuevoHamburguesa);
    });
}

function menuPrincipal() {
    let opcionMenuPrincipal = prompt(`Bienvenido ${nombre}, ¿Cómo podemos ayudarte?
    (ingrese el número correspondiente)
        [1] Pedir hamburguesas
        [2] Eliminar pedidos
        [3] Funciones del administrador
        [4] Salir`)

    switch (opcionMenuPrincipal) {
        case "1":
            pedidoHamburguesas()

            break;
        case "2":
            otraConsulta()

            break;
        case "3":
            loginAdministrador()

            break;
        case "4":
            if (carrito.hamburguesas.length == 0) {
                alert(`Gracias ${nombre} por visitar Crazy Burger, esperamos para la próxima puedas elegirnos.`)
            }
            break;
        default:
            menuPrincipal()
            break;
    }
}

function loginAdministrador() {
    let pass = ""
    let i = 0
    do {
        pass = prompt(`Bienvenido Administrador ${nombre} ingresá tu contraseña: (pass: admin)`)
        i++
        console.log(i)
    } while (pass !== "admin" && i <= 2);

    if (i >= 2) {
        alert(`Lo siento ${nombre} la contraseña es incorrecta y excediste los intentos.`)
        menuPrincipal()
    } else { opcionesAdministrador() }
}

function opcionesAdministrador() {

    function alertaAdministrador(id, accion) {
        alert(`La hamburguesa fue ${accion}, sus nuevos valores son: \n
        ID: ${hamburguesas[id - 1].id}
        Nombre: ${hamburguesas[id - 1].nombre}
        Precio: ${hamburguesas[id - 1].precio}`)
        opcionesAdministrador()
    }

    const hamburguesasAdministrar = hamburguesas.map(hamburguesa => `[${hamburguesa.id}] - ${hamburguesa.nombre}`)
    const hamburguesasAdministrarConcat = hamburguesasAdministrar.join("\n")

    let imput = prompt(`Bienvenido ${nombre}, ¿Que te gustaria hacer? 
    (ingrese el número correspondiente)
        [1] Cambiar precio a una hamburguesa
        [2] Cambiar nombre a una hamburguesa
        [3] Crear nueva hamburguesa
        [0] Volver atras`)

    if (imput == 1) {
        let id = parseInt(prompt(`¿A que hamburguesa le cambiamos el PRECIO? 
        (ingrese el número correspondiente)\n${hamburguesasAdministrarConcat} `))

        if (id < 1 || id > hamburguesas.length || isNaN(id)) {
            alert("La hamburguesa no existe o el valor ingresado es incorrecto")
            opcionesAdministrador()
        } else {
            let imput = prompt(`Ingrese el nuevo precio para la hamburguesa \n${hamburguesas[id - 1].id} - ${hamburguesas[id - 1].nombre}\n
        Precio actual: ${hamburguesas[id - 1].precio} `)
            hamburguesas[id - 1].cambiarPrecio(imput)
            alertaAdministrador(id, "modificado")
        }
    } else if (imput == 2) {
        let id = prompt(`¿A que hamburguesa le cambiamos el NOMBRE?\n(ingrese el número correspondiente)\n${hamburguesasAdministrarConcat}`)

        if (id < 1 || id > hamburguesas.length || isNaN(id)) {
            alert("La hamburguesa no existe o el valor ingresado es incorrecto")
            opcionesAdministrador()
        } else {
            let imput = prompt(`Ingrese el nuevo NOMBRE para la hamburguesa \n
        ${hamburguesas[id - 1].id} - ${hamburguesas[id - 1].nombre} - ${hamburguesas[id - 1].precio} `)
            hamburguesas[id - 1].cambiarNombre(imput)
            alertaAdministrador(id, "modificado")
        }
    } else if (imput == 3) {
        crearNuevoHamburguesa(prompt("Ingrese el nombre de la nueva hamburguesa: [ej: Hamburguesa Smash Doble] "), prompt("Ingrese el precio de la nueva hamburguesa [ej: 1600] "))
        alertaAdministrador(hamburguesas.length, "agregado")

    } else if (imput == 0) {
        menuPrincipal()
    } else {
        alert(`${nombre} La opción ingresada no existe`)
        opcionesAdministrador()
    }
}

function crearNuevoHamburguesa(nombre, precio) {
    const newHamburguesa = new Hamburguesas(nombre, precio)
    newHamburguesa.pushearHamburguesa()
}

function otraConsulta() {
    carrito.cuentaTotal = 0
    carrito.hamburguesas = []
    let consulta = prompt(`Dejanos aquí tu consulta:`)
    let contactoOtraConsulta = prompt(`Ingresá tu email o telefono:`)

    alert(`Muchas gracias ${nombre}.
    Nos comunicaremos en breve contigo a: ${contactoOtraConsulta}.
    Por la consulta:
    ${consulta}`)
}

function pedidoHamburguesas() {
    const hamburguesasAdministrar = hamburguesas.map(hamburguesa => `[${hamburguesa.id}] - ${hamburguesa.nombre} - $${hamburguesa.precio}`)
    const hamburguesasAdministrarConcat = hamburguesasAdministrar.join("\n")

    let imput = prompt(`¿Que hamburguesa te gustaría realizar?\n(ingrese el número correspondiente)\n${hamburguesasAdministrarConcat}\n\n[${hamburguesasAdministrar.length + 1}] - Volver atras `)
    let eleccion = parseInt(hamburguesas.findIndex((hamburguesa) => hamburguesa.id == imput))

    if (imput == hamburguesasAdministrar.length + 1) {
        menuPrincipal()
    } else {
        if (eleccion == -1) {
            alert("Ingrese un número correcto")
            pedidoHamburguesas()
        } else {
            alertaHamburguesas(hamburguesas[eleccion])
            preguntaOtroHamburguesa()
        }
    }
}

function alertaHamburguesas(hamburguesa) {

    carrito.hamburguesas.push(hamburguesa)
    carrito.cuentaTotal += hamburguesa.precio

    alert(`${hamburguesa.nombre}:
    - Costo: $${hamburguesa.precio}
    
    - Cantidad de hamburguesas: ${carrito.hamburguesas.length}
    - Subtotal: $${carrito.cuentaTotal}`)
}

function preguntaOtroHamburguesa() {
    let n = prompt(`¿Te gustaría agregar otra hamburguesa?
    [1] SI
    [2] NO`)
    while (n !== "1" && n !== "2") {
        n = prompt(`La opción elegida no es correcta. ¿Te gustaría agregar otra hamburguesa?
        [1] SI
        [2] NO`)
    }
    if (n == "1") {
        pedidoHamburguesas();
    } else if (n == "2") {
        alert(`Muchas gracias, a continuación tus elecciones...`)
    } else {
        alert(`La opción elegida no es correcta`)
    }
}

function reservaPedido(cantidad) {
    let hora = 0
    do {
        let input = prompt(`Ingrese la HORA para la entrega \n
        [Trabajamos desde las 19 a 23 horas]`)
        hora = parseInt(input);
    }
    while (isNaN(hora) || !(hora >= 19 && hora <= 23));
    carrito.mensajePedidos += `El pedido sera entregado a las: ${hora}hs. \n`
    alert(carrito.mensajePedidos)

}

//MAIN//
let boton = document.getElementById("boton");

boton.addEventListener("click", () => {
    nombre = prompt(`Bienvenido a Crazy Burger.
        -¿Cuál es su nombre?`).toUpperCase()

    if (nombre != "") {
        crearHamburguesasDesdeArray(hamburguesasIniciales)
        menuPrincipal()
    } else {
        alert("Gracias por visitar Crazy Burger")
    }

    if (carrito.hamburguesas.length != 0) {

        const nombresHamburguesas = carrito.hamburguesas.map(hamburguesa => hamburguesa.nombre).join("\n")

        carrito.mensajeHamburguesas = `${nombre}, has elegido las siguientes hamburguesas:\n\n${nombresHamburguesas} \n\n Cantidad de hamburguesas: ${carrito.hamburguesas.length} \n El total es: $${carrito.cuentaTotal}`

        alert(carrito.mensajeHamburguesas)
        reservaPedido(carrito.hamburguesas.length)
    }

    if (carrito.hamburguesas.length != 0) {
        alert(`${carrito.mensajeHamburguesas} \n \n ${carrito.mensajePedidos} \n \n Esperamos para que disfrutes de nuestras ricas Smash Burgers.`)
    }
    let parrafo = document.getElementById("parrafo")
    console.log(parrafo)
    parrafo.innerHTML = `${nombre} <br> ${carrito.mensajePedidos} <br> Esperamos para que disfrutes de nuestras ricas Smash Burgers.`
})


