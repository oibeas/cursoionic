this.onload = carga; //Poner e nombre de la funcion sin parentesis para que llame a la funcion cuando cargue la pagina, si pongo parentesis hace una llamada a la función ahora
let vidas = 0;
let respus = []; //Esta variable almacena las respuestas dadas
let respus2 = []; //Esta variable almacena las pistas dadas
let records = [];
let usuario = localStorage.getItem('usuarioGuardado'); //Cargamos el nombre de usuario
if (usuario == "" || usuario == null) { //Comprueba si existe un nombre de usuaio, de lo contrario le devuelve a la pagina del registro
    window.location.href = "introNombre.html"
}


function carga() {
    vidas = 5;
    let elemento_vidas = document.getElementById("vidas");
    elemento_vidas.innerHTML = vidas;
    document.querySelector("#reiniciar").style.visibility = "hidden"; //Oculto el boton reiniciar
    document.querySelector("#records").style.visibility = "hidden"; //Oculto el boton records
    document.querySelector("#user").innerHTML = usuario;
    localStorage.setItem('modificarUsuario', false)
    document.querySelector("#modificar").style.visibility = "visible";
}


class Partida { //Creamos una clase Partida, con los datos de nombre y numero de intentos
    constructor(nombre, vidas) {
        this.nombre = nombre;
        this.vidas = vidas;
    }

    mostrarPartida() { //Este es el metodo dinamico, que hay que declarar el objeto antes de poder usarlo
        console.log("El usuario que ha jugado es: " + this.nombre);
        let intentos = 5 - this.vidas;
        console.log("El numero de intentos ha sido: " + intentos);
    }
    guardarRecord() { //Metodo para guardar un record en el localstorage
        // let partida = new Partida(this.nombre, this.vidas)
        // let string_partida = JSON.stringify(this); //Convertimos el objeto a cadena de texto //this se usa aqui como un objeto Partida
        // console.log(string_partida);

        let arrRecords = []; //Primero creo el array
        if (localStorage.getItem('recordsGuardados')) { //Compruebo si existe
            arrRecords = JSON.parse(localStorage.getItem('recordsGuardados')); //Leo los records del localstorage
            // console.log(arrRecords);
        }
        arrRecords.push(this); // Añadimos el resultado de la partida "this" al array
        console.log(arrRecords);
        localStorage.setItem('recordsGuardados', JSON.stringify(arrRecords)); //Guardamos en localstorage
    }

}

function numeroRandom(min, max) { //Funcion que genera un numero aleatorio entre un numero minimo(incluido) y uno maximo) excluido
    return Math.floor(Math.random() * (max - min)) + min;
}

function limpiar() { //Funcion para que limpie los campos al cabo de x segundos
    let elemento_imagen = document.getElementById("imagen"); // Primero capturo el campo de texto para la respuesta y la imagen
    let elemento_respuesta = document.getElementById("texto_respuesta");
    elemento_imagen.src = "https://programacionsiemens.com/wp-content/uploads/2013/05/error.jpg";
    elemento_respuesta.innerHTML = "";

}

let numeroAdivinar = numeroRandom(1, 101); //pongo 101 porque el maximo esta excluido
console.log(numeroAdivinar);

function fallo(pFallo) {
    let elemento_vidas = document.getElementById("vidas");
    console.log(vidas);
    elemento_vidas.innerHTML = vidas; //Mostramos las vidas restantes
    document.querySelector("#reiniciar").style.visibility = "visible"; //Muestro el boton reiniciar
    document.querySelector("#records").style.visibility = "visible"; //Muestro el boton records

    let elemento_imagen = document.getElementById("imagen"); // Primero capturo el campo de texto para la respuesta y la imagen
    let elemento_respuesta = document.getElementById("texto_respuesta");

    if (vidas <= 1) { //Comprueba si es la ultima vida
        setTimeout(fin, 1000);
    } else {
        if (pFallo == "menor") {
            elemento_imagen.src = "https://www.flaticon.es/svg/static/icons/svg/2026/2026655.svg";
            elemento_respuesta.innerHTML = "¡¡¡¡FALLO!!!!  El numero es menor";
            setTimeout(limpiar, 2000);
        } else {
            elemento_imagen.src = "https://www.flaticon.es/svg/static/icons/svg/2026/2026659.svg";
            elemento_respuesta.innerHTML = "¡¡¡¡FALLO!!!!  El numero es mayor";
            setTimeout(limpiar, 2000);
        }
    }

}

