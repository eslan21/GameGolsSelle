"use strict";

//---------------Variables globales
var rsOld = {
  valorMDolar: 0.38,
  valorMBs: 0.25,
  valorMArg: 0.74,
  valorMCol: 0.41,
  valorMSol: 0.45,
  valorMBzl: 0.42
};
var rs3 = {
  valorMDolar: 0.1,
  valorMBs: 0.5,
  valorMArg: 0.6,
  valorMCol: 0.4,
  valorMSol: 0.2,
  valorMBzl: 0.3
};
var tipoDeJuego = rsOld; //Datos de calculo

var getData = {
  monedaSelect: 'Bs',
  metodoPago: '',
  metodoVenta: '',
  montoVentaEnMonedaDelJuego: '',
  montoVentaDineroReal: '',
  precioSelect: tipoDeJuego.valorMBs,
  valorMDolar: tipoDeJuego.valorMDolar
}; // Selectores

var labelFormulario = document.querySelector('.lb_monto');
var inputMonto = document.querySelector('#monto');
var precioDolares = document.querySelector('#precioDolares');
var precioPaisSelect = document.querySelector('#precioPaisSelect');
var recibirDolar = document.querySelector('#recibirDolares');
var recibirPaisSelect = document.querySelector('#recibirPaisSelect');
var botonVender = document.querySelector('#btnSell');
var menu = document.querySelector('.fa-solid');
var metodoPago = document.querySelectorAll('.pagoSelected');
var metodoPagoSelect = document.querySelector('#MetodoPagoMovil');
var banderas = document.querySelector('#banderas');
var selectBanderas = document.querySelector('#banderasSelect');
var btnRsold = document.querySelector('.rsold'),
    btnRs3 = document.querySelector('.rs3');
var btnMetodoVenta = document.querySelectorAll('.metodoVenta button');
var simboloSelect1 = document.querySelector('#simboloSelect1');
var simboloSelect2 = document.querySelector('#simboloSelect2'); //-------------------Eventos
//blur del input

inputMonto.addEventListener('blur', efectoFormulario); //boton vender

botonVender.addEventListener('click', vender); //Calculadora

inputMonto.addEventListener('input', calculo); //Dinamica de menu

menu.addEventListener('click', menuDinamica);
window.addEventListener('click', ocultarMenu); //Metodo de pago

for (var i = 0; i < metodoPago.length; i++) {
  metodoPago[i].addEventListener('click', metodoPagoFunction);
}

metodoPagoSelect.addEventListener('change', selectMetodoPago); //Evento de banderas

banderas.addEventListener('click', eventoBanderas);
selectBanderas.addEventListener('change', eventoEelectBanderas); //Botones de seleccion de juego

btnRsold.addEventListener('click', seleccionarJuegobtnRsold);
btnRs3.addEventListener('click', seleccionarJuegobtnRs3); //Wvwnro de Scroll

window.addEventListener('scroll', efectoScroll); //Metodo de venta}

for (var _i = 0; _i < btnMetodoVenta.length; _i++) {
  btnMetodoVenta[_i].addEventListener('click', addMetodoPago);
} //-------------------------------------------Funciones-----------------------------------------------
//Efecto del input


function efectoFormulario() {
  if (inputMonto.value) {
    inputMonto.style.background = '#ffffffe0';
    labelFormulario.querySelector('span').style.transform = 'translateY(300%)';
  } else if (inputMonto.value === '') {
    inputMonto.style.background = '';
    labelFormulario.querySelector('span').style.transform = '';
  }
} //Actualizar precios en la pagina


var actualizarPrecios = function actualizarPrecios(dolar, simbol, altMoneda) {
  precioDolares.innerText = "".concat(dolar);
  simboloSelect1.innerText = "".concat(simbol);
  precioPaisSelect.innerText = "".concat(altMoneda);
};

actualizarPrecios(getData.valorMDolar, getData.monedaSelect, getData.precioSelect); //Calculo automatico

function calculo() {
  recibirDolar.innerText = "".concat((getData.valorMDolar * inputMonto.value).toFixed(2));
  simboloSelect2.innerText = getData.monedaSelect;
  recibirPaisSelect.innerText = "".concat((getData.precioSelect * inputMonto.value).toFixed(2));
  getData.montoVentaEnMonedaDelJuego = inputMonto.value;
  getData.montoVentaDineroReal = getData.precioSelect * inputMonto.value;
  habilitarBotonVenta();
}

calculo(); //Agregar el tipo de moneda

var actializaMoneda = function actializaMoneda() {
  var moneda = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Bs';

  switch (moneda) {
    case 'Bs':
      getData.monedaSelect = 'Bs';
      getData.precioSelect = tipoDeJuego.valorMBs;
      getData.valorMDolar = tipoDeJuego.valorMDolar;
      break;

    case 'COL':
      getData.monedaSelect = 'COL';
      getData.precioSelect = tipoDeJuego.valorMCol;
      getData.valorMDolar = tipoDeJuego.valorMDolar;
      break;

    case 'ARS':
      getData.monedaSelect = 'ARS';
      getData.precioSelect = tipoDeJuego.valorMArg;
      getData.valorMDolar = tipoDeJuego.valorMDolar;
      break;

    case 'BRL':
      getData.monedaSelect = 'BRL';
      getData.precioSelect = tipoDeJuego.valorMBzl;
      getData.valorMDolar = tipoDeJuego.valorMDolar;
      break;

    case 'SOL':
      getData.monedaSelect = 'SOL';
      getData.precioSelect = tipoDeJuego.valorMSol;
      getData.valorMDolar = tipoDeJuego.valorMDolar;
      break;

    default:
      getData.monedaSelect = 'Bs';
      getData.precioSelect = tipoDeJuego.valorMBs;
      getData.valorMDolar = tipoDeJuego.valorMDolar;
      break;
  }
}; // DEshabilitar botones de venta


