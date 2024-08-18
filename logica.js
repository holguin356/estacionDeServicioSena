/**
 * prompt => recibir datos por una alerta
 * 3 servicios
 *   Gasolina
 *   Montallantas
 *   Lavado de Autos
 * Jornada AM y PM
 * Informe final
 *   Valor producido por Gasolina = $$$
 *   Valor producido por Montallantas = $$$
 *   Valor producido por Lavado de autos = $$$
 *   C/u Valor producido en la mañana
 *   C/u Valor producido en la tarde
 *   Número de veces que se presto el servicio (todo el dia)
 *   Número de veces que se presto el servicio (por jornada) separar am y pm
 *   Mostrar cual es el servicio que mas se presto en la mañana  y en la tarde
 *
 */
//#region  Inicializacion de variables
let activo = 1;
let jornada = null;
let tipoServicio = null;
let costoServicio = null;
//arreglo contador servicios [gasolina, montallantas, lavar ]
let serviciosAM = [0, 0, 0];
let serviciosPM = [0, 0, 0];
//arreglo costo servicios [gasolina, montallantas, lavar ]
let costoServiciosAM = [0, 0, 0];
let costoServiciosPM = [0, 0, 0];
// totales
let cantidadServicioDia = [0, 0, 0];
let totalCostoServicios = [0, 0, 0];
let tabla ="";

let maximoAM = 0;
let maximoPM = 0;
//#endregion
confirm("Bienvenido a la Estación de servicio");
while (activo == 1) {
  activo = prompt("Tomaras un servicio: \n1.Si\n2.No");
  activo = validacionActivacion(activo);
  if (activo != 1) {
    break;
  }

  jornada = prompt("Jornada del servicio: \n1.AM\n2.PM");
  jornada = validarJornada(jornada);
  tipoServicio = prompt(
    "Elige el servicio:\n1. Gasolina\n2. Montallantas\n3. Lavado"
  );
  tipoServicio = validarTipoServicio(tipoServicio);
  costoServicio = parseFloat(prompt("Costo del servicio:"));
  costoServicio = validarCostoServicio(costoServicio);
  if (jornada === "1") {
    console.log("jornada es igual a 1");
    switch (tipoServicio) {
      case "1":
        serviciosAM[0]++;
        costoServiciosAM[0] = costoServiciosAM[0] + costoServicio;
        break;
      case "2":
        serviciosAM[1]++;
        costoServiciosAM[1] = costoServiciosAM[1] + costoServicio;
        break;
      case "3":
        serviciosAM[2]++;
        costoServiciosAM[2] = costoServiciosAM[2] + costoServicio;
        break;
    }
  }
  if (jornada === "2") {
    console.log("jornada es igual a 2");
    switch (tipoServicio) {
      case "1":
        serviciosPM[0]++;
        costoServiciosPM[0] = costoServiciosPM[0] + costoServicio;
        break;
      case "2":
        serviciosPM[1]++;
        costoServiciosPM[1] = costoServiciosPM[1] + costoServicio;
        break;
      case "3":
        serviciosPM[2]++;
        costoServiciosPM[2] = costoServiciosPM[2] + costoServicio;
        break;
    }
    for (let i = 0; i < 3; i++) {
       cantidadServicioDia[i] = serviciosAM[i] + serviciosPM[i];
       totalCostoServicios[i] = costoServiciosAM[i] + costoServiciosPM[i];  
    }
  }
  maximoAM = encontrarMaximo(serviciosAM);
  maximoPM = encontrarMaximo(serviciosPM);
}
//#region Funciones de validación
function validacionActivacion(activo) {
  while (activo !== "1" && activo !== "2") {
    activo = prompt(
      "❌Digita bien por favor❌\n\nTomaras un servicio: \n1.Si\n2.No"
    );
  }
  return activo;
}

function validarJornada(jornada) {
  while (jornada !== "1" && jornada !== "2") {
    jornada = prompt(
      "❌Digita bien por favor❌\n\nJornada del servicio: \n1.AM\n2.PM"
    );
  }
  return jornada;
}

function validarTipoServicio(tipoServicio) {
  while (tipoServicio !== "1" && tipoServicio !== "2" && tipoServicio !== "3") {
    tipoServicio = prompt(
      "❌Digita bien por favor❌\n\nElige el servicio:\n1. Gasolina\n2. Montallantas\n3. Lavado"
    );
  }
  return tipoServicio;
}

function validarCostoServicio(costoServicio) {
  while (costoServicio < 0) {
    costoServicio = parseFloat(
      prompt("❌Digita bien por favor❌\n\nCosto del servicio:")
    );
  }
  return costoServicio;
}

function encontrarMaximo(cantservicio) {
  let indexMax = 0;
  for (let i = 1; i < cantservicio.length; i++) {
    if (cantservicio[i] > cantservicio[indexMax]) {
      indexMax = i;
    }
  }
  return indexMax;
}
//#endregion
//#region Informe DOM
console.table(serviciosAM);
console.table(serviciosPM);
console.table(costoServiciosAM);
console.table(costoServiciosPM);

document.addEventListener("DOMContentLoaded", function () {
  let nombreServicio = "";
  let tabla2 = "";
  let masPrestadoAM = "";
  let masPrestadoPM = "";

  for (let i = 0; i < 3; i++) {
    if (i == 0) {
      nombreServicio = "Gasolina";
    } else if(i == 1) {
      nombreServicio = "Montallantas"
    } else {
      nombreServicio = "Lavadero de autos"
    }
    console.log(i)
    tabla += `<tr class="table-secondary">
                <th scope="col" colspan="2" class="table-secondary">Servicio ${nombreServicio}</th>
              </tr>
              <tr>
                <th scope="row">Valor Producido AM</th>
                <td>${costoServiciosAM[i]}</td>
              </tr>
              <tr>
                <th scope="row">Cantidad de servicio AM</th>
                <td>${serviciosAM[i]}</td>
              </tr>
              <tr>
                <th scope="row">Valor Producido PM</th>
                <td>${costoServiciosPM[i]}</td>
              </tr>
              <tr>
                <th scope="row">Cantidad de servicio PM</th>
                <td>${serviciosPM[i]}</td>
              </tr>
              <tr>
                <th scope="row">Cantidad día</th>
                <td>${cantidadServicioDia[i]}</td>
              </tr>
              <tr>
                <th scope="row">Total día</th>
                <td>${totalCostoServicios[i]}</td>
              </tr>
              `;
  }
  if (maximoAM == 0) {
    masPrestadoAM = "Gasolina";
  } else if (maximoAM == 1) {
    masPrestadoAM = "Montallantas";
  } else {
    masPrestadoAM = "Lavado de autos";
  }
  if (maximoPM == 0) {
    masPrestadoPM = "Gasolina";
  } else if (maximoPM == 1) {
    masPrestadoPM = "Montallantas";
  } else {
    masPrestadoPM = "Lavado de autos";
  }

  tabla += `<tr class="table-secondary">
                <th scope="col" colspan="2" class="table-secondary">Servicio más prestado</th>
              </tr>
              <tr>
                <th scope="row">Servicio AM</th>
                <td>${masPrestadoAM}</td>
              </tr>
              <tr>
                <th scope="row">Servicio PM</th>
                <td>${masPrestadoPM}</td>
              </tr>`
  document.getElementById("tablaDeInforme").innerHTML = tabla;


});
//#endregion
