//console.log(autos);

//Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');


//Contenerdor para los resuiltados
const resultados = document.querySelector('#resultado');

const max = new Date().getFullYear(); // Nos traera el año actual 
const min = max - 10; 


//General un objeto con la bsuqueda

const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}

//La idea es que si yo selecciono una marca deberia llenarse los objetos en este caso la marca, para ello debo crear un selector por cada uno 






//Eventos
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos); // muestra los autos al cargar

    //Llena las opciones de años

    LlenarSelect();

})

//Event listener para los select de busquedas
marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value;

    // Cada vez que generamos un cambio en los filtros quiero que de una vez impacte y sse filtre de lo q tengo para que pueda cambiarse sin ningun boton, lo haremos con la funcion de filtrarAuto()

    filtrarAuto();
})

year.addEventListener('change', e => {
    datosBusqueda.year = e.target.value;
    filtrarAuto();
})

minimo.addEventListener('change', e => {
    datosBusqueda.minimo = e.target.value
    filtrarAuto();
})

maximo.addEventListener('change', e => {
    datosBusqueda.maximo = e.target.value

    filtrarAuto();
})

puertas.addEventListener('change', e => {
    datosBusqueda.puertas = e.target.value

    filtrarAuto();
})

transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value

    filtrarAuto();
})

color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value

    filtrarAuto();


   // console.log(datosBusqueda)
})



//Funciones
function mostrarAutos(autos) {

    LimpiarHTML(); // Elimina el HTML previo


    //Esta fucciones de mostrar autos lo que hara es poder mostarr toda nuestra base de datos que tenemos en el DB.js 

   

    //Vamos a iterar sobre todos los autos y generar el html en cada resuiltado 

    autos.forEach( auto => {
        const autoHTML = document.createElement('P')

         // Distrochion

            const {marca, modelo, year, puertas, transmision, precio, color} = auto;
        

        autoHTML.textContent = ` 
            ${marca} ${modelo} - ${year} ${puertas} Puertas - Transmision: ${transmision} - precio : ${precio}
            - Color : ${color}
        `; 


        //insertar en el html 

        resultados.appendChild(autoHTML);


    });

}

//limpiar HTML

function LimpiarHTML() {
    while(resultados.firstChild){
        resultados.removeChild(resultados.firstChild);
    }
}




//Genera los años del select

function LlenarSelect() {

    for( let i = max; i > min; i-- ){
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i; 
        year.appendChild(opcion); // Agrega las opciones de año al select
    }
    
}

// funcion que filtra en base a la busqueda, es una funcion de alto nivel porq es una funcion que lllama a otra funcion que llama a otra funcion en este caso la funcion filter llamara a filtraMarca()

//Los metodos .filter puede soportar lo que vimos anterior menten lo que es chaining o encadenamiento

function filtrarAuto(){
    
    const resultado = autos.filter(filtrarMarca ).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor)

    //console.log(resultado)

    if( resultado.length ){
        mostrarAutos(resultado) //ya estamos filtrando la marca y el años, no se refleja en el resultado eso es porque tenemos que volver a llamar el html // llamamos esta funcion nuevamente y le pasamos resultado, tambien debemos colcoar en mostrar auto mas arriba la funcion lo q seria un paramtro para poder ayudar a q funcione dicha funcion, indicamos tambien q al filtrar si filtra pero se coloca en la parte de abajo y  no actualiza todo el HTML

    }else {
        noResultado();
    }   
}

function noResultado(){

    LimpiarHTML()

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');

    noResultado.textContent = " NO HAY RESULTADO, INTENTA COLOCAR OTRA INFORMACION";
    resultado.appendChild(noResultado);
}


function filtrarMarca( auto) {

    if(datosBusqueda.marca){
        return auto.marca === datosBusqueda.marca
    }
    return auto;

}

function filtrarYear(auto){
    if(datosBusqueda.year){
        return auto.year === parseInt(datosBusqueda.year) //parseInt pasar el stream en numeros enteros 
    }
    return auto;
}

// Como es un filtrado minimo es diferente, ya que no vamos a comprar auto.minimo, si no por el precio del auto  

function filtrarMinimo(auto){
    if(datosBusqueda.minimo){
        return auto.precio >= datosBusqueda.minimo

    }
    return auto;
}


function filtrarMaximo(auto){
    if(datosBusqueda.maximo){
        return auto.precio <= datosBusqueda.maximo

    }
    return auto;
}


function filtrarPuertas(auto){

    if(datosBusqueda.puertas){
        return auto.puertas === parseInt(datosBusqueda.puertas)

    }
    return auto;

}

function filtrarTransmision(auto){

    if(datosBusqueda.transmision){
        return auto.transmision === datosBusqueda.transmision

    }
    return auto;
    
}

function filtrarColor(auto){

    if(datosBusqueda.color){
        return auto.color === datosBusqueda.color

    }
    return auto;
    
}

//El principio de la programacion funcional es crear funciones que en primera no modifica el arreglo original y son funciones pequeñas que van realizando ciertas operaciones  

//ya estamos filtrando la marca y el años, no se refleja en el resultado eso es porque tenemos que volver a llamar el html, 