function acierto() {
    console.log("¡¡¡¡¡¡ACIERTO!!!!!!");
    let elemento_imagen = document.getElementById("imagen"); // Primero capturo el campo de texto para la respuesta y la imagen
    let elemento_respuesta = document.getElementById("texto_respuesta");
    elemento_imagen.src = "https://franciscotorreblanca.es/wp-content/uploads/2017/02/prejuicios-marketing-falacias-francisco-torreblanca-23.jpg/icons/svg/2026/2026655.svg";
    elemento_respuesta.innerHTML = "¡¡¡¡ACIERTO!!!!!";


    // console.log(usuario);
    // console.log(vidas);
    let partidaInfo = new Partida(usuario, vidas); //Primerp declaro el objeto Partida y le paso los parametros
    partidaInfo.mostrarPartida(); //Ahora llamo al método mostrar partida, como no devuelve nada no hace falta meterle en una variable

    partidaInfo.guardarRecord(); //Llamamos al metodo guardar Partida para que lo guarde


    setTimeout(volverEmpezar, 5000);
}

function fin() {
    console.log("¡¡¡¡¡¡OHHHHHHH!!!!!!");
    let elemento_imagen = document.getElementById("imagen"); // Primero capturo el campo de texto para la respuesta y la imagen
    let elemento_respuesta = document.getElementById("texto_respuesta");
    elemento_imagen.src = "https://image.freepik.com/vector-gratis/fondo-fin-juego-efecto-glitch_23-2148063218.jpg";
    elemento_respuesta.innerHTML = "¡¡¡¡HAS PERDIDO!!!!! La solucion era: " + numeroAdivinar;
    setTimeout(volverEmpezar, 5000);
}

function mostrarNumerosJugados() { //Funcion para mostrar los numeros introducidos
    let elemento_ultimas = document.getElementById("ultimas"); //Captura el elemento donde pongo las ultimas respuestas
    while (elemento_ultimas.firstChild) { //Borra primero la lista de lis de respus
        elemento_ultimas.removeChild(elemento_ultimas.firstChild);
    }
    let elemento_ultimas2 = document.getElementById("ultimas2"); //Captura el elemento donde pongo las ultimas respuestas2
    while (elemento_ultimas2.firstChild) { //Borra primero la lista de lis de respus2
        elemento_ultimas2.removeChild(elemento_ultimas2.firstChild);
    }
    for (respu of respus) { //Recorre el array y lo muestra en pantalla
        let nuevoLi = document.createElement("li"); //Crea otro elemento dentro del elemento contenedor
        let contenido = document.createTextNode(respu); //Imprime algo dentro del elemento 'li' 
        elemento_ultimas.appendChild(nuevoLi);
        nuevoLi.appendChild(contenido);
    }
    for (respu2 of respus2) { //Recorre el array 2 y lo muestra en pantalla
        let nuevoLi = document.createElement("li"); //Crea otro elemento dentro del elemento contenedor
        let contenido = document.createTextNode(respu2); //Imprime algo dentro del elemento 'li' 
        elemento_ultimas2.appendChild(nuevoLi);
        nuevoLi.appendChild(contenido);
    }
}

function calcularRespuesta() {
    document.querySelector("#modificar").style.visibility = "hidden"; //OCULTO EL BOTON DE CAMBIAR NOMBRE

    //Guardo las ultimas respuestas en un array
    let respuesta = document.getElementById("respuesta").value
    console.log(respuesta);
    respus.push(respuesta);
    console.log(respus);
    //Mostrar el array de numeros introducios


    if (respuesta == numeroAdivinar) {
        acierto();
    } else {
        if (numeroAdivinar < respuesta) {
            fallo("menor");
            console.log("MENOR");
            respus2.push("↓");
        } else {
            fallo("mayor");
            console.log("MAYOR");
            respus2.push("↑");
        }
        vidas--;
        let elemento_vidas = document.getElementById("vidas");
        elemento_vidas.innerHTML = vidas;
        console.log(respus2);

    }
    mostrarNumerosJugados();
}

function volverEmpezar() { //Funcion que reinicia la partida
    numeroAdivinar = numeroRandom(1, 101)
    console.log("Nuevo numero a adivinar: " + numeroAdivinar);
    vidas = 5;
    respus = [];
    respus2 = [];
    limpiar();
    document.querySelector("#reiniciar").style.visibility = "hidden"; //Oculto el boton reiniciar
    document.querySelector("#records").style.visibility = "hidden"; //Oculto el boton records
    elemento_vidas = document.getElementById("vidas");
    elemento_vidas.innerHTML = vidas; //Mostramos las vidas restantes
    document.querySelector("#modificar").style.visibility = "visible";

    //Limpiar las ultimas respuestas, limpio los lis de respus y respus2
    let list = document.getElementById("ultimas");
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    let list2 = document.getElementById("ultimas2");
    while (list2.firstChild) {
        list2.removeChild(list2.firstChild);
    }

}


function modificarUsuario() {
    localStorage.setItem('modificarUsuario', true)
    window.location.href = "introNombre.html"
}

function verRecords() {
    window.location.href = "records.html"
}