function deshabilitarBoton() {
  if (tipoDeJuego === rs3) {
    btnMetodoVenta.forEach(function (btn) {
      btn.classList.add('disabled');
      btn.disabled = true;
      getData.metodoVenta = 'TRADE';
    });
    return;
  }

  if (tipoDeJuego === rsOld) {
    btnMetodoVenta.forEach(function (btn) {
      btn.classList.remove('disabled');
      btn.disabled = false;
      getData.metodoVenta = '';
      return;
    });
  }
} //dehshabilitar botos de venta


function habilitarBotonVenta() {
  var escaneo = [];
  var validacion = false;

  for (var clave in getData) {
    escaneo.push(getData[clave]);
  }

  escaneo.forEach(function (arr) {
    if (arr === '') {
      validacion = true;
    }
  });

  if (validacion === true) {
    botonVender.classList.add('disabled');
    return;
  }

  if (validacion === false) {
    botonVender.classList.remove('disabled');
    document.querySelector('.botonEnviar').classList.remove('mostrarAviso');
  }

  console.log(validacion);
} //----------------------------------------------Eventos---------------------------------------------//
//Dinamica del Menu


function menuDinamica(e) {
  e.preventDefault();
  var nav = document.getElementsByTagName('nav')[0];

  if (e.target.classList.contains('fa-solid')) {
    nav.style.right = '0';
  }
}

function ocultarMenu(e) {
  if (!e.target.classList.contains('fa-solid')) {
    document.getElementsByTagName('nav')[0].style.right = '';
  }
} //Funciones del metodo de pogo


function metodoPagoFunction(e) {
  var metodoPagoArr = Array.from(metodoPago);
  metodoPagoArr.forEach(function (arr) {
    arr.style.background = '';
    arr.querySelector('span').style.color = '';
  });
  this.style.background = '#ffffff';
  this.querySelector('span').style.color = '#000000';
  getData.metodoPago = this.querySelector('img').getAttribute('data-pay');
  habilitarBotonVenta();
}

function selectMetodoPago() {
  getData.metodoPago = metodoPagoSelect.value;
} //Agrega efectos a banderas y recolecta datos


function eventoBanderas(e) {
  var arrFlag = Array.from(banderas.querySelectorAll('img'));
  arrFlag.forEach(function (arr) {
    arr.classList.remove('yellowShadow');

    if (e.target.getAttribute('data-flag') === arr.getAttribute('data-flag')) {
      arr.classList = 'yellowShadow';
      actializaMoneda(arr.getAttribute('data-flag'));
      actualizarPrecios(getData.valorMDolar, getData.monedaSelect, getData.precioSelect);
      calculo();
      habilitarBotonVenta();
    }

    ;
  });
}

function eventoEelectBanderas() {
  actializaMoneda(this.value);
  actualizarPrecios(getData.valorMDolar, getData.monedaSelect, getData.precioSelect);
  calculo();
  habilitarBotonVenta();
} //Seleccionar Juego


window.addEventListener('DOMContentLoaded', function () {
  tipoDeJuego = rsOld;
  btnRsold.style.background = '#9EF0F0';
});

function seleccionarJuegobtnRsold() {
  tipoDeJuego = rsOld;
  btnRsold.style.background = '#9EF0F0';
  document.querySelector('.rs3').style.background = '';
  actializaMoneda(getData.monedaSelect);
  actualizarPrecios(getData.valorMDolar, getData.monedaSelect, getData.precioSelect);
  calculo();
  deshabilitarBoton();
  habilitarBotonVenta();
}

function seleccionarJuegobtnRs3() {
  tipoDeJuego = rs3;
  btnRs3.style.background = '#9EF0F0';
  document.querySelector('.rsold').style.background = '';
  actializaMoneda(getData.monedaSelect);
  actualizarPrecios(getData.valorMDolar, getData.monedaSelect, getData.precioSelect);
  calculo();
  deshabilitarBoton();
  habilitarBotonVenta();
} //Efectos de Scroll en elementos


function efectoScroll() {
  var elemento = document.querySelectorAll('.animacion');
  var topScrean = document.documentElement.scrollTop;

  for (var _i2 = 0; _i2 < elemento.length; _i2++) {
    if (elemento[_i2].getBoundingClientRect().y < 500) {
      elemento[_i2].classList.add('desplazamiento');
    }
  }
} //Agregando Metodod de Venta


function addMetodoPago(e) {
  e.preventDefault();

  for (var _i3 = 0; _i3 < btnMetodoVenta.length; _i3++) {
    btnMetodoVenta[_i3].style.background = '';
    btnMetodoVenta[_i3].style.color = '';
  }

  ;
  getData.metodoVenta = this.getAttribute('tipo-venta');
  this.style.background = '#ffffff';
  this.style.color = 'black';
  habilitarBotonVenta();
} //Agregando efecto de fondo al nav
//Vender Oro


function vender() {
  var enlaceCompra = document.createElement('a');
  enlaceCompra.href = "https://wa.me/5491169546495?text=".concat(String(getData.montoVentaEnMonedaDelJuego), "M equivalente a ").concat(getData.montoVentaDineroReal).concat(getData.monedaSelect, "  ").concat(getData.metodoPago, " a traves de ").concat(getData.metodoVenta);
  enlaceCompra.target = '_blank';
  enlaceCompra.id = 'enlaceWhatsapp';
  document.querySelector('body').appendChild(enlaceCompra);
  document.querySelector('#enlaceWhatsapp').click();
  document.querySelector('#enlaceWhatsapp').remove();
}

;