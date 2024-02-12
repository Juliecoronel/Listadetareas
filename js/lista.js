let fecha = document.querySelector('.fecha');
let saludoNom = document.querySelector('.saludoNom');
const ingTarea = document.querySelector('.ingTarea');
const enviarTarea = document.querySelector('.enviarTarea');
const todasTareas = document.getElementById('todasTareas');
const contTareasComp = document.getElementById('contTareasComp');
const hecho = '../img/circulo-check.png'
const noHecho = '../img/circulo.png'
const claseHecha = 'circuloCheck'
const claseNoHecha = 'circulo'
const lineaMedio = 'tareaHecha'
let id;
let arrayTareas;

if(!localStorage.getItem("Nombre")){
    window.open('../index.html', '_self')
}


let dia = new Date();
fecha.innerHTML = dia.toLocaleDateString("es-AR", {weekday:"long", month:"long", day:"numeric"})

const nombre = localStorage.getItem("Nombre");
saludoNom.innerHTML = `Hola ${nombre}!`

function agregarTarea(tarea, id, realizada, eliminada){
    if(eliminada){return}
    const realizar = realizada ?hecho :noHecho;
    const linea = realizada ?lineaMedio :"";
    const claseImg = realizada ?claseHecha :claseNoHecha

    const forma = ` <div id="contTarea">
                        <div id="texBtn">
                            <img src=${realizar} alt="" class=${claseImg} data="realizada" id=${id}>
                            <p class="tarea ${linea}">${tarea}</p>
                        </div>
                        <img src="../img/basura.png" alt="" class="basura" data="eliminada" id=${id}>
                    </div>`

    if(realizada){
        contTareasComp.insertAdjacentHTML("beforeend", forma);
    } else{
        todasTareas.insertAdjacentHTML("beforeend", forma);
    }
}

enviarTarea.addEventListener("click", ()=>{
    const tarea = ingTarea.value;

    if(tarea){
        agregarTarea(tarea, id, false, false);
        arrayTareas.push({tarea, id, realizada: false, eliminada: false});
    }
    localStorage.setItem("Tareas", JSON.stringify(arrayTareas));
    ingTarea.value = "";
    id++;
})

ingTarea.addEventListener("keypress", (e)=>{
    if(e.key == "Enter"){
        const tarea = ingTarea.value;

        if(tarea){
            agregarTarea(tarea, id, false, false);
            arrayTareas.push({tarea, id, realizada: false, eliminada: false});
        }
        localStorage.setItem("Tareas", JSON.stringify(arrayTareas));
        ingTarea.value = "";
        id++;
    }
})

function tareaHecha(elemento){
    if(elemento.getAttribute("src") === noHecho){
        elemento.setAttribute("src", hecho);
        elemento.setAttribute("class", claseHecha);
        contTareasComp.appendChild(elemento.parentNode.parentNode);
    }
     else if(elemento.getAttribute("src") === hecho){
        elemento.setAttribute("src", noHecho);
        elemento.setAttribute("class", claseNoHecha);
        todasTareas.appendChild(elemento.parentNode.parentNode);
    };
    elemento.parentNode.querySelector(".tarea").classList.toggle(lineaMedio);
    arrayTareas[elemento.id].realizada = arrayTareas[elemento.id].realizada ?false :true;
}

function tareaEliminada(elemento){
    elemento.parentNode.remove();
    arrayTareas[elemento.id].eliminada = true;
}

todasTareas.addEventListener("click", (event)=>{
     const elemento = event.target;
    const elementoData = elemento.attributes.data.value;
    if(elementoData === "realizada"){
        tareaHecha(elemento);
    } else if(elementoData === "eliminada"){
        tareaEliminada(elemento);
    }
    localStorage.setItem("Tareas", JSON.stringify(arrayTareas));
})

contTareasComp.addEventListener("click", (event)=>{
    const elemento = event.target;
   const elementoData = elemento.attributes.data.value;
   if(elementoData === "realizada"){
       tareaHecha(elemento);
   } else if(elementoData === "eliminada"){
       tareaEliminada(elemento);
   }
   localStorage.setItem("Tareas", JSON.stringify(arrayTareas));
})


function cargarTareas(info){
    info.forEach(function(i){
        agregarTarea(i.tarea, i.id, i.realizada, i.eliminada);
    });
}

if(localStorage.getItem("Tareas")){
    arrayTareas = JSON.parse(localStorage.getItem("Tareas"));
    id = arrayTareas.length;
    cargarTareas(arrayTareas);
} else{
    arrayTareas = [];
    id = 0
}